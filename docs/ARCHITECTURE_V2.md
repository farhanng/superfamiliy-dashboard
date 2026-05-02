# SuperFamily App v2 — Architecture

**DEPRECATED:** See [ARCHITECTURE_V2_LOCAL.md](./ARCHITECTURE_V2_LOCAL.md) for the actual implementation. This file kept for reference only.

**Status:** Superseded by local network version.

---

## 1. Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     USERS (2)                               │
│              ┌──────────┐    ┌──────────┐                  │
│              │  Farhan  │    │   Inne   │                  │
│              │ (Phone)  │    │ (Phone)  │                  │
│              └────┬─────┘    └────┬─────┘                  │
└───────────────────┼───────────────┼────────────────────────┘
                    │               │
                    ▼               ▼
         ┌──────────────────┐ ┌──────────────────┐
         │   PWA Browser    │ │   PWA Browser    │
         │  ┌────────────┐  │ │  ┌────────────┐  │
         │  │ Dexie.js   │  │ │  │ Dexie.js   │  │
         │  │ (IndexedDB)│  │ │  │ (IndexedDB)│  │
         │  │ Local Cache│  │ │  │ Local Cache│  │
         │  └────────────┘  │ │  └────────────┘  │
         │         ▲        │ │         ▲        │
         │         │ sync   │ │         │ sync   │
         └─────────┼────────┘ └─────────┼────────┘
                   │                    │
                   │   HTTPS/WSS        │
                   │                    │
         ┌─────────┴────────────────────┴─────────┐
         │              BACKEND                     │
         │  ┌─────────────────────────────────┐    │
         │  │  Go HTTP Server (REST + SSE)   │    │
         │  │  - Auth (JWT)                   │    │
         │  │  - CRUD API                      │    │
         │  │  - Real-time (SSE push)          │    │
         │  └───────────────┬─────────────────┘    │
         │                  │                       │
         │  ┌───────────────▼─────────────────┐    │
         │  │  SQLite Database (shared)       │    │
         │  │  - Users table                   │    │
         │  │  - Bills, Events, etc.           │    │
         │  └─────────────────────────────────┘    │
         │                                           │
         │  Host: $5/month VPS (Nairobi/DigitalOcean) │
         │  or: Local Raspberry Pi/NAS               │
         └───────────────────────────────────────────┘

LEGENDA:
  PWA  = Progressive Web App (mobile browser)
  SSE  = Server-Sent Events (real-time push from server)
  REST = JSON HTTP API
```

---

## 2. Tech Stack Recommendation

### Backend: **Go + Gin** (RECOMMENDED)
| Criteria | Go+Gin | Node.js+Fastify | Python+FastAPI |
|---|---|---|---|
| Binary size | ~10MB (single binary) | ~50MB+ (Node) | ~100MB+ |
| Memory usage | ~10-20MB | ~100MB+ | ~50MB+ |
| Simplicity | Moderate | Easy | Easy |
| Performance | Excellent | Good | Good |
| Single deploy | ✅ (1 binary) | ❌ (need Node installed) | ❌ |
| Ecosystem | Good | Excellent | Good |

**Why Go:** Single self-contained binary = easiest deployment for self-hosted. 
Low memory = can run on $5 VPS comfortably.

### Database: **SQLite**
- Zero config, zero maintenance
- Perfect for 2-user app (data size < 100MB)
- SQLite supports concurrent reads, exclusive writes
- Backup: just copy the `.db` file
- For VPS: mount a volume for the DB file
- Alternatives: PostgreSQL (overkill for 2 users)

### Authentication: **JWT + Magic Link**
- Simple: user enters email → gets link → logged in
- No passwords to manage
- No password reset complexity
- Library: `github.com/golang-jwt/jwt/v5`
- For magic link: simple SMTP email (can use Gmail App Password)

### Real-time: **Server-Sent Events (SSE)**
- Simpler than WebSockets (one-way server→client push)
- Perfect for: "other user added a bill → update UI"
- Works through proxies, mobile-friendly
- Fallback: polling every 10 seconds if SSE fails

### Frontend Changes (minimal):
- Keep: Vite + TailwindCSS + Dexie.js + PWA
- Add: API client layer (simple `fetch` wrapper)
- Keep: Dexie.js as local cache (offline-first)
- Sync strategy: on reconnect, pull latest + push local changes

---

## 3. Data Model

```sql
-- Users (family members)
CREATE TABLE users (
    id TEXT PRIMARY KEY,           -- UUID
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,            -- "Farhan" or "Inne"
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Bills (tagihan)
CREATE TABLE bills (
    id TEXT PRIMARY KEY,           -- UUID
    title TEXT NOT NULL,
    amount INTEGER NOT NULL,       -- in Rupiah (no decimals)
    due_date DATE NOT NULL,
    frequency TEXT NOT NULL,        -- one_time, weekly, monthly, yearly
    category TEXT NOT NULL,        -- air, ipl, cicilan, internet, pendidikan, lainnya
    is_paid BOOLEAN DEFAULT FALSE,
    paid_date DATE,
    paid_by TEXT REFERENCES users(id),
    notify_before INTEGER DEFAULT 2,  -- days before due date
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
    frequency TEXT NOT NULL,        -- one_time, 1_year, 5_years
    category TEXT NOT NULL,         -- pbb, sim, stnk, paspor, lainnya
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

-- Events (tanggal penting)
CREATE TABLE events (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    date DATE NOT NULL,
    type TEXT NOT NULL,            -- birthday, anniversary, holiday, other
    color TEXT,
    notify_days INTEGER DEFAULT 7,
    note TEXT,
    created_by TEXT REFERENCES users(id),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Transactions (budget/pengeluaran)
CREATE TABLE transactions (
    id TEXT PRIMARY KEY,
    amount INTEGER NOT NULL,
    category TEXT NOT NULL,
    date DATE NOT NULL,
    note TEXT,
    type TEXT NOT NULL,            -- income, expense
    status TEXT DEFAULT 'done',    -- done, pending
    created_by TEXT REFERENCES users(id),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Budget (monthly budget)
CREATE TABLE budgets (
    id TEXT PRIMARY KEY,
    month TEXT NOT NULL,           -- YYYY-MM
    amount INTEGER NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Meal Plans
CREATE TABLE meal_plans (
    id TEXT PRIMARY KEY,
    week_start DATE NOT NULL,      -- Monday of the week
    meals TEXT NOT NULL,           -- JSON: {mon: {breakfast, lunch, dinner}, tue: {...}}
    created_by TEXT REFERENCES users(id),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Weekend Activities
CREATE TABLE weekend_activities (
    id TEXT PRIMARY KEY,
    date DATE NOT NULL,
    activity TEXT NOT NULL,
    status TEXT DEFAULT 'planned', -- planned, done, cancelled
    created_by TEXT REFERENCES users(id),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

---

## 4. API Endpoints

### Authentication
```
POST   /api/auth/request-link    { email }          → Send magic link email
GET    /api/auth/verify?token=xxx                     → Verify token, set JWT cookie
POST   /api/auth/logout                                 → Clear session
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
POST   /api/reminders/:id/mark-paid        → Mark reminder as paid
POST   /api/reminders/:id/mark-unpaid      → Mark reminder as unpaid
```

### Events
```
GET    /api/events                         → List all events
POST   /api/events                         → Create event
PUT    /api/events/:id                     → Update event
DELETE /api/events/:id                     → Delete event
GET    /api/events/upcoming?days=30        → Get upcoming events
```

### Transactions
```
GET    /api/transactions                   → List transactions (filter by month)
POST   /api/transactions                   → Create transaction
PUT    /api/transactions/:id               → Update transaction
DELETE /api/transactions/:id               → Delete transaction
```

### Budget
```
GET    /api/budgets/:month                 → Get monthly budget
PUT    /api/budgets/:month                 → Set monthly budget
```

### Meal Plans
```
GET    /api/meal-plans                     → List all meal plans
GET    /api/meal-plans/:weekStart         → Get meal plan by week
POST   /api/meal-plans                     → Create/update meal plan
DELETE /api/meal-plans/:id                → Delete meal plan
```

### Weekend Activities
```
GET    /api/weekend-activities             → List all
POST   /api/weekend-activities             → Create
PUT    /api/weekend-activities/:id         → Update
DELETE /api/weekend-activities/:id        → Delete
GET    /api/weekend-activities/:date       → Get by date
```

### Sync
```
GET    /api/sync                           → Full sync (get all data since timestamp)
GET    /api/events/subscribe               → SSE stream for real-time updates
```

---

## 5. Docker Compose Plan

```yaml
version: '3.8'

services:
  superfamily-backend:
    build: ./backend
    container_name: superfamily-backend
    restart: unless-stopped
    ports:
      - "3000:3000"
    volumes:
      - ./data:/app/data        # SQLite DB lives here
      - ./config:/app/config    # App config
    environment:
      - APP_ENV=production
      - PORT=3000
      - JWT_SECRET=${JWT_SECRET}
      - SMTP_HOST=${SMTP_HOST}
      - SMTP_PORT=${SMTP_PORT}
      - SMTP_USER=${SMTP_USER}
      - SMTP_PASS=${SMTP_PASS}
      - FROM_EMAIL=${FROM_EMAIL}
      - BASE_URL=${BASE_URL}    # e.g. https://superfamily.example.com
    healthcheck:
      test: ["CMD", "wget", "-q", "--spider", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 10s

  # Optional: Nginx reverse proxy (for HTTPS + SSE support)
  nginx:
    image: nginx:alpine
    container_name: superfamily-nginx
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./nginx/ssl:/etc/nginx/ssl:ro   # SSL certs (Let's Encrypt)
    depends_on:
      - superfamily-backend
```

### Nginx Config (for SSE + HTTPS):
```nginx
server {
    listen 80;
    server_name superfamily.example.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name superfamily.example.com;

    ssl_certificate /etc/nginx/ssl/fullchain.pem;
    ssl_certificate_key /etc/nginx/ssl/privkey.pem;

    location / {
        proxy_pass http://superfamily-backend:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # SSE support (critical for real-time sync)
    location /api/events/subscribe {
        proxy_pass http://superfamily-backend:3000;
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

## 6. Deployment Options

### Option A: Self-hosted VPS ($5-10/month) — RECOMMENDED
- **Providers:** Hetzner Cloud (€3.50/mo), DigitalOcean ($4/mo), Oracle Free Tier
- **Pros:** Full control, private, unlimited usage
- **Cons:** Need to manage server
- **Tools:** Coolify (like Heroku, self-hosted) or plain Docker Compose

### Option B: Railway.app ($5/month starter)
- **Pros:** Zero-config deployment, auto-ssl
- **Cons:** Usage limits on free tier

### Option C: Local (Home) — Free
- **Raspberry Pi 4 or old laptop with Linux**
- **Pros:** Free, always on at home
- **Cons:** No internet access outside home, need static IP ortailscale

### Option D: Cloudflare Tunnel + Home Server — Free
- **Tailscale:** Free for personal use
- **Cloudflare Tunnel:** Free
- **Total cost:** $0

---

## 7. Timeline & Priority

### MVP (v2.0) — ~1-2 weeks
| Task | Effort | Notes |
|---|---|---|
| Go backend setup (auth + CRUD APIs) | 2-3 days | Gin framework, SQLite |
| Migration: IndexedDB → API integration | 1-2 days | Replace Dexie calls with fetch |
| Auth flow (magic link) | 1 day | SMTP integration |
| Real-time sync (SSE) | 1-2 days | Event push on data change |
| PWA offline-first with sync | 2-3 days | Conflict resolution (last-write-wins) |
| Deploy to VPS + HTTPS | 1 day | Nginx + Let's Encrypt |

### Phase 2 (v2.1) — ~1 week
- Push notifications (web push API)
- Data export/import (JSON backup)
- Meal plan UI improvements
- Budget charts/analytics

### Phase 3 (v2.2) — ~1 week
- File attachments (receipt photos) — need storage (S3 or local)
- Multiple family groups (if extended family wants to join)
- PWA install prompt improvement

---

## 8. Key Decisions to Consult with User

Before proceeding, need to confirm:

### Decision 1: Hosting Location
**Question:** Where should the backend be hosted?
- A) Self-hosted VPS (~$5/mo, full control, private)
- B) Railway/Render (~$5/mo, zero config)
- C) Home server via Cloudflare Tunnel (free, but no external access if home internet down)
- D) Other (please specify)

### Decision 2: Auth Simplicity
**Question:** How should Farhan & Inne log in?
- A) **Magic link** — enter email → get link in inbox → click to login (simplest, no passwords)
- B) **Simple password** — shared family password (easier but less secure)
- C) **Individual accounts** — each person has own login (more complex, allows "created by" tracking)

### Decision 3: Data Sync Strategy
**Question:** How real-time should changes sync?
- A) **Real-time (SSE)** — when Inne marks a bill paid, Farhan sees it instantly (preferred)
- B) **Polling every 10 seconds** — simpler, slightly delayed
- C) **Manual sync button** — user pulls to refresh (simplest, no real-time)

### Decision 4: Offline Priority
**Question:** Is offline capability a hard requirement for v2?
- A) **Yes, must have offline** — app works without internet, syncs when back online
- B) **Nice to have** — app needs internet, but local cache prevents data loss
- C) **No, always online is fine** — simplifies architecture significantly

---

## 9. Estimated Effort Summary

| Component | Complexity | Notes |
|---|---|---|
| Backend (Go + SQLite) | Medium | ~800-1200 lines Go code |
| Auth system | Medium | JWT + magic link email |
| REST API (7 entities) | Low | Standard CRUD, ~400 lines |
| SSE real-time | Low | ~100 lines |
| Frontend API layer | Low | Simple fetch wrapper |
| Dexie ↔ API sync | Medium | Conflict resolution logic |
| PWA offline-first | Medium | Service worker + cache |
| Deployment (VPS + Nginx) | Low | Docker Compose one-command |

**Total MVP estimate:** 5-10 days of focused work
