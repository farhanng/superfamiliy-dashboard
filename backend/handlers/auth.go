package handlers

import (
	"net/http"

	"superfamily-backend/middleware"
	"superfamily-backend/services"

	"github.com/gin-gonic/gin"
)

type Handler struct {
	svc *services.Service
}

func New(svc *services.Service) *Handler {
	return &Handler{svc: svc}
}

// =====================
// Auth Handlers
// =====================

type RegisterRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required,min=8"`
	Name     string `json:"name" binding:"required"`
}

type LoginRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required"`
}

func (h *Handler) Register(c *gin.Context) {
	var req RegisterRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Sanitize user input to prevent XSS
	req.Name = middleware.SanitizeUserName(req.Name)
	req.Email = middleware.SanitizeEmail(req.Email)

	resp, err := h.svc.Register(req.Email, req.Password, req.Name)
	if err != nil {
		c.JSON(http.StatusConflict, gin.H{"error": err.Error()})
		return
	}

	// Sanitize user object before sending response
	resp.User.Sanitize()

	c.JSON(http.StatusCreated, resp)
}

func (h *Handler) Login(c *gin.Context) {
	var req LoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	resp, err := h.svc.Login(req.Email, req.Password)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
		return
	}

	// Sanitize user object before sending response
	resp.User.Sanitize()

	c.JSON(http.StatusOK, resp)
}

func (h *Handler) GetMe(c *gin.Context) {
	userID := c.GetString("userID")
	user, err := h.svc.GetUserByID(userID)
	if err != nil || user == nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	// Sanitize user before returning
	user.Sanitize()

	c.JSON(http.StatusOK, gin.H{"user": user})
}

// Logout is stateless - JWT is self-contained. Client should discard the token.
// This endpoint exists for API completeness and future token blacklisting.
func (h *Handler) Logout(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "Logged out successfully"})
}