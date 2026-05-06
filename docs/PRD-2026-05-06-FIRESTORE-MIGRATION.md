# PRD: Migrasi SuperFamily Dashboard dari SQLite ke Firestore

**Tanggal:** 2026-05-06  
**Status:** Planned  
**Author:** SSE Agent (Subagent)

---

## 1. Gambaran Proyek

### Apa yang diubah?

Migrasi total dari SQLite (backend Go) ke Firebase Firestore untuk penyimpanan data aplikasi SuperFamily Dashboard. Backend Go tetap ada HANYA untuk OAuth callback dan whitelist verification. Semua CRUD data dipindahkan ke Firestore SDK yang diakses langsung dari frontend.

### Masalah yang Dihandle

- SQLite tidak bisa di-scale, hanya ada di server-side
- Need for offline-first capability dengan cloud sync
- Kompleksitas maintenance dual storage (IndexedDB lokal + SQLite backend)
- Data terfragmentasi:有些 data di Dexie (frontend local), 有些 di SQLite (backend)

### Tujuan Utama

1. **Single source of truth** — semua data di Firestore
2. **Simplified architecture** — frontend ↔ Firestore langsung, backend hanya untuk OAuth
3. **Real-time ready** — Firestore mendukung real-time listeners
4. **Offline-first** — Firebase SDK supports offline persistence

---

## 2. Scope

### Dalam Scope

- [ ] Hapus semua SQLite dependencies di backend Go
- [ ] Setup Firebase SDK di frontend
- [ ] Buat Firestore data layer (services/firestore.js)
- [ ] Migrate semua data models ke Firestore:
  - [ ] bills
  - [ ] reminders
  - [ ] events
  - [ ] transactions
  - [ ] budget
  - [ ] mealPlans
  - [ ] weekendActivities
- [ ] Update frontend API layer (src/api/*) untuk pakai Firestore SDK
- [ ] Hapus atau update backend handlers yang related ke SQLite
- [ ] Buat Firebase Security Rules
- [ ] Data migration script (SQLite → Firestore)
- [ ] Firebase Auth integration (already exists via Google OAuth)

### Di Luar Scope

- Backend full removal (OAuth callback masih perlu backend)
- Multi-user/family sharing (future feature)
- Complex real-time collaboration features
- Cloud Functions untuk server-side logic

---

## 3. Tech Stack Target

| Layer | Technology |
|-------|------------|
| **Frontend** | Vanilla JS + Firebase SDK 10.x (modular) |
| **Backend** | Go + Firebase Admin SDK (OAuth only) |
| **Database** | Firebase Firestore |
| **Auth** | Firebase Auth (Google OAuth) |
| **Hosting** | Cloud Run (backend), Firebase Hosting (frontend) |

### Firebase Collections Structure

```
users/{userId}
  - email, name, role, createdAt

bills/{billId}
  - title, amount, dueDate, frequency, category
  - isPaid, paidDate, paidBy, notifyBefore
  - note, createdBy, createdAt, updatedAt

reminders/{reminderId}
  - title, amount, dueDate, frequency, category
  - isPaid, paidDate, paidBy, notifyBefore
  - note, createdBy, createdAt, updatedAt

events/{eventId}
  - title, date, type, color, notifyDays
  - note, createdBy, createdAt, updatedAt

transactions/{transactionId}
  - amount, category, date, type, status
  - note, createdBy, createdAt, updatedAt

budgets/{month}  // document ID = YYYY-MM
  - amount, updatedAt

mealPlans/{planId}
  - weekStart, meals (JSON string), createdBy
  - createdAt, updatedAt

weekendActivities/{activityId}
  - date, activities (array), createdBy
  - createdAt, updatedAt
```

---

## 4. Data Models Mapping

### bills (Firestore)

```js
{
  id: string,           // Firestore auto-ID
  title: string,
  amount: number,
  dueDate: string,      // YYYY-MM-DD
  frequency: string,    // monthly|yearly|one-time
  category: string,
  isPaid: boolean,
  paidDate: string|null,
  paidBy: string|null,
  notifyBefore: number,
  note: string|null,
  createdBy: string,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### reminders (Firestore)

```js
{
  id: string,
  title: string,
  amount: number,
  dueDate: string,
  frequency: string,
  category: string,
  isPaid: boolean,
  paidDate: string|null,
  paidBy: string|null,
  notifyBefore: number,
  note: string|null,
  createdBy: string,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### events (Firestore)

```js
{
  id: string,
  title: string,
  date: string,         // YYYY-MM-DD
  type: string,         // birthday|anniversary|school|holiday|other
  color: string|null,
  notifyDays: number,
  note: string|null,
  createdBy: string,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### transactions (Firestore)

```js
{
  id: string,
  amount: number,
  category: string,
  date: string,         // YYYY-MM-DD
  type: string,         // income|expense
  status: string,        // done|pending
  note: string|null,
  createdBy: string,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### budgets (Firestore)

```js
{
  id: string,           // YYYY-MM (month)
  amount: number,
  updatedAt: timestamp
}
```

### mealPlans (Firestore)

```js
{
  id: string,
  weekStart: string,   // YYYY-MM-DD (Monday)
  meals: string,        // JSON string of meals object
  createdBy: string,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### weekendActivities (Firestore)

```js
{
  id: string,
  date: string,        // YYYY-MM-DD
  activities: [
    {
      id: string,
      title: string,
      category: string, // outdoor|indoor|education|family
      location: string,
      status: string,   // pending|done
      completedAt: timestamp|null
    }
  ],
  createdBy: string,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

---

## 5. Migration Steps

### Phase 1: Setup & Configuration

1. Buat `src/firebase.js` — Firebase app initialization
2. Buat `src/services/firestore-service.js` — Firestore CRUD operations
3. Update `package.json` — add Firebase SDK dependencies
4. Setup Firebase Security Rules

### Phase 2: Backend Cleanup

1. Hapus `backend/repositories/repository.go` (SQLite operations)
2. Hapus `backend/handlers/bills.go`, `reminders.go`, `events.go`, `transactions.go`
3. Keep `backend/handlers/auth.go` (local auth - needed for JWT generation on OAuth callback)
4. Keep `backend/handlers/whitelist.go` (Firebase whitelist check - already using Firestore)
5. Keep `backend/handlers/oauth.go` (Google OAuth flow)
6. Update `backend/services/service.go` — hapus SQLite-based data operations

### Phase 3: Frontend Migration

1. Hapus `src/db.js` (Dexie/IndexedDB) atau strip down ke cache only
2. Buat `src/firebase.js` — Firebase initialization
3. Buat `src/services/firestore.js` — semua Firestore operations
4. Update `src/api/bills.js`, `reminders.js`, etc. — pake Firestore SDK
5. Update `src/api/auth.js` — Firebase Auth
6. Update `src/api/client.js` — hapus JWT token logic, pake Firebase Auth

### Phase 4: Data Migration

1. Buat `scripts/migrate-sqlite-to-firestore.js`
2. Export semua data dari SQLite
3. Import ke Firestore
4. Verify data integrity

### Phase 5: Testing & Deployment

1. Full regression test
2. Deploy backend (OAuth-only version)
3. Deploy frontend ke Firebase Hosting
4. Verify production

---

## 6. API Changes

### Before (Backend REST API)
```
GET/POST/PUT/DELETE /api/bills
GET/POST/PUT/DELETE /api/reminders
GET/POST/PUT/DELETE /api/events
GET/POST/PUT/DELETE /api/transactions
GET/POST /api/budget
```

### After (Firestore SDK calls from frontend)
```js
// bills
import { getBills, addBill, updateBill, deleteBill } from '../services/firestore.js'
const bills = await getBills()
await addBill({ title: 'PDAM', amount: 150000, ... })
```

---

## 7. Security Rules (Firestore)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // User can only read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    match /bills/{billId} {
      allow read, write: if request.auth != null;
    }
    
    match /reminders/{reminderId} {
      allow read, write: if request.auth != null;
    }
    
    match /events/{eventId} {
      allow read, write: if request.auth != null;
    }
    
    match /transactions/{transactionId} {
      allow read, write: if request.auth != null;
    }
    
    match /budgets/{month} {
      allow read, write: if request.auth != null;
    }
    
    match /mealPlans/{planId} {
      allow read, write: if request.auth != null;
    }
    
    match /weekendActivities/{activityId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

---

## 8. Files to Delete/Modify

### Delete
- `backend/repositories/repository.go` — SQLite operations
- `backend/handlers/bills.go` — SQLite-based
- `backend/handlers/reminders.go` — SQLite-based
- `backend/handlers/events.go` — SQLite-based
- `backend/handlers/transactions.go` — SQLite-based
- `backend/services/service.go` — SQLite-based data operations
- `src/db.js` — Dexie/IndexedDB (or strip to minimal)

### Modify
- `backend/main.go` — remove SQLite init, keep Firebase init
- `src/api/client.js` — simplify, Firebase Auth only
- `src/main.js` — update auth checks
- `src/screens/*.js` — update to use Firestore service

### Create
- `src/firebase.js` — Firebase app init
- `src/services/firestore.js` — Firestore CRUD operations
- `scripts/migrate-sqlite-to-firestore.js` — data migration
- `firestore.rules` — security rules
- `firestore.indexes.json` — Firestore indexes

---

## 9. Rollback Plan

If migration fails:
1. Revert frontend changes to use old API client
2. Keep backend with SQLite operational
3. Investigate issues without impacting users

---

## 10. Success Criteria

- [ ] All CRUD operations work via Firestore SDK
- [ ] Data persists correctly in Firestore
- [ ] Auth flow works (Google OAuth → Firebase Auth)
- [ ] No SQLite dependencies remain
- [ ] All 6 features (bills, reminders, events, transactions, mealPlans, weekendActivities) functional
- [ ] Full regression test pass
- [ ] Production deployment successful
