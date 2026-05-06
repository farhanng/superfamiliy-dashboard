package firebase

import (
	"context"
	"fmt"
	"log"
	"os"
	"strings"
	"time"

	"cloud.google.com/go/firestore"
	firebase "firebase.google.com/go/v4"
	"firebase.google.com/go/v4/messaging"
	"google.golang.org/api/option"
)

var (
	client     *firestore.Client
	messagingClient *messaging.Client
	projectID  string
)

// Config holds Firebase configuration
type Config struct {
	ProjectID       string
	Credentials    string // JSON content
	CredentialsPath string // Path to service account JSON file
}

// Init initializes Firebase Admin SDK
func Init(ctx context.Context, cfg Config) error {
	if cfg.ProjectID == "" {
		return fmt.Errorf("FirebaseProjectID is required")
	}
	if cfg.Credentials == "" && cfg.CredentialsPath == "" {
		return fmt.Errorf("Firebase credentials not provided: set FIREBASE_CREDENTIALS or FIREBASE_CREDENTIALS_PATH")
	}

	projectID = cfg.ProjectID

	// Determine credentials source
	var opt option.ClientOption
	if cfg.CredentialsPath != "" {
		if _, err := os.Stat(cfg.CredentialsPath); err == nil {
			opt = option.WithCredentialsFile(cfg.CredentialsPath)
			log.Printf("Using Firebase credentials from file: %s", cfg.CredentialsPath)
		} else {
			log.Printf("Firebase credentials file not found at %s: %v", cfg.CredentialsPath, err)
		}
	}
	if opt == nil && cfg.Credentials != "" {
		if strings.HasPrefix(cfg.Credentials, "{") {
			opt = option.WithCredentialsJSON([]byte(cfg.Credentials))
			log.Println("Using Firebase credentials from environment variable")
		}
	}
	if opt == nil {
		return fmt.Errorf("Firebase credentials not available: set FIREBASE_CREDENTIALS or FIREBASE_CREDENTIALS_PATH")
	}

	// Initialize Firebase
	app, err := firebase.NewApp(ctx, &firebase.Config{
		ProjectID: cfg.ProjectID,
	}, opt)
	if err != nil {
		return fmt.Errorf("failed to initialize Firebase app: %w", err)
	}

	// Initialize Firestore client
	client, err = app.Firestore(ctx)
	if err != nil {
		return fmt.Errorf("failed to initialize Firestore: %w", err)
	}

	// Initialize Messaging client (optional, for FCM)
	messagingClient, err = app.Messaging(ctx)
	if err != nil {
		log.Printf("Warning: Firebase Messaging not available: %v", err)
	}

	log.Printf("Firebase initialized successfully for project: %s", projectID)
	return nil
}

// credBytes checks if string is file path or JSON content
func credBytes(s string) string {
	if len(s) > 0 {
		return s
	}
	return ""
}

// GetClient returns the Firestore client
func GetClient() *firestore.Client {
	return client
}

// GetMessagingClient returns the Firebase Messaging client
func GetMessagingClient() *messaging.Client {
	return messagingClient
}

// GetProjectID returns the Firebase project ID
func GetProjectID() string {
	return projectID
}

// Close closes Firebase connections
func Close() error {
	if client != nil {
		if err := client.Close(); err != nil {
			return err
		}
	}
	return nil
}

// Collection helper
func Collection(name string) *firestore.CollectionRef {
	if client == nil {
		return nil
	}
	return client.Collection(name)
}

// Doc helper
func Doc(path string) *firestore.DocumentRef {
	return client.Doc(path)
}

// WhitelistUser represents a whitelist user document in Firestore
type WhitelistUser struct {
	ID        string    `json:"id" firestore:"id"`
	Email     string    `json:"email" firestore:"email"`
	Name      string    `json:"name" firestore:"name"`
	Status    string    `json:"status" firestore:"status"` // active, suspended
	CreatedAt time.Time `json:"createdAt" firestore:"created_at"`
	CreatedBy *string   `json:"createdBy" firestore:"created_by"`
	UpdatedAt time.Time `json:"updatedAt" firestore:"updated_at"`
}

// User represents a user document in Firestore
type User struct {
	ID           string    `json:"id" firestore:"id"`
	Email        string    `json:"email" firestore:"email"`
	PasswordHash string    `json:"-" firestore:"password_hash"`
	Name         string    `json:"name" firestore:"name"`
	Role         string    `json:"role" firestore:"role"` // admin, member
	Provider     string    `json:"provider" firestore:"provider"` // local, google
	CreatedAt    time.Time `json:"createdAt" firestore:"created_at"`
}

// WhitelistRepository handles whitelist operations in Firestore
type WhitelistRepository struct {
	collection *firestore.CollectionRef
}

// NewWhitelistRepository creates a new whitelist repository
func NewWhitelistRepository() *WhitelistRepository {
	return &WhitelistRepository{
		collection: Collection("whitelist_users"),
	}
}

// GetAll returns all whitelist users
func (r *WhitelistRepository) GetAll(ctx context.Context) ([]WhitelistUser, error) {
	if r.collection == nil {
		return nil, fmt.Errorf("firebase client not initialized")
	}
	docs, err := r.collection.OrderBy("created_at", firestore.Asc).Documents(ctx).GetAll()
	if err != nil {
		return nil, err
	}

	users := make([]WhitelistUser, 0, len(docs))
	for _, doc := range docs {
		var user WhitelistUser
		if err := doc.DataTo(&user); err != nil {
			log.Printf("Warning: failed to parse whitelist user %s: %v", doc.Ref.ID, err)
			continue
		}
		user.ID = doc.Ref.ID
		users = append(users, user)
	}

	return users, nil
}

// GetByEmail returns a whitelist user by email
func (r *WhitelistRepository) GetByEmail(ctx context.Context, email string) (*WhitelistUser, error) {
	if r.collection == nil {
		return nil, fmt.Errorf("firebase client not initialized")
	}
	// Query by email field
	docs, err := r.collection.Where("email", "==", strings.ToLower(email)).Limit(1).Documents(ctx).GetAll()
	if err != nil {
		return nil, err
	}

	if len(docs) == 0 {
		return nil, nil
	}

	var user WhitelistUser
	if err := docs[0].DataTo(&user); err != nil {
		return nil, err
	}
	user.ID = docs[0].Ref.ID

	return &user, nil
}

// Create creates a new whitelist user
func (r *WhitelistRepository) Create(ctx context.Context, user *WhitelistUser) (*WhitelistUser, error) {
	if r.collection == nil {
		return nil, fmt.Errorf("firebase client not initialized")
	}
	// Check if email already exists
	existing, err := r.GetByEmail(ctx, user.Email)
	if err != nil {
		return nil, err
	}
	if existing != nil {
		return nil, fmt.Errorf("email already in whitelist")
	}

	// Use email as document ID for easy lookup
	docID := strings.ToLower(user.Email)
	user.Email = strings.ToLower(user.Email)

	_, err = r.collection.Doc(docID).Set(ctx, user)
	if err != nil {
		return nil, err
	}

	user.ID = docID
	return user, nil
}

// UpdateStatus updates the status of a whitelist user by email
func (r *WhitelistRepository) UpdateStatus(ctx context.Context, email string, status string) error {
	email = strings.ToLower(email)
	_, err := r.collection.Doc(email).Update(ctx, []firestore.Update{
		{Path: "status", Value: status},
		{Path: "updated_at", Value: firestore.ServerTimestamp},
	})
	return err
}

// UpdateEmail updates the email of a whitelist user
func (r *WhitelistRepository) UpdateEmail(ctx context.Context, oldEmail, newEmail string) error {
	oldEmail = strings.ToLower(oldEmail)
	newEmail = strings.ToLower(newEmail)

	// Get the document
	doc, err := r.collection.Doc(oldEmail).Get(ctx)
	if err != nil {
		return err
	}

	var user WhitelistUser
	if err := doc.DataTo(&user); err != nil {
		return err
	}

	// Create new document with new email
	user.Email = newEmail
	_, err = r.collection.Doc(newEmail).Set(ctx, user)
	if err != nil {
		return err
	}

	// Delete old document
	_, err = r.collection.Doc(oldEmail).Delete(ctx)
	return err
}

// Delete deletes a whitelist user by email
func (r *WhitelistRepository) Delete(ctx context.Context, email string) error {
	email = strings.ToLower(email)
	_, err := r.collection.Doc(email).Delete(ctx)
	return err
}

// UserRepository handles user operations in Firestore
type UserRepository struct {
	collection *firestore.CollectionRef
}

// NewUserRepository creates a new user repository
func NewUserRepository() *UserRepository {
	return &UserRepository{
		collection: Collection("users"),
	}
}

// GetByEmail returns a user by email
func (r *UserRepository) GetByEmail(ctx context.Context, email string) (*User, error) {
	docs, err := r.collection.Where("email", "==", strings.ToLower(email)).Limit(1).Documents(ctx).GetAll()
	if err != nil {
		return nil, err
	}

	if len(docs) == 0 {
		return nil, nil
	}

	var user User
	if err := docs[0].DataTo(&user); err != nil {
		return nil, err
	}
	user.ID = docs[0].Ref.ID

	return &user, nil
}

// GetByID returns a user by ID
func (r *UserRepository) GetByID(ctx context.Context, id string) (*User, error) {
	doc, err := r.collection.Doc(id).Get(ctx)
	if err != nil {
		return nil, err
	}
	if !doc.Exists() {
		return nil, nil
	}

	var user User
	if err := doc.DataTo(&user); err != nil {
		return nil, err
	}
	user.ID = doc.Ref.ID

	return &user, nil
}

// GetByGoogleID returns a user by Google ID
func (r *UserRepository) GetByGoogleID(ctx context.Context, googleID string) (*User, error) {
	docs, err := r.collection.Where("google_id", "==", googleID).Limit(1).Documents(ctx).GetAll()
	if err != nil {
		return nil, err
	}

	if len(docs) == 0 {
		return nil, nil
	}

	var user User
	if err := docs[0].DataTo(&user); err != nil {
		return nil, err
	}
	user.ID = docs[0].Ref.ID

	return &user, nil
}

// Create creates a new user
func (r *UserRepository) Create(ctx context.Context, user *User) (*User, error) {
	// Check if email exists
	existing, err := r.GetByEmail(ctx, user.Email)
	if err != nil {
		return nil, err
	}
	if existing != nil {
		return nil, fmt.Errorf("user already exists")
	}

	docID := user.ID
	user.Email = strings.ToLower(user.Email)

	_, err = r.collection.Doc(docID).Set(ctx, user)
	if err != nil {
		return nil, err
	}

	user.ID = docID
	return user, nil
}

// SeedWhitelist seeds the initial whitelist users
func (r *WhitelistRepository) SeedWhitelist(ctx context.Context) error {
	users := []WhitelistUser{
		{
			ID:        "farhan.naufalghani@gmail.com",
			Email:     "farhan.naufalghani@gmail.com",
			Name:      "Farhan",
			Status:    "active",
			CreatedAt: time.Now(),
			UpdatedAt: time.Now(),
		},
		{
			ID:        "ineprinusantari@gmail.com",
			Email:     "ineprinusantari@gmail.com",
			Name:      "Inne",
			Status:    "active",
			CreatedAt: time.Now(),
			UpdatedAt: time.Now(),
		},
	}

	for _, user := range users {
		existing, _ := r.GetByEmail(ctx, user.Email)
		if existing != nil {
			log.Printf("Whitelist user %s already exists, skipping", user.Email)
			continue
		}

		_, err := r.Create(ctx, &user)
		if err != nil {
			log.Printf("Warning: failed to seed whitelist user %s: %v", user.Email, err)
		} else {
			log.Printf("Seeded whitelist user: %s", user.Email)
		}
	}

	return nil
}