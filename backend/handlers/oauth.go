package handlers

import (
	"context"
	"fmt"
	"net/http"
	"net/url"

	"superfamily-backend/config"
	"superfamily-backend/middleware"
	"superfamily-backend/oauth"
	"superfamily-backend/services"

	"github.com/gin-gonic/gin"
)

// OAuthHandler handles Google OAuth
type OAuthHandler struct {
	svc        *services.Service
	googleClient *oauth.GoogleOAuthClient
	config     *config.Config
}

func NewOAuthHandler(svc *services.Service, cfg *config.Config) *OAuthHandler {
	var googleClient *oauth.GoogleOAuthClient
	if cfg.GoogleClientID != "" && cfg.GoogleClientSecret != "" {
		googleClient = oauth.NewGoogleOAuthClient(
			cfg.GoogleClientID,
			cfg.GoogleClientSecret,
			cfg.GoogleOAuthRedirectURI,
		)
	}

	return &OAuthHandler{
		svc:          svc,
		googleClient: googleClient,
		config:       cfg,
	}
}

// OAuth error types
const (
	ErrAccessDenied       = "access_denied"
	ErrInvalidState      = "invalid_state"
	ErrEmailNotWhitelisted = "email_not_whitelisted"
	ErrAccountSuspended   = "account_suspended"
	ErrOAuthFailed        = "oauth_error"
	ErrOAuthDisabled      = "oauth_disabled"
)

// InitiateGoogleOAuth redirects user to Google OAuth
// GET /api/auth/google
func (h *OAuthHandler) InitiateGoogleOAuth(c *gin.Context) {
	if h.googleClient == nil {
		redirectToFrontendError(c, ErrOAuthDisabled, "Google OAuth is not configured")
		return
	}

	// Get redirect URI from query (where to send user after login)
	redirectURI := c.Query("redirect_uri")
	if redirectURI == "" {
		redirectURI = "/"
	}

	// Generate PKCE
	codeVerifier, codeChallenge := oauth.GeneratePKCE()

	// Generate state for CSRF protection
	state := oauth.GenerateState(redirectURI, codeChallenge, codeVerifier)

	// Build Google auth URL
	authURL := h.googleClient.GetAuthURL(state, codeChallenge)

	c.Redirect(http.StatusTemporaryRedirect, authURL)
}

// HandleGoogleCallback handles the OAuth callback from Google
// GET /api/auth/google/callback
func (h *OAuthHandler) HandleGoogleCallback(c *gin.Context) {
	if h.googleClient == nil {
		redirectToFrontendError(c, ErrOAuthDisabled, "Google OAuth is not configured")
		return
	}

	// Check for error from Google
	if errMsg := c.Query("error"); errMsg != "" {
		// User denied or other error
		redirectToFrontendError(c, ErrAccessDenied, errMsg)
		return
	}

	// Get authorization code and state
	code := c.Query("code")
	stateParam := c.Query("state")

	if code == "" || stateParam == "" {
		redirectToFrontendError(c, ErrInvalidState, "Missing code or state")
		return
	}

	// Validate state
	oauthState, valid := oauth.ValidateState(stateParam)
	if !valid {
		redirectToFrontendError(c, ErrInvalidState, "Invalid or expired state")
		return
	}

	// Validate PKCE - critical security check
	if !oauth.ValidatePKCE(oauthState.CodeVerifier, oauthState.CodeChallenge) {
		redirectToFrontendError(c, ErrInvalidState, "PKCE validation failed")
		return
	}

	ctx := context.Background()

	// Exchange code for tokens
	token, err := h.googleClient.ExchangeCode(ctx, code)
	if err != nil {
		redirectToFrontendError(c, ErrOAuthFailed, "Failed to exchange code")
		return
	}

	// Get user info from Google
	userInfo, err := h.googleClient.GetUserInfo(ctx, token.AccessToken)
	if err != nil {
		redirectToFrontendError(c, ErrOAuthFailed, "Failed to get user info")
		return
	}

	// Verify email
	if !userInfo.VerifiedEmail {
		redirectToFrontendError(c, ErrEmailNotWhitelisted, "Google email not verified")
		return
	}

	// Check whitelist
	whitelistUser, err := h.svc.CheckWhitelist(userInfo.Email)
	if err != nil {
		redirectToFrontendError(c, ErrOAuthFailed, "Failed to check whitelist")
		return
	}

	if whitelistUser == nil {
		redirectToFrontendError(c, ErrEmailNotWhitelisted, "Your email is not authorized")
		return
	}

	if whitelistUser.Status != "active" {
		redirectToFrontendError(c, ErrAccountSuspended, "Your account has been suspended")
		return
	}

	// Find or create user
	user, err := h.svc.FindOrCreateUserFromGoogle(userInfo.Email, userInfo.Name, userInfo.ID)
	if err != nil {
		redirectToFrontendError(c, ErrOAuthFailed, "Failed to create user")
		return
	}

	// Generate JWT
	secret := middleware.GetJWTSecret()
	jwtToken, err := middleware.GenerateToken(user.ID, user.Email, user.Role, secret)
	if err != nil {
		redirectToFrontendError(c, ErrOAuthFailed, "Failed to generate token")
		return
	}

	// Build redirect URL with token
	redirectURL := fmt.Sprintf("%s/auth/callback?token=%s&user_id=%s&email=%s&name=%s",
		h.config.FrontendURL,
		url.QueryEscape(jwtToken),
		url.QueryEscape(user.ID),
		url.QueryEscape(user.Email),
		url.QueryEscape(user.Name),
	)

	// Add redirect URI if specified
	if oauthState.RedirectURI != "" && oauthState.RedirectURI != "/" {
		redirectURL += "&redirect_uri=" + url.QueryEscape(oauthState.RedirectURI)
	}

	c.Redirect(http.StatusTemporaryRedirect, redirectURL)
}

// OAuthStatus returns whether OAuth is configured
// GET /api/auth/oauth/status
func (h *OAuthHandler) OAuthStatus(c *gin.Context) {
	enabled := h.googleClient != nil
	c.JSON(http.StatusOK, gin.H{
		"oauth_enabled":     enabled,
		"provider":          "google",
		"google_client_id_set": h.config.GoogleClientID != "",
	})
}

// redirectToFrontendError redirects to frontend error page
func redirectToFrontendError(c *gin.Context, reason, detail string) {
	frontendURL := c.Query("frontend_url")
	if frontendURL == "" {
		frontendURL = "http://localhost"
	}

	redirectURL := fmt.Sprintf("%s/auth/error?reason=%s&detail=%s",
		frontendURL,
		url.QueryEscape(reason),
		url.QueryEscape(detail),
	)

	c.Redirect(http.StatusTemporaryRedirect, redirectURL)
}
