// home.js - Home Dashboard Screen
// Ringkasan semua fitur: budget, events, bills, weekend
// Migrated to Firestore

import { t, getLang } from '../i18n.js'
import * as api from '../services/api.js'
import { formatCurrency, formatDate } from '../main.js'
import { format, startOfWeek, addDays, isToday, isThisWeek, parseISO } from 'date-fns'
import { id as idLocale, enUS } from 'date-fns/locale'

const locale = getLang() === 'id' ? idLocale : enUS

export async function renderHome(container) {
  const lang = getLang()
  const now = new Date()
  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
  const today = format(now, 'yyyy-MM-dd')

  // Get data from backend API
  const [budget, allEvents, billsDueSoon, allBills] = await Promise.all([
    api.getBudget(currentMonth),
    api.getEvents(),
    api.getBillsDueSoon(7),
    api.getBills()
  ])

  // Filter upcoming events for next 14 days
  const today14 = new Date()
  today14.setDate(today14.getDate() + 14)
  const todayStr = format(new Date(), 'yyyy-MM-dd')
  const future14Str = format(today14, 'yyyy-MM-dd')
  const events = allEvents.filter(e => e.date && e.date >= todayStr && e.date <= future14Str)

  // Calculate budget spent this month
  const transactions = await api.getTransactionsByMonth(now.getFullYear(), now.getMonth() + 1)
  const totalSpent = transactions.reduce((sum, t) => sum + (t.amount || 0), 0)
  const budgetAmount = budget?.amount || 0
  const budgetRemaining = budgetAmount - totalSpent
  const budgetPercent = budgetAmount > 0 ? Math.min((totalSpent / budgetAmount) * 100, 100) : 0
  const budgetStatus = totalSpent > budgetAmount ? 'danger' : totalSpent > budgetAmount * 0.8 ? 'warning' : 'success'

  // Get weekend activities (next weekend, not past)
  const dayOfWeek = now.getDay()
  let weekendStart
  if (dayOfWeek === 0) {
    weekendStart = startOfWeek(now, { weekStartsOn: 6 })
  } else {
    const daysUntilSaturday = (6 - dayOfWeek + 7) % 7 || 7
    weekendStart = addDays(now, daysUntilSaturday)
    weekendStart = new Date(weekendStart.getFullYear(), weekendStart.getMonth(), weekendStart.getDate())
  }
  const saturday = format(weekendStart, 'yyyy-MM-dd')
  const sunday = format(addDays(weekendStart, 1), 'yyyy-MM-dd')
  // Get all weekend activities and filter by date
  const allWeekendActivities = await api.getWeekendActivities()
  const satActivities = allWeekendActivities.find(a => a.date === saturday) || null
  const sunActivities = allWeekendActivities.find(a => a.date === sunday) || null

  const weekendProgress = calculateWeekendProgress(satActivities, sunActivities)

  // Get meal plan for THIS week (current week, not next weekend)
  const thisWeekStart = startOfWeek(now, { weekStartsOn: 1 }) // Monday
  const thisWeekSaturday = format(addDays(thisWeekStart, 5), 'yyyy-MM-dd')
  const mealPlan = await api.getMealPlanByWeek(thisWeekSaturday)
  const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
  const mealIcons = { breakfast: '🌅', lunch: '☀️', dinner: '🌙' }
  const todayDayKey = DAYS[now.getDay() === 0 ? 6 : now.getDay() - 1]

  // Get all bills for unpaid count
  const unpaidBills = allBills.filter(b => !b.isPaid)
  const overdueBills = unpaidBills.filter(b => b.dueDate < today)

  container.innerHTML = `
    <div class="space-y-4">
      <!-- Greeting -->
      <div class="card">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl">👨‍👩‍👦</div>
          <div>
            <p class="text-sm text-gray-500">${getGreeting(lang)}</p>
            <p class="text-lg font-semibold text-gray-800">${formatDate(today, lang)}</p>
          </div>
        </div>
      </div>

      <!-- Budget Summary Card -->
      <div class="card cursor-pointer" onclick="window.location.hash='budget'">
        <div class="card-header">
          <span class="card-title">${t('home_budget_summary')}</span>
          <span class="badge badge-${budgetStatus}">${budgetAmount > 0 ? Math.round(budgetPercent) + '%' : t('common_no_data')}</span>
        </div>
        ${budgetAmount > 0 ? `
          <div class="progress-bar mb-2">
            <div class="progress-fill progress-fill-${budgetStatus}" style="width: ${budgetPercent}%"></div>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-500">${t('budget_spent')}: <span class="font-tabular font-medium text-gray-800">${formatCurrency(totalSpent)}</span></span>
            <span class="text-gray-500">${budgetRemaining >= 0 ? t('budget_remaining') : t('budget_over')}: <span class="font-tabular font-medium ${budgetRemaining < 0 ? 'text-danger' : 'text-success'}">${formatCurrency(Math.abs(budgetRemaining))}</span></span>
          </div>
        ` : `
          <p class="text-sm text-gray-400">${t('budget_set_budget')}</p>
        `}
      </div>

      <!-- Quick Actions Grid -->
      <div class="grid grid-cols-2 gap-3">
        <!-- Upcoming Events -->
        <div class="card cursor-pointer" onclick="window.location.hash='events'">
          <div class="card-header">
            <span class="card-title">${t('home_upcoming_events')}</span>
            <span class="badge badge-primary">${events.length}</span>
          </div>
          ${events.length > 0 ? `
            <div class="space-y-2">
              ${events.slice(0, 2).map(e => `
                <div class="flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full event-${e.type}"></span>
                  <span class="text-sm text-gray-700 truncate-2">${e.title}</span>
                </div>
                <p class="text-xs text-gray-400">${formatDate(e.date, lang)}</p>
              `).join('')}
            </div>
          ` : `
            <p class="text-sm text-gray-400">${t('home_no_events')}</p>
          `}
        </div>

        <!-- Bills Due Soon -->
        <div class="card cursor-pointer" onclick="window.location.hash='bills'">
          <div class="card-header">
            <span class="card-title">${t('home_bills_due')}</span>
            ${overdueBills.length > 0 ? `<span class="badge badge-danger">${overdueBills.length} ${lang === 'id' ? 'lewat' : 'overdue'}</span>` : ''}
          </div>
          ${billsDueSoon.length > 0 ? `
            <div class="space-y-2">
              ${billsDueSoon.slice(0, 2).map(b => `
                <div class="flex justify-between items-center">
                  <span class="text-sm text-gray-700 truncate">${b.title}</span>
                  <span class="text-xs font-tabular font-medium text-warning">${formatCurrency(b.amount)}</span>
                </div>
                <p class="text-xs text-gray-400">${lang === 'id' ? 'Jatuh tempo' : 'Due'}: ${formatDate(b.dueDate, lang)}</p>
              `).join('')}
            </div>
          ` : `
            <p class="text-sm text-gray-400">${t('home_no_bills')}</p>
          `}
        </div>
      </div>

      <!-- Weekend Progress -->
      <div class="card cursor-pointer" onclick="window.location.hash='weekend'">
        <div class="card-header">
          <span class="card-title">${t('weekend_title')}</span>
          <span class="badge badge-success">${weekendProgress}%</span>
        </div>
        <div class="flex gap-4">
          <div class="flex-1">
            <p class="text-xs text-gray-500 mb-1">${t('weekend_saturday')}</p>
            <div class="progress-bar">
              <div class="progress-fill progress-fill-success" style="width: ${satActivities ? (satActivities.activities.filter(a => a.status === 'done').length / Math.max(satActivities.activities.length, 1)) * 100 : 0}%"></div>
            </div>
          </div>
          <div class="flex-1">
            <p class="text-xs text-gray-500 mb-1">${t('weekend_sunday')}</p>
            <div class="progress-bar">
              <div class="progress-fill progress-fill-success" style="width: ${sunActivities ? (sunActivities.activities.filter(a => a.status === 'done').length / Math.max(sunActivities.activities.length, 1)) * 100 : 0}%"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Meal Plan Preview -->
      <div class="card cursor-pointer" onclick="window.location.hash='mealplan'">
        <div class="card-header">
          <span class="card-title">${t('mealplan_title')}</span>
          <span class="badge badge-primary">${format(now, 'd MMM')}</span>
        </div>
        ${mealPlan?.meals ? (() => {
            let meals = mealPlan.meals
            if (typeof meals === 'string') {
              try {
                meals = JSON.parse(meals)
              } catch (e) {
                meals = {}
              }
            }
            return `
            <div class="space-y-2">
              ${DAYS.slice(0, 7).map(dayKey => {
                const dayMeals = meals[dayKey] || {}
                const hasMeals = dayMeals.breakfast || dayMeals.lunch || dayMeals.dinner
                const isToday = dayKey === todayDayKey
                return `
                  <div class="flex items-center gap-2 text-sm ${isToday ? 'bg-primary/5 p-2 rounded-lg' : ''}">
                    <span class="text-xs font-medium text-gray-500 w-10">${t('mealplan_days.' + dayKey)?.substring(0, 3)}</span>
                    <span class="flex-1 truncate ${hasMeals ? 'text-gray-700' : 'text-gray-300'}">
                      ${dayMeals.lunch || dayMeals.breakfast || dayMeals.dinner || (isToday ? '🍽️ Hari ini belum ada menu' : '...')}
                    </span>
                    ${isToday ? '<span class="text-xs text-primary font-medium">Hari ini</span>' : ''}
                  </div>
                `
              }).join('')}
            </div>
            `
          })() : `
            <p class="text-sm text-gray-400 text-center py-2">${t('mealplan_no_menu')}</p>
          `}
      </div>

      <!-- Unpaid Bills Summary -->
      ${unpaidBills.length > 0 ? `
        <div class="card">
          <div class="card-header">
            <span class="card-title">${lang === 'id' ? 'Tagihan Belum Lunas' : 'Unpaid Bills'}</span>
            <span class="text-sm font-tabular font-bold text-warning">${formatCurrency(unpaidBills.reduce((sum, b) => sum + b.amount, 0))}</span>
          </div>
          <div class="space-y-2">
            ${unpaidBills.slice(0, 3).map(b => `
              <div class="flex justify-between items-center text-sm">
                <span class="text-gray-700">${b.title}</span>
                <span class="font-tabular text-gray-600">${formatCurrency(b.amount)}</span>
              </div>
            `).join('')}
            ${unpaidBills.length > 3 ? `<p class="text-xs text-gray-400">+${unpaidBills.length - 3} ${lang === 'id' ? 'lebih banyak' : 'more'}</p>` : ''}
          </div>
        </div>
      ` : ''}
    </div>
  `
}

function getGreeting(lang) {
  const hour = new Date().getHours()
  if (lang === 'id') {
    if (hour < 12) return 'Selamat Pagi'
    if (hour < 15) return 'Selamat Siang'
    if (hour < 18) return 'Selamat Sore'
    return 'Selamat Malam'
  } else {
    if (hour < 12) return 'Good Morning'
    if (hour < 15) return 'Good Afternoon'
    if (hour < 18) return 'Good Evening'
    return 'Good Night'
  }
}

function calculateWeekendProgress(sat, sun) {
  const satTotal = sat?.activities?.length || 0
  const sunTotal = sun?.activities?.length || 0
  const satDone = sat?.activities?.filter(a => a.status === 'done').length || 0
  const sunDone = sun?.activities?.filter(a => a.status === 'done').length || 0
  const total = satTotal + sunTotal
  if (total === 0) return 0
  return Math.round(((satDone + sunDone) / total) * 100)
}

// Export for use in main.js
window.renderHome = renderHome
export default renderHome
