// api/sync.js - SSE client for real-time updates
import apiClient from './client.js'

class SyncManager {
  constructor() {
    this.eventSource = null
    this.listeners = {}
    this.connected = false
  }

  // Connect to SSE stream
  connect() {
    if (this.eventSource) {
      this.eventSource.close()
    }

    const token = apiClient.getToken()
    if (!token) {
      console.warn('No auth token, skipping SSE connection')
      return
    }

    try {
      // SSE endpoint - pass token as query param since we can't set headers on EventSource
      const url = `/api/events/subscribe?token=${encodeURIComponent(token)}`
      this.eventSource = new EventSource(url)

      this.eventSource.onopen = () => {
        console.log('SSE connected')
        this.connected = true
      }

      this.eventSource.onmessage = (event) => {
        this.handleMessage(event)
      }

      this.eventSource.onerror = (error) => {
        console.error('SSE error:', error)
        this.connected = false
        this.eventSource.close()
        this.eventSource = null

        // Reconnect after 5 seconds
        setTimeout(() => this.connect(), 5000)
      }

      // Listen for specific event types
      this.eventSource.addEventListener('bills_updated', (e) => {
        this.emit('bills_updated', e.data)
      })

      this.eventSource.addEventListener('reminders_updated', (e) => {
        this.emit('reminders_updated', e.data)
      })

      this.eventSource.addEventListener('events_updated', (e) => {
        this.emit('events_updated', e.data)
      })

      this.eventSource.addEventListener('transactions_updated', (e) => {
        this.emit('transactions_updated', e.data)
      })

      this.eventSource.addEventListener('mealplans_updated', (e) => {
        this.emit('mealplans_updated', e.data)
      })

      this.eventSource.addEventListener('weekend_activities_updated', (e) => {
        this.emit('weekend_activities_updated', e.data)
      })

      this.eventSource.addEventListener('connected', (e) => {
        console.log('SSE received connected event')
      })

      this.eventSource.addEventListener('ping', () => {
        // Heartbeat - no action needed
      })

    } catch (error) {
      console.error('Failed to connect SSE:', error)
    }
  }

  // Handle incoming SSE message
  handleMessage(event) {
    try {
      const data = JSON.parse(event.data)
      if (data.type) {
        this.emit(data.type, data)
      }
    } catch (error) {
      // Ignore parse errors
    }
  }

  // Subscribe to event type
  on(eventType, callback) {
    if (!this.listeners[eventType]) {
      this.listeners[eventType] = []
    }
    this.listeners[eventType].push(callback)
  }

  // Unsubscribe from event type
  off(eventType, callback) {
    if (!this.listeners[eventType]) return
    this.listeners[eventType] = this.listeners[eventType].filter(cb => cb !== callback)
  }

  // Emit event to listeners
  emit(eventType, data) {
    if (!this.listeners[eventType]) return
    this.listeners[eventType].forEach(callback => {
      try {
        callback(data)
      } catch (error) {
        console.error('SSE callback error:', error)
      }
    })
  }

  // Disconnect
  disconnect() {
    if (this.eventSource) {
      this.eventSource.close()
      this.eventSource = null
      this.connected = false
    }
  }

  // Check connection status
  isConnected() {
    return this.connected
  }
}

// Export singleton instance
const syncManager = new SyncManager()
export default syncManager

// Auto-connect when user is authenticated
export function initSync() {
  if (apiClient.isAuthenticated()) {
    syncManager.connect()
  }
}

export function disconnectSync() {
  syncManager.disconnect()
}