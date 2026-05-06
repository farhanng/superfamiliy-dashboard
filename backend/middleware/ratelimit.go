package middleware

import (
	"net/http"
	"sync"
	"time"

	"github.com/gin-gonic/gin"
	"golang.org/x/time/rate"
)

// RateLimiter stores per-IP rate limiters
type RateLimiter struct {
	mu       sync.RWMutex
	limiters map[string]*rateLimiterEntry
	burst    int
	rps      float64
}

type rateLimiterEntry struct {
	limiter  *rate.Limiter
	lastSeen time.Time
}

// Global rate limiter instance
var (
	authRateLimiter *RateLimiter
	authRLOnce      sync.Once
)

// Default rate limits for auth endpoints
const (
	AuthRateLimitRPS    = 5                // 5 requests per second
	AuthRateLimitBurst = 10               // allow bursts up to 10
)

// GetAuthRateLimiter returns the singleton auth rate limiter
func GetAuthRateLimiter() *RateLimiter {
	authRLOnce.Do(func() {
		authRateLimiter = NewRateLimiter(AuthRateLimitRPS, AuthRateLimitBurst)
	})
	return authRateLimiter
}

// NewRateLimiter creates a new rate limiter
func NewRateLimiter(rps float64, burst int) *RateLimiter {
	return &RateLimiter{
		limiters: make(map[string]*rateLimiterEntry),
		rps:      rps,
		burst:    burst,
	}
}

// getLimiter returns the rate limiter for a client IP, creating one if needed
func (rl *RateLimiter) getLimiter(clientIP string) *rate.Limiter {
	rl.mu.Lock()
	defer rl.mu.Unlock()

	if entry, exists := rl.limiters[clientIP]; exists {
		entry.lastSeen = time.Now()
		return entry.limiter
	}

	limiter := rate.NewLimiter(rate.Limit(rl.rps), rl.burst)
	rl.limiters[clientIP] = &rateLimiterEntry{
		limiter:  limiter,
		lastSeen: time.Now(),
	}

	return limiter
}

// Allow checks if a request from the given client IP should be allowed
func (rl *RateLimiter) Allow(clientIP string) bool {
	limiter := rl.getLimiter(clientIP)
	return limiter.Allow()
}

// RateLimitMiddleware creates a rate limiting middleware using the auth rate limiter
func RateLimitMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		clientIP := c.ClientIP()

		if !GetAuthRateLimiter().Allow(clientIP) {
			c.JSON(http.StatusTooManyRequests, gin.H{
				"error": "Too many requests. Please try again later.",
			})
			c.Abort()
			return
		}

		c.Next()
	}
}

// StrictRateLimitMiddleware creates a stricter rate limit for sensitive endpoints
// Uses 1 request per second with burst of 3
func StrictRateLimitMiddleware() gin.HandlerFunc {
	strictLimiter := NewRateLimiter(1, 3)

	return func(c *gin.Context) {
		clientIP := c.ClientIP()

		if !strictLimiter.Allow(clientIP) {
			c.JSON(http.StatusTooManyRequests, gin.H{
				"error": "Too many requests. Please slow down.",
			})
			c.Abort()
			return
		}

		c.Next()
	}
}
