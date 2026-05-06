// run-notifier.js - Standalone bills reminder notifier
import { getBillsDueOnDate, getRemindersDueOnDate, markBillNotified, markReminderNotified, db } from './src/db.js'

const RECIPIENTS = ['+6285710853686', '+62895371901190']

const freqText = {
  weekly: 'Mingguan',
  monthly: 'Bulanan',
  yearly: 'Tahunan',
  one_time: 'Sekali'
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

async function sendNotification() {
  console.log('[Notifier] Checking H-2 bills and reminders...')

  const [bills, reminders] = await Promise.all([
    getBillsDueOnDate(2),
    getRemindersDueOnDate(2)
  ])

  console.log(`[Notifier] Found ${bills.length} bills, ${reminders.length} reminders due on H-2`)

  if (bills.length === 0 && reminders.length === 0) {
    console.log('[Notifier] No items due in 2 days. NO_REPLY.')
    return
  }

  const lines = []
  lines.push('📋 *Tagihan & Pajak H-2*')

  if (bills.length > 0) {
    lines.push('\n📄 *Tagihan:*')
    for (const b of bills) {
      lines.push(`• ${b.title}: ${formatCurrency(b.amount)} (${freqText[b.frequency] || 'Bulanan'})`)
    }
  }

  if (reminders.length > 0) {
    lines.push('\n📋 *Pajak/Surat:*')
    for (const r of reminders) {
      lines.push(`• ${r.title}: ${formatCurrency(r.amount)}`)
    }
  }

  lines.push('\n_Semua ini perlu dibayar dalam 2 hari ya! 💸_')

  const fullMessage = lines.join('\n')
  console.log('[Notifier] Message:\n' + fullMessage)

  // Import message tool
  const { default: message } = await import('openclaw')

  for (const recipient of RECIPIENTS) {
    try {
      await message({ action: 'send', channel: 'whatsapp', target: recipient, message: fullMessage })
      console.log(`[Notifier] Sent to ${recipient}`)
    } catch (err) {
      console.error(`[Notifier] Failed to send to ${recipient}:`, err.message)
    }
  }

  // Mark as notified
  for (const bill of bills) {
    await markBillNotified(bill.id)
  }
  for (const rem of reminders) {
    await markReminderNotified(rem.id)
  }
  console.log('[Notifier] Done.')
}

sendNotification().catch(err => {
  console.error('[Notifier] Error:', err)
  process.exit(1)
})