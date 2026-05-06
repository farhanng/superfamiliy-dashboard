package handlers

import (
	"net/http"
	"strconv"

	"superfamily-backend/models"

	"github.com/gin-gonic/gin"
)

// =====================
// Bill Handlers
// =====================

type CreateBillRequest struct {
	Title       string `json:"title" binding:"required"`
	Amount      int    `json:"amount" binding:"required,min=1"`
	DueDate     string `json:"due_date" binding:"required"`
	Frequency   string `json:"frequency" binding:"required"`
	Category    string `json:"category" binding:"required"`
	NotifyBefore int   `json:"notify_before"`
	Note        string `json:"note"`
}

type UpdateBillRequest struct {
	Title       string `json:"title"`
	Amount      int    `json:"amount"`
	DueDate     string `json:"due_date"`
	Frequency   string `json:"frequency"`
	Category    string `json:"category"`
	IsPaid      bool   `json:"is_paid"`
	NotifyBefore int   `json:"notify_before"`
	Note        string `json:"note"`
}

func (h *Handler) GetBills(c *gin.Context) {
	bills, err := h.svc.GetAllBills()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if bills == nil {
		bills = []models.Bill{}
	}

	c.JSON(http.StatusOK, gin.H{"bills": bills})
}

func (h *Handler) GetBill(c *gin.Context) {
	id := c.Param("id")
	bill, err := h.svc.GetBillByID(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	if bill == nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Bill not found"})
		return
	}

	c.JSON(http.StatusOK, bill)
}

func (h *Handler) CreateBill(c *gin.Context) {
	var req CreateBillRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	notifyBefore := req.NotifyBefore
	if notifyBefore == 0 {
		notifyBefore = 2 // default 2 days
	}

	bill := &models.Bill{
		Title:        req.Title,
		Amount:       req.Amount,
		DueDate:      req.DueDate,
		Frequency:    req.Frequency,
		Category:     req.Category,
		IsPaid:       false,
		NotifyBefore: notifyBefore,
	}

	// Set created_by from authenticated user
	if userID := c.GetString("userID"); userID != "" {
		bill.CreatedBy = &userID
	}

	if err := h.svc.CreateBill(bill); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"id": bill.ID})
}

func (h *Handler) UpdateBill(c *gin.Context) {
	id := c.Param("id")

	var req UpdateBillRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Get existing bill
	existing, err := h.svc.GetBillByID(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	if existing == nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Bill not found"})
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

	if err := h.svc.UpdateBill(existing); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Bill updated"})
}

func (h *Handler) DeleteBill(c *gin.Context) {
	id := c.Param("id")

	// Check if bill exists
	bill, err := h.svc.GetBillByID(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	if bill == nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Bill not found"})
		return
	}

	if err := h.svc.DeleteBill(id); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Bill deleted"})
}

func (h *Handler) MarkBillPaid(c *gin.Context) {
	id := c.Param("id")
	userID := c.GetString("userID")

	if err := h.svc.MarkBillPaid(id, userID); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Bill marked as paid"})
}

func (h *Handler) MarkBillUnpaid(c *gin.Context) {
	id := c.Param("id")

	if err := h.svc.MarkBillUnpaid(id); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Bill marked as unpaid"})
}

func (h *Handler) GetBillsDueSoon(c *gin.Context) {
	daysStr := c.DefaultQuery("days", "7")
	days, err := strconv.Atoi(daysStr)
	if err != nil {
		days = 7
	}

	bills, err := h.svc.GetBillsDueSoon(days)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if bills == nil {
		bills = []models.Bill{}
	}

	c.JSON(http.StatusOK, gin.H{"bills": bills})
}