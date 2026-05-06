// bills.js - Bills & Tax Reminders Screen
// CRUD bills dan tax reminders dengan due date tracking
// Migrated to Firestore

import { t, getLang } from '../i18n.js'
import * as api from '../services/api.js'
import { formatCurrency, formatDate, showModal, hideModal, showToast } from '../main.js'
import { format, parseISO, differenceInDays, isPast, isToday } from 'date-fns'

const BILL_CATEGORIES = ['air', 'ipl', 'cicilan', 'internet', 'pendidikan', 'lainnya']
const BILL_FREQUENCIES = ['one_time', 'weekly', 'monthly', 'yearly']
const TAX_DURATIONS = ['one_time', '1_year', '5_years']
const TAX_CATEGORIES = ['pbb', 'sim', 'stnk', 'paspor', 'lainnya']

export async function renderBills(container) {
  const lang = getLang()
  const now = new Date()
  const today = format(now, 'yyyy-MM-dd')

  // Get all data from Firestore
  const [bills, reminders] = await Promise.all([
    api.getBills(),
    api.getReminders()
  ])

  // Sort by due date
  bills.sort((a, b) => (a.dueDate || '').localeCompare(b.dueDate || ''))
  reminders.sort((a, b) => (a.dueDate || '').localeCompare(b.dueDate || ''))

  // Categorize
  const unpaidBills = bills.filter(b => !b.isPaid)
  const paidBills = bills.filter(b => b.isPaid)
  const unpaidReminders = reminders.filter(r => !r.isPaid)
  const paidReminders = reminders.filter(r => r.isPaid)

  // Calculate totals
  const unpaidTotal = unpaidBills.reduce((sum, b) => sum + b.amount, 0)

  // Get overdue and due soon
  const overdueBills = unpaidBills.filter(b => isPast(parseISO(b.dueDate)) && !isToday(parseISO(b.dueDate)))
  const dueSoonBills = unpaidBills.filter(b => {
    const days = differenceInDays(parseISO(b.dueDate), now)
    return days >= 0 && days <= 7
  })

  container.innerHTML = `
    <div class="space-y-4">
      <!-- Summary Cards -->
      <div class="grid grid-cols-2 gap-3">
        <div class="card">
          <div class="card-header">
            <span class="text-xs font-medium text-gray-500">${t('bills_total_month')}</span>
          </div>
          <p class="text-lg font-bold font-tabular text-warning">${formatCurrency(unpaidTotal)}</p>
        </div>
        <div class="card">
          <div class="card-header">
            <span class="text-xs font-medium text-gray-500">${lang === 'id' ? 'Tagihan Aktif' : 'Active Bills'}</span>
          </div>
          <p class="text-lg font-bold font-tabular text-primary">${unpaidBills.length}</p>
        </div>
      </div>

      ${overdueBills.length > 0 ? `
        <div class="card border-danger bg-danger/5">
          <div class="flex items-center gap-2 mb-2">
            <span class="text-lg">⚠️</span>
            <span class="text-sm font-semibold text-danger">${t('bills_overdue')}</span>
          </div>
          <div class="space-y-2">
            ${overdueBills.slice(0, 3).map(b => `
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-700">${b.title}</span>
                <span class="text-sm font-tabular font-medium text-danger">${formatCurrency(b.amount)}</span>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <!-- Tabs -->
      <div class="tabs">
        <div class="tab tab-active" data-tab="bills">${t('bills_title')} (${unpaidBills.length})</div>
        <div class="tab" data-tab="tax">${t('tax_title')} (${unpaidReminders.length})</div>
      </div>

      <!-- Bills Tab Content -->
      <div id="tab-bills" class="tab-content">
        ${unpaidBills.length > 0 ? `
          <div class="space-y-2">
            ${unpaidBills.map(bill => renderBillItem(bill, today, lang)).join('')}
          </div>
          <button class="btn btn-primary w-full mt-3" id="add-bill-btn">+ ${t('bills_add')}</button>
        ` : `
          <div class="card">
            <div class="empty-state">
              <div class="empty-state-icon">📄</div>
              <p class="empty-state-text">${t('bills_no_bills')}</p>
              <button class="btn btn-primary mt-3" id="add-bill-btn">+ ${t('bills_add')}</button>
            </div>
          </div>
        `}

        ${paidBills.length > 0 ? `
          <div class="mt-4">
            <p class="text-xs text-gray-400 mb-2">${lang === 'id' ? 'Sudah Lunas' : 'Paid'}</p>
            <div class="space-y-2">
              ${paidBills.slice(0, 5).map(bill => renderBillItem(bill, today, lang, true)).join('')}
            </div>
          </div>
        ` : ''}
      </div>

      <!-- Tax Reminders Tab Content -->
      <div id="tab-tax" class="tab-content hidden">
        ${unpaidReminders.length > 0 ? `
          <div class="space-y-2">
            ${unpaidReminders.map(reminder => renderReminderItem(reminder, today, lang)).join('')}
          </div>
        ` : `
          <div class="card">
            <div class="empty-state">
              <div class="empty-state-icon">📋</div>
              <p class="empty-state-text">${t('tax_no_items')}</p>
            </div>
          </div>
        `}

        ${paidReminders.length > 0 ? `
          <div class="mt-4">
            <p class="text-xs text-gray-400 mb-2">${lang === 'id' ? 'Sudah Lunas' : 'Paid'}</p>
            <div class="space-y-2">
              ${paidReminders.slice(0, 5).map(reminder => renderReminderItem(reminder, today, lang, true)).join('')}
            </div>
          </div>
        ` : ''}
      </div>
    </div>
  `

  // Tab switching
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('tab-active'))
      document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'))
      tab.classList.add('tab-active')
      document.getElementById('tab-' + tab.dataset.tab).classList.remove('hidden')
    })
  })

  // Bill item interactions
  attachBillListeners(container, bills, today)

  // Reminder item interactions
  attachReminderListeners(container, reminders, today)
}

function renderBillItem(bill, today, lang, isPaid = false) {
  const dueDate = parseISO(bill.dueDate)
  const daysUntil = differenceInDays(dueDate, parseISO(today))
  const isOverdue = isPast(dueDate) && !isToday(dueDate) && !isPaid
  const isDueSoon = daysUntil >= 0 && daysUntil <= 7 && !isPaid

  let statusClass = ''
  let statusBadge = ''

  if (isPaid) {
    statusClass = 'opacity-60'
    statusBadge = `<span class="badge badge-success">${t('bills_paid')}</span>`
  } else if (isOverdue) {
    statusClass = 'border-l-4 border-danger'
    statusBadge = `<span class="badge badge-danger">${t('bills_overdue')}</span>`
  } else if (isDueSoon) {
    statusClass = 'border-l-4 border-warning'
    statusBadge = `<span class="badge badge-warning">${daysUntil === 0 ? (lang === 'id' ? 'Hari ini!' : 'Today!') : (lang === 'id' ? `${daysUntil}h` : `${daysUntil}d`)}</span>`
  }

  return `
    <div class="card ${statusClass} bill-item cursor-pointer" data-id="${bill.id}">
      <div class="flex items-center justify-between">
        <div class="flex-1">
          <div class="flex items-center gap-2">
            <span class="text-sm font-medium text-gray-800">${bill.title}</span>
            ${statusBadge}
          </div>
          <p class="text-xs text-gray-400 mt-1">
            ${lang === 'id' ? 'Jatuh tempo' : 'Due'}: ${formatDate(bill.dueDate, lang)}
          </p>
          ${bill.note ? `<p class="text-xs text-gray-500 mt-1">${bill.note}</p>` : ''}
        </div>
        <div class="text-right ml-3">
          <p class="text-sm font-tabular font-bold ${isPaid ? 'text-gray-400 line-through' : 'text-gray-800'}">${formatCurrency(bill.amount)}</p>
          ${!isPaid ? `
            <button class="btn btn-sm btn-success mt-1 mark-paid-btn" data-id="${bill.id}">✓</button>
          ` : `
            <button class="btn btn-sm btn-outline mt-1 mark-unpaid-btn" data-id="${bill.id}">↩</button>
          `}
        </div>
      </div>
    </div>
  `
}

function renderReminderItem(reminder, today, lang, isPaid = false) {
  const dueDate = parseISO(reminder.dueDate)
  const daysUntil = differenceInDays(dueDate, parseISO(today))
  const isOverdue = isPast(dueDate) && !isToday(dueDate) && !isPaid
  const isDueSoon = daysUntil >= 0 && daysUntil <= 30 && !isPaid

  let statusClass = ''
  let statusBadge = ''

  if (isPaid) {
    statusClass = 'opacity-60'
    statusBadge = `<span class="badge badge-success">${t('tax_paid')}</span>`
  } else if (isOverdue) {
    statusClass = 'border-l-4 border-danger'
    statusBadge = `<span class="badge badge-danger">${t('bills_overdue')}</span>`
  } else if (isDueSoon) {
    statusClass = 'border-l-4 border-warning'
    statusBadge = `<span class="badge badge-warning">${daysUntil === 0 ? (lang === 'id' ? 'Hari ini!' : 'Today!') : (lang === 'id' ? `${daysUntil}h` : `${daysUntil}d`)}</span>`
  }

  return `
    <div class="card ${statusClass} reminder-item cursor-pointer" data-id="${reminder.id}">
      <div class="flex items-center justify-between">
        <div class="flex-1">
          <div class="flex items-center gap-2">
            <span class="text-sm font-medium text-gray-800">${reminder.title}</span>
            ${statusBadge}
          </div>
          <p class="text-xs text-gray-400 mt-1">
            ${lang === 'id' ? 'Jatuh tempo' : 'Due'}: ${formatDate(reminder.dueDate, lang)}
            ${reminder.frequency ? ` • ${reminder.frequency}` : ''}
          </p>
        </div>
        <div class="text-right ml-3">
          <p class="text-sm font-tabular font-bold ${isPaid ? 'text-gray-400 line-through' : 'text-gray-800'}">${formatCurrency(reminder.amount)}</p>
          ${!isPaid ? `
            <button class="btn btn-sm btn-success mt-1 mark-paid-btn" data-id="${reminder.id}">✓</button>
          ` : `
            <button class="btn btn-sm btn-outline mt-1 mark-unpaid-btn" data-id="${reminder.id}">↩</button>
          `}
        </div>
      </div>
    </div>
  `
}

function attachBillListeners(container, bills, today) {
  // Click to edit
  container.querySelectorAll('.bill-item').forEach(item => {
    if (item.classList.contains('reminder-item')) return
    item.addEventListener('click', (e) => {
      if (e.target.closest('.mark-paid-btn') || e.target.closest('.mark-unpaid-btn')) return
      const id = item.dataset.id
      const bill = bills.find(b => b.id === id)
      if (bill) showBillModal(bill)
    })
  })

  // Mark paid
  container.querySelectorAll('.bill-item .mark-paid-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation()
      const id = btn.dataset.id
      const bill = bills.find(b => b.id === id)
      try {
        await api.markBillPaid(id)
        // Auto-generate next month's bill for recurring frequencies
        if (bill && bill.frequency && bill.frequency !== 'one_time') {
          const nextDate = new Date(bill.dueDate)
          if (bill.frequency === 'monthly') nextDate.setMonth(nextDate.getMonth() + 1)
          else if (bill.frequency === 'weekly') nextDate.setDate(nextDate.getDate() + 7)
          else if (bill.frequency === 'yearly') nextDate.setFullYear(nextDate.getFullYear() + 1)
          const nextDueStr = nextDate.toISOString().split('T')[0]
          await api.createBill({
            title: bill.title,
            amount: bill.amount,
            dueDate: nextDueStr,
            frequency: bill.frequency,
            category: bill.category,
            isPaid: false,
            note: bill.note || ''
          })
        }
        showToast(t('common_success'))
        window.location.reload()
      } catch (error) {
        console.error('Error marking bill paid:', error)
        showToast(t('common_error'), 'error')
      }
    })
  })

  // Mark unpaid
  container.querySelectorAll('.bill-item .mark-unpaid-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation()
      const id = btn.dataset.id
      try {
        await api.markBillUnpaid(id)
        showToast(t('common_success'))
        window.location.reload()
      } catch (error) {
        console.error('Error marking bill unpaid:', error)
        showToast(t('common_error'), 'error')
      }
    })
  })

  // Add bill button (empty state or below list)
  container.querySelectorAll('#add-bill-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      showBillModal(null, async (data) => {
        try {
          await api.createBill(data)
          hideModal()
          showToast(t('common_success'))
          window.location.reload()
        } catch (error) {
          console.error('Error adding bill:', error)
          showToast(t('common_error'), 'error')
        }
      })
    })
  })
}

function attachReminderListeners(container, reminders, today) {
  // Click to edit
  container.querySelectorAll('.reminder-item').forEach(item => {
    item.addEventListener('click', (e) => {
      if (e.target.closest('.mark-paid-btn') || e.target.closest('.mark-unpaid-btn')) return
      const id = item.dataset.id
      const reminder = reminders.find(r => r.id === id)
      if (reminder) showReminderModal(reminder)
    })
  })

  // Mark paid
  container.querySelectorAll('.reminder-item .mark-paid-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation()
      const id = btn.dataset.id
      try {
        await api.markReminderPaid(id)
        showToast(t('common_success'))
        window.location.reload()
      } catch (error) {
        console.error('Error marking reminder paid:', error)
        showToast(t('common_error'), 'error')
      }
    })
  })

  // Mark unpaid
  container.querySelectorAll('.reminder-item .mark-unpaid-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation()
      const id = btn.dataset.id
      try {
        await api.markReminderUnpaid(id)
        showToast(t('common_success'))
        window.location.reload()
      } catch (error) {
        console.error('Error marking reminder unpaid:', error)
        showToast(t('common_error'), 'error')
      }
    })
  })
}

// Bill Modal
function showBillModal(existing = null, onSave, onDelete) {
  const lang = getLang()
  const today = format(new Date(), 'yyyy-MM-dd')

  showModal(`
    <div class="modal-header">
      <h3 class="modal-title">${existing ? t('bills_edit') : t('bills_add')}</h3>
      <button class="text-gray-400 hover:text-gray-600" id="modal-close">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>
    </div>
    <form id="bill-form" class="modal-body">
      <div class="input-group">
        <label class="input-label">${t('bills_name')}</label>
        <input type="text" name="title" class="input" placeholder="${lang === 'id' ? 'Nama tagihan' : 'Bill name'}" value="${existing?.title || ''}" required>
      </div>
      <div class="input-group">
        <label class="input-label">${t('bills_amount')}</label>
        <input type="number" name="amount" class="input" placeholder="0" value="${existing?.amount || ''}" required min="1">
      </div>
      <div class="input-group">
        <label class="input-label">${t('bills_due_date')}</label>
        <input type="date" name="dueDate" class="input" value="${existing?.dueDate || today}" required>
      </div>
      <div class="input-group">
        <label class="input-label">${lang === 'id' ? 'Kategori' : 'Category'}</label>
        <select name="category" class="select" required>
          ${BILL_CATEGORIES.map(cat => `
            <option value="${cat}" ${existing?.category === cat ? 'selected' : ''}>${t('bills_categories.' + cat)}</option>
          `).join('')}
        </select>
      </div>
      <div class="input-group">
        <label class="input-label">${t('bills_frequency')}</label>
        <select name="frequency" class="select" required>
          <option value="monthly" ${existing?.frequency === 'monthly' || !existing?.frequency ? 'selected' : ''}>${t('bills_monthly')}</option>
          <option value="weekly" ${existing?.frequency === 'weekly' ? 'selected' : ''}>${t('bills_weekly')}</option>
          <option value="yearly" ${existing?.frequency === 'yearly' ? 'selected' : ''}>${t('bills_yearly')}</option>
          <option value="one_time" ${existing?.frequency === 'one_time' ? 'selected' : ''}>${t('bills_one_time')}</option>
        </select>
      </div>
      <div class="input-group">
        <label class="input-label">${lang === 'id' ? 'Catatan' : 'Note'}</label>
        <input type="text" name="note" class="input" placeholder="${lang === 'id' ? 'Catatan (opsional)' : 'Note (optional)'}" value="${existing?.note || ''}">
      </div>
    </form>
    <div class="modal-footer">
      ${existing ? `<button type="button" class="btn btn-danger flex-1" id="delete-btn">${t('bills_delete')}</button>` : ''}
      <button type="submit" form="bill-form" class="btn btn-primary flex-1">${t('bills_save')}</button>
    </div>
  `)

  document.getElementById('modal-close').addEventListener('click', hideModal)

  document.getElementById('bill-form').addEventListener('submit', async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = {
      title: formData.get('title'),
      amount: parseInt(formData.get('amount')),
      dueDate: formData.get('dueDate'),
      category: formData.get('category'),
      note: formData.get('note') || '',
      frequency: formData.get('frequency') || 'monthly'
    }
    if (existing) {
      try {
        await api.updateBill(existing.id, data)
        showToast(t('common_success'))
        hideModal()
        window.location.reload()
      } catch (error) {
        console.error('Error updating bill:', error)
        showToast(t('common_error'), 'error')
      }
    } else if (onSave) {
      onSave(data)
    }
  })


  if (existing) {
    document.getElementById('delete-btn')?.addEventListener('click', async () => {
      if (confirm(t('common_confirm_delete'))) {
        try {
          await api.deleteBill(existing.id)
          hideModal()
          window.location.reload()
        } catch (error) {
          console.error('Error deleting bill:', error)
          showToast(t('common_error'), 'error')
        }
      }
    })
  } else if (onDelete) {
    document.getElementById('delete-btn')?.addEventListener('click', onDelete)
  }
}

// Reminder Modal
function showReminderModal(existing = null, onSave, onDelete) {
  const lang = getLang()
  const today = format(new Date(), 'yyyy-MM-dd')

  showModal(`
    <div class="modal-header">
      <h3 class="modal-title">${existing ? t('common_edit') : t('tax_add')}</h3>
      <button class="text-gray-400 hover:text-gray-600" id="modal-close">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>
    </div>
    <form id="reminder-form" class="modal-body">
      <div class="input-group">
        <label class="input-label">${t('tax_name')}</label>
        <input type="text" name="title" class="input" placeholder="${lang === 'id' ? 'Nama' : 'Name'}" value="${existing?.title || ''}" required>
      </div>
      <div class="input-group">
        <label class="input-label">${t('tax_amount')}</label>
        <input type="number" name="amount" class="input" placeholder="0" value="${existing?.amount || ''}" required min="1">
      </div>
      <div class="input-group">
        <label class="input-label">${t('tax_due_date')}</label>
        <input type="date" name="dueDate" class="input" value="${existing?.dueDate || today}" required>
      </div>
      <div class="input-group">
        <label class="input-label">${lang === 'id' ? 'Kategori' : 'Category'}</label>
        <select name="category" class="select" required>
          ${TAX_CATEGORIES.map(cat => `
            <option value="${cat}" ${existing?.category === cat ? 'selected' : ''}>${cat.toUpperCase()}</option>
          `).join('')}
        </select>
      </div>
      <div class="input-group">
        <label class="input-label">${t('tax_duration')}</label>
        <select name="duration" class="select" required>
          <option value="one_time" ${existing?.duration === 'one_time' || !existing?.duration ? 'selected' : ''}>${t('tax_one_time')}</option>
          <option value="1_year" ${existing?.duration === '1_year' ? 'selected' : ''}>${t('tax_1_year')}</option>
          <option value="5_years" ${existing?.duration === '5_years' ? 'selected' : ''}>${t('tax_5_years')}</option>
        </select>
      </div>
      <div class="input-group">
        <label class="input-label">${lang === 'id' ? 'Catatan' : 'Note'}</label>
        <input type="text" name="note" class="input" placeholder="${lang === 'id' ? 'Catatan (opsional)' : 'Note (optional)'}" value="${existing?.note || ''}">
      </div>
    </form>
    <div class="modal-footer">
      ${existing ? `<button type="button" class="btn btn-danger flex-1" id="delete-btn">${t('tax_delete')}</button>` : ''}
      <button type="submit" form="reminder-form" class="btn btn-primary flex-1">${t('tax_save')}</button>
    </div>
  `)

  document.getElementById('modal-close').addEventListener('click', hideModal)

  document.getElementById('reminder-form').addEventListener('submit', async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = {
      title: formData.get('title'),
      amount: parseInt(formData.get('amount')),
      dueDate: formData.get('dueDate'),
      category: formData.get('category'),
      duration: formData.get('duration') || 'one_time',
      note: formData.get('note') || ''
    }
    if (existing) {
      try {
        await api.updateReminder(existing.id, data)
        showToast(t('common_success'))
        hideModal()
        window.location.reload()
      } catch (error) {
        console.error('Error updating reminder:', error)
        showToast(t('common_error'), 'error')
      }
    } else if (onSave) {
      onSave(data)
    }
  })


  if (existing) {
    document.getElementById('delete-btn')?.addEventListener('click', async () => {
      if (confirm(t('common_confirm_delete'))) {
        try {
          await api.deleteReminder(existing.id)
          hideModal()
          window.location.reload()
        } catch (error) {
          console.error('Error deleting reminder:', error)
          showToast(t('common_error'), 'error')
        }
      }
    })
  } else if (onDelete) {
    document.getElementById('delete-btn')?.addEventListener('click', onDelete)
  }
}

// Global add modal
window.showAddModal = window.showAddModal || {}
window.showAddModal.bills = () => {
  // Show tab selection first
  showModal(`
    <div class="modal-header">
      <h3 class="modal-title">${t('common_add')}</h3>
      <button class="text-gray-400 hover:text-gray-600" id="modal-close">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>
    </div>
    <div class="modal-body space-y-3">
      <button class="btn btn-outline btn-block" id="add-bill-btn">📄 ${t('bills_add')}</button>
      <button class="btn btn-outline btn-block" id="add-tax-btn">📋 ${t('tax_add')}</button>
    </div>
  `)

  document.getElementById('modal-close').addEventListener('click', hideModal)

  document.getElementById('add-bill-btn').addEventListener('click', () => {
    hideModal()
    showBillModal(null, async (data) => {
      try {
        await api.createBill(data)
        hideModal()
        showToast(t('common_success'))
        window.location.reload()
      } catch (error) {
        console.error('Error adding bill:', error)
        showToast(t('common_error'), 'error')
      }
    })
  })

  document.getElementById('add-tax-btn').addEventListener('click', () => {
    hideModal()
    showReminderModal(null, async (data) => {
      try {
        await api.createReminder(data)
        hideModal()
        showToast(t('common_success'))
        window.location.reload()
      } catch (error) {
        console.error('Error adding reminder:', error)
        showToast(t('common_error'), 'error')
      }
    })
  })
}

export { showBillModal, showReminderModal }
export default renderBills
