# SuperFamily App v2 — Local Network Architecture

**Purpose:** Complete architecture for v2 that runs on local network only (GL503VM at 192.168.0.29), no external hosting, no VPS.

**Status:** Ready for implementation.

---

## 1. Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     LOCAL NETWORK                          │
│                     (192.168.0.29)                         │
│                                                             │
│   ┌─────────────────────────────────────────────────────┐  │
│   │              GL503VM Server                         │  │
│   │                                                     │  │
│   │   ┌─────────────────┐  ┌──────────────────────────┐ │  │
│   │   │   Nginx (:80)   │  │   Go Backend (:3001)     │ │  │
│   │   │   Frontend PWA  │  │   REST API + SSE         │ │  │
│   │   └────────┬────────┘  └────────────┬─────────────┘ │  │
│   │            │                        │               │  │
│   │            └────────┬───────────────┘               │  │
│   │                     │                               │  │
│   │                     ▼                               │  │
│   │            ┌─────────────────┐                       │  │
│   │            │  SQLite DB     │                       │  │
│   │            │  (shared file) │                       │  │
│   │            └─────────────────┘                       │  │
│   └─────────────────────────────────────────────────────┘  │
│                                                             │
│              ┌──────────┐    ┌──────────┐                  │
│              │  Farhan  │    │   Inne   │                  │
│              │ (Phone)  │    │ (Phone)  │                  │
│              │  PWA     │    │  PWA     │                  │
│              └──────────┘    └──────────┘                  │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Tech Stack

| Component | Choice | Rationale |
|---|---|---|
| Backend | Go + Gin | Single binary, low memory (~15MB), perfect for 2-user local app |
| Database | SQLite | Zero config, file-based (easy backup), handles concurrent reads fine |
| Auth | Individual logins (email/password) | Each user has own account for personal attribution |
| Frontend | Vite + TailwindCSS + PWA | Existing, minimal changes needed |
| Proxy | Nginx (existing, port 80) | Already running, add backend reverse proxy |
| Real-time | Server-Sent Events (SSE) | Simple one-way push, works through nginx |

---

## 3. Port Allocation

| Port | Service | Notes |
|---|---|---|
| 80 | Nginx | Existing, serves frontend |
| 3001 | Go Backend | New, internal only |
| 3000 | (reserved) | For future if needed |

**Nginx routing:**
- `/` → Frontend (existing)
- `/api/*` → Go Backend (new reverse proxy)

---

## 4. Auth Design — Individual Logins

**Recommended: Individual accounts with simple password**

```sql
CREATE TABLE users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,     -- bcrypt hash
    name TEXT NOT NULL,              -- "Farhan" or "Inne"
    role TEXT DEFAULT 'member',      -- admin, member
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

**Login flow:**
1. User opens app → sees login page
2. Enters email + password (stored in browser localStorage for convenience)
3. Backend validates → returns JWT token
4. Frontend stores JWT → sends in Authorization header for all API calls

**Why individual accounts:**
- Track who created/edited what ("Created by Farhan")
- Personal preferences per user
- Simple to implement, no conflicts

**Password storage:**
- bcrypt with cost 10 (fast enough for 2 users)
- Never store plain text

---

## 5. Docker Compose — Full Stack

```yaml
version: '3.8'

services:
  # Frontend PWA (existing, serves on :80 via nginx)
  superfamily-frontend:
    build: .
    container_name: superfamily-frontend
    ports:
      - "5000:5000"  # Internal only, nginx proxies to 80
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "wget", "-q", "--spider", "http://localhost:5000"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 10s
    networks:
      - superfamily-net

  # Backend API (NEW)
  superfamily-backend:
    build: ./backend
    container_name: superfamily-backend
    restart: unless-stopped
    ports:
      - "3001:3001"
    volumes:
      - ./data:/app/data              # SQLite DB
      - ./backend/config:/app/config  # Config file
    environment:
      - APP_ENV=production
      - PORT=3001
      - JWT_SECRET=${JWT_SECRET:-superfamily-local-secret-change-me}
      - DATABASE_PATH=/app/data/superfamily.db
    healthcheck:
      test: ["CMD", "wget", "-q", "--spider", "http://localhost:3001/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 10s
    networks:
      - superfamily-net

networks:
  superfamily-net:
    driver: bridge
```

---

## 6. Vite Config — Backend Proxy

Update `vite.config.js` to proxy API calls to backend:

```javascript
export default defineConfig({
  plugins: [
    VitePWA({...})
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true
      }
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})
```

**Important:** In production (Docker), Vite dev proxy won't work. Nginx will handle the proxy instead.

---

## 7. Nginx Configuration — Add Backend Proxy

Existing nginx already on port 80. Add location block for API:

```nginx
server {
    listen 80 default_server;
    server_name _;

    # Frontend (existing)
    location / {
        proxy_pass http://superfamily-frontend:5000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # Backend API (NEW)
    location /api/ {
        proxy_pass http://superfamily-backend:3001;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header Connection '';
        proxy_buffering off;
        proxy_cache off;
    }

    # SSE for real-time updates
    location /api/events/subscribe {
        proxy_pass http://superfamily-backend:3001;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header Connection '';
        proxy_buffering off;
        proxy_cache off;
    }
}
```

---

## 8. API Endpoints

### Authentication
```
POST   /api/auth/register    { email, password, name }  → Create account
POST   /api/auth/login        { email, password }        → Get JWT token
POST   /api/auth/logout                                 → Invalidate token
GET    /api/auth/me                                     → Get current user
```

### Bills
```
GET    /api/bills                         → List all bills
POST   /api/bills                         → Create bill
PUT    /api/bills/:id                     → Update bill
DELETE /api/bills/:id                     → Delete bill
POST   /api/bills/:id/mark-paid           → Mark bill as paid
POST   /api/bills/:id/mark-unpaid         → Mark bill as unpaid
GET    /api/bills/due-soon?days=7         → Get bills due soon
```

### Reminders
```
GET    /api/reminders                      → List all reminders
POST   /api/reminders                      → Create reminder
PUT    /api/reminders/:id                  → Update reminder
DELETE /api/reminders/:id                  → Delete reminder
POST   /api/reminders/:id/mark-paid        → Mark as paid
POST   /api/reminders/:id/mark-unpaid      → Mark as unpaid
```

### Events
```
GET    /api/events                         → List all events
POST   /api/events                         → Create event
PUT    /api/events/:id                     → Update event
DELETE /api/events/:id                     → Delete event
GET    /api/events/upcoming?days=30        → Get upcoming
```

### Transactions
```
GET    /api/transactions                   → List (filter by month)
POST   /api/transactions                   → Create
PUT    /api/transactions/:id               → Update
DELETE /api/transactions/:id               → Delete
```

### Budget
```
GET    /api/budgets/:month                 → Get monthly budget
PUT    /api/budgets/:month                 → Set budget
```

### Meal Plans
```
GET    /api/meal-plans                     → List all
GET    /api/meal-plans/:weekStart         → Get by week
POST   /api/meal-plans                     → Create/update
DELETE /api/meal-plans/:id                → Delete
```

### Weekend Activities
```
GET    /api/weekend-activities             → List all
POST   /api/weekend-activities             → Create
PUT    /api/weekend-activities/:id         → Update
DELETE /api/weekend-activities/:id        → Delete
```

### Real-time
```
GET    /api/events/subscribe               → SSE stream for updates
GET    /api/sync?since=timestamp           → Full sync since timestamp
```

---

## 9. Data Model

```sql
-- Users (family members)
CREATE TABLE users (
    id TEXT PRIMARY KEY,           -- UUID
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,   -- bcrypt hash
    name TEXT NOT NULL,
    role TEXT DEFAULT 'member',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Bills
CREATE TABLE bills (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    amount INTEGER NOT NULL,
    due_date DATE NOT NULL,
    frequency TEXT NOT NULL,
    category TEXT NOT NULL,
    is_paid BOOLEAN DEFAULT FALSE,
    paid_date DATE,
    paid_by TEXT REFERENCES users(id),
    notify_before INTEGER DEFAULT 2,
    notified_at DATE,
    note TEXT,
    created_by TEXT REFERENCES users(id),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tax/Document Reminders
CREATE TABLE reminders (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    amount INTEGER NOT NULL,
    due_date DATE NOT NULL,
    frequency TEXT NOT NULL,
    category TEXT NOT NULL,
    is_paid BOOLEAN DEFAULT FALSE,
    paid_date DATE,
    paid_by TEXT REFERENCES users(id),
    notify_before INTEGER DEFAULT 30,
    notified_at DATE,
    note TEXT,
    created_by TEXT REFERENCES users(id),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Events
CREATE TABLE events (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    date DATE NOT NULL,
    type TEXT NOT NULL,
    color TEXT,
    notify_days INTEGER DEFAULT 7,
    note TEXT,
    created_by TEXT REFERENCES users(id),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Transactions
CREATE TABLE transactions (
    id TEXT PRIMARY KEY,
    amount INTEGER NOT NULL,
    category TEXT NOT NULL,
    date DATE NOT NULL,
    note TEXT,
    type TEXT NOT NULL,
    status TEXT DEFAULT 'done',
    created_by TEXT REFERENCES users(id),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Budget
CREATE TABLE budgets (
    id TEXT PRIMARY KEY,
    month TEXT NOT NULL,
    amount INTEGER NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Meal Plans
CREATE TABLE meal_plans (
    id TEXT PRIMARY KEY,
    week_start DATE NOT NULL,
    meals TEXT NOT NULL,
    created_by TEXT REFERENCES users(id),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Weekend Activities
CREATE TABLE weekend_activities (
    id TEXT PRIMARY KEY,
    date DATE NOT NULL,
    activity TEXT NOT NULL,
    status TEXT DEFAULT 'planned',
    created_by TEXT REFERENCES users(id),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

---

## 10. Deployment Guide — Local Network

### Prerequisites
- GL503VM running Ubuntu/Linux
- Docker + Docker Compose installed
- Nginx running on port 80 (existing)
- Static IP: 192.168.0.29

### Steps

**1. Create backend directory structure**
```bash
mkdir -p superfamily/backend
mkdir -p superfamily/data
mkdir -p superfamily/backend/config
```

**2. Create Go backend files**
- `backend/main.go` — API server
- `backend/go.mod` — Module definition
- `backend/config/config.go` — Config loader
- `backend/handlers/*.go` — HTTP handlers
- `backend/models/*.go` — Data models
- `backend/db/*.go` — Database operations

**3. Create Dockerfile for backend**
```dockerfile
FROM golang:1.22-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o server

FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /app
COPY --from=builder /app/server .
COPY config/ ./config/
EXPOSE 3001
CMD ["./server"]
```

**4. Update Docker Compose**
```bash
# From project root
docker-compose up -d
```

**5. Update nginx config** (if not using Docker nginx)
Add proxy_pass for `/api/` to `http://localhost:3001`

**6. Initial user setup**
```bash
# Create first users via API or seed script
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"farhan@test.local","password":"xxx","name":"Farhan"}'
```

**7. Update frontend for API integration**
- Add JWT storage (localStorage)
- Update API calls to use auth header
- Add login/register UI if not present

### Access URLs (Local Network)
- Frontend: `http://192.168.0.29/` (or `http://gl503vm/`)
- Backend API: `http://192.168.0.29/api/`
- SSE: `http://192.168.0.29/api/events/subscribe`

---

## 11. Real-time Sync (SSE)

When any data changes, backend broadcasts to all connected clients:

```go
// Broadcast channel
var clients = make(map[string]chan string)

// On data change
func broadcast(event string) {
    data, _ := json.Marshal(map[string]string{"type": event})
    for _, ch := range clients {
        select {
        case ch <- string(data):
        default:
        }
    }
}
```

Frontend listens:
```javascript
const eventSource = new EventSource('/api/events/subscribe')
eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data)
    if (data.type === 'bills_updated') refreshBills()
    if (data.type === 'events_updated') refreshEvents()
}
```

---

## 12. Backup Strategy

Since it's local and SQLite:
```bash
# Simple file copy (can be automated with cron)
cp data/superfamily.db data/superfamily-$(date +%Y%m%d).db

# Or use docker volume
docker volume inspect superfamily_data
```

---

## 13. Effort Estimate

| Component | Effort | Notes |
|---|---|---|
| Go backend setup | 2-3 days | Gin + SQLite + bcrypt |
| Auth endpoints | 1 day | Login, register, JWT |
| CRUD APIs (7 entities) | 2-3 days | Standard REST |
| SSE real-time | 1 day | ~100 lines Go |
| Frontend integration | 2-3 days | API client, auth UI, proxy |
| Docker compose setup | 0.5 day | Nginx proxy |
| **Total MVP** | **~8-10 days** | |

---

## 14. Key Decisions Summary

| Decision | Choice | Rationale |
|---|---|---|
| Hosting | Local only | GL503VM at 192.168.0.29 |
| Auth | Individual accounts | Better attribution, still simple |
| Passwords | bcrypt | Secure enough for 2 users |
| Database | SQLite | Perfect for local, low maintenance |
| Real-time | SSE | Simple, nginx-compatible |
| Frontend | Existing PWA | Add API layer + proxy |
| Backend port | 3001 | Clear separation from port 80 |