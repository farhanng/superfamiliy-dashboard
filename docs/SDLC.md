# SuperFamily Dashboard - Software Development Life Cycle (SDLC)

## Overview

**Goal:** Streamlined development process dengan jelas roles, responsibilities, dan approval gates.

**Principle:** Client (Kak Farhan) approve semua keputusan major. PM jadi filter & translator. SSE & SQA kerja parallel tapi coordinated.

---

## 🗺️ SDLC Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│  STAGE 1: REQUEST                                                   │
│  Input: Chat/WhatsApp dari Kak Farhan                               │
│  Output: Request Ticket                                              │
│                                                                      │
│  Kak Farhan → "Mau fitur: Notifikasi tagihan via Telegram"           │
│  Channel: WhatsApp (single channel)                                  │
└─────────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────────┐
│  STAGE 2: PM FILTER & VALIDATE                                      │
│  Input: Request Ticket                                               │
│  Output: PRD.md + Approval Request                                    │
│                                                                      │
│  PM Agent:                                                           │
│  - Clarify requirements (jika ambigu)                              │
│  - Break down ke subtasks                                           │
│  - Estimate complexity (Simple/Medium/Complex)                       │
│  - Determine parallelism (1 fitur = sequential, >1 = parallel)       │
│  - Priority: Critical / High / Medium / Low                          │
│  - Create PRD.md di docs/                                           │
│                                                                      │
│  Send to Kak Farhan: "Request X disetujui. Spec: Y. Estimate: Z."   │
│  WAIT FOR CLIENT APPROVAL before proceeding                           │
└─────────────────────────────────────────────────────────────────────┘
                              ↓
                    ┌───────────────────────┐
                    │  CLIENT APPROVAL      │
                    │  Kak Farhan says:     │
                    │  "OK proceed"         │
                    └───────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────────┐
│  STAGE 3: PARALLEL DEVELOPMENT (SSE + SQA)                         │
│  Trigger: Client approval received                                    │
│  Condition: Features > 1 → parallel. Single feature → sequential.   │
│                                                                      │
│  ┌────────────────────────────────┐  ┌────────────────────────────┐ │
│  │ SSE AGENT                      │  │ SQA AGENT                 │ │
│  │ Role: Senior Software Engineer │  │ Role: Quality Assurance    │ │
│  │                                │  │                           │ │
│  │ Tasks:                         │  │ Tasks:                    │ │
│  │ - Technical design            │  │ - Test case design        │ │
│  │ - Implementation              │  │ - E2E test scripts       │ │
│  │ - Code review                 │  │ - Integration tests       │ │
│  │ - Unit tests                  │  │ - Security tests          │ │
│  │ - Documentation               │  │ - Performance tests       │ │
│  │                               │  │                           │ │
│  │ Output:                       │  │ Output:                   │ │
│  │ - Code in feature branch      │  │ - TEST-CASES.md          │ │
│  │ - Tech specs                  │  │ - Test scripts            │ │
│  │ - PR for review               │  │ - Test coverage report    │ │
│  └────────────────────────────────┘  └────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────────┐
│  STAGE 4: PM CODE REVIEW & INTEGRATION                              │
│  Input: SSE Code + SQA Test Cases                                   │
│  Output: PR Approval / Change Request                                │
│                                                                      │
│  PM:                                                                  │
│  - Review SSE implementation against PRD                             │
│  - Verify SQA test coverage                                         │
│  - Check security considerations                                    │
│  - Validate parallelism status                                      │
│                                                                      │
│  Decision: APPROVE → Stage 5 | CHANGES REQUESTED → Stage 3          │
│                                                                      │
│  Send to Kak Farhan: "Development complete. Test coverage: X%."     │
│  WAIT FOR CLIENT APPROVAL before testing                             │
└─────────────────────────────────────────────────────────────────────┘
                              ↓
                    ┌───────────────────────┐
                    │  CLIENT APPROVAL      │
                    │  Kak Farhan says:     │
                    │  "OK test it"         │
                    └───────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────────┐
│  STAGE 5: E2E TESTING (SQA)                                        │
│  Input: Built artifact + Test suite                                  │
│  Output: TEST-REPORT.md                                             │
│                                                                      │
│  SQA Agent:                                                         │
│  - Run full regression suite (ALL features)                         │
│  - Run feature-specific tests                                       │
│  - Run security tests                                               │
│  - Run performance tests                                            │
│                                                                      │
│  Gate: ALL_TESTS_GREEN → Deploy                                     │
│  If any test fails → back to Stage 3 (SSE fixes)                    │
│                                                                      │
│  Report to PM: "X tests passed, Y failed. Ready for deploy?"        │
└─────────────────────────────────────────────────────────────────────┘
                              ↓
                    ┌───────────────────────┐
                    │  PM RECOMMENDATION    │
                    │  "Tests green.        │
                    │   Ready to deploy?"   │
                    └───────────────────────┘
                              ↓
                    ┌───────────────────────┐
                    │  CLIENT APPROVAL      │
                    │  Kak Farhan says:     │
                    │  "Deploy it"          │
                    └───────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────────┐
│  STAGE 6: SENIOR INFRA DEPLOYMENT                                  │
│  Input: Approved artifact                                           │
│  Output: DEPLOYMENT-REPORT.md                                       │
│                                                                      │
│  Senior Infra Agent:                                                 │
│  - Deploy to staging (smoke test first)                            │
│  - If smoke test pass → deploy to production                       │
│  - If smoke test fail → auto ROLLBACK                              │
│  - Monitor logs & metrics                                          │
│  - Send deployment report to PM                                     │
│                                                                      │
│  ROLLBACK TRIGGER:                                                   │
│  - Tests fail in staging                                            │
│  - Smoke test fails                                                │
│  - Runtime errors detected                                          │
│                                                                      │
│  ROLLBACK PROCESS:                                                  │
│  - Senior Infra → "Rollback needed" request to PM                   │
│  - PM → Client approval for rollback                                │
│  - Client says "OK rollback" → Senior Infra executes               │
│  - Report rollback status to PM → Client                            │
└─────────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────────┐
│  STAGE 7: PRODUCTION VERIFICATION (SQA)                            │
│  Input: Deployed production                                         │
│  Output: PRODUCTION-QA-REPORT.md                                    │
│                                                                      │
│  SQA Agent:                                                         │
│  - Verify feature works as expected in production                   │
│  - Check no regressions in existing features                       │
│  - Verify user access (if applicable)                               │
│  - Confirm real-time sync (SSE) working                             │
│                                                                      │
│  Report to PM: "Production verification: X% passed."               │
└─────────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────────┐
│  STAGE 8: CLIENT SIGN-OFF                                          │
│  Input: Production QA Report                                        │
│  Output: Ticket CLOSED                                              │
│                                                                      │
│  PM → Client: "Feature deployed & verified. Please confirm."       │
│                                                                      │
│  Client:                                                            │
│  - Happy → CLOSE TICKET                                            │
│  - Issue found → Back to Stage 3 (SSE fixes) or Stage 5 (SQA)      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Emergency / Hotfix Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│  HOTFIX REQUEST                                                     │
│  Kak Farhan → "Feature X down! Fix now!"                           │
│  Channel: WhatsApp (PRIORITY)                                      │
└─────────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────────┐
│  PM ASSESSMENT                                                      │
│  - Is it critical? (data loss / security / complete outage)        │
│  - Estimated fix complexity                                         │
│                                                                      │
│  Decision: HOTFIX_APPROVED / CAN_WAIT_FOR_NORMAL_FLOW              │
└─────────────────────────────────────────────────────────────────────┘
                              ↓
                    ┌───────────────────────┐
                    │  CLIENT APPROVAL      │
                    │  Kak Farhan says:     │
                    │  "Yes, hotfix it"     │
                    └───────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────────┐
│  HOTFIX EXECUTION (Accelerated)                                     │
│                                                                      │
│  SSE: Fast fix implementation                                       │
│  SQA: Quick smoke test only                                         │
│  Senior Infra: Immediate deploy                                     │
│                                                                      │
│  PM: "Hotfix deployed in X minutes. Verifying..."                   │
└─────────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────────┐
│  HOTFIX VERIFICATION                                                 │
│  SQA: Verify fix works                                              │
│  PM → Client: "Hotfix verified. All good?"                         │
└─────────────────────────────────────────────────────────────────────┘
                              ↓
                    ┌───────────────────────┐
                    │  CLIENT SIGN-OFF      │
                    │  "OK, thanks"         │
                    └───────────────────────┘
                              ↓
                         CLOSE TICKET
```

---

## 📋 Roles & Responsibilities

### 1. Client (Kak Farhan)
| Responsibility | Description |
|----------------|-------------|
| **Approve** | All major decisions: proceed, rollback, hotfix |
| **Request** | Submit features via WhatsApp |
| **Verify** | Final sign-off after production deployment |
| **Escalate** | Raise concerns, prioritize |

**Communication Rule:** ALL approvals go THROUGH PM. Client tidak directly talk to SSE/SQA/Senior Infra.

### 2. PM Agent (Project Manager)
| Responsibility | Description |
|----------------|-------------|
| **Filter** | Validate client requests, break down requirements |
| **Coordinate** | Sync SSE + SQA work |
| **Approve** | Code review, test review |
| **Communicate** | Route updates to client, collect approvals |
| **Document** | Create PRD.md, track progress |

**Location:** `agents/PM.md`

### 3. SSE Agent (Senior Software Engineer)
| Responsibility | Description |
|----------------|-------------|
| **Design** | Technical architecture |
| **Implement** | Write code, create features |
| **Test** | Unit tests, integration tests |
| **Deploy** | Assist Senior Infra with deployment |
| **Document** | Tech specs, API docs |

### 4. SQA Agent (Software Quality Assurance)
| Responsibility | Description |
|----------------|-------------|
| **Test Design** | Create test cases, test plans |
| **E2E Testing** | Run full regression suites |
| **Verify** | Pre-production, post-production verification |
| **Report** | Test results, bug reports |

**Test Files:**
- `tests/sso-login.puppeteer.cjs` - Login/SSO tests
- `tests/sse-e2e.spec.js` - Real-time SSE tests
- `tests/SQA-TEST-RESULTS.md` - Test reports

### 5. Senior Infra Agent (DevOps)
| Responsibility | Description |
|----------------|-------------|
| **Deploy** | Staging & production deployments |
| **Monitor** | Logs, metrics, health |
| **Rollback** | Execute rollback when triggered |
| **Maintain** | Infrastructure, DNS, SSL |

---

## 📁 Documentation Standards

### Per-Project Structure
```
docs/
├── PRD-YYYY-MM-DD-FEATURE-NAME.md   # Product Requirements
├── TEST-PLAN.md                      # Master test plan
├── TEST-CASES.md                    # Test case inventory
├── TEST-REPORTS/                    # Test execution reports
│   ├── YYYY-MM-DD-test-report.md
│   └── ...
├── DEPLOYMENTS/                     # Deployment logs
│   ├── YYYY-MM-DD-deployment.md
│   └── ...
└── [other project docs]
```

### PRD Template
```markdown
# PRD: [Feature Name]

## Overview
[One paragraph description]

## Requirements
- [Requirement 1]
- [Requirement 2]

## Acceptance Criteria
- [AC1]
- [AC2]

## Technical Notes
[For SSE]

## Test Cases
[For SQA]

## Status
- [ ] Proposed
- [ ] Approved
- [ ] In Development
- [ ] Testing
- [ ] Deployed
- [ ] Verified
```

---

## ⏱️ SLAs & Timelines

| Stage | Target Time | Max Time |
|-------|-------------|----------|
| PM Filter & Validate | 1 hour | 4 hours |
| Client Approval | Client-driven | - |
| SSE Implementation (Simple) | 2 hours | 4 hours |
| SSE Implementation (Complex) | 1 day | 3 days |
| SQA Testing | 1 hour | 4 hours |
| Senior Infra Deploy | 30 min | 2 hours |
| Production Verification | 30 min | 1 hour |

---

## 🚨 Rollback Criteria

Auto-rollback triggers:
- Smoke test fails in staging
- Deployment errors
- Runtime panic/500 errors detected
- SSE connection failures > 50%

Manual rollback (needs client approval):
- Critical bugs discovered post-deploy
- Security vulnerabilities
- Data integrity issues

---

## 🔗 Communication Matrix

| From | To | What |
|------|-----|------|
| Client | PM | Feature request, Approve, Reject, Hotfix |
| PM | Client | Status update, Approval request, Reports |
| PM | SSE | Task assignment, Change requests |
| PM | SQA | Test requirements, Coverage expectations |
| PM | Senior Infra | Deploy requests, Rollback requests |
| SSE | PM | Code ready, Blockers, Questions |
| SQA | PM | Test results, Bug reports, Coverage report |
| Senior Infra | PM | Deploy status, Issues, Rollback status |

---

## 📊 Metrics

Track per sprint/month:

| Metric | Target |
|--------|--------|
| Deploy frequency | 2-3x per week |
| Lead time (request → deploy) | < 1 week (simple), 2-3 weeks (complex) |
| Test pass rate | > 95% |
| Production incidents | < 2 per month |
| Client satisfaction | > 90% |

---

*Last Updated: 2026-05-02*
*Version: 1.0*
*Author: ViercasAI*