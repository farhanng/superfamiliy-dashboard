# SuperFamily Dashboard - Project Structure

> Standard folder structure for this project. Apply similar structure to new projects.

---

## 📁 Current Structure

```
superfamily-dashboard/
├── src/                        # Frontend source code
│   ├── api/                    # API client modules
│   │   ├── auth.js             # Authentication
│   │   ├── client.js           # Base API client
│   │   ├── sync.js             # SSE real-time sync
│   │   └── bills.js            # Bills API
│   ├── screens/                # Page components
│   │   ├── login.js            # Login page
│   │   ├── home.js             # Home page
│   │   ├── budget.js           # Budget page
│   │   └── ...
│   ├── components/             # Reusable UI components
│   ├── db.js                   # IndexedDB (Dexie)
│   ├── main.js                 # App entry point
│   ├── router.js               # Client-side router
│   └── i18n.js                 # Internationalization
│
├── backend/                    # Go backend
│   ├── handlers/               # HTTP request handlers
│   │   ├── oauth.go            # OAuth handlers
│   │   ├── whitelist.go       # Whitelist management
│   │   └── ...
│   ├── services/               # Business logic
│   │   ├── auth.go             # Auth service
│   │   └── ...
│   ├── repositories/           # Database access layer
│   │   └── repository.go       # Data access
│   ├── middleware/             # HTTP middleware
│   │   ├── auth.go             # JWT validation
│   │   └── ...
│   ├── models/                 # Data models
│   │   └── models.go           # Struct definitions
│   ├── oauth/                  # OAuth utilities
│   │   └── google.go           # Google OAuth
│   ├── config/                 # Configuration
│   │   └── config.go          # Config loading
│   └── main.go                 # Entry point
│
├── tests/                      # Test files
│   ├── e2e/                    # End-to-end tests
│   │   ├── sso-login.puppeteer.cjs
│   │   └── sse-e2e.spec.js
│   ├── integration/            # Integration tests
│   └── unit/                  # Unit tests
│
├── docs/                       # Project documentation
│   ├── PRD-TEMPLATE.md         # PRD template
│   ├── TEST-CASES.md          # Test case template
│   ├── SDLC.md                # Development workflow
│   ├── DEVELOPER_WORKFLOW.md   # Developer guide
│   ├── PENTEST-REPORT.md      # Security findings
│   └── ARCHITECTURE*.md       # Architecture docs
│
├── deploy/                     # Deployment configs
│   ├── deploy-cloudrun.sh      # Cloud Run deploy script
│   └── svc-account.json       # GCP service account
│
├── node_modules/               # Node dependencies
├── dist/                       # Built frontend (generated)
├── Dockerfile                  # Frontend container
├── docker-compose.yml          # Local dev stack
├── package.json               # Node dependencies
├── vite.config.js            # Vite config
├── .env                       # Environment variables
│
├── AGENT.md                   # Agent workflow definition
├── README.md                  # Project readme
└── PROJECT.md                 # Project scope
```

---

## 📁 Template for New Projects

When creating a **NEW project**, use this structure:

```
project-name/
├── src/                        # Source code
│   ├── api/                    # API client
│   ├── screens/                # Page components
│   ├── components/            # Reusable components
│   ├── services/              # Business logic (if not api/)
│   ├── utils/                # Utility functions
│   ├── stores/               # State management (if needed)
│   └── main.js               # Entry point
│
├── backend/                   # Backend (if applicable)
│   ├── handlers/
│   ├── services/
│   ├── repositories/
│   ├── middleware/
│   ├── models/
│   ├── config/
│   └── main.go
│
├── tests/                     # All test types
│   ├── e2e/
│   ├── integration/
│   └── unit/
│
├── docs/                      # All documentation
│   ├── PRD-TEMPLATE.md
│   ├── TEST-CASES.md
│   ├── SDLC.md
│   └── ...
│
├── scripts/                   # Build/deploy scripts
├── deploy/                    # Deployment configs
│
├── [config files]            # package.json, Dockerfile, etc
│
├── AGENT.md                   # Agent workflow (COPY THIS)
├── README.md
└── PROJECT.md
```

---

## 📄 Required Files Per Project

| File | Purpose | Source |
|------|---------|---------|
| `AGENT.md` | Agent workflow definition | Copy from template |
| `README.md` | Project overview | Create new |
| `PROJECT.md` | Project scope & goals | Create new |
| `docs/SDLC.md` | Development workflow | Copy from template |
| `docs/PRD-TEMPLATE.md` | PRD template | Copy from template |
| `docs/TEST-CASES.md` | Test case template | Copy from template |

---

## 🏷️ File Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Features | `feature/TICKET-description` | `feature/123-telegram-notify` |
| Bug fixes | `fix/TICKET-description` | `fix/456-login-redirect` |
| Docs | `docs/PRD-YYYY-MM-DD.md` | `docs/PRD-2026-05-02-NOTIFY.md` |
| Test Reports | `docs/TEST-REPORT-YYYY-MM-DD.md` | `docs/TEST-REPORT-2026-05-02.md` |
| Deploy Reports | `docs/DEPLOY-YYYY-MM-DD.md` | `docs/DEPLOY-2026-05-02.md` |

---

## 📊 Documentation Index

| Document | Location | Purpose |
|----------|----------|---------|
| Agent Workflow | `AGENT.md` | How agents work |
| SDLC | `docs/SDLC.md` | Development stages |
| PRD Template | `docs/PRD-TEMPLATE.md` | Feature spec template |
| Test Cases Template | `docs/TEST-CASES.md` | Test doc template |
| Architecture | `docs/ARCHITECTURE*.md` | System design |
| Security | `docs/PENTEST-REPORT.md` | Security findings |

---

*Last Updated: 2026-05-02*