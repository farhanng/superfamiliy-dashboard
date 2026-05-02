// holidays-id.js - Indonesian holidays for 2026
// Source: harilibur.co.id (official Indonesian holiday calendar)
// Note: Dates are based on available data - verify with resmi sources

export const HOLIDAYS_2026 = [
  // Januari
  { date: '2026-01-01', name: 'Tahun Baru 2026', type: 'national' },
  { date: '2026-01-16', name: 'Isra Mikraj Nabi Muhammad SAW', type: 'religious' },

  // Februari
  { date: '2026-02-17', name: 'Tahun Baru Imlek 2577', type: 'religious' },

  // Maret
  { date: '2026-03-19', name: 'Hari Raya Nyepi 2026', type: 'religious' },
  { date: '2026-03-20', name: 'Lebaran Holiday', type: 'religious' },
  { date: '2026-03-21', name: 'Lebaran Holiday', type: 'religious' },
  { date: '2026-04-03', name: 'Jumat Agung', type: 'religious' },

  // Mei
  { date: '2026-05-01', name: 'Hari Buruh Internasional', type: 'national' },
  { date: '2026-05-14', name: 'Kenaikan Isa Almasih', type: 'religious' },
  { date: '2026-05-27', name: 'Idul Adha 2026', type: 'religious' },
  { date: '2026-05-31', name: 'Hari Raya Waisak 2569', type: 'religious' },

  // Juni
  { date: '2026-06-01', name: 'Hari Pancasila', type: 'national' },
  { date: '2026-06-17', name: 'Tahun Baru Hijriyah 1448', type: 'religious' },

  // Agustus
  { date: '2026-08-17', name: 'Hari Ulang Tahun Kemerdekaan RI ke-81', type: 'national' },
  { date: '2026-08-25', name: 'Maulid Nabi Muhammad SAW', type: 'religious' },

  // Desember
  { date: '2026-12-25', name: 'Natal 2026', type: 'religious' },
]

// Personal events (non-holiday)
export const PERSONAL_EVENTS = [
  { date: '2026-05-27', name: 'Ulang Tahun Farhan', type: 'personal' },
]

// Get all events (holidays + personal)
export function getAllEvents() {
  return [...HOLIDAYS_2026, ...PERSONAL_EVENTS].sort((a, b) => a.date.localeCompare(b.date))
}

// Get holidays by month
export function getHolidaysByMonth(year, month) {
  const monthStr = `${year}-${String(month).padStart(2, '0')}`
  return HOLIDAYS_2026.filter(h => h.date.startsWith(monthStr))
}

// Get all holidays in date range
export function getHolidaysBetween(startDate, endDate) {
  return HOLIDAYS_2026.filter(h => h.date >= startDate && h.date <= endDate)
}

// Check if date is a holiday
export function isHoliday(dateStr) {
  return HOLIDAYS_2026.some(h => h.date === dateStr)
}

// Get holiday by date
export function getHoliday(dateStr) {
  return HOLIDAYS_2026.find(h => h.date === dateStr)
}

// Get personal event by date
export function getPersonalEvent(dateStr) {
  return PERSONAL_EVENTS.find(e => e.date === dateStr)
}

// Get event (holiday or personal) by date
export function getEvent(dateStr) {
  return getHoliday(dateStr) || getPersonalEvent(dateStr)
}

// Indonesian holiday types with colors
export const HOLIDAY_TYPES = {
  national: { color: '#dc2626', label: 'Libur Nasional', bgClass: 'bg-red-100' },
  religious: { color: '#7c3aed', label: 'Hari Besar Religion', bgClass: 'bg-purple-100' },
  commemorative: { color: '#2563eb', label: 'Hari Peringatan', bgClass: 'bg-blue-100' },
  astronomical: { color: '#374151', label: 'Fenomena Astronomy', bgClass: 'bg-gray-100' },
  event: { color: '#059669', label: 'Event', bgClass: 'bg-green-100' },
  personal: { color: '#db2777', label: 'Pribadi', bgClass: 'bg-pink-100' },
}

export default HOLIDAYS_2026
