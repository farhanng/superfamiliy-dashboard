package handlers

import (
	"net/http"
	"regexp"
	"strconv"
	"time"

	"superfamily-backend/models"

	"github.com/gin-gonic/gin"
)

// =====================
// Transaction Handlers
// =====================

type CreateTransactionRequest struct {
	Amount   int    `json:"amount" binding:"required"`
	Category string `json:"category" binding:"required"`
	Date     string `json:"date" binding:"required"`
	Type     string `json:"type" binding:"required"` // income or expense
	Status   string `json:"status"`
	Note     string `json:"note"`
}

type UpdateTransactionRequest struct {
	Amount   int    `json:"amount"`
	Category string `json:"category"`
	Date     string `json:"date"`
	Type     string `json:"type"`
	Status   string `json:"status"`
	Note     string `json:"note"`
}

func (h *Handler) GetTransactions(c *gin.Context) {
	transactions, err := h.svc.GetAllTransactions()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if transactions == nil {
		transactions = []models.Transaction{}
	}

	c.JSON(http.StatusOK, gin.H{"transactions": transactions})
}

func (h *Handler) GetTransactionsByMonth(c *gin.Context) {
	yearStr := c.Param("year")
	monthStr := c.Param("month")

	year, err := strconv.Atoi(yearStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid year"})
		return
	}

	month, err := strconv.Atoi(monthStr)
	if err != nil || month < 1 || month > 12 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid month"})
		return
	}

	transactions, err := h.svc.GetTransactionsByMonth(year, month)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if transactions == nil {
		transactions = []models.Transaction{}
	}

	c.JSON(http.StatusOK, gin.H{"transactions": transactions})
}

func (h *Handler) CreateTransaction(c *gin.Context) {
	var req CreateTransactionRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Validate amount > 0
	if req.Amount <= 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Amount must be greater than 0"})
		return
	}

	// Validate type
	txType := req.Type
	if txType != "income" && txType != "expense" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Type must be 'income' or 'expense'"})
		return
	}

	// Validate date format (YYYY-MM-DD)
	if !isValidDate(req.Date) {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Date must be in YYYY-MM-DD format"})
		return
	}

	status := req.Status
	if status == "" {
		status = "done"
	}

	tx := &models.Transaction{
		Amount:   req.Amount,
		Category: req.Category,
		Date:     req.Date,
		Type:     txType,
		Status:   status,
	}

	if req.Note != "" {
		tx.Note = &req.Note
	}
	if userID := c.GetString("userID"); userID != "" {
		tx.CreatedBy = &userID
	}

	if err := h.svc.CreateTransaction(tx); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"id": tx.ID})
}

func (h *Handler) UpdateTransaction(c *gin.Context) {
	id := c.Param("id")

	var req UpdateTransactionRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	transactions, err := h.svc.GetAllTransactions()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	var existing *models.Transaction
	for _, t := range transactions {
		if t.ID == id {
			existing = &t
			break
		}
	}

	if existing == nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Transaction not found"})
		return
	}

	// Validate amount if provided
	if req.Amount != 0 && req.Amount < 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Amount must be greater than 0"})
		return
	}

	// Validate type if provided
	if req.Type != "" && req.Type != "income" && req.Type != "expense" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Type must be 'income' or 'expense'"})
		return
	}

	// Validate date format if provided
	if req.Date != "" && !isValidDate(req.Date) {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Date must be in YYYY-MM-DD format"})
		return
	}

	if req.Amount > 0 {
		existing.Amount = req.Amount
	}
	if req.Category != "" {
		existing.Category = req.Category
	}
	if req.Date != "" {
		existing.Date = req.Date
	}
	if req.Type != "" {
		existing.Type = req.Type
	}
	if req.Status != "" {
		existing.Status = req.Status
	}
	if req.Note != "" {
		existing.Note = &req.Note
	}

	if err := h.svc.UpdateTransaction(existing); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Transaction updated"})
}

func (h *Handler) DeleteTransaction(c *gin.Context) {
	id := c.Param("id")

	// Check if transaction exists
	txs, err := h.svc.GetAllTransactions()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	found := false
	for _, t := range txs {
		if t.ID == id {
			found = true
			break
		}
	}
	if !found {
		c.JSON(http.StatusNotFound, gin.H{"error": "Transaction not found"})
		return
	}

	if err := h.svc.DeleteTransaction(id); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Transaction deleted"})
}

// isValidDate checks if a date string is in YYYY-MM-DD format
func isValidDate(date string) bool {
	match, _ := regexp.MatchString(`^\d{4}-\d{2}-\d{2}$`, date)
	if !match {
		return false
	}
	_, err := time.Parse("2006-01-02", date)
	return err == nil
}

// =====================
// Budget Handlers
// =====================

type SetBudgetRequest struct {
	Amount int `json:"amount" binding:"required"`
}

func (h *Handler) GetBudget(c *gin.Context) {
	month := c.Param("month")

	budget, err := h.svc.GetBudget(month)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if budget == nil {
		c.JSON(http.StatusOK, gin.H{"budget": nil})
		return
	}

	c.JSON(http.StatusOK, gin.H{"budget": budget})
}

func (h *Handler) SetBudget(c *gin.Context) {
	month := c.Param("month")

	var req SetBudgetRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := h.svc.SetBudget(month, req.Amount); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Budget updated"})
}