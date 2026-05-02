# SuperFamily App v2 — Google SSO Use Cases & Test Scenarios

**Document Version:** 1.0  
**Date:** 2026-04-29  
**Author:** SQA Engineer Subagent  
**Project:** SuperFamily App v2 — Google SSO Feature  
**Backend:** Go + Gin + SQLite + JWT  
**Deployment:** Private local network (192.168.0.29)

---

## 1. Overview

This document specifies all use cases for the Google OAuth 2.0 Single Sign-On (SSO) feature in SuperFamily App v2. The feature adds Google as an authentication provider alongside the existing email/password login, gated by an email whitelist.

### 1.1 Key Architecture Decisions (from codebase review)

| Aspect | Current State | Google SSO Plan |
|--------|-------------|-----------------|
| Auth method | Email/password + JWT | Add Google OAuth2 |
| JWT expiry | 24 hours (fixed) | Unchanged — Google OAuth refresh handles re-auth |
| Session management | Stateless JWT (no refresh token rotation) | Server-side session registry for multi-device tracking |
| Whitelist | Not implemented yet | New `whitelist` DB table |
| Token storage | localStorage (client-side) | httpOnly cookie preferred, localStorage fallback |
| SSE auth | JWT validated on subscribe | Must validate JWT on SSE connection for Google users too |

### 1.2 Database Schema Additions Required

```sql
-- Email whitelist for Google SSO
CREATE TABLE whitelist (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    added_by TEXT REFERENCES users(id),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Google OAuth state (for CSRF protection)
CREATE TABLE oauth_states (
    state TEXT PRIMARY KEY,
    redirect_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    expires_at DATETIME NOT NULL
);

-- User link to Google (added to existing users table or new table)
CREATE TABLE user_google_links (
    user_id TEXT PRIMARY KEY REFERENCES users(id),
    google_email TEXT UNIQUE NOT NULL,
    google_sub TEXT NOT NULL,
    linked_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

---

## 2. Use Cases — Authentication Flows

### UC-001: User Initiates Google Login

| Field | Value |
|-------|-------|
| **Use Case ID** | UC-001 |
| **Use Case Name** | User Initiates Google Login |
| **Actor** | Registered user with whitelisted email |
| **Trigger** | User clicks "Login with Google" button on login page |
| **Priority** | P0 |
| **Type** | Positive |

**Preconditions:**
- User has a Google account
- User's email is in the whitelist
- App is accessible at `http://192.168.0.29/`
- No active JWT session

**Steps:**
1. User navigates to login page (`/login`)
2. User clicks "Login dengan Google" button
3. Frontend calls `GET /api/auth/google` to get OAuth URL with state parameter
4. Backend generates `state` (UUID, stored in `oauth_states` table with 10-min expiry)
5. Backend constructs Google OAuth URL with: `client_id`, `redirect_uri`, `state`, `scope=openid+email+profile`
6. Frontend redirects browser to Google OAuth consent page
7. User sees Google sign-in and consent screen

**Expected Results:**
- State parameter is cryptographically random (UUID v4 or 32-byte random)
- State is stored server-side in `oauth_states` with `created_at` and `expires_at`
- Redirect URL uses `http://192.168.0.29/api/auth/google/callback` (or appropriate local callback)
- No user data is sent to Google without consent

**Test Scenarios:**

| Scenario | Description | Expected |
|----------|-------------|----------|
| T001-01 | Click "Login dengan Google" button | Redirected to Google OAuth URL with valid state |
| T001-02 | Request `/api/auth/google` twice in quick succession | Two different `state` values generated |
| T001-03 | State stored in DB with correct expiry | `expires_at` = `created_at` + 10 minutes |
| T001-04 | Network intercepted — state is random enough | State is not predictable (no sequential numbers) |

---

### UC-002: Google Returns User to App with Authorization Code

| Field | Value |
|-------|-------|
| **Use Case ID** | UC-002 |
| **Use Case Name** | Google Returns Authorization Code |
| **Actor** | Google OAuth server |
| **Trigger** | User approves permissions on Google consent screen |
| **Priority** | P0 |
| **Type** | Positive |

**Preconditions:**
- UC-001 completed, browser redirected to Google
- User is logged into Google with a whitelisted account
- User approved the requested permissions

**Steps:**
1. User clicks "Allow" on Google consent screen
2. Google redirects to `http://192.168.0.29/api/auth/google/callback?code=AUTH_CODE&state=STATE`
3. Frontend receives the callback request
4. Frontend calls `POST /api/auth/google/callback` with `code` and `state`
5. Backend validates `state` against `oauth_states` table (exists, not expired)
6. Backend deletes `state` from `oauth_states` (one-time use)
7. Backend exchanges `code` for tokens via `https://oauth2.googleapis.com/token`
8. Backend fetches user info via `https://www.googleapis.com/oauth2/v3/userinfo`
9. Backend verifies `email` returned by Google is in whitelist

**Expected Results:**
- State validated: exists in DB, not expired, not already used
- Authorization code is exchanged server-side (code never exposed to frontend JS)
- User info returned: `{ sub, email, name, picture }`
- Email verified by Google (no spoofing possible since Google provides it)
- Whitelist check passes

**Test Scenarios:**

| Scenario | Description | Expected |
|----------|-------------|----------|
| T002-01 | Valid code + valid state | JWT issued, user logged in |
| T002-02 | Valid code + expired state (>10 min) | 400 error "OAuth state expired" |
| T002-03 | Valid code + already-used state | 400 error "OAuth state already used" |
| T002-04 | Valid code + tampered state (not in DB) | 400 error "Invalid OAuth state" |
| T002-05 | Valid code + valid state but email not in whitelist | 403 Forbidden (see UC-004) |
| T002-06 | Google returns error param in callback | Proper error displayed to user |

---

### UC-003: Whitelisted User Successfully Logs In

| Field | Value |
|-------|-------|
| **Use Case ID** | UC-003 |
| **Use Case Name** | Whitelisted User Successfully Authenticates via Google |
| **Actor** | Whitelisted user |
| **Trigger** | User's Google email passes whitelist check |
| **Priority** | P0 |
| **Type** | Positive |

**Preconditions:**
- User's Google email is in `whitelist` table
- User approved Google OAuth consent
- Valid `authorization_code` exchanged successfully

**Steps:**
1. Backend receives Google userinfo: `{ sub: "google-uid", email: "user@gmail.com", name: "User Name" }`
2. Backend checks if `user_google_links` has existing link for this `google_sub`
3. **If link exists:** Fetch existing user from `users` table, proceed to step 7
4. **If link does not exist:** Check if user with same email exists in `users` table
   - If exists: Link Google account to existing user
   - If not exists: Create new user account
5. Store link in `user_google_links` table
6. Generate JWT with `user_id`, `email`, `role`
7. Return JWT to frontend

**Expected Results:**
- Existing user gets JWT without password check
- New user is auto-created with role `member`
- Google `sub` is stored for identity verification
- JWT expiry: 24 hours (existing behavior)
- If user exists with same email but different provider (password-based), error: "Email already registered with password login"

**Test Scenarios:**

| Scenario | Description | Expected |
|----------|-------------|----------|
| T003-01 | New Google user (email not in users table) | New user created, JWT issued |
| T003-02 | Existing user with same email (password-based) | 409 Conflict: "Email already registered with password" |
| T003-03 | Returning Google user (link exists) | Existing user logged in, new JWT issued |
| T003-04 | Google returns verified email | Email used for whitelist check |
| T003-05 | Google returns unverified email | Rejected even if email appears whitelisted |

---

### UC-004: Non-Whitelisted User Attempts Login

| Field | Value |
|-------|-------|
| **Use Case ID** | UC-004 |
| **Use Case Name** | Non-Whitelisted User Denied Access |
| **Actor** | User with Google account not in whitelist |
| **Trigger** | Google userinfo email not found in whitelist |
| **Priority** | P0 |
| **Type** | Negative |

**Preconditions:**
- User clicked "Login dengan Google" and completed OAuth flow
- User's Google email is NOT in the `whitelist` table

**Steps:**
1. Backend completes Google OAuth exchange, receives userinfo
2. Backend checks whitelist — email not found
3. Backend returns HTTP 403 with error message
4. Frontend displays: "Akses ditolak. Email Anda tidak terdaftar dalam sistem."
5. User is NOT logged in, no JWT issued

**Expected Results:**
- HTTP 403 Forbidden returned
- No JWT token created
- No user record created (unless auto-whitelist feature — see UC-011)
- User-friendly error message displayed (not a technical stack trace)
- Event logged for security audit: "Unauthorized Google login attempt for {email}"

**Test Scenarios:**

| Scenario | Description | Expected |
|----------|-------------|----------|
| T004-01 | Email completely absent from whitelist | 403 Forbidden with friendly message |
| T004-02 | Email has leading/trailing spaces | Trimmed and checked — if still not found, 403 |
| T004-03 | Email case mismatch (User@Gmail.com vs user@gmail.com) | Case-insensitive comparison, 403 if not found |
| T004-04 | Rapid repeated attempts from non-whitelisted email | Each attempt logged; consider rate limiting (see UC-020) |

---

### UC-005: User Cancels Google OAuth

| Field | Value |
|-------|-------|
| **Use Case ID** | UC-005 |
| **Use Case Name** | User Cancels Google OAuth Consent |
| **Actor** | User |
| **Trigger** | User clicks "Cancel" or closes the window on Google consent screen |
| **Priority** | P1 |
| **Type** | Negative |

**Preconditions:**
- User clicked "Login dengan Google" (UC-001)
- Browser redirected to Google OAuth consent page

**Steps:**
1. User clicks "Cancel" on Google consent page
2. Google redirects to callback URL with `error=access_denied&state=STATE`
3. Frontend handles error parameter
4. Frontend redirects to login page with error message

**Expected Results:**
- Login page shown with message: "Login dibatalkan. Silakan coba lagi."
- No JWT issued
- No state left in `oauth_states` (already validated or expired)

**Test Scenarios:**

| Scenario | Description | Expected |
|----------|-------------|----------|
| T005-01 | User clicks Cancel on Google consent | Redirected to login page with "dibatalkan" message |
| T005-02 | User closes browser window during Google OAuth | No session created; no crash |
| T005-03 | User presses Back during Google OAuth | Can navigate back to login page |

---

### UC-006: Google Returns Error During OAuth

| Field | Value |
|-------|-------|
| **Use Case ID** | UC-006 |
| **Use Case Name** | Google OAuth Returns Error |
| **Actor** | Google OAuth server |
| **Trigger** | Google returns an error in the callback |
| **Priority** | P1 |
| **Type** | Negative |

**Preconditions:**
- User in OAuth flow with Google
- Google encounters an error (e.g., `error=invalid_request`, `error=server_error`)

**Steps:**
1. Google redirects to callback URL with error and description
2. Frontend/Backend handles error parameter
3. Error is logged with full details (for debugging)
4. User-friendly message displayed

**Expected Results:**
- `error=access_denied` → "Login dibatalkan"
- `error=server_error` → "Terjadi kesalahan dari Google. Silakan coba beberapa saat lagi."
- `error=invalid_request` → "Permintaan tidak valid. Hubungi administrator."
- All errors logged server-side with timestamp and IP

**Test Scenarios:**

| Scenario | Description | Expected |
|----------|-------------|----------|
| T006-01 | `error=access_denied` returned | Friendly "dibatalkan" message |
| T006-02 | `error=server_error` (Google down) | "Google sedang tidak tersedia" message |
| T006-03 | `error=invalid_request` | "Request tidak valid" + logged for admin |

---

### UC-007: Network Error During OAuth Flow

| Field | Value |
|-------|-------|
| **Use Case ID** | UC-007 |
| **Use Case Name** | Network Error During OAuth |
| **Actor** | System / Network |
| **Trigger** | Network failure at any point in OAuth exchange |
| **Priority** | P1 |
| **Type** | Negative / Performance |

**Preconditions:**
- User initiated Google OAuth flow

**Steps:**
1. Network error occurs during:
   - Backend → Google token exchange
   - Backend → Google userinfo fetch
2. Backend catches network error
3. User receives error response

**Expected Results:**
- Timeout: 10 seconds for Google token exchange
- Connection error → 502 "Tidak dapat menghubungi Google. Periksa koneksi internet Anda."
- Retry button displayed on login page
- Partial states in `oauth_states` cleaned up by background job (every 15 min)

**Test Scenarios:**

| Scenario | Description | Expected |
|----------|-------------|----------|
| T007-01 | Token exchange times out | 502 with retry option |
| T007-02 | Google userinfo endpoint unreachable | 502, retry button |
| T007-03 | Slow network (>10s) | Timeout, not hanging |
| T007-04 | Retry succeeds on second attempt | Login completes normally |

---

## 3. Use Cases — Whitelist Management

### UC-008: Admin Adds Email to Whitelist

| Field | Value |
|-------|-------|
| **Use Case ID** | UC-008 |
| **Use Case Name** | Admin Adds Email to Whitelist |
| **Actor** | Admin user |
| **Trigger** | Admin submits email to be added via admin panel |
| **Priority** | P0 |
| **Type** | Positive |

**Preconditions:**
- Actor is logged in with `role=admin`
- Actor has valid JWT
- Target email is not already in whitelist

**Steps:**
1. Admin navigates to admin panel → Whitelist Management
2. Admin enters email address
3. Admin clicks "Tambah"
4. Frontend sends `POST /api/admin/whitelist` with `{ email, name }`
5. Backend validates: email format, not duplicate, actor is admin
6. Backend inserts into `whitelist` table
7. Success message displayed

**Expected Results:**
- HTTP 201 Created
- Whitelist entry created with `added_by` = admin's user ID
- Audit log entry: "Admin {admin_email} added {email} to whitelist at {timestamp}"
- New user can now authenticate via Google SSO

**Test Scenarios:**

| Scenario | Description | Expected |
|----------|-------------|----------|
| T008-01 | Valid email added by admin | 201 Created, entry in DB |
| T008-02 | Non-admin tries to add email | 403 Forbidden |
| T008-03 | Unauthenticated request | 401 Unauthorized |
| T008-04 | Invalid email format | 400 Bad Request with validation error |
| T008-05 | Email already in whitelist | 409 Conflict "Email already exists" |

---

### UC-009: Admin Removes Email from Whitelist

| Field | Value |
|-------|-------|
| **Use Case ID** | UC-009 |
| **Use Case Name** | Admin Removes Email from Whitelist |
| **Actor** | Admin user |
| **Trigger** | Admin clicks remove on a whitelist entry |
| **Priority** | P0 |
| **Type** | Positive |

**Preconditions:**
- Actor is logged in as `role=admin`
- Target email exists in whitelist

**Steps:**
1. Admin views whitelist entries
2. Admin clicks "Hapus" on target entry
3. Confirmation dialog: "Hapus {email} dari whitelist?"
4. Admin confirms
5. Backend deletes entry from `whitelist` table
6. If user is logged in with that email → their session remains (until JWT expires)

**Expected Results:**
- HTTP 200 OK
- Entry removed from `whitelist`
- Audit log: "Admin {admin_email} removed {email} from whitelist at {timestamp}"
- Removal takes effect on next login attempt

**Test Scenarios:**

| Scenario | Description | Expected |
|----------|-------------|----------|
| T009-01 | Admin removes existing entry | 200 OK, entry deleted |
| T009-02 | Non-admin tries to remove | 403 Forbidden |
| T009-03 | Remove non-existent email | 404 Not Found |
| T009-04 | Admin removes own email | Allowed (no self-lock protection — admin must use password fallback) |

---

### UC-010: Admin Views All Whitelist Entries

| Field | Value |
|-------|-------|
| **Use Case ID** | UC-010 |
| **Use Case Name** | Admin Views Whitelist |
| **Actor** | Admin user |
| **Trigger** | Admin navigates to Whitelist Management page |
| **Priority** | P1 |
| **Type** | Positive |

**Steps:**
1. Admin calls `GET /api/admin/whitelist`
2. Backend returns list: `[{ id, email, name, added_by, created_at }]`
3. Frontend renders table

**Expected Results:**
- All whitelist entries returned (paginated if >50)
- `added_by` resolved to admin name
- Sorted by `created_at` descending

---

### UC-011: First-Time Google User Auto-Added to Whitelist (Auto-Approve)

| Field | Value |
|-------|-------|
| **Use Case ID** | UC-011 |
| **Use Case Name** | First-Time Google User Auto-Added to Whitelist |
| **Actor** | System (automatic) |
| **Trigger** | First-time Google user authenticates (email not in whitelist, not in users) |
| **Priority** | P2 |
| **Type** | Positive (configurable feature) |

**Preconditions:**
- `AUTO_APPROVE_WHITELIST=true` in config
- First-time user completes Google OAuth
- Email not in whitelist, not in users table

**Steps:**
1. User authenticates via Google OAuth (UC-002)
2. Backend checks whitelist — not found
3. Backend checks `AUTO_APPROVE_WHITELIST` — enabled
4. Backend adds email to `whitelist` with `added_by=SYSTEM`
5. Backend creates user account
6. JWT issued

**Expected Results:**
- User can log in on first try
- Entry in whitelist marked as `added_by=SYSTEM`
- Log entry: "Auto-approved Google user: {email}"
- If `AUTO_APPROVE_WHITELIST=false` → UC-004 behavior (403)

---

### UC-012: Attempt to Add Duplicate Email to Whitelist

| Field | Value |
|-------|-------|
| **Use Case ID** | UC-012 |
| **Use Case Name** | Duplicate Whitelist Entry |
| **Actor** | Admin user |
| **Trigger** | Admin attempts to add email already in whitelist |
| **Priority** | P1 |
| **Type** | Negative |

**Expected Results:**
- HTTP 409 Conflict
- Error message: "Email sudah ada dalam whitelist"
- No duplicate entry created

---

## 4. Use Cases — Session Management

### UC-013: User Logs Out

| Field | Value |
|-------|-------|
| **Use Case ID** | UC-013 |
| **Use Case Name** | User Logs Out |
| **Actor** | Any authenticated user |
| **Trigger** | User clicks "Logout" |
| **Priority** | P0 |
| **Type** | Positive |

**Preconditions:**
- User has valid JWT (from password or Google login)

**Steps:**
1. Frontend calls `POST /api/auth/logout` with JWT in Authorization header
2. Backend optionally adds JWT to blacklist (if implementing token blacklist)
3. Backend clears any server-side session
4. Frontend deletes JWT from localStorage/cookie
5. Frontend redirects to login page
6. Google session remains active (no way to force Google logout from 3rd-party app)

**Expected Results:**
- JWT is discarded client-side
- If blacklist implemented: token blacklisted until expiry
- No automatic re-login on page refresh
- Google session persists (by design — Google SSO is stateless to Google)

**Test Scenarios:**

| Scenario | Description | Expected |
|----------|-------------|----------|
| T013-01 | User clicks logout | Redirected to login, JWT cleared |
| T013-02 | User tries to use same JWT after logout | 401 Unauthorized (if blacklist implemented) |
| T013-03 | User tries to logout without JWT | 401 Unauthorized |

---

### UC-014: User Returns Within Token Validity Period (24h)

| Field | Value |
|-------|-------|
| **Use Case ID** | UC-014 |
| **Use Case Name** | User Returns Within 24 Hours |
| **Actor** | Authenticated user |
| **Trigger** | User opens app again within 24 hours of last login |
| **Priority** | P0 |
| **Type** | Positive |

**Expected Results:**
- JWT still valid (24h expiry)
- No re-authentication required
- User immediately sees dashboard
- Note: No refresh token rotation — JWT is self-contained

---

### UC-015: User Returns After JWT Expired (7+ days)

| Field | Value |
|-------|-------|
| **Use Case ID** | UC-015 |
| **Use Case Name** | User Returns After Token Expiry |
| **Actor** | Previously authenticated user |
| **Trigger** | User opens app more than 24 hours after last login |
| **Priority** | P0 |
| **Type** | Positive |

**Expected Results:**
- JWT expired → 401 Unauthorized
- Frontend redirects to login page
- User must click "Login dengan Google" again
- If Google session still active → auto-redirected to Google consent → new JWT issued
- If Google session expired → user enters Google credentials

**Note:** Current system has NO refresh token. Each re-login triggers full Google OAuth flow. This is by design for simplicity.

---

### UC-016: Multiple Devices Logged In

| Field | Value |
|-------|-------|
| **Use Case ID** | UC-016 |
| **Use Case Name** | Multi-Device Session Handling |
| **Actor** | User with multiple devices |
| **Trigger** | User logs in from second device while first is active |
| **Priority** | P2 |
| **Type** | Positive |

**Expected Results:**
- Both devices have valid, independent JWTs
- No automatic logout on second device login
- If user logs out from one device, other remains active (stateless JWT — no server-side invalidation unless blacklist is implemented)
- SSE: Each device independently subscribes to SSE with its own JWT

**Test Scenarios:**

| Scenario | Description | Expected |
|----------|-------------|----------|
| T016-01 | Same user logs in from 2 devices | Both get valid JWTs, both work |
| T016-02 | User logs out from device A | Device A logged out; Device B still active |
| T016-03 | Admin revokes all sessions (if blacklist implemented) | All devices logged out |

---

## 5. Use Cases — Security

### UC-017: CSRF Attack Prevention (State Parameter)

| Field | Value |
|-------|-------|
| **Use Case ID** | UC-017 |
| **Use Case Name** | CSRF Prevention via State Parameter |
| **Actor** | Attacker (malicious site trying to trick user) |
| **Trigger** | Attacker attempts cross-site request forgery on OAuth flow |
| **Priority** | P0 |
| **Type** | Security |

**Attack Scenario:**
1. Attacker has a malicious site
2. Victim is logged into SuperFamily App
3. Victim visits attacker's site
4. Attacker's site triggers request to `GET /api/auth/google` and captures the redirect URL
5. Attacker's site redirects victim to Google with attacker's controlled `state`

**Mitigation:**
- State is generated server-side, stored in DB with `oauth_states`
- State is 32+ bytes cryptographically random
- State validated on callback: must exist, not expired, not used
- State is single-use (deleted after validation)

**Test Scenarios:**

| Scenario | Description | Expected |
|----------|-------------|----------|
| T017-01 | Attacker uses same state twice | Second attempt fails (state already consumed) |
| T017-02 | Attacker uses expired state | Rejected with "state expired" |
| T017-03 | Attacker uses random fake state | Rejected with "invalid state" |
| T017-04 | Attacker tries to predict state | State is UUID v4 — unpredictable |

---

### UC-018: Token Leakage Prevention

| Field | Value |
|-------|-------|
| **Use Case ID** | UC-018 |
| **Use Case Name** | JWT Token Leakage Prevention |
| **Actor** | Security |
| **Trigger** | Potential JWT theft scenario |
| **Priority** | P0 |
| **Type** | Security |

**Threat Vectors & Mitigations:**

| Threat | Mitigation | Status |
|--------|-----------|--------|
| XSS steals JWT from localStorage | Use httpOnly cookies instead | Recommended |
| Network interception (HTTP) | All traffic over HTTPS (local network is trusted) | Local network only |
| Browser developer tools theft | httpOnly cookie prevents JS access | Recommended |
| JWT printed in server logs | Never log JWT tokens | Must verify in code |
| JWT in URL query string | JWT passed via Authorization header, not URL | ✅ Already implemented |
| Browser history contains JWT | Don't put JWT in URL | ✅ Already implemented |

**Test Scenarios:**

| Scenario | Description | Expected |
|----------|-------------|----------|
| T018-01 | JWT stored in localStorage | Works (current implementation) |
| T018-02 | JWT exposed in server logs | Must not happen — verify logging code |
| T018-03 | JWT in Referer header | HTTPS prevents this; local network is trusted |
| T018-04 | XSS payload tries to read localStorage | httpOnly cookie prevents this (future) |

---

### UC-019: Email Spoofing Prevention

| Field | Value |
|-------|-------|
| **Use Case ID** | UC-019 |
| **Use Case Name** | Email Spoofing Prevention |
| **Actor** | Attacker trying to impersonate a whitelisted user |
| **Trigger** | Attacker tries to forge Google userinfo |
| **Priority** | P0 |
| **Type** | Security |

**Threat:** Attacker controls a Google account with a whitelisted email address (e.g., `admin@gmail.com`) and tries to get that email into the OAuth response.

**Reality:** Google OAuth is an identity provider. The email in `userinfo` response is verified by Google — it cannot be spoofed because:
1. The `sub` (subject identifier) is Google's internal user ID
2. The `email` is verified by Google (`email_verified: true`)
3. The authorization `code` was exchanged server-side — attacker never sees it

**Test Scenarios:**

| Scenario | Description | Expected |
|----------|-------------|----------|
| T019-01 | Attacker uses Google account with different email | Google returns actual email, whitelist check fails |
| T019-02 | Attacker tries to modify email in callback | Email comes from Google token exchange, not callback params |
| T019-03 | Check `email_verified` field | Reject if `email_verified=false` |
| T019-04 | Google account has no verified email | Return error — cannot proceed |

---

### UC-020: Rate Limiting on OAuth Endpoints

| Field | Value |
|-------|-------|
| **Use Case ID** | UC-020 |
| **Use Case Name** | Rate Limiting on OAuth Endpoints |
| **Actor** | Security |
| **Trigger** | Excessive requests to auth endpoints |
| **Priority** | P1 |
| **Type** | Security |

**Rate Limits:**

| Endpoint | Limit | Window | Response on Exceed |
|----------|-------|--------|-------------------|
| `POST /api/auth/google/callback` | 10 | per IP, per minute | 429 Too Many Requests |
| `GET /api/auth/google` | 20 | per IP, per minute | 429 Too Many Requests |
| `POST /api/auth/login` | 10 | per IP, per minute | 429 Too Many Requests |
| `POST /api/admin/whitelist` | 5 | per user, per minute | 429 Too Many Requests |

**Test Scenarios:**

| Scenario | Description | Expected |
|----------|-------------|----------|
| T020-01 | 11 callback requests in 1 minute from same IP | 11th request gets 429 |
| T020-02 | Legitimate retry after 429 | Succeeds after rate limit window resets |
| T020-03 | Distributed attack (different IPs) | Each IP tracked separately |

---

### UC-021: SQL Injection in Whitelist Management

| Field | Value |
|-------|-------|
| **Use Case ID** | UC-021 |
| **Use Case Name** | SQL Injection Prevention in Whitelist |
| **Actor** | Security |
| **Priority** | P0 |
| **Type** | Security |

**Mitigation:** All whitelist operations use parameterized queries (Gin's `?` placeholders).

**Current Code Review:** `repository.go` uses `db.Query` / `db.Exec` with `?` placeholders. ✅ Safe.

**Test Scenarios:**

| Scenario | Description | Expected |
|----------|-------------|----------|
| T021-01 | Email input: `' OR '1'='1` | Rejected as invalid email format (validation layer) |
| T021-02 | Email input: `test@example.com'; DROP TABLE whitelist; --` | Treated as literal string; `users.email UNIQUE` constraint prevents injection |
| T021-03 | Verify all queries use `?` placeholders | All use parameterized queries |

---

### UC-022: XSS in Error Messages

| Field | Value |
|-------|-------|
| **Use Case ID** | UC-022 |
| **Use Case Name** | XSS Prevention in Error Messages |
| **Actor** | Security |
| **Priority** | P0 |
| **Type** | Security |

**Mitigation:** Error messages from backend are displayed as plain text, never as HTML.

**Current Code Review:** Gin JSON responses return `gin.H{"error": err.Error()}` which is JSON-encoded. Frontend must render with `.textContent` not `.innerHTML`.

**Test Scenarios:**

| Scenario | Description | Expected |
|----------|-------------|----------|
| T022-01 | Backend error contains `<script>` | Frontend renders as text, not executed |
| T022-02 | Verify frontend uses `.textContent` | Safe rendering |
| T022-03 | OAuth error contains XSS payload | Sanitized before display |

---

## 6. Use Cases — Edge Cases

### UC-023: Google Account Has No Email

| Field | Value |
|-------|-------|
| **Use Case ID** | UC-023 |
| **Use Case Name** | Google Account Without Email Rejected |
| **Actor** | Google user without email |
| **Priority** | P0 |
| **Type** | Negative |

**Expected Results:**
- Google returns `userinfo` without email field, or `email_verified=false`
- Backend rejects with 400: "Akun Google Anda tidak memiliki email terverifikasi"
- No whitelist check performed

---

### UC-024: Google Returns Different Email Than Requested

| Field | Value |
|-------|-------|
| **Use Case ID** | UC-024 |
| **Use Case Name** | Google Returns Different Email Than Requested |
| **Actor** | Google OAuth |
| **Priority** | P1 |
| **Type** | Negative |

**Scenario:** Some OAuth flows allow requesting a specific email (`login_hint`). Google might return a different verified email.

**Expected Results:**
- Use the email actually returned by Google (not `login_hint`)
- Check that returned email is in whitelist
- If not in whitelist → 403

---

### UC-025: Whitelist Cleared While User Has Active Session

| Field | Value |
|-------|-------|
| **Use Case ID** | UC-025 |
| **Use Case Name** | Whitelist Removal During Active Session |
| **Actor** | Admin |
| **Priority** | P2 |
| **Type** | Negative |

**Expected Results:**
- User remains logged in until JWT expires (stateless)
- Next login attempt → 403
- Admin must manually log out user or wait for JWT expiry
- Note: This is acceptable for a family app (small user count)

---

### UC-026: Google OAuth Endpoint Down — Fallback to Password

| Field | Value |
|-------|-------|
| **Use Case ID** | UC-026 |
| **Use Case Name** | Google OAuth Unavailable — Password Fallback |
| **Actor** | System |
| **Priority** | P1 |
| **Type** | Negative / Resilience |

**Preconditions:**
- User has existing password-based account (same email)

**Steps:**
1. User clicks "Login dengan Google"
2. Backend cannot reach Google OAuth endpoint (timeout after 5s)
3. Frontend receives 502 or connection error
4. Frontend shows: "Login dengan Google tidak tersedia. Gunakan password untuk login."
5. Link to password login form displayed

**Expected Results:**
- Google login fails gracefully
- Password login remains available
- Error logged for monitoring

---

## 7. Google OAuth Endpoints Reference

| Purpose | Google Endpoint |
|---------|----------------|
| Authorization | `https://accounts.google.com/o/oauth2/v2/auth` |
| Token exchange | `https://oauth2.googleapis.com/token` |
| Userinfo | `https://www.googleapis.com/oauth2/v3/userinfo` |
| Revoke | `https://oauth2.googleapis.com/revoke` |

**Scopes Required:**
```
openid
email
profile
```

---

## 8. Test Scenario Matrix (Prioritized)

### P0 — Critical (Must pass before release)

| ID | Use Case | Scenario | Type |
|----|----------|----------|------|
| T002-01 | UC-002 | Valid code + valid state → JWT issued | Positive |
| T002-04 | UC-002 | Valid code + tampered state → rejected | Negative |
| T002-05 | UC-002 | Valid code + non-whitelisted email → 403 | Negative |
| T003-01 | UC-003 | New Google user → account created, JWT issued | Positive |
| T003-03 | UC-003 | Returning Google user → logged in | Positive |
| T004-01 | UC-004 | Non-whitelisted email → 403 Forbidden | Negative |
| T008-01 | UC-008 | Admin adds email → 201 Created | Positive |
| T008-04 | UC-008 | Invalid email format → 400 Bad Request | Negative |
| T008-05 | UC-008 | Duplicate email → 409 Conflict | Negative |
| T009-01 | UC-009 | Admin removes email → 200 OK | Positive |
| T013-01 | UC-013 | Logout → JWT cleared | Positive |
| T017-01 | UC-017 | CSRF: State reuse blocked | Security |
| T017-03 | UC-017 | CSRF: Fake state blocked | Security |
| T019-03 | UC-019 | Unverified email rejected | Security |
| T021-03 | UC-021 | All queries use parameterized placeholders | Security |
| T022-01 | UC-022 | XSS in error message sanitized | Security |

### P1 — Important

| ID | Use Case | Scenario | Type |
|----|----------|----------|------|
| T001-01 | UC-001 | Login button → Google OAuth URL | Positive |
| T001-03 | UC-001 | State stored with 10-min expiry | Positive |
| T005-01 | UC-005 | Cancel on consent screen → friendly message | Negative |
| T006-01 | UC-006 | `error=access_denied` → friendly message | Negative |
| T007-01 | UC-007 | Network timeout → retry option | Negative |
| T009-02 | UC-009 | Non-admin remove → 403 Forbidden | Negative |
| T010-01 | UC-010 | Admin views whitelist | Positive |
| T012-01 | UC-012 | Duplicate add → 409 Conflict | Negative |
| T014-01 | UC-014 | Return within 24h → auto re-login | Positive |
| T015-01 | UC-015 | Return after 24h → re-auth required | Positive |
| T016-01 | UC-016 | Multi-device login → both work | Positive |
| T020-01 | UC-020 | Rate limit exceeded → 429 | Security |
| T026-01 | UC-026 | Google down → password fallback | Resilience |

### P2 — Nice to Have

| ID | Use Case | Scenario | Type |
|----|----------|----------|------|
| T001-04 | UC-001 | State is cryptographically random | Security |
| T003-02 | UC-003 | Existing password user tries Google login | Negative |
| T008-02 | UC-008 | Non-admin add → 403 Forbidden | Negative |
| T009-03 | UC-009 | Remove non-existent → 404 | Negative |
| T011-01 | UC-011 | Auto-approve enabled → auto-whitelist | Positive |
| T016-02 | UC-016 | Logout from one device → other stays | Positive |
| T023-01 | UC-023 | Google account without email → rejected | Negative |

---

## 9. Security Testing Checklist

### Pre-Deployment Verification

- [ ] **UC-017:** State parameter is cryptographically random (UUID v4 or 32-byte random)
- [ ] **UC-017:** State stored server-side, validated on callback
- [ ] **UC-017:** State is single-use (deleted after validation)
- [ ] **UC-017:** State has expiry (10 minutes)
- [ ] **UC-019:** `email_verified=true` checked before whitelist lookup
- [ ] **UC-019:** Email from Google token exchange used (not from callback params directly)
- [ ] **UC-020:** Rate limiting implemented on all auth endpoints
- [ ] **UC-021:** All whitelist queries use `?` placeholders (no string concatenation)
- [ ] **UC-022:** Backend error messages are JSON-encoded (safe for frontend)
- [ ] **UC-022:** Frontend uses `.textContent` for error display
- [ ] **UC-018:** JWT never logged server-side
- [ ] **UC-018:** JWT passed via Authorization header (not URL)
- [ ] JWT secret is strong (32+ chars, not default)
- [ ] CORS origins configured for local network only
- [ ] No `Access-Control-Allow-Origin: *` with credentials
- [ ] SSE connection validates JWT before upgrade
- [ ] `oauth_states` cleanup job runs periodically (every 15 min)
- [ ] Audit log records: whitelist add/remove, failed auth attempts
- [ ] Password-based accounts can still login (Google SSO is additive)
- [ ] Google OAuth redirect URI is HTTPS (even on local network, consider self-signed cert)
- [ ] Authorization code exchanged server-side (code not exposed to JS)

### Security Test Execution Order

1. **Unit tests** for each handler/service method
2. **Integration tests** for OAuth flow (use Google's test OAuth server or mock)
3. **Manual penetration testing:**
   - Tamper with state parameter
   - Tamper with authorization code
   - Inject SQL via email field
   - Inject XSS via error message display
   - Rate limit flood test
4. **Load test:** 10 concurrent OAuth flows

---

## 10. Edge Cases for Implementation Team

| ID | Edge Case | Recommended Handling |
|----|-----------|---------------------|
| E001 | User has password account AND Google account with same email | Reject Google login; tell user to use password login |
| E002 | Google returns `hd` (hosted domain) claim | Optionally enforce `hd` domain restriction for family domain |
| E003 | User's Google account email changed after initial OAuth | Next login uses new email; whitelist must be updated |
| E004 | Clock skew between app server and Google | Token exchange uses server time; 5s tolerance for state expiry |
| E005 | SQLite `oauth_states` cleanup during active flow | Transaction isolation; cleanup only deletes expired entries |
| E006 | Concurrent callback requests with same state | First valid request succeeds; second gets "state already used" |
| E007 | Google OAuth scope includes extra permissions | Only request `openid+email+profile`; ignore extras |
| E008 | Mobile browser WebView (not Chrome) | Google OAuth may not work in WebView; fallback to password |
| E009 | User denies `email` permission on Google consent | `email` field missing in userinfo → reject with specific message |
| E010 | JWT secret rotation without downtime | Support multiple secrets during rotation window |

---

## 11. Configuration Requirements

```bash
# Required environment variables for Google OAuth
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
GOOGLE_REDIRECT_URI=http://192.168.0.29/api/auth/google/callback

# Optional
AUTO_APPROVE_WHITELIST=false   # default: false
OAUTH_STATE_EXPIRY_MINUTES=10   # default: 10
RATE_LIMIT_AUTH_PER_MINUTE=10   # default: 10
```

---

## 12. File Locations for Implementation

| File | Purpose |
|------|---------|
| `backend/handlers/auth.go` | Add Google OAuth handlers (`GoogleLogin`, `GoogleCallback`) |
| `backend/services/service.go` | Add `GoogleOAuthCallback` service method |
| `backend/repositories/repository.go` | Add whitelist CRUD, `oauth_states` insert/delete/validate |
| `backend/middleware/auth.go` | Add rate limiting for auth endpoints |
| `backend/main.go` | Add `/api/auth/google` and `/api/auth/google/callback` routes |
| `backend/config/config.go` | Add Google OAuth config fields |

---

*Document prepared by SQA Engineer Subagent — 2026-04-29*
