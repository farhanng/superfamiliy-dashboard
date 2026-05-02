# SuperFamily Dashboard — Project Brief

**Versi:** 1.0.0  
**Tanggal:** 2026-04-27  
**Status:** Perencanaan (Pre-MVP)

---

## 1. Gambaran Proyek

### Apa это?

SuperFamily Dashboard adalah **Progressive Web App (PWA)** sederhana yang dirancang khusus untuk keluarga Farhan & Inne. Tujuannya menjadi **single point of reference** untuk semua hal administratif rumah tangga — mulai dari anggaran, jadwal makan, hingga pengingat tagihan dan pajak.

### Masalah yang Dihandle

- Budget/pengeluaran sering tidak tertrack dengan jelas.
- Tanggal penting (ultah, anniversary, batas bayar) sering lupa.
- Jadwal makan mingguan belum terencana — sering bingung mau masak apa.
- Aktivitas weekend produktif untuk Zaidan belum terjadwal.
- Tagihan & pajak sering telat karena tidak ada pengingat terpusat.

### Tujuan Utama

1. **Mudah diakses** — dari HP (PWA installable), cukup buka browser.
2. **Offline-first** — tetap jalan tanpa internet (local-first storage).
3. **Singkat & jelas** — informasi langsung kelihatan, tidak perlu buka banyak screen.
4. **Pengingat otomatis** — notifikasi untuk hal yang sekiranya bisa di-notify.
5. **Privacy-first** — semua data tersimpan lokal di device, tidak ada server/cloud.

---

## 2. MVP Scope (Versi 1.0)

**Enam fitur inti** yang harus selesai dulu sebelum nambah fitur lain:

| # | Fitur | Prioritas |
|---|-------|-----------|
| 1 | Tracking Budget & Pengeluaran | MUST |
| 2 | Tanggal-Tanggal Penting (Calendar Events) | MUST |
| 3 | Weekly Meal Plan + Jadwal Mingguan | MUST |
| 4 | Jadwal Aktivitas Weekend Produktif | MUST |
| 5 | Pengingat Pajak (PBB, SIM, dll) | MUST |
| 6 | Tagihan (Air, IPL, Cicilan) | MUST |

**Di luar MVP:**
- Multi-user / family member login
- Cloud sync / backup
- Export laporan (PDF/CSV)
- Chart/visualisasi budget advanced
- Dark mode / theming
- Widget homescreen

---

## 3. Rekomendasi Tech Stack

### Stack Utama

| Lapisan | Pilihan | Alasan |
|---------|---------|--------|
| **Core Framework** | Vanilla JS + HTML + CSS | Simpel, zero build step, ringan banget |
| **Alternatif Framework** | Preact atau Svelte (bila perlu component) | ~3KB, sangat ringan |
| **PWA Shell** | Vite + vite-plugin-pwa | Build cepat, service worker otomatis |
| **Styling** | Tailwind CSS (CDN/dev) atau plain CSS custom properties | Fleksibel, responsive mudah |
| **Storage** | IndexedDB (via Dexie.js) | Menyimpan data terstruktur, offline-capable |
| **Date/Time** | date-fns | Ringan, tree-shakeable |
| **Icons** | Lucide Icons (CDN) | Rapi, open source |
| **Notifications** | Web Notifications API + Push API (optional) | Pengingat native di HP |

### Kenapa bukan React/Vue/Angular?

Untuk use case ini (single family, data kecil, offline-first), framework besar overkill. Waktu load lebih lama, complexity lebih tinggi, dan benefitnya tidak sebanding. **Vanilla/Preact/Svelte adalah pilihan tepat.**

### Struktur Direktori

```
superfamily-dashboard/
├── index.html
├── manifest.json
├── sw.js                     # Service Worker
├── assets/
│   ├── icons/
│   └── fonts/
├── css/
│   ├── main.css
│   ├── components/
│   └── utilities.css
├── js/
│   ├── app.js                # Entry point
│   ├── db.js                 # IndexedDB via Dexie
│   ├── router.js             # Simple hash router
│   ├── store.js              # State management sederhana
│   ├── services/
│   │   ├── budget.js
│   │   ├── calendar.js
│   │   ├── mealplan.js
│   │   ├── weekend.js
│   │   ├── reminder.js
│   │   └── bills.js
│   ├── components/           # UI components
│   └── utils/
│       ├── date.js
│       └── format.js
├── agents/
│   └── PM.md
├── docs/
│   └── SPEC.md
├── tests/
│   └── *.test.js
└── PROJECT.md
```

---

## 4. Feature Breakdown

---

### Fitur 1: Tracking Budget & Pengeluaran

**Deskripsi:** Catat semua pengeluaran harian dan lihat sisa budget bulanan.

#### Use Cases
- Tambah pengeluaran baru (nominal, kategori, tanggal, keterangan).
- Lihat daftar transaksi harian.
- Lihat ringkasan bulanan: total pengeluaran vs budget.
- Edit / hapus transaksi.
- Reset budget di awal bulan.

#### Kategori Default
- Makan & Minum
- Transportasi
- Belanja Rumah
- Zaidan (popok, susu, obat, dll)
- Utilitas (listrik, air, internet)
- Lain-Lain

#### UI Components
- Dashboard ringkasan (budget vs spent, % usage).
- Form tambah transaksi (quick-add).
- List transaksi hari ini.
- Filter bulanan.

#### Data Model

```js
// Dexie schema
transactions: {
  id: auto,
  amount: Number,          // dalam Rupiah
  category: String,        // dari kategori list
  date: String,            // ISO date YYYY-MM-DD
  note: String,            // opsional
  createdAt: Date,
  updatedAt: Date
}

budget: {
  id: 'monthly',           // singleton
  amount: Number,          // budget bulanan
  month: String,           // YYYY-MM
  updatedAt: Date
}
```

---

### Fitur 2: Tanggal-Tanggal Penting (Calendar Events)

**Deskripsi:** Simpan tanggal-tanggal penting keluarga — ultah, anniversary, hari besar, event sekolah Zaidan.

#### Use Cases
- Tambah event baru (nama, tanggal, tipe, notifikasi).
- Lihat list event upcoming (7/30/90 hari).
- Lihat kalender mini bulanan.
- Edit / hapus event.
- Notifikasi H-7 dan H-1.

#### Tipe Event
- Ulang Tahun
- Anniversary
- Event Sekolah Zaidan
- Hari Besar / Libur
- Lain-Lain

#### UI Components
- Kalender mini (bulan berjalan).
- List upcoming events.
- Form tambah/edit event.

#### Data Model

```js
events: {
  id: auto,
  title: String,
  date: String,            // YYYY-MM-DD
  type: String,            // birthday|anniversary|school|holiday|other
  color: String,           // hex color untuk kalender
  notifyDays: Array,       // [7, 1] → notif H-7 dan H-1
  note: String,
  createdAt: Date
}
```

---

### Fitur 3: Weekly Meal Plan + Jadwal Mingguan

**Deskripsi:** Rencanakan menu makan 7 hari ke depan dan jadwal mingguan (aktivitas rutin keluarga).

#### Use Cases
- Input menu per hari (Sarapan, Makan Siang, Makan Malam).
- Set jadwal mingguan (praktikum, les, playdate, dll).
- Lihat meal plan dalam format list mingguan.
- Copy meal plan dari minggu sebelumnya (reuse).
- Random meal suggestion (opsional).

#### UI Components
- Weekly view: 7 hari × 3 waktu makan grid.
- Quick-add menu per slot.
- Repeat/duplicate menu.
- Jadwal rutin mingguan (sidebar atau tab terpisah).

#### Data Model

```js
mealPlans: {
  id: auto,
  weekStart: String,       // YYYY-MM-DD (Senin)
  meals: {
    [dayIndex]: {          // 0=Senin, 6=Minggu
      breakfast: String,
      lunch: String,
      dinner: String
    }
  },
  createdAt: Date
}

weeklySchedule: {
  id: auto,
  dayOfWeek: Number,       // 0-6
  items: [
    { time: String, activity: String, note: String }
  ]
}
```

---

### Fitur 4: Jadwal Aktivitas Weekend Produktif

**Deskripsi:** Rencanakan aktivitas weekend (Sabtu-Minggu) yang produktif dan menyenangkan untuk Zaidan dan keluarga.

#### Use Cases
- Tambah aktivitas weekend (nama, tanggal, lokasi, status).
- Tandai selesai setelah dilakukan.
- Lihat ringkasan weekend ini vs sebelumnya.
- Kategori: Outdoor, Indoor, Edukasi, Quality Time.

#### UI Components
- Checklist-style weekend plan.
- Tombol "Done" per aktivitas.
- Progress ring (% diselesaikan).

#### Data Model

```js
weekendActivities: {
  id: auto,
  date: String,            // YYYY-MM-DD (Sabtu atau Minggu)
  activities: [
    {
      id: String,          // UUID
      title: String,
      category: String,    // outdoor|indoor|education|family
      location: String,
      status: String,      // pending|done
      completedAt: Date
    }
  ],
  createdAt: Date
}
```

---

### Fitur 5: Pengingat Pajak (PBB, SIM, dll)

**Deskripsi:** Sistem pengingat untuk semua kewajiban pajak dan dokumen penting keluarga.

#### Use Cases
- Tambah item pajak/pengeluaran periodic (nama, jumlah, due date, frequency).
- Lihat list upcoming (30/60/90 hari).
- Tandai sebagai lunas.
- Hitung estimasi total per tahun.
- Notifikasi X hari sebelum jatuh tempo.

#### Items
- PBB (setahun sekali, biasanya Q1)
- SIM (5 tahun)
- STNK (1 tahun)
- Paspor (5/10 tahun)
- Pajak rumah / tanah
- Lainnya

#### UI Components
- List item dengan status lunas/belum.
- Countdown ke due date berikutnya.
- Form tambah/edit item.
- History pembayaran.

#### Data Model

```js
reminders: {
  id: auto,
  title: String,
  amount: Number,
  dueDate: String,         // YYYY-MM-DD
  frequency: String,       // yearly|monthly|quarterly|one-time
  category: String,        // tax|license|document|other
  isPaid: Boolean,
  paidDate: String,
  notifyBefore: Array,     // [30, 7, 1] hari
  note: String,
  createdAt: Date
}
```

---

### Fitur 6: Tagihan (Air, IPL, Cicilan)

**Deskripsi:** Tracking tagihan bulanan dan cicilan tetap.

#### Use Cases
- Tambah tagihan (nama, nominal, due date, frequency).
- Lihat list tagihan aktif.
- Tandai lunas.
- Lihat total tagihan bulan ini.
- Due date reminder.

#### Items
- Tagihan Air (PDAM)
- IPL / Maintenance Fee
- Cicilan Motor / Mobil
- Internet
- Handphone (pulsa/paket)
- Cicilan KPR
- Lainnya

#### UI Components
- List tagihan aktif (status lunas/belum).
- Total tagihan bulan berjalan.
- Quick-pay toggle (tandai lunas).
- Form tambah/edit tagihan.

#### Data Model

```js
bills: {
  id: auto,
  title: String,
  amount: Number,
  dueDate: String,         // YYYY-MM-DD
  frequency: String,       // monthly|yearly|one-time
  category: String,        // utility|loan|subscription|other
  isPaid: Boolean,
  paidDate: String,
  notifyBefore: Array,     // [7, 3, 1] hari
  note: String,
  createdAt: Date
}
```

---

## 5. Data Model & Storage

### Primary: IndexedDB (via Dexie.js)

Dipilih karena:
- Menyimpan data terstruktur (bukan cuma string key-value).
- Mendukung indexing & querying.
- Kapasitas besar (limit device, biasanya >50MB).
- Bisa offline tanpa server.
- API promise-based, enak dipakai.

### Fallback: localStorage

Untuk data kecil & konfigurasi:
- Theme preference
- Last viewed month
- Notifikasi permission status
- First-run flag

### Kenapa BUKAN Cloud/API?

- Privacy: Data keluarga tidak perlu ada di server.
- Simplicity: Tidak ada backend complexity.
- Speed: Langsung dari device, no latency.
- Cost: Gratis.

### Sync Strategy (Future)

Kalau suatu saat perlu sync antar device, baru ditambah:
- WebDAV (self-hosted, contoh: Nextcloud)
- Atau export/import JSON manual

Untuk MVP, data hanya di device itu sendiri.

---

## 6. UI/UX Flow & Screen Overview

### Navigation

Bottom navigation bar (mobile-first) dengan 6 tab sesuai 6 fitur:

```
┌─────────────────────────────────────┐
│  🏠 Home  │  💰 Budget  │  📅 Event │
├─────────────────────────────────────┤
│  🍽️ Meal  │  🎯 Weekend │  🔔 Bills │
└─────────────────────────────────────┘
```

### Screen Flow

```
[Splash/Loading]
       │
       ▼
  [Home Dashboard] ◄──────────────────┐
       │                              │
   Quick stats                       │
   - Budget % used                   │ (bottom nav)
   - Days until next bill            │
   - Upcoming event (H-7)            │
   - Weekend plan progress           │
       │                              │
   ┌───┴───┬─────┬─────┬─────┬─────┐  │
   │Budget │Event│Meal │Week │Bills│  │
   └───┬───┴─────┴─────┴─────┴─────┘──┘
       │
       ▼
  [Detail Screen per Fitur]
       │
   ┌───┴────┐
   │  Add/  │
   │  Edit  │
   │  Modal │
   └───┬────┘
```

### Screen Descriptions

#### 1. Home Dashboard
- 4 card ringkasan (budget, events, bills, weekend).
- Quick-add button (FAB) untuk tambah transaksi.
- Tanggal hari ini & cuaca sederhana.

#### 2. Budget Screen
- Progress bar: budget vs spent.
- List transaksi hari ini.
- Filter bulanan + navigasi bulan.
- FAB: Tambah transaksi.

#### 3. Events Screen
- Mini kalender bulanan (highlight tanggal dengan event).
- List upcoming events.
- FAB: Tambah event.

#### 4. Meal Plan Screen
- Weekly grid (7 hari × 3 kolom makan).
- Tab: Meal Plan | Jadwal Mingguan.
- FAB: Tambah menu.

#### 5. Weekend Screen
- Tab Saturday / Sunday.
- Checklist aktivitas.
- Progress ring.
- FAB: Tambah aktivitas.

#### 6. Bills Screen
- Tab: Aktif | Semua.
- List tagihan + status.
- Total bulan ini.
- FAB: Tambah tagihan.

### Responsive Strategy

- **Mobile-first** (320px - 480px): Bottom nav, full-width cards.
- **Tablet (768px+)**: Side nav, 2-column grid.
- **Desktop (1024px+)**: Side nav expanded, 3-column grid.

### Color Palette

| Role | Hex | Usage |
|------|-----|-------|
| Primary | `#2563EB` | CTA buttons, active nav |
| Primary Dark | `#1D4ED8` | Pressed states |
| Success | `#10B981` | Paid, done, surplus |
| Warning | `#F59E0B` | Due soon, ~80% budget |
| Danger | `#EF4444` | Over budget, overdue |
| Background | `#F8FAFC` | Main bg |
| Surface | `#FFFFFF` | Cards |
| Text Primary | `#1E293B` | Headings |
| Text Secondary | `#64748B` | Subtitles |

### Typography

- Font: `Inter` (Google Fonts) — clean, modern, angka mudah dibaca.
- Heading: 600-700 weight.
- Body: 400-500 weight.
- Monospace untuk nominal uang: `font-variant-numeric: tabular-nums`.

### Interaction Patterns

- **Swipe to delete** di list items (mobile).
- **Pull to refresh** di screens yang mengambil data.
- **Haptic feedback** kalau bisa (vibrate on button press).
- **Empty states** yang helpful — jangan kosong kalau belum ada data.
- **Loading skeletons** saat data loading.

---

## 7. Development Phases & Timeline

### Fase 0: Setup & Foundation (1-2 hari)

- [ ] Inisialisasi project (Vite + PWA).
- [ ] Setup Dexie.js + IndexedDB schema.
- [ ] Buat shell app dengan routing.
- [ ] Setup Tailwind CSS.
- [ ] Buat base components (Button, Card, Input, Modal).
- [ ] Buat PWA manifest + icons.
- [ ] Service Worker basic.

**Deliverable:** App shell yang jalan, bisa di-install, offline blank screen.

---

### Fase 1: Fitur Budget (2-3 hari)

- [ ] DB schema + CRUD transactions.
- [ ] DB schema + CRUD budget.
- [ ] Budget screen (dashboard ringkasan).
- [ ] Form tambah transaksi.
- [ ] Filter bulanan.
- [ ] Edit / hapus transaksi.

**Deliverable:** User bisa catat transaksi dan lihat budget bulanan.

---

### Fase 2: Fitur Events (1-2 hari)

- [ ] DB schema + CRUD events.
- [ ] Mini kalender.
- [ ] List upcoming events.
- [ ] Form tambah/edit event.
- [ ] Notifikasi H-7 / H-1 (Web Notification).

**Deliverable:** User bisa catat & dapat notifikasi tanggal penting.

---

### Fase 3: Fitur Meal Plan (1-2 hari)

- [ ] DB schema + CRUD meal plans.
- [ ] Weekly meal grid UI.
- [ ] Form tambah menu.
- [ ] Copy week functionality.
- [ ] Weekly schedule (jadwal rutin).

**Deliverable:** User bisa plan menu seminggu penuh.

---

### Fase 4: Fitur Weekend (1 hari)

- [ ] DB schema + CRUD weekend activities.
- [ ] Weekend checklist UI.
- [ ] Done toggle + progress.
- [ ] Copy dari weekend sebelumnya.

**Deliverable:** User bisa plan weekend produktif.

---

### Fase 5: Fitur Reminders & Bills (1-2 hari)

- [ ] DB schema + CRUD reminders (pajak).
- [ ] DB schema + CRUD bills (tagihan).
- [ ] List view + status.
- [ ] Quick pay / mark done.
- [ ] Due date countdown.
- [ ] Notifikasi.

**Deliverable:** User bisa tracking semua tagihan & pengingat.

---

### Fase 6: Polish & PWA Finalisasi (1-2 hari)

- [ ] Service Worker offline caching.
- [ ] Install prompt (beforeinstallprompt).
- [ ] Empty states + onboarding.
- [ ] Error handling + recovery.
- [ ] Performance audit (Lighthouse).
- [ ] Mobile responsiveness final check.
- [ ] Testing di real device.

**Deliverable:** PWA production-ready, installable di HP.

---

### Total Estimasi: ~9-14 hari kerja

| Fase | Durasi |
|------|--------|
| 0: Setup | 1-2 hari |
| 1: Budget | 2-3 hari |
| 2: Events | 1-2 hari |
| 3: Meal Plan | 1-2 hari |
| 4: Weekend | 1 hari |
| 5: Bills/Reminders | 1-2 hari |
| 6: Polish | 1-2 hari |

---

## 8. Definition of Done — MVP

Suatu fitur dianggap **DONE** jika:

### Code Quality
- [ ] Kode sudah di-commit dengan message yang jelas.
- [ ] Tidak ada console error saat penggunaan normal.
- [ ] Sudah dicek di Chrome DevTools (Lighthouse audit: Performance > 80, Accessibility > 90).
- [ ] Global lint/format checks passed (ESLint + Prettier).

### Functionality
- [ ] Semua use case di Feature Breakdown sudah ter-cover.
- [ ] CRUD lengkap (Create, Read, Update, Delete) berfungsi.
- [ ] Data tersimpan dengan benar di IndexedDB.
- [ ] Refresh / close tab tidak kehilangan data.

### UX
- [ ] Empty state yang helpful (tidak blank screen).
- [ ] Loading state saat fetch data.
- [ ] Error state yang informatif.
- [ ] Touch target min 44×44px (mobile friendly).
- [ ] Angka nominal rapih (separator ribuan).

### PWA
- [ ] App bisa di-install di homescreen (manifest.json benar).
- [ ] Offline tetap bisa dibuka (service worker).
- [ ] Tidak ada 404 resource.

### Testing
- [ ] Manual smoke test di 3 device berbeda (bisa emulate di DevTools).
- [ ] Test add/edit/delete per fitur.

---

## 9. Asumsi & Catatan

- **Target user:** Farhan & Inne (2 adulto), primarily mobile-first.
- **Data scale:** Kecil — maksimal ~1000 transaksi/tahun, ~100 events. IndexedDB sangat cukup.
- **Tidak ada backend:** Full local-first. Kalau perlu sync, di luar MVP.
- **Bahasa:** UI Bahasa Indonesia. Data model & kode: English.
- **Browser target:** Chrome/Edge terbaru (Android). Safari support nice-to-have.
- **Windows dev environment:** Sudah migrate ke Windows, jadi dev pakai WSL2 atau native Node.

---

_Dokumen ini adalah acuan utama proyek. Update saat scope berubah._
