// api/bills.js - Bills API calls
import apiClient from './client.js'

export async function getBills() {
  const response = await apiClient.get('/bills')
  return response.bills || []
}

export async function getBill(id) {
  return apiClient.get(`/bills/${id}`)
}

export async function createBill(data) {
  return apiClient.post('/bills', data)
}

export async function updateBill(id, data) {
  return apiClient.put(`/bills/${id}`, data)
}

export async function deleteBill(id) {
  return apiClient.delete(`/bills/${id}`)
}

export async function markBillPaid(id) {
  return apiClient.post(`/bills/${id}/mark-paid`, {})
}

export async function markBillUnpaid(id) {
  return apiClient.post(`/bills/${id}/mark-unpaid`, {})
}

export async function getBillsDueSoon(days = 7) {
  const response = await apiClient.get(`/bills/due-soon?days=${days}`)
  return response.bills || []
}

// Sync bills from API to local Dexie
export async function syncBillsToLocal() {
  const bills = await getBills()
  const { db } = await import('../db.js')
  
  // Clear and reload
  await db.bills.clear()
  for (const bill of bills) {
    await db.bills.add({
      id: bill.id,
      title: bill.title,
      amount: bill.amount,
      dueDate: bill.due_date,
      frequency: bill.frequency,
      category: bill.category,
      isPaid: bill.is_paid,
      paidDate: bill.paid_date || null,
      notifyBefore: bill.notify_before,
      note: bill.note || ''
    })
  }
  
  return bills
}

export default { getBills, getBill, createBill, updateBill, deleteBill, markBillPaid, markBillUnpaid, getBillsDueSoon, syncBillsToLocal }