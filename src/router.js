// router.js - Simple hash-based router
// Navigasi antar screen menggunakan hash (#)

const routes = {
  login: { title: 'Login', screen: 'login' },
  auth_callback: { title: 'Auth Callback', screen: 'login' },
  auth_error: { title: 'Auth Error', screen: 'login' },
  home: { title: 'Beranda', screen: 'home' },
  budget: { title: 'Budget', screen: 'budget' },
  events: { title: 'Agenda', screen: 'events' },
  mealplan: { title: 'Meal Plan', screen: 'mealplan' },
  weekend: { title: 'Weekend', screen: 'weekend' },
  bills: { title: 'Tagihan', screen: 'bills' }
}

// Get current route from hash
export function getCurrentRoute() {
  const hash = window.location.hash.slice(1) || 'home'
  const parts = hash.split('?')
  const routeName = parts[0]
  const queryString = parts.length > 1 ? parts[1] : ''
  const route = routes[routeName] || routes.home
  return { ...route, queryString }
}

// Navigate to a route
export function navigate(route) {
  window.location.hash = route
}

// Setup router listener
export function setupRouter(callback) {
  // Initial route
  callback(getCurrentRoute())

  // Listen for hash changes
  window.addEventListener('hashchange', () => {
    callback(getCurrentRoute())
  })
}

// Get all routes
export function getRoutes() {
  return routes
}

export default { getCurrentRoute, navigate, setupRouter, getRoutes }