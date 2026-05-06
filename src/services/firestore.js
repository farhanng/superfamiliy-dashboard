// firestore.js - Firestore CRUD Operations
// All data operations for SuperFamily Dashboard

import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore'
import { db, getCurrentUser } from '../firebase.js'

// Helper to get user ID
function getUserId() {
  const user = getCurrentUser()
  if (!user) throw new Error('User not authenticated')
  return user.uid
}

// Helper to convert Firestore timestamp to ISO date string
function timestampToDate(value) {
  if (!value) return null
  if (value instanceof Timestamp) {
    return value.toDate().toISOString().split('T')[0]
  }
  if (typeof value === 'string') return value
  return null
}

// Helper to convert Firestore timestamp to Date object
function timestampToJSDate(value) {
  if (!value) return null
  if (value instanceof Timestamp) {
    return value.toDate()
  }
  if (value instanceof Date) {
    return value
  }
  return null
}

// Helper to clean data before saving (remove undefined values)
function cleanData(data) {
  const cleaned = {}
  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined) {
      cleaned[key] = value
    }
  }
  return cleaned
}

// =====================
// Bills
// =====================

const BILLS_COLLECTION = 'bills'

export async function getBills() {
  const userId = getUserId()
  const q = query(
    collection(db, BILLS_COLLECTION),
    where('userId', '==', userId),
    orderBy('dueDate', 'asc')
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    createdAt: timestampToDate(doc.data().createdAt),
    updatedAt: timestampToDate(doc.data().updatedAt),
    dueDate: doc.data().dueDate
  }))
}

export async function getBill(id) {
  const docRef = doc(db, BILLS_COLLECTION, id)
  const docSnap = await getDoc(docRef)
  if (!docSnap.exists()) return null
  const data = docSnap.data()
  return {
    id: docSnap.id,
    ...data,
    createdAt: timestampToDate(data.createdAt),
    updatedAt: timestampToDate(data.updatedAt),
    dueDate: data.dueDate
  }
}

export async function addBill(data) {
  const userId = getUserId()
  const docData = {
    ...cleanData(data),
    userId,
    isPaid: data.isPaid || false,
    paidDate: data.paidDate || null,
    paidBy: data.paidBy || null,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  }
  const docRef = await addDoc(collection(db, BILLS_COLLECTION), docData)
  return { id: docRef.id, ...docData }
}

export async function updateBill(id, data) {
  const docRef = doc(db, BILLS_COLLECTION, id)
  const updateData = {
    ...cleanData(data),
    updatedAt: serverTimestamp()
  }
  await updateDoc(docRef, updateData)
  return { id, ...updateData }
}

export async function deleteBill(id) {
  const docRef = doc(db, BILLS_COLLECTION, id)
  await deleteDoc(docRef)
  return { id }
}

export async function markBillPaid(id, paidBy = null) {
  const docRef = doc(db, BILLS_COLLECTION, id)
  const user = getCurrentUser()
  await updateDoc(docRef, {
    isPaid: true,
    paidDate: new Date().toISOString().split('T')[0],
    paidBy: paidBy || user?.displayName || user?.email,
    updatedAt: serverTimestamp()
  })
}

export async function markBillUnpaid(id) {
  const docRef = doc(db, BILLS_COLLECTION, id)
  await updateDoc(docRef, {
    isPaid: false,
    paidDate: null,
    paidBy: null,
    updatedAt: serverTimestamp()
  })
}

export async function getBillsDueSoon(days = 7) {
  const userId = getUserId()
  const today = new Date()
  const futureDate = new Date(today)
  futureDate.setDate(futureDate.getDate() + days)
  
  const todayStr = today.toISOString().split('T')[0]
  const futureStr = futureDate.toISOString().split('T')[0]

  const q = query(
    collection(db, BILLS_COLLECTION),
    where('userId', '==', userId),
    where('isPaid', '==', false),
    where('dueDate', '>=', todayStr),
    where('dueDate', '<=', futureStr),
    orderBy('dueDate', 'asc')
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
}

// =====================
// Reminders
// =====================

const REMINDERS_COLLECTION = 'reminders'

export async function getReminders() {
  const userId = getUserId()
  const q = query(
    collection(db, REMINDERS_COLLECTION),
    where('userId', '==', userId),
    orderBy('dueDate', 'asc')
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    createdAt: timestampToDate(doc.data().createdAt),
    updatedAt: timestampToDate(doc.data().updatedAt),
    dueDate: doc.data().dueDate
  }))
}

export async function getReminder(id) {
  const docRef = doc(db, REMINDERS_COLLECTION, id)
  const docSnap = await getDoc(docRef)
  if (!docSnap.exists()) return null
  const data = docSnap.data()
  return {
    id: docSnap.id,
    ...data,
    createdAt: timestampToDate(data.createdAt),
    updatedAt: timestampToDate(data.updatedAt)
  }
}

export async function addReminder(data) {
  const userId = getUserId()
  const docData = {
    ...cleanData(data),
    userId,
    isPaid: data.isPaid || false,
    paidDate: data.paidDate || null,
    paidBy: data.paidBy || null,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  }
  const docRef = await addDoc(collection(db, REMINDERS_COLLECTION), docData)
  return { id: docRef.id, ...docData }
}

export async function updateReminder(id, data) {
  const docRef = doc(db, REMINDERS_COLLECTION, id)
  const updateData = {
    ...cleanData(data),
    updatedAt: serverTimestamp()
  }
  await updateDoc(docRef, updateData)
  return { id, ...updateData }
}

export async function deleteReminder(id) {
  const docRef = doc(db, REMINDERS_COLLECTION, id)
  await deleteDoc(docRef)
  return { id }
}

export async function markReminderPaid(id, paidBy = null) {
  const docRef = doc(db, REMINDERS_COLLECTION, id)
  const user = getCurrentUser()
  await updateDoc(docRef, {
    isPaid: true,
    paidDate: new Date().toISOString().split('T')[0],
    paidBy: paidBy || user?.displayName || user?.email,
    updatedAt: serverTimestamp()
  })
}

export async function markReminderUnpaid(id) {
  const docRef = doc(db, REMINDERS_COLLECTION, id)
  await updateDoc(docRef, {
    isPaid: false,
    paidDate: null,
    paidBy: null,
    updatedAt: serverTimestamp()
  })
}

// =====================
// Events
// =====================

const EVENTS_COLLECTION = 'events'

export async function getEvents() {
  const userId = getUserId()
  const q = query(
    collection(db, EVENTS_COLLECTION),
    where('userId', '==', userId),
    orderBy('date', 'asc')
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    createdAt: timestampToDate(doc.data().createdAt),
    updatedAt: timestampToDate(doc.data().updatedAt)
  }))
}

export async function getEvent(id) {
  const docRef = doc(db, EVENTS_COLLECTION, id)
  const docSnap = await getDoc(docRef)
  if (!docSnap.exists()) return null
  const data = docSnap.data()
  return {
    id: docSnap.id,
    ...data,
    createdAt: timestampToDate(data.createdAt),
    updatedAt: timestampToDate(data.updatedAt)
  }
}

export async function addEvent(data) {
  const userId = getUserId()
  const docData = {
    ...cleanData(data),
    userId,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  }
  const docRef = await addDoc(collection(db, EVENTS_COLLECTION), docData)
  return { id: docRef.id, ...docData }
}

export async function updateEvent(id, data) {
  const docRef = doc(db, EVENTS_COLLECTION, id)
  const updateData = {
    ...cleanData(data),
    updatedAt: serverTimestamp()
  }
  await updateDoc(docRef, updateData)
  return { id, ...updateData }
}

export async function deleteEvent(id) {
  const docRef = doc(db, EVENTS_COLLECTION, id)
  await deleteDoc(docRef)
  return { id }
}

export async function getUpcomingEvents(days = 30) {
  const userId = getUserId()
  const today = new Date()
  const futureDate = new Date(today)
  futureDate.setDate(futureDate.getDate() + days)
  
  const todayStr = today.toISOString().split('T')[0]
  const futureStr = futureDate.toISOString().split('T')[0]

  const q = query(
    collection(db, EVENTS_COLLECTION),
    where('userId', '==', userId),
    where('date', '>=', todayStr),
    where('date', '<=', futureStr),
    orderBy('date', 'asc')
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
}

// =====================
// Transactions
// =====================

const TRANSACTIONS_COLLECTION = 'transactions'

export async function getTransactions() {
  const userId = getUserId()
  const q = query(
    collection(db, TRANSACTIONS_COLLECTION),
    where('userId', '==', userId),
    orderBy('date', 'desc')
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    createdAt: timestampToDate(doc.data().createdAt),
    updatedAt: timestampToDate(doc.data().updatedAt)
  }))
}

export async function getTransactionsByMonth(year, month) {
  const userId = getUserId()
  const startDate = `${year}-${String(month).padStart(2, '0')}-01`
  const endDate = month === 12
    ? `${year + 1}-01-01`
    : `${year}-${String(month + 1).padStart(2, '0')}-01`

  const q = query(
    collection(db, TRANSACTIONS_COLLECTION),
    where('userId', '==', userId),
    where('date', '>=', startDate),
    where('date', '<', endDate),
    orderBy('date', 'desc')
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
}

export async function addTransaction(data) {
  const userId = getUserId()
  const docData = {
    ...cleanData(data),
    userId,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  }
  const docRef = await addDoc(collection(db, TRANSACTIONS_COLLECTION), docData)
  return { id: docRef.id, ...docData }
}

export async function updateTransaction(id, data) {
  const docRef = doc(db, TRANSACTIONS_COLLECTION, id)
  const updateData = {
    ...cleanData(data),
    updatedAt: serverTimestamp()
  }
  await updateDoc(docRef, updateData)
  return { id, ...updateData }
}

export async function deleteTransaction(id) {
  const docRef = doc(db, TRANSACTIONS_COLLECTION, id)
  await deleteDoc(docRef)
  return { id }
}

// =====================
// Budget
// =====================

const BUDGETS_COLLECTION = 'budgets'

export async function getBudget(month) {
  const userId = getUserId()
  const docRef = doc(db, BUDGETS_COLLECTION, `${userId}_${month}`)
  const docSnap = await getDoc(docRef)
  if (!docSnap.exists()) return null
  const data = docSnap.data()
  return {
    id: docSnap.id,
    ...data,
    updatedAt: timestampToDate(data.updatedAt)
  }
}

export async function setBudget(month, amount) {
  const userId = getUserId()
  const docRef = doc(db, BUDGETS_COLLECTION, `${userId}_${month}`)
  const updateData = {
    id: `${userId}_${month}`,
    month,
    amount,
    userId,
    updatedAt: serverTimestamp()
  }
  await updateDoc(docRef, updateData)
  return updateData
}

// =====================
// MealPlans
// =====================

const MEAL_PLANS_COLLECTION = 'mealPlans'

export async function getMealPlans() {
  const userId = getUserId()
  const q = query(
    collection(db, MEAL_PLANS_COLLECTION),
    where('userId', '==', userId),
    orderBy('weekStart', 'desc')
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    createdAt: timestampToDate(doc.data().createdAt),
    updatedAt: timestampToDate(doc.data().updatedAt)
  }))
}

export async function getMealPlanByWeek(weekStart) {
  const userId = getUserId()
  const q = query(
    collection(db, MEAL_PLANS_COLLECTION),
    where('userId', '==', userId),
    where('weekStart', '==', weekStart),
    limit(1)
  )
  const snapshot = await getDocs(q)
  if (snapshot.empty) return null
  const doc = snapshot.docs[0]
  return {
    id: doc.id,
    ...doc.data(),
    createdAt: timestampToDate(doc.data().createdAt),
    updatedAt: timestampToDate(doc.data().updatedAt)
  }
}

export async function addMealPlan(data) {
  const userId = getUserId()
  const docData = {
    ...cleanData(data),
    userId,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  }
  const docRef = await addDoc(collection(db, MEAL_PLANS_COLLECTION), docData)
  return { id: docRef.id, ...docData }
}

export async function updateMealPlan(id, data) {
  const docRef = doc(db, MEAL_PLANS_COLLECTION, id)
  const updateData = {
    ...cleanData(data),
    updatedAt: serverTimestamp()
  }
  await updateDoc(docRef, updateData)
  return { id, ...updateData }
}

export async function upsertMealPlan(weekStart, meals) {
  const userId = getUserId()
  const existing = await getMealPlanByWeek(weekStart)
  if (existing) {
    return updateMealPlan(existing.id, { weekStart, meals })
  } else {
    return addMealPlan({ weekStart, meals })
  }
}

export async function deleteMealPlan(id) {
  const docRef = doc(db, MEAL_PLANS_COLLECTION, id)
  await deleteDoc(docRef)
  return { id }
}

// =====================
// WeekendActivities
// =====================

const WEEKEND_ACTIVITIES_COLLECTION = 'weekendActivities'

export async function getWeekendActivities() {
  const userId = getUserId()
  const q = query(
    collection(db, WEEKEND_ACTIVITIES_COLLECTION),
    where('userId', '==', userId),
    orderBy('date', 'desc')
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    createdAt: timestampToDate(doc.data().createdAt),
    updatedAt: timestampToDate(doc.data().updatedAt)
  }))
}

export async function getWeekendActivityByDate(date) {
  const userId = getUserId()
  const q = query(
    collection(db, WEEKEND_ACTIVITIES_COLLECTION),
    where('userId', '==', userId),
    where('date', '==', date),
    limit(1)
  )
  const snapshot = await getDocs(q)
  if (snapshot.empty) return null
  const doc = snapshot.docs[0]
  return {
    id: doc.id,
    ...doc.data()
  }
}

export async function addWeekendActivity(data) {
  const userId = getUserId()
  const docData = {
    ...cleanData(data),
    userId,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  }
  const docRef = await addDoc(collection(db, WEEKEND_ACTIVITIES_COLLECTION), docData)
  return { id: docRef.id, ...docData }
}

export async function updateWeekendActivity(id, data) {
  const docRef = doc(db, WEEKEND_ACTIVITIES_COLLECTION, id)
  const updateData = {
    ...cleanData(data),
    updatedAt: serverTimestamp()
  }
  await updateDoc(docRef, updateData)
  return { id, ...updateData }
}

export async function deleteWeekendActivity(id) {
  const docRef = doc(db, WEEKEND_ACTIVITIES_COLLECTION, id)
  await deleteDoc(docRef)
  return { id }
}

// =====================
// Real-time Subscriptions (Optional - for future use)
// =====================

export function subscribeToBills(callback) {
  const userId = getUserId()
  const q = query(
    collection(db, BILLS_COLLECTION),
    where('userId', '==', userId),
    orderBy('dueDate', 'asc')
  )
  return onSnapshot(q, (snapshot) => {
    const bills = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    callback(bills)
  })
}

export function subscribeToReminders(callback) {
  const userId = getUserId()
  const q = query(
    collection(db, REMINDERS_COLLECTION),
    where('userId', '==', userId),
    orderBy('dueDate', 'asc')
  )
  return onSnapshot(q, (snapshot) => {
    const reminders = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    callback(reminders)
  })
}

export function subscribeToEvents(callback) {
  const userId = getUserId()
  const q = query(
    collection(db, EVENTS_COLLECTION),
    where('userId', '==', userId),
    orderBy('date', 'asc')
  )
  return onSnapshot(q, (snapshot) => {
    const events = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    callback(events)
  })
}

export function subscribeToTransactions(callback) {
  const userId = getUserId()
  const q = query(
    collection(db, TRANSACTIONS_COLLECTION),
    where('userId', '==', userId),
    orderBy('date', 'desc')
  )
  return onSnapshot(q, (snapshot) => {
    const transactions = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    callback(transactions)
  })
}
