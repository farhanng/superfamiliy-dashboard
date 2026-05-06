// api.js - Backend REST API Client
// All data operations go through the Go backend
// Auth: JWT token stored in localStorage

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001'

// =====================
// Auth Helpers
// =====================

function getToken() {
  return localStorage.getItem('sf_token')
}

function setToken(token) {
  localStorage.setItem('sf_token', token)
}

function clearToken() {
  localStorage.removeItem('sf_token')
}

function getUser() {
  const user = localStorage.getItem('sf_user')
  return user ? JSON.parse(user) : null
}

function setUser(user) {
  localStorage.setItem('sf_user', JSON.stringify(user))
}

function clearUser() {
  localStorage.removeItem('sf_user')
}

// =====================
// HTTP Helper
// =====================

async function apiFetch(path, options = {}) {
  const token = getToken()
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers,
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  })

  if (res.status === 401) {
    // Token expired or invalid
    clearToken()
    clearUser()
    window.location.hash = 'login'
    throw new Error('Unauthorized')
  }

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error || `HTTP ${res.status}`)
  }

  // Handle empty responses
  const text = await res.text()
  if (!text) return null
  return JSON.parse(text)
}

// =====================
// Auth API
// =====================

export async function login(email, password) {
  const data = await apiFetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
  if (data.token) {
    setToken(data.token)
    setUser(data.user)
  }
  return data
}

export async function register(email, password, name) {
  const data = await apiFetch('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email, password, name }),
  })
  if (data.token) {
    setToken(data.token)
    setUser(data.user)
  }
  return data
}

export async function getMe() {
  return apiFetch('/api/auth/me')
}

export async function logout() {
  await apiFetch('/api/auth/logout', { method: 'POST' }).catch(() => {})
  clearToken()
  clearUser()
}

// =====================
// Google OAuth
// =====================

export function initiateGoogleOAuth() {
  window.location.href = `${API_BASE}/api/auth/google`
}

// =====================
// Bills API
// =====================

export async function getBills() {
  const data = await apiFetch('/api/bills')
  return data.bills || []
}

export async function getBill(id) {
  return apiFetch(`/api/bills/${id}`)
}

export async function createBill(bill) {
  return apiFetch('/api/bills', {
    method: 'POST',
    body: JSON.stringify(bill),
  })
}

export async function updateBill(id, bill) {
  return apiFetch(`/api/bills/${id}`, {
    method: 'PUT',
    body: JSON.stringify(bill),
  })
}

export async function deleteBill(id) {
  return apiFetch(`/api/bills/${id}`, { method: 'DELETE' })
}

export async function markBillPaid(id) {
  return apiFetch(`/api/bills/${id}/mark-paid`, { method: 'POST' })
}

export async function markBillUnpaid(id) {
  return apiFetch(`/api/bills/${id}/mark-unpaid`, { method: 'POST' })
}

export async function getBillsDueSoon(days = 7) {
  const data = await apiFetch(`/api/bills/due-soon?days=${days}`)
  return data.bills || []
}

// =====================
// Reminders API
// =====================

export async function getReminders() {
  const data = await apiFetch('/api/reminders')
  return data.reminders || []
}

export async function createReminder(reminder) {
  return apiFetch('/api/reminders', {
    method: 'POST',
    body: JSON.stringify(reminder),
  })
}

export async function updateReminder(id, reminder) {
  return apiFetch(`/api/reminders/${id}`, {
    method: 'PUT',
    body: JSON.stringify(reminder),
  })
}

export async function deleteReminder(id) {
  return apiFetch(`/api/reminders/${id}`, { method: 'DELETE' })
}

export async function markReminderPaid(id) {
  return apiFetch(`/api/reminders/${id}/mark-paid`, { method: 'POST' })
}

export async function markReminderUnpaid(id) {
  return apiFetch(`/api/reminders/${id}/mark-unpaid`, { method: 'POST' })
}

// =====================
// Events API
// =====================

export async function getEvents() {
  const data = await apiFetch('/api/events')
  return data.events || []
}

export async function createEvent(event) {
  return apiFetch('/api/events', {
    method: 'POST',
    body: JSON.stringify(event),
  })
}

export async function updateEvent(id, event) {
  return apiFetch(`/api/events/${id}`, {
    method: 'PUT',
    body: JSON.stringify(event),
  })
}

export async function deleteEvent(id) {
  return apiFetch(`/api/events/${id}`, { method: 'DELETE' })
}

// =====================
// Transactions API
// =====================

export async function getTransactions() {
  const data = await apiFetch('/api/transactions')
  return data.transactions || []
}

export async function getTransactionsByMonth(year, month) {
  const data = await apiFetch(`/api/transactions/${year}/${month}`)
  return data.transactions || []
}

export async function createTransaction(transaction) {
  return apiFetch('/api/transactions', {
    method: 'POST',
    body: JSON.stringify(transaction),
  })
}

export async function updateTransaction(id, transaction) {
  return apiFetch(`/api/transactions/${id}`, {
    method: 'PUT',
    body: JSON.stringify(transaction),
  })
}

export async function deleteTransaction(id) {
  return apiFetch(`/api/transactions/${id}`, { method: 'DELETE' })
}

// =====================
// Budget API
// =====================

export async function getBudget(month) {
  const data = await apiFetch(`/api/budgets/${month}`)
  return data.budget || null
}

export async function setBudget(month, amount) {
  return apiFetch(`/api/budgets/${month}`, {
    method: 'PUT',
    body: JSON.stringify({ amount }),
  })
}

// =====================
// Meal Plans API
// =====================

export async function getMealPlans() {
  const data = await apiFetch('/api/meal-plans')
  return data.meal_plans || []
}

export async function getMealPlanByWeek(weekStart) {
  return apiFetch(`/api/meal-plans/${weekStart}`)
}

export async function createOrUpdateMealPlan(plan) {
  return apiFetch('/api/meal-plans', {
    method: 'POST',
    body: JSON.stringify(plan),
  })
}

export async function deleteMealPlan(id) {
  return apiFetch(`/api/meal-plans/${id}`, { method: 'DELETE' })
}

// =====================
// Weekend Activities API
// =====================

export async function getWeekendActivities() {
  const data = await apiFetch('/api/weekend-activities')
  return data.weekend_activities || []
}

export async function createWeekendActivity(activity) {
  return apiFetch('/api/weekend-activities', {
    method: 'POST',
    body: JSON.stringify(activity),
  })
}

export async function updateWeekendActivity(id, activity) {
  return apiFetch(`/api/weekend-activities/${id}`, {
    method: 'PUT',
    body: JSON.stringify(activity),
  })
}

export async function deleteWeekendActivity(id) {
  return apiFetch(`/api/weekend-activities/${id}`, { method: 'DELETE' })
}

// =====================
// Auth state helpers
// =====================

export function isAuthenticated() {
  return !!getToken()
}

export function getCurrentUser() {
  return getUser()
}

export { getToken, getUser, setToken, setUser, clearToken, clearUser }
