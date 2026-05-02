# Blockers & Issues

_Daftar hambatan yang sedang блокирует development._

---

## Current Blockers

_None saat ini — proyek masih dalam fase planning._

---

## Resolved Blockers

_None._

---

## Known Technical Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Windows dev environment setup | Medium | WSL2 atau native Node.js —还没确定 |
| Browser compatibility (Safari iOS) | Low-Medium | Test di Safari, progressive enhancement |
| Service Worker caching strategy | Medium | Start simple (cache-first untuk static, network-first untuk data) |
| Notification permission UX | Low | Ask politely, degrade gracefully if denied |
| Data migration saat schema change | Medium | Versioned DB schema di Dexie, migration script |

---

_Update file ini kalau ada blokir baru. Resolved blockers boleh dihapus tapi tetap catat di RETROSPECTIVE.md._
