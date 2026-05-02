// events.js - Calendar Events Screen
// CRUD events dengan mini calendar dan upcoming list

import { t, getLang } from '../i18n.js'
import { addEvent, updateEvent, deleteEvent, getAllEvents, getEventsByMonth, getUpcomingEvents } from '../db.js'
import { formatDate, showModal, hideModal, showToast } from '../main.js'
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, parseISO, isToday, isBefore, startOfWeek, endOfWeek } from 'date-fns'
import { id as idLocale, enUS } from 'date-fns/locale'
import { getAllEvents as getHolidays, HOLIDAY_TYPES } from '../data/holidays-id.js'

const EVENT_TYPES = ['birthday', 'anniversary', 'school', 'holiday', 'other']
const EVENT_COLORS = {
  birthday: '#EC4899',
  anniversary: '#EF4444',
  school: '#3B82F6',
  holiday: '#F59E0B',
  other: '#64748B'
}

export async function renderEvents(container) {
  const lang = getLang()
  const now = new Date()
  let currentYear = now.getFullYear()
  let currentMonth = now.getMonth() + 1

  // Check URL params
  const params = new URLSearchParams(window.location.hash.split('?')[1] || '')
  if (params.get('year') && params.get('month')) {
    currentYear = parseInt(params.get('year'))
    currentMonth = parseInt(params.get('month'))
  }

  // Get events
  const [allEvents, monthEvents] = await Promise.all([
    getAllEvents(),
    getEventsByMonth(currentYear, currentMonth)
  ])

  // Add holidays to events
  const holidays = getHolidays()
  const monthStr = `${currentYear}-${String(currentMonth).padStart(2, '0')}`
  const monthHolidays = holidays.filter(h => h.date.startsWith(monthStr))

  // Create event dates lookup (include holidays as fake events with negative IDs)
  const eventDates = {}
  monthEvents.forEach(e => {
    if (!eventDates[e.date]) eventDates[e.date] = []
    eventDates[e.date].push(e)
  })
  monthHolidays.forEach(h => {
    if (!eventDates[h.date]) eventDates[h.date] = []
    eventDates[h.date].push({ ...h, title: h.name, id: -Math.abs(h.date.split('-').join('')), isHoliday: true })
  })

  const upcomingEvents = (await getUpcomingEvents(90)).sort((a, b) => a.date.localeCompare(b.date))

  // Also get upcoming holidays for the next 90 days
  const today90 = new Date()
  today90.setDate(today90.getDate() + 90)
  const todayStr = format(new Date(), 'yyyy-MM-dd')
  const futureStr = format(today90, 'yyyy-MM-dd')
  const upcomingHolidays = holidays.filter(h => h.date >= todayStr && h.date <= futureStr).map(h => ({ ...h, title: h.name, id: -Math.abs(h.date.split('-').join('')), isHoliday: true }))

  // Combine and sort all upcoming events
  const allUpcoming = [...upcomingEvents, ...upcomingHolidays].sort((a, b) => a.date.localeCompare(b.date))


  // Get holidays for next 7 days (H-7)
  const weekEnd = new Date()
  weekEnd.setDate(weekEnd.getDate() + 7)
  const weekEndStr = format(weekEnd, 'yyyy-MM-dd')
  const weekHolidays = holidays.filter(h => h.date >= todayStr && h.date <= weekEndStr).map(h => ({ ...h, title: h.name }))

  // Build calendar
  const firstDay = new Date(currentYear, currentMonth - 1, 1)
  const lastDay = new Date(currentYear, currentMonth, 0)
  const daysInMonth = eachDayOfInterval({ start: firstDay, end: lastDay })

  // Get day names
  const dayNames = lang === 'id'
    ? ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']
    : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  // Get first day offset (0 = Sunday)
  const startOffset = firstDay.getDay()

  container.innerHTML = `
    <div class="space-y-4">
      <!-- Month Navigator -->
      <div class="flex items-center justify-between">
        <button class="btn btn-outline btn-sm" id="prev-month">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>
        <span class="text-sm font-medium text-gray-700">${format(new Date(currentYear, currentMonth - 1), 'MMMM yyyy')}</span>
        <button class="btn btn-outline btn-sm" id="next-month">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
      </div>

      <!-- Mini Calendar -->
      <div class="card">
        <div class="mini-calendar-grid mb-1">
          ${dayNames.map(d => `<div class="mini-calendar-day-header">${d}</div>`).join('')}
        </div>
        <div class="mini-calendar-grid">
          ${Array(startOffset).fill('').map(() => `<div class="mini-calendar-day mini-calendar-day-other"></div>`).join('')}
          ${daysInMonth.map(day => {
            const dateStr = format(day, 'yyyy-MM-dd')
            const hasEvent = eventDates[dateStr]?.length > 0
            const isTodayDate = isToday(day)
            return `
              <div class="mini-calendar-day ${isTodayDate ? 'mini-calendar-day-today' : ''} ${hasEvent && !isTodayDate ? 'mini-calendar-day-has-event' : ''}"
                   data-date="${dateStr}"
                   ${hasEvent ? `title="${eventDates[dateStr].map(e => e.title).join(', ')}"` : ''}>
                ${day.getDate()}
              </div>
            `
          }).join('')}
        </div>

        <!-- Events for selected date -->
        <div id="selected-date-events" class="mt-3 pt-3 border-t border-gray-100">
          <p class="text-xs text-gray-400 text-center">${lang === 'id' ? 'Klik tanggal untuk lihat agenda' : 'Tap a date to see events'}</p>
        </div>
      </div>

      ${weekHolidays.length > 0 ? `
      <div class="card border-purple-200 bg-purple-50">
        <div class="card-header">
          <span class="text-sm font-medium text-purple-700">${t('events_holidays_week')}</span>
          <span class="badge badge-purple">${weekHolidays.length}</span>
        </div>
        <div class="space-y-2">
          ${weekHolidays.map(h => `
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="text-lg">${h.type === 'national' ? '🇮🇩' : '🎉'}</span>
                <div>
                  <p class="text-sm font-medium text-gray-800">${h.name}</p>
                  <p class="text-xs text-purple-600">${formatDate(h.date, lang)}</p>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
      ` : ''}


      <!-- Upcoming Events -->
      <div class="card">
        <div class="card-header">
          <span class="text-sm font-medium text-gray-500">${t('events_upcoming')}</span>
        </div>

        ${allUpcoming.length > 0 ? `
          <div class="space-y-2">
            ${allUpcoming.slice(0, 10).map(event => `
              <div class="list-item cursor-pointer event-item" data-id="${event.id}">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${event.isHoliday ? 'bg-purple-100' : `event-${event.type}`}">
                    ${event.isHoliday ? '🎉' : (event.type === 'birthday' ? '🎂' : event.type === 'anniversary' ? '💕' : event.type === 'school' ? '📚' : event.type === 'holiday' ? '🎉' : '📌')}
                  </div>
                  <div class="list-item-content">
                    <span class="list-item-title">${event.title}</span>
                    ${event.isHoliday ? `<span class="badge badge-purple text-xs ml-2">${lang === 'id' ? 'Libur' : 'Holiday'}</span>` : `<span class="badge badge-${event.type === 'birthday' ? 'primary' : event.type === 'anniversary' ? 'danger' : 'gray'} text-xs ml-2">${t('events_types.' + event.type)}</span>`}
                    <p class="list-item-subtitle">${formatDate(event.date, lang)}</p>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        ` : `
          <div class="empty-state">
            <div class="empty-state-icon">📅</div>
            <p class="empty-state-text">${t('events_no_events')}</p>
          </div>
        `}
      </div>
    </div>
  `

  // Month navigation
  document.getElementById('prev-month').addEventListener('click', (e) => {
    e.preventDefault()
    const prev = subMonths(new Date(currentYear, currentMonth - 1), 1)
    window.location.hash = `events?year=${prev.getFullYear()}&month=${prev.getMonth() + 1}`
  })

  document.getElementById('next-month').addEventListener('click', (e) => {
    e.preventDefault()
    const next = addMonths(new Date(currentYear, currentMonth - 1), 1)
    window.location.hash = `events?year=${next.getFullYear()}&month=${next.getMonth() + 1}`
  })

  // Calendar day click
  document.querySelectorAll('.mini-calendar-day:not(.mini-calendar-day-other)').forEach(dayEl => {
    dayEl.addEventListener('click', () => {
      const dateStr = dayEl.dataset.date
      const eventsOnDate = eventDates[dateStr] || []
      const container = document.getElementById('selected-date-events')

      if (eventsOnDate.length > 0) {
        container.innerHTML = `
          <p class="text-xs text-gray-500 mb-2">${formatDate(dateStr, lang)}</p>
          ${eventsOnDate.map(e => `
            <div class="list-item cursor-pointer event-item" data-id="${e.id}">
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full" style="background: ${EVENT_COLORS[e.type]}"></span>
                <span class="list-item-title">${e.title}</span>
              </div>
            </div>
          `).join('')}
        `
        attachEventItemListeners(container)
      } else {
        container.innerHTML = `
          <p class="text-xs text-gray-500 mb-2">${formatDate(dateStr, lang)}</p>
          <p class="text-xs text-gray-400">${t('events_no_events')}</p>
        `
      }
    })
  })

  // Event item click
  attachEventItemListeners(container)
}

function attachEventItemListeners(container) {
  container.querySelectorAll('.event-item').forEach(item => {
    item.addEventListener('click', () => {
      const id = parseInt(item.dataset.id)
      getEventById(id).then(event => {
        if (event) showEventModal(event)
      })
    })
  })
}

async function getEventById(id) {
  const events = await getAllEvents()
  return events.find(e => e.id === id)
}

// Event Modal
function showEventModal(existing = null, defaultDate = null) {
  const lang = getLang()
  const today = format(new Date(), 'yyyy-MM-dd')

  showModal(`
    <div class="modal-header">
      <h3 class="modal-title">${existing ? t('events_edit') : t('events_add')}</h3>
      <button class="text-gray-400 hover:text-gray-600" id="modal-close">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>
    </div>
    <form id="event-form" class="modal-body">
      <div class="input-group">
        <label class="input-label">${t('events_name')}</label>
        <input type="text" name="title" class="input" placeholder="${lang === 'id' ? 'Nama agenda' : 'Event name'}" value="${existing?.title || ''}" required>
      </div>
      <div class="input-group">
        <label class="input-label">${t('events_date')}</label>
        <input type="date" name="date" class="input" value="${existing?.date || defaultDate || today}" required>
      </div>
      <div class="input-group">
        <label class="input-label">${t('events_type')}</label>
        <select name="type" class="select" required>
          ${EVENT_TYPES.map(type => `
            <option value="${type}" ${existing?.type === type ? 'selected' : ''}>${t('events_types.' + type)}</option>
          `).join('')}
        </select>
      </div>
      <div class="input-group">
        <label class="input-label">${lang === 'id' ? 'Catatan' : 'Note'}</label>
        <input type="text" name="note" class="input" placeholder="${lang === 'id' ? 'Catatan (opsional)' : 'Note (optional)'}" value="${existing?.note || ''}">
      </div>
    </form>
    <div class="modal-footer">
      ${existing ? `<button type="button" class="btn btn-danger flex-1" id="delete-btn">${t('events_delete')}</button>` : ''}
      <button type="submit" form="event-form" class="btn btn-primary flex-1">${t('events_save')}</button>
    </div>
  `)

  document.getElementById('modal-close').addEventListener('click', hideModal)

  document.getElementById('event-form').addEventListener('submit', async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = {
      title: formData.get('title'),
      date: formData.get('date'),
      type: formData.get('type'),
      note: formData.get('note') || '',
      color: EVENT_COLORS[formData.get('type')] || EVENT_COLORS.other
    }

    if (existing) {
      await updateEvent(existing.id, data)
      hideModal()
      showToast(t('common_success'))
      window.location.reload()
    } else {
      await addEvent(data)
      hideModal()
      showToast(t('common_success'))
      window.location.reload()
    }
  })

  if (existing) {
    document.getElementById('delete-btn').addEventListener('click', async () => {
      await deleteEvent(existing.id)
      hideModal()
      showToast(t('common_success'))
      window.location.reload()
    })
  }
}

// Global add modal
window.showAddModal = window.showAddModal || {}
window.showAddModal.events = () => showEventModal()

export { showEventModal }
export default renderEvents
