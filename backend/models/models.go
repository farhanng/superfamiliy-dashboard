package models

import (
	"time"

	"superfamily-backend/middleware"
)

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

// Sanitize applies XSS escaping to user-generated fields
func (u *User) Sanitize() {
	u.Name = middleware.SanitizeUserName(u.Name)
}

// SanitizeForResponse returns a sanitized copy for JSON responses
func (u *User) SanitizeForResponse() User {
	out := *u
	out.Sanitize()
	return out
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

// Sanitize applies XSS escaping to user-generated fields
func (w *WhitelistUser) Sanitize() {
	w.Name = middleware.SanitizeUserName(w.Name)
}

// SanitizeForResponse returns a sanitized copy for JSON responses
func (w *WhitelistUser) SanitizeForResponse() WhitelistUser {
	out := *w
	out.Sanitize()
	return out
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

// WeekendActivity represents a weekend plan (stores activities as JSON string)
type WeekendActivity struct {
	ID         string    `json:"id"`
	Date       string    `json:"date"`
	Activities string    `json:"activities"` // JSON string array of activity items
	CreatedBy  *string   `json:"created_by,omitempty"`
	CreatedAt  time.Time `json:"created_at"`
	UpdatedAt  time.Time `json:"updated_at"`
}

// FamilyMember represents a family member
type FamilyMember struct {
	ID           string    `json:"id"`
	Name         string    `json:"name"`
	Relationship string    `json:"relationship"`
	Phone        string    `json:"phone"`
	CreatedAt    time.Time `json:"created_at"`
}

// Sanitize applies XSS escaping to user-generated fields
func (f *FamilyMember) Sanitize() {
	f.Name = middleware.SanitizeUserName(f.Name)
	f.Relationship = middleware.SanitizeUserInput(f.Relationship)
}

// SanitizeForResponse returns a sanitized copy for JSON responses
func (f *FamilyMember) SanitizeForResponse() FamilyMember {
	out := *f
	out.Sanitize()
	return out
}

// SanitizeAll applies sanitization to a slice of family members
func SanitizeAllFamilyMembers(members []FamilyMember) []FamilyMember {
	result := make([]FamilyMember, len(members))
	for i, m := range members {
		result[i] = m.SanitizeForResponse()
	}
	return result
}

// API Response types
type AuthResponse struct {
	Token string `json:"token"`
	User  User   `json:"user"`
}

type ErrorResponse struct {
	Error string `json:"error"`
}