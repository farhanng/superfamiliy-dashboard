# Ide & Requirements: Fitur Keluarga — Perspektif Ibu Rumah Tangga

_Dokumen ini ditulis dari sudut pandang seorang ibu rumah tangga yang mengelola kebutuhan keluarga sehari-hari. Setiap fitur harus terasa nyata, bukan abstrak — langsung bisa dipakai tanpa perlu think twice._

---

## 1. Feature Expansions (MVP Features)

### 1.1 Budget Tracker (Pengelolaan Keuangan Keluarga)

**Use Case Nyata:**

- _"Gajian udah masuk, terus langsung split: ini buat rumah, ini buat tabungan, ini buat pos nggak terduga. Tapi nggak boleh lebih dari yang udah dialokasikan."_
- _"Belanja bulanan超市/tradisional — uangnya langsung ngarah ke kategori 'groceries', bukan ngalir ke mana-mana."_
- _"Pas mau beli barang di atas Rp500rb, muncul notifikasi: 'Eh, ini udah masuk monthly budget belum?'"_

**Feature Expansion:**

- **Budget bulanan per kategori** — user set batas per kategori (makan, transport, utilities, sekolah anak, hiburan, dll). Sistem警告 kalau udah 80% dan 100%.
- **Split transaksi otomatis** — saat input expense, langsung pilih kategori. Bisa juga scan receipt via OCR (foto Struk) untuk auto-categorize.
- **Ringkasan visual per minggu/bulan** — pie chart sederhana. Nggak perlu ribet, cukup tahu: "Bulan ini udah habis berapa, sisa berapa."
- **Budget vs Actual** — comparison yang jelas. Di mana mereka overruns, di mana bisa dipotong.
- **Kategori expense keluarga Indonesia:**
  - groceries / belanja超市 & pasar
  - pulsa & paket data
  - transportasi (bensin, ojol, parkir)
  - utilities (listrik, air, gas, internet)
  - sekolah & activity anak (SPP, les, seragam, buku)
  - kesehatan (obat, dokter,보험)
  - tagihan rutin (Netflix, Spotify, cicilan)
  - household supplies (sabun, detergent, conmemak)
  - ibadah & donations
  - hiburan & rekreasi
  - pos nggak terduga / emergency fund
  - cosmetics & self-care
  - hadiah &ongkir
  - uang saku anak

**Data yang perlu diinput user:**
- Pendapatan bulanan + sumbernya (suami/istri/usaha lain)
- Budget limit per kategori (bisa adjust per bulan)
- Transaksi expense (bisa manual atau scan receipt)

**Yang jadi reminder:**
- Budget hampir penuh (80% warning)
- Budget habis (100% alert)
- Tagihan yang akan due (3 hari sebelum due date)
- Saat gajian: prompt untuk split budget baru

---

### 1.2 Meal Planner (Rencana Makan Mingguan)

**Use Case Nyata:**

- _"Pagi-pagi bingung mau masak apa — akhirnya makan apapun yang ada di kulkas, atau order Grab. Kalau udah kejadian 3 hari连续, bosan dan dompet menipis."_
- _"Mau bikin minggu ini efisien: hari Senin-Rabu fokus cooking, Kamis leftover warming, Jumat sedikit treats, weekend cooking lebih elaborate. Tapi nggak punya tool yang simpel."_
- _"Zaidan nggak suka wortel — kalau meal plan gaezen, dia akan marah dan makanan dihabiskan."_

**Feature Expansion:**

- **Weekly meal plan grid** — 7 hari × (breakfast, lunch, dinner, snack). Formatnya simpel: grid view.
- **Resep simpan per menu** — kasih nama, bahan-bahan, steps ringkas, estimated cost, dan tag: "vegetarian", "quick <30min", "kid-friendly", "budget-friendly".
- **Auto-generate shopping list** — dari meal plan mingguan, langsung jadi list belanja. Tinggal check off di-toko.
- **Scale resep** — mau masak untuk 2 orang atau 5 orang? Resep langsung scale.
- **Drag-drop swap** — kalau misal hari Kamis ganti menu, tinggal drag aja.
- **Resep recurring** — menu andalan yang sering dipake, taruh di "favorites" supaya muncul di quick-add.
- **Tag dietary/restriction** — Zaidan nggak suka X, Inne nggak bisa makan Y. Sistem hindarin menu yang mengandung itu di weekly plan.

**Weekly Meal Plan Structure:**

```
Minggu: 
- Breakfast: Nasi goreng + telur dadar
- Lunch: Ayam panggang + nasi + lalapan
- Dinner: Soto ayam (masak banyak, sisanya buat besok)
- Snack: Pisang goreng

Senin:
- Breakfast: Oatmeal + pisang
- Lunch: (leftover soto) — pemanasan aja
- Dinner: Tumis kangkung + tahu + nasi
- Snack: Roti + selai

Selasa:
- Breakfast: Telur rebus + roti + susu
- Lunch: Nasi + ayam kecap + tumis buncis
- Dinner: Sup sayuran + roti
- Snack: Buah potong

Rabu:
- Breakfast: Sandwich telur + susu
- Lunch: Mie ayam (masak sendiri, lebih murah)
- Dinner: Ikan bakar + nasi + sambal
- Snack: Es krim (treat anak)

Kamis:
- Breakfast: Nasi uduk简易版 (dari Rice Cooker)
- Lunch: (leftover) 
- Dinner: Pizza homemade (weekend project — weekday quick version: roti pizza siap)
- Snack: Cookies homemade

Jumat:
- Breakfast: French toast + susu
- Lunch: Nasi + rendang ayam + acar
- Dinner: _Makan outside_ ( WEEKLY TREAT — tapi catet di budget)
- Snack: Es teller / es campur

Sabtu:
- Breakfast: Pancake + buah
- Lunch: Nasi kebuli + ayam goreng
- Dinner: BBQ-an sederhana di rumah
- Snack: Kerak telor / jajanan tradisional

Minggu:
- Breakfast: Sarapan special (bubble tea homemade / smoothie bowl)
- Lunch: Makan besar family time
- Dinner: Light — salad / fruit platter
- Snack: Jajanan pasar (tahu isi, bakso, dll)
```

**Weekend Cooking Ideas:**

- Batch cooking: masak 2-3 menu dalam jumlah besar, sisanya masuk freezer (biasanya 2-3 porsi per menu). Tinggal angetin diweekday.
- Prepping: potong semua bahan sayur + protein di awal, masukin container, taruh di kulkas. Diweekday tinggal masak — hemat 30-45 menit.
- Sauces & bases: bikin sambal, kaldu, sauce dasar dalam jumlah banyak, simpen di冰箱. Biasa dipake di weekday.
- Baking: cookies, bolu, roti — bisa dimakan sepekan, atau buat bekal sekolah Zaidan.
- Pickling & fermenting: bikin acar, kimchi, asinan — awet dan murah.

**Data yang perlu diinput user:**
- Meal plan per minggu (bisa copy dari minggu sebelumnya, bisa custom)
- Resep + bahan + cost estimate
- Shopping list (auto-generated, tinggal di-check off)
- Dietary restrictions / food preferences per anggota keluarga

**Yang jadi reminder:**
- Meal plan untuk minggu depan ( tiap hari Kamis malam atau Jumat pagi — supaya bisa prep belanja weekend)
- "Shou want cooking?" atau "Mau masak apa hari ini?" — push 1-2 jam sebelum jam makan
- Shopping list reminder kalau belum complete
- Resep yang bahan-bahannya hampir expired di kulkas (system-driven suggestion)

---

### 1.3 Bill & Subscription Reminder

**Use Case Nyata:**

- _"Tagihan listrik tiba-tiba naik 400% karena nggak sadar moraty cable nunggak 3 bulan. Bisa dicek dari awal."_
- _"Langganan Netflix yang jarang dipake tapi tetap dibayar — kapan ya mulai jarang dibuka?"_
- _"Bayar tagihan空气 kosong karena ATM ngaco — salah input nomor, uang balik 3 hari kerja."_

**Feature Expansion:**

- **Bill tracker** — list semua tagihan: due date, amount, status (paid/unpaid). Bisa scan atau manual entry.
- **Auto-categorize bills:** Utilities (listrik, air, gas, internet,phone), Subscriptions (Netflix, Spotify, Disney+, VIU, Disney+ Hotstar, etc.), Insurance, Credit card, Cicilan, Sekolah/SPP, others.
- **Due date countdown** — "3 hari lagi tagihan GoPay — Rp350.000". Notif 3 hari, 1 hari, dan di hari H.
- **Subscription audit** — tiap awal bulan muncul ringkasan: "Kak, ini langganan yang aktif. Ada yang mau di-unsubscribe?"
- **Payment proof upload** — foto bukti transfer/bayar. Biar nggak debat kalau tiba-tiba diklaim belum bayar.
- **One-tap pay reminder** — notifikasi udah muncul, tinggal tap "Already paid" atau "Remind me later".

**Data yang perlu diinput user:**
- Nama tagihan + jumlah + due date
- Recurring or once-time
- Metode pembayaran (auto-debit / manual)

**Yang jadi reminder:**
- 3 hari sebelum due (soft reminder)
- 1 hari sebelum due (medium warning)
- Hari H (urgent — ini penting banget buat yang auto-debit gagal)
- Minggu pertama tiap bulan: subscription audit

---

### 1.4 Smart Reminders & Scheduling

**Use Case Nyata:**

- _"Zaidan punya lesson piano hari Selasa jam 4, tapi kalau nggak dikasih tau pagi-pagi, bisa lupa. Dan kalau lupa, uang les gone — teacher already blocked the slot."_
- _"Minggu pagi biasanya chaos — semua hal nimbun: cucian, bersih-bersih, cooking prep, kadang kalau ada acara keluarga, double chaos. Butuh sistematik."_

**Feature Expansion:**

- **Daily briefing** — setiap pagi (jam 6-7 pagi) push notification: "Selamat pagi! Hari ini: Zaidan lesson piano 4pm, Inne lunch with friends, Kak Farhan overtime. Jangan lupa: tagihan air due tomorrow."
- **Weekly overview** — setiap hari Minggu malam atau Senin pagi: "Minggu ini: [kalender visual], fokusnya: shopping, laundry marathon, meal prep."
- **Categorized reminders:**
  - Jadwal anak (les, tugas, ujian, sekolah event)
  - Jadwal orang tua (dokter, arisan, reunion)
  - Household tasks (service AC, bersih aquarium, cicilan)
  - Appointment keluarga (imunisasi, dentist, check-up)
  - Special events (ulang tahun, anniversary, holiday)
- **Recurring vs one-time** — recurring set once, auto-generate terus. One-time tinggal add.
- **Family sync** — semua reminder di-share ke semua family member (kalau ada app-nya). Nggak perlu chat "Zaidan jadwal kamu apa?" udah ada di dashboard.
- **Smart snooze** — kalau reminder di-snooze, otomatis muncul lagi 30 menit kemudian atau di waktu yang lebih appropriate.

**Daily/Weekly/Monthly Workflow:**

**DAILY:**
- Pagi (6-7am): Daily briefing — cuaca, jadwal hari ini, reminder penting
- Siang (12pm): "Lunch plan — mau masak apa?" atau "Groceries enough for lunch?"
- Sore (4-5pm): "Reset — mau cooking apa malam ini? Zaidan udah dijemput?"
- Malam (8-9pm): "Plan tomorrow — ada apa aja?" + quick expense log

**WEEKLY:**
- Senin: Review上周 expense + planning本周
- Kamis: Meal plan untuk下周 + groceries shopping
- Jumat: Pre-cooking prep (beli bahan weekend)
- Sabtu-Minggu: Batch cooking, deep cleaning, laundry marathon, quality time

**MONTHLY:**
- Awal bulan: Budget planning baru + gajian split
- Tengah bulan (tanggal 15): Budget check — "udah separuh bulan, sisa budget berapa?"
- Akhir bulan: Month in review — "Fitur mana yang helpful, mana yang waste?"

---

## 2. Additional Features (Dari yang Kak Inne Mention + Lebih)

Kak Inne sudah mention beberapa hal; ini pengembangan lanjutannya:

### 2.1 Shared Family Calendar
- Satu kalender yang bisa di-sync semua family member
- Color-coded: Papa (biru), Mama (merah muda), Zaidan (hijau), Family (orange)
- Bisa add event dari chat — misal "Tambahin jadwal piano Zaidan hari Selasa jam 4" langsung masuk kalender
- Recurring events support (setiap minggu, setiap bulan)

### 2.2 Groceries & Pantry Tracker
- Pantry inventory — "Di kulkas masih ada ayam 2 potong, wortel 3 buah" (manual update, atau scan receipt)
- Auto-suggest meal plan berdasarkan yang ada di kulkas
- Expiry date tracking — "Telur di kulkas expired dalam 3 hari — masak sekarang"
- Shopping list dari pantry low-stock + meal plan

### 2.3 Household Chores Tracker
- Task list rumah: who does what, when
- Visualkan: "Minggu ini: Mama deep clean kitchen, Kak Farhan garage declutter, Zaidan rapikan kamar"
- Rotate tugas supaya fair — logged by design
- Checklist per hari: "Kak Farhan, tolong keluarkan trash ya" — assignable + trackable

### 2.4 Family Rewards / Point System
- Sistem poin buat Zaidan: selesai PR dapat 10 poin, beresin kamar 15 poin, dll
- Poin bisa dituker: 100 poin = 30 menit extra screen time, 500 poin = mainan kecil
- Ini bikin task management-nya fun, bukan "because I said so"

### 2.5 Emergency Contacts & Info
- Phone number, address, blood type, allergies — semua dalam satu tempat
- Dokumen penting: KTP, KK, passports, akta lahir — semua discan dan disimpan
- Asuransi info:polis, nomor klaim, agen contact

### 2.6 Family Memory / Journal
- Daily recap: "Apa yang special hari ini?" — bisa foto atau short text
- Milestone tracker: "Zaidan pertama kali naik sepeda!"
- Anniversary penting: "1 tahun lalu — pertama kali ke Bandung!"
- Growth chart Zaidan: tinggi, berat, milestone

### 2.7 Quick Actions Hub
- Homescreen widget: 4-6 tombol aksi cepat
- "Add Expense", "Lihat Budget", "Meal Plan", "Reminder Baru", "Cek Tagihan", "Lihat Kalender"

---

## 3. Pain Points & Solusi

### Pain Point 1: Budget Blowout
**Masalah:** Di tengah bulan udah kosong karena tidak ada visibility.
**Solusi:** 
- Budget tracker dengan real-time update
- 80% warning push notification
- Weekly expense recap (Rabu malam — "Udah Rp4jt dari budget Rp6jt, hati-hati ya Kak")

### Pain Point 2: Bayar Tagihan Telat
**Masalah:** Kena denda, layanan dimatikan, atau auto-debit gagal.
**Solusi:**
- Due date reminder: 3 days, 1 day, day-of
- Auto-categorize semua tagihan
- Payment proof upload

### Pain Point 3: Lupa Jadwal Anak
**Masalah:** Lesson piano, dentist appointment, school event — hilang dari radar.
**Solusi:**
- Recurring calendar event
- Daily briefing setiap pagi
- Family-shared calendar

### Pain Point 4: Makan BSeragam (Bingung Sama sekali)
**Masalah:** Pagi-pagi bingung mau masak apa, akhirya order — mahal dan nggak sehat.
**Solusi:**
- Weekly meal plan + shopping list
- Batch cooking di weekend
- Quick 15-30 menit recipe collection

### Pain Point 5: Cucian Menumpuk
**Masalah:** Weekend cuma bisa laundry + drying — nggak selesai-selesai kalau cucian banyak.
**Solusi:**
- Laundry schedule per load (Rabu: towels only, Jumat: bedsheets, dll)
- Dryer/indoor rack rotation kalau hujan
- Assign siapa yang lipat kalau ada anak (Zaidan: small items — socks, underwear)

### Pain Point 6: Domestik Chaos Weekend
**Masalah:** Sabtu-Minggu mau produktif tapi malah chaos — semua tasks bersamaan.
**Solusi:**
- Designated days per task:
  - Sabtu: Grocery run + batch cooking
  - Minggu: Deep clean (1 room focus per week) + family time
- Weekly reset checklist: "Saturday reset" — clear fridge, restock, review week

### Pain Point 7: Nggak Tau Budget Sisa Berapa
**Masalah:** Gaji udah keluar, tapi nggak keliatan "sisa" — angka di ATM bukan indikator.
**Solusi:**
- Smart budget dashboard — saldo cashflow + kategori terpakai vs sisa
- Monthly snapshot visual — "Uang masuk Rp20jt, keluar Rp17jt, tabungan +Rp3jt"

### Pain Point 8: Info Serak-Serek (Mau Dapat Info Tapi Di Chat)
**Masalah:** Semua info di WhatsApp group — penting semua, tapi scroll 1000 message buat dapat 1 info.
**Solusi:**
- Dashboard centralized: semua reminder, budget, meal plan di satu tempat
- Quick search: "Zaidan jadwal apa besok?" — satu query

---

## 4. Notification & Reminder Strategy

### Push Notification Philosophy
**"Useful, not spammy."** Kalau semua chat masuk semua notifikasi, lama-lama di-mute semua.

### Notification Types & Timing

| Type | Timing | Contoh |
|------|--------|--------|
| Daily Briefing | 6:30am setiap hari | "Selamat pagi! Hari ini: Zaidan piano 4pm. Cuaca:☀️" |
| Meal Plan Reminder | 8am (1hr sebelum grocery shop kalau sudah mulai meal plan) | "Hari ini meal plan: Soto ayam + lunch prep. Ingredients ready?" |
| Budget Warning | Real-time (saat expense added) kalau >80% | "Budget groceries udah 85% terpakai nih Kak. Sisa Rp420.000" |
| Bill Reminder (3 days) | 8am, 3 hari sebelum due | "Tagihan WiFi Rp350.000 due Saturday" |
| Bill Reminder (1 day) | 8am, 1 hari sebelum due | "Tagihan WiFi due besok! Jangan lupa transfer ya" |
| Bill Reminder (Day-of) | 8am, hari due | "H-0! Tagihan WiFi hari ini. Already paid?" |
| Weekly Meal Plan Prep | Jumat 6pm | "Weekend mau masak apa? Yuk prep meal plan下周" |
| Weekly Budget Review | Senin 8am | "Minggu ini budget: sudah terpakai X dari Y" |
| Monthly Budget Planning | Tanggal 1 setiap bulan (atau hari gajian) | "Gaji udah masuk! Yuk split budget bulan ini" |
| Subscription Audit | Tanggal 5 setiap bulan | "Ada 4 langganan aktif. Ada yang mau di-unsub?" |
| Weekend Productivity | Sabtu 9am | "Weekend plan: batch cooking + laundry. Mau mulai yang mana?" |
| Kid Activity Reminder | 1 jam sebelum event | "Zaidan piano lesson 1 jam lagi! Jangan lupa" |

### Do NOT Disturb (DND) Rules
- Quiet hours: 10pm - 6am (kecuali urgent bill reminders)
- If budget already overspent: 1 warning per day max, tidak spam
- After user says "stop" or snoozes: no repeat for 4 hours minimum

### Channel Preferences
- **WhatsApp:** Friendly reminder format, casual language. Nggak formal.
- **Dashboard/PWA:** Visual, charts, quick actions
- **Email:** Weekly summary only — inboxClean
- **SMS:** Only for URGENT financial alerts (over-budget emergency, bill past due)

---

## 5. Ringkasan Kategori Expense Keluarga Indonesia

### Fixed Expenses (Fixed Cost Bulanan)
- Listrik (bulanan atau ber token — tergantung)
- Air (PAM/PDAM)
- Gas LPG / gas pipa
- Internet + TV (Biznet, Indihome, First Media, dll)
- Pulsa / Paket data (seluruh keluarga — sim card tracker)
- Streaming subscriptions (Netflix, Spotify, VIU, Disney+ Hotstar, dll)
- Asuransi (health, life, kendaraan)
- Cicilan (motor, mobil, KPR, KUR)
- SPP / tuition anak
- Maintenance rumah / kontrakan

### Variable Expenses (Variable Cost Bulanan)
- Groceries / belanja超市 & pasar (MAKANAN — ini biggest variable)
- Transportasi (bensin, ojol, parkir, tol — kalau pakai kendaraan)
- Maintenance kendaraan (servis rutin, ban, oli)
- Kesehatan (obat, vitamin, dokter, rumah sakit — diluar asuransi)
- Household supplies (sabun, detergent, disinfectant,cemak)
- School supplies (buku, alat tulis, seragam)
- Clothing & footwear
- Ibadah & donations (infaq, sedekah, zakat)
- Kehidupan sosial (ulang tahun hadiah,ongkir, arisan)
- Hiburan & rekreasi (nonton, makan outside,主题乐园)
- Self-care (salon, spa — kalau ada budgetnya)
- Kontribusi orang tua / keluarga ( kalau ada)

### Periodic / Irregular Expenses
- Renovasi / repair rumah
- Gadget upgrade
- Asuransi tahunan (renewal)
- Pajak kendaraan (5 tahunan — tapi tiap tahun ada SWDKLLJ)
- Biaya sekolah besar (PPDB, daftar ulang, study tour)
- Emergency medical

### Savings & Investment (Seharusnya Dipisah!)
- Dana darurat
- Tabungan pendidikan anak
- Deposito / reksadana
- Dana pensiun

---

## 6. MVP Priority Ranking

Kalau harus prioritize — build yang paling pain-points solving dulu:

1. **Budget Tracker + Bill Reminders** — ini paling immediate impact. Habis duit, panic. Tagihan telat, denda. Solve ini dulu.
2. **Meal Planner** — second most impactful. Kalau ini jalan, bisa hemat Rp500rb-1jt per bulan dari kurang order.
3. **Shared Calendar + Smart Reminders** — third. координация semua jadwal keluarga. Ini digital brain-nya rumah.
4. **Groceries & Pantry Tracker** — fourth. Bikin meal plan work lebih smooth.
5. **Household Chores + Rewards System** — fifth. Untuk saat ini, optional tapi nice-to-have.
6. **Family Memory / Emergency Info** — sixth. Nice to have, bukan urgent.
7. **Quick Actions Hub** — ongoing polish.

---

_Ini semua di-view dari perspective: "Kalau aku jadi user — ibu rumah tangga, managing everything — apa yang bikin hidupku lebih легкий dan less chaotic?"_
