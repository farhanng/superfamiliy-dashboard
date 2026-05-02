// api/auth.js - Authentication API calls
import apiClient from './client.js'

export async function login(email, password) {
  const response = await apiClient.post('/auth/login', { email, password })
  
  // Store token and user
  if (response.token) {
    apiClient.setToken(response.token)
    apiClient.setUser(response.user)
  }
  
  return response
}

export async function register(email, password, name) {
  const response = await apiClient.post('/auth/register', { email, password, name })
  
  // Store token and user
  if (response.token) {
    apiClient.setToken(response.token)
    apiClient.setUser(response.user)
  }
  
  return response
}

export async function getMe() {
  return apiClient.get('/auth/me')
}

export function logout() {
  apiClient.clearAuth()
  window.location.hash = 'login'
}

// Check if user is authenticated
export function checkAuth() {
  if (!apiClient.isAuthenticated()) {
    window.location.hash = 'login'
    return false
  }
  return true
}

export default { login, register, getMe, logout, checkAuth }