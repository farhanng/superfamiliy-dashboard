package handlers

import (
	"net/http"

	"superfamily-backend/middleware"
	"superfamily-backend/models"

	"github.com/gin-gonic/gin"
)

// =====================
// MealPlan Handlers
// =====================

type CreateMealPlanRequest struct {
	WeekStart string `json:"week_start" binding:"required"`
	Meals     string `json:"meals" binding:"required"` // JSON string of meals
}

type UpdateMealPlanRequest struct {
	Meals string `json:"meals"`
}

func (h *Handler) GetMealPlans(c *gin.Context) {
	plans, err := h.svc.GetAllMealPlans()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if plans == nil {
		plans = []models.MealPlan{}
	}

	c.JSON(http.StatusOK, gin.H{"meal_plans": plans})
}

func (h *Handler) GetMealPlanByWeek(c *gin.Context) {
	weekStart := c.Param("weekStart")

	plan, err := h.svc.GetMealPlanByWeek(weekStart)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if plan == nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Meal plan not found"})
		return
	}

	c.JSON(http.StatusOK, plan)
}

func (h *Handler) CreateOrUpdateMealPlan(c *gin.Context) {
	var req CreateMealPlanRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	plan := &models.MealPlan{
		WeekStart: req.WeekStart,
		Meals:     req.Meals,
	}

	if userID := c.GetString("userID"); userID != "" {
		plan.CreatedBy = &userID
	}

	if err := h.svc.CreateOrUpdateMealPlan(plan); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Meal plan saved"})
}

func (h *Handler) DeleteMealPlan(c *gin.Context) {
	weekStart := c.Param("weekStart")

	// Check if meal plan exists
	plan, err := h.svc.GetMealPlanByWeek(weekStart)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	if plan == nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Meal plan not found"})
		return
	}

	if err := h.svc.DeleteMealPlan(plan.ID); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Meal plan deleted"})
}

// =====================
// WeekendActivity Handlers
// =====================

type CreateWeekendActivityRequest struct {
	Date     string `json:"date" binding:"required"`
	Activity string `json:"activity" binding:"required"`
	Status   string `json:"status"`
}

type UpdateWeekendActivityRequest struct {
	Date     string `json:"date"`
	Activity string `json:"activity"`
	Status   string `json:"status"`
}

func (h *Handler) GetWeekendActivities(c *gin.Context) {
	activities, err := h.svc.GetAllWeekendActivities()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if activities == nil {
		activities = []models.WeekendActivity{}
	}

	c.JSON(http.StatusOK, gin.H{"weekend_activities": activities})
}

func (h *Handler) CreateWeekendActivity(c *gin.Context) {
	var req CreateWeekendActivityRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	status := req.Status
	if status == "" {
		status = "planned"
	}

	act := &models.WeekendActivity{
		Date:     req.Date,
		Activity: req.Activity,
		Status:   status,
	}

	if userID := c.GetString("userID"); userID != "" {
		act.CreatedBy = &userID
	}

	if err := h.svc.CreateWeekendActivity(act); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"id": act.ID})
}

func (h *Handler) UpdateWeekendActivity(c *gin.Context) {
	id := c.Param("id")

	var req UpdateWeekendActivityRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	activities, err := h.svc.GetAllWeekendActivities()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	var existing *models.WeekendActivity
	for _, a := range activities {
		if a.ID == id {
			existing = &a
			break
		}
	}

	if existing == nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Weekend activity not found"})
		return
	}

	if req.Date != "" {
		existing.Date = req.Date
	}
	if req.Activity != "" {
		existing.Activity = req.Activity
	}
	if req.Status != "" {
		existing.Status = req.Status
	}

	if err := h.svc.UpdateWeekendActivity(existing); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Weekend activity updated"})
}

func (h *Handler) DeleteWeekendActivity(c *gin.Context) {
	id := c.Param("id")

	// Check if activity exists
	activities, err := h.svc.GetAllWeekendActivities()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	found := false
	for _, a := range activities {
		if a.ID == id {
			found = true
			break
		}
	}
	if !found {
		c.JSON(http.StatusNotFound, gin.H{"error": "Weekend activity not found"})
		return
	}

	if err := h.svc.DeleteWeekendActivity(id); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Weekend activity deleted"})
}

// =====================
// FamilyMember Handlers
// =====================

type CreateFamilyMemberRequest struct {
	Name         string `json:"name" binding:"required"`
	Relationship string `json:"relationship" binding:"required"`
	Phone        string `json:"phone"`
}

func (h *Handler) GetFamilyMembers(c *gin.Context) {
	members, err := h.svc.GetAllFamilyMembers()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if members == nil {
		members = []models.FamilyMember{}
	}

	// Sanitize all family members before returning
	members = models.SanitizeAllFamilyMembers(members)

	c.JSON(http.StatusOK, gin.H{"family_members": members})
}

func (h *Handler) CreateFamilyMember(c *gin.Context) {
	var req CreateFamilyMemberRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Sanitize input to prevent XSS
	req.Name = middleware.SanitizeUserName(req.Name)
	req.Relationship = middleware.SanitizeUserInput(req.Relationship)

	member := &models.FamilyMember{
		Name:         req.Name,
		Relationship: req.Relationship,
		Phone:        req.Phone,
	}

	if err := h.svc.CreateFamilyMember(member); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"id": member.ID})
}

// =====================
// Categories Handler
// =====================

func (h *Handler) GetBillCategories(c *gin.Context) {
	categories := []string{
		"Electricity",
		"Water",
		"Internet",
		"Phone",
		"Subscriptions",
		"Rent",
		"Other",
	}
	c.JSON(http.StatusOK, gin.H{"categories": categories})
}

// =====================
// API Root Handler
// =====================

func (h *Handler) APIRoot(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"name":    "SuperFamily API",
		"version": "v1",
		"status":  "running",
	})
}