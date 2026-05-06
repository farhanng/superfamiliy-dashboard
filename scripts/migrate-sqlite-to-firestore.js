#!/usr/bin/env node
/**
 * migrate-sqlite-to-firestore.js
 * 
 * Migration script to move data from SQLite database to Firestore.
 * 
 * Usage:
 *   node scripts/migrate-sqlite-to-firestore.js [--dry-run]
 * 
 * Options:
 *   --dry-run    Preview data without actually uploading to Firestore
 * 
 * Prerequisites:
 *   1. Set environment variables for Firebase Admin SDK:
 *      - GOOGLE_APPLICATION_CREDENTIALS (path to service account JSON)
 *      - FIREBASE_PROJECT_ID
 *   2. Or use firebase-admin directly with credentials
 */

import 'dotenv/config'
import { readFileSync } from 'fs'
import { createRequire } from 'module'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const require = createRequire(import.meta.url)

// Try to load SQLite
let sqlite3
try {
  sqlite3 = require('better-sqlite3')
} catch (e) {
  console.warn('better-sqlite3 not found, trying sqlite3...')
  try {
    sqlite3 = require('sqlite3')
  } catch (e2) {
    console.error('SQLite library not found. Please install: npm install better-sqlite3')
    process.exit(1)
  }
}

// Firebase Admin SDK
let admin
try {
  admin = require('firebase-admin')
} catch (e) {
  console.error('firebase-admin not found. Please install: npm install firebase-admin')
  process.exit(1)
}

// Configuration
const DRY_RUN = process.argv.includes('--dry-run')
const DB_PATH = process.env.SQLITE_DB_PATH || path.join(__dirname, '..', 'data', 'superfamily.db')

// Firestore collection names
const COLLECTIONS = {
  bills: 'bills',
  reminders: 'reminders',
  events: 'events',
  transactions: 'transactions',
  budgets: 'budgets',
  mealPlans: 'mealPlans',
  weekendActivities: 'weekendActivities'
}

// SQL queries to extract data
const QUERIES = {
  bills: `
    SELECT id, title, amount, due_date, frequency, category, is_paid, paid_date, paid_by,
           notify_before, notified_at, note, created_by, created_at, updated_at
    FROM bills
  `,
  reminders: `
    SELECT id, title, amount, due_date, frequency, category, is_paid, paid_date, paid_by,
           notify_before, notified_at, note, created_by, created_at, updated_at
    FROM reminders
  `,
  events: `
    SELECT id, title, date, type, color, notify_days, note, created_by, created_at, updated_at
    FROM events
  `,
  transactions: `
    SELECT id, amount, category, date, type, status, note, created_by, created_at, updated_at
    FROM transactions
  `,
  budgets: `
    SELECT id, month, amount, updated_at
    FROM budgets
  `,
  mealPlans: `
    SELECT id, week_start, meals, created_by, created_at, updated_at
    FROM mealPlans
  `,
  weekendActivities: `
    SELECT id, date, activities, created_by, created_at, updated_at
    FROM weekend_activities
  `
}

// Transform functions
function transformBill(row) {
  return {
    title: row.title,
    amount: row.amount,
    dueDate: row.due_date,
    frequency: row.frequency,
    category: row.category,
    isPaid: !!row.is_paid,
    paidDate: row.paid_date || null,
    paidBy: row.paid_by || null,
    notifyBefore: row.notify_before || 2,
    notifiedAt: row.notified_at || null,
    note: row.note || null,
    createdBy: row.created_by || null,
    createdAt: row.created_at ? new Date(row.created_at) : null,
    updatedAt: row.updated_at ? new Date(row.updated_at) : null
  }
}

function transformReminder(row) {
  return {
    title: row.title,
    amount: row.amount,
    dueDate: row.due_date,
    frequency: row.frequency,
    category: row.category,
    isPaid: !!row.is_paid,
    paidDate: row.paid_date || null,
    paidBy: row.paid_by || null,
    notifyBefore: row.notify_before || 30,
    notifiedAt: row.notified_at || null,
    note: row.note || null,
    createdBy: row.created_by || null,
    createdAt: row.created_at ? new Date(row.created_at) : null,
    updatedAt: row.updated_at ? new Date(row.updated_at) : null
  }
}

function transformEvent(row) {
  return {
    title: row.title,
    date: row.date,
    type: row.type || 'other',
    color: row.color || '#64748B',
    notifyDays: row.notify_days || 7,
    note: row.note || null,
    createdBy: row.created_by || null,
    createdAt: row.created_at ? new Date(row.created_at) : null,
    updatedAt: row.updated_at ? new Date(row.updated_at) : null
  }
}

function transformTransaction(row) {
  return {
    amount: row.amount,
    category: row.category,
    date: row.date,
    type: row.type || 'expense',
    status: row.status || 'not_done',
    note: row.note || null,
    createdBy: row.created_by || null,
    createdAt: row.created_at ? new Date(row.created_at) : null,
    updatedAt: row.updated_at ? new Date(row.updated_at) : null
  }
}

function transformBudget(row) {
  return {
    month: row.month,
    amount: row.amount,
    updatedAt: row.updated_at ? new Date(row.updated_at) : null
  }
}

function transformMealPlan(row) {
  return {
    weekStart: row.week_start,
    meals: row.meals || '{}',
    createdBy: row.created_by || null,
    createdAt: row.created_at ? new Date(row.created_at) : null,
    updatedAt: row.updated_at ? new Date(row.updated_at) : null
  }
}

function transformWeekendActivity(row) {
  let activities = []
  try {
    activities = JSON.parse(row.activities || '[]')
  } catch (e) {
    activities = []
  }
  return {
    date: row.date,
    activities,
    createdBy: row.created_by || null,
    createdAt: row.created_at ? new Date(row.created_at) : null,
    updatedAt: row.updated_at ? new Date(row.updated_at) : null
  }
}

const TRANSFORMERS = {
  bills: transformBill,
  reminders: transformReminder,
  events: transformEvent,
  transactions: transformTransaction,
  budgets: transformBudget,
  mealPlans: transformMealPlan,
  weekendActivities: transformWeekendActivity
}

// Initialize Firebase Admin
function initFirebase() {
  const projectId = process.env.FIREBASE_PROJECT_ID || process.env.GCLOUD_PROJECT
  
  if (!projectId) {
    console.error('Error: FIREBASE_PROJECT_ID or GCLOUD_PROJECT environment variable not set')
    process.exit(1)
  }
  
  // Initialize with credentials file
  const credentialsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS || 
                         path.join(__dirname, '..', 'deploy', 'svc-account.json')
  
  try {
    let serviceAccount
    if (process.env.FIREBASE_CREDENTIALS) {
      serviceAccount = JSON.parse(process.env.FIREBASE_CREDENTIALS)
    } else {
      serviceAccount = JSON.parse(readFileSync(credentialsPath, 'utf8'))
    }
    
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId
    })
    
    console.log(`Firebase Admin initialized for project: ${projectId}`)
    return admin.firestore()
  } catch (error) {
    console.error('Failed to initialize Firebase Admin:', error.message)
    console.error('Make sure GOOGLE_APPLICATION_CREDENTIALS or FIREBASE_CREDENTIALS is set')
    process.exit(1)
  }
}

// Open SQLite database
function openDatabase() {
  try {
    const db = new sqlite3.Database(DB_PATH)
    console.log(`Opened SQLite database: ${DB_PATH}`)
    return db
  } catch (error) {
    console.error(`Failed to open database: ${DB_PATH}`, error.message)
    process.exit(1)
  }
}

// Get all rows from a table
function getRows(db, query) {
  try {
    const stmt = db.prepare(query)
    const rows = stmt.all()
    stmt.close()
    return rows
  } catch (error) {
    console.warn('Query warning:', error.message)
    return []
  }
}

// Migration stats
const stats = {
  collections: {},
  errors: []
}

// Migrate a single collection
async function migrateCollection(db, firestore, collectionName) {
  console.log(`\n--- Migrating ${collectionName} ---`)
  
  const query = QUERIES[collectionName]
  const transform = TRANSFORMERS[collectionName]
  
  if (!query || !transform) {
    console.warn(`No query or transformer for ${collectionName}, skipping`)
    return
  }
  
  const rows = getRows(db, query)
  console.log(`Found ${rows.length} records in SQLite`)
  
  if (rows.length === 0) {
    console.log(`No data to migrate for ${collectionName}`)
    stats.collections[collectionName] = { total: 0, migrated: 0 }
    return
  }
  
  const collection = firestore.collection(COLLECTIONS[collectionName] || collectionName)
  let migrated = 0
  
  for (const row of rows) {
    try {
      const data = transform(row)
      
      if (DRY_RUN) {
        console.log(`  [DRY-RUN] Would create: ${JSON.stringify(data).substring(0, 100)}...`)
      } else {
        const docRef = await collection.add(data)
        console.log(`  Migrated: ${row.id || 'new-doc'} -> ${docRef.id}`)
      }
      migrated++
    } catch (error) {
      console.error(`  Error migrating record:`, error.message)
      stats.errors.push({ collection: collectionName, error: error.message, data: row })
    }
  }
  
  stats.collections[collectionName] = { total: rows.length, migrated }
  console.log(`Migrated ${migrated}/${rows.length} records`)
}

// Main migration function
async function main() {
  console.log('===========================================')
  console.log('SQLite to Firestore Migration Script')
  console.log('===========================================')
  console.log(`Mode: ${DRY_RUN ? 'DRY-RUN (no changes will be made)' : 'LIVE (data will be uploaded)'}`)
  
  // Initialize Firebase
  const firestore = initFirebase()
  
  // Open SQLite database
  const db = openDatabase()
  
  // Migrate each collection
  const collectionNames = Object.keys(QUERIES)
  
  for (const name of collectionNames) {
    await migrateCollection(db, firestore, name)
  }
  
  // Close database
  db.close()
  console.log('\nSQLite database closed')
  
  // Print summary
  console.log('\n===========================================')
  console.log('Migration Summary')
  console.log('===========================================')
  
  for (const [name, stat] of Object.entries(stats.collections)) {
    console.log(`${name}: ${stat.migrated}/${stat.total} migrated`)
  }
  
  if (stats.errors.length > 0) {
    console.log(`\nErrors: ${stats.errors.length}`)
    stats.errors.forEach((err, i) => {
      console.log(`  ${i + 1}. ${err.collection}: ${err.error}`)
    })
  }
  
  if (DRY_RUN) {
    console.log('\nThis was a dry run. Run without --dry-run to actually migrate data.')
  }
  
  console.log('\nMigration complete!')
  
  process.exit(stats.errors.length > 0 ? 1 : 0)
}

// Run
main().catch(error => {
  console.error('Migration failed:', error)
  process.exit(1)
})
