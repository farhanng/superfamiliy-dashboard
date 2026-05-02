# Firebase Firestore Architecture Plan — SuperFamily Dashboard

**Author:** ViercasAI (Subagent)
**Date:** 2026-04-30
**Status:** Draft — Ready for Review

---

## Table of Contents

1. [Go + Firebase Compatibility](#1-go--firebase-compatibility)
2. [Firestore Data Model](#2-firestore-data-model)
3. [Architecture Design](#3-architecture-design)
4. [Migration Plan (SQLite → Firestore)](#4-migration-plan-sqlite--firestore)
5. [Deployment Steps](#5-deployment-steps)
6. [Cost Estimation](#6-cost-estimation)
7. [Pros/Cons vs Cloud Run + Cloud SQL](#7-proscons-vs-cloud-run--cloud-sql)

---

## 1. Go + Firebase Compatibility

### Recommended Approach: Firebase Admin Go SDK

The best way for a Go backend to interact with Firestore is the **official Firebase Admin Go SDK** (`firebase.google.com/go/v4`).

```go
import (
    "firebase.google.com/go/v4"
    "firebase.google.com/go/v4/auth"
    "firebase.google.com/go/v4/firestore"
    "google.golang.org/api/option"
)
```

**Setup:**

```go
opt := option.WithCredentialsFile("path/to/serviceAccountKey.json")
app, err := firebase.NewApp(context.Background(), nil, opt)
if err != nil {
    log.Fatalf("firebase.NewApp: %v", err)
}

client, err := app.Firestore(ctx)
defer client.Close()
```

### Status: Stable ✅

- Firebase Admin Go SDK is **officially supported** by Google
- Covers: Firestore, Auth, Storage, Notifications
- Works natively on Cloud Run (just bundle the service account JSON)
- No need for REST API workaround — the SDK handles everything
- Supports real-time listeners via `client.Collection().Snapshots(ctx)`

### Alternative: Firestore REST API

If the Admin SDK has issues, Firestore also exposes a **REST API**:

```
POST https://firestore.googleapis.com/v1/projects/{project}/databases/(default)/documents/{collection}
```

However, this is more verbose and requires manual pagination handling. **Use the Admin SDK.**

### Dependencies to Add to `go.mod`

```go
require (
    firebase.google.com/go/v4 v4.14.0
    google.golang.org/api v0.171.0
)
```

### Changes to Current Backend Structure

| Current (SQLite) | Target (Firestore) |
|---|---|
| `database/sql` + `github.com/mattn/go-sqlite3` | `firebase.google.com/go/v4` |
| Repository layer queries raw SQL | Repository layer calls Firestore SDK |
| `db.Exec` / `db.Query` | `client.Collection().Doc().Set()` / `.Get()` |
| No service account needed | Service account JSON for Cloud Run |

---

## 2. Firestore Data Model

### Design Philosophy

Firestore is a NoSQL document database. Key rules:
- **Denormalize for read efficiency** — duplicate data to avoid joins
- **Collection per entity type**, document per record
- **Subcollections** for nested data that belongs to a parent
- Use **document IDs** matching current UUID strings for easy migration

### Firestore Structure

```
firestore(/)
├── users/                          # Collection
│   └── {userId}/                  # Document (e.g. "uuid-123")
│       ├── id: "uuid-123"
│       ├── email: "farhan@..."
│       ├── name: "Farhan"
│       ├── role: "admin"
│       ├── provider: "google"
│       ├── created_at: Timestamp
│       ├── bills/                 # Subcollection
│       │   └── {billId}/
│       ├── reminders/            # Subcollection
│       │   └── {reminderId}/
│       ├── events/               # Subcollection
│       │   └── {eventId}/
│       ├── transactions/         # Subcollection
│       │   └── {transactionId}/
│       └── mealPlans/           # Subcollection
│           └── {mealPlanId}/
│
├── bills/                         # Top-level collection (for cross-user queries)
│   └── {billId}/
│       ├── id: "bill-uuid"
│       ├── title: "Listrik"
│       ├── amount: 350000
│       ├── dueDate: "2026-05-10"
│       ├── frequency: "monthly"
│       ├── category: "listrik"
│       ├── isPaid: false
│       ├── paidDate: null
│       ├── paidBy: null
│       ├── notifyBefore: 2
│       ├── notifiedAt: null
│       ├── note: "..." (nullable → stored as empty string)
│       ├── createdBy: "user-uuid"
│       ├── createdAt: Timestamp
│       └── updatedAt: Timestamp
│
├── reminders/                    # Top-level collection
│   └── {reminderId}/
│       └── (same fields as bills, different category set)
│
├── events/                       # Top-level collection
│   └── {eventId}/
│       ├── id: "event-uuid"
│       ├── title: "Ulang Tahun Zaidan"
│       ├── date: "2026-05-15"
│       ├── type: "birthday"
│       ├── color: "#FF5733"
│       ├── notifyDays: 7
│       ├── note: "..."
│       ├── createdBy: "user-uuid"
│       ├── createdAt: Timestamp
│       └── updatedAt: Timestamp
│
├── transactions/               # Top-level collection
│   └── {transactionId}/
│       ├── id: "txn-uuid"
│       ├── amount: 150000
│       ├── category: "makanan"
│       ├── date: "2026-04-30"
│       ├── type: "expense"
│       ├── status: "done"
│       ├── note: "..."
│       ├── createdBy: "user-uuid"
│       ├── createdAt: Timestamp
│       └── updatedAt: Timestamp
│
├── budgets/                     # Top-level collection (doc ID = YYYY-MM)
│   └── "2026-05"/
│       ├── id: "2026-05"
│       ├── month: "2026-05"
│       ├── amount: 5000000
│       └── updatedAt: Timestamp
│
├── mealPlans/                  # Top-level collection
│   └── {mealPlanId}/
│       ├── id: "mp-uuid"
│       ├── weekStart: "2026-05-04"
│       ├── meals: "{...JSON string...}"
│       ├── createdBy: "user-uuid"
│       ├── createdAt: Timestamp
│       └── updatedAt: Timestamp
│
├── weekendActivities/          # Top-level collection
│   └── {activityId}/
│       ├── id: "wa-uuid"
│       ├── date: "2026-05-03"
│       ├── activity: "Piknik ke Ancol"
│       ├── status: "planned"
│       ├── createdBy: "user-uuid"
│       ├── createdAt: Timestamp
│       └── updatedAt: Timestamp
│
├── familyMembers/              # Top-level collection
│   └── {memberId}/
│       ├── id: "fm-uuid"
│       ├── name: "Zaidan"
│       ├── relationship: "son"
│       ├── phone: "+6285710853686"
│       └── createdAt: Timestamp
│
├── whitelistUsers/              # Top-level collection
│   └── {whitelistId}/
│       ├── id: "wl-uuid"
│       ├── email: "farhan@gmail.com"
│       ├── name: "Farhan"
│       ├── status: "active"       # active | suspended | pending
│       ├── createdBy: "user-uuid"
│       ├── createdAt: Timestamp
│       └── updatedAt: Timestamp
│
└── userAccounts/                # Top-level collection (links local → Google)
    └── {accountId}/
        ├── id: "ua-uuid"
        ├── userId: "user-uuid"
        ├── googleEmail: "farhan@gmail.com"
        ├── googleUserId: "google-uid-123"
        ├── googleName: "Farhan"
        └── linkedAt: Timestamp
```

### SQLite → Firestore Field Mapping

| SQLite Column | Firestore Field | Notes |
|---|---|---|
| `id TEXT PRIMARY KEY` | `id: string` | Keep same UUID |
| `created_at DATETIME` | `createdAt: Timestamp` | Server-side timestamp |
| `updated_at DATETIME` | `updatedAt: Timestamp` | Auto-updated on write |
| `is_paid INTEGER DEFAULT 0` | `isPaid: bool` | Convert 0/1 → false/true |
| `paid_date DATE` | `paidDate: string \| null` | Store as ISO string |
| `note TEXT` (nullable) | `note: string \| null` | Empty string if nil |
| `FOREIGN KEY (paid_by)` | `paidBy: string \| null` | Store user ID directly |

### Firestore Indexes to Create

Create these composite indexes in Firebase Console for query performance:

```
# For bills queries
bills: dueDate ASC, isPaid ASC
bills: createdBy ASC, dueDate DESC
bills: category ASC, isPaid ASC

# For transactions queries
transactions: date DESC, createdAt DESC
transactions: createdBy ASC, date DESC
transactions: category ASC, date DESC

# For events queries
events: date ASC
events: date DESC, notifyDays DESC

# For reminders queries
reminders: dueDate ASC, isPaid ASC
```

---

## 3. Architecture Design

### Overall Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        USERS (Farhan + Inne)                     │
│                  Mobile Browser / Desktop Browser                │
└─────────────────────────────┬───────────────────────────────────┘
                              │ HTTPS
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     FIREBASE HOSTING                            │
│              Static PWA (index.html + assets)                   │
│              URL: superfamily-app.web.app                       │
│              or custom domain: app.superfamily.id              │
└─────────────────────────────┬───────────────────────────────────┘
                              │ API calls (HTTPS JSON)
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                   CLOUD RUN (Go Backend)                         │
│  Region: asia-southeast1 (Jakarta)                              │
│  Scaling: 0 → N instances (min 0, pay per use)                 │
│  URL: https://superfamily-backend-xxx-asia-southeast1.run.app  │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Go Process                                              │   │
│  │  • Gin HTTP server (REST API)                           │   │
│  │  • Firebase Admin SDK (Firestore reads/writes)           │   │
│  │  • Google OAuth 2.0 (golang.org/x/oauth2)                │   │
│  │  • JWT generation (golang-jwt/jwt)                       │   │
│  │  • SSE (real-time push to connected browsers)            │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────┬───────────────────────────────────┘
                              │ Firestore API (internal, Google network)
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    GOOGLE CLOUD PLATFORM                         │
│  ┌──────────────────────┐    ┌────────────────────────────┐    │
│  │   Cloud Run           │    │   Firestore                │    │
│  │   (Backend Host)      │    │   (Database)               │    │
│  │   asia-southeast1     │    │   Native mode              │    │
│  └──────────────────────┘    │   asia-southeast1          │    │
│                               └────────────────────────────┘    │
│  ┌──────────────────────┐    ┌────────────────────────────┐    │
│  │   Firebase Hosting    │    │   Google OAuth 2.0         │    │
│  │   (Static files)      │    │   (Authentication)         │    │
│  └──────────────────────┘    └────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

### Auth Flow (Google OAuth)

```
1. User clicks "Login with Google" on frontend
2. Frontend → Backend: GET /api/auth/google
3. Backend → Google: Redirect to Google OAuth consent screen
   Query params: client_id, redirect_uri, response_type=code, scope=openid email profile
4. User approves → Google → Backend: GET /api/auth/google/callback?code=XXX
5. Backend → Google Token Endpoint: Exchange code for tokens
6. Backend → Google Userinfo: Get user's email + name
7. Backend checks whitelistUsers collection in Firestore:
   - If email IS in whitelist → proceed
   - If email NOT in whitelist → return 403 "Not authorized"
8. Backend checks userAccounts collection:
   - If Google email already linked → get existing user
   - If new → create user doc + userAccount doc
9. Backend generates JWT (HS256), returns to frontend
10. Frontend stores JWT, includes in all subsequent API requests
```

**Key auth env vars (for Cloud Run):**

```bash
JWT_SECRET=<32+ char secret>
GOOGLE_CLIENT_ID=<from Google Cloud Console>
GOOGLE_CLIENT_SECRET=<from Google Cloud Console>
GOOGLE_OAUTH_REDIRECT_URI=https://superfamily-backend-xxx.run.app/api/auth/google/callback
FRONTEND_URL=https://superfamily-app.web.app
FIREBASE_SERVICE_ACCOUNT_JSON=<base64 encoded service account key>
```

### Real-Time Strategy: SSE (No Change to Current Approach)

The current SSE implementation is **preserved**. The Go backend maintains its in-memory SSE client manager.

```
Frontend subscribes → Backend maintains SSE connection → 
On Firestore write → Backend broadcasts SSE event to connected clients
```

This avoids the complexity of Firebase's real-time SDK on the frontend while keeping the existing SSE architecture.

### Frontend Deployment: Firebase Hosting

Firebase Hosting serves the static PWA:
- **Pros:** Free tier, auto-SSL, global CDN, one-command deploy
- **Cons:** Static files only (perfect for Vite build output)
- **Build output:** `dist/` folder from `vite build`

### Ingress / Custom Domain

**Option A: Firebase Hosting + Custom Domain (Recommended)**
```
app.superfamily.id → Firebase Hosting → serves static PWA
api.superfamily.id → Cloud Run backend
```
Firebase Hosting handles the custom domain + SSL certificate automatically.

**Option B: Single Domain with Path Routing**
```
app.superfamily.id/          → Firebase Hosting (PWA)
app.superfamily.id/api/      → Cloud Run (backend)
```
Requires Cloud Run ingress settings to allow public, and Firebase Hosting rewrites.

### Environment Variables for Backend (Cloud Run)

```bash
# .env file for local testing
PORT=3001
APP_ENV=production
JWT_SECRET=superfamily-jwt-secret-at-least-32-chars
DB_PATH=                       # Not used anymore (no SQLite)
CORS_ORIGINS=https://app.superfamily.id,https://superfamily-app.web.app
GIN_MODE=release

# Google OAuth
GOOGLE_CLIENT_ID=xxxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=xxxxx
GOOGLE_OAUTH_REDIRECT_URI=https://superfamily-backend-xxx.run.app/api/auth/google/callback
FRONTEND_URL=https://app.superfamily.id
OAUTH_ENABLED=true

# Firebase
FIREBASE_PROJECT_ID=superfamily-app
FIREBASE_SERVICE_ACCOUNT_KEY=<path or base64 encoded JSON>
```

---

## 4. Migration Plan (SQLite → Firestore)

### Phase 0: Preparation (1 day)

1. Create Firebase project at https://console.firebase.google.com
2. Enable Firestore in Native mode, region `asia-southeast1`
3. Create service account: IAM → Service Accounts → "Firebase Admin SDK" → Generate new key (JSON)
4. Download `serviceAccountKey.json`, store securely (NOT in git)
5. Add Firebase Admin Go SDK to backend

### Phase 1: Update Backend Repository Layer (2-3 days)

Replace `database/sql` + SQLite calls with Firestore SDK calls.

**Before (SQLite):**
```go
// Repository
func (r *Repository) GetAllBills() ([]models.Bill, error) {
    rows, err := r.db.Query("SELECT ...")
    defer rows.Close()
    // scan rows into Bill structs
}

// Service
func (s *Service) GetAllBills() ([]models.Bill, error) {
    return s.repo.GetAllBills()
}
```

**After (Firestore):**
```go
// Repository — Firestore-backed
type FirestoreRepository struct {
    client *firestore.Client
    projectID string
}

func (r *FirestoreRepository) GetAllBills(ctx context.Context) ([]models.Bill, error) {
    iter := r.client.Collection("bills").Documents(ctx)
    defer iter.Stop()
    
    var bills []models.Bill
    for {
        doc, err := iter.Next()
        if err == iterator.Done {
            break
        }
        if err != nil {
            return nil, err
        }
        var bill models.Bill
        if err := doc.DataTo(&bill); err != nil {
            return nil, err
        }
        bill.ID = doc.Ref.ID
        bills = append(bills, bill)
    }
    return bills, nil
}

func (r *FirestoreRepository) CreateBill(ctx context.Context, bill *models.Bill) error {
    bill.CreatedAt = time.Now()
    bill.UpdatedAt = time.Now()
    _, _, err := r.client.Collection("bills").Add(ctx, bill)
    return err
}
```

### Phase 2: Migration Script (1 day)

Write a one-time Go script to migrate existing SQLite data to Firestore.

```go
// scripts/migrate_to_firestore.go
package main

import (
    "context"
    "database/sql"
    "encoding/json"
    "log"
    "time"

    "firebase.google.com/go/v4"
    "firebase.google.com/go/v4/firestore"
    "github.com/google/uuid"
    _ "github.com/mattn/go-sqlite3"
    "google.golang.org/api/option"
)

func main() {
    ctx := context.Background()
    
    // Init Firestore
    sa := option.WithCredentialsFile("serviceAccountKey.json")
    app, err := firebase.NewApp(ctx, nil, sa)
    if err != nil {
        log.Fatal(err)
    }
    client, err := app.Firestore(ctx)
    defer client.Close()
    
    // Open SQLite
    db, err := sql.Open("sqlite3", "./data/superfamily.db")
    defer db.Close()
    
    // Migrate each table
    migrateBills(ctx, db, client)
    migrateReminders(ctx, db, client)
    migrateEvents(ctx, db, client)
    migrateTransactions(ctx, db, client)
    migrateBudgets(ctx, db, client)
    migrateMealPlans(ctx, db, client)
    migrateWeekendActivities(ctx, db, client)
    migrateFamilyMembers(ctx, db, client)
    migrateUsers(ctx, db, client)
    migrateWhitelistUsers(ctx, db, client)
    migrateUserAccounts(ctx, db, client)
    
    log.Println("Migration complete!")
}

func migrateBills(ctx context.Context, db *sql.DB, client *firestore.Client) error {
    rows, err := db.Query("SELECT id, title, amount, due_date, frequency, category, is_paid, paid_date, paid_by, notify_before, notified_at, note, created_by, created_at, updated_at FROM bills")
    if err != nil {
        return err
    }
    defer rows.Close()
    
    batch := client.Batch()
    count := 0
    for rows.Next() {
        var b BillRow // struct matching SQL columns
        rows.Scan(&b.ID, &b.Title, &b.Amount, &b.DueDate, &b.Frequency,
            &b.Category, &b.IsPaid, &b.PaidDate, &b.PaidBy,
            &b.NotifyBefore, &b.NotifiedAt, &b.Note,
            &b.CreatedBy, &b.CreatedAt, &b.UpdatedAt)
        
        doc := map[string]interface{}{
            "id":           b.ID,
            "title":        b.Title,
            "amount":       b.Amount,
            "dueDate":      b.DueDate,
            "frequency":    b.Frequency,
            "category":     b.Category,
            "isPaid":       b.IsPaid == 1,
            "notifyBefore": b.NotifyBefore,
            "createdAt":    toTimestamp(b.CreatedAt),
            "updatedAt":    toTimestamp(b.UpdatedAt),
        }
        // Handle nullable fields
        if b.PaidDate.Valid { doc["paidDate"] = b.PaidDate.String }
        if b.PaidBy.Valid   { doc["paidBy"] = b.PaidBy.String }
        if b.NotifiedAt.Valid { doc["notifiedAt"] = b.NotifiedAt.String }
        if b.Note.Valid     { doc["note"] = b.Note.String }
        if b.CreatedBy.Valid { doc["createdBy"] = b.CreatedBy.String }
        
        ref := client.Collection("bills").Doc(b.ID)
        batch.Set(ref, doc)
        count++
        
        // Commit in batches of 500
        if count%500 == 0 {
            _, err := batch.Commit(ctx)
            if err != nil {
                return err
            }
            batch = client.Batch()
        }
    }
    _, err := batch.Commit(ctx)
    return err
}
```

### Phase 3: Dual-Write Phase (Staggered)

During migration, run both databases in parallel:
1. Writes go to both SQLite and Firestore
2. Reads come from Firestore (the source of truth going forward)
3. Monitor for inconsistencies for 24-48 hours

### Phase 4: Cutover

1. Stop the backend
2. Point Cloud Run to new Firestore-only backend image
3. Deploy
4. Verify data integrity (compare counts, spot-check records)
5. Delete SQLite code from backend

### Phase 5: Cleanup

1. Archive (don't delete immediately) the old SQLite data file
2. Update `ARCHITECTURE_V2_LOCAL.md` → point to this new document
3. Update README.md deployment section

---

## 5. Deployment Steps

### Step 1: Firebase Project Setup

```bash
# 1. Create Firebase project (via browser)
# https://console.firebase.google.com → "Add project" → "superfamily-app"

# 2. Enable Firestore
# In Firebase Console: Build → Firestore Database → Create database
# Mode: Native mode
# Location: asia-southeast1 (Jakarta)
# Starting in test mode (security rules open — we'll fix this)

# 3. Enable Google OAuth (if not already)
# In Google Cloud Console: APIs & Services → Credentials
# Create OAuth 2.0 Client ID (Web application type)
# Authorized redirect URI: https://superfamily-backend-xxx.run.app/api/auth/google/callback
```

### Step 2: Get Firebase Service Account

```bash
# Firebase Console → Project Settings → Service Accounts → Generate new private key
# Download as superfamily-firebase-admin.json
# NEVER commit this file to git
```

### Step 3: Configure Firestore Security Rules

Since the backend acts as the API layer (frontend never calls Firestore directly), set strict rules:

```javascript
// firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Allow authenticated backend service account (no restrictions — backend handles auth)
    // The frontend JWT is verified by the backend API, not Firestore rules
    match /{collection}/{document} {
      allow read, write: if false;  // Frontend cannot access Firestore directly
    }
  }
}
```

**Alternative (if frontend needs direct Firestore access for real-time):**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper function to verify JWT from backend
    function isValidUser() {
      return request.auth != null && request.auth.token.email != null;
    }
    
    // Bills — readable by authenticated users, writable by authenticated users
    match /bills/{bill} {
      allow read: if isValidUser();
      allow write: if isValidUser();
    }
    
    // Events — readable by authenticated users
    match /events/{event} {
      allow read: if isValidUser();
      allow write: if isValidUser();
    }
    
    // Reminders — readable by authenticated users
    match /reminders/{reminder} {
      allow read: if isValidUser();
      allow write: if isValidUser();
    }
    
    // Transactions — readable by authenticated users
    match /transactions/{txn} {
      allow read: if isValidUser();
      allow write: if isValidUser();
    }
    
    // Budgets — readable by authenticated users
    match /budgets/{budget} {
      allow read: if isValidUser();
      allow write: if isValidUser();
    }
    
    // Users — only own document
    match /users/{userId} {
      allow read: if isValidUser() && request.auth.uid == userId;
      allow write: if isValidUser() && request.auth.uid == userId;
    }
    
    // WhitelistUsers, UserAccounts — backend only
    match /whitelistUsers/{doc} { allow read, write: if false; }
    match /userAccounts/{doc} { allow read, write: if false; }
  }
}
```

Deploy rules:
```bash
firebase deploy --only firestore:rules
```

### Step 4: Deploy Backend to Cloud Run

```bash
cd /workspace/superfamily-dashboard/backend

# Build the Docker image
docker build -t gcr.io/superfamily-app/backend:$TAG .

# Push to Google Container Registry
docker push gcr.io/superfamily-app/backend:$TAG

# Deploy to Cloud Run
gcloud run deploy superfamily-backend \
  --image gcr.io/superfamily-app/backend:$TAG \
  --region asia-southeast1 \
  --platform managed \
  --no-allow-unauthenticated \
  --port 3001 \
  --min-instances 0 \
  --max-instances 10 \
  --memory 512Mi \
  --cpu 1 \
  --set-env-vars "APP_ENV=production,JWT_SECRET=$JWT_SECRET,GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET=$GOOGLE_CLIENT_SECRET,GOOGLE_OAUTH_REDIRECT_URI=https://superfamily-backend-xxx.run.app/api/auth/google/callback,FRONTEND_URL=https://superfamily-app.web.app,OAUTH_ENABLED=true,FIREBASE_PROJECT_ID=superfamily-app" \
  --set-secrets "FIREBASE_SERVICE_ACCOUNT_KEY=superfamily-service-account:latest" \
  --concurrency 80 \
  --timeout 30s
```

### Step 5: Deploy Frontend to Firebase Hosting

```bash
cd /workspace/superfamily-dashboard

# Build Vite PWA
npm install
npm run build  # outputs to dist/

# Deploy to Firebase Hosting
firebase deploy --only hosting -P production
```

Or using `firebase.json`:
```json
{
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "/api/{**catch-all}",
        "run": {
          "serviceId": "superfamily-backend",
          "region": "asia-southeast1"
        }
      }
    ]
  }
}
```

### Step 6: Configure Custom Domain (Optional)

```bash
# Firebase Console → Hosting → Add custom domain
# app.superfamily.id → point CNAME to superfamily-app.web.app
# Firebase auto-handles SSL certificate
```

### Step 7: OAuth Callback Configuration

In **Google Cloud Console** → APIs & Services → Credentials:
- Add authorized redirect URI:
  `https://superfamily-backend-xxx.run.app/api/auth/google/callback`

In **Firebase Console** → Authentication → Sign-in method:
- Enable "Google" provider
- Set project support email
- Set OAuth callback: handled automatically by Firebase

---

## 6. Cost Estimation

### Monthly Cost Breakdown (Target: < 50rb IDR / ~$3.5 USD)

| Service | Tier | Cost |
|---|---|---|
| **Firebase Hosting** | Spark (Free) | **$0** — 10GB storage, 360MB/day transfer |
| **Firestore** | Spark (Free) | **$0** — 50GB storage, 1GB/day reads, 20GB/month network |
| **Cloud Run (Backend)** | 1 instance avg, ~0.5 CPU, 512MB RAM | **~$1.50–3.00/month** |
| **Cloud Build** | Per minute (minimal deploys) | **~$0.10/month** |
| **Container Registry** | 5GB storage | **~$0.20/month** |
| **Custom Domain** | .id domain ~$10/year | **~$0.83/month** (optional) |
| **Google Cloud DNS** | 1 zone | **$0.20/month** (if custom domain) |
| **TOTAL** | | **~$2.00–4.00/month** |

### Cost Optimization Tips

1. **Set Cloud Run min instances to 0** — pays nothing when idle
2. **Use `--concurrency 80`** — one instance handles many requests
3. **Firestore in Native mode** — cheaper than Datastore mode for this workload
4. **Avoid Firebase Blaze plan** — switch to Blaze only if free tier limits are hit
5. **Batch Firestore writes** — don't write one document at a time in loops

### What Triggers Blaze (Paid) Tier?

| Service | Free Tier Limit | Notes |
|---|---|---|
| Firestore reads | 50,000/day | Current app: ~200-500/day (safe) |
| Firestore writes | 20,000/day | Current app: ~50-100/day (safe) |
| Firestore deletes | 20,000/day | Safe |
| Hosting transfer | 360MB/day | PWA ~5-10MB total (loads once) |
| Cloud Run CPU | 180,000 vCPU-seconds | ~1 hr/day usage → ~2% of free tier |

**Verdict:** This app will comfortably stay within free tier limits with a family of 2-5 users.

---

## 7. Pros/Cons vs Cloud Run + Cloud SQL

### Cloud Run (Go) + Cloud SQL (PostgreSQL/MySQL)

**Pros:**
- Familiar relational model — easier migration from SQLite (minimal code changes)
- ACID transactions across multiple tables
- Cloud SQL has automatic backups and point-in-time recovery
- Standard SQL queries — complex joins, aggregations, filtering
- Strong typing enforced at DB level

**Cons:**
- **Cost:** Cloud SQL minimum ~$7-15/month (PostgreSQL f1-micro in asia-southeast1 is ~$7/mo)
- **Complexity:** Need to manage connection pooling, SQL migrations, schema versioning
- **Cold starts:** Cloud SQL instance always-on (unlike Cloud Run which scales to 0)
- **Backup strategy:** Manual or Cloud SQL automatic backups need configuration
- **Admin:** Connection strings, SSL certs, IAM permissions for Cloud Run → Cloud SQL

### Cloud Run (Go) + Firestore

**Pros:**
- **Cost:** Firestore free tier covers this workload; Cloud Run scales to 0 = pay nothing when idle
- **No database server to manage:** Firestore is serverless — Google handles scaling, backups, availability
- **Real-time SDK available:** Frontend can subscribe to Firestore listeners for live updates
- **Simpler deployment:** No SQL connection strings, no connection pooling code
- **Automatic geo-replication** in asia-southeast1
- **Handles sparse data well:** Meal plans, events, irregular data suits document model

**Cons:**
- **No multi-document ACID transactions** (unless using Firestore transactions, which are limited)
- **Denormalization required:** Data duplication needed for read performance — more sync logic
- **Vendor lock-in:** Firestore queries are proprietary (no standard SQL)
- **Complex queries harder:** SQL joins vs Firestore collection-group queries
- **Real-time SDK complexity:** If using Firestore listeners on frontend, need to handle auth tokens carefully
- **Less familiar:** Most Go developers know SQL better than Firestore Go SDK

### Comparison Table

| Criteria | Cloud Run + Cloud SQL | Cloud Run + Firestore |
|---|---|---|
| **Monthly cost** | ~$8-20/month | ~$2-4/month |
| **Database management** | Manual (connection pools, backups, migrations) | None (serverless) |
| **Data model** | Relational (SQL) | Document (NoSQL) |
| **Multi-document ACID** | ✅ Full transactions | ⚠️ Limited (Firestore transactions, no cross-collection) |
| **Familiarity** | Standard SQL | Firestore proprietary API |
| **Cold start cost** | Cloud SQL always-on (~$$) | Cloud Run = $0 idle |
| **Real-time on frontend** | Via SSE (current approach) | Via Firestore SDK listeners |
| **Vendor lock-in** | Portable (standard SQL) | Firebase-specific |
| **For 2-5 family users** | Overkill, costs more | Ideal, cost-effective |
| **Migration from SQLite** | Easy (minor changes) | Medium (data model redesign) |

### Recommendation

**Use Firestore** for this project because:
1. ✅ Cost fits the < 50rb IDR/month target
2. ✅ Small data volume (2 users, modest write frequency)
3. ✅ Existing SSE architecture already handles real-time — Firestore real-time is a bonus
4. ✅ No database administration overhead
5. ✅ Cloud Run + Firestore = fully serverless, scales to zero

**Only reconsider Cloud SQL if:**
- Complex multi-table SQL joins become a bottleneck
- Need strict ACID across related documents (e.g., bill payment + transaction must be atomic)
- Team is more comfortable with SQL

---

## Appendix: Required Environment Variables

```bash
# Backend (Cloud Run)
PORT=3001
APP_ENV=production
GIN_MODE=release
JWT_SECRET=<min 32 chars>
CORS_ORIGINS=https://app.superfamily.id,https://superfamily-app.web.app
GOOGLE_CLIENT_ID=<from Google Cloud Console>
GOOGLE_CLIENT_SECRET=<from Google Cloud Console>
GOOGLE_OAUTH_REDIRECT_URI=https://superfamily-backend-xxx.run.app/api/auth/google/callback
FRONTEND_URL=https://app.superfamily.id
OAUTH_ENABLED=true
FIREBASE_PROJECT_ID=superfamily-app
# Firebase service account key passed via Secret Manager
FIREBASE_SERVICE_ACCOUNT_KEY=<base64 or Secret Manager ref>
```

## Appendix: Firestore Collections Quick Reference

| Collection | Doc ID | Subcollections | Key Queries |
|---|---|---|---|
| `bills` | UUID | none | `where('isPaid', false).orderBy('dueDate')` |
| `reminders` | UUID | none | `where('isPaid', false).orderBy('dueDate')` |
| `events` | UUID | none | `orderBy('date')` |
| `transactions` | UUID | none | `orderBy('date', 'desc')` |
| `budgets` | `YYYY-MM` | none | get by month doc ID |
| `mealPlans` | UUID | none | `where('weekStart', startOfWeek)` |
| `weekendActivities` | UUID | none | `where('date', thisWeek)` |
| `familyMembers` | UUID | none | list all |
| `users` | UUID | `bills`, `reminders`, `events` (optional) | get by UID |
| `whitelistUsers` | UUID | none | `where('email', email)` |
| `userAccounts` | UUID | none | `where('googleEmail', email)` |
