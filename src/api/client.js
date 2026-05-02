// api/client.js - Base API client with JWT handling
// Handles all HTTP requests to the backend

// Use VITE_API_URL env var for production, fallback to relative /api for dev
const API_BASE = (import.meta.env.VITE_API_URL || '') + '/api'
const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL || 'https://family.farhan.biz.id'

class ApiClient {
  constructor() {
    this.tokenKey = 'sf_auth_token'
    this.userKey = 'sf_user'
  }

  // Get stored token
  getToken() {
    return localStorage.getItem(this.tokenKey)
  }

  // Store token
  setToken(token) {
    localStorage.setItem(this.tokenKey, token)
  }

  // Clear auth data (logout)
  clearAuth() {
    localStorage.removeItem(this.tokenKey)
    localStorage.removeItem(this.userKey)
  }

  // Get stored user
  getUser() {
    const userStr = localStorage.getItem(this.userKey)
    return userStr ? JSON.parse(userStr) : null
  }

  // Store user
  setUser(user) {
    localStorage.setItem(this.userKey, JSON.stringify(user))
  }

  // Check if authenticated
  isAuthenticated() {
    return !!this.getToken()
  }

  // Build headers
  buildHeaders() {
    const headers = {
      'Content-Type': 'application/json'
    }
    const token = this.getToken()
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
    return headers
  }

  // Generic request wrapper
  async request(endpoint, options = {}) {
    const url = `${API_BASE}${endpoint}`
    const config = {
      ...options,
      headers: {
        ...this.buildHeaders(),
        ...options.headers
      }
    }

    try {
      const response = await fetch(url, config)
      
      // Handle 401 - redirect to login
      if (response.status === 401) {
        this.clearAuth()
        window.location.hash = 'login'
        throw new Error('Unauthorized')
      }

      // Get response text first to handle empty or non-JSON responses
      const responseText = await response.text()
      
      // Handle empty response
      if (!responseText || responseText.trim() === '') {
        if (!response.ok) {
          throw new Error(`Request failed: ${response.status} ${response.statusText}`)
        }
        return {}  // Return empty object for empty successful responses
      }

      // Parse JSON
      let data
      try {
        data = JSON.parse(responseText)
      } catch (parseError) {
        // Response is not JSON - might be an error page from proxy/nginx
        console.error('Non-JSON response:', responseText.substring(0, 200))
        throw new Error(`Invalid JSON response (server may be down): ${response.status} ${response.statusText}`)
      }

      // Handle errors
      if (!response.ok) {
        throw new Error(data.error || `Request failed: ${response.status}`)
      }

      return data
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  }

  // GET request
  async get(endpoint) {
    return this.request(endpoint, { method: 'GET' })
  }

  // POST request
  async post(endpoint, body) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(body)
    })
  }

  // PUT request
  async put(endpoint, body) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body)
    })
  }

  // DELETE request
  async delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' })
  }
}

// Export singleton instance
const apiClient = new ApiClient()
export default apiClient

// Named exports for convenience
export const getToken = () => apiClient.getToken()
export const setToken = (token) => apiClient.setToken(token)
export const clearAuth = () => apiClient.clearAuth()
export const getUser = () => apiClient.getUser()
export const setUser = (user) => apiClient.setUser(user)
export const isAuthenticated = () => apiClient.isAuthenticated()

// Build OAuth URL
const OAUTH_BACKEND_URL = import.meta.env.VITE_API_URL || 'https://superfamily-backend-916992190881.asia-southeast1.run.app'
export function getOAuthURL() {
  return `${OAUTH_BACKEND_URL}/api/auth/google?redirect_uri=${encodeURIComponent(FRONTEND_URL)}`
}

export { FRONTEND_URL }