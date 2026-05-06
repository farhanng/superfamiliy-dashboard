# SuperFamily Dashboard - Agent Workflow Definition

> **Purpose:** Standardized workflow for all agents working on this project.  
> **Applies to:** SSE Agent, SQA Agent, Senior Infra Agent, PM Agent.  
> **Usage:** Reference this file for every task. Follow the SDLC stages exactly.

---

## 🎯 Quick Reference

| When You Are... | Do This |
|-----------------|---------|
| Starting a task | Read `docs/SDLC.md` first |
| Implementing a feature | Follow STAGE 3 checklist |
| Testing a feature | Follow STAGE 5 checklist |
| Deploying | Follow STAGE 6 checklist |
| Reporting to client | Route through PM Agent |
| Stuck/blocked | Escalate to PM Agent |

---

## 🔄 Standard Workflow

### Every Task Starts Here

```
1. Read PRD.md for the feature
2. Read docs/SDLC.md for stages
3. Check current project state (git status, test results)
4. Execute your stage tasks
5. Report to PM Agent
6. PM Agent routes to next stage
```

---

## 📋 Stage-by-Stage Agent Checklist

### STAGE 1: Request
**Who:** PM Agent  
**Trigger:** Client request via WhatsApp

- [ ] PM receives client request
- [ ] PM validates request
- [ ] PM creates request ticket

**Output:** Request ticket created

---

### STAGE 2: PM Filter & Validate
**Who:** PM Agent  
**Trigger:** Request received

- [ ] Clarify ambiguities with client
- [ ] Break down into subtasks
- [ ] Estimate complexity (Simple/Medium/Complex)
- [ ] Determine if parallelism needed (features > 1 = parallel)
- [ ] Create PRD in `docs/PRD-YYYY-MM-DD-FEATURE.md`
- [ ] Set priority (Critical/High/Medium/Low)
- [ ] Send approval request to client

**Output:** PRD.md created, awaiting client approval

---

### STAGE 3: Parallel Development
**Who:** SSE Agent + SQA Agent  
**Trigger:** Client approval received

#### SSE Agent Checklist
- [ ] Read PRD.md thoroughly
- [ ] Create feature branch: `feature/TICKET-description`
- [ ] Write technical design (comment in code or `docs/TECH-DESIGN.md`)
- [ ] Implement feature
- [ ] Write unit tests
- [ ] Ensure code compiles/builds
- [ ] Run local integration tests
- [ ] Update `docs/TECH-DESIGN.md` if needed
- [ ] Create PR for review
- [ ] Notify PM: "SSE complete, ready for review"

#### SQA Agent Checklist
- [ ] Read PRD.md thoroughly
- [ ] Review acceptance criteria
- [ ] Create test cases in `docs/TEST-CASES.md`
- [ ] Write E2E tests in `tests/` folder
- [ ] Write integration tests
- [ ] Write security tests (if applicable)
- [ ] Run existing test suite (regression check)
- [ ] Ensure all tests pass locally
- [ ] Notify PM: "SQA complete, ready for review"

**Parallelism Rule:**
- Features = 1 → SSE and SQA can work sequentially
- Features > 1 → SSE and SQA work in parallel, sync via PM

**Output:** PR created, test cases written, awaiting PM review

---

### STAGE 4: PM Code Review & Integration
**Who:** PM Agent  
**Trigger:** SSE + SQA complete

- [ ] Review SSE implementation against PRD
- [ ] Review SQA test coverage
- [ ] Check security considerations
- [ ] Verify parallelism status
- [ ] Request changes if needed → back to STAGE 3
- [ ] Approve PR
- [ ] Send to client for test approval

**Output:** PR approved, awaiting client approval to test

---

### STAGE 5: E2E Testing
**Who:** SQA Agent  
**Trigger:** Client test approval received

- [ ] Pull latest build
- [ ] Run full regression suite (ALL tests)
- [ ] Run feature-specific tests
- [ ] Run security tests
- [ ] Run performance tests
- [ ] Document all results in `docs/TEST-REPORTS/YYYY-MM-DD.md`
- [ ] If ANY test fails → notify PM → back to STAGE 3
- [ ] If ALL pass → notify PM: "Tests green, ready to deploy"

**Regression Rule:** Full regression REQUIRED for every deploy.

**Output:** `docs/TEST-REPORTS/YYYY-MM-DD.md` with pass/fail status

---

### STAGE 6: Deployment
**Who:** Senior Infra Agent  
**Trigger:** Client deploy approval received

#### Pre-Deploy
- [ ] Deploy to staging first
- [ ] Run smoke tests
- [ ] If smoke test fails → auto rollback, notify PM

#### Deploy
- [ ] Deploy to production
- [ ] Monitor logs and metrics
- [ ] If errors detected → notify PM → request rollback approval

#### Post-Deploy
- [ ] Document deployment in `docs/DEPLOYMENTS/YYYY-MM-DD.md`
- [ ] Notify PM: "Deployment complete"

**Rollback Rule:** Auto-rollback on smoke test failure. Client approval required for manual rollback.

**Output:** `docs/DEPLOYMENTS/YYYY-MM-DD.md` with deployment details

---

### STAGE 7: Production Verification
**Who:** SQA Agent  
**Trigger:** Deployment complete

- [ ] Verify feature works in production
- [ ] Check no regressions (run quick smoke suite)
- [ ] Verify real-time features (SSE) working
- [ ] Document in `docs/TEST-REPORTS/PROD-YYYY-MM-DD.md`
- [ ] Notify PM: "Production verification complete"

**Output:** `docs/TEST-REPORTS/PROD-YYYY-MM-DD.md`

---

### STAGE 8: Client Sign-Off
**Who:** PM Agent  
**Trigger:** Production verification complete

- [ ] Send verification report to client
- [ ] Client tests manually
- [ ] Client approves → close ticket
- [ ] Client rejects → back to appropriate stage

---

## 🚨 Hotfix Workflow

**Trigger:** Client says "URGENT - feature X is broken!"

```
1. PM Assessment (IMMEDIATE)
   - Is it critical? (data loss / security / outage)
   - Estimate fix time
   - Decision: HOTFIX or CAN_WAIT

2. If HOTFIX:
   - PM → Client: "Approve hotfix?"
   - Client approves → SSE fixes fast
   - SQA does quick smoke test
   - Senior Infra deploys immediately
   - PM → Client: "Hotfix deployed, please verify"

3. If CAN_WAIT:
   - Follow normal STAGE 1-8 flow
```

---

## 📁 File Naming Conventions

| Document | Pattern | Example |
|----------|---------|---------|
| PRD | `PRD-YYYY-MM-DD-FEATURE.md` | `PRD-2026-05-02-TELEGRAM-NOTIFY.md` |
| Test Report | `TEST-REPORT-YYYY-MM-DD.md` | `TEST-REPORT-2026-05-02.md` |
| Production QA | `PROD-QA-YYYY-MM-DD.md` | `PROD-QA-2026-05-02.md` |
| Deployment | `DEPLOY-YYYY-MM-DD.md` | `DEPLOY-2026-05-02.md` |
| Feature Branch | `feature/TICKET-description` | `feature/123-telegram-notify` |

---

## 🔗 Reference Links

| Document | Location |
|----------|----------|
| SDLC Flow | `docs/SDLC.md` |
| PRD Template | `docs/SDLC.md#prd-template` |
| Test Files | `tests/` |
| Project Docs | `docs/` |
| Architecture | `docs/ARCHITECTURE*.md` |

---

## ⚠️ Agent Rules (Non-Negotiable)

1. **Never skip stages** - Follow SDLC exactly
2. **Never report directly to client** - Route through PM
3. **Full regression required** - No partial testing
4. **Document everything** - Every action has output
5. **Escalate blockers** - Don't wait, notify PM immediately
6. **Test before deploy** - No deploy without passing tests
7. **Rollback on failure** - Auto-rollback for smoke test failures

---

## 🔄 For New Projects

When starting a **NEW project**, apply this workflow:

```
1. Create project folder structure:
   project-name/
   ├── docs/
   │   ├── PRD-TEMPLATE.md
   │   ├── TEST-CASES.md
   │   └── SDLC.md
   ├── tests/
   │   ├── e2e/
   │   ├── integration/
   │   └── unit/
   ├── src/ (or equivalent)
   ├── agents/
   │   └── AGENT.md (copy from this file)
   └── README.md

2. Copy this AGENT.md to the new project

3. Initialize git repo

4. Create initial PRD for MVP

5. Follow STAGE 1-8 for first feature
```

---

## 📞 Escalation Path

```
Agent Stuck? → PM Agent → Client (only if PM can't resolve)
```

Never skip levels. PM Agent exists to handle cross-team issues.

---

*This file is the single source of truth for agent workflows.*  
## 🔴 Active Issue: SSO Fix (2026-05-02)

**Problem:** OAuth 500 error on callback - Firebase whitelist check failing

**Root Cause:** Firebase not connecting - credentials file path issue

**Current Status:** SSE deployed backend with Firebase code, but Firebase Init failing

**Next Steps:**
1. SQA: Debug Firebase connection issue
2. Fix Firebase Init code or env vars
3. Re-test OAuth flow
4. Full regression before client test

---

*Last Updated: 2026-05-02*
*Version: 1.0*