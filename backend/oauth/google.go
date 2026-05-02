package oauth

import (
	"context"
	"crypto/rand"
	"crypto/sha256"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
	"sync"
	"time"

	"golang.org/x/oauth2"
)

// Google OAuth configuration
var GoogleOAuthConfig *oauth2.Config

// OAuthState stores state for CSRF protection
type OAuthState struct {
	State        string    `json:"state"`
	RedirectURI  string    `json:"redirect_uri"`
	CodeChallenge string   `json:"code_challenge"`
	CodeVerifier string    `json:"-"` // Never serialize to client
	CreatedAt    time.Time `json:"created_at"`
}

// StateStore manages OAuth states in memory
type StateStore struct {
	mu    sync.RWMutex
	states map[string]*OAuthState
	ttl   time.Duration
}

var stateStore *StateStore

// InitStateStore initializes the state store
func InitStateStore(ttlMinutes int) {
	stateStore = &StateStore{
		states: make(map[string]*OAuthState),
		ttl:    time.Duration(ttlMinutes) * time.Minute,
	}
	go stateStore.cleanup()
}

// cleanup removes expired states periodically
func (s *StateStore) cleanup() {
	ticker := time.NewTicker(1 * time.Minute)
	for range ticker.C {
		s.mu.Lock()
		now := time.Now()
		for k, v := range s.states {
			if now.Sub(v.CreatedAt) > s.ttl {
				delete(s.states, k)
			}
		}
		s.mu.Unlock()
	}
}

// GenerateState creates a new OAuth state
func GenerateState(redirectURI, codeChallenge, codeVerifier string) string {
	state := generateRandomString(32)
	stateStore.mu.Lock()
	defer stateStore.mu.Unlock()
	stateStore.states[state] = &OAuthState{
		State:        state,
		RedirectURI:  redirectURI,
		CodeChallenge: codeChallenge,
		CodeVerifier: codeVerifier,
		CreatedAt:    time.Now(),
	}
	return state
}

// ValidateState checks if a state is valid and returns it
func ValidateState(state string) (*OAuthState, bool) {
	stateStore.mu.Lock()
	defer stateStore.mu.Unlock()
	if s, ok := stateStore.states[state]; ok {
		if time.Now().Sub(s.CreatedAt) <= stateStore.ttl {
			delete(stateStore.states, state) // Single use
			return s, true
		}
		delete(stateStore.states, state)
	}
	return nil, false
}

// PKCE utilities
func generateCodeVerifier() string {
	return generateRandomString(64)
}

func generateCodeChallenge(verifier string) string {
	h := sha256.New()
	h.Write([]byte(verifier))
	return base64.RawURLEncoding.EncodeToString(h.Sum(nil))
}

// GeneratePKCE generates both verifier and challenge
func GeneratePKCE() (verifier, challenge string) {
	verifier = generateCodeVerifier()
	challenge = generateCodeChallenge(verifier)
	return
}

// ValidatePKCE verifies the code verifier against the challenge
func ValidatePKCE(verifier, challenge string) bool {
	if verifier == "" || challenge == "" {
		return false
	}
	expected := generateCodeChallenge(verifier)
	return expected == challenge
}

// GenerateRandomString generates a cryptographically secure random string
func generateRandomString(length int) string {
	bytes := make([]byte, length)
	rand.Read(bytes)
	return base64.RawURLEncoding.EncodeToString(bytes)[:length]
}

// Google OAuth client
type GoogleOAuthClient struct {
	config *oauth2.Config
}

type GoogleUserInfo struct {
	ID            string `json:"id"`
	Email         string `json:"email"`
	VerifiedEmail bool   `json:"verified_email"`
	Name          string `json:"name"`
	Picture       string `json:"picture"`
}

// NewGoogleOAuthClient creates a new Google OAuth client
func NewGoogleOAuthClient(clientID, clientSecret, redirectURL string) *GoogleOAuthClient {
	GoogleOAuthConfig = &oauth2.Config{
		ClientID:     clientID,
		ClientSecret: clientSecret,
		RedirectURL:  redirectURL,
		Scopes: []string{
			"openid",
			"https://www.googleapis.com/auth/userinfo.email",
			"https://www.googleapis.com/auth/userinfo.profile",
		},
		Endpoint: oauth2.Endpoint{
			AuthURL:   "https://accounts.google.com/o/oauth2/v2/auth",
			TokenURL:  "https://oauth2.googleapis.com/token",
			AuthStyle: oauth2.AuthStyleInParams,
		},
	}
	return &GoogleOAuthClient{config: GoogleOAuthConfig}
}

// GetAuthURL returns the Google OAuth authorization URL
func (g *GoogleOAuthClient) GetAuthURL(state, codeChallenge string) string {
	return g.config.AuthCodeURL(state,
		oauth2.SetAuthURLParam("response_type", "code"),
		oauth2.SetAuthURLParam("code_challenge", codeChallenge),
		oauth2.SetAuthURLParam("code_challenge_method", "S256"),
		oauth2.SetAuthURLParam("access_type", "offline"),
		oauth2.SetAuthURLParam("prompt", "consent"),
	)
}

// ExchangeCode exchanges an authorization code for tokens
func (g *GoogleOAuthClient) ExchangeCode(ctx context.Context, code string) (*oauth2.Token, error) {
	return g.config.Exchange(ctx, code)
}

// GetUserInfo retrieves user info from Google
func (g *GoogleOAuthClient) GetUserInfo(ctx context.Context, accessToken string) (*GoogleUserInfo, error) {
	client := g.config.Client(ctx, &oauth2.Token{AccessToken: accessToken})
	resp, err := client.Get("https://www.googleapis.com/oauth2/v2/userinfo")
	if err != nil {
		return nil, fmt.Errorf("failed to get user info: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("google api returned status %d", resp.StatusCode)
	}

	var userInfo GoogleUserInfo
	if err := json.NewDecoder(resp.Body).Decode(&userInfo); err != nil {
		return nil, fmt.Errorf("failed to decode user info: %w", err)
	}

	return &userInfo, nil
}

// BuildLogoutURL returns Google's logout URL (optional, for UX)
func BuildLogoutURL(returnTo string) string {
	return fmt.Sprintf("https://accounts.google.com/logout?continue=%s",
		url.QueryEscape(returnTo))
}
