// db.js - IndexedDB setup via Dexie.js
// Menyimpan semua data aplikasi secara offline-first

import Dexie from 'dexie'

// Inisialisasi database
const db = new Dexie('SuperFamilyDB')

// Expose db ke window untuk console access
window.db = db

// Schema database
// Version 1: Initial schema
// Version 2: Added type (income/expense), status (done/not_done) to transactions
db.version(2).stores({
  // Budget & Transactions
  transactions: '++id, amount, category, date, note, type, status, createdAt, updatedAt',
  budget: 'id, month, amount, updatedAt',

  // Calendar Events
  events: '++id, title, date, type, color, notifyDays, note, createdAt',

  // Meal Plans
  mealPlans: '++id, weekStart, createdAt',


  // Weekend Activities
  weekendActivities: '++id, date, createdAt',

  // Bills
  bills: '++id, title, amount, dueDate, frequency, category, isPaid, paidDate, notifyBefore, notifiedAt, note, createdAt',


  // Tax/Document Reminders
  reminders: '++id, title, amount, dueDate, frequency, category, isPaid, paidDate, notifyBefore, notifiedAt, note, createdAt'
})

// =====================
// Budget Functions
// =====================

export async function addTransaction(data) {
  return await db.transactions.add({
    ...data,
    createdAt: new Date(),
    updatedAt: new Date()
  })
}

export async function updateTransaction(id, data) {
  return await db.transactions.update(id, {
    ...data,
    updatedAt: new Date()
  })
}

export async function deleteTransaction(id) {
  return await db.transactions.delete(id)
}

export async function getTransactionsByMonth(year, month) {
  const startDate = `${year}-${String(month).padStart(2, '0')}-01`
  const endDate = month === 12
    ? `${year + 1}-01-01`
    : `${year}-${String(month + 1).padStart(2, '0')}-01`

  return await db.transactions
    .where('date')
    .between(startDate, endDate, true, false)
    .toArray()
}

export async function getTransactionsByDate(date) {
  return await db.transactions.where('date').equals(date).toArray()
}

export async function getAllTransactions() {
  return await db.transactions.toArray()
}

export async function getMonthlyBudget(month) {
  // month format: YYYY-MM
  return await db.budget.where('month').equals(month).first()
}

export async function setMonthlyBudget(month, amount) {
  const existing = await db.budget.where('month').equals(month).first()
  if (existing) {
    return await db.budget.update(existing.id, { amount, month, updatedAt: new Date() })
  } else {
    return await db.budget.add({ id: month, month, amount, updatedAt: new Date() })
  }
}

// =====================
// Events Functions
// =====================

export async function addEvent(data) {
  return await db.events.add({
    ...data,
    createdAt: new Date()
  })
}

export async function updateEvent(id, data) {
  return await db.events.update(id, data)
}

export async function deleteEvent(id) {
  return await db.events.delete(id)
}

export async function getAllEvents() {
  return await db.events.toArray()
}

export async function getUpcomingEvents(days = 30) {
  const today = new Date()
  const futureDate = new Date(today)
  futureDate.setDate(futureDate.getDate() + days)

  const todayStr = today.toISOString().split('T')[0]
  const futureStr = futureDate.toISOString().split('T')[0]

  return await db.events
    .where('date')
    .between(todayStr, futureStr, true, true)
    .toArray()
}

export async function getEventsByMonth(year, month) {
  const startDate = `${year}-${String(month).padStart(2, '0')}-01`
  const endDate = month === 12
    ? `${year + 1}-01-01`
    : `${year}-${String(month + 1).padStart(2, '0')}-01`

  return await db.events
    .where('date')
    .between(startDate, endDate, true, false)
    .toArray()
}

// =====================
// Meal Plan Functions
// =====================

export async function addMealPlan(data) {
  return await db.mealPlans.add({
    ...data,
    createdAt: new Date()
  })
}

export async function updateMealPlan(id, data) {
  return await db.mealPlans.update(id, data)
}

export async function deleteMealPlan(id) {
  return await db.mealPlans.delete(id)
}

export async function getMealPlanByWeek(weekStart) {
  // weekStart format: YYYY-MM-DD (Monday)
  return await db.mealPlans.where('weekStart').equals(weekStart).first()
}

export async function getAllMealPlans() {
  return await db.mealPlans.toArray()
}

// =====================
// Weekend Activities Functions
// =====================

export async function addWeekendActivity(data) {
  return await db.weekendActivities.add({
    ...data,
    createdAt: new Date()
  })
}

export async function updateWeekendActivity(id, data) {
  return await db.weekendActivities.update(id, data)
}

export async function deleteWeekendActivity(id) {
  return await db.weekendActivities.delete(id)
}

export async function getWeekendActivitiesByDate(date) {
  return await db.weekendActivities.where('date').equals(date).first()
}

export async function getAllWeekendActivities() {
  return await db.weekendActivities.toArray()
}

// =====================
// Bills Functions
// =====================

export async function addBill(data) {
  return await db.bills.add({
    ...data,
    isPaid: false,
    createdAt: new Date()
  })
}

export async function updateBill(id, data) {
  return await db.bills.update(id, data)
}

export async function deleteBill(id) {
  return await db.bills.delete(id)
}

export async function markBillPaid(id) {
  return await db.bills.update(id, {
    isPaid: true,
    paidDate: new Date().toISOString().split('T')[0]
  })
}

export async function markBillUnpaid(id) {
  return await db.bills.update(id, {
    isPaid: false,
    paidDate: null
  })
}

export async function getAllBills() {
  return await db.bills.toArray()
}

export async function getUnpaidBills() {
  return await db.bills.where('isPaid').equals(0).toArray()
}

export async function getBillsDueSoon(days = 7) {
  const today = new Date()
  const futureDate = new Date(today)
  futureDate.setDate(futureDate.getDate() + days)

  const todayStr = today.toISOString().split('T')[0]
  const futureStr = futureDate.toISOString().split('T')[0]

  return await db.bills
    .filter(bill => !bill.isPaid && bill.dueDate >= todayStr && bill.dueDate <= futureStr)
    .toArray()
}

export async function getBillsDueOnDate(daysAhead = 2) {
  const targetDate = new Date()
  targetDate.setDate(targetDate.getDate() + daysAhead)
  const targetStr = targetDate.toISOString().split('T')[0]
  const todayStr = new Date().toISOString().split('T')[0]

  return await db.bills
    .filter(bill => !bill.isPaid && bill.dueDate === targetStr && (!bill.notifiedAt || bill.notifiedAt < todayStr))
    .toArray()
}

export async function markBillNotified(id) {
  return await db.bills.update(id, {
    notifiedAt: new Date().toISOString().split('T')[0]
  })
}

// =====================
// Reminders (Tax/Document) Functions
// =====================

export async function addReminder(data) {
  return await db.reminders.add({
    ...data,
    isPaid: false,
    createdAt: new Date()
  })
}

export async function updateReminder(id, data) {
  return await db.reminders.update(id, data)
}

export async function deleteReminder(id) {
  return await db.reminders.delete(id)
}

export async function markReminderPaid(id) {
  return await db.reminders.update(id, {
    isPaid: true,
    paidDate: new Date().toISOString().split('T')[0]
  })
}

export async function markReminderUnpaid(id) {
  return await db.reminders.update(id, {
    isPaid: false,
    paidDate: null
  })
}

export async function getAllReminders() {
  return await db.reminders.toArray()
}

export async function getUnpaidReminders() {
  return await db.reminders.where('isPaid').equals(0).toArray()
}

export async function getRemindersDueOnDate(daysAhead = 2) {
  const targetDate = new Date()
  targetDate.setDate(targetDate.getDate() + daysAhead)
  const targetStr = targetDate.toISOString().split('T')[0]
  const todayStr = new Date().toISOString().split('T')[0]

  return await db.reminders
    .filter(rem => !rem.isPaid && rem.dueDate === targetStr && (!rem.notifiedAt || rem.notifiedAt < todayStr))
    .toArray()
}

export async function markReminderNotified(id) {
  return await db.reminders.update(id, {
    notifiedAt: new Date().toISOString().split('T')[0]
  })
}

// Export db instance
export { db }

export default db
