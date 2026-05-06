package middleware

import (
	"html"
	"strings"
	"sync"
)

// Sanitizer provides XSS sanitization utilities
type Sanitizer struct {
	// reserved - could add more sophisticated sanitization later
}

var (
	sanitizer     *Sanitizer
	sanitizerOnce sync.Once
)

// GetSanitizer returns the singleton sanitizer
func GetSanitizer() *Sanitizer {
	sanitizerOnce.Do(func() {
		sanitizer = &Sanitizer{}
	})
	return sanitizer
}

// EscapeHTML escapes HTML special characters to prevent XSS
// This should be applied to ALL user-generated content before storing or returning
func (s *Sanitizer) EscapeHTML(input string) string {
	return html.EscapeString(input)
}

// SanitizeUserInput sanitizes user input fields that may contain XSS
// Call this when storing user input AND when returning it to clients
func SanitizeUserInput(input string) string {
	if input == "" {
		return input
	}
	// Trim whitespace first
	sanitized := strings.TrimSpace(input)
	// Then escape HTML characters
	return html.EscapeString(sanitized)
}

// SanitizeUserName sanitizes a user's display name
func SanitizeUserName(name string) string {
	return SanitizeUserInput(name)
}

// SanitizeNote sanitizes a note/comment field
func SanitizeNote(note string) string {
	return SanitizeUserInput(note)
}

// SanitizeTitle sanitizes a title field
func SanitizeTitle(title string) string {
	return SanitizeUserInput(title)
}

// SanitizeEmail sanitizes email (less aggressive - only escape HTML entities, not structural chars)
func SanitizeEmail(email string) string {
	if email == "" {
		return email
	}
	// For email, we primarily want to escape HTML but preserve the @ and domain
	// html.EscapeString handles this correctly
	return html.EscapeString(strings.TrimSpace(email))
}