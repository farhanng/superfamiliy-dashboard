
# Architecture Rules - SuperFamily Dashboard

## Data Flow Rule (Wajib)

```
Browser → Go Backend (REST API) → Persistent Storage (Cloud SQL / Firestore via Admin SDK)
```

**LARANG:**
- Frontend BOLOS langsung ke Firestore
- Frontend BOLOS langsung ke database manapun
- Frontend cuma boleh: REST API calls ke Go Backend

**WAJIB:**
- Semua data operations lewat Go Backend
- Go Backend connect ke persistent storage (Cloud SQL / Firestore Admin SDK)
- Frontend cuma: display + form submission

## Storage Priority

1. **Cloud SQL (MySQL/Postgres)** - kalau mau reliability maximum
2. **Firestore via Firebase Admin SDK** - kalau mau simplicity (service account sudah ada)

## Implementation Notes

- Backend Go pakai `firebase-admin` SDK dengan service account
- Frontend tetap pakai fetch/axios ke backend API
- Hapus semua Firebase SDK dari frontend
- Semua Firestore operations di backend Go, bukan frontend
