# SuperFamily Dashboard - Retest Report (Post-Bug-Fix)

**Date:** 2026-05-06  
**Tester:** ViercasAI SQA Subagent  
**Backend:** https://superfamily-backend-916992190881.asia-southeast1.run.app  
**Frontend (deployed):** https://family.farhan.biz.id  

---

## TL;DR

**VERDICT: FAIL - Bug fixes NOT yet deployed**

The code fixes for BUG-001 and BUG-002 are correct and present in the codebase, but **the Cloud Run backend has NOT been rebuilt/deployed**. All API tests below run against the **currently deployed (old) binary**.

**ACTION REQUIRED:** Redeploy backend to apply the bug fixes.

---

## Bug Fix Verification

### BUG-001: Weekend Activity Schema Fix

| Check | Detail |
|-------|--------|
| **Bug** | SQL schema used `activity` (singular) but model/Firestore uses `activities` (plural) |
| **Fix Location** | `backend/main.go` line ~417: `activities TEXT NOT NULL` |
| **Code Status** | ✅ Fixed in code |
| **Deployed Status** | ❌ NOT deployed - still running old schema |

**API Test Results (current deployment - OLD CODE):**

| Operation | Payload Format | Result |
|-----------|----------------|--------|
| CREATE | `{"activity": "...", ...}` (singular) | ✅ PASS |
| READ all | - | ✅ PASS |
| READ one | `/weekend-activities/:id` → returns 404 (no single-get endpoint) | N/A |
| UPDATE | `{"activity": "...", ...}` (singular) | ✅ PASS |
| DELETE | ID-based | ✅ PASS |

**Note:** The current deployment accepts `activity` (singular) because it runs the old code. After redeploy, it will require `activities` (plural).

---

### BUG-002: Meal Plan Delete Route Param Fix

| Check | Detail |
|-------|--------|
| **Bug** | `DeleteMealPlan` handler used `c.Param("weekStart")` but route is `/meal-plans/:id` |
| **Fix Location** | `backend/handlers/others.go` line ~88: `weekStart := c.Param("id")` + date normalization |
| **Code Status** | ✅ Fixed in code |
| **Deployed Status** | ❌ NOT deployed - still running old code |

**API Test Results (current deployment - OLD CODE):**

| Operation | Payload/Param | Result |
|-----------|---------------|--------|
| CREATE | `POST /api/meal-plans` with `week_start` (snake_case) | ✅ PASS |
| READ all | `GET /api/meal-plans` | ✅ PASS |
| READ by week | `GET /api/meal-plans/2026-05-11` | ✅ PASS (finds via weekStart) |
| DELETE by ID | `DELETE /api/meal-plans/:id` | ❌ FAIL - tries to find by `weekStart=cc1ce08d...` (the ID itself), not found |
| DELETE by weekStart | `DELETE /api/meal-plans/2026-05-11` | ❌ FAIL - date format mismatch (has time component `T00:00:00Z`) |

**Root cause confirmed:** The deployed delete handler uses `c.Param("weekStart")` (wrong param name), so it treats the URL segment as `weekStart`. It then looks for a meal plan with `week_start = "cc1ce08d-..."` (the UUID) which doesn't exist. The date normalization fix is also not deployed.

---

## Basic Smoke Test (API Level)

| Category | Test | Method | Endpoint | Result |
|----------|------|--------|----------|--------|
| Auth | Login | POST | `/api/auth/login` | ✅ PASS |
| Auth | Logout | POST | `/api/auth/logout` | ✅ PASS |
| Auth | Me (without token) | GET | `/api/auth/me` | ✅ Returns 401 |
| Bills | Create | POST | `/api/bills` | ✅ PASS |
| Bills | Get all | GET | `/api/bills` | ✅ PASS |
| Bills | Delete | DELETE | `/api/bills/:id` | ✅ PASS |
| Meal Plans | Create | POST | `/api/meal-plans` | ✅ PASS |
| Meal Plans | Get all | GET | `/api/meal-plans` | ✅ PASS |
| Meal Plans | Delete | DELETE | `/api/meal-plans/:id` | ❌ FAIL (BUG-002) |
| Weekend Activity | Create | POST | `/api/weekend-activities` | ✅ PASS (with old payload) |
| Weekend Activity | Get all | GET | `/api/weekend-activities` | ✅ PASS |
| Weekend Activity | Update | PUT | `/api/weekend-activities/:id` | ✅ PASS |
| Weekend Activity | Delete | DELETE | `/api/weekend-activities/:id` | ✅ PASS |

**Dashboard/Stats:** No `/api/dashboard` or `/api/stats` endpoint exists. Frontend aggregates data from individual endpoints (bills, transactions, etc.).

---

## Issue Summary

| Severity | Issue |说明|
|----------|-------|-----|
| 🔴 CRITICAL | Backend not redeployed | Bug fixes exist in code but not in the running service |
| 🔴 CRITICAL | Meal Plan DELETE broken | DELETE by ID fails (uses wrong param). DELETE by weekStart fails (date mismatch) |
| 🟡 MEDIUM | Weekend Activity payload mismatch | Current deployment accepts `activity` (singular). After redeploy, frontend must use `activities` (plural) |

---

## Action Items

1. **Redeploy backend to Cloud Run:**
   ```bash
   cd /home/farhan/.openclaw/workspace/superfamily-dashboard
   ./deploy/deploy-cloudrun.sh
   ```

2. **After redeploy, verify:**
   - Weekend Activity CREATE/UPDATE/DELETE with `activities` (plural) payload
   - Meal Plan DELETE by ID works correctly
   - Meal Plan DELETE by weekStart also works (date normalization)

3. **Frontend update (if needed):**
   - Verify `src/services/` calls use `activities` (plural) for weekend activities
   - Verify meal plan delete calls use `/api/meal-plans/:id` not `/api/meal-plans/:weekStart`

---

## Test Credentials Used

- Email: `farhan@superfamily.local`
- Password: `farhan123`
- Auth Token (for API tests): `eyJhbGciOiJIUzI1NiIs...` (session: 2026-05-06T16:11 UTC)

---

*Generated by ViercasAI SQA Subagent*
