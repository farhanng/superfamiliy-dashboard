# SuperFamily Dashboard - Developer Workflow

## Project Overview

**SuperFamily Dashboard** adalah aplikasi keluarga Farhan & Inne dengan fitur:
- 💰 Tracking Budget & Pengeluaran
- 📅 Tanggal-Tanggal Penting  
- 🍽️ Weekly Meal Plan
- 🎯 Jadwal Weekend Produktif
- 🔔 Pengingat Pajak
- 📬 Tagihan

**Tech Stack:**
- Frontend: Vanilla JS/Preact + Tailwind CSS + Vite
- Backend: Go (Gin) + SQLite
- Auth: Google OAuth 2.0 + PKCE
- Deploy: Google Cloud Run

---

## 🧑‍💻 Agent Roles

Setiap agent punya role spesifik. Tidak perlu "spawn agent" berkali-kali untuk hal yang sama.

### 1. SQA Agent (Software Quality Assurance)
**Tugas:**
- Test semua fitur secara E2E
- Run test suites (SSO, login, dashboard, SSE)
- Verify fixes after deployment
- Report bugs dengan detail

**Trigger:** 
- Setelah deploy
- Setelah fix deployed
- Request manual: "test SSO" / "verify login"

**Files:**
- `tests/sso-login.puppeteer.cjs` - Login/SSO tests
- `tests/sse-e2e.spec.js` - SSE real-time tests  
- `tests/SQA-TEST-RESULTS.md` - Test reports

### 2. Security Agent (Senior Security Engineer)
**Tugas:**
- Penetration testing
- Vulnerability assessment
- Fix security issues (F01-F14)
- Verify security patches

**Trigger:**
- Request manual: "security audit" / "pentest"
- Setelah ditemukan vulnerability baru

**Files:**
- `docs/PENTEST-REPORT.md` - Security findings
- `docs/SECURITY_AUDIT.md` - Audit logs

### 3. SSE Agent (Senior Software Engineer)
**Tugas:**
- Fix bugs di backend/frontend
- Implement features baru
- Fix security vulnerabilities
- Deployment automation
- Architecture decisions

**Trigger:**
- Bug ditemukan (SQA reports)
- Feature request
- Security issue (dari Security Agent)

**Scope:**
- Go backend code
- Frontend JS code  
- Infrastructure/deployment
- Database migrations

### 4. DevOps Agent
**Tugas:**
- Deploy ke Cloud Run
- Manage environment variables
- Monitor deployment health
- DNS & domain management
- CI/CD pipeline

**Trigger:**
- Code sudah ready untuk deploy
- Need to update env vars
- Need to check logs

### 5. PM Agent (Project Manager)
**Tugas:**
- Prioritize tasks
- Roadmapping
- Coordinate antar agents
- Progress reporting

**Files:**
- `agents/PM.md` - PM persona
- `docs/PROGRESS.md` - Project progress

---

## 🔄 Development Loop

### Bug Fix Loop (SQE → Fix → Verify)

```
┌─────────────────────────────────────────────────────────────┐
│  1. SQA Agent: Test & Find Bug                              │
│     └── Report: "SSO login fails - CORS issue"             │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  2. SSE Agent: Fix Bug                                      │
│     └── Update CORS_ORIGINS env var                         │
│     └── Redeploy backend                                    │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  3. SQA Agent: Verify Fix                                   │
│     └── Test SSO login again                                │
│     └── Report: "SSO works ✅"                              │
└─────────────────────────────────────────────────────────────┘
```

### Security Loop (Audit → Fix → Re-audit)

```
┌─────────────────────────────────────────────────────────────┐
│  1. Security Agent: Pentest                                 │
│     └── Report: "F01: JWT in URL - HIGH"                   │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  2. SSE Agent: Fix Security Issue                          │
│     └── Move JWT to HttpOnly cookie                        │
│     └── Redeploy                                           │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  3. Security Agent: Re-verify                              │
│     └── Verify F01 is fixed                                │
│     └── Update PENTEST-REPORT.md                           │
└─────────────────────────────────────────────────────────────┘
```

---

## 🧪 Testing Strategy

### Test Levels

| Level | What | Who | When |
|-------|------|-----|------|
| Unit | Individual functions | SSE Agent | After code change |
| Integration | API endpoints | SSE Agent | After backend change |
| E2E | Full user flows | SQA Agent | After deploy |
| Security | Vulnerability scan | Security Agent | Weekly / On-demand |

### Test Suites

#### 1. Login/SSO Tests (`tests/sso-login.puppeteer.cjs`)
```
TC-LOC-01: Local login success
TC-LOC-02: Local login failed  
TC-DASH-02: Unauthenticated redirect
TC-SSO-01: Initiate Google OAuth
TC-SSO-02: OAuth button click
TC-SSO-03: OAuth callback handling
TC-DASH-04: Language toggle
TC-NAV-01: Bottom navigation
```

#### 2. SSE Tests (`tests/sse-e2e.spec.js`)
```
TC-SSE-01: EventSource connects
TC-SSE-02: Rejects without auth
TC-SSE-03: Heartbeat ping (30s)
TC-SSE-04: UI sync on login
TC-SSE-05: EventSource closes on logout
TC-SSE-06: bills_updated event
TC-SSE-07: mealplans_updated event
TC-SSE-08: events_updated event
TC-SSE-09: Reconnect on disconnect
TC-SSE-10: readyState = OPEN
```

#### 3. Manual Verification
- SSO login dengan Google account
- Dashboard semua menu berfungsi
- Real-time update working
- Mobile responsive

---

## 🚀 Deployment Process

### Prerequisites
```bash
gcloud auth activate-service-account --key-file="deploy/svc-account.json"
gcloud config set project farhan-projects
```

### Frontend Deploy
```bash
# 1. Build
docker build -t asia-southeast1-docker.pkg.dev/farhan-projects/superfamily/frontend:latest .

# 2. Push  
docker push asia-southeast1-docker.pkg.dev/farhan-projects/superfamily/frontend:latest

# 3. Deploy
gcloud run deploy superfamily-frontend \
  --image=asia-southeast1-docker.pkg.dev/farhan-projects/superfamily/frontend:latest \
  --platform=managed \
  --region=asia-southeast1 \
  --allow-unauthenticated \
  --port=5000
```

### Backend Deploy
```bash
# 1. Build
docker build -t asia-southeast1-docker.pkg.dev/farhan-projects/superfamily/backend:latest .

# 2. Push
docker push asia-southeast1-docker.pkg.dev/farhan-projects/superfamily/backend:latest

# 3. Deploy with env vars
gcloud run deploy superfamily-backend \
  --image=asia-southeast1-docker.pkg.dev/farhan-projects/superfamily/backend:latest \
  --platform=managed \
  --region=asia-southeast1 \
  --no-allow-unauthenticated \
  --port=3001 \
  --set-env-vars="JWT_SECRET=<secret>,CORS_ORIGINS=https://family.farhan.biz.id,ENVIRONMENT=production"
```

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `JWT_SECRET` | Yes | Min 32 char secret |
| `CORS_ORIGINS` | Yes | Frontend domain |
| `ENVIRONMENT` | Yes | production |
| `GOOGLE_CLIENT_ID` | Yes | OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Yes | OAuth secret |

---

## 📁 Project Structure

```
superfamily-dashboard/
├── src/                    # Frontend source
│   ├── api/               # API client (auth, sync)
│   ├── screens/           # Page components
│   ├── components/        # Reusable components
│   └── main.js            # App entry
├── backend/               # Go backend
│   ├── handlers/          # HTTP handlers
│   ├── services/          # Business logic
│   ├── repositories/       # Database access
│   ├── middleware/         # Auth, CORS, SSE
│   ├── oauth/             # Google OAuth
│   └── main.go            # Entry point
├── tests/                 # Test files
│   ├── sso-login.*        # Login tests
│   ├── sse-e2e.*          # SSE tests
│   └── SQA-*.md           # Test reports
├── docs/                   # Documentation
│   ├── DEVELOPER_WORKFLOW.md  # This file
│   ├── PENTEST-REPORT.md  # Security findings
│   └── SSO-TEST-RESULTS.md
├── deploy/                 # Deployment configs
│   └── deploy-cloudrun.sh
└── dist/                   # Built frontend
```

---

## 🎯 How to Use

### When You Want to Test
```
"Test SSO login"
"Run full test suite"
"Verify deployment"
```
→ Triggers SQA Agent

### When You Find a Bug
```
"Login button not working"
"SSO redirect fails"
"API returns 500"
```
→ Triggers SSE Agent (fix) → SQA Agent (verify)

### When You Want Security Check
```
"Run pentest"
"Security audit"
"Check for vulnerabilities"
```
→ Triggers Security Agent

### When You Want New Feature
```
"Add user profile page"
"Implement notifications"
"Add export feature"
```
→ Triggers PM Agent (plan) → SSE Agent (implement)

---

## 📊 Reporting

| Document | Contents | Updated |
|----------|----------|---------|
| `SQA-TEST-RESULTS.md` | Test execution results | Each test run |
| `PENTEST-REPORT.md` | Security findings & fixes | After each audit |
| `PROGRESS.md` | Project milestone progress | Weekly |
| `docs/SOUL.md` | Agent personas & tone | As needed |

---

## 🔗 Links

- **Frontend:** https://family.farhan.biz.id
- **Backend:** https://superfamily-backend-hpd7gsjsza-as.a.run.app
- **Artifact Registry:** asia-southeast1-docker.pkg.dev/farhan-projects/superfamily

---

*Last Updated: 2026-05-02*
*Maintained by: ViercasAI*