package services

import (
	"context"
	"errors"
	"superfamily-backend/firebase"
	"superfamily-backend/middleware"
	"superfamily-backend/models"
	"superfamily-backend/repositories"
)

type Service struct {
	repo   *repositories.Repository
	sseMgr *middleware.SSEClientManager
}

func New(repo *repositories.Repository, sseMgr *middleware.SSEClientManager) *Service {
	return &Service{
		repo:   repo,
		sseMgr: sseMgr,
	}
}

// SetSSEClientManager allows setting the SSE manager after initialization
func (s *Service) SetSSEClientManager(mgr *middleware.SSEClientManager) {
	s.sseMgr = mgr
}

// =====================
// Auth Operations
// =====================

func (s *Service) Register(email, password, name string) (*models.AuthResponse, error) {
	// Check if user exists
	existing, err := s.repo.GetUserByEmail(email)
	if err != nil {
		return nil, err
	}
	if existing != nil {
		return nil, errors.New("user already exists")
	}

	// Create user
	user, err := s.repo.CreateUser(email, password, name)
	if err != nil {
		return nil, err
	}

	// Get JWT secret - this is set in main.go
	secret := middleware.GetJWTSecret()
	if secret == "" {
		return nil, errors.New("JWT secret not configured")
	}

	token, err := middleware.GenerateToken(user.ID, user.Email, user.Role, secret)
	if err != nil {
		return nil, err
	}

	return &models.AuthResponse{
		Token: token,
		User:  *user,
	}, nil
}

func (s *Service) Login(email, password string) (*models.AuthResponse, error) {
	user, err := s.repo.GetUserByEmail(email)
	if err != nil {
		return nil, err
	}
	if user == nil {
		return nil, errors.New("invalid credentials")
	}

	if !s.repo.ValidatePassword(user, password) {
		return nil, errors.New("invalid credentials")
	}

	secret := middleware.GetJWTSecret()
	if secret == "" {
		return nil, errors.New("JWT secret not configured")
	}

	token, err := middleware.GenerateToken(user.ID, user.Email, user.Role, secret)
	if err != nil {
		return nil, err
	}

	return &models.AuthResponse{
		Token: token,
		User:  *user,
	}, nil
}

func (s *Service) GetUserByID(id string) (*models.User, error) {
	return s.repo.GetUserByID(id)
}

// =====================
// Whitelist Operations
// =====================

func (s *Service) GetAllWhitelistUsers() ([]models.WhitelistUser, error) {
	whitelistRepo := firebase.NewWhitelistRepository()
	ctx := context.Background()
	users, err := whitelistRepo.GetAll(ctx)
	if err != nil {
		return nil, err
	}
	// Convert to models.WhitelistUser
	result := make([]models.WhitelistUser, 0, len(users))
	for _, u := range users {
		result = append(result, models.WhitelistUser{
			ID:        u.ID,
			Email:     u.Email,
			Name:      u.Name,
			Status:    u.Status,
			CreatedAt: u.CreatedAt,
			CreatedBy: u.CreatedBy,
			UpdatedAt: u.UpdatedAt,
		})
	}
	return result, nil
}

func (s *Service) AddToWhitelist(email, name, createdBy string) (*models.WhitelistUser, error) {
	whitelistRepo := firebase.NewWhitelistRepository()
	ctx := context.Background()
	user, err := whitelistRepo.Create(ctx, &firebase.WhitelistUser{
		Email:     email,
		Name:      name,
		Status:    "active",
		CreatedBy: &createdBy,
	})
	if err != nil {
		return nil, err
	}
	return &models.WhitelistUser{
		ID:        user.ID,
		Email:     user.Email,
		Name:      user.Name,
		Status:    user.Status,
		CreatedAt: user.CreatedAt,
		CreatedBy: user.CreatedBy,
		UpdatedAt: user.UpdatedAt,
	}, nil
}

func (s *Service) RemoveFromWhitelist(email string) error {
	whitelistRepo := firebase.NewWhitelistRepository()
	ctx := context.Background()
	return whitelistRepo.Delete(ctx, email)
}

func (s *Service) SuspendWhitelistUser(email string) error {
	whitelistRepo := firebase.NewWhitelistRepository()
	ctx := context.Background()
	return whitelistRepo.UpdateStatus(ctx, email, "suspended")
}

func (s *Service) ActivateWhitelistUser(email string) error {
	whitelistRepo := firebase.NewWhitelistRepository()
	ctx := context.Background()
	return whitelistRepo.UpdateStatus(ctx, email, "active")
}

func (s *Service) CheckWhitelist(email string) (*models.WhitelistUser, error) {
	whitelistRepo := firebase.NewWhitelistRepository()
	ctx := context.Background()
	user, err := whitelistRepo.GetByEmail(ctx, email)
	if err != nil {
		return nil, err
	}
	if user == nil {
		return nil, nil
	}
	return &models.WhitelistUser{
		ID:        user.ID,
		Email:     user.Email,
		Name:      user.Name,
		Status:    user.Status,
		CreatedAt: user.CreatedAt,
		CreatedBy: user.CreatedBy,
		UpdatedAt: user.UpdatedAt,
	}, nil
}

// =====================
// Google OAuth Operations
// =====================

// FindOrCreateUserFromGoogle finds existing user by Google email or creates new one
func (s *Service) FindOrCreateUserFromGoogle(googleEmail, googleName, googleUserID string) (*models.User, error) {
	// Check if Google account is already linked
	account, err := s.repo.GetUserAccountByGoogleEmail(googleEmail)
	if err != nil {
		return nil, err
	}

	if account != nil {
		// Existing user, return user info
		return s.repo.GetUserByID(account.UserID)
	}

	// Create new user with Google account
	user, err := s.repo.CreateUserWithGoogle(googleEmail, googleName, googleEmail, googleUserID, &googleName)
	if err != nil {
		return nil, err
	}

	return user, nil
}

// =====================
// Bill Operations
// =====================

func (s *Service) GetAllBills() ([]models.Bill, error) {
	return s.repo.GetAllBills()
}

func (s *Service) GetBillByID(id string) (*models.Bill, error) {
	return s.repo.GetBillByID(id)
}

func (s *Service) CreateBill(bill *models.Bill) error {
	err := s.repo.CreateBill(bill)
	if err != nil {
		return err
	}
	if s.sseMgr != nil {
		s.sseMgr.Broadcast("bills_updated", nil)
	}
	return nil
}

func (s *Service) UpdateBill(bill *models.Bill) error {
	err := s.repo.UpdateBill(bill)
	if err != nil {
		return err
	}
	if s.sseMgr != nil {
		s.sseMgr.Broadcast("bills_updated", nil)
	}
	return nil
}

func (s *Service) DeleteBill(id string) error {
	err := s.repo.DeleteBill(id)
	if err != nil {
		return err
	}
	if s.sseMgr != nil {
		s.sseMgr.Broadcast("bills_updated", nil)
	}
	return nil
}

func (s *Service) MarkBillPaid(id string, paidBy string) error {
	err := s.repo.MarkBillPaid(id, paidBy)
	if err != nil {
		return err
	}
	if s.sseMgr != nil {
		s.sseMgr.Broadcast("bills_updated", nil)
	}
	return nil
}

func (s *Service) MarkBillUnpaid(id string) error {
	err := s.repo.MarkBillUnpaid(id)
	if err != nil {
		return err
	}
	if s.sseMgr != nil {
		s.sseMgr.Broadcast("bills_updated", nil)
	}
	return nil
}

func (s *Service) GetBillsDueSoon(days int) ([]models.Bill, error) {
	return s.repo.GetBillsDueSoon(days)
}

// =====================
// Reminder Operations
// =====================

func (s *Service) GetAllReminders() ([]models.Reminder, error) {
	return s.repo.GetAllReminders()
}

func (s *Service) CreateReminder(rem *models.Reminder) error {
	err := s.repo.CreateReminder(rem)
	if err != nil {
		return err
	}
	if s.sseMgr != nil {
		s.sseMgr.Broadcast("reminders_updated", nil)
	}
	return nil
}

func (s *Service) UpdateReminder(rem *models.Reminder) error {
	err := s.repo.UpdateReminder(rem)
	if err != nil {
		return err
	}
	if s.sseMgr != nil {
		s.sseMgr.Broadcast("reminders_updated", nil)
	}
	return nil
}

func (s *Service) DeleteReminder(id string) error {
	err := s.repo.DeleteReminder(id)
	if err != nil {
		return err
	}
	if s.sseMgr != nil {
		s.sseMgr.Broadcast("reminders_updated", nil)
	}
	return nil
}

func (s *Service) MarkReminderPaid(id string, paidBy string) error {
	err := s.repo.MarkReminderPaid(id, paidBy)
	if err != nil {
		return err
	}
	if s.sseMgr != nil {
		s.sseMgr.Broadcast("reminders_updated", nil)
	}
	return nil
}

func (s *Service) MarkReminderUnpaid(id string) error {
	err := s.repo.MarkReminderUnpaid(id)
	if err != nil {
		return err
	}
	if s.sseMgr != nil {
		s.sseMgr.Broadcast("reminders_updated", nil)
	}
	return nil
}

// =====================
// Event Operations
// =====================

func (s *Service) GetAllEvents() ([]models.Event, error) {
	return s.repo.GetAllEvents()
}

func (s *Service) CreateEvent(event *models.Event) error {
	err := s.repo.CreateEvent(event)
	if err != nil {
		return err
	}
	if s.sseMgr != nil {
		s.sseMgr.Broadcast("events_updated", nil)
	}
	return nil
}

func (s *Service) UpdateEvent(event *models.Event) error {
	err := s.repo.UpdateEvent(event)
	if err != nil {
		return err
	}
	if s.sseMgr != nil {
		s.sseMgr.Broadcast("events_updated", nil)
	}
	return nil
}

func (s *Service) DeleteEvent(id string) error {
	err := s.repo.DeleteEvent(id)
	if err != nil {
		return err
	}
	if s.sseMgr != nil {
		s.sseMgr.Broadcast("events_updated", nil)
	}
	return nil
}

// =====================
// Transaction Operations
// =====================

func (s *Service) GetAllTransactions() ([]models.Transaction, error) {
	return s.repo.GetAllTransactions()
}

func (s *Service) GetTransactionsByMonth(year, month int) ([]models.Transaction, error) {
	return s.repo.GetTransactionsByMonth(year, month)
}

func (s *Service) CreateTransaction(tx *models.Transaction) error {
	err := s.repo.CreateTransaction(tx)
	if err != nil {
		return err
	}
	if s.sseMgr != nil {
		s.sseMgr.Broadcast("transactions_updated", nil)
	}
	return nil
}

func (s *Service) UpdateTransaction(tx *models.Transaction) error {
	err := s.repo.UpdateTransaction(tx)
	if err != nil {
		return err
	}
	if s.sseMgr != nil {
		s.sseMgr.Broadcast("transactions_updated", nil)
	}
	return nil
}

func (s *Service) DeleteTransaction(id string) error {
	err := s.repo.DeleteTransaction(id)
	if err != nil {
		return err
	}
	if s.sseMgr != nil {
		s.sseMgr.Broadcast("transactions_updated", nil)
	}
	return nil
}

// =====================
// Budget Operations
// =====================

func (s *Service) GetBudget(month string) (*models.Budget, error) {
	return s.repo.GetBudget(month)
}

func (s *Service) SetBudget(month string, amount int) error {
	err := s.repo.SetBudget(month, amount)
	if err != nil {
		return err
	}
	if s.sseMgr != nil {
		s.sseMgr.Broadcast("budget_updated", nil)
	}
	return nil
}

// =====================
// MealPlan Operations
// =====================

func (s *Service) GetAllMealPlans() ([]models.MealPlan, error) {
	return s.repo.GetAllMealPlans()
}

func (s *Service) GetMealPlanByWeek(weekStart string) (*models.MealPlan, error) {
	return s.repo.GetMealPlanByWeek(weekStart)
}

func (s *Service) CreateOrUpdateMealPlan(plan *models.MealPlan) error {
	err := s.repo.CreateOrUpdateMealPlan(plan)
	if err != nil {
		return err
	}
	if s.sseMgr != nil {
		s.sseMgr.Broadcast("mealplans_updated", nil)
	}
	return nil
}

func (s *Service) DeleteMealPlan(id string) error {
	err := s.repo.DeleteMealPlan(id)
	if err != nil {
		return err
	}
	if s.sseMgr != nil {
		s.sseMgr.Broadcast("mealplans_updated", nil)
	}
	return nil
}

// =====================
// WeekendActivity Operations
// =====================

func (s *Service) GetAllWeekendActivities() ([]models.WeekendActivity, error) {
	return s.repo.GetAllWeekendActivities()
}

func (s *Service) CreateWeekendActivity(act *models.WeekendActivity) error {
	err := s.repo.CreateWeekendActivity(act)
	if err != nil {
		return err
	}
	if s.sseMgr != nil {
		s.sseMgr.Broadcast("weekend_activities_updated", nil)
	}
	return nil
}

func (s *Service) UpdateWeekendActivity(act *models.WeekendActivity) error {
	err := s.repo.UpdateWeekendActivity(act)
	if err != nil {
		return err
	}
	if s.sseMgr != nil {
		s.sseMgr.Broadcast("weekend_activities_updated", nil)
	}
	return nil
}

func (s *Service) DeleteWeekendActivity(id string) error {
	err := s.repo.DeleteWeekendActivity(id)
	if err != nil {
		return err
	}
	if s.sseMgr != nil {
		s.sseMgr.Broadcast("weekend_activities_updated", nil)
	}
	return nil
}

// =====================
// FamilyMember Operations
// =====================

func (s *Service) GetAllFamilyMembers() ([]models.FamilyMember, error) {
	return s.repo.GetAllFamilyMembers()
}

func (s *Service) CreateFamilyMember(m *models.FamilyMember) error {
	return s.repo.CreateFamilyMember(m)
}