# Decision Log

_Katalog keputusan arsitektur dan trade-offs penting._

---

## Dec-001: Tech Stack — Vanilla/Preact instead of React

**Date:** 2026-04-27  
**Context:** MVP needs to be lightweight, fast, and simple to build.

**Decision:** Use Vanilla JS atau Preact untuk frontend, bukan React/Vue/Angular.

**Rationale:**
- Use case keluarga kecil (single user), data sangat kecil — framework besar overkill.
- Offline-first, no backend — kebutuhan network minimal.
- Faster load time, simpler debugging.
- Zero build complexity dengan Vanilla; kalau perlu structure, Preact ~3KB.

**Alternatives Considered:**
- React: Overkill, bundle size besar, butuh bundler lebih kompleks.
- Vue/Angular: Same overkill issue.

**Status:** Approved

---

## Dec-002: Storage — IndexedDB (via Dexie.js)

**Date:** 2026-04-27  
**Context:** Need structured data storage that works offline.

**Decision:** IndexedDB via Dexie.js sebagai primary storage.

**Rationale:**
- Menyimpan data terstruktur (not just key-value like localStorage).
- Mendukung indexing & querying.
- Kapasitas besar (~50MB+, device dependent).
- Offline-capable tanpa server.

**Alternatives Considered:**
- localStorage: Only string key-value, kapasitas kecil (5MB), slow for large data.
- SQLite (via sql.js or wa-sqlite): Overkill untuk data scale ini.
- Cloud/API: Privacy concern, adds complexity, cost.

**Status:** Approved

---

## Dec-003: No Backend/Cloud for MVP

**Date:** 2026-04-27  
**Context:** Simplicity and privacy priority.

**Decision:** Data hanya disimpan lokal di device. Tidak ada cloud sync untuk MVP.

**Rationale:**
- Privacy: Data keluarga tidak perlu ada di server manapun.
- Simplicity: Tidak ada backend infrastructure.
- Speed: Semua akses langsung dari device, no network latency.
- Cost: Gratis.

**Future Consideration:**  
Kalau nanti perlu sync antar device, options:
- WebDAV (self-hosted, misal Nextcloud)
- Atau export/import JSON manual

**Status:** Approved

---

## Dec-004: Bahasa Indonesia untuk UI

**Date:** 2026-04-27  
**Context:** Target users are Farhan & Inne (Bahasa Indonesia speakers).

**Decision:** UI dalam Bahasa Indonesia.

**Rationale:**
- Primary user: Farhan & Inne (Indonesia speaker).
- Consistency: Semua label, button, message dalam Bahasa Indonesia.

**Note:** Kode (variable names, data model) tetap English untuk maintainability.

**Status:** Approved

---

## Dec-005: Six Features Only for MVP

**Date:** 2026-04-27  
**Context:** Need to scope strictly for fast delivery.

**Decision:** MVP = exactly 6 fitur inti. Tidak ada fitur tambahan sampai MVP selesai.

**The 6 Features:**
1. Tracking Budget & Pengeluaran
2. Tanggal-Tanggal Penting (Events)
3. Weekly Meal Plan + Jadwal Mingguan
4. Jadwal Aktivitas Weekend Produktif
5. Pengingat Pajak (PBB, SIM, dll)
6. Tagihan (Air, IPL, Cicilan)

**Out of MVP (Backlog):**
- Multi-user/family member login
- Cloud sync/backup
- Export laporan (PDF/CSV)
- Advanced budget charts
- Dark mode
- Widget homescreen
- Notification push (server-side)

**Status:** Approved

---

_Format: Descision baru = copy template Dec-00X di atas._
