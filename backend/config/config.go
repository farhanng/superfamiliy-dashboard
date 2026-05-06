package config

import (
	"os"
	"strconv"
	"sync"
)

type Config struct {
	Port                   string
	DBPath                 string
	JWTSecret              string
	CORSOrigins            string
	GinMode                string
	Environment            string
	// Google OAuth
	GoogleClientID         string
	GoogleClientSecret     string
	GoogleOAuthRedirectURI string
	FrontendURL            string
	OAuthEnabled           bool
	// Firebase
	FirebaseProjectID      string
	FirebaseCredentials    string
	FirebaseCredentialsPath string
}

var (
	cfg  *Config
	once sync.Once
)

// Load returns the singleton config instance
func Load() *Config {
	once.Do(func() {
		cfg = &Config{
			Port:                   getEnv("PORT", "3001"),
			DBPath:                 getEnv("DB_PATH", "/app/data/superfamily.db"),
			JWTSecret:              getEnv("JWT_SECRET", ""),
			CORSOrigins:            getEnv("CORS_ORIGINS", ""),
			GinMode:                getEnv("GIN_MODE", "release"),
			Environment:            getEnv("APP_ENV", "production"),
			GoogleClientID:          getEnv("GOOGLE_CLIENT_ID", ""),
			GoogleClientSecret:      getEnv("GOOGLE_CLIENT_SECRET", ""),
			GoogleOAuthRedirectURI:  getEnv("GOOGLE_OAUTH_REDIRECT_URI", ""),
			FrontendURL:            getEnv("FRONTEND_URL", "http://localhost"),
			OAuthEnabled:            getEnv("OAUTH_ENABLED", "false") == "true",
			FirebaseProjectID:        getEnv("FIREBASE_PROJECT_ID", ""),
			FirebaseCredentials:      getEnv("FIREBASE_CREDENTIALS", ""),
			FirebaseCredentialsPath:  getEnv("FIREBASE_CREDENTIALS_PATH", "/app/firebase-service-account.json"),
		}

		// Validate JWT secret - MUST be set in production
		if cfg.JWTSecret == "" {
			panic("JWT_SECRET environment variable is required. Set a strong secret with at least 32 characters.")
		}

		// In production, reject weak secrets
		if cfg.Environment == "production" && len(cfg.JWTSecret) < 32 {
			panic("JWT_SECRET must be at least 32 characters in production")
		}
	})
	return cfg
}

func getEnv(key, fallback string) string {
	if val := os.Getenv(key); val != "" {
		return val
	}
	return fallback
}

func getEnvInt(key string, fallback int) int {
	if val := os.Getenv(key); val != "" {
		if intVal, err := strconv.Atoi(val); err == nil {
			return intVal
		}
	}
	return fallback
}