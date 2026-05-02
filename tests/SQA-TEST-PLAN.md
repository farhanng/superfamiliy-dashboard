# SuperFamily Dashboard - SQA Test Suite
## Testing: SSO (Google OAuth) + Dashboard Login

---

## 📋 Test Scope

### 1. SSO Flow (Google OAuth)
- **TC-SSO-01**: User bisa initiate Google OAuth dari login page
- **TC-SSO-02**: User diarahkan ke Google consent screen
- **TC-SSO-03**: User bisa login dengan Google account yang whitelisted
- **TC-SSO-04**: User dengan email tidak whitelisted ditolak dengan pesan error
- **TC-SSO-05**: User denied access ditangani dengan baik
- **TC-SSO-06**: Invalid state token ditangani dengan error message
- **TC-SSO-07**: OAuth disabled di server ditangani dengan baik

### 2. Local Login
- **TC-LOC-01**: Login dengan email/password valid berhasil
- **TC-LOC-02**: Login dengan email/password salah gagal dengan error message
- **TC-LOC-03**: Register account baru berhasil
- **TC-LOC-04**: Register dengan email yang sudah ada gagal
- **TC-LOC-05**: Logout berhasil dan redirect ke login

### 3. Dashboard Access
- **TC-DASH-01**: User ter-authenticated bisa akses home screen
- **TC-DASH-02**: Unauthenticated user di-redirect ke login
- **TC-DASH-03**: Bottom navigation berfungsi dengan benar
- **TC-DASH-04**: Language toggle berfungsi (ID/EN)
- **TC-DASH-05**: Logout button berfungsi

---

## 🔧 Test Environment

- **Frontend URL**: https://family.farhan.biz.id
- **Backend API**: https://superfamily-backend-hpd7gsjsza-as.a.run.app
- **Test Accounts**:
  - Local: farhan@superfamily.local / farhan123
  - Local: inne@superfamily.local / inne123

---

## 🚀 How to Run

### Automated Browser Test
```bash
cd /home/farhan/.openclaw/workspace/superfamily-dashboard
node tests/sso-login.spec.js
```

### Manual Test Checklist
Lihat section di bawah.

---

## 📝 Manual Test Checklist

### TC-SSO-01: Initiate Google OAuth
1. Buka https://family.farhan.biz.id
2. Klik "Login with Google" button
3. **Expected**: Redirect ke Google OAuth consent screen
4. **Status**: ⬜

### TC-SSO-03: Login with Whitelisted Email
1. Lanjutkan dari TC-SSO-01
2. Login dengan Google account yang sudah di-whitelist
3. **Expected**: Berhasil login, redirect ke dashboard home
4. **Status**: ⬜

### TC-SSO-04: Email Not Whitelisted
1. Buka https://family.farhan.biz.id
2. Login dengan Google account yang TIDAK di-whitelist
3. **Expected**: Error message "Your email is not authorized to use this app."
4. **Status**: ⬜

### TC-LOC-01: Local Login Success
1. Buka https://family.farhan.biz.id
2. Login dengan farhan@superfamily.local / farhan123
3. **Expected**: Berhasil login, muncul dashboard
4. **Status**: ⬜

### TC-LOC-02: Local Login Failed
1. Buka https://family.farhan.biz.id
2. Login dengan wrongpassword / wrongpassword
3. **Expected**: Error message muncul, tidak bisa login
4. **Status**: ⬜

### TC-DASH-01: Authenticated Dashboard Access
1. Login sebagai farhan@superfamily.local
2. **Expected**: Bisa lihat home screen dengan data family
3. **Status**: ⬜

### TC-DASH-02: Unauthenticated Redirect
1. Buka https://family.farhan.biz.id/#budget (tanpa login)
2. **Expected**: Di-redirect ke login page
3. **Status**: ⬜

### TC-LOC-05: Logout
1. Login dulu
2. Klik logout button di header
3. **Expected**: Dikeluarkan, kembali ke login screen
4. **Status**: ⬜

---

## 🐛 Bug Report Template

```
Test Case: TC-XXX
Date: YYYY-MM-DD
Tester: Nama
Expected Result: ...
Actual Result: ...
Severity: [Critical/Major/Minor]
Screenshot: (attach)
```

---

## 📊 Test Results

| Test Case | Status | Notes |
|-----------|--------|-------|
| TC-SSO-01 | ⬜ | Pending - Need browser install |
| TC-LOC-01 | ⬜ | Pending |
| TC-LOC-02 | ⬜ | Pending |
| TC-DASH-02 | ⬜ | Pending |
| TC-LOC-05 | ⬜ | Pending |
| TC-DASH-01 | ⬜ | Pending |
| TC-DASH-03 | ⬜ | Pending |
| TC-DASH-04 | ⬜ | Pending |

---
*Last Updated: 2026-05-02 07:40 GMT+7*
*Author: ViercasAI SQA Agent*