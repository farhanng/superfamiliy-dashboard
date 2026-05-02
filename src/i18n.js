// i18n.js - Sistem terjemahan bilingual (ID/EN)
// Di-load saat app start, simpan preference di localStorage

const translations = {
  id: {
    // Navigation
    nav_home: 'Beranda',
    nav_budget: 'Budget',
    nav_events: 'Agenda',
    nav_mealplan: 'Makan',
    nav_weekend: 'Weekend',
    nav_bills: 'Tagihan',

    // Home
    home_greeting: 'Selamat Datang',
    home_budget_summary: 'Ringkasan Budget',
    home_upcoming_events: 'Agenda Mendatang',
    home_bills_due: 'Tagihan Akan Jatuh Tempo',
    home_no_events: 'Tidak ada agenda mendatang',
    home_no_bills: 'Tidak ada tagihan mendatang',

    // Budget
    budget_title: 'Budget Bulanan',
    budget_spent: 'Terpakai',
    budget_remaining: 'Sisa',
    budget_over: 'Melebihi budget',
    budget_add: 'Tambah Transaksi',
    budget_edit: 'Edit Transaksi',
    budget_amount: 'Jumlah',
    budget_category: 'Kategori',
    budget_date: 'Tanggal',
    budget_note: 'Catatan',
    budget_save: 'Simpan',
    budget_delete: 'Hapus',
    budget_no_transactions: 'Belum ada transaksi',
    budget_set_budget: 'Set Budget Bulanan',
    budget_total: 'Total',
    budget_filter_month: 'Filter Bulan',
    budget_today: 'Hari Ini',
    budget_categories: {
      makan: 'Makan & Minum',
      transportasi: 'Transportasi',
      belanja: 'Belanja Rumah',
      zaidan: 'Zaidan',
      utilitas: 'Utilitas',
      lainnya: 'Lain-Lain',
      // Income categories
      salary_farhan: 'Gaji Farhan',
      salary_inne: 'Gaji Inne',
      freelance: 'Freelance',
      thr: 'THR',
      ortu_gift: 'Gift Ortu',
      other_income: 'Pemasukan Lain',
      // Loan/Credit
      loan: 'Cicilan',
      // Special
      core_needed: 'Core Needed',
      budget_personal: 'Budget Pribadi',
      gift: 'Hadiah',
      deposit: 'Deposit',
      utility: 'Utilitas'
    },
    budget_type_income: 'Pemasukan',
    budget_type_expense: 'Pengeluaran',
    budget_summary: 'Ringkasan',
    budget_income: 'Total Pemasukan',
    budget_expense: 'Total Pengeluaran',
    budget_cash_left: 'Sisa Cash',
    budget_status_done: 'Lunas',
    budget_status_not_done: 'Belum Lunas',
    budget_transaction_type: 'Tipe Transaksi',

    // Events
    events_title: 'Agenda Keluarga',
    events_add: 'Tambah Agenda',
    events_edit: 'Edit Agenda',
    events_name: 'Nama Agenda',
    events_date: 'Tanggal',
    events_type: 'Tipe',
    events_save: 'Simpan',
    events_delete: 'Hapus',
    events_no_events: 'Belum ada agenda',
    events_upcoming: 'Agenda Mendatang',
    events_types: {
      birthday: 'Ulang Tahun',
      anniversary: 'Anniversary',
      school: 'Event Sekolah',
      holiday: 'Hari Besar',
      other: 'Lain-Lain'
    },
    events_today: 'Hari Ini',
    events_this_week: 'Minggu Ini',

    // Meal Plan
    mealplan_title: 'Rencana Makan',
    mealplan_add: 'Tambah Menu',
    mealplan_copy_week: 'Salin Minggu Lalu',
    mealplan_breakfast: 'Sarapan',
    mealplan_lunch: 'Makan Siang',
    mealplan_dinner: 'Makan Malam',
    mealplan_save: 'Simpan',
    mealplan_no_menu: 'Belum ada menu',
    mealplan_days: {
      monday: 'Senin',
      tuesday: 'Selasa',
      wednesday: 'Rabu',
      thursday: 'Kamis',
      friday: 'Jumat',
      saturday: 'Sabtu',
      sunday: 'Minggu'
    },

    // Weekend
    weekend_title: 'Aktivitas Weekend',
    weekend_add: 'Tambah Aktivitas',
    weekend_done: 'Selesai',
    weekend_pending: 'Belum',
    weekend_progress: 'Progress',
    weekend_no_activities: 'Belum ada aktivitas',
    weekend_categories: {
      outdoor: 'Outdoor',
      indoor: 'Indoor',
      education: 'Edukasi',
      family: 'Quality Time'
    },
    weekend_saturday: 'Sabtu',
    weekend_sunday: 'Minggu',

    // Bills
    bills_title: 'Tagihan',
    bills_add: 'Tambah Tagihan',
    bills_edit: 'Edit Tagihan',
    bills_name: 'Nama Tagihan',
    bills_amount: 'Jumlah',
    bills_due_date: 'Tanggal Jatuh Tempo',
    bills_paid: 'Lunas',
    bills_unpaid: 'Belum Lunas',
    bills_mark_paid: 'Tandai Lunas',
    bills_save: 'Simpan',
    bills_delete: 'Hapus',
    bills_no_bills: 'Belum ada tagihan',
    bills_total_month: 'Total Bulan Ini',
    bills_due_soon: 'Akan Jatuh Tempo',
    bills_overdue: 'Lewat Jatuh Tempo',
    bills_categories: {
      air: 'Air',
      ipl: 'IPL',
      cicilan: 'Cicilan',
      internet: 'Internet',
      pendidikan: 'Pendidikan',
      lainnya: 'Lain-Lain'
    },
    bills_frequency: 'Frekuensi',
    bills_weekly: 'Mingguan',
    bills_monthly: 'Bulanan',
    bills_yearly: 'Tahunan',
    bills_one_time: 'Sekali',
    events_holidays_week: 'Hari Libur Minggu Ini',

    // Tax Reminders
    tax_title: 'Pengingat Pajak',
    tax_add: 'Tambah',
    tax_name: 'Nama',
    tax_amount: 'Jumlah',
    tax_due_date: 'Tanggal Jatuh Tempo',
    tax_paid: 'Lunas',
    tax_unpaid: 'Belum Lunas',
    tax_save: 'Simpan',
    tax_delete: 'Hapus',
    tax_no_items: 'Belum ada pengingat',
    tax_duration: 'Durasi',
    tax_one_time: 'Sekali',
    tax_1_year: '1 Tahun',
    tax_5_years: '5 Tahun',

    // Common
    common_save: 'Simpan',
    common_cancel: 'Batal',
    common_delete: 'Hapus',
    common_edit: 'Edit',
    common_add: 'Tambah',
    common_close: 'Tutup',
    common_loading: 'Memuat...',
    common_error: 'Terjadi kesalahan',
    common_success: 'Berhasil',
    common_no_data: 'Tidak ada data',
    common_confirm_delete: 'Yakin ingin menghapus?',
    common_yes: 'Ya',
    common_no: 'Tidak',

    // Settings
    settings_language: 'Bahasa',
    settings_theme: 'Tema'
  },

  en: {
    // Navigation
    nav_home: 'Home',
    nav_budget: 'Budget',
    nav_events: 'Events',
    nav_mealplan: 'Meal',
    nav_weekend: 'Weekend',
    nav_bills: 'Bills',

    // Home
    home_greeting: 'Welcome',
    home_budget_summary: 'Budget Summary',
    home_upcoming_events: 'Upcoming Events',
    home_bills_due: 'Bills Due Soon',
    home_no_events: 'No upcoming events',
    home_no_bills: 'No bills due',

    // Budget
    budget_title: 'Monthly Budget',
    budget_spent: 'Spent',
    budget_remaining: 'Remaining',
    budget_over: 'Over budget',
    budget_add: 'Add Transaction',
    budget_edit: 'Edit Transaction',
    budget_amount: 'Amount',
    budget_category: 'Category',
    budget_date: 'Date',
    budget_note: 'Note',
    budget_save: 'Save',
    budget_delete: 'Delete',
    budget_no_transactions: 'No transactions yet',
    budget_set_budget: 'Set Monthly Budget',
    budget_total: 'Total',
    budget_filter_month: 'Filter Month',
    budget_today: 'Today',
    budget_categories: {
      makan: 'Food & Drinks',
      transportasi: 'Transportation',
      belanja: 'Groceries',
      zaidan: 'Zaidan',
      utilitas: 'Utilities',
      lainnya: 'Other',
      // Income
      salary_farhan: 'Farhan Salary',
      salary_inne: 'Inne Salary',
      freelance: 'Freelance',
      thr: 'Holiday Allowance',
      ortu_gift: 'Parent Gift',
      other_income: 'Other Income',
      // Loan/Credit
      loan: 'Loan',
      // Special
      core_needed: 'Core Needed',
      budget_personal: 'Personal Budget',
      gift: 'Gift',
      deposit: 'Deposit',
      utility: 'Utilities'
    },
    budget_type_income: 'Income',
    budget_type_expense: 'Expense',
    budget_summary: 'Summary',
    budget_income: 'Total Income',
    budget_expense: 'Total Expense',
    budget_cash_left: 'Cash Left',
    budget_status_done: 'Paid',
    budget_status_not_done: 'Unpaid',
    budget_transaction_type: 'Transaction Type',

    // Events
    events_title: 'Family Events',
    events_add: 'Add Event',
    events_edit: 'Edit Event',
    events_name: 'Event Name',
    events_date: 'Date',
    events_type: 'Type',
    events_save: 'Save',
    events_delete: 'Delete',
    events_no_events: 'No events yet',
    events_upcoming: 'Upcoming Events',
    events_types: {
      birthday: 'Birthday',
      anniversary: 'Anniversary',
      school: 'School Event',
      holiday: 'Holiday',
      other: 'Other'
    },
    events_today: 'Today',
    events_this_week: 'This Week',

    // Meal Plan
    mealplan_title: 'Meal Plan',
    mealplan_add: 'Add Menu',
    mealplan_copy_week: 'Copy Last Week',
    mealplan_breakfast: 'Breakfast',
    mealplan_lunch: 'Lunch',
    mealplan_dinner: 'Dinner',
    mealplan_save: 'Save',
    mealplan_no_menu: 'No menu yet',
    mealplan_days: {
      monday: 'Monday',
      tuesday: 'Tuesday',
      wednesday: 'Wednesday',
      thursday: 'Thursday',
      friday: 'Friday',
      saturday: 'Saturday',
      sunday: 'Sunday'
    },

    // Weekend
    weekend_title: 'Weekend Activities',
    weekend_add: 'Add Activity',
    weekend_done: 'Done',
    weekend_pending: 'Pending',
    weekend_progress: 'Progress',
    weekend_no_activities: 'No activities yet',
    weekend_categories: {
      outdoor: 'Outdoor',
      indoor: 'Indoor',
      education: 'Education',
      family: 'Family Time'
    },
    weekend_saturday: 'Saturday',
    weekend_sunday: 'Sunday',

    // Bills
    bills_title: 'Bills',
    bills_add: 'Add Bill',
    bills_edit: 'Edit Bill',
    bills_name: 'Bill Name',
    bills_amount: 'Amount',
    bills_due_date: 'Due Date',
    bills_paid: 'Paid',
    bills_unpaid: 'Unpaid',
    bills_mark_paid: 'Mark as Paid',
    bills_save: 'Save',
    bills_delete: 'Delete',
    bills_no_bills: 'No bills yet',
    bills_total_month: 'Total This Month',
    bills_due_soon: 'Due Soon',
    bills_overdue: 'Overdue',
    bills_categories: {
      air: 'Water',
      ipl: 'Maintenance',
      cicilan: 'Installment',
      internet: 'Internet',
      pendidikan: 'Education',
      lainnya: 'Other'
    },
    bills_frequency: 'Frequency',
    bills_weekly: 'Weekly',
    bills_monthly: 'Monthly',
    bills_yearly: 'Yearly',
    bills_one_time: 'One-time',
    events_holidays_week: 'This Week\'s Holidays',

    // Tax Reminders
    tax_title: 'Tax Reminders',
    tax_add: 'Add',
    tax_name: 'Name',
    tax_amount: 'Amount',
    tax_due_date: 'Due Date',
    tax_paid: 'Paid',
    tax_unpaid: 'Unpaid',
    tax_save: 'Save',
    tax_delete: 'Delete',
    tax_no_items: 'No reminders yet',
    tax_duration: 'Duration',
    tax_one_time: 'One-time',
    tax_1_year: '1 Year',
    tax_5_years: '5 Years',

    // Common
    common_save: 'Save',
    common_cancel: 'Cancel',
    common_delete: 'Delete',
    common_edit: 'Edit',
    common_add: 'Add',
    common_close: 'Close',
    common_loading: 'Loading...',
    common_error: 'An error occurred',
    common_success: 'Success',
    common_no_data: 'No data',
    common_confirm_delete: 'Are you sure you want to delete?',
    common_yes: 'Yes',
    common_no: 'No',

    // Settings
    settings_language: 'Language',
    settings_theme: 'Theme'
  }
}

// Current language state
let currentLang = localStorage.getItem('sfd_lang') || 'id'

// Get translation for a key
export function t(key) {
  const keys = key.split('.')
  let value = translations[currentLang]
  for (const k of keys) {
    value = value?.[k]
  }
  return value || key
}

// Get current language
export function getLang() {
  return currentLang
}

// Set language
export function setLang(lang) {
  if (translations[lang]) {
    currentLang = lang
    localStorage.setItem('sfd_lang', lang)
    // Dispatch event for UI updates
    window.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }))
    return true
  }
  return false
}

// Toggle language
export function toggleLang() {
  return setLang(currentLang === 'id' ? 'en' : 'id')
}

// Get available languages
export function getAvailableLangs() {
  return Object.keys(translations)
}

export default { t, getLang, setLang, toggleLang, getAvailableLangs }
