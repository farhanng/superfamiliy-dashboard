// main.js - Entry point aplikasi
// Inisialisasi app, router, dan render screen pertama

import './styles.css'
import { setupRouter, navigate, getCurrentRoute } from './router.js'
import { t, getLang, toggleLang } from './i18n.js'
import { renderHome } from './screens/home.js'
import { renderBudget } from './screens/budget.js'
import { renderEvents } from './screens/events.js'
import { renderMealPlan } from './screens/mealplan.js'
import { renderWeekend } from './screens/weekend.js'
import { renderBills } from './screens/bills.js'
import { renderLogin } from './screens/login.js'
import { isAuthenticated, logout } from './firebase.js'
// Screen renderers
const screenRenderers = {
  login: renderLogin,
  home: renderHome,
  budget: renderBudget,
  events: renderEvents,
  mealplan: renderMealPlan,
  weekend: renderWeekend,
  bills: renderBills
}

// Protected routes that require authentication
const protectedRoutes = ['home', 'budget', 'events', 'mealplan', 'weekend', 'bills']

// Check if route requires auth
function requiresAuth(routeName) {
  return protectedRoutes.includes(routeName)
}

// Render app shell dengan screen saat ini
function renderApp(route) {
  const app = document.getElementById('app')

  // Check authentication for protected routes
  if (requiresAuth(route.screen) && !isAuthenticated()) {
    route = { title: 'Login', screen: 'login' }
    window.location.hash = 'login'
  }

  // Show login screen without app shell
  if (route.screen === 'login') {
    renderLogin(app)
    return
  }

  const lang = getLang()

  app.innerHTML = `
    <!-- App Container -->
    <div class="app-container pb-20">
      <!-- Header -->
      <header class="fixed top-0 left-0 right-0 bg-white z-40 border-b border-gray-100">
        <div class="flex items-center justify-between px-4 py-3">
          <h1 class="text-lg font-semibold text-gray-800" id="screen-title">${t('nav_' + route.screen)}</h1>
          <div class="flex items-center gap-2">
            ${route.screen === 'bills' || route.screen === 'events' ? `<button id="add-screen-btn" class="btn btn-sm btn-primary" title="${t('common_add')}">+</button>` : ''}
            <button id="lang-toggle" class="flex items-center gap-1 text-sm text-primary font-medium">
              <span>${lang === 'id' ? '🇮🇩' : '🇬🇧'}</span>
              <span>${lang.toUpperCase()}</span>
            </button>
            <button id="logout-btn" class="text-sm text-gray-500 hover:text-danger" title="${lang === 'id' ? 'Keluar' : 'Logout'}">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" x2="9" y1="12" y2="12"></line>
              </svg>
            </button>
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <main class="pt-14" id="screen-content">
        <div class="p-4">
          <div class="text-center py-8 text-gray-400">${t('common_loading')}</div>
        </div>
      </main>



      <!-- Bottom Navigation -->
      <nav class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-40">
        <div class="grid grid-cols-6">
          ${generateNavItem('home', 'Home')}
          ${generateNavItem('budget', 'Wallet')}
          ${generateNavItem('events', 'Calendar')}
          ${generateNavItem('mealplan', 'UtensilsCrossed')}
          ${generateNavItem('weekend', 'Target')}
          ${generateNavItem('bills', 'Bell')}
        </div>
      </nav>
    </div>

    <!-- Modal Container -->
    <div id="modal-container" class="hidden fixed inset-0 z-50"></div>
  `

  // Attach nav listeners
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault()
      const routeName = item.dataset.route
      // Check auth before navigating to protected routes
      if (requiresAuth(routeName) && !isAuthenticated()) {
        window.location.hash = 'login'
        return
      }
      navigate(routeName)
    })
  })

  // Lang toggle
  document.getElementById('lang-toggle').addEventListener('click', () => {
    toggleLang()
    renderApp(getCurrentRoute())
  })

  // Add screen button (Bills/Events)
  document.getElementById('add-screen-btn')?.addEventListener('click', () => {
    const route = getCurrentRoute().screen
    if (window.showAddModal && typeof window.showAddModal[route] === 'function') {
      window.showAddModal[route]()
    }
  })

  // Logout button
  document.getElementById('logout-btn').addEventListener('click', async () => {
    if (confirm(lang === 'id' ? 'Keluar dari aplikasi?' : 'Logout from app?')) {
      try {
        await logout()
        showToast(lang === 'id' ? 'Berhasil keluar' : 'Logged out successfully')
        window.location.reload()
      } catch (error) {
        console.error('Logout error:', error)
        showToast(lang === 'id' ? 'Gagal keluar' : 'Logout failed', 'error')
      }
    }
  })



  // Render the actual screen
  setTimeout(() => {
    const renderer = screenRenderers[route.screen]
    if (renderer) {
      renderer(document.getElementById('screen-content'))
    }
  }, 10)
}

function generateNavItem(screen, icon) {
  const isActive = getCurrentRoute().screen === screen
  const icons = {
    Home: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline>',
    Wallet: '<path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"></path>',
    Calendar: '<rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect><line x1="16" x2="16" y1="2" y2="6"></line><line x1="8" x2="8" y1="2" y2="6"></line><line x1="3" x2="21" y1="10" y2="10"></line>',
    UtensilsCrossed: '<path d="m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8"></path><path d="M15 15 .6.6a2.2 2.2 0 0 0-3.1 3.1l3.1 3.1"></path><line x1="2" x2="22" y1="2" y2="22"></line>',
    Target: '<circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle>',
    Bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>'
  }

  return `
    <a href="#${screen}" class="nav-item flex flex-col items-center py-2 px-1 ${isActive ? 'text-primary' : 'text-gray-400'}" data-route="${screen}">
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        ${icons[icon]}
      </svg>
      <span class="text-xs mt-1">${t('nav_' + screen)}</span>
    </a>
  `
}

// Listen for language changes
window.addEventListener('langchange', () => {
  renderApp(getCurrentRoute())
})

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  setupRouter(renderApp)
})

// Global modal helpers
export function showModal(content) {
  const container = document.getElementById('modal-container')
  container.innerHTML = `
    <div class="fixed inset-0 bg-black/50 z-50" id="modal-backdrop"></div>
    <div class="fixed inset-x-4 top-1/2 -translate-y-1/2 z-50 max-w-md mx-auto">
      <div class="bg-white rounded-xl shadow-2xl max-h-[80vh] overflow-auto">
        ${content}
      </div>
    </div>
  `
  container.classList.remove('hidden')

  // Close on backdrop click
  document.getElementById('modal-backdrop').addEventListener('click', hideModal)

  // Prevent body scroll
  document.body.style.overflow = 'hidden'
}

export function hideModal() {
  const container = document.getElementById('modal-container')
  container.classList.add('hidden')
  container.innerHTML = ''
  document.body.style.overflow = ''
}

export function showToast(message, type = 'success') {
  const toast = document.createElement('div')
  toast.className = `fixed top-20 left-1/2 -translate-x-1/2 px-4 py-2 rounded-lg text-white text-sm z-50 ${type === 'success' ? 'bg-success' : type === 'error' ? 'bg-danger' : 'bg-warning'}`
  toast.textContent = message
  document.body.appendChild(toast)
  setTimeout(() => toast.remove(), 2500)
}

// Format currency
export function formatCurrency(amount) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

// Format date
export function formatDate(dateStr, lang = 'id') {
  const date = new Date(dateStr)
  const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }
  return date.toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-US', options)
}