// seed-bills.js - Script untuk seed tagihan ke IndexedDB
// Jalankan di browser console pada halaman SuperFamily Dashboard

const SEED_BILLS = [
  // Tagihan Pendidikan Zaidan (1) - tiap tanggal 26, 300rb, sampai Jan 2029
  {
    title: 'Pendidikan Zaidan (1)',
    amount: 300000,
    dueDate: '2026-04-26',
    frequency: 'monthly',
    category: 'pendidikan',
    isPaid: false,
    note: 'Auto-debit tiap tanggal 26, berlaku sampai Jan 2029'
  },
  // Tagihan Pendidikan Zaidan (2) - tiap tanggal 26, 700rb, sampai Jan 2034
  {
    title: 'Pendidikan Zaidan (2)',
    amount: 700000,
    dueDate: '2026-04-26',
    frequency: 'monthly',
    category: 'pendidikan',
    isPaid: false,
    note: 'Auto-debit tiap tanggal 26, berlaku sampai Jan 2034'
  },
  // KPR - 6.1jt tanggal 28, sampai 10 tahun
  {
    title: 'KPR (Cicilan Rumah)',
    amount: 6100000,
    dueDate: '2026-04-28',
    frequency: 'monthly',
    category: 'cicilan',
    isPaid: false,
    note: 'Auto-debit tanggal 28, tenor 10 tahun'
  },
  // Kartu Kredit - nominal varies, set 0
  {
    title: 'Kartu Kredit',
    amount: 0,
    dueDate: '2026-04-28',
    frequency: 'monthly',
    category: 'lainnya',
    isPaid: false,
    note: 'Nominal bervariasi tiap bulan'
  },
  // IPL - 150rb tanggal 1
  {
    title: 'IPL',
    amount: 150000,
    dueDate: '2026-05-01',
    frequency: 'monthly',
    category: 'ipl',
    isPaid: false,
    note: 'Auto-debit tanggal 1 setiap bulan'
  },
  // Air - nominal varies, tanggal 26
  {
    title: 'Air',
    amount: 0,
    dueDate: '2026-04-26',
    frequency: 'monthly',
    category: 'air',
    isPaid: false,
    note: 'Nominal tergantung hasil cek meteran'
  },
  // Token Listrik - 500rb tanggal 25
  {
    title: 'Token Listrik',
    amount: 500000,
    dueDate: '2026-04-25',
    frequency: 'monthly',
    category: 'lainnya',
    isPaid: false,
    note: 'Pembelian token tiap tanggal 25'
  }
]

const SEED_REMINDERS = [
  // Tagihan ART - 425rb per minggu sampai 12 May 2026
  {
    title: 'Gaji ART',
    amount: 425000,
    dueDate: '2026-04-29',
    frequency: 'weekly',
    category: 'lainnya',
    isPaid: false,
    note: 'Bayar setiap minggu, sampai 12 May 2026'
  },
  {
    title: 'Gaji ART',
    amount: 425000,
    dueDate: '2026-05-06',
    frequency: 'weekly',
    category: 'lainnya',
    isPaid: false,
    note: 'Bayar setiap minggu, sampai 12 May 2026'
  },
  {
    title: 'Gaji ART',
    amount: 425000,
    dueDate: '2026-05-12',
    frequency: 'weekly',
    category: 'lainnya',
    isPaid: false,
    note: 'Pembayaran terakhir ART (12 May 2026)'
  }
]

// Helper to format currency
function formatCurrency(num) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num)
}

// Main seed function
async function seedAllBills() {
  if (!window.db) {
    alert('IndexedDB belum tersedia. Pastikan halaman SuperFamily Dashboard sudah loaded.')
    return
  }

  console.log('🟢 Memulai seed tagihan...')
  
  let billCount = 0
  let remCount = 0

  for (const bill of SEED_BILLS) {
    try {
      await window.db.bills.add({
        ...bill,
        notifiedAt: null,
        createdAt: new Date()
      })
      billCount++
      console.log(`  ✅ Bill added: ${bill.title} - ${formatCurrency(bill.amount)}`)
    } catch (err) {
      console.log(`  ⚠️ Bill failed: ${bill.title}`, err.message)
    }
  }

  for (const rem of SEED_REMINDERS) {
    try {
      await window.db.reminders.add({
        ...rem,
        duration: 'one_time',
        notifiedAt: null,
        createdAt: new Date()
      })
      remCount++
      console.log(`  ✅ Reminder added: ${rem.title} - ${formatCurrency(rem.amount)} (${rem.dueDate})`)
    } catch (err) {
      console.log(`  ⚠️ Reminder failed: ${rem.title}`, err.message)
    }
  }

  console.log(`\n🎉 Selesai! ${billCount} tagihan dan ${remCount} pengingat berhasil diinput.`)
  console.log('🔄 Refresh halaman untuk melihat hasil.')

  // Auto reload after 2 seconds
  setTimeout(() => window.location.reload(), 2000)
}

// Export for console
window.seedAllBills = seedAllBills
console.log('✅ Seed script loaded. Jalankan: seedAllBills()')
