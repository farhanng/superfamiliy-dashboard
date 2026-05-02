package middleware

import (
	"encoding/json"
	"net/http"
	"strings"
	"sync"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

// JWT claims structure
type Claims struct {
	UserID string `json:"user_id"`
	Email  string `json:"email"`
	Role   string `json:"role"`
	jwt.RegisteredClaims
}

// SSE client manager
type SSEClientManager struct {
	mu      sync.RWMutex
	clients map[string]chan string
}

var sseClientManager *SSEClientManager

func init() {
	sseClientManager = &SSEClientManager{
		clients: make(map[string]chan string),
	}
}

// GetSSEClientManager returns the singleton SSE client manager
func GetSSEClientManager() *SSEClientManager {
	return sseClientManager
}

// Register adds a client channel for a user
func (m *SSEClientManager) Register(userID string, ch chan string) {
	m.mu.Lock()
	defer m.mu.Unlock()
	m.clients[userID] = ch
}

// Unregister removes a client channel
func (m *SSEClientManager) Unregister(userID string) {
	m.mu.Lock()
	defer m.mu.Unlock()
	if ch, ok := m.clients[userID]; ok {
		close(ch)
		delete(m.clients, userID)
	}
}

// Broadcast sends an event to all connected clients
func (m *SSEClientManager) Broadcast(eventType string, data interface{}) {
	m.mu.RLock()
	defer m.mu.RUnlock()

	msg := "event:" + eventType + "\ndata:{\"type\":\"" + eventType + "\""
	if data != nil {
		jsonData, err := json.Marshal(data)
		if err == nil {
			msg += ",\"data\":" + string(jsonData)
		}
	}
	msg += "}\n\n"

	for userID, ch := range m.clients {
		select {
		case ch <- msg:
		default:
			// Channel full, skip
		}
		_ = userID
	}
}

// GetConnectedUsers returns count of connected users
func (m *SSEClientManager) GetConnectedUsers() int {
	m.mu.RLock()
	defer m.mu.RUnlock()
	return len(m.clients)
}

// GetJWTSecret returns the JWT secret from config
var GetJWTSecret func() string

// AuthRequired middleware validates JWT tokens
func AuthRequired() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization header required"})
			c.Abort()
			return
		}

		// Extract token from "Bearer <token>"
		parts := strings.SplitN(authHeader, " ", 2)
		if len(parts) != 2 || parts[0] != "Bearer" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid authorization format"})
			c.Abort()
			return
		}

		tokenString := parts[1]
		secret := GetJWTSecret()
		if secret == "" {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "JWT secret not configured"})
			c.Abort()
			return
		}

		token, err := jwt.ParseWithClaims(tokenString, &Claims{}, func(token *jwt.Token) (interface{}, error) {
			return []byte(secret), nil
		})

		if err != nil || !token.Valid {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid or expired token"})
			c.Abort()
			return
		}

		claims, ok := token.Claims.(*Claims)
		if !ok {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token claims"})
			c.Abort()
			return
		}

		// Store user info in context
		c.Set("userID", claims.UserID)
		c.Set("email", claims.Email)
		c.Set("role", claims.Role)

		c.Next()
	}
}

// GenerateToken creates a new JWT token for a user
func GenerateToken(userID, email, role string, secret string) (string, error) {
	claims := &Claims{
		UserID: userID,
		Email:  email,
		Role:   role,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(24 * time.Hour)),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(secret))
}

// AdminRequired middleware checks if user has admin role
func AdminRequired() gin.HandlerFunc {
	return func(c *gin.Context) {
		role := c.GetString("role")
		if role != "admin" {
			c.JSON(http.StatusForbidden, gin.H{"error": "Admin access required"})
			c.Abort()
			return
		}
		c.Next()
	}
}