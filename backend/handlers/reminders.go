package handlers

import (
	"net/http"

	"superfamily-backend/models"

	"github.com/gin-gonic/gin"
)

// =====================
// Reminder Handlers
// =====================

type CreateReminderRequest struct {
	Title        string `json:"title" binding:"required"`
	Amount       int    `json:"amount" binding:"required,min=1"`
	DueDate      string `json:"due_date" binding:"required"`
	Frequency    string `json:"frequency" binding:"required"`
	Category     string `json:"category" binding:"required"`
	NotifyBefore int    `json:"notify_before"`
	Note         string `json:"note"`
}

type UpdateReminderRequest struct {
	Title        string `json:"title"`
	Amount       int    `json:"amount"`
	DueDate      string `json:"due_date"`
	Frequency    string `json:"frequency"`
	Category     string `json:"category"`
	IsPaid       bool   `json:"is_paid"`
	NotifyBefore int    `json:"notify_before"`
	Note         string `json:"note"`
}

func (h *Handler) GetReminders(c *gin.Context) {
	reminders, err := h.svc.GetAllReminders()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if reminders == nil {
		reminders = []models.Reminder{}
	}

	c.JSON(http.StatusOK, gin.H{"reminders": reminders})
}

func (h *Handler) CreateReminder(c *gin.Context) {
	var req CreateReminderRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	notifyBefore := req.NotifyBefore
	if notifyBefore == 0 {
		notifyBefore = 30 // default 30 days for tax/document reminders
	}

	rem := &models.Reminder{
		Title:        req.Title,
		Amount:       req.Amount,
		DueDate:      req.DueDate,
		Frequency:    req.Frequency,
		Category:     req.Category,
		IsPaid:       false,
		NotifyBefore: notifyBefore,
	}

	if userID := c.GetString("userID"); userID != "" {
		rem.CreatedBy = &userID
	}

	if req.Note != "" {
		rem.Note = &req.Note
	}

	if err := h.svc.CreateReminder(rem); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"id": rem.ID})
}

func (h *Handler) UpdateReminder(c *gin.Context) {
	id := c.Param("id")

	var req UpdateReminderRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Get existing reminder - we need to get from repo directly since Service only has GetAll
	reminders, err := h.svc.GetAllReminders()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	var existing *models.Reminder
	for _, r := range reminders {
		if r.ID == id {
			existing = &r
			break
		}
	}

	if existing == nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Reminder not found"})
		return
	}

	// Update fields
	if req.Title != "" {
		existing.Title = req.Title
	}
	if req.Amount > 0 {
		existing.Amount = req.Amount
	}
	if req.DueDate != "" {
		existing.DueDate = req.DueDate
	}
	if req.Frequency != "" {
		existing.Frequency = req.Frequency
	}
	if req.Category != "" {
		existing.Category = req.Category
	}
	existing.IsPaid = req.IsPaid
	if req.NotifyBefore > 0 {
		existing.NotifyBefore = req.NotifyBefore
	}
	if req.Note != "" {
		existing.Note = &req.Note
	}

	if err := h.svc.UpdateReminder(existing); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Reminder updated"})
}

func (h *Handler) DeleteReminder(c *gin.Context) {
	id := c.Param("id")

	// Check if reminder exists
	reminders, err := h.svc.GetAllReminders()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	found := false
	for _, r := range reminders {
		if r.ID == id {
			found = true
			break
		}
	}
	if !found {
		c.JSON(http.StatusNotFound, gin.H{"error": "Reminder not found"})
		return
	}

	if err := h.svc.DeleteReminder(id); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Reminder deleted"})
}

func (h *Handler) MarkReminderPaid(c *gin.Context) {
	id := c.Param("id")
	userID := c.GetString("userID")

	if err := h.svc.MarkReminderPaid(id, userID); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Reminder marked as paid"})
}

func (h *Handler) MarkReminderUnpaid(c *gin.Context) {
	id := c.Param("id")

	if err := h.svc.MarkReminderUnpaid(id); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Reminder marked as unpaid"})
}