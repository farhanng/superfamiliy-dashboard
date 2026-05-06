import { getBillsDueOnDate, getRemindersDueOnDate, markBillNotified, markReminderNotified } from './src/db.js'
import { message } from 'openclaw'

const RECIPIENTS = ['+6285710853686', '+62895371901190']

const freqText = {
  weekly: 'Mingguan',
  monthly: 'Bulanan',
  yearly: 'Tahunan',
  one_time: 'Sekali'
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0
  }).format(amount)
}

async function run() {
  console.log('[H2 Notifier] Checking bills and reminders due on H-2...')
  const [bills, reminders] = await Promise.all([getBillsDueOnDate(2), getRemindersDueOnDate(2)])
  console.log(`  Found ${bills.length} bills, ${reminders.length} reminders`)
  if (bills.length === 0 && reminders.length === 0) return

  const lines = ['📋 *Tagihan & Pajak H-2*']
  if (bills.length > 0) {
    lines.push('\n📄 *Tagihan:*')
    for (const b of bills) lines.push(`• ${b.title}: ${formatCurrency(b.amount)} (${freqText[b.frequency]||'Bulanan'})`)
  }
  if (reminders.length > 0) {
    lines.push('\n📋 *Pajak/Surat:*')
    for (const r of reminders) lines.push(`• ${r.title}: ${formatCurrency(r.amount)}`)
  }
  lines.push('\n_Semua ini perlu dibayar dalam 2 hari ya! 💸_')
  const msg = lines.join('\n')
  console.log('[H2 Notifier] Message:\n' + msg)

  for (const target of RECIPIENTS) {
    try {
      await message({ action: 'send', channel: 'whatsapp', target, message: msg })
      console.log(`  Sent to ${target}`)
    } catch (e) { console.error(`  Failed to ${target}: ${e.message}`) }
  }
  for (const b of bills) await markBillNotified(b.id)
  for (const r of reminders) await markReminderNotified(r.id)
  console.log('[H2 Notifier] Done.')
}

run().catch(console.error)