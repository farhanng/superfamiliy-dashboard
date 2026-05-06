// screens/login.js - Login screen (Backend OAuth)
import { t, getLang } from '../i18n.js'
import { login, isAuthenticated, getCurrentUser, getToken } from '../services/api.js'
import { showToast } from '../main.js'

export function renderLogin(container) {
  const lang = getLang()

  // Check if already authenticated with backend
  if (isAuthenticated()) {
    window.location.hash = 'home'
    return
  }

  container.innerHTML = `
    <div class="min-h-screen bg-gradient-to-b from-primary/10 to-white flex flex-col items-center justify-center p-6">
      <!-- Logo/Title -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">🏠 SuperFamily</h1>
        <p class="text-gray-500">Dashboard keluarga Farhan & Inne</p>
      </div>

      <!-- Login Form -->
      <div class="w-full max-w-sm">
        <div class="card text-center">
          <h2 class="text-xl font-semibold text-gray-700 mb-4">
            ${lang === 'id' ? 'Selamat Datang' : 'Welcome'}
          </h2>
          <p class="text-gray-500 mb-6 text-sm">
            ${lang === 'id' 
              ? 'Masuk untuk mengakses dashboard keluarga.' 
              : 'Sign in to access the family dashboard.'}
          </p>
          
          <!-- Email/Password Form -->
          <form id="login-form" class="space-y-3 text-left">
            <div>
              <label class="block text-sm font-medium text-gray-600 mb-1">Email</label>
              <input type="email" id="login-email" required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="email@contoh.com">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-600 mb-1">${lang === 'id' ? 'Password' : 'Password'}</label>
              <input type="password" id="login-password" required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="••••••">
            </div>
            <button type="submit" id="login-submit"
              class="w-full py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors">
              ${lang === 'id' ? 'Masuk' : 'Login'}
            </button>
          </form>
          
          <div class="relative my-4">
            <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-gray-200"></div></div>
            <div class="relative flex justify-center text-sm"><span class="px-2 bg-white text-gray-400">${lang === 'id' ? 'atau' : 'or'}</span></div>
          </div>
          
          <!-- Google OAuth Button -->
          <button id="google-login-btn"
             class="flex items-center justify-center gap-3 w-full px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all text-gray-700 font-medium shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            ${lang === 'id' ? 'Masuk dengan Google' : 'Login with Google'}
          </button>
          
          <!-- Loading state -->
          <div id="login-loading" class="hidden mt-4">
            <div class="animate-pulse text-gray-400 text-sm">${lang === 'id' ? 'Memproses...' : 'Processing...'}</div>
          </div>
        </div>

        <!-- Error message container -->
        <div id="login-error" class="hidden mt-4 p-3 bg-danger/10 border border-danger/20 rounded-lg text-danger text-sm text-center"></div>

        <!-- Privacy note -->
        <p class="mt-6 text-center text-xs text-gray-400">
          ${lang === 'id' 
            ? 'Dengan masuk, Anda menyetujui kebijakan privasi aplikasi.' 
            : 'By signing in, you agree to the app privacy policy.'}
        </p>
      </div>
    </div>
  `

  // Email/Password login
  const form = document.getElementById('login-form')
  const emailInput = document.getElementById('login-email')
  const passwordInput = document.getElementById('login-password')
  const submitBtn = document.getElementById('login-submit')
  const loadingEl = document.getElementById('login-loading')
  const errorEl = document.getElementById('login-error')

  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    submitBtn.disabled = true
    submitBtn.classList.add('opacity-50', 'cursor-not-allowed')
    loadingEl.classList.remove('hidden')
    errorEl.classList.add('hidden')

    try {
      const result = await login(emailInput.value, passwordInput.value)
      showToast(lang === 'id' ? 'Login berhasil!' : 'Login successful!')
      window.location.hash = 'home'
    } catch (error) {
      submitBtn.disabled = false
      submitBtn.classList.remove('opacity-50', 'cursor-not-allowed')
      errorEl.textContent = error.message || (lang === 'id' ? 'Login gagal. Silakan coba lagi.' : 'Login failed. Please try again.')
      errorEl.classList.remove('hidden')
    } finally {
      loadingEl.classList.add('hidden')
    }
  })

  // Google OAuth button
  const googleBtn = document.getElementById('google-login-btn')
  googleBtn.addEventListener('click', () => {
    // Redirect to backend Google OAuth
    const oauthUrl = `${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/auth/google`
    window.location.href = oauthUrl
  })
}

export default renderLogin
