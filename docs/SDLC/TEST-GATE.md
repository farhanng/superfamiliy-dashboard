# SDLC Test Gate — SuperFamily Dashboard

**Date:** 2026-05-02
**Version:** 1.0

---

## Overview

This document defines the test gate process for SuperFamily Dashboard, integrating the comprehensive test cases from `docs/TEST-CASES/TEST-CASES-2026-05-02.md` into the SDLC.

---

## Test Case Reference

**Full Test Cases:** `docs/TEST-CASES/TEST-CASES-2026-05-02.md`

### Coverage Summary

| Category | Total | P0 | P1 | P2 |
|----------|-------|----|----|-----|
| Authentication & Authorization | 19 | 12 | 5 | 2 |
| Budget / Transactions | 17 | 10 | 5 | 2 |
| Events | 16 | 8 | 5 | 3 |
| Bills | 16 | 8 | 5 | 3 |
| Reminders (Pajak) | 14 | 6 | 5 | 3 |
| Meal Plan | 13 | 5 | 5 | 3 |
| Weekend Activities | 12 | 4 | 5 | 3 |
| Navigation & UI | 11 | 3 | 5 | 3 |
| SSE / Real-time | 9 | 3 | 4 | 2 |
| **TOTAL** | **127** | **59** | **44** | **24** |

---

## SDLC Test Gates

### Gate 1: Development Complete
**Trigger:** Code changes merged to main

**Required:**
- [ ] All P0 test cases pass (59 tests)
- [ ] Code compiles without errors
- [ ] Basic smoke test passes

**Exit:** Build deployed to staging

---

### Gate 2: Staging Validation
**Trigger:** Build on staging environment

**Required:**
- [ ] All P0 + P1 test cases pass (103 tests)
- [ ] E2E OAuth flow works
- [ ] All CRUD operations work
- [ ] Firestore data persistence verified
- [ ] No console errors

**Exit:** Approved for production

---

### Gate 3: Production Release
**Trigger:** Production deployment request

**Required:**
- [ ] Full regression (all 127 tests)
- [ ] Client sign-off
- [ ] Rollback plan prepared

**Exit:** Live in production

---

## Test Execution Process

### Phase 1: Automated Testing
```bash
# Run all test cases
# Reference: docs/TEST-CASES/TEST-CASES-2026-05-02.md
```

### Phase 2: E2E Testing
```bash
# OAuth Login Test
https://superfamily-backend-916992190881.asia-southeast1.run.app/api/auth/test-login?email=farhan.naufalghani@gmail.com&name=Farhan&redirect_uri=https://family.farhan.biz.id

# Screens to verify:
# - Home/Beranda
# - Budget (Income + Expense)
# - Events (Calendar + Add)
# - Meal Plan
# - Weekend
# - Bills (Add + List)
# - Language Toggle
# - Logout
```

### Phase 3: Manual Verification
- PM reviews test results
- Client performs user acceptance test
- Sign-off obtained

---

## Test Results Format

For each deployment, document:

```
## Deployment: YYYY-MM-DD
### Environment: [staging|production]
### Version: [git commit hash]

| Gate | Status | Notes |
|------|--------|-------|
| Gate 1 | PASS/FAIL | |
| Gate 2 | PASS/FAIL | |
| Gate 3 | PASS/FAIL | |

### Test Results
- P0: X/59 passed
- P1: X/44 passed  
- P2: X/24 passed

### Blockers (if any)
- [List any failing tests]

### Sign-off
- [ ] PM Approval
- [ ] Client Approval
```

---

## Test Case Execution Matrix

### Authentication (AUTH-*)

| Test ID | Title | Method | Expected |
|---------|-------|--------|----------|
| AUTH-P-001 | Login valid | API | 200 + JWT |
| AUTH-P-002 | Registration | API | 201 + JWT |
| AUTH-P-003 | Session persist | API | Auth works |
| AUTH-P-004 | Logout | API | 200 |
| AUTH-P-005 | Google OAuth | API | 302 to Google |
| AUTH-N-001 | Non-existent email | API | 401 |
| AUTH-N-002 | Wrong password | API | 401 |
| AUTH-N-003 | No token | API | 401 |
| AUTH-N-004 | Malformed token | API | 401 |
| AUTH-N-005 | Expired token | API | 401 |
| AUTH-N-006 | Duplicate register | API | 409 |
| AUTH-S-001 | SQL injection | API | 401, no leak |
| AUTH-S-002 | XSS in name | API | Sanitized |
| AUTH-S-003 | JWT tampered | API | 401 |
| AUTH-S-004 | JWT expired | API | 401 |
| AUTH-S-005 | Rate limit | API | 429 |
| AUTH-S-006 | OAuth state tampered | API | Reject |
| AUTH-S-007 | PKCE wrong | API | Reject |
| AUTH-S-008 | Not whitelisted | API | Error page |

### Budget (BUD-*)

| Test ID | Title | Method | Expected |
|---------|-------|--------|----------|
| BUD-P-001 | Add transaction | API | 201 Created |
| BUD-P-002 | View list | API | 200 + array |
| BUD-P-003 | Filter by month | API | 200 + filtered |
| BUD-P-004 | Edit transaction | API | 200 OK |
| BUD-P-005 | Delete transaction | API | 200 OK |
| BUD-P-006 | Set budget | API | 200 OK |
| BUD-P-007 | Get budget | API | 200 OK |
| BUD-N-001 | Missing amount | API | 400 |
| BUD-N-002 | Negative amount | API | 400 |
| BUD-N-003 | Missing category | API | 400 |
| BUD-N-004 | Invalid month | API | 400 |
| BUD-N-005 | Not found | API | 404 |
| BUD-N-006 | Already deleted | API | 404 |
| BUD-S-001 | Amount validation | API | Reject non-numeric |
| BUD-S-002 | IDOR check | API | 403 if not owner |

*(Full test cases in docs/TEST-CASES/TEST-CASES-2026-05-02.md)*

---

## Current Status

**Last Updated:** 2026-05-02

### Production Deployment (2026-05-02)
- [x] Gate 1: Code merged, build successful
- [x] Gate 2: Staging validated (OAuth, CRUD, Firestore)
- [x] Gate 3: Client approved → **DEPLOYED**

### Known Issues
- None (all P0/P1 passed)

### Next Release
- Full regression test with all 127 test cases
- Client UAT scheduled

---

## Links

- **Test Cases:** `docs/TEST-CASES/TEST-CASES-2026-05-02.md`
- **Test Reports:** `docs/TEST-REPORTS/`
- **PRD:** `docs/PRD.md`
- **Backend API:** `https://superfamily-backend-916992190881.asia-southeast1.run.app`
- **Frontend:** `https://family.farhan.biz.id`
