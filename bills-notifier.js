// bills-notifier.js - Cron job untuk notification tagihan & pajak H-2
// Run: node bills-notifier.js

import { getBillsDueOnDate, getRemindersDueOnDate, markBillNotified, markReminderNotified } from './src/db.js'
import { formatCurrency, formatDate } from './src/main.js'
import { message } from 'openclaw'
import { getLang } from './src/i18n.js'

const RECIPIENTS = ['+6285710853686', '+62895371901190'] // Kak Inne & Kak Farhan

async function sendNotification() {
  console.log('[BillsNotifier] Checking bills and reminders due in 2 days...')
  
  const [bills, reminders] = await Promise.all([
    getBillsDueOnDate(2),
    getRemindersDueOnDate(2)
  ])
  
  const lang = 'id' // Default Indonesian
  
  // Build WhatsApp message
  let messages = []
  
  if (bills.length > 0) {
    messages.push(`📋 *Tagihan H-2*`)
    bills.forEach(b => {
      const freqText = {
        weekly: 'Mingguan',
        monthly: 'Bulanan', 
        yearly: 'Tahunan',
        one_time: 'Sekali'
      }[b.frequency] || 'Bulanan'
      messages.push(`• ${b.title}: ${formatCurrency(b.amount)} (${freqText})`)
    })
  }
  
  if (reminders.length > 0) {
    messages.push(`\n📋 *Pajak/Surat H-2*`)
    reminders.forEach(r => {
      messages.push(`• ${r.title}: ${formatCurrency(r.amount)}`)
    })
  }
  
  if (messages.length > 0) {
    messages.push(`\n_Ada yang perlu dibayar dalam 2 hari ya Kak! 💸_`)
    
    const fullMessage = messages.join('\n')
    console.log('[BillsNotifier] Sending notification:', fullMessage)
    
    try {
      for (const recipient of RECIPIENTS) {
        await message({
          action: 'send',
          channel: 'whatsapp',
          target: recipient,
          message: fullMessage
        })
      }
      
      // Mark as notified
      for (const bill of bills) {
        await markBillNotified(bill.id)
      }
      for (const rem of reminders) {
        await markReminderNotified(rem.id)
      }
      
      console.log('[BillsNotifier] Notification sent to all recipients and marked as notified!')
    } catch (err) {
      console.error('[BillsNotifier] Failed to send notification:', err)
    }
  } else {
    console.log('[BillsNotifier] No bills or reminders due in 2 days.')
  }
}

sendNotification().catch(console.error)
