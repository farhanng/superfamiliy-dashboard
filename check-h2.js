// Simple query to check bills/reminders for H-2 from current date
// H-2 from April 30 = May 2, 2026

const DB_NAME = 'SuperFamilyDB';
const DB_VERSION = 2;

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function queryH2Items() {
  const db = await openDB();
  const today = new Date();
  const targetDate = new Date(today);
  targetDate.setDate(targetDate.getDate() + 2);
  const targetStr = targetDate.toISOString().split('T')[0];
  const todayStr = today.toISOString().split('T')[0];

  console.log('Today:', todayStr);
  console.log('H-2 Date:', targetStr);

  const tx = db.transaction(['bills', 'reminders'], 'readonly');
  
  const getItems = (storeName) => new Promise((resolve) => {
    const store = tx.objectStore(storeName);
    const request = store.getAll();
    request.onsuccess = () => {
      const items = request.result.filter(item => {
        if (item.isPaid) return false;
        if (item.dueDate !== targetStr) return false;
        if (item.notifiedAt && item.notifiedAt >= todayStr) return false;
        return true;
      });
      resolve(items);
    };
    request.onerror = () => resolve([]);
  });

  const [bills, reminders] = await Promise.all([getItems('bills'), getItems('reminders')]);
  
  console.log('Bills due on', targetStr + ':', JSON.stringify(bills, null, 2));
  console.log('Reminders due on', targetStr + ':', JSON.stringify(reminders, null, 2));
  
  db.close();
  return { bills, reminders, targetStr };
}

queryH2Items().catch(console.error);