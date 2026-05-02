// budget.js - Budget Tracker Screen
// CRUD transaksi dan budget bulanan dengan Income/Expense tracking

import { t, getLang } from '../i18n.js'
import { addTransaction, updateTransaction, deleteTransaction, getTransactionsByMonth, getMonthlyBudget, setMonthlyBudget } from '../db.js'
import { formatCurrency, formatDate, showModal, hideModal, showToast } from '../main.js'
import { format, addMonths, subMonths, parseISO } from 'date-fns'

const CATEGORIES = [
  // Income
  'salary_farhan', 'salary_inne', 'freelance', 'thr', 'ortu_gift', 'other_income',
  // Expense
  'makan', 'transportasi', 'belanja', 'zaidan', 'utilitas', 'lainnya',
  'loan', 'core_needed', 'budget_personal', 'gift', 'deposit', 'utility'
]

const INCOME_CATEGORIES = ['salary_farhan', 'salary_inne', 'freelance', 'thr', 'ortu_gift', 'other_income']
const EXPENSE_CATEGORIES = ['makan', 'transportasi', 'belanja', 'zaidan', 'utilitas', 'lainnya', 'loan', 'core_needed', 'budget_personal', 'gift', 'deposit', 'utility']

export async function renderBudget(container) {
  const lang = getLang()
  const now = new Date()
  let currentYear = now.getFullYear()
  let currentMonth = now.getMonth() + 1

  // Check URL params for month navigation
  const params = new URLSearchParams(window.location.hash.split('?')[1] || '')
  if (params.get('year') && params.get('month')) {
    currentYear = parseInt(params.get('year'))
    currentMonth = parseInt(params.get('month'))
  }

  const monthKey = `${currentYear}-${String(currentMonth).padStart(2, '0')}`

  // Get data
  const [transactions, budget] = await Promise.all([
    getTransactionsByMonth(currentYear, currentMonth),
    getMonthlyBudget(monthKey)
  ])

  // Calculate totals
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + (t.amount || 0), 0)
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + (t.amount || 0), 0)
  const cashLeft = totalIncome - totalExpense
  const budgetAmount = budget?.amount || totalIncome
  const budgetRemaining = budgetAmount - totalExpense

  // Group transactions by date
  const groupedByDate = {}
  transactions.sort((a, b) => b.date.localeCompare(a.date)).forEach(trx => {
    if (!groupedByDate[trx.date]) groupedByDate[trx.date] = []
    groupedByDate[trx.date].push(trx)
  })

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

      <!-- Budget Summary Cards -->
      <div class="grid grid-cols-3 gap-3">
        <div class="card text-center">
          <p class="text-xs text-gray-500 mb-1">${t('budget_income')}</p>
          <p class="text-lg font-bold font-tabular text-success">${formatCurrency(totalIncome)}</p>
        </div>
        <div class="card text-center">
          <p class="text-xs text-gray-500 mb-1">${t('budget_expense')}</p>
          <p class="text-lg font-bold font-tabular text-danger">${formatCurrency(totalExpense)}</p>
        </div>
        <div class="card text-center">
          <p class="text-xs text-gray-500 mb-1">${t('budget_cash_left')}</p>
          <p class="text-lg font-bold font-tabular ${cashLeft >= 0 ? 'text-success' : 'text-danger'}">${formatCurrency(Math.abs(cashLeft))}</p>
        </div>
      </div>

      <!-- Add Income/Expense Buttons -->
      <div class="grid grid-cols-2 gap-3">
        <button class="btn btn-success btn-block" id="add-income-btn">
          ➕ ${t('budget_type_income')}
        </button>
        <button class="btn btn-danger btn-block" id="add-expense-btn">
          ➖ ${t('budget_type_expense')}
        </button>
      </div>

      <!-- Transactions List -->
      <div class="card">
        <div class="card-header">
          <span class="text-sm font-medium text-gray-500">${t('budget_today')}</span>
          <span class="text-sm font-tabular font-medium text-gray-700">${transactions.length} transaksi</span>
        </div>

        ${Object.keys(groupedByDate).length > 0 ? `
          <div>
            ${Object.entries(groupedByDate).map(([date, txns]) => `
              <div class="mb-3">
                <p class="text-xs text-gray-400 mb-2">${formatDate(date, lang)}</p>
                ${txns.map(trx => `
                  <div class="list-item cursor-pointer" data-id="${trx.id}">
                    <div class="list-item-content">
                      <div class="flex items-center gap-2">
                        <span class="w-2 h-2 rounded-full ${trx.type === 'income' ? 'bg-success' : 'bg-danger'}"></span>
                        <span class="list-item-title">${t('budget_categories.' + trx.category) || trx.category}</span>
                        ${trx.status === 'done' ? `<span class="badge badge-success text-xs ml-1">✓</span>` : `<span class="badge badge-warning text-xs ml-1">○</span>`}
                      </div>
                      ${trx.note ? `<p class="list-item-subtitle">${trx.note}</p>` : ''}
                    </div>
                    <div class="list-item-action text-right">
                      <span class="font-tabular font-medium ${trx.type === 'income' ? 'text-success' : 'text-danger'}">
                        ${trx.type === 'income' ? '+' : '-'}${formatCurrency(trx.amount)}
                      </span>
                    </div>
                  </div>
                `).join('')}
              </div>
            `).join('')}
          </div>
        ` : `
          <div class="empty-state">
            <div class="empty-state-icon">💸</div>
            <p class="empty-state-text">${t('budget_no_transactions')}</p>
          </div>
        `}
      </div>
    </div>
  `

  // Month navigation
  document.getElementById('prev-month').addEventListener('click', (e) => {
    e.preventDefault()
    const prev = subMonths(new Date(currentYear, currentMonth - 1), 1)
    window.location.hash = `budget?year=${prev.getFullYear()}&month=${prev.getMonth() + 1}`
  })

  document.getElementById('next-month').addEventListener('click', (e) => {
    e.preventDefault()
    const next = addMonths(new Date(currentYear, currentMonth - 1), 1)
    window.location.hash = `budget?year=${next.getFullYear()}&month=${next.getMonth() + 1}`
  })

  // Add income button
  document.getElementById('add-income-btn').addEventListener('click', () => {
    showTransactionModal(null, 'income', async (data) => {
      await addTransaction({ ...data, type: 'income', status: data.status || 'not_done' })
      showToast(t('common_success'))
      renderBudget(container)
    })
  })

  // Add expense button
  document.getElementById('add-expense-btn').addEventListener('click', () => {
    showTransactionModal(null, 'expense', async (data) => {
      await addTransaction({ ...data, type: 'expense', status: data.status || 'not_done' })
      showToast(t('common_success'))
      renderBudget(container)
    })
  })

  // Transaction click to edit
  document.querySelectorAll('.list-item').forEach(item => {
    item.addEventListener('click', () => {
      const id = parseInt(item.dataset.id)
      const trx = transactions.find(t => t.id === id)
      if (trx) showTransactionModal(trx, trx.type, async (data) => {
        await updateTransaction(id, { ...data, type: trx.type })
        hideModal()
        showToast(t('common_success'))
        renderBudget(container)
      }, async () => {
        await deleteTransaction(id)
        hideModal()
        showToast(t('common_success'))
        renderBudget(container)
      })
    })
  })
}

// Transaction Modal
function showTransactionModal(existing = null, defaultType = 'expense', onSave, onDelete) {
  const lang = getLang()
  const today = format(new Date(), 'yyyy-MM-dd')
  const trxType = existing?.type || defaultType
  const categories = trxType === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES

  showModal(`
    <div class="modal-header">
      <h3 class="modal-title">${existing ? t('budget_edit') : (trxType === 'income' ? t('budget_type_income') : t('budget_type_expense'))}</h3>
      <button class="text-gray-400 hover:text-gray-600" id="modal-close">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>
    </div>
    <form id="transaction-form" class="modal-body">
      <div class="input-group">
        <label class="input-label">${t('budget_amount')}</label>
        <input type="number" name="amount" class="input" placeholder="0" value="${existing?.amount || ''}" required min="1">
      </div>
      <div class="input-group">
        <label class="input-label">${t('budget_category')}</label>
        <select name="category" class="select" required>
          ${categories.map(cat => `
            <option value="${cat}" ${existing?.category === cat ? 'selected' : ''}>${t('budget_categories.' + cat)}</option>
          `).join('')}
        </select>
      </div>
      <div class="input-group">
        <label class="input-label">${t('budget_date')}</label>
        <input type="date" name="date" class="input" value="${existing?.date || today}" required>
      </div>
      <div class="input-group">
        <label class="input-label">Status</label>
        <select name="status" class="select" required>
          <option value="not_done" ${existing?.status === 'not_done' || !existing ? 'selected' : ''}>○ ${t('budget_status_not_done')}</option>
          <option value="done" ${existing?.status === 'done' ? 'selected' : ''}>✓ ${t('budget_status_done')}</option>
        </select>
      </div>
      <div class="input-group">
        <label class="input-label">${t('budget_note')}</label>
        <input type="text" name="note" class="input" placeholder="${lang === 'id' ? 'Catatan (opsional)' : 'Note (optional)'}" value="${existing?.note || ''}">
      </div>
    </form>
    <div class="modal-footer">
      ${existing ? `<button type="button" class="btn btn-danger flex-1" id="delete-btn">${t('budget_delete')}</button>` : ''}
      <button type="submit" form="transaction-form" class="btn btn-primary flex-1">${t('budget_save')}</button>
    </div>
  `)

  document.getElementById('modal-close').addEventListener('click', hideModal)

  document.getElementById('transaction-form').addEventListener('submit', (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = {
      amount: parseInt(formData.get('amount')),
      category: formData.get('category'),
      date: formData.get('date'),
      status: formData.get('status'),
      note: formData.get('note') || '',
      updatedAt: new Date()
    }
    onSave(data)
  })

  if (existing && onDelete) {
    document.getElementById('delete-btn').addEventListener('click', () => {
      if (confirm(t('common_confirm_delete'))) {
        onDelete()
      }
    })
  }
}

export { showTransactionModal }
