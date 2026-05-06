// Standalone H-2 Bills Notifier
// Run directly with Node.js (no imports from app)

const DB_NAME = 'SuperFamilyDB';

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function getBillsDueOnDate(db, daysAhead = 2) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction('bills', 'readonly');
    const store = tx.objectStore('bills');
    const request = store.getAll();
    request.onsuccess = () => {
      const today = new Date();
      const targetDate = new Date(today);
      targetDate.setDate(targetDate.getDate() + daysAhead);
      const targetStr = targetDate.toISOString().split('T')[0];
      const todayStr = today.toISOString().split('T')[0];
      const filtered = request.result.filter(b => 
        !b.isPaid && b.dueDate === targetStr && 
        (!b.notifiedAt || b.notifiedAt < todayStr)
      );
      resolve(filtered);
    };
    request.onerror = () => reject(request.error);
  });
}

async function getRemindersDueOnDate(db, daysAhead = 2) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction('reminders', 'readonly');
    const store = tx.objectStore('reminders');
    const request = store.getAll();
    request.onsuccess = () => {
      const today = new Date();
      const targetDate = new Date(today);
      targetDate.setDate(targetDate.getDate() + daysAhead);
      const targetStr = targetDate.toISOString().split('T')[0];
      const todayStr = today.toISOString().split('T')[0];
      const filtered = request.result.filter(r => 
        !r.isPaid && r.dueDate === targetStr && 
        (!r.notifiedAt || r.notifiedAt < todayStr)
      );
      resolve(filtered);
    };
    request.onerror = () => reject(request.error);
  });
}

async function markBillNotified(db, id) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction('bills', 'readwrite');
    const store = tx.objectStore('bills');
    const todayStr = new Date().toISOString().split('T')[0];
    const request = store.put({ id, notifiedAt: todayStr });
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

async function markReminderNotified(db, id) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction('reminders', 'readwrite');
    const store = tx.objectStore('reminders');
    const todayStr = new Date().toISOString().split('T')[0];
    const request = store.put({ id, notifiedAt: todayStr });
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0
  }).format(amount);
}

const freqText = {
  weekly: 'Mingguan',
  monthly: 'Bulanan',
  yearly: 'Tahunan',
  one_time: 'Sekali'
};

const RECIPIENTS = ['+6285710853686', '+62895371901190'];

async function run() {
  console.log('[H2 Notifier] Starting...');
  
  let db;
  try {
    db = await openDB();
  } catch (err) {
    console.error('[H2 Notifier] Cannot open IndexedDB:', err.message);
    console.log('This script needs to run in a browser context with IndexedDB available.');
    process.exit(1);
  }

  const [bills, reminders] = await Promise.all([
    getBillsDueOnDate(db),
    getRemindersDueOnDate(db)
  ]);

  console.log(`[H2 Notifier] Found ${bills.length} bills, ${reminders.length} reminders due on H-2`);

  if (bills.length === 0 && reminders.length === 0) {
    console.log('[H2 Notifier] No items due in 2 days. NO_REPLY.');
    db.close();
    return;
  }

  const lines = ['📋 *Tagihan & Pajak H-2*'];

  if (bills.length > 0) {
    lines.push('\n📄 *Tagihan:*');
    for (const b of bills) {
      lines.push(`• ${b.title}: ${formatCurrency(b.amount)} (${freqText[b.frequency] || 'Bulanan'})`);
    }
  }

  if (reminders.length > 0) {
    lines.push('\n📋 *Pajak/Surat:*');
    for (const r of reminders) {
      lines.push(`• ${r.title}: ${formatCurrency(r.amount)}`);
    }
  }

  lines.push('\n_Semua ini perlu dibayar dalam 2 hari ya! 💸_');
  const msg = lines.join('\n');

  console.log('[H2 Notifier] Message:\n' + msg);

  // Try to use the message tool
  try {
    // Dynamic import for openclaw message
    const openclawPkg = await import('openclaw').catch(() => null) || 
                        await import('/home/farhan/.openclaw/node_modules/openclaw').catch(() => null);
    if (openclawPkg && openclawPkg.message) {
      for (const target of RECIPIENTS) {
        await openclawPkg.message({ action: 'send', channel: 'whatsapp', target, message: msg });
        console.log(`[H2 Notifier] Sent to ${target}`);
      }
    } else {
      throw new Error('message function not found');
    }
  } catch (err) {
    console.error('[H2 Notifier] Cannot send message via openclaw:', err.message);
    console.log('[H2 Notifier] Falling back to console output only.');
  }

  // Mark as notified
  for (const b of bills) await markBillNotified(db, b.id);
  for (const r of reminders) await markReminderNotified(db, r.id);

  db.close();
  console.log('[H2 Notifier] Done.');
}

run().catch(err => {
  console.error('[H2 Notifier] Fatal error:', err);
  process.exit(1);
});