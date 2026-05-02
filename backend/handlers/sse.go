package handlers

import (
	"net/http"
	"strings"
	"time"

	"superfamily-backend/middleware"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

// SSE handler - authenticated real-time updates
func (h *Handler) SubscribeSSE(c *gin.Context) {
	// Get shared SSE client manager from middleware
	clientMgr := middleware.GetSSEClientManager()

	// Support token from query param (for EventSource which can't set headers)
	token := c.Query("token")

	// Fallback to Authorization header
	if token == "" {
		authHeader := c.GetHeader("Authorization")
		if authHeader != "" && strings.HasPrefix(authHeader, "Bearer ") {
			token = strings.TrimPrefix(authHeader, "Bearer ")
		}
	}

	// Validate token
	if token == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Authentication required for SSE"})
		return
	}

	// Parse and validate JWT
	secret := middleware.GetJWTSecret()
	parsedToken, err := jwt.ParseWithClaims(token, &middleware.Claims{}, func(t *jwt.Token) (interface{}, error) {
		return []byte(secret), nil
	})

	if err != nil || !parsedToken.Valid {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid or expired token"})
		return
	}

	claims, ok := parsedToken.Claims.(*middleware.Claims)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token claims"})
		return
	}

	userID := claims.UserID

	// Set SSE headers
	c.Header("Content-Type", "text/event-stream")
	c.Header("Cache-Control", "no-cache")
	c.Header("Connection", "keep-alive")
	c.Header("X-Accel-Buffering", "no") // Disable nginx buffering

	// Create client channel
	clientChan := make(chan string, 10)

	// Register client with shared manager
	clientMgr.Register(userID, clientChan)
	defer clientMgr.Unregister(userID)

	// Send initial connection message
	c.Writer.Write([]byte("event:connected\ndata:{\"type\":\"connected\",\"user\":\"" + userID + "\"}\n\n"))
	c.Writer.Flush()

	// Heartbeat ticker
	ticker := time.NewTicker(30 * time.Second)
	defer ticker.Stop()

	// Client disconnected context
	ctx := c.Request.Context()

	// Stream messages to client
	for {
		select {
		case <-ctx.Done():
			return
		case <-ticker.C:
			// Send heartbeat
			_, err := c.Writer.Write([]byte("event:ping\ndata:{}\n\n"))
			if err != nil {
				return
			}
			c.Writer.Flush()
		case msg, ok := <-clientChan:
			if !ok {
				return
			}
			_, err := c.Writer.Write([]byte(msg))
			if err != nil {
				return
			}
			c.Writer.Flush()
		}
	}
}

// SSEHealth uses the shared SSE client manager from middleware
func (h *Handler) SSEHealth(c *gin.Context) {
	clientMgr := middleware.GetSSEClientManager()
	c.JSON(http.StatusOK, gin.H{
		"connected_users": clientMgr.GetConnectedUsers(),
	})
}

// Sync is a fallback sync endpoint for clients that missed SSE
func (h *Handler) Sync(c *gin.Context) {
	// Return current state of all entities for full sync
	c.JSON(http.StatusOK, gin.H{
		"sync_timestamp": time.Now().Unix(),
		"message":       "Use specific endpoints for incremental sync",
	})
}