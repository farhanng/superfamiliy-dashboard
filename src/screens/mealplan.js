// mealplan.js - Weekly Meal Plan Screen
// 7 hari × 3 meals grid dengan CRUD
// Migrated to Firestore

import { t, getLang } from '../i18n.js'
import * as firestore from '../services/firestore.js'
import { showModal, hideModal, showToast } from '../main.js'
import { format, startOfWeek, addDays, subWeeks, addWeeks, parseISO } from 'date-fns'
import { SAMPLE_MENUS } from '../data/sample-menus.js'

const MEALS = ['breakfast', 'lunch', 'dinner']
const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

export async function renderMealPlan(container) {
  const lang = getLang()
  const now = new Date()

  // Get current week start (Monday)
  let weekOffset = 0
  const params = new URLSearchParams(window.location.hash.split('?')[1] || '')
  if (params.get('week')) {
    const weekDate = parseISO(params.get('week'))
    weekOffset = Math.floor((weekDate.getTime() - startOfWeek(now, { weekStartsOn: 1 }).getTime()) / (7 * 24 * 60 * 60 * 1000))
  }

  const baseWeekStart = startOfWeek(now, { weekStartsOn: 1 })
  const weekStart = addWeeks(baseWeekStart, weekOffset)
  const weekStartStr = format(weekStart, 'yyyy-MM-dd')

  // Get days of the week
  const weekDays = DAYS.map((day, i) => {
    const date = addDays(weekStart, i)
    return {
      key: day,
      date: format(date, 'yyyy-MM-dd'),
      label: t('mealplan_days.' + day),
      shortLabel: t('mealplan_days.' + day).substring(0, 3),
      isToday: format(date, 'yyyy-MM-dd') === format(now, 'yyyy-MM-dd')
    }
  })

  // Get meal plan for this week from Firestore
  let mealPlan = await firestore.getMealPlanByWeek(weekStartStr)

  // Initialize default meals structure if no plan exists
  if (!mealPlan) {
    mealPlan = {
      weekStart: weekStartStr,
      meals: {}
    }
    DAYS.forEach(day => {
      mealPlan.meals[day] = { breakfast: '', lunch: '', dinner: '' }
    })
  } else {
    // Parse meals if it's a JSON string
    if (typeof mealPlan.meals === 'string') {
      try {
        mealPlan.meals = JSON.parse(mealPlan.meals)
      } catch (e) {
        mealPlan.meals = {}
      }
    }
    // Ensure all days have meal slots
    DAYS.forEach(day => {
      if (!mealPlan.meals[day]) {
        mealPlan.meals[day] = { breakfast: '', lunch: '', dinner: '' }
      }
    })
  }

  container.innerHTML = `
    <div class="space-y-4">
      <!-- Week Navigator -->
      <div class="flex items-center justify-between">
        <button class="btn btn-outline btn-sm" id="prev-week">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>
        <div class="text-center">
          <span class="text-sm font-medium text-gray-700">${format(weekStart, 'd MMM')} - ${format(addDays(weekStart, 6), 'd MMM yyyy')}</span>
          ${weekOffset === 0 ? `<p class="text-xs text-primary">${lang === 'id' ? 'Minggu ini' : 'This week'}</p>` : ''}
        </div>
        <button class="btn btn-outline btn-sm" id="next-week">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
      </div>

      <!-- Copy Last Week Button -->
      <button class="btn btn-outline btn-block btn-sm" id="copy-last-week">
        📋 ${t('mealplan_copy_week')}
      </button>

      <!-- Meal Plan Grid -->
      <div class="card overflow-x-auto">
        <div class="min-w-[600px]">
          <!-- Header Row -->
          <div class="grid grid-cols-8 gap-1 mb-2">
            <div class="p-2"></div>
            ${weekDays.map(day => `
              <div class="p-2 text-center ${day.isToday ? 'bg-primary/10 rounded-lg' : ''}">
                <p class="text-xs font-medium text-gray-500">${day.shortLabel}</p>
                <p class="text-sm font-semibold ${day.isToday ? 'text-primary' : 'text-gray-700'}">${day.date.split('-')[2]}</p>
              </div>
            `).join('')}
          </div>

          <!-- Meal Rows -->
          ${MEALS.map(meal => `
            <div class="grid grid-cols-8 gap-1 mb-2">
              <div class="p-2 flex items-center">
                <span class="text-xs font-medium text-gray-500">
                  ${meal === 'breakfast' ? '🌅' : meal === 'lunch' ? '☀️' : '🌙'}
                </span>
                <span class="text-xs font-medium text-gray-500 ml-1">${t('mealplan_' + meal)}</span>
              </div>
              ${weekDays.map(day => `
                <div class="p-1">
                  <button class="meal-slot w-full min-h-[50px] p-2 text-xs text-left border border-gray-100 rounded-lg hover:border-primary/50 transition-colors ${day.isToday ? 'bg-primary/5 border-primary/30' : 'bg-gray-50'}"
                          data-day="${day.key}"
                          data-meal="${meal}"
                          data-value="${mealPlan.meals[day.key]?.[meal] || ''}">
                    ${mealPlan.meals[day.key]?.[meal] || '<span class="text-gray-300">+</span>'}
                  </button>
                </div>
              `).join('')}
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Legend -->
      <div class="flex gap-4 text-xs text-gray-400 justify-center">
        <span>🌅 ${t('mealplan_breakfast')}</span>
        <span>☀️ ${t('mealplan_lunch')}</span>
        <span>🌙 ${t('mealplan_dinner')}</span>
      </div>

      <!-- Sample Menu Inspiration -->
      <div class="card bg-gradient-to-r from-orange-50 to-yellow-50">
        <div class="card-header">
          <span class="text-sm font-medium text-orange-700">💡 Inspirasi Menu Rumahan</span>
          <span class="badge badge-orange text-xs">${SAMPLE_MENUS.length} resep</span>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-2">
          ${SAMPLE_MENUS.slice(0, 12).map(menu => `
            <button class="sample-menu-btn text-left p-2 text-xs border border-orange-200 rounded-lg hover:bg-orange-100 transition-colors" data-name="${menu.name}">
              <span class="font-medium text-gray-800">${menu.emoji} ${menu.name}</span>
              <p class="text-gray-500 mt-0.5">${menu.category === 'breakfast' ? '🌅' : menu.category === 'lunch' ? '☀️' : '🌙'}</p>
            </button>
          `).join('')}
        </div>
        <div class="flex flex-wrap gap-1 mt-2">
          <span class="text-xs text-gray-500">Filter:</span>
          <button class="filter-menu-btn px-2 py-0.5 text-xs border border-gray-200 rounded-full hover:bg-gray-100 ${lang === 'id' ? 'bg-primary text-white' : ''}" data-filter="all">Semua</button>
          <button class="filter-menu-btn px-2 py-0.5 text-xs border border-gray-200 rounded-full hover:bg-gray-100" data-filter="breakfast">🌅 Sarapan</button>
          <button class="filter-menu-btn px-2 py-0.5 text-xs border border-gray-200 rounded-full hover:bg-gray-100" data-filter="lunch">☀️ Makan Siang</button>
          <button class="filter-menu-btn px-2 py-0.5 text-xs border border-gray-200 rounded-full hover:bg-gray-100" data-filter="dinner">🌙 Makan Malam</button>
        </div>
      </div>
    </div>
  `

  // Week navigation
  document.getElementById('prev-week').addEventListener('click', () => {
    const prevWeek = subWeeks(weekStart, 1)
    window.location.hash = `mealplan?week=${format(prevWeek, 'yyyy-MM-dd')}`
  })

  document.getElementById('next-week').addEventListener('click', () => {
    const nextWeek = addWeeks(weekStart, 1)
    window.location.hash = `mealplan?week=${format(nextWeek, 'yyyy-MM-dd')}`
  })

  // Copy last week
  document.getElementById('copy-last-week').addEventListener('click', async () => {
    const lastWeekStart = subWeeks(weekStart, 1)
    const lastWeekStr = format(lastWeekStart, 'yyyy-MM-dd')
    const lastWeekPlan = await firestore.getMealPlanByWeek(lastWeekStr)

    if (lastWeekPlan && lastWeekPlan.meals) {
      // Copy meals from last week
      const newPlan = {
        weekStart: weekStartStr,
        meals: typeof lastWeekPlan.meals === 'string' ? lastWeekPlan.meals : JSON.stringify(lastWeekPlan.meals)
      }

      // Upsert the plan
      await firestore.upsertMealPlan(weekStartStr, newPlan.meals)

      showToast(t('common_success'))
      window.location.reload()
    } else {
      showToast(lang === 'id' ? 'Tidak ada rencana minggu lalu' : 'No plan from last week', 'warning')
    }
  })

  // Meal slot click - edit
  document.querySelectorAll('.meal-slot').forEach(slot => {
    slot.addEventListener('click', () => {
      const day = slot.dataset.day
      const meal = slot.dataset.meal
      const currentValue = slot.dataset.value || ''

      showMealEditModal(day, meal, currentValue, async (newValue) => {
        // Update local state
        if (!mealPlan.meals[day]) {
          mealPlan.meals[day] = { breakfast: '', lunch: '', dinner: '' }
        }
        mealPlan.meals[day][meal] = newValue

        // Save to Firestore
        await firestore.upsertMealPlan(weekStartStr, JSON.stringify(mealPlan.meals))

        showToast(t('common_success'))
        window.location.reload()
      })
    })
  })

  // Sample menu buttons - click to add to today's meal
  document.querySelectorAll('.sample-menu-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const menuName = btn.dataset.name
      const todayKey = DAYS[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1]
      showMealEditModal(todayKey, 'lunch', menuName, async (newValue) => {
        if (!mealPlan.meals[todayKey]) {
          mealPlan.meals[todayKey] = { breakfast: '', lunch: '', dinner: '' }
        }
        mealPlan.meals[todayKey].lunch = newValue
        await firestore.upsertMealPlan(weekStartStr, JSON.stringify(mealPlan.meals))
        showToast(t('common_success'))
        window.location.reload()
      })
    })
  })

  // Filter menu buttons
  document.querySelectorAll('.filter-menu-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter
      const menuGrid = container.querySelector('.sample-menu-btn')?.closest('.grid')
      if (!menuGrid) return
      const allBtns = menuGrid.querySelectorAll('.sample-menu-btn')
      allBtns.forEach(b => {
        const name = b.dataset.name
        const menu = SAMPLE_MENUS.find(m => m.name === name)
        if (filter === 'all' || menu?.category === filter) {
          b.classList.remove('hidden')
        } else {
          b.classList.add('hidden')
        }
      })
      document.querySelectorAll('.filter-menu-btn').forEach(fb => {
        fb.classList.remove('bg-primary', 'text-white')
      })
      btn.classList.add('bg-primary', 'text-white')
    })
  })
}

// Meal Edit Modal
function showMealEditModal(day, meal, currentValue, onSave) {
  const lang = getLang()
  const dayLabel = t('mealplan_days.' + day)
  const mealLabel = t('mealplan_' + meal)

  showModal(`
    <div class="modal-header">
      <h3 class="modal-title">${mealLabel} - ${dayLabel}</h3>
      <button class="text-gray-400 hover:text-gray-600" id="modal-close">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>
    </div>
    <form id="meal-form" class="modal-body">
      <div class="input-group">
        <label class="input-label">${lang === 'id' ? 'Menu' : 'Menu'}</label>
        <input type="text" name="menu" class="input" placeholder="${lang === 'id' ? 'Nama menu' : 'Menu name'}" value="${currentValue}" required>
      </div>
    </form>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary flex-1" id="clear-btn">${lang === 'id' ? 'Hapus' : 'Clear'}</button>
      <button type="submit" form="meal-form" class="btn btn-primary flex-1">${t('common_save')}</button>
    </div>
  `)

  document.getElementById('modal-close').addEventListener('click', hideModal)

  document.getElementById('meal-form').addEventListener('submit', (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    onSave(formData.get('menu'))
  })

  document.getElementById('clear-btn').addEventListener('click', () => {
    onSave('')
  })
}

// Global add modal
window.showAddModal = window.showAddModal || {}
window.showAddModal.mealplan = () => {
  // Show a simple add modal to quickly add a meal
  showMealEditModal('monday', 'breakfast', '', async (value) => {
    if (value) {
      const now = new Date()
      const weekStart = startOfWeek(now, { weekStartsOn: 1 })
      const weekStartStr = format(weekStart, 'yyyy-MM-dd')
      const dayKey = DAYS[now.getDay() === 0 ? 6 : now.getDay() - 1]

      let mealPlan = await firestore.getMealPlanByWeek(weekStartStr)
      if (!mealPlan) {
        mealPlan = { weekStart: weekStartStr, meals: {} }
        DAYS.forEach(d => mealPlan.meals[d] = { breakfast: '', lunch: '', dinner: '' })
      } else if (typeof mealPlan.meals === 'string') {
        try {
          mealPlan.meals = JSON.parse(mealPlan.meals)
        } catch (e) {
          mealPlan.meals = {}
        }
      }

      if (!mealPlan.meals[dayKey]) {
        mealPlan.meals[dayKey] = { breakfast: '', lunch: '', dinner: '' }
      }
      mealPlan.meals[dayKey].breakfast = value

      await firestore.upsertMealPlan(weekStartStr, JSON.stringify(mealPlan.meals))

      hideModal()
      showToast(t('common_success'))
      window.location.reload()
    }
  })
}

export default renderMealPlan
