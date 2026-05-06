// weekend.js - Weekend Activities Screen
// Checklist-style activities untuk Sabtu-Minggu
// Migrated to Firestore

import { t, getLang } from '../i18n.js'
import * as api from '../services/api.js'
import { showModal, hideModal, showToast } from '../main.js'
import { format, startOfWeek, addDays, parseISO } from 'date-fns'

const CATEGORIES = ['outdoor', 'indoor', 'education', 'family']
const CATEGORY_ICONS = {
  outdoor: '🌳',
  indoor: '🏠',
  education: '📚',
  family: '👨‍👩‍👦'
}

// Helper to get weekend activity by date from all activities
async function getWeekendActivityByDate(date) {
  const all = await api.getWeekendActivities()
  const found = all.find(a => a.date === date)
  if (!found) return null
  // Parse activities JSON string
  if (found.activities && typeof found.activities === 'string') {
    try {
      found.activities = JSON.parse(found.activities)
    } catch(e) {
      found.activities = []
    }
  }
  return found
}

// Helper for addWeekendActivity (creates doc with activities array)
async function addWeekendActivityAPI(data) {
  const activities = data.activities || []
  const activitiesStr = typeof activities === 'string' ? activities : JSON.stringify(activities)
  return api.createWeekendActivity({ date: data.date, activities: activitiesStr })
}

export async function renderWeekend(container) {
  const lang = getLang()
  const now = new Date()
  const dayOfWeek = now.getDay()

  // Get next weekend (if today is past Saturday, show next Saturday)
  let weekStart
  if (dayOfWeek === 0) {
    weekStart = startOfWeek(now, { weekStartsOn: 6 })
  } else {
    const daysUntilSaturday = (6 - dayOfWeek + 7) % 7 || 7
    weekStart = addDays(now, daysUntilSaturday)
    weekStart = new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate())
  }
  const saturday = format(weekStart, 'yyyy-MM-dd')
  const sunday = format(addDays(weekStart, 1), 'yyyy-MM-dd')

  // Get activities from Firestore
  const [satActivities, sunActivities] = await Promise.all([
    getWeekendActivityByDate(saturday),
    getWeekendActivityByDate(sunday)
  ])

  // Initialize if not exists
  if (!satActivities) {
    await addWeekendActivityAPI({
      date: saturday,
      activities: []
    })
  }
  if (!sunActivities) {
    await addWeekendActivityAPI({
      date: sunday,
      activities: []
    })
  }

  // Re-fetch after potential creation
  const [sat, sun] = await Promise.all([
    getWeekendActivityByDate(saturday),
    getWeekendActivityByDate(sunday)
  ])

  const satList = sat?.activities || []
  const sunList = sun?.activities || []

  // Calculate progress
  const satProgress = calculateProgress(satList)
  const sunProgress = calculateProgress(sunList)
  const totalProgress = calculateTotalProgress(satList, sunList)

  container.innerHTML = `
    <div class="space-y-4">
      <!-- Week Header -->
      <div class="text-center">
        <p class="text-sm font-medium text-gray-700">${format(weekStart, 'd MMM')} - ${format(addDays(weekStart, 1), 'd MMM yyyy')}</p>
        <p class="text-xs text-gray-400">${t('weekend_progress')}: ${totalProgress}%</p>
      </div>

      <!-- Progress Bars -->
      <div class="card">
        <div class="flex gap-4">
          <div class="flex-1">
            <div class="flex items-center justify-between mb-1">
              <span class="text-xs font-medium text-gray-500">${t('weekend_saturday')}</span>
              <span class="text-xs font-medium text-success">${satProgress}%</span>
            </div>
            <div class="progress-bar">
              <div class="progress-fill progress-fill-success" style="width: ${satProgress}%"></div>
            </div>
          </div>
          <div class="flex-1">
            <div class="flex items-center justify-between mb-1">
              <span class="text-xs font-medium text-gray-500">${t('weekend_sunday')}</span>
              <span class="text-xs font-medium text-success">${sunProgress}%</span>
            </div>
            <div class="progress-bar">
              <div class="progress-fill progress-fill-success" style="width: ${sunProgress}%"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Saturday -->
      <div class="card">
        <div class="card-header">
          <div class="flex items-center gap-2">
            <span class="text-lg">🗓️</span>
            <span class="text-sm font-semibold text-gray-700">${t('weekend_saturday')}</span>
          </div>
          <span class="text-xs text-gray-400">${format(parseISO(saturday), 'd MMM')}</span>
        </div>

        ${satList.length > 0 ? `
          <div class="space-y-2">
            ${satList.map((activity, idx) => renderActivityItem(activity, saturday, idx)).join('')}
          </div>
        ` : `
          <div class="empty-state">
            <div class="empty-state-icon">🎯</div>
            <p class="empty-state-text">${t('weekend_no_activities')}</p>
          </div>
        `}

        <button class="btn btn-outline btn-block btn-sm mt-3 add-activity-btn" data-date="${saturday}">
          + ${t('weekend_add')}
        </button>
      </div>

      <!-- Sunday -->
      <div class="card">
        <div class="card-header">
          <div class="flex items-center gap-2">
            <span class="text-lg">🌟</span>
            <span class="text-sm font-semibold text-gray-700">${t('weekend_sunday')}</span>
          </div>
          <span class="text-xs text-gray-400">${format(parseISO(sunday), 'd MMM')}</span>
        </div>

        ${sunList.length > 0 ? `
          <div class="space-y-2">
            ${sunList.map((activity, idx) => renderActivityItem(activity, sunday, idx)).join('')}
          </div>
        ` : `
          <div class="empty-state">
            <div class="empty-state-icon">🎯</div>
            <p class="empty-state-text">${t('weekend_no_activities')}</p>
          </div>
        `}

        <button class="btn btn-outline btn-block btn-sm mt-3 add-activity-btn" data-date="${sunday}">
          + ${t('weekend_add')}
        </button>
      </div>
    </div>
  `

  // Add activity buttons
  document.querySelectorAll('.add-activity-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const date = btn.dataset.date
      showActivityModal(date, null, async (activity) => {
        const activitiesData = await getWeekendActivityByDate(date)
        const activities = activitiesData?.activities || []
        activities.push(activity)
        await api.updateWeekendActivity(activitiesData.id, { activities: JSON.stringify(activities) })
        hideModal()
        showToast(t('common_success'))
        window.location.reload()
      })
    })
  })

  // Activity item interactions
  attachActivityListeners(container)
}

function renderActivityItem(activity, date, index) {
  const isDone = activity.status === 'done'
  return `
    <div class="flex items-center gap-3 p-2 rounded-lg ${isDone ? 'bg-success/5' : 'bg-gray-50'} activity-item" data-date="${date}" data-index="${index}">
      <button class="toggle-done w-8 h-8 rounded-full flex items-center justify-center ${isDone ? 'bg-success text-white' : 'bg-gray-200 text-gray-400'} hover:opacity-80 transition-opacity">
        ${isDone ? '✓' : ''}
      </button>
      <div class="flex-1">
        <div class="flex items-center gap-2">
          <span class="text-sm font-medium ${isDone ? 'line-through text-gray-400' : 'text-gray-700'}">${activity.title}</span>
          <span class="badge weekend-${activity.category} text-xs">${CATEGORY_ICONS[activity.category]} ${t('weekend_categories.' + activity.category)}</span>
        </div>
        ${activity.location ? `<p class="text-xs text-gray-400">📍 ${activity.location}</p>` : ''}
      </div>
      <button class="edit-activity w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path></svg>
      </button>
    </div>
  `
}

function attachActivityListeners(container) {
  // Toggle done
  container.querySelectorAll('.toggle-done').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation()
      const item = btn.closest('.activity-item')
      const date = item.dataset.date
      const index = parseInt(item.dataset.index)

      const activitiesData = await getWeekendActivityByDate(date)
      const activities = [...(activitiesData?.activities || [])]
      const activity = activities[index]

      activity.status = activity.status === 'done' ? 'pending' : 'done'
      if (activity.status === 'done') {
        activity.completedAt = new Date().toISOString()
      } else {
        activity.completedAt = null
      }

      await api.updateWeekendActivity(activitiesData.id, { activities: JSON.stringify(activities) })
      showToast(t('common_success'))
      window.location.reload()
    })
  })

  // Edit activity
  container.querySelectorAll('.edit-activity').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation()
      const item = btn.closest('.activity-item')
      const date = item.dataset.date
      const index = parseInt(item.dataset.index)

      const activitiesData = await getWeekendActivityByDate(date)
      const activity = activitiesData?.activities?.[index]

      if (activity) {
        showActivityModal(date, activity, async (updated) => {
          const activities = [...(activitiesData?.activities || [])]
          activities[index] = { ...activities[index], ...updated }
          await api.updateWeekendActivity(activitiesData.id, { activities: JSON.stringify(activities) })
          hideModal()
          showToast(t('common_success'))
          window.location.reload()
        }, async () => {
          // Delete
          const activities = [...(activitiesData?.activities || [])]
          activities.splice(index, 1)
          await api.updateWeekendActivity(activitiesData.id, { activities: JSON.stringify(activities) })
          hideModal()
          showToast(t('common_success'))
          window.location.reload()
        })
      }
    })
  })
}

// Activity Modal
function showActivityModal(date, existing = null, onSave, onDelete = null) {
  const lang = getLang()

  showModal(`
    <div class="modal-header">
      <h3 class="modal-title">${existing ? t('common_edit') : t('weekend_add')}</h3>
      <button class="text-gray-400 hover:text-gray-600" id="modal-close">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>
    </div>
    <form id="activity-form" class="modal-body">
      <div class="input-group">
        <label class="input-label">${lang === 'id' ? 'Nama Aktivitas' : 'Activity Name'}</label>
        <input type="text" name="title" class="input" placeholder="${lang === 'id' ? 'Nama aktivitas' : 'Activity name'}" value="${existing?.title || ''}" required>
      </div>
      <div class="input-group">
        <label class="input-label">${t('weekend_categories.outdoor').replace('Outdoor', 'Kategori') || 'Category'}</label>
        <select name="category" class="select" required>
          ${CATEGORIES.map(cat => `
            <option value="${cat}" ${existing?.category === cat ? 'selected' : ''}>${CATEGORY_ICONS[cat]} ${t('weekend_categories.' + cat)}</option>
          `).join('')}
        </select>
      </div>
      <div class="input-group">
        <label class="input-label">${lang === 'id' ? 'Lokasi (opsional)' : 'Location (optional)'}</label>
        <input type="text" name="location" class="input" placeholder="${lang === 'id' ? 'Tempat' : 'Place'}" value="${existing?.location || ''}">
      </div>
    </form>
    <div class="modal-footer">
      ${existing && onDelete ? `<button type="button" class="btn btn-danger flex-1" id="delete-btn">${t('common_delete')}</button>` : ''}
      <button type="submit" form="activity-form" class="btn btn-primary flex-1">${t('common_save')}</button>
    </div>
  `)

  document.getElementById('modal-close').addEventListener('click', hideModal)

  document.getElementById('activity-form').addEventListener('submit', (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = {
      title: formData.get('title'),
      category: formData.get('category'),
      location: formData.get('location') || '',
      status: existing?.status || 'pending',
      completedAt: existing?.completedAt || null
    }
    onSave(data)
  })

  if (existing && onDelete) {
    document.getElementById('delete-btn').addEventListener('click', onDelete)
  }
}

function calculateProgress(activities) {
  if (!activities || activities.length === 0) return 0
  const done = activities.filter(a => a.status === 'done').length
  return Math.round((done / activities.length) * 100)
}

function calculateTotalProgress(sat, sun) {
  const total = (sat?.length || 0) + (sun?.length || 0)
  if (total === 0) return 0
  const done = (sat?.filter(a => a.status === 'done').length || 0) + (sun?.filter(a => a.status === 'done').length || 0)
  return Math.round((done / total) * 100)
}

// Global add modal
window.showAddModal = window.showAddModal || {}
window.showAddModal.weekend = () => {
  const today = new Date().getDay()
  const date = today === 0 ? format(addDays(startOfWeek(new Date(), { weekStartsOn: 6 }), 1), 'yyyy-MM-dd') : format(startOfWeek(new Date(), { weekStartsOn: 6 }), 'yyyy-MM-dd')

  showActivityModal(date, null, async (activity) => {
    const activitiesData = await getWeekendActivityByDate(date)
    const activities = activitiesData?.activities || []
    activities.push(activity)
    if (activitiesData) {
      await api.updateWeekendActivity(activitiesData.id, { activities: JSON.stringify(activities) })
    } else {
      await api.createWeekendActivity({ date, activities: typeof activities === 'string' ? activities : JSON.stringify(activities) })
    }
    hideModal()
    showToast(t('common_success'))
    window.location.reload()
  })
}

export default renderWeekend
