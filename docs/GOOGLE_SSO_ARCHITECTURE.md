# SuperFamily App v2 — Google SSO Architecture

**Document Type:** Technical Architecture Design  
**Status:** Draft - Pending PM PRD & SQA Review  
**Date:** 2026-04-29  
**Version:** 1.0

---

## 1. Architecture Overview

### 1.1 High-Level Flow

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                           GOOGLE SSO FLOW                                     │
│                                                                               │
│   ┌─────────┐     ┌──────────────┐     ┌─────────────┐     ┌──────────────┐  │
│   │  User   │────▶│   Frontend   │────▶│  Backend    │────▶│    Google    │  │
│   │ Browser │◀────│  (PWA)      │◀────│  (/auth/*)  │◀────│   OAuth      │  │
│   └─────────┘     └──────────────┘     └─────────────┘     └──────────────┘  │
│        │                                       │                    │        │
│        │                                       │                    │        │
│        ▼                                       ▼                    ▼        │
│   ┌─────────────────────────────────────────────────────────────────────┐    │
│   │                        WHITELIST CHECK                               │    │
│   │                  (Is user email in whitelist?)                       │    │
│   └─────────────────────────────────────────────────────────────────────┘    │
│                                        │                                      │
│                                        ▼                                      │
│   ┌─────────────────────────────────────────────────────────────────────┐    │
│   │                        JWT GENERATION                                │    │
│   │            (Generate JWT after successful OAuth + whitelist)         │    │
│   └─────────────────────────────────────────────────────────────────────┘    │
│                                                                               │
└──────────────────────────────────────────────────────────────────────────────┘
```

### 1.2 Google OAuth 2.0 + PKCE Flow

```
┌────────────────────────────────────────────────────────────────────────────────────┐
│                           OAUTH 2.0 + PKCE DETAILED FLOW                          │
│                                                                                    │
│  1. FRONTEND INITIATES                                                             │
│     ┌────────┐                                                                       │
│     │User    │ clicks "Login with Google"                                           │
│     │Browser │                                                                       │
│     └───┬────┘                                                                       │
│         │                                                                           │
│         ▼                                                                           │
│  2. FRONTEND GENERATES PKCE                                                         │
│     - code_verifier: 43-128 char random string                                     │
│     - code_challenge: BASE64URL(SHA256(code_verifier))                             │
│     ┌────────────────────────────────────────────────────────────────────┐          │
│     │ Storage: code_verifier in sessionStorage (not localStorage)        │          │
│     └────────────────────────────────────────────────────────────────────┘          │
│                                                                                    │
│  3. REDIRECT TO GOOGLE                                                             │
│     GET /api/auth/google?redirect_uri={app_redirect_uri}                           │
│                                                                                    │
│  4. BACKEND GENERATES STATE + REDIRECT                                             │
│     - state: 32-byte random string (CSRF protection)                               │
│     - Store state in memory or short-lived cookie                                  │
│     - Redirect to Google OAuth URL:                                                │
│       https://accounts.google.com/o/oauth2/v2/auth?                                │
│         client_id={GOOGLE_CLIENT_ID}                                                │
│         &redirect_uri={backend_callback_url}                                        │
│         &response_type=code                                                         │
│         &scope=openid%20email%20profile                                             │
│         &state={state}                                                              │
│         &code_challenge={code_challenge}                                            │
│         &code_challenge_method=S256                                                 │
│                                                                                    │
│  5. USER AUTHENTICATES WITH GOOGLE                                                  │
│     - User logs into Google account                                                │
│     - Google asks for consent to share email/profile                               │
│                                                                                    │
│  6. GOOGLE REDIRECTS BACK                                                           │
│     GET /api/auth/google/callback?code={auth_code}&state={state}                  │
│                                                                                    │
│  7. BACKEND VALIDATES + EXCHANGES CODE                                              │
│     - Verify state matches (CSRF protection)                                       │
│     - Exchange code for tokens:                                                    │
│       POST https://oauth2.googleapis.com/token                                      │
│         client_id={GOOGLE_CLIENT_ID}                                               │
│         &client_secret={GOOGLE_CLIENT_SECRET}                                      │
│         &code={auth_code}                                                           │
│         &grant_type=authorization_code                                              │
│         &redirect_uri={callback_url}                                                │
│                                                                                    │
│  8. BACKEND GETS USER INFO                                                          │
│     GET https://www.googleapis.com/oauth2/v2/userinfo                              │
│     Header: Authorization: Bearer {access_token}                                   │
│                                                                                    │
│  9. WHITELIST CHECK                                                                 │
│     ┌────────────────────────────────────────────────────────────────────┐          │
│     │ SELECT * FROM whitelist_users WHERE email = ? AND status = 'active'│          │
│     └────────────────────────────────────────────────────────────────────┘          │
│                                                                                    │
│  10. IF WHITELISTED:                                                                │
│      - Find or create user_account by google_email                                  │
│      - Generate JWT                                                                 │
│      - Redirect to frontend with token                                              │
│                                                                                    │
│      IF NOT WHITELISTED:                                                            │
│      - Redirect to frontend with error "access_denied"                              │
│                                                                                    │
└────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Data Model Updates

### 2.1 New Tables

```sql
-- Whitelist of allowed Google accounts
CREATE TABLE whitelist_users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    status TEXT DEFAULT 'active',      -- active, suspended, pending
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_by TEXT REFERENCES users(id),
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Link local user accounts to Google accounts
CREATE TABLE user_accounts (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id),
    google_email TEXT UNIQUE NOT NULL,
    google_user_id TEXT UNIQUE NOT NULL,
    google_name TEXT,
    linked_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Index for fast lookups
CREATE INDEX idx_whitelist_email ON whitelist_users(email);
CREATE INDEX idx_whitelist_status ON whitelist_users(status);
CREATE INDEX idx_user_accounts_google_email ON user_accounts(google_email);
```

### 2.2 Updated Models

```go
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

// Updated User model - add provider field
type User struct {
    ID           string    `json:"id"`
    Email        string    `json:"email"`
    PasswordHash string    `json:"-"`
    Name         string    `json:"name"`
    Role         string    `json:"role"`
    Provider     string    `json:"provider"` // "local" or "google"
    CreatedAt    time.Time `json:"created_at"`
}
```

### 2.3 Schema Migration

```sql
-- Migration: Add provider column to users
ALTER TABLE users ADD COLUMN provider TEXT DEFAULT 'local';

-- Migration: Create whitelist_users table
CREATE TABLE IF NOT EXISTS whitelist_users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    status TEXT DEFAULT 'active',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_by TEXT REFERENCES users(id),
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Migration: Create user_accounts table
CREATE TABLE IF NOT EXISTS user_accounts (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id),
    google_email TEXT UNIQUE NOT NULL,
    google_user_id TEXT UNIQUE NOT NULL,
    google_name TEXT,
    linked_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_whitelist_email ON whitelist_users(email);
CREATE INDEX IF NOT EXISTS idx_whitelist_status ON whitelist_users(status);
CREATE INDEX IF NOT EXISTS idx_user_accounts_google_email ON user_accounts(google_email);
```

---

## 3. API Endpoints

### 3.1 OAuth Endpoints

```
GET  /api/auth/google
     Query params: redirect_uri (optional, for post-login redirect)
     Response: 302 Redirect to Google OAuth
     Security: No auth required

GET  /api/auth/google/callback
     Query params: code, state, error (if denied)
     Response: 
       - Success: 302 Redirect to frontend with JWT token
         Frontend URL: /auth/callback?token={jwt}&user={user_json}
       - Error: 302 Redirect to frontend error page
         Frontend URL: /auth/error?reason=access_denied
     Security: State validation, PKCE validation
```

### 3.2 Whitelist Admin Endpoints (Admin Only)

```
GET    /api/auth/whitelist
       Response: { "users": [WhitelistUser] }
       Security: AuthRequired + AdminRole

POST   /api/auth/whitelist
       Body: { "email": "user@gmail.com", "name": "User Name" }
       Response: { "user": WhitelistUser }
       Security: AuthRequired + AdminRole
       Notes: Sends invitation email (future), creates pending entry

DELETE /api/auth/whitelist/:email
       Response: { "message": "Removed from whitelist" }
       Security: AuthRequired + AdminRole
       Notes: Soft delete - set status to 'suspended'
```

### 3.3 Updated Auth Endpoints

```
POST   /api/auth/register      (unchanged - local accounts)
POST   /api/auth/login         (unchanged - local accounts)
POST   /api/auth/logout        (unchanged)
GET    /api/auth/me            (updated - returns provider info)
```

---

## 4. Security Design

### 4.1 OAuth 2.0 Security Features

| Feature | Implementation | Purpose |
|---------|----------------|---------|
| **PKCE** | SHA256(code_verifier) → code_challenge | Prevents authorization code interception |
| **State Parameter** | 32-byte random, validated on callback | CSRF protection |
| **HTTPS** | Required for production | Encrypts token transmission |
| **Short-lived Codes** | Google codes are single-use | Prevents replay attacks |
| **No Token Storage** | Access token used once, discarded | Minimizes exposure |

### 4.2 PKCE Implementation

```go
// Frontend generates:
codeVerifier := generateRandomString(64) // 43-128 chars
codeChallenge := base64URLEncode(sha256(codeVerifier))

// Frontend stores in sessionStorage:
sessionStorage.setItem('code_verifier', codeVerifier)

// Frontend redirects to:
/api/auth/google?code_challenge={codeChallenge}&redirect_uri={postLoginRedirect}
```

### 4.3 State Management

```go
// Backend generates state:
state := generateRandomString(32)

// State can be stored in:
type OAuthState struct {
    State       string    `json:"state"`
    RedirectURI string    `json:"redirect_uri"`
    CodeChallenge string  `json:"code_challenge"`
    CreatedAt   time.Time `json:"created_at"`
}

// Use short-lived in-memory store (5 min TTL)
// Or use signed cookie with HMAC
```

### 4.4 HTTPS Consideration for Local Deployment

**Current Environment:** Private network (192.168.0.29) - no external access

**Options:**

| Option | Pros | Cons |
|--------|------|------|
| **Cloudflare Tunnel** | Free, auto-HTTPS, works for local | Requires Cloudflare account |
| **Self-signed cert** | Free, local only | Browser warnings, no mobile PWA |
| **Caddy + self-signed** | Auto-HTTPS, easy setup | Still self-signed |
| **Skip HTTPS (local only)** | Simplest | Not suitable if app ever exposed |

**Recommendation:** 
- Use Cloudflare Tunnel for external access (future)
- For local-only: Accept self-signed or use Cloudflare warp
- Add `GOOGLE_OAUTH_REDIRECT_URI` env var to handle HTTPS callback

### 4.5 Token Security

```go
// Access token from Google: USE ONCE, DON'T STORE
// 1. Exchange code → tokens
// 2. Use access_token to get userinfo
// 3. DISCARD access_token immediately

// JWT token: Our app's session token
// - 24 hour expiry (existing design)
// - Stored in localStorage (existing design)
// - HttpOnly cookie option for extra security (future)
```

---

## 5. Configuration

### 5.1 Environment Variables

```bash
# Google OAuth (required for SSO)
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
GOOGLE_OAUTH_REDIRECT_URI=https://your-domain.com/api/auth/google/callback

# Optional: Override default callback (useful for Cloudflare Tunnel)
# GOOGLE_CALLBACK_BASE_URL=https://your-tunnel-url.trycloudflare.com

# Frontend URL for post-login redirect
FRONTEND_URL=http://192.168.0.29

# OAuth state TTL (default: 5 minutes)
OAUTH_STATE_TTL=300
```

### 5.2 Google Cloud Console Setup

1. Create project at https://console.cloud.google.com
2. Enable Google OAuth 2.0 API
3. Configure OAuth consent screen:
   - User type: Internal (for family/local use)
   - Scopes: `email`, `profile`, `openid`
4. Create OAuth credentials:
   - Application type: Web application
   - Authorized redirect URIs:
     - `http://localhost:3001/api/auth/google/callback` (dev)
     - `https://your-domain.com/api/auth/google/callback` (prod)
     - `https://*.trycloudflare.com/api/auth/google/callback` (tunnel)

---

## 6. Implementation Roadmap

### Priority 1: Core OAuth Flow (Week 1)
- [ ] Add `whitelist_users` and `user_accounts` tables
- [ ] Implement OAuth state management
- [ ] Implement `/api/auth/google` endpoint
- [ ] Implement `/api/auth/google/callback` endpoint
- [ ] Add PKCE verification
- [ ] Test full OAuth flow

### Priority 2: Whitelist Management (Week 1-2)
- [ ] Add whitelist CRUD to repository
- [ ] Add admin endpoints for whitelist management
- [ ] Create admin middleware (admin role check)
- [ ] Frontend: Admin whitelist management UI

### Priority 3: User Linking (Week 2)
- [ ] Implement find-or-create user logic
- [ ] Link Google account to local user
- [ ] Update `/api/auth/me` to show provider
- [ ] Handle account linking edge cases

### Priority 4: Security Hardening (Week 2)
- [ ] Add HTTPS support (Cloudflare Tunnel)
- [ ] Rate limiting on OAuth endpoints
- [ ] Audit logging for whitelist changes
- [ ] Session binding (device limit per user)

### Priority 5: Frontend Integration (Week 2-3)
- [ ] "Login with Google" button UI
- [ ] OAuth callback handler
- [ ] Token storage and refresh
- [ ] Error handling UI
- [ ] Logout integration

---

## 7. File Structure Changes

```
backend/
├── config/
│   └── config.go          # Add: GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, etc.
├── models/
│   └── models.go          # Add: WhitelistUser, UserAccount; Update: User
├── repositories/
│   └── repository.go      # Add: Whitelist and UserAccount CRUD
├── services/
│   └── service.go         # Add: OAuth, whitelist service methods
├── handlers/
│   ├── auth.go            # Add: Google OAuth handlers
│   └── whitelist.go      # New: Whitelist admin handlers
├── middleware/
│   └── auth.go            # Add: Admin role middleware
├── oauth/                  # New: OAuth package
│   ├── google.go          # Google OAuth client
│   └── state.go          # OAuth state management
└── main.go               # Add: OAuth routes
```

---

## 8. Error Handling

### OAuth Error Responses

| Error | Cause | User Message |
|-------|-------|--------------|
| `access_denied` | User denied Google consent | "Login cancelled" |
| `invalid_state` | CSRF attack / expired state | "Session expired, please try again" |
| `email_not_whitelisted` | Email not in whitelist | "Your account is not authorized" |
| `account_suspended` | Whitelist status = suspended | "Your access has been suspended" |
| `oauth_error` | Google API error | "Google authentication failed" |

### Frontend Error Pages

```
/auth/error?reason=access_denied
/auth/error?reason=email_not_whitelisted
/auth/error?reason=session_expired
/auth/error?reason=oauth_error
```

---

## 9. Testing Scenarios (For SQA)

### 9.1 Happy Path
1. User clicks "Login with Google"
2. User selects Google account
3. User grants permission
4. User redirected to app, logged in

### 9.2 Whitelist Tests
1. Non-whitelisted user attempts login → access_denied
2. Admin adds user to whitelist → user can login
3. Admin suspends user → user cannot login
4. Admin removes user → user cannot login

### 9.3 Security Tests
1. Tamper with state parameter → rejected
2. Reuse authorization code → rejected
3. Modify code_verifier → rejected
4. Access callback without state → rejected
5. Rate limit: 10 failed attempts → temporary block

### 9.4 PKCE Tests
1. Missing code_challenge → rejected
2. Wrong code_challenge_method → rejected
3. Invalid code_verifier on callback → rejected

---

## 10. Open Questions for PM

1. **First-time login experience:** Should Google users auto-create an account, or require admin pre-approval?
2. **Existing local users:** Can local accounts also link Google accounts for login?
3. **Account recovery:** If Google account is lost/suspended, how to recover access?
4. **Logout behavior:** Should "Logout" disconnect Google account linking?
5. **Multiple family members:** Same Google account for multiple family users?

---

## 11. Dependencies

```go
// New dependencies needed
golang.org/x/oauth2        // OAuth2 client
github.com/google/uuid     // Already used
```

```javascript
// Frontend changes
// Minimal - mostly just adds "Login with Google" button
// No new npm packages needed
```

---

## 12. Rollback Plan

If Google SSO needs to be disabled:
1. Set `GOOGLE_OAUTH_ENABLED=false`
2. OAuth endpoints return 501 Not Implemented
3. All existing JWT sessions remain valid
4. Local login remains available

---

**Document Status:** Ready for PM Review  
**Next Steps:** 
- PM: Review and provide PRD clarifications
- SQA: Review test scenarios
- Dev: Await approval before implementation
