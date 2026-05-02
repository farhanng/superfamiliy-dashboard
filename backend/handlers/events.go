package handlers

import (
	"net/http"

	"superfamily-backend/models"

	"github.com/gin-gonic/gin"
)

// =====================
// Event Handlers
// =====================

type CreateEventRequest struct {
	Title      string `json:"title" binding:"required"`
	Date       string `json:"date" binding:"required"`
	Type       string `json:"type" binding:"required"`
	Color      string `json:"color"`
	NotifyDays int    `json:"notify_days"`
	Note       string `json:"note"`
}

type UpdateEventRequest struct {
	Title      string `json:"title"`
	Date       string `json:"date"`
	Type       string `json:"type"`
	Color      string `json:"color"`
	NotifyDays int    `json:"notify_days"`
	Note       string `json:"note"`
}

func (h *Handler) GetEvents(c *gin.Context) {
	events, err := h.svc.GetAllEvents()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if events == nil {
		events = []models.Event{}
	}

	c.JSON(http.StatusOK, gin.H{"events": events})
}

func (h *Handler) CreateEvent(c *gin.Context) {
	var req CreateEventRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	notifyDays := req.NotifyDays
	if notifyDays == 0 {
		notifyDays = 7 // default 7 days
	}

	event := &models.Event{
		Title:      req.Title,
		Date:       req.Date,
		Type:       req.Type,
		NotifyDays: notifyDays,
	}

	if req.Color != "" {
		event.Color = &req.Color
	}
	if req.Note != "" {
		event.Note = &req.Note
	}
	if userID := c.GetString("userID"); userID != "" {
		event.CreatedBy = &userID
	}

	if err := h.svc.CreateEvent(event); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"id": event.ID})
}

func (h *Handler) UpdateEvent(c *gin.Context) {
	id := c.Param("id")

	var req UpdateEventRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	events, err := h.svc.GetAllEvents()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	var existing *models.Event
	for _, e := range events {
		if e.ID == id {
			existing = &e
			break
		}
	}

	if existing == nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Event not found"})
		return
	}

	if req.Title != "" {
		existing.Title = req.Title
	}
	if req.Date != "" {
		existing.Date = req.Date
	}
	if req.Type != "" {
		existing.Type = req.Type
	}
	if req.Color != "" {
		existing.Color = &req.Color
	}
	if req.NotifyDays > 0 {
		existing.NotifyDays = req.NotifyDays
	}
	if req.Note != "" {
		existing.Note = &req.Note
	}

	if err := h.svc.UpdateEvent(existing); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Event updated"})
}

func (h *Handler) DeleteEvent(c *gin.Context) {
	id := c.Param("id")

	if err := h.svc.DeleteEvent(id); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Event deleted"})
}