# SuperFamily Dashboard — Security Audit Report

**Date:** 2026-04-28
**Auditor:** Security Engineer Subagent
**Scope:** Codebase (v1) + Planned Architecture (v2 Local)
**Risk Level:** **MEDIUM**

---

## 1. Executive Summary

### Current State (v1 - Offline PWA)
- **Risk Level: LOW** for current deployed version
- The app is a pure offline-first PWA with zero network activity
- All data stored locally in IndexedDB via Dexie.js
- No authentication, no external fetch calls, no eval(), no dynamic code execution
- Dependency audit: All dependencies are reputable and well-known (Vite, Tailwind, Dexie, date-fns, workbox)
- Primary concern in v1: PWA service worker caching external CDN resources (Google Fonts, jsDelivr)

### Planned State (v2 - Go + Gin + SQLite + SSE)
- **Risk Level: MEDIUM** if current architecture decisions are implemented as-is
- Multiple security gaps identified in architecture docs and current stub code
- No actual JWT implementation exists yet (only documented intent)
- Several items need hardening before v2 ships

### Overall Recommendation
Proceed with v2 development. The identified risks are mitigable. Address critical items before first deployment.

---

## 2. Current Codebase Findings (v1)

### 2.1 Dependency Audit ✅ PASSED

**Dependencies checked (package.json):**
```
vite ^6.2.2            - Reputable build tool
vite-plugin-pwa ^0.21.1 - Reputable PWA plugin (by Anthony Fu)
tailwindcss ^3.4.19    - Reputable CSS framework
dexie ^4.0.11          - Reputable IndexedDB wrapper
date-fns ^4.1.0        - Reputable date library
autoprefixer ^10.5.0   - Standard CSS tool
postcss ^8.5.12        - Standard CSS tool
workbox-* (transitive) - Google's caching libraries
```

**Findings:**
- No suspicious/nakarma libraries detected
- No known-malicious packages in dependency tree
- All packages are from well-known authors/maintners
- No deprecated or abandoned packages
- Workbox versions are current (from google/workbox)

### 2.2 Remote Code Execution ✅ NO RISK

**Checked for:** `eval()`, `new Function()`, `setTimeout(fn, string)`, `setInterval(fn, string)`, dynamic script injection

**Result:** Clean. Zero instances found across all src/ files.

### 2.3 Data Exfiltration ✅ NO RISK

**Checked for:** External `fetch()`, XMLHttpRequest, axios, beacon API

**Result:** Clean. No network calls in v1. The app is truly offline-first.

### 2.4 XSS / Injection ✅ LOW RISK

**Checked:** All `innerHTML` usage across screens

All `innerHTML` assignments use hardcoded template literals with pre-defined HTML strings. No unsanitized user input flows into innerHTML. Variables used are:
- Translation function `t('key')` → hardcoded strings only
- `formatCurrency(amount)` → number formatting, no HTML
- Array lengths, booleans → safe primitives
- CSS classes and static text → safe

**Note:** When v2 introduces API data, any data fetched from backend and rendered via innerHTML must be properly escaped. Currently not a risk since there's no network layer.

### 2.5 PWA Service Worker Security ⚠️ MINOR RISK

**Cached resources:**
```
Google Fonts (fonts.googleapis.com) — CacheFirst, 1 year expiry, 10 entries
jsDelivr CDN (cdn.jsdelivr.net)     — CacheFirst, 30 days expiry, 20 entries
All built assets (index.html, JS, CSS, icons, manifest)
```

**Risk:** If jsDelivr or Google's CDN is compromised (供应链攻击), malicious code could be served to all cached clients.

**Mitigation options:**
1. Self-host fonts (download woff2 files into `/public/fonts/`)
2. Remove jsDelivr caching if not needed (no external scripts used)
3. Use SRI (Subresource Integrity) hashes for cached CDN resources
4. Set shorter cache expiry for CDN resources

**Current severity:** LOW (CDN compromise is rare, local home network context)

### 2.6 IndexedDB Data Storage ✅ SECURE

**Data stored:** Bills, transactions, events, meal plans, weekend activities, reminders

- All data in browser-local IndexedDB (same-origin isolated)
- No sensitive data being transmitted
- `window.db` exposed for debugging (acceptable for personal app)
- No PII beyond family financial data — contained in user's own browser

### 2.7 Vite Config Security ✅ SECURE

**Dev proxy:** `/api` → `http://localhost:3001`
- Only active in dev mode
- In Docker/production, Nginx handles routing instead
- No security concern

---

## 3. Planned Architecture Security Review (v2)

### 3.1 JWT Security ⚠️ PARTIALLY ADDRESSED

**Documented in ARCHITECTURE_V2_LOCAL.md:**
- bcrypt for password hashing (cost 10) ✅
- JWT for auth token ✅
- Login/register endpoints planned ✅

**Current stub code (backend/main.go):**
- No JWT implementation exists yet — only HTTP stubs
- No token generation, validation, or refresh logic
- Must implement before v2 ships

**Security checklist for JWT implementation:**
- [ ] Use strong JWT_SECRET env var (no hardcoded defaults in code)
- [ ] Set short token expiry (15-60 min access token)
- [ ] Implement refresh token rotation OR server-side session tracking
- [ ] Store tokens in `httpOnly` cookies (NOT localStorage) to mitigate XSS
- [ ] Validate JWT signature on every protected endpoint
- [ ] Include user ID and role in token payload
- [ ] Implement token blacklist for logout

**Risk:** If tokens stored in localStorage and XSS exists → attacker extracts tokens. For a family app on local network, this is acceptable but note it.

### 3.2 SQLite Injection Prevention ✅ GOOD

**Current handler code (handleGetBills):**
```go
db.Query("SELECT ... FROM bills")
// No string concatenation — parameters are safe
```

**Architecture doc uses parameterized queries throughout:**
```sql
INSERT INTO bills (id, title, ...) VALUES (?, ?, ?, ?, ?, ?)
```
This is the correct pattern. **No SQL injection risk** with proper usage.

**Recommendations:**
- Always use `?` placeholders, never string concatenation
- Validate input types (amount must be int, date must match regex)
- Consider adding read-only DB user for frontend queries (not write access)

### 3.3 CORS Configuration ⚠️ NEEDS HARDENING

**Current docker-compose.yml:**
```yaml
CORS_ORIGINS=http://localhost:3000,http://192.168.0.29
```

**Current main.go hardcoded:**
```go
AllowOrigins: []string{
    "http://localhost:3000",
    "http://192.168.0.29",
    "http://localhost:5000",
}
```

**Issues:**
1. `localhost` in production is ambiguous — binds to actual machine, not mobile devices
2. Hardcoded IPs in two places (docker-compose AND main.go) — sync risk
3. No mechanism for family members with different IPs to access
4. Mobile devices on same WiFi will have different IPs

**Recommendation:**
- Use environment variable for CORS_ORIGINS (already in docker-compose)
- Set CORS_ORIGINS=`*` for local network only (no wildcard risk if no external exposure)
- OR implement IP range check: `192.168.0.0/24`
- OR use custom header-based origin validation
- Ensure nginx doesn't expose port 3001 externally

### 3.4 SSE Security (Real-time) ⚠️ NOT IMPLEMENTED

**Planned in ARCHITECTURE_V2_LOCAL.md section 11:**
- Client subscribes to `/api/events/subscribe`
- Server broadcasts to all connected clients on data changes

**Security concerns to address:**
1. **Authentication on SSE:** SSE connection must validate JWT on connection init. If unauthenticated clients can connect, any local network device receives all family data.
2. **Rate limiting:** Limit messages per client to prevent DoS
3. **Connection limits:** Max connections per user to prevent resource exhaustion
4. **Nginx proxy for SSE:** Current nginx.conf has correct settings:
   - `proxy_buffering off` ✅
   - `proxy_cache off` ✅
   - `proxy_set_header Connection ''` ✅
   But these only apply to the nginx in `nginx/nginx.conf` — current docker-compose doesn't use a custom nginx.

**Current docker-compose lacks nginx entirely** — frontend and backend are separate containers without a reverse proxy. API routes won't be accessible from outside the container network without nginx.

**SSE hardening checklist:**
- [ ] Validate JWT on SSE connection upgrade (reject if invalid)
- [ ] Track connected clients, implement heartbeat/ping
- [ ] Clean up disconnected clients to prevent memory leaks
- [ ] Consider CORS origin check before SSE upgrade
- [ ] Add `X-Accel-Buffering: no` header for nginx SSE handling

### 3.5 Password Storage ✅ GOOD INTENT

**Specified:** bcrypt cost 10
**Current code:** No password handling yet

When implementing:
- bcrypt cost 10 is acceptable for 2-user app (fast login)
- bcrypt cost 12+ recommended if more users or higher sensitivity
- Never log password attempts or hashes
- Validate password strength (min 8 chars, not common passwords)

### 3.6 Session Management ⚠️ NOT DEFINED

**Architecture doc does not cover:**
- Session storage (in-memory vs Redis vs DB-backed)
- Session expiry and cleanup
- Concurrent session limits (same user logged in multiple devices)
- Logout mechanism (token invalidation)

**Recommendations:**
- Use in-memory map with mutex for 2-user app (sufficient)
- Implement server-side session registry (map[userID] → sessionData)
- On logout: remove session, optionally blacklist token
- Auto-expire stale sessions on server restart (acceptable for family app)

---

## 4. Docker Security Review

### 4.1 Frontend Dockerfile ⚠️ MINOR ISSUE

**Current:**
```dockerfile
FROM node:20-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/dist ./dist
EXPOSE 5000
CMD ["serve", "dist", "-l", "5000"]
```

**Issues:**
- Runs as root (no USER directive)
- node:20-alpine base image — root by default
- No read-only filesystem principle applied

**Recommendation:** Add `USER node` or use non-root base image.

### 4.2 Backend Dockerfile ✅ GOOD

```dockerfile
FROM alpine:3.19
RUN apk add --no-cache ca-certificates wget
RUN mkdir -p /app/data && chown -R nobody:nobody /app
USER nobody:nobody
EXPOSE 3001
```

**Good practices:**
- Non-root user (`nobody`) ✅
- Minimal base image (alpine) ✅
- Only required packages (ca-certificates, wget for healthcheck) ✅
- No shell access ✅

**Missing:**
- `READONLY` filesystem (Docker run with `--read-only` if possible)
- `No new privileges` flag (`--security-opt=no-new-privileges`)

### 4.3 Docker Compose Network ✅ ACCEPTABLE

```yaml
networks:
  - superfamily-network (bridge driver)
```

Bridge network is appropriate. Services can't be reached from external network (no port exposure to host except 5000 and 3001).

**Concern:** `ports: "3001:3001"` exposes backend directly. On a local network, this is fine but ensure firewall rules on GL503VM block external access to port 3001.

### 4.4 Volume Security ✅ SECURE

```yaml
volumes:
  - ./data:/app/data:rw
```

- Volume is contained to host's `./data` directory
- No host path traversal risk
- SQLite file access contained

---

## 5. Nginx Configuration Review

**File:** `nginx/nginx.conf`

### Security ✅ GOOD
- No external access to backend port (only internal Docker network)
- `proxy_cache off` for API and SSE ✅
- `proxy_buffering off` for SSE ✅
- No `server_tokens` exposure (not configurable here but standard nginx behavior)

### ⚠️ NOTE
This nginx config exists in the repo but is NOT used in current docker-compose. Current docker-compose spins up frontend (node serve) and backend (Go) directly without nginx reverse proxy. API endpoints are not accessible from host in current setup.

---

## 6. Other Findings

### 6.1 Hardcoded Values ⚠️ MINOR
- `192.168.0.29` appears in:
  - docker-compose.yml (CORS_ORIGINS)
  - backend/main.go (hardcoded AllowOrigins)
  - docs/ARCHITECTURE_V2_LOCAL.md (architecture diagram)
- When IP changes, multiple files need updating

**Recommendation:** Use environment variables exclusively for IPs.

### 6.2 Debug Artifacts ⚠️ MINOR
- `seed-bills.js`, `seed-bills.html` — debug/seed files in project root
- `src/screens/weekend.js.bak` — orphaned backup
- `.gitignore` correctly excludes these from Docker image (via .dockerignore)

**Risk:** LOW — these are in .dockerignore, not included in container.

### 6.3 Secret Management ⚠️ MISSING
- `JWT_SECRET` in docker-compose has a weak default: `superfamily-local-secret-change-me`
- No `.env` file handling documented

**Recommendation:**
- Fail startup if JWT_SECRET is default value
- Use proper secret management (Docker secrets, env file with restricted permissions)
- Never commit secrets to git

### 6.4 No Rate Limiting ⚠️ MINOR
- No rate limiting on API endpoints
- No request size limits
- No request timeout configuration

For a 2-user local app, this is acceptable but should be noted.

---

## 7. Security Recommendations Summary

### Critical (Must fix before v2 deployment)
1. **SSE Authentication** — Reject unauthenticated SSE connections; validate JWT before upgrade
2. **CORS Hardening** — Replace hardcoded origins with env var; ensure mobile devices can connect
3. **JWT Implementation** — Current backend has no real JWT; implement properly before auth feature
4. **JWT Secret** — Fail on weak/default secret; use strong env var

### High (Should fix before v2 deployment)
5. **Service Worker CDN Cache** — Remove or reduce Google Fonts/jsDelivr caching; self-host fonts
6. **Nginx Integration** — Current docker-compose has no nginx; add for proper reverse proxy
7. **Backend Port Exposure** — Ensure firewall blocks external access to port 3001
8. **Frontend Dockerfile** — Run as non-root user (add USER directive)

### Medium (Nice to have)
9. **SSE Heartbeat** — Implement ping/pong to detect dead connections
10. **Rate Limiting** — Add per-IP rate limits on API endpoints
11. **bcrypt Cost** — Consider cost 12 if app scales beyond 2 users
12. **Token Storage** — Prefer httpOnly cookies over localStorage for JWT

### Low / Informational
13. **IP Hardcoding** — Use env vars for all IP references
14. **Cleanup** — Remove debug artifacts (seed-*.js, .bak files)
15. **Session Registry** — Implement server-side session tracking for logout invalidation

---

## 8. Security Checklist for Development

### Before v2 ships, verify:

- [ ] JWT secret is strong and not the default value
- [ ] All API endpoints validate JWT (no open endpoints except health/auth)
- [ ] SSE connections are authenticated
- [ ] CORS allows all family member devices
- [ ] SQL queries use parameterized statements (no string concat)
- [ ] bcrypt cost is at least 10
- [ ] Backend container runs as non-root
- [ ] Frontend container runs as non-root
- [ ] Port 3001 not exposed to internet (firewall check)
- [ ] No eval() or dynamic code execution in frontend
- [ ] Service worker doesn't cache untrusted external scripts
- [ ] Nginx proxy handles SSE correctly (if used)
- [ ] Request size limits configured
- [ ] Error messages don't leak stack traces to client
- [ ] Docker images use specific version tags, not `:latest`

### For ongoing development:
- [ ] Run `npm audit` regularly
- [ ] Run `go mod verify` for Go dependencies
- [ ] Scan Docker images for CVEs (`docker scan`)
- [ ] Review any new external fetch calls for SSRF risk
- [ ] Keep dependencies up to date (Vite, Dexie, workbox, Gin)

---

## 9. Risk Matrix

| Finding | Severity | Likelihood | Risk Score | Remediation |
|---------|----------|------------|------------|-------------|
| No SSE authentication | HIGH | HIGH | **HIGH** | Implement JWT check on SSE upgrade |
| Weak JWT secret default | HIGH | MEDIUM | **HIGH** | Fail startup on default; use strong env |
| No JWT implementation | HIGH | HIGH | **HIGH** | Build auth system before v2 launch |
| CORS mismatch (hardcoded IPs) | MEDIUM | HIGH | **MEDIUM** | Use env vars for all origins |
| SW caches CDN resources | MEDIUM | LOW | **MEDIUM** | Self-host fonts; reduce CDN cache |
| Frontend container as root | MEDIUM | MEDIUM | **MEDIUM** | Add USER directive |
| No nginx in docker-compose | MEDIUM | MEDIUM | **MEDIUM** | Add nginx or document direct access |
| Port 3001 exposed externally | MEDIUM | MEDIUM | **MEDIUM** | Firewall rule on GL503VM |
| No rate limiting | LOW | LOW | **LOW** | Add when app scales |
| Debug files in repo | INFO | LOW | **INFO** | Already excluded from Docker |

---

## 10. Conclusion

The **current v1 app (offline PWA) is secure to use** with minimal risk. The dependency tree is clean, there's no network activity, and no code execution vulnerabilities exist.

The **planned v2 architecture has solid foundations** but requires implementation work to be secure. The key risks are:
1. **SSE authentication must be implemented** — currently a gap
2. **JWT system needs to be built** — stub exists but no logic
3. **CORS and network exposure** — needs attention when family members connect

All identified risks are **mitigable** with reasonable effort. The local-network-only context significantly reduces risk compared to an internet-facing deployment.

**Verdict:** Proceed with v2 development. Address Critical items before first deployment. The architecture is sound; implementation discipline matters most.

---

*Audit completed by Security Engineer Subagent — 2026-04-28*