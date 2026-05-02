package models

import "time"

// User represents a family member account
type User struct {
	ID           string    `json:"id"`
	Email        string    `json:"email"`
	PasswordHash string    `json:"-"`
	Name         string    `json:"name"`
	Role         string    `json:"role"`
	Provider     string    `json:"provider"` // "local" or "google"
	CreatedAt    time.Time `json:"created_at"`
}

// WhitelistUser represents an authorized Google account
type WhitelistUser struct {
	ID        string    `json:"id"`
	Email     string    `json:"email"`
	Name      string    `json:"name"`
	Status    string    `json:"status"` // active, suspended, pending
	CreatedAt time.Time `json:"created_at"`
	CreatedBy *string   `json:"created_by,omitempty"`
	UpdatedAt time.Time `json:"updated_at"`
}

// UserAccount links local user to Google account
type UserAccount struct {
	ID           string    `json:"id"`
	UserID       string    `json:"user_id"`
	GoogleEmail  string    `json:"google_email"`
	GoogleUserID string    `json:"google_user_id"`
	GoogleName   *string   `json:"google_name,omitempty"`
	LinkedAt     time.Time `json:"linked_at"`
}

// Bill represents a recurring or one-time bill
type Bill struct {
	ID          string     `json:"id"`
	Title       string     `json:"title"`
	Amount      int        `json:"amount"`
	DueDate     string     `json:"due_date"`
	Frequency   string     `json:"frequency"`
	Category    string     `json:"category"`
	IsPaid      bool       `json:"is_paid"`
	PaidDate    *string    `json:"paid_date,omitempty"`
	PaidBy      *string    `json:"paid_by,omitempty"`
	NotifyBefore int       `json:"notify_before"`
	NotifiedAt  *string    `json:"notified_at,omitempty"`
	Note        *string    `json:"note,omitempty"`
	CreatedBy   *string    `json:"created_by,omitempty"`
	CreatedAt   time.Time  `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

// Reminder represents a tax or document reminder
type Reminder struct {
	ID          string    `json:"id"`
	Title       string    `json:"title"`
	Amount      int       `json:"amount"`
	DueDate     string    `json:"due_date"`
	Frequency   string    `json:"frequency"`
	Category    string    `json:"category"`
	IsPaid      bool      `json:"is_paid"`
	PaidDate    *string   `json:"paid_date,omitempty"`
	PaidBy      *string   `json:"paid_by,omitempty"`
	NotifyBefore int      `json:"notify_before"`
	NotifiedAt  *string   `json:"notified_at,omitempty"`
	Note        *string   `json:"note,omitempty"`
	CreatedBy   *string   `json:"created_by,omitempty"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

// Event represents a calendar event
type Event struct {
	ID         string    `json:"id"`
	Title      string    `json:"title"`
	Date       string    `json:"date"`
	Type       string    `json:"type"`
	Color      *string   `json:"color,omitempty"`
	NotifyDays int       `json:"notify_days"`
	Note       *string   `json:"note,omitempty"`
	CreatedBy  *string   `json:"created_by,omitempty"`
	CreatedAt  time.Time `json:"created_at"`
	UpdatedAt  time.Time `json:"updated_at"`
}

// Transaction represents a budget transaction
type Transaction struct {
	ID        string    `json:"id"`
	Amount    int       `json:"amount"`
	Category  string    `json:"category"`
	Date      string    `json:"date"`
	Type      string    `json:"type"` // income or expense
	Status    string    `json:"status"`
	Note      *string   `json:"note,omitempty"`
	CreatedBy *string   `json:"created_by,omitempty"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

// Budget represents monthly budget
type Budget struct {
	ID        string    `json:"id"`
	Month     string    `json:"month"`
	Amount    int       `json:"amount"`
	UpdatedAt time.Time `json:"updated_at"`
}

// MealPlan represents a weekly meal plan
type MealPlan struct {
	ID        string    `json:"id"`
	WeekStart string    `json:"week_start"`
	Meals     string    `json:"meals"`
	CreatedBy *string   `json:"created_by,omitempty"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

// WeekendActivity represents a weekend plan
type WeekendActivity struct {
	ID        string    `json:"id"`
	Date      string    `json:"date"`
	Activity  string    `json:"activity"`
	Status    string    `json:"status"`
	CreatedBy *string   `json:"created_by,omitempty"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

// FamilyMember represents a family member
type FamilyMember struct {
	ID           string    `json:"id"`
	Name         string    `json:"name"`
	Relationship string    `json:"relationship"`
	Phone        string    `json:"phone"`
	CreatedAt    time.Time `json:"created_at"`
}

// API Response types
type AuthResponse struct {
	Token string `json:"token"`
	User  User   `json:"user"`
}

type ErrorResponse struct {
	Error string `json:"error"`
}