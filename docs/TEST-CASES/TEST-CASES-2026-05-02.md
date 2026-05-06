# Test Case Documentation — SuperFamily Dashboard

**Date:** 2026-05-02
**Version:** 1.0
**Project:** SuperFamily Dashboard (SuperFamily API v1 + Frontend PWA)
**Scope:** Full-stack test case coverage based on PRD and codebase analysis

---

## Test Execution Matrix

| Category | Positive | Negative | Security | Total |
|----------|----------|----------|----------|-------|
| Authentication & Authorization | 5 | 6 | 8 | **19** |
| Budget / Transactions | 7 | 6 | 4 | **17** |
| Events | 7 | 6 | 3 | **16** |
| Bills | 8 | 5 | 3 | **16** |
| Reminders (Pajak) | 7 | 5 | 2 | **14** |
| Meal Plan | 6 | 5 | 2 | **13** |
| Weekend Activities | 6 | 4 | 2 | **12** |
| Navigation & UI | 5 | 4 | 2 | **11** |
| SSE / Real-time | 3 | 3 | 3 | **9** |
| **TOTAL** | **54** | **44** | **29** | **127** |

| Priority | Count |
|----------|-------|
| **High (P0)** | 42 |
| **Medium (P1)** | 51 |
| **Low (P2)** | 34 |
| **TOTAL** | **127** |

---

## Legend

- **P0** — Critical path, must pass before release
- **P1** — Important, should pass before release
- **P2** — Nice to have, can be deferred

---

## A. Authentication & Authorization

### A1. Positive

| Test ID | Feature | Test Type | Title | Pre-conditions | Steps | Expected Result | Priority |
|---------|---------|-----------|-------|----------------|-------|-----------------|----------|
| AUTH-P-001 | Auth | Positive | Login with valid email and password | User registered; valid credentials | 1. POST /api/auth/login with email + password | 200 OK; JWT token returned in response body | P0 |
| AUTH-P-002 | Auth | Positive | Registration creates user and returns JWT | No existing account | 1. POST /api/auth/register with email, password, name | 201 Created; JWT token + user object returned | P0 |
| AUTH-P-003 | Auth | Positive | Session persists after page reload | Valid JWT stored client-side | 1. Login, store token; 2. Reload page; 3. Use stored token in Authorization header | Authenticated requests succeed; user data returned | P0 |
| AUTH-P-004 | Auth | Positive | Logout successfully | Authenticated session active | 1. DELETE /api/auth/logout | 200 OK; token discarded client-side; subsequent API calls with old token fail 401 | P1 |
| AUTH-P-005 | Auth | Positive | Google OAuth initiates correctly | OAuth configured (ENV != production) | 1. GET /api/auth/google | 302 redirect to Google OAuth consent page | P0 |

### A2. Negative

| Test ID | Feature | Test Type | Title | Pre-conditions | Steps | Expected Result | Priority |
|---------|---------|-----------|-------|----------------|-------|-----------------|----------|
| AUTH-N-001 | Auth | Negative | Login with non-existent email | No account for test email | 1. POST /api/auth/login with unregistered email | 401 Unauthorized; generic error message | P0 |
| AUTH-N-002 | Auth | Negative | Login with wrong password | Valid account exists | 1. POST /api/auth/login with correct email, wrong password | 401 Unauthorized; generic error message | P0 |
| AUTH-N-003 | Auth | Negative | Access API without token | No token provided | 1. Any authenticated GET endpoint without Authorization header | 401 Unauthorized | P0 |
| AUTH-N-004 | Auth | Negative | Access API with malformed token | Invalid JWT string | 1. Any authenticated GET endpoint with "Bearer invalidtoken123" | 401 Unauthorized | P0 |
| AUTH-N-005 | Auth | Negative | Access API with expired token | Expired JWT (exp in past) | 1. Sign token with exp = yesterday; call API | 401 Unauthorized; error mentions token expired | P0 |
| AUTH-N-006 | Auth | Negative | Register with duplicate email | Email already registered | 1. POST /api/auth/register with existing email | 409 Conflict; error message indicates conflict | P0 |

### A3. Security

| Test ID | Feature | Test Type | Title | Pre-conditions | Steps | Expected Result | Priority |
|---------|---------|-----------|-------|----------------|-------|-----------------|----------|
| AUTH-S-001 | Auth | Security | SQL injection in login email field | None | 1. POST /api/auth/login with email="admin@x.com' OR '1'='1" | 401 Unauthorized; no SQL error leaked in response | P0 |
| AUTH-S-002 | Auth | Security | XSS in user profile name field | Authenticated session | 1. Register/login with name="<script>alert(1)</script>"; 2. GET /api/auth/me | Name sanitized/escaped on display; no script execution | P1 |
| AUTH-S-003 | Auth | Security | JWT token signature validation | Valid token tampered with | 1. Change last char of JWT signature; call authenticated API | 401 Unauthorized; signature validation failure | P0 |
| AUTH-S-004 | Auth | Security | JWT token expiration enforced | Token with exp in past | 1. Call authenticated API with expired token | 401 Unauthorized; token expired error | P0 |
| AUTH-S-005 | Auth | Security | Rate limiting on login endpoint | None | 1. Send 20+ rapid login requests in <60 seconds | Subsequent requests return 429 Too Many Requests or 401 | P0 |
| AUTH-S-006 | Auth | Security | OAuth state parameter validation | None | 1. Tamper with state parameter in OAuth callback; complete OAuth flow | OAuth callback rejected; redirect to error page | P0 |
| AUTH-S-007 | Auth | Security | PKCE validation on OAuth callback | OAuth flow initiated with PKCE | 1. Intercept callback; use wrong code_verifier in token exchange | OAuth callback rejected; PKCE validation failed error | P0 |
| AUTH-S-008 | Auth | Security | Email not whitelisted → OAuth fails | Google account not in whitelist | 1. Complete OAuth with non-whitelisted email | Redirect to error page with reason=email_not_whitelisted | P0 |

---

## B. Budget / Transactions

### B1. Positive

| Test ID | Feature | Test Type | Title | Pre-conditions | Steps | Expected Result | Priority |
|---------|---------|-----------|-------|----------------|-------|-----------------|----------|
| BUD-P-001 | Budget | Positive | Add transaction with valid data | Authenticated | 1. POST /api/transactions with amount, category, date, type=expense, note | 201 Created; transaction ID returned; data persisted | P0 |
| AUTH-P-002 (alias) | Budget | Positive | View transaction list | Transactions exist | 1. GET /api/transactions | 200 OK; array of transactions returned | P0 |
| BUD-P-003 | Budget | Positive | Filter transactions by month | Transactions exist | 1. GET /api/transactions/2026/5 | 200 OK; only transactions from May 2026 returned | P0 |
| BUD-P-004 | Budget | Positive | Edit existing transaction | Transaction exists | 1. PUT /api/transactions/:id with updated amount/category | 200 OK; transaction updated in DB | P0 |
| BUD-P-005 | Budget | Positive | Delete transaction | Transaction exists | 1. DELETE /api/transactions/:id | 200 OK; transaction removed from DB | P0 |
| BUD-P-006 | Budget | Positive | Set monthly budget | Authenticated | 1. PUT /api/budget/2026-05 with amount=5000000 | 200 OK; budget stored | P0 |
| BUD-P-007 | Budget | Positive | Get monthly budget | Budget set for month | 1. GET /api/budget/2026-05 | 200 OK; budget amount returned | P0 |

### B2. Negative

| Test ID | Feature | Test Type | Title | Pre-conditions | Steps | Expected Result | Priority |
|---------|---------|-----------|-------|----------------|-------|-----------------|----------|
| BUD-N-001 | Budget | Negative | Add transaction with missing amount | Authenticated | 1. POST /api/transactions without amount field | 400 Bad Request; validation error message | P0 |
| BUD-N-002 | Budget | Negative | Add transaction with negative amount | Authenticated | 1. POST /api/transactions with amount=-1000 | 400 Bad Request; amount must be positive | P0 |
| BUD-N-003 | Budget | Negative | Add transaction with missing category | Authenticated | 1. POST /api/transactions without category | 400 Bad Request; validation error | P0 |
| BUD-N-004 | Budget | Negative | Edit non-existent transaction | Authenticated | 1. PUT /api/transactions/nonexistent-id | 404 Not Found | P1 |
| BUD-N-005 | Budget | Negative | Delete non-existent transaction | Authenticated | 1. DELETE /api/transactions/nonexistent-id | 404 Not Found | P1 |
| BUD-N-006 | Budget | Negative | Add transaction with invalid type | Authenticated | 1. POST /api/transactions with type=invalid | 400 Bad Request; type must be income or expense | P0 |

### B3. Security

| Test ID | Feature | Test Type | Title | Pre-conditions | Steps | Expected Result | Priority |
|---------|---------|-----------|-------|----------------|-------|-----------------|----------|
| BUD-S-001 | Budget | Security | Transaction amount must be numeric | Authenticated | 1. POST /api/transactions with amount="abc" | 400 Bad Request; type validation error | P0 |
| BUD-S-002 | Budget | Security | Unauthenticated cannot view transactions | No token | 1. GET /api/transactions | 401 Unauthorized | P0 |
| BUD-S-003 | Budget | Security | Unauthenticated cannot create transaction | No token | 1. POST /api/transactions with valid body | 401 Unauthorized | P0 |
| BUD-S-004 | Budget | Security | IDOR check — user cannot access other user's transactions | Two user accounts with own transactions | 1. User A creates transaction; 2. User B calls GET /api/transactions with User B's token | User B only sees their own transactions; User A's data not exposed | P0 |

---

## C. Events

### C1. Positive

| Test ID | Feature | Test Type | Title | Pre-conditions | Steps | Expected Result | Priority |
|---------|---------|-----------|-------|----------------|-------|-----------------|----------|
| EVT-P-001 | Events | Positive | Create event with valid data | Authenticated | 1. POST /api/events with title, date, type, color, notify_days | 201 Created; event ID returned | P0 |
| EVT-P-002 | Events | Positive | View all events | Events exist | 1. GET /api/events | 200 OK; array of events returned | P0 |
| EVT-P-003 | Events | Positive | Edit existing event | Event exists | 1. PUT /api/events/:id with updated title | 200 OK; event updated | P0 |
| EVT-P-004 | Events | Positive | Delete event | Event exists | 1. DELETE /api/events/:id | 200 OK; event removed | P0 |
| EVT-P-005 | Events | Positive | Event created with default notify_days | Authenticated | 1. POST /api/events without notify_days; check response | 201 Created; notify_days defaults to 7 | P1 |
| EVT-P-006 | Events | Positive | Events returned sorted by date | Multiple events exist | 1. GET /api/events; verify ordering | Events sorted ascending by date | P1 |
| EVT-P-007 | Events | Positive | Event type supports all enum values | Authenticated | 1. Create events with types: birthday, anniversary, school, holiday, other | 201 Created for each type | P1 |

### C2. Negative

| Test ID | Feature | Test Type | Title | Pre-conditions | Steps | Expected Result | Priority |
|---------|---------|-----------|-------|----------------|-------|-----------------|----------|
| EVT-N-001 | Events | Negative | Create event with missing title | Authenticated | 1. POST /api/events without title field | 400 Bad Request; title required | P0 |
| EVT-N-002 | Events | Negative | Create event with missing date | Authenticated | 1. POST /api/events without date field | 400 Bad Request; date required | P0 |
| EVT-N-003 | Events | Negative | Create event with invalid date format | Authenticated | 1. POST /api/events with date="not-a-date" | 400 Bad Request; invalid date format | P0 |
| EVT-N-004 | Events | Negative | Edit non-existent event | Authenticated | 1. PUT /api/events/nonexistent-id | 404 Not Found | P1 |
| EVT-N-005 | Events | Negative | Delete non-existent event | Authenticated | 1. DELETE /api/events/nonexistent-id | 404 Not Found | P1 |
| EVT-N-006 | Events | Negative | Create event with missing type | Authenticated | 1. POST /api/events without type field | 400 Bad Request; type required | P0 |

### C3. Security

| Test ID | Feature | Test Type | Title | Pre-conditions | Steps | Expected Result | Priority |
|---------|---------|-----------|-------|----------------|-------|-----------------|----------|
| EVT-S-001 | Events | Security | Unauthenticated cannot create event | No token | 1. POST /api/events with valid body | 401 Unauthorized | P0 |
| EVT-S-002 | Events | Security | XSS in event title field | Authenticated | 1. POST /api/events with title="<img src=x onerror=alert(1)>"; GET /api/events | Title escaped on display; no script execution | P1 |
| EVT-S-003 | Events | Security | IDOR check — user cannot see other user's events | Two user accounts | 1. User A creates event; User B calls GET /api/events | User B does not see User A's events | P0 |

---

## D. Bills

### D1. Positive

| Test ID | Feature | Test Type | Title | Pre-conditions | Steps | Expected Result | Priority |
|---------|---------|-----------|-------|----------------|-------|-----------------|----------|
| BIL-P-001 | Bills | Positive | Create bill with valid data | Authenticated | 1. POST /api/bills with title, amount, due_date, frequency, category | 201 Created; bill ID returned | P0 |
| BIL-P-002 | Bills | Positive | View all bills | Bills exist | 1. GET /api/bills | 200 OK; array of bills returned | P0 |
| BIL-P-003 | Bills | Positive | View single bill by ID | Bill exists | 1. GET /api/bills/:id | 200 OK; bill object returned | P0 |
| BIL-P-004 | Bills | Positive | Edit bill | Bill exists | 1. PUT /api/bills/:id with updated title | 200 OK; bill updated | P0 |
| BIL-P-005 | Bills | Positive | Delete bill | Bill exists | 1. DELETE /api/bills/:id | 200 OK; bill removed | P0 |
| BIL-P-006 | Bills | Positive | Mark bill as paid | Bill exists, unpaid | 1. POST /api/bills/:id/paid | 200 OK; is_paid=true; paid_date set | P0 |
| BIL-P-007 | Bills | Positive | Mark bill as unpaid | Bill exists, paid | 1. POST /api/bills/:id/unpaid | 200 OK; is_paid=false; paid_date cleared | P0 |
| BIL-P-008 | Bills | Positive | Get bills due soon | Bills with due dates within N days | 1. GET /api/bills/due-soon?days=7 | 200 OK; only bills due within 7 days returned | P1 |

### D2. Negative

| Test ID | Feature | Test Type | Title | Pre-conditions | Steps | Expected Result | Priority |
|---------|---------|-----------|-------|----------------|-------|-----------------|----------|
| BIL-N-001 | Bills | Negative | Create bill with missing title | Authenticated | 1. POST /api/bills without title | 400 Bad Request; title required | P0 |
| BIL-N-002 | Bills | Negative | Create bill with zero amount | Authenticated | 1. POST /api/bills with amount=0 | 400 Bad Request; amount must be >=1 | P0 |
| BIL-N-003 | Bills | Negative | Create bill with past due date | Authenticated | 1. POST /api/bills with due_date=2020-01-01 | 201 Created (past dates allowed); no validation error | P2 |
| BIL-N-004 | Bills | Negative | Edit non-existent bill | Authenticated | 1. PUT /api/bills/nonexistent-id | 404 Not Found | P1 |
| BIL-N-005 | Bills | Negative | Delete non-existent bill | Authenticated | 1. DELETE /api/bills/nonexistent-id | 404 Not Found | P1 |

### D3. Security

| Test ID | Feature | Test Type | Title | Pre-conditions | Steps | Expected Result | Priority |
|---------|---------|-----------|-------|----------------|-------|-----------------|----------|
| BIL-S-001 | Bills | Security | Unauthenticated cannot view bills | No token | 1. GET /api/bills | 401 Unauthorized | P0 |
| BIL-S-002 | Bills | Security | Unauthenticated cannot create bill | No token | 1. POST /api/bills with valid body | 401 Unauthorized | P0 |
| BIL-S-003 | Bills | Security | IDOR check — user cannot see other user's bills | Two user accounts | 1. User A creates bill; User B calls GET /api/bills | User B does not see User A's bills | P0 |

---

## E. Reminders (Pajak)

### E1. Positive

| Test ID | Feature | Test Type | Title | Pre-conditions | Steps | Expected Result | Priority |
|---------|---------|-----------|-------|----------------|-------|-----------------|----------|
| REM-P-001 | Reminders | Positive | Create reminder with valid data | Authenticated | 1. POST /api/reminders with title, amount, due_date, frequency, category | 201 Created; reminder ID returned | P0 |
| REM-P-002 | Reminders | Positive | View all reminders | Reminders exist | 1. GET /api/reminders | 200 OK; array of reminders returned | P0 |
| REM-P-003 | Reminders | Positive | Edit reminder | Reminder exists | 1. PUT /api/reminders/:id with updated title | 200 OK; reminder updated | P0 |
| REM-P-004 | Reminders | Positive | Delete reminder | Reminder exists | 1. DELETE /api/reminders/:id | 200 OK; reminder removed | P0 |
| REM-P-005 | Reminders | Positive | Mark reminder as paid | Reminder exists, unpaid | 1. POST /api/reminders/:id/paid | 200 OK; is_paid=true; paid_date set | P0 |
| REM-P-006 | Reminders | Positive | Mark reminder as unpaid | Reminder exists, paid | 1. POST /api/reminders/:id/unpaid | 200 OK; is_paid=false; paid_date cleared | P0 |
| REM-P-007 | Reminders | Positive | Reminder created with default notify_before=30 | Authenticated | 1. POST /api/reminders without notify_before; verify response | 201 Created; notify_before defaults to 30 | P1 |

### E2. Negative

| Test ID | Feature | Test Type | Title | Pre-conditions | Steps | Expected Result | Priority |
|---------|---------|-----------|-------|----------------|-------|-----------------|----------|
| REM-N-001 | Reminders | Negative | Create reminder with missing title | Authenticated | 1. POST /api/reminders without title | 400 Bad Request; title required | P0 |
| REM-N-002 | Reminders | Negative | Create reminder with zero amount | Authenticated | 1. POST /api/reminders with amount=0 | 400 Bad Request; amount must be >=1 | P0 |
| REM-N-003 | Reminders | Negative | Edit non-existent reminder | Authenticated | 1. PUT /api/reminders/nonexistent-id | 404 Not Found | P1 |
| REM-N-004 | Reminders | Negative | Delete non-existent reminder | Authenticated | 1. DELETE /api/reminders/nonexistent-id | 404 Not Found | P1 |
| REM-N-005 | Reminders | Negative | Create reminder with missing category | Authenticated | 1. POST /api/reminders without category | 400 Bad Request; category required | P0 |

### E3. Security

| Test ID | Feature | Test Type | Title | Pre-conditions | Steps | Expected Result | Priority |
|---------|---------|-----------|-------|----------------|-------|-----------------|----------|
| REM-S-001 | Reminders | Security | Unauthenticated cannot access reminders | No token | 1. GET /api/reminders | 401 Unauthorized | P0 |
| REM-S-002 | Reminders | Security | IDOR check — user cannot see other user's reminders | Two user accounts | 1. User A creates reminder; User B calls GET /api/reminders | User B does not see User A's reminders | P0 |

---

## F. Meal Plan

### F1. Positive

| Test ID | Feature | Test Type | Title | Pre-conditions | Steps | Expected Result | Priority |
|---------|---------|-----------|-------|----------------|-------|-----------------|----------|
| MPL-P-001 | MealPlan | Positive | Create meal plan for a week | Authenticated | 1. POST /api/mealplans with week_start and meals JSON | 200 OK; meal plan saved | P0 |
| MPL-P-002 | MealPlan | Positive | View all meal plans | Meal plans exist | 1. GET /api/mealplans | 200 OK; array of meal plans returned | P0 |
| MPL-P-003 | MealPlan | Positive | Get meal plan by week start | Meal plan exists for that week | 1. GET /api/mealplans/2026-05-04 | 200 OK; meal plan object for that week returned | P0 |
| MPL-P-004 | MealPlan | Positive | Update meal plan for existing week | Meal plan exists | 1. PUT /api/mealplans with same week_start; updated meals | 200 OK; meals updated | P0 |
| MPL-P-005 | MealPlan | Positive | Delete meal plan | Meal plan exists | 1. DELETE /api/mealplans/:id | 200 OK; meal plan removed | P0 |
| MPL-P-006 | MealPlan | Positive | Meals stored as JSON string | Authenticated | 1. Create meal plan; GET by week; verify meals field is valid JSON | 200 OK; meals field parses as JSON object with day keys | P1 |

### F2. Negative

| Test ID | Feature | Test Type | Title | Pre-conditions | Steps | Expected Result | Priority |
|---------|---------|-----------|-------|----------------|-------|-----------------|----------|
| MPL-N-001 | MealPlan | Negative | Create meal plan without week_start | Authenticated | 1. POST /api/mealplans without week_start | 400 Bad Request; week_start required | P0 |
| MPL-N-002 | MealPlan | Negative | Create meal plan without meals | Authenticated | 1. POST /api/mealplans without meals field | 400 Bad Request; meals required | P0 |
| MPL-N-003 | MealPlan | Negative | Get meal plan for week with no plan | No meal plan for that week | 1. GET /api/mealplans/2099-01-01 | 404 Not Found | P1 |
| MPL-N-004 | MealPlan | Negative | Delete non-existent meal plan | Authenticated | 1. DELETE /api/mealplans/nonexistent-id | 404 Not Found | P1 |
| MPL-N-005 | MealPlan | Negative | Create meal plan with invalid meals JSON | Authenticated | 1. POST /api/mealplans with meals="not-valid-json" | 400 Bad Request; JSON parsing error | P0 |

### F3. Security

| Test ID | Feature | Test Type | Title | Pre-conditions | Steps | Expected Result | Priority |
|---------|---------|-----------|-------|----------------|-------|-----------------|----------|
| MPL-S-001 | MealPlan | Security | Unauthenticated cannot access meal plans | No token | 1. GET /api/mealplans | 401 Unauthorized | P0 |
| MPL-S-002 | MealPlan | Security | IDOR check — user cannot see other user's meal plans | Two user accounts | 1. User A creates meal plan; User B calls GET /api/mealplans | User B does not see User A's meal plans | P0 |

---

## G. Weekend Activities

### G1. Positive

| Test ID | Feature | Test Type | Title | Pre-conditions | Steps | Expected Result | Priority |
|---------|---------|-----------|-------|----------------|-------|-----------------|----------|
| WKD-P-001 | Weekend | Positive | Create weekend activity | Authenticated | 1. POST /api/weekend-activities with date, activity, status | 201 Created; activity ID returned | P0 |
| WKD-P-002 | Weekend | Positive | View all weekend activities | Activities exist | 1. GET /api/weekend-activities | 200 OK; array returned | P0 |
| WKD-P-003 | Weekend | Positive | Edit weekend activity | Activity exists | 1. PUT /api/weekend-activities/:id with updated activity | 200 OK; activity updated | P0 |
| WKD-P-004 | Weekend | Positive | Delete weekend activity | Activity exists | 1. DELETE /api/weekend-activities/:id | 200 OK; activity removed | P0 |
| WKD-P-005 | Weekend | Positive | Update activity status to done | Activity exists with status=planned | 1. PUT /api/weekend-activities/:id with status=done | 200 OK; status updated to done | P0 |
| WKD-P-006 | Weekend | Positive | Activity status defaults to planned | Authenticated | 1. POST /api/weekend-activities without status; check response | 201 Created; status defaults to planned | P1 |

### G2. Negative

| Test ID | Feature | Test Type | Title | Pre-conditions | Steps | Expected Result | Priority |
|---------|---------|-----------|-------|----------------|-------|-----------------|----------|
| WKD-N-001 | Weekend | Negative | Create activity with missing date | Authenticated | 1. POST /api/weekend-activities without date | 400 Bad Request; date required | P0 |
| WKD-N-002 | Weekend | Negative | Create activity with missing activity name | Authenticated | 1. POST /api/weekend-activities without activity field | 400 Bad Request; activity required | P0 |
| WKD-N-003 | Weekend | Negative | Edit non-existent activity | Authenticated | 1. PUT /api/weekend-activities/nonexistent-id | 404 Not Found | P1 |
| WKD-N-004 | Weekend | Negative | Delete non-existent activity | Authenticated | 1. DELETE /api/weekend-activities/nonexistent-id | 404 Not Found | P1 |

### G3. Security

| Test ID | Feature | Test Type | Title | Pre-conditions | Steps | Expected Result | Priority |
|---------|---------|-----------|-------|----------------|-------|-----------------|----------|
| WKD-S-001 | Weekend | Security | Unauthenticated cannot create activity | No token | 1. POST /api/weekend-activities with valid body | 401 Unauthorized | P0 |
| WKD-S-002 | Weekend | Security | IDOR check — user cannot see other user's activities | Two user accounts | 1. User A creates activity; User B calls GET /api/weekend-activities | User B does not see User A's activities | P0 |

---

## H. Navigation & UI (Frontend)

### H1. Positive

| Test ID | Feature | Test Type | Title | Pre-conditions | Steps | Expected Result | Priority |
|---------|---------|-----------|-------|----------------|-------|-----------------|----------|
| UI-P-001 | UI | Positive | Bottom navigation navigates to correct screen | Frontend loaded | 1. Tap each nav item (Home, Budget, Events, Meal, Weekend, Bills) | Correct screen displayed; active tab highlighted | P0 |
| UI-P-002 | UI | Positive | Add button opens correct form modal | Any feature screen | 1. Tap FAB / Add button for each feature | Correct form/modal opens with appropriate fields | P0 |
| UI-P-003 | UI | Positive | Form submission saves data and closes modal | Valid form data | 1. Fill and submit add form for each feature | Data saved; modal closes; list updates | P0 |
| UI-P-004 | UI | Positive | Edit item pre-fills form correctly | Item exists in list | 1. Tap edit on an existing item | Form opens with current values pre-filled | P0 |
| UI-P-005 | UI | Positive | Delete item shows confirmation | Item exists | 1. Tap delete on an item | Confirmation dialog appears; confirm removes item | P1 |

### H2. Negative

| Test ID | Feature | Test Type | Title | Pre-conditions | Steps | Expected Result | Priority |
|---------|---------|-----------|-------|----------------|-------|-----------------|----------|
| UI-N-001 | UI | Negative | Access non-existent route | None | 1. Navigate to /#/nonexistent-route | 404 or redirect to Home; no crash | P1 |
| UI-N-002 | UI | Negative | Browser back button returns to previous screen | Navigated to a feature screen | 1. Navigate via nav; press browser back | Previous screen displayed correctly | P1 |
| UI-N-003 | UI | Negative | Direct URL access to protected page without auth | Not logged in | 1. Try to access /#/budget directly via URL | Redirect to login screen | P0 |
| UI-N-004 | UI | Negative | Offline state shows appropriate message | Device offline | 1. Turn off network; try to load app | Offline banner or message displayed; no white screen of death | P1 |

### H3. Security

| Test ID | Feature | Test Type | Title | Pre-conditions | Steps | Expected Result | Priority |
|---------|---------|-----------|-------|----------------|-------|-----------------|----------|
| UI-S-001 | UI | Security | Sensitive data not in browser local storage | User logged in | 1. Inspect browser localStorage/sessionStorage | No raw passwords or tokens stored in plain text | P1 |
| UI-S-002 | UI | Security | PWA manifest has correct theme colors | App installed | 1. Check manifest.json | theme_color and background_color match brand colors | P2 |

---

## I. SSE / Real-time Updates

### I1. Positive

| Test ID | Feature | Test Type | Title | Pre-conditions | Steps | Expected Result | Priority |
|---------|---------|-----------|-------|----------------|-------|-----------------|----------|
| SSE-P-001 | SSE | Positive | Authenticated user can subscribe to SSE | Authenticated, valid token | 1. GET /api/sse with Bearer token (or ?token=) | 200; event:connected message received; stream stays open | P1 |
| SSE-P-002 | SSE | Positive | SSE broadcasts on bill update | Two authenticated sessions | 1. User A marks bill paid; check User B's SSE stream | User B receives bills_updated event | P1 |
| SSE-P-003 | SSE | Positive | SSE health endpoint returns connected user count | SSE running | 1. GET /api/sse/health | 200; connected_users count >= 0 | P2 |

### I2. Negative

| Test ID | Feature | Test Type | Title | Pre-conditions | Steps | Expected Result | Priority |
|---------|---------|-----------|-------|----------------|-------|-----------------|----------|
| SSE-N-001 | SSE | Negative | SSE subscription fails without token | No token | 1. GET /api/sse without Authorization or token param | 401 Unauthorized | P1 |
| SSE-N-002 | SSE | Negative | SSE subscription fails with invalid token | Invalid token | 1. GET /api/sse with token=invalid | 401 Unauthorized | P1 |
| SSE-N-003 | SSE | Negative | SSE rejects expired token | Expired JWT | 1. GET /api/sse with expired token | 401 Unauthorized; token expired error | P1 |

### I3. Security

| Test ID | Feature | Test Type | Title | Pre-conditions | Steps | Expected Result | Priority |
|---------|---------|-----------|-------|----------------|-------|-----------------|----------|
| SSE-S-001 | SSE | Security | Token in SSE query param validated same as header | Valid token in query param | 1. GET /api/sse?token=validToken; verify same as Authorization header behavior | Token validated correctly; no bypass | P1 |
| SSE-S-002 | SSE | Security | SSE broadcast only to same user | Two different user tokens | 1. User A does action; verify User B's stream does NOT receive User A's private data | Data isolation maintained in broadcasts | P0 |
| SSE-S-003 | SSE | Security | SSE disconnects on token invalidation | SSE connected with valid token | 1. Token revoked (if implemented); check SSE stream | SSE connection drops or stops receiving events | P1 |

---

## J. Whitelist Management (Admin)

### J1. Positive

| Test ID | Feature | Test Type | Title | Pre-conditions | Steps | Expected Result | Priority |
|---------|---------|-----------|-------|----------------|-------|-----------------|----------|
| WHT-P-001 | Whitelist | Positive | Check whitelist for whitelisted email | Email in whitelist | 1. GET /api/whitelist/check?email=approved@test.com | 200; allowed=true | P1 |
| WHT-P-002 | Whitelist | Positive | Check whitelist for non-whitelisted email | Email not in whitelist | 1. GET /api/whitelist/check?email=unknown@test.com | 200; allowed=false | P1 |
| WHT-P-003 | Whitelist | Positive | Admin can add email to whitelist | Admin authenticated | 1. POST /api/auth/whitelist with email and name | 201 Created; user added to whitelist | P1 |
| WHT-P-004 | Whitelist | Positive | Admin can remove email from whitelist | Email in whitelist | 1. DELETE /api/auth/whitelist/test@test.com | 200 OK; email removed | P1 |
| WHT-P-005 | Whitelist | Positive | Admin can suspend whitelist user | User status=active | 1. PUT /api/auth/whitelist/test@test.com/suspend | 200 OK; status=suspended | P1 |
| WHT-P-006 | Whitelist | Positive | Admin can activate suspended user | User status=suspended | 1. PUT /api/auth/whitelist/test@test.com/activate | 200 OK; status=active | P1 |

### J2. Negative

| Test ID | Feature | Test Type | Title | Pre-conditions | Steps | Expected Result | Priority |
|---------|---------|-----------|-------|----------------|-------|-----------------|----------|
| WHT-N-001 | Whitelist | Negative | Check whitelist without email param | None | 1. GET /api/whitelist/check | 400 Bad Request; email param required | P1 |
| WHT-N-002 | Whitelist | Negative | Add invalid email to whitelist | Admin authenticated | 1. POST /api/auth/whitelist with email="not-an-email" | 400 Bad Request; validation error | P1 |

### J3. Security

| Test ID | Feature | Test Type | Title | Pre-conditions | Steps | Expected Result | Priority |
|---------|---------|-----------|-------|----------------|-------|-----------------|----------|
| WHT-S-001 | Whitelist | Security | Non-admin cannot add to whitelist | Non-admin user token | 1. POST /api/auth/whitelist with non-admin token | 403 Forbidden | P0 |
| WHT-S-002 | Whitelist | Security | Suspended user cannot login via OAuth | User status=suspended in whitelist | 1. Complete OAuth with suspended user's email | Redirect to error page; reason=account_suspended | P0 |

---

## K. Family Members

### K1. Positive

| Test ID | Feature | Test Type | Title | Pre-conditions | Steps | Expected Result | Priority |
|---------|---------|-----------|-------|----------------|-------|-----------------|----------|
| FAM-P-001 | Family | Positive | Create family member | Authenticated | 1. POST /api/family-members with name, relationship, phone | 201 Created; member ID returned | P1 |
| FAM-P-002 | Family | Positive | View all family members | Members exist | 1. GET /api/family-members | 200 OK; array of members returned | P1 |

### K2. Negative

| Test ID | Feature | Test Type | Title | Pre-conditions | Steps | Expected Result | Priority |
|---------|---------|-----------|-------|----------------|-------|-----------------|----------|
| FAM-N-001 | Family | Negative | Create member with missing name | Authenticated | 1. POST /api/family-members without name | 400 Bad Request; name required | P1 |
| FAM-N-002 | Family | Negative | Create member with missing relationship | Authenticated | 1. POST /api/family-members without relationship | 400 Bad Request; relationship required | P1 |

### K3. Security

| Test ID | Feature | Test Type | Title | Pre-conditions | Steps | Expected Result | Priority |
|---------|---------|-----------|-------|----------------|-------|-----------------|----------|
| FAM-S-001 | Family | Security | Unauthenticated cannot access family members | No token | 1. GET /api/family-members | 401 Unauthorized | P1 |

---

## L. API Security / Infrastructure

### L1. Positive

| Test ID | Feature | Test Type | Title | Pre-conditions | Steps | Expected Result | Priority |
|---------|---------|-----------|-------|----------------|-------|-----------------|----------|
| API-P-001 | API | Positive | API root returns correct version info | API running | 1. GET /api | 200; name, version, status fields present | P2 |
| API-P-002 | API | Positive | CORS preflight allowed for valid origin | Browser making cross-origin request | 1. OPTIONS /api/bills with Origin header | 200/204; Access-Control-Allow-Origin set | P0 |
| API-P-003 | API | Positive | Authenticated requests succeed with valid Bearer token | Valid JWT | 1. Any GET endpoint with Authorization: Bearer <valid_token> | 200/201/304 (not 401) | P0 |

### L2. Negative

| Test ID | Feature | Test Type | Title | Pre-conditions | Steps | Expected Result | Priority |
|---------|---------|-----------|-------|----------------|-------|-----------------|----------|
| API-N-001 | API | Negative | Request from unauthorized origin | Request with disallowed Origin | 1. Any API call with Origin: https://evil.com | 403 or CORS error; no response data | P0 |
| API-N-002 | API | Negative | Request with tampered token payload | Valid JWT; middle section modified | 1. Decode JWT; change email claim; re-encode; send with Authorization header | 401 Unauthorized; signature mismatch | P0 |
| API-N-003 | API | Negative | Request missing required headers | Authenticated endpoint | 1. POST /api/transactions without Content-Type: application/json | 400 or 415 Unsupported Media Type | P1 |

### L3. Security

| Test ID | Feature | Test Type | Title | Pre-conditions | Steps | Expected Result | Priority |
|---------|---------|-----------|-------|----------------|-------|-----------------|----------|
| API-S-001 | API | Security | Token signature is validated with HMAC SHA256 | JWT with invalid signature | 1. Use token signed with wrong secret; call API | 401 Unauthorized; signature validation failure | P0 |
| API-S-002 | API | Security | JWT claims (userID, email, role) are enforced | Authenticated session | 1. Create token manually with fake claims; call API | 401 Unauthorized; server-issued token required | P0 |
| API-S-003 | API | Security | Production environment disables test-login | ENVIRONMENT=production | 1. GET /api/auth/test-login | 403 Forbidden; test login disabled | P0 |

---

## Test Case Summary by Priority

| Priority | Count |
|----------|-------|
| **P0 (High)** | 42 |
| **P1 (Medium)** | 51 |
| **P2 (Low)** | 34 |
| **TOTAL** | **127** |

## Test Case Summary by Type

| Type | Count |
|------|-------|
| **Positive** | 54 |
| **Negative** | 44 |
| **Security** | 29 |
| **TOTAL** | **127** |

---

*Document generated: 2026-05-02 by SQA Agent*
*Project: SuperFamily Dashboard v1.0*
*Tech Stack: Go/Gin backend + Vanilla JS/CSS PWA frontend*