// screens/login.js - Login screen (SSO-only)
import { t, getLang } from '../i18n.js'
import { logout, checkAuth } from '../api/auth.js'
import { getOAuthURL } from '../api/client.js'
import { showToast } from '../main.js'
import { initSync } from '../api/sync.js'

const AUTH_KEY = 'sf_auth_token'

export function handleOAuthCallback() {
  const hash = window.location.hash
  // Handle both /#auth/callback and /auth/callback formats
  if (!hash.includes('auth/callback')) return false
  
  // Parse token from query params
  const params = new URLSearchParams(hash.split('?')[1] || '')
  const token = params.get('token')
  const userId = params.get('user_id')
  const email = params.get('email')
  const name = params.get('name')
  const errorReason = params.get('reason')
  const errorDetail = params.get('detail')
  
  // Handle error case
  if (errorReason) {
    showOAuthError(errorReason, errorDetail)
    return true
  }
  
  if (token) {
    localStorage.setItem(AUTH_KEY, token)
    if (userId && email) {
      localStorage.setItem('sf_user', JSON.stringify({ id: userId, email, name }))
    }
    window.location.hash = 'home'
    window.location.reload()
    return true
  }
  return false
}

function showOAuthError(reason, detail) {
  const errorMessages = {
    access_denied: 'You denied access to Google. Please try again.',
    invalid_state: 'Security check failed. Please try again.',
    email_not_whitelisted: 'Your email is not authorized to use this app.',
    account_suspended: 'Your account has been suspended.',
    oauth_error: 'OAuth login failed. Please try again.',
    oauth_disabled: 'Google login is not configured on the server.'
  }
  const message = errorMessages[reason] || detail || 'Login failed. Please try again.'
  showToast(message, 'error')
  setTimeout(() => {
    window.location.hash = 'login'
  }, 3000)
}

export function renderLogin(container) {
  // Handle OAuth callback
  if (handleOAuthCallback()) return

  // Check if already authenticated
  const token = localStorage.getItem(AUTH_KEY)
  if (token) {
    window.location.hash = 'home'
    return
  }

  const lang = getLang()

  container.innerHTML = `
    <div class="min-h-screen bg-gradient-to-b from-primary/10 to-white flex flex-col items-center justify-center p-6">
      <!-- Logo/Title -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">🏠 SuperFamily</h1>
        <p class="text-gray-500">Dashboard keluarga Farhan & Inne</p>
      </div>

      <!-- Google OAuth Only -->
      <div class="w-full max-w-sm">
        <div class="card text-center">
          <h2 class="text-xl font-semibold text-gray-700 mb-4">
            ${lang === 'id' ? 'Selamat Datang' : 'Welcome'}
          </h2>
          <p class="text-gray-500 mb-6 text-sm">
            ${lang === 'id' 
              ? 'Masuk dengan akun Google Anda untuk mengakses dashboard keluarga.' 
              : 'Sign in with your Google account to access the family dashboard.'}
          </p>
          
          <!-- Google OAuth Button -->
          <a href="${getOAuthURL()}" 
             class="flex items-center justify-center gap-3 w-full px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all text-gray-700 font-medium shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            ${lang === 'id' ? 'Masuk dengan Google' : 'Login with Google'}
          </a>
        </div>

        <!-- Privacy note -->
        <p class="mt-6 text-center text-xs text-gray-400">
          ${lang === 'id' 
            ? 'Dengan masuk, Anda menyetujui kebijakan privasi aplikasi.' 
            : 'By signing in, you agree to the app privacy policy.'}
        </p>
      </div>
    </div>
  `
}

export default renderLogin