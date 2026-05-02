package handlers

import (
	"net/http"

	"superfamily-backend/services"

	"github.com/gin-gonic/gin"
)

// WhitelistHandler handles whitelist management
type WhitelistHandler struct {
	svc *services.Service
}

// CheckWhitelist checks if an email is whitelisted (public, no auth required)
// GET /api/whitelist/check?email=xxx
func (h *WhitelistHandler) CheckWhitelist(c *gin.Context) {
	email := c.Query("email")
	if email == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "email parameter is required"})
		return
	}

	user, err := h.svc.CheckWhitelist(email)
	allowed := user != nil && err == nil && user.Status == "active"

	c.JSON(http.StatusOK, gin.H{
		"email":  email,
		"allowed": allowed,
	})
}

func NewWhitelistHandler(svc *services.Service) *WhitelistHandler {
	return &WhitelistHandler{svc: svc}
}

// Whitelist request/response types
type AddWhitelistRequest struct {
	Email string `json:"email" binding:"required,email"`
	Name  string `json:"name" binding:"required"`
}

// GetWhitelist returns all whitelist users
// GET /api/auth/whitelist
func (h *WhitelistHandler) GetWhitelist(c *gin.Context) {
	users, err := h.svc.GetAllWhitelistUsers()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"users": users})
}

// AddToWhitelist adds a user to the whitelist
// POST /api/auth/whitelist
func (h *WhitelistHandler) AddToWhitelist(c *gin.Context) {
	var req AddWhitelistRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Get admin user ID from context
	createdBy := c.GetString("userID")

	user, err := h.svc.AddToWhitelist(req.Email, req.Name, createdBy)
	if err != nil {
		c.JSON(http.StatusConflict, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"user": user})
}

// RemoveFromWhitelist removes a user from the whitelist
// DELETE /api/auth/whitelist/:email
func (h *WhitelistHandler) RemoveFromWhitelist(c *gin.Context) {
	email := c.Param("email")
	if email == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "email is required"})
		return
	}

	err := h.svc.RemoveFromWhitelist(email)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Removed from whitelist"})
}

// SuspendWhitelistUser suspends a whitelist user
// PUT /api/auth/whitelist/:email/suspend
func (h *WhitelistHandler) SuspendWhitelistUser(c *gin.Context) {
	email := c.Param("email")
	if email == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "email is required"})
		return
	}

	err := h.svc.SuspendWhitelistUser(email)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "User suspended"})
}

// ActivateWhitelistUser activates a suspended whitelist user
// PUT /api/auth/whitelist/:email/activate
func (h *WhitelistHandler) ActivateWhitelistUser(c *gin.Context) {
	email := c.Param("email")
	if email == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "email is required"})
		return
	}

	err := h.svc.ActivateWhitelistUser(email)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "User activated"})
}
