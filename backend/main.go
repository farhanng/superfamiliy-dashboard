package main

import (
	"context"
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	"superfamily-backend/config"
	"superfamily-backend/firebase"
	"superfamily-backend/handlers"
	"superfamily-backend/middleware"
	"superfamily-backend/oauth"
	"superfamily-backend/repositories"
	"superfamily-backend/services"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	_ "github.com/mattn/go-sqlite3"
)

func main() {
	// Load configuration
	cfg := config.Load()

	// Validate JWT secret in production
	if cfg.Environment == "production" {
		if cfg.JWTSecret == "" || len(cfg.JWTSecret) < 32 {
			log.Fatal("JWT_SECRET must be set with at least 32 characters in production")
		}
		// Also reject if it's the weak dev default
		if cfg.JWTSecret == "superfamily-dev-secret-do-not-use-in-prod" {
			log.Fatal("JWT_SECRET cannot be the default dev value in production")
		}
	}

	// Set JWT secret getter for middleware
	middleware.GetJWTSecret = func() string {
		return cfg.JWTSecret
	}

	// Initialize Firebase (Firestore for whitelist and auth)
	if cfg.FirebaseProjectID != "" {
		ctx := context.Background()
		firebaseCfg := firebase.Config{
			ProjectID: cfg.FirebaseProjectID,
			CredentialsPath: cfg.FirebaseCredentialsPath,
		}
		if cfg.FirebaseCredentials != "" {
			firebaseCfg.Credentials = cfg.FirebaseCredentials
		}
		if err := firebase.Init(ctx, firebaseCfg); err != nil {
			log.Printf("Warning: Failed to initialize Firebase: %v", err)
		} else {
			log.Println("Firebase initialized successfully")
			// Seed whitelist users
			if err := firebase.NewWhitelistRepository().SeedWhitelist(ctx); err != nil {
				log.Printf("Warning: Failed to seed whitelist: %v", err)
			}
		}
	} else {
		log.Println("WARNING: Firebase not configured. Whitelist will use SQLite.")
	}

	// Initialize database
	dbPath := cfg.DBPath
	if err := initDatabase(dbPath); err != nil {
		log.Fatalf("Failed to initialize database: %v", err)
	}

	// Initialize layers
	repo := repositories.New(db)
	svc := services.New(repo, nil) // SSE manager will be set via handlers
	h := handlers.New(svc)

	// Set SSE client manager in service
	svc.SetSSEClientManager(middleware.GetSSEClientManager())

	// Seed default users if none exist
	if err := seedDefaultUsers(repo); err != nil {
		log.Printf("Warning: Failed to seed default users: %v", err)
	}

	// Initialize OAuth state store (5 minute TTL)
	oauth.InitStateStore(5)

	// Setup Gin
	gin.SetMode(cfg.GinMode)
	app := gin.New()
	app.Use(gin.Recovery())
	app.Use(gin.Logger())

	// CORS configuration - validate origins
	corsOrigins := []string{}
	if cfg.CORSOrigins != "" {
		corsOrigins = strings.Split(cfg.CORSOrigins, ",")
		for i, origin := range corsOrigins {
			corsOrigins[i] = strings.TrimSpace(origin)
		}
		// Filter empty strings
		validOrigins := []string{}
		for _, o := range corsOrigins {
			if o != "" {
				validOrigins = append(validOrigins, o)
			}
		}
		corsOrigins = validOrigins
	}

	if len(corsOrigins) == 0 {
		log.Println("WARNING: No CORS origins configured. Set CORS_ORIGINS env var with allowed origins.")
	}

	corsConfig := cors.Config{
		AllowOrigins:     corsOrigins,
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization", "X-Requested-With"},
		ExposeHeaders:    []string{"Content-Length", "X-Request-Id"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}
	app.Use(cors.New(corsConfig))

	// Health check endpoint (no auth required)
	app.GET("/health", func(c *gin.Context) {
		firebaseStatus := "not_configured"
		if cfg.FirebaseProjectID != "" && (cfg.FirebaseCredentials != "" || cfg.FirebaseCredentialsPath != "") {
			firebaseStatus = "configured"
			if firebase.GetClient() != nil {
				firebaseStatus = "connected"
			}
		}

		if err := db.Ping(); err != nil {
			c.JSON(http.StatusServiceUnavailable, gin.H{"status": "unhealthy", "error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, gin.H{
			"status":            "healthy",
			"connected_sse":     middleware.GetSSEClientManager().GetConnectedUsers(),
			"database":           "connected",
			"firebase":          firebaseStatus,
			"environment":       cfg.Environment,
			"oauth_enabled":      cfg.GoogleClientID != "",
		})
	})

	// SSE health endpoint
	app.GET("/sse-health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"connected_users": middleware.GetSSEClientManager().GetConnectedUsers(),
		})
	})

	// Initialize OAuth and whitelist handlers
	oauthHandler := handlers.NewOAuthHandler(svc, cfg)
	whitelistHandler := handlers.NewWhitelistHandler(svc)

	// Auth routes (no auth required)
	auth := app.Group("/api/auth")
	{
		auth.POST("/register", middleware.RateLimitMiddleware(), h.Register)
		auth.POST("/login", middleware.StrictRateLimitMiddleware(), h.Login)

		// Google OAuth routes (no auth required)
		auth.GET("/google", oauthHandler.InitiateGoogleOAuth)
		auth.GET("/google/callback", oauthHandler.HandleGoogleCallback)
		auth.GET("/oauth/status", oauthHandler.OAuthStatus)
		auth.GET("/test-login", oauthHandler.TestLogin)
	}

	// API routes (all require authentication)
	api := app.Group("/api")
	api.Use(middleware.AuthRequired())
	{
		// Auth routes
		api.GET("/auth/me", h.GetMe)
		api.POST("/auth/logout", h.Logout)

		// Whitelist admin routes (auth + admin role required)
		whitelist := api.Group("/auth/whitelist")
		whitelist.Use(middleware.AdminRequired())
		{
			whitelist.GET("", whitelistHandler.GetWhitelist)
			whitelist.POST("", whitelistHandler.AddToWhitelist)
			whitelist.DELETE("/:email", whitelistHandler.RemoveFromWhitelist)
			whitelist.PUT("/:email/suspend", whitelistHandler.SuspendWhitelistUser)
			whitelist.PUT("/:email/activate", whitelistHandler.ActivateWhitelistUser)
		}

		// Bills routes
		api.GET("/bills", h.GetBills)
		api.GET("/bills/due-soon", h.GetBillsDueSoon)
		api.GET("/bills/:id", h.GetBill)
		api.POST("/bills", h.CreateBill)
		api.PUT("/bills/:id", h.UpdateBill)
		api.DELETE("/bills/:id", h.DeleteBill)
		api.POST("/bills/:id/mark-paid", h.MarkBillPaid)
		api.POST("/bills/:id/mark-unpaid", h.MarkBillUnpaid)

		// Family routes
		api.GET("/family", h.GetFamilyMembers)
		api.POST("/family", h.CreateFamilyMember)

		// Reminders routes
		api.GET("/reminders", h.GetReminders)
		api.POST("/reminders", h.CreateReminder)
		api.PUT("/reminders/:id", h.UpdateReminder)
		api.DELETE("/reminders/:id", h.DeleteReminder)
		api.POST("/reminders/:id/mark-paid", h.MarkReminderPaid)
		api.POST("/reminders/:id/mark-unpaid", h.MarkReminderUnpaid)

		// Events routes
		api.GET("/events", h.GetEvents)
		api.POST("/events", h.CreateEvent)
		api.PUT("/events/:id", h.UpdateEvent)
		api.DELETE("/events/:id", h.DeleteEvent)

		// Transactions routes
		api.GET("/transactions", h.GetTransactions)
		api.GET("/transactions/:year/:month", h.GetTransactionsByMonth)
		api.POST("/transactions", h.CreateTransaction)
		api.PUT("/transactions/:id", h.UpdateTransaction)
		api.DELETE("/transactions/:id", h.DeleteTransaction)

		// Budget routes
		api.GET("/budgets/:month", h.GetBudget)
		api.PUT("/budgets/:month", h.SetBudget)

		// Meal plans routes
		api.GET("/meal-plans", h.GetMealPlans)
		api.GET("/meal-plans/:weekStart", h.GetMealPlanByWeek)
		api.POST("/meal-plans", h.CreateOrUpdateMealPlan)
		api.DELETE("/meal-plans/:id", h.DeleteMealPlan)

		// Weekend activities routes
		api.GET("/weekend-activities", h.GetWeekendActivities)
		api.POST("/weekend-activities", h.CreateWeekendActivity)
		api.PUT("/weekend-activities/:id", h.UpdateWeekendActivity)
		api.DELETE("/weekend-activities/:id", h.DeleteWeekendActivity)

		// SSE real-time sync
		api.GET("/events/subscribe", h.SubscribeSSE)
		api.GET("/sync", h.Sync)
	}

	// Public API endpoints (no auth required)
	app.GET("/api/", h.APIRoot)
	app.GET("/api/bills/categories", h.GetBillCategories)
	app.GET("/api/whitelist/check", whitelistHandler.CheckWhitelist)

	// Start server
	log.Printf("SuperFamily Backend starting on :%s", cfg.Port)
	log.Printf("Environment: %s, CORS Origins: %v", cfg.Environment, corsOrigins)
	log.Printf("JWT Secret configured: %v", cfg.JWTSecret != "")
	log.Printf("Google OAuth enabled: %v", cfg.GoogleClientID != "")

	if err := app.Run(":" + cfg.Port); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}

func initDatabase(dbPath string) error {
	// Ensure data directory exists
	dataDir := dbPath[:len(dbPath)-len("/superfamily.db")]
	if err := os.MkdirAll(dataDir, 0755); err != nil {
		return fmt.Errorf("failed to create data directory: %w", err)
	}

	// Open SQLite with WAL mode for better concurrency
	var err error
	db, err = sql.Open("sqlite3", dbPath+"?_journal_mode=WAL&_busy_timeout=5000&_foreign_keys=ON")
	if err != nil {
		return fmt.Errorf("failed to open database: %w", err)
	}

	// Test connection
	if err := db.Ping(); err != nil {
		return fmt.Errorf("failed to ping database: %w", err)
	}

	// Initialize schema
	if err := createSchema(); err != nil {
		return fmt.Errorf("failed to create schema: %w", err)
	}

	log.Printf("Database initialized at %s", dbPath)
	return nil
}

func createSchema() error {
	schema := `
	-- Users table (updated with provider column)
	CREATE TABLE IF NOT EXISTS users (
		id TEXT PRIMARY KEY,
		email TEXT UNIQUE NOT NULL,
		password_hash TEXT NOT NULL,
		name TEXT NOT NULL,
		role TEXT DEFAULT 'member',
		provider TEXT DEFAULT 'local',
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP
	);

	-- Whitelist users for Google OAuth
	CREATE TABLE IF NOT EXISTS whitelist_users (
		id TEXT PRIMARY KEY,
		email TEXT UNIQUE NOT NULL,
		name TEXT NOT NULL,
		status TEXT DEFAULT 'active',
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
		created_by TEXT REFERENCES users(id),
		updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
	);

	-- User accounts linking local users to Google
	CREATE TABLE IF NOT EXISTS user_accounts (
		id TEXT PRIMARY KEY,
		user_id TEXT NOT NULL REFERENCES users(id),
		google_email TEXT UNIQUE NOT NULL,
		google_user_id TEXT UNIQUE NOT NULL,
		google_name TEXT,
		linked_at DATETIME DEFAULT CURRENT_TIMESTAMP
	);

	-- Bills table
	CREATE TABLE IF NOT EXISTS bills (
		id TEXT PRIMARY KEY,
		title TEXT NOT NULL,
		amount INTEGER NOT NULL,
		due_date DATE NOT NULL,
		frequency TEXT NOT NULL,
		category TEXT NOT NULL,
		is_paid INTEGER DEFAULT 0,
		paid_date DATE,
		paid_by TEXT REFERENCES users(id),
		notify_before INTEGER DEFAULT 2,
		notified_at DATE,
		note TEXT,
		created_by TEXT REFERENCES users(id),
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
		updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
	);

	-- Reminders table (tax/document)
	CREATE TABLE IF NOT EXISTS reminders (
		id TEXT PRIMARY KEY,
		title TEXT NOT NULL,
		amount INTEGER NOT NULL,
		due_date DATE NOT NULL,
		frequency TEXT NOT NULL,
		category TEXT NOT NULL,
		is_paid INTEGER DEFAULT 0,
		paid_date DATE,
		paid_by TEXT REFERENCES users(id),
		notify_before INTEGER DEFAULT 30,
		notified_at DATE,
		note TEXT,
		created_by TEXT REFERENCES users(id),
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
		updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
	);

	-- Events table
	CREATE TABLE IF NOT EXISTS events (
		id TEXT PRIMARY KEY,
		title TEXT NOT NULL,
		date DATE NOT NULL,
		type TEXT NOT NULL,
		color TEXT,
		notify_days INTEGER DEFAULT 7,
		note TEXT,
		created_by TEXT REFERENCES users(id),
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
		updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
	);

	-- Transactions table
	CREATE TABLE IF NOT EXISTS transactions (
		id TEXT PRIMARY KEY,
		amount INTEGER NOT NULL,
		category TEXT NOT NULL,
		date DATE NOT NULL,
		type TEXT NOT NULL,
		status TEXT DEFAULT 'done',
		note TEXT,
		created_by TEXT REFERENCES users(id),
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
		updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
	);

	-- Budgets table
	CREATE TABLE IF NOT EXISTS budgets (
		id TEXT PRIMARY KEY,
		month TEXT NOT NULL UNIQUE,
		amount INTEGER NOT NULL,
		updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
	);

	-- Meal plans table
	CREATE TABLE IF NOT EXISTS meal_plans (
		id TEXT PRIMARY KEY,
		week_start DATE NOT NULL UNIQUE,
		meals TEXT NOT NULL,
		created_by TEXT REFERENCES users(id),
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
		updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
	);

	-- Weekend activities table
	CREATE TABLE IF NOT EXISTS weekend_activities (
		id TEXT PRIMARY KEY,
		date DATE NOT NULL,
		activities TEXT NOT NULL,
		status TEXT DEFAULT 'planned',
		created_by TEXT REFERENCES users(id),
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
		updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
	);

	-- Family members table
	CREATE TABLE IF NOT EXISTS family_members (
		id TEXT PRIMARY KEY,
		name TEXT NOT NULL,
		relationship TEXT NOT NULL,
		phone TEXT,
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP
	);

	-- Create indexes for performance
	CREATE INDEX IF NOT EXISTS idx_bills_due_date ON bills(due_date);
	CREATE INDEX IF NOT EXISTS idx_bills_is_paid ON bills(is_paid);
	CREATE INDEX IF NOT EXISTS idx_reminders_due_date ON reminders(due_date);
	CREATE INDEX IF NOT EXISTS idx_reminders_is_paid ON reminders(is_paid);
	CREATE INDEX IF NOT EXISTS idx_events_date ON events(date);
	CREATE INDEX IF NOT EXISTS idx_transactions_date ON transactions(date);
	CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
	CREATE INDEX IF NOT EXISTS idx_whitelist_email ON whitelist_users(email);
	CREATE INDEX IF NOT EXISTS idx_whitelist_status ON whitelist_users(status);
	CREATE INDEX IF NOT EXISTS idx_user_accounts_google_email ON user_accounts(google_email);
	`

	_, err := db.Exec(schema)
	return err
}

func seedDefaultUsers(repo *repositories.Repository) error {
	// ALWAYS seed whitelist entries, regardless of whether users exist
	if err := seedWhitelistEntries(repo); err != nil {
		return err
	}

	// Check if users exist
	existing, err := repo.GetUserByEmail("farhan@superfamily.local")
	if err != nil {
		return err
	}
	if existing != nil {
		log.Println("Default users already exist, whitelist seeded.")
		return nil
	}

	// Create default users
	farhan, err := repo.CreateUser("farhan@superfamily.local", "farhan123", "Farhan")
	if err != nil {
		return fmt.Errorf("failed to create farhan user: %w", err)
	}
	log.Printf("Created user: %s (farhan@superfamily.local)", farhan.ID)

	inne, err := repo.CreateUser("inne@superfamily.local", "inne123", "Inne")
	if err != nil {
		return fmt.Errorf("failed to create inne user: %w", err)
	}
	log.Printf("Created user: %s (inne@superfamily.local)", inne.ID)

	// Seed whitelist users (add to whitelist_users table)
	if _, err := repo.CreateWhitelistUser("farhan@superfamily.local", "Farhan", farhan.ID); err != nil {
		return fmt.Errorf("failed to seed whitelist for farhan: %w", err)
	}
	log.Printf("Added farhan@superfamily.local to whitelist")

	if _, err := repo.CreateWhitelistUser("inne@superfamily.local", "Inne", inne.ID); err != nil {
		return fmt.Errorf("failed to seed whitelist for inne: %w", err)
	}
	log.Printf("Added inne@superfamily.local to whitelist")

	log.Println("Default users seeded successfully")
	return nil
}

func seedWhitelistEntries(repo *repositories.Repository) error {
	// Migrate existing whitelist entries from fake local emails to real Gmail addresses
	migrationPairs := []struct{ oldEmail, newEmail string }{
		{"farhan@superfamily.local", "farhan.naufalghani@gmail.com"},
		{"inne@superfamily.local", "ineprinusantari@gmail.com"},
	}
	for _, m := range migrationPairs {
		if err := repo.UpdateWhitelistEmail(m.oldEmail, m.newEmail); err != nil {
			log.Printf("Warning: failed to migrate whitelist %s -> %s: %v", m.oldEmail, m.newEmail, err)
		} else {
			log.Printf("Migrated whitelist %s -> %s", m.oldEmail, m.newEmail)
		}
	}

	// Seed real Gmail whitelist entries if not exist
	farhanWhitelist, _ := repo.GetWhitelistUserByEmail("farhan.naufalghani@gmail.com")
	if farhanWhitelist == nil {
		farhan, _ := repo.GetUserByEmail("farhan.naufalghani@gmail.com")
		if farhan != nil {
			if _, err := repo.CreateWhitelistUser("farhan.naufalghani@gmail.com", "Farhan", farhan.ID); err != nil {
				return fmt.Errorf("failed to seed whitelist for farhan: %w", err)
			}
			log.Printf("Added farhan.naufalghani@gmail.com to whitelist")
		}
	}

	// Seed inne whitelist if not exists
	inneWhitelist, _ := repo.GetWhitelistUserByEmail("ineprinusantari@gmail.com")
	if inneWhitelist == nil {
		inne, _ := repo.GetUserByEmail("ineprinusantari@gmail.com")
		if inne != nil {
			if _, err := repo.CreateWhitelistUser("ineprinusantari@gmail.com", "Inne", inne.ID); err != nil {
				return fmt.Errorf("failed to seed whitelist for inne: %w", err)
			}
			log.Printf("Added ineprinusantari@gmail.com to whitelist")
		}
	}

	log.Println("Whitelist entries verified")
	return nil
}


// Global db reference for health checks
var db *sql.DB
