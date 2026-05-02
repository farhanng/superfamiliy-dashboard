# SuperFamily Dashboard - Code Cleanup & Restructuring Plan

**Project:** SuperFamily Dashboard
**Date:** 2026-04-28
**Author:** Software Engineer Subagent
**Based on:** docs/ARCHITECTURE_V2.md (Solution Architect)

---

## 1. Current State Analysis

### 1.1 Directory Structure
```
src/
├── components/         # EMPTY - no shared components
├── data/
│   ├── holidays-id.js  # 88 lines
│   └── sample-menus.js # 238 lines
├── screens/
│   ├── bills.js        # 555 lines - MIXED bills + reminders
│   ├── budget.js       # 261 lines
│   ├── events.js      # 326 lines
│   ├── home.js        # 241 lines
│   ├── mealplan.js    # 337 lines
│   └── weekend.js     # 343 lines
├── db.js              # 333 lines - ALL Dexie operations
├── i18n.js            # 428 lines - Translations
├── main.js            # 186 lines - App shell
├── router.js          # 41 lines - Hash router
├── app.js             # 13 lines - Minimal entry
└── styles.css
```

### 1.2 Code Statistics
| File | Lines | Issue |
|------|-------|-------|
| bills.js | 555 | **Too large** - bills + reminders combined |
| i18n.js | 428 | Large but reasonable - translations |
| db.js | 333 | Growing concern - all DB operations |
| events.js | 326 | Acceptable but close to limit |
| weekend.js | 343 | Acceptable but close to limit |
| mealplan.js | 337 | Acceptable but close to limit |
| budget.js | 261 | Acceptable |
| home.js | 241 | Acceptable |

### 1.3 Code Smells Identified

#### Critical
1. **Monolithic bills.js** - 555 lines handling 2 distinct entities (bills + reminders) with mixed UI
2. **No component reuse** - `components/` dir exists but is empty. Repeated patterns across screens (modals, cards, tabs)
3. **No API layer** - Direct Dexie calls everywhere. No abstraction for v2 backend migration
4. **No type safety** - Plain JS objects, no TypeScript, no JSDoc types

#### Major
5. **Flat folder structure** - screens/ contains 6 files doing multiple duties
6. **No service layer** - db.js is a flat export file, not organized services
7. **No shared utilities** - formatCurrency, formatDate, showModal, showToast duplicated/confined
8. **No form validation** - User input validation scattered/inconsistent
9. **No error boundaries** - Unhandled async errors will crash app

#### Minor
10. **No ESLint/Prettier** - inconsistent formatting
11. **Hardcoded categories** - scattered across screens (BILL_CATEGORIES, etc.)
12. **No constants file** - Magic strings/numbers in code
13. **weekend.js.bak** - orphaned backup file in screens/
14. **seed-bills.js/html** - debug files in project root

---

## 2. Recommended Restructuring

### 2.1 New Folder Structure (Target v2)

```
src/
├── api/                    # NEW: API client layer (v2 backend)
│   ├── client.js          # Fetch wrapper, interceptors, error handling
│   ├── endpoints/         # API endpoint groups
│   │   ├── auth.js
│   │   ├── bills.js
│   │   ├── events.js
│   │   ├── transactions.js
│   │   ├── mealPlans.js
│   │   └── weekendActivities.js
│   └── sync.js            # SSE + sync logic
│
├── components/            # EXISTING but EMPTY - FILL THESE
│   ├── ui/               # Reusable UI primitives
│   │   ├── Card.js
│   │   ├── Modal.js
│   │   ├── Tabs.js
│   │   ├── Button.js
│   │   ├── Input.js
│   │   ├── Select.js
│   │   ├── Badge.js
│   │   ├── EmptyState.js
│   │   └── Toast.js
│   ├── forms/            # Form components
│   │   ├── BillForm.js
│   │   ├── ReminderForm.js
│   │   ├── EventForm.js
│   │   ├── TransactionForm.js
│   │   └── MealPlanForm.js
│   └── layout/           # Layout components
│       ├── AppShell.js
│       ├── Header.js
│       ├── BottomNav.js
│       └── FAB.js
│
├── db/                    # REFACTOR: Split from monolithic db.js
│   ├── index.js          # Dexie instance
│   ├── schemas/          # Schema definitions
│   │   ├── transactions.js
│   │   ├── events.js
│   │   ├── bills.js
│   │   ├── reminders.js
│   │   ├── mealPlans.js
│   │   └── weekendActivities.js
│   ├── sync.js           # Sync adapter (Dexie <-> API)
│   └── utils.js          # DB helpers
│
├── services/              # NEW: Business logic layer
│   ├── billsService.js
│   ├── remindersService.js
│   ├── eventsService.js
│   ├── budgetService.js
│   ├── mealPlanService.js
│   └── weekendService.js
│
├── screens/               # REFACTOR: Simplify, delegate to components
│   ├── HomeScreen.js
│   ├── BudgetScreen.js
│   ├── EventsScreen.js
│   ├── MealPlanScreen.js
│   ├── WeekendScreen.js
│   ├── BillsScreen.js    # Bills only (extract reminders)
│   ├── RemindersScreen.js # NEW: Separate Reminders screen
│   └── index.js          # Screen registry
│
├── store/                # NEW: State management (simple reactive store)
│   ├── index.js
│   └── slices/
│       ├── billsSlice.js
│       ├── eventsSlice.js
│       └── ...
│
├── i18n/                 # REFACTOR: Move translations
│   ├── index.js
│   └── locales/
│       ├── id.js
│       └── en.js
│
├── utils/                # NEW: Shared utilities
│   ├── formatters.js     # formatCurrency, formatDate, etc.
│   ├── validators.js     # Form validation helpers
│   ├── dateHelpers.js    # Date utilities
│   └── constants.js      # Categories, frequencies, etc.
│
├── hooks/                # NEW: Custom React-like hooks
│   ├── useOnline.js
│   ├── useSync.js
│   └── useToast.js
│
├── router.js             # Keep as-is (minimal changes)
├── main.js               # Keep as-is (app shell)
├── app.js                # Keep as-is (minimal entry)
└── styles.css            # Keep as-is (Tailwind)
```

### 2.2 Key Changes Explained

**Layered Architecture:**
```
UI Components → Screens → Services → API/DB
```

**Why this structure:**
1. **components/ui/** - DRY UI primitives (Card, Modal, Button)
2. **components/forms/** - DRY form components (BillForm reused in add/edit)
3. **db/schemas/** - Organized Dexie schema, not one giant file
4. **services/** - Business logic separated from UI
5. **api/** - Backend integration layer (v2 migration path)
6. **store/** - Simple reactive state (no Redux needed for this scale)
7. **utils/** - Shared helpers, formatters, validators
8. **hooks/** - Custom hooks for common patterns

---

## 3. Tech Debt to Address

| Priority | Item | Effort | Risk |
|----------|------|--------|------|
| HIGH | Split bills.js (bills + reminders) | 2h | Low |
| HIGH | Create shared UI components | 4h | Low |
| HIGH | Add API client abstraction | 8h | Medium |
| HIGH | Add form validation | 4h | Low |
| MEDIUM | Setup ESLint + Prettier | 2h | Low |
| MEDIUM | Add error boundaries | 2h | Low |
| MEDIUM | TypeScript migration (optional) | 16h | High |
| LOW | Move i18n to separate locale files | 2h | Low |
| LOW | Create constants.js | 1h | Low |
| LOW | Remove .bak and seed files | 5min | None |
| LOW | Add JSDoc types | 4h | Low |

---

## 4. Migration Steps (Maintain Working State)

### Phase 0: Pre-flight (Day 0)
- [ ] Add ESLint + Prettier with `npm add -D eslint prettier`
- [ ] Create `.eslintrc.cjs` and `.prettierrc`
- [ ] Run linting, fix critical errors
- [ ] Create `jsconfig.json` for path aliases

### Phase 1: Foundation (Day 1)
- [ ] Create `src/utils/constants.js` - Extract all magic strings
- [ ] Create `src/utils/formatters.js` - Move formatCurrency, formatDate
- [ ] Create `src/hooks/useToast.js` - Toast notification hook
- [ ] Remove `weekend.js.bak` and debug seed files

### Phase 2: Shared Components (Day 1-2)
- [ ] Create `src/components/ui/Card.js`
- [ ] Create `src/components/ui/Modal.js`
- [ ] Create `src/components/ui/EmptyState.js`
- [ ] Create `src/components/ui/Badge.js`
- [ ] Create `src/components/ui/Tabs.js`
- [ ] Update screens to use shared components

### Phase 3: Services Layer (Day 2)
- [ ] Create `src/services/billsService.js`
- [ ] Create `src/services/remindersService.js`
- [ ] Create `src/services/eventsService.js`
- [ ] Create `src/services/budgetService.js`
- [ ] Update db.js to delegate to services

### Phase 4: DB Refactor (Day 2-3)
- [ ] Create `src/db/schemas/transactions.js`
- [ ] Create `src/db/schemas/bills.js`
- [ ] Create `src/db/schemas/events.js`
- [ ] Restructure db.js to import from schemas
- [ ] Add error handling wrapper

### Phase 5: Screens Cleanup (Day 3-4)
- [ ] Split bills.js into BillsScreen.js + RemindersScreen.js
- [ ] Simplify each screen - delegate to components
- [ ] Extract repeated modal patterns to components/forms/

### Phase 6: API Layer (Day 4-5) - v2 Backend Prep
- [ ] Create `src/api/client.js` - Base fetch wrapper
- [ ] Create `src/api/endpoints/auth.js`
- [ ] Create `src/api/endpoints/bills.js`
- [ ] Add sync adapter (Dexie <-> API)
- [ ] Add SSE subscription logic

### Phase 7: Polish (Day 5)
- [ ] Add error boundaries
- [ ] Add form validation
- [ ] Final lint pass
- [ ] Test all screens work

---

## 5. ESLint + Prettier Configuration

### .eslintrc.cjs
```javascript
module.exports = {
  root: true,
  env: { browser: true, es2022: true },
  extends: ['eslint:recommended'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  rules: {
    'no-unused-vars': 'warn',
    'no-console': 'off', // Allow console for now
  }
}
```

### .prettierrc
```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100
}
```

---

## 6. Integration with ARCHITECTURE_V2.md

### 6.1 Backend API Alignment

The refactored frontend should map to these v2 backend endpoints:

| Entity | Frontend Service | API Endpoint |
|--------|-----------------|--------------|
| Bills | billsService.js | GET/POST/PUT/DELETE /api/bills |
| Reminders | remindersService.js | GET/POST/PUT/DELETE /api/reminders |
| Events | eventsService.js | GET/POST/PUT/DELETE /api/events |
| Transactions | budgetService.js | GET/POST/PUT/DELETE /api/transactions |
| Meal Plans | mealPlanService.js | GET/POST/PUT/DELETE /api/meal-plans |
| Weekend Activities | weekendService.js | GET/POST/PUT/DELETE /api/weekend-activities |

### 6.2 Sync Strategy

The `db/sync.js` layer should handle:
1. **Offline-first** - All reads from Dexie, writes queue locally
2. **Sync on reconnect** - Push local changes, pull remote changes
3. **Conflict resolution** - Last-write-wins (as specified in ARCHITECTURE_V2.md)
4. **SSE subscription** - Subscribe to `/api/events/subscribe` for real-time updates

### 6.3 Auth Integration

The `api/client.js` should:
1. Attach JWT from cookie/localStorage to all requests
2. Handle 401 by redirecting to login
3. Support magic link flow

---

## 7. File Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `BillForm.js`, `Card.js` |
| Services | camelCase + Service suffix | `billsService.js` |
| Hooks | camelCase + use prefix | `useOnline.js` |
| Utils | camelCase (noun) | `formatters.js`, `constants.js` |
| API modules | camelCase | `client.js`, `sync.js` |
| Schemas | camelCase (noun) | `bills.js`, `events.js` |
| Screens | PascalCase + Screen suffix | `BillsScreen.js` |

---

## 8. Import/Export Patterns

### Recommended pattern:
```javascript
// Named exports for functions
export function formatCurrency(amount) { ... }
export function formatDate(dateStr) { ... }

// Default export for classes/components
export default Card { ... }

// Barrel exports (index.js)
export { formatCurrency, formatDate } from './formatters.js'
export { Card, Modal } from './ui/index.js'
```

### Avoid:
- `export *` from screens (they export render functions)
- Default function exports (less explicit)

---

## 9. Priority Order

1. **Foundation** (utils, constants, formatters)
2. **Shared Components** (ui primitives)
3. **Services Layer** (business logic)
4. **DB Refactor** (schema organization)
5. **Screen Cleanup** (simplify, delegate)
6. **API Layer** (backend integration)
7. **Polish** (validation, error handling)

**Total estimated effort:** 5-7 days of focused work

---

## 10. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Breaking existing functionality | Medium | High | Work in branches, test each phase |
| Scope creep | High | Medium | Stick to plan, defer optional items |
| V2 backend not ready | High | Medium | Build API layer but keep Dexie as primary |
| TypeScript migration too ambitious | Medium | Medium | Start with JSDoc, upgrade incrementally |

---

## 11. Success Criteria

- [ ] All 6 screens render without errors
- [ ] Bills CRUD works (add, edit, delete, mark paid)
- [ ] Reminders CRUD works
- [ ] Events CRUD works
- [ ] Transactions CRUD works
- [ ] PWA still works (offline mode)
- [ ] No console errors (Error level)
- [ ] ESLint passes (warnings allowed)
- [ ] Code is organized into defined folder structure
