package services

import (
	"context"
	"errors"
	"fmt"
	"time"

	"superfamily-backend/firebase"
	"superfamily-backend/middleware"
	"superfamily-backend/models"
	"superfamily-backend/repositories"

	"github.com/google/uuid"
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
// Auth Operations (SQLite)
// =====================

func (s *Service) Register(email, password, name string) (*models.AuthResponse, error) {
	existing, err := s.repo.GetUserByEmail(email)
	if err != nil {
		return nil, err
	}
	if existing != nil {
		return nil, errors.New("user already exists")
	}

	user, err := s.repo.CreateUser(email, password, name)
	if err != nil {
		return nil, err
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
// Whitelist Operations (Firestore)
// =====================

func (s *Service) GetAllWhitelistUsers() ([]models.WhitelistUser, error) {
	whitelistRepo := firebase.NewWhitelistRepository()
	ctx := context.Background()
	users, err := whitelistRepo.GetAll(ctx)
	if err != nil {
		return nil, err
	}
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
// Google OAuth Operations (SQLite)
// =====================

func (s *Service) FindOrCreateUserFromGoogle(googleEmail, googleName, googleUserID string) (*models.User, error) {
	account, err := s.repo.GetUserAccountByGoogleEmail(googleEmail)
	if err != nil {
		return nil, err
	}

	if account != nil {
		return s.repo.GetUserByID(account.UserID)
	}

	user, err := s.repo.CreateUserWithGoogle(googleEmail, googleName, googleEmail, googleUserID, &googleName)
	if err != nil {
		return nil, err
	}

	return user, nil
}

// =====================
// Bill Operations (Firestore)
// =====================

func (s *Service) GetAllBills() ([]models.Bill, error) {
	repo := firebase.NewBillsRepository()
	ctx := context.Background()
	fbills, err := repo.GetAll(ctx)
	if err != nil {
		return nil, err
	}
	return firestoreBillsToModel(fbills), nil
}

func (s *Service) GetBillByID(id string) (*models.Bill, error) {
	repo := firebase.NewBillsRepository()
	ctx := context.Background()
	fbill, err := repo.GetByID(ctx, id)
	if err != nil {
		return nil, err
	}
	if fbill == nil {
		return nil, nil
	}
	bills := firestoreBillsToModel([]firebase.FirestoreBill{*fbill})
	if len(bills) == 0 {
		return nil, nil
	}
	return &bills[0], nil
}

func (s *Service) CreateBill(bill *models.Bill) error {
	repo := firebase.NewBillsRepository()
	ctx := context.Background()
	fbill := &firebase.FirestoreBill{
		ID:           uuid.New().String(),
		Title:        bill.Title,
		Amount:       bill.Amount,
		DueDate:      bill.DueDate,
		Frequency:    bill.Frequency,
		Category:     bill.Category,
		IsPaid:       bill.IsPaid,
		PaidDate:     bill.PaidDate,
		PaidBy:       bill.PaidBy,
		NotifyBefore: bill.NotifyBefore,
		NotifiedAt:   bill.NotifiedAt,
		Note:         bill.Note,
		CreatedBy:    bill.CreatedBy,
	}
	if err := repo.Create(ctx, fbill); err != nil {
		return err
	}
	bill.ID = fbill.ID
	if s.sseMgr != nil {
		s.sseMgr.Broadcast("bills_updated", nil)
	}
	return nil
}

func (s *Service) UpdateBill(bill *models.Bill) error {
	repo := firebase.NewBillsRepository()
	ctx := context.Background()
	fbill := &firebase.FirestoreBill{
		ID:           bill.ID,
		Title:        bill.Title,
		Amount:       bill.Amount,
		DueDate:      bill.DueDate,
		Frequency:    bill.Frequency,
		Category:     bill.Category,
		IsPaid:       bill.IsPaid,
		PaidDate:     bill.PaidDate,
		PaidBy:       bill.PaidBy,
		NotifyBefore: bill.NotifyBefore,
		NotifiedAt:   bill.NotifiedAt,
		Note:         bill.Note,
		CreatedBy:    bill.CreatedBy,
		CreatedAt:    bill.CreatedAt,
	}
	if err := repo.Update(ctx, fbill); err != nil {
		return err
	}
	if s.sseMgr != nil {
		s.sseMgr.Broadcast("bills_updated", nil)
	}
	return nil
}

func (s *Service) DeleteBill(id string) error {
	repo := firebase.NewBillsRepository()
	ctx := context.Background()
	if err := repo.Delete(ctx, id); err != nil {
		return err
	}
	if s.sseMgr != nil {
		s.sseMgr.Broadcast("bills_updated", nil)
	}
	return nil
}

func (s *Service) MarkBillPaid(id string, paidBy string) error {
	repo := firebase.NewBillsRepository()
	ctx := context.Background()
	if err := repo.MarkPaid(ctx, id, paidBy); err != nil {
		return err
	}
	if s.sseMgr != nil {
		s.sseMgr.Broadcast("bills_updated", nil)
	}
	return nil
}

func (s *Service) MarkBillUnpaid(id string) error {
	repo := firebase.NewBillsRepository()
	ctx := context.Background()
	if err := repo.MarkUnpaid(ctx, id); err != nil {
		return err
	}
	if s.sseMgr != nil {
		s.sseMgr.Broadcast("bills_updated", nil)
	}
	return nil
}

func (s *Service) GetBillsDueSoon(days int) ([]models.Bill, error) {
	repo := firebase.NewBillsRepository()
	ctx := context.Background()
	fbills, err := repo.GetDueSoon(ctx, days)
	if err != nil {
		return nil, err
	}
	return firestoreBillsToModel(fbills), nil
}

// =====================
// Reminder Operations (Firestore)
// =====================

func (s *Service) GetAllReminders() ([]models.Reminder, error) {
	repo := firebase.NewRemindersRepository()
	ctx := context.Background()
	frems, err := repo.GetAll(ctx)
	if err != nil {
		return nil, err
	}
	return firestoreRemindersToModel(frems), nil
}

func (s *Service) CreateReminder(rem *models.Reminder) error {
	repo := firebase.NewRemindersRepository()
	ctx := context.Background()
	frem := &firebase.FirestoreReminder{
		ID:           uuid.New().String(),
		Title:        rem.Title,
		Amount:       rem.Amount,
		DueDate:      rem.DueDate,
		Frequency:    rem.Frequency,
		Category:     rem.Category,
		IsPaid:       rem.IsPaid,
		PaidDate:     rem.PaidDate,
		PaidBy:       rem.PaidBy,
		NotifyBefore: rem.NotifyBefore,
		NotifiedAt:   rem.NotifiedAt,
		Note:         rem.Note,
		CreatedBy:    rem.CreatedBy,
	}
	if err := repo.Create(ctx, frem); err != nil {
		return err
	}
	rem.ID = frem.ID
	if s.sseMgr != nil {
		s.sseMgr.Broadcast("reminders_updated", nil)
	}
	return nil
}

func (s *Service) UpdateReminder(rem *models.Reminder) error {
	repo := firebase.NewRemindersRepository()
	ctx := context.Background()
	frem := &firebase.FirestoreReminder{
		ID:           rem.ID,
		Title:        rem.Title,
		Amount:       rem.Amount,
		DueDate:      rem.DueDate,
		Frequency:    rem.Frequency,
		Category:     rem.Category,
		IsPaid:       rem.IsPaid,
		PaidDate:     rem.PaidDate,
		PaidBy:       rem.PaidBy,
		NotifyBefore: rem.NotifyBefore,
		NotifiedAt:   rem.NotifiedAt,
		Note:         rem.Note,
		CreatedBy:    rem.CreatedBy,
		CreatedAt:    rem.CreatedAt,
	}
	if err := repo.Update(ctx, frem); err != nil {
		return err
	}
	if s.sseMgr != nil {
		s.sseMgr.Broadcast("reminders_updated", nil)
	}
	return nil
}

func (s *Service) DeleteReminder(id string) error {
	repo := firebase.NewRemindersRepository()
	ctx := context.Background()
	if err := repo.Delete(ctx, id); err != nil {
		return err
	}
	if s.sseMgr != nil {
		s.sseMgr.Broadcast("reminders_updated", nil)
	}
	return nil
}

func (s *Service) MarkReminderPaid(id string, paidBy string) error {
	repo := firebase.NewRemindersRepository()
	ctx := context.Background()
	if err := repo.MarkPaid(ctx, id, paidBy); err != nil {
		return err
	}
	if s.sseMgr != nil {
		s.sseMgr.Broadcast("reminders_updated", nil)
	}
	return nil
}

func (s *Service) MarkReminderUnpaid(id string) error {
	repo := firebase.NewRemindersRepository()
	ctx := context.Background()
	if err := repo.MarkUnpaid(ctx, id); err != nil {
		return err
	}
	if s.sseMgr != nil {
		s.sseMgr.Broadcast("reminders_updated", nil)
	}
	return nil
}

// =====================
// Event Operations (Firestore)
// =====================

func (s *Service) GetAllEvents() ([]models.Event, error) {
	repo := firebase.NewEventsRepository()
	ctx := context.Background()
	events, err := repo.GetAll(ctx)
	if err != nil {
		return nil, err
	}
	return firestoreEventsToModel(events), nil
}

func (s *Service) CreateEvent(event *models.Event) error {
	repo := firebase.NewEventsRepository()
	ctx := context.Background()
	fevent := &firebase.FirestoreEvent{
		ID:         uuid.New().String(),
		Title:      event.Title,
		Date:       event.Date,
		Type:       event.Type,
		Color:      event.Color,
		NotifyDays: event.NotifyDays,
		Note:       event.Note,
		CreatedBy:  event.CreatedBy,
	}
	if err := repo.Create(ctx, fevent); err != nil {
		return err
	}
	event.ID = fevent.ID
	if s.sseMgr != nil {
		s.sseMgr.Broadcast("events_updated", nil)
	}
	return nil
}

func (s *Service) UpdateEvent(event *models.Event) error {
	repo := firebase.NewEventsRepository()
	ctx := context.Background()
	fevent := &firebase.FirestoreEvent{
		ID:         event.ID,
		Title:      event.Title,
		Date:       event.Date,
		Type:       event.Type,
		Color:      event.Color,
		NotifyDays: event.NotifyDays,
		Note:       event.Note,
		CreatedBy:  event.CreatedBy,
		CreatedAt:  event.CreatedAt,
	}
	if err := repo.Update(ctx, fevent); err != nil {
		return err
	}
	if s.sseMgr != nil {
		s.sseMgr.Broadcast("events_updated", nil)
	}
	return nil
}

func (s *Service) DeleteEvent(id string) error {
	repo := firebase.NewEventsRepository()
	ctx := context.Background()
	if err := repo.Delete(ctx, id); err != nil {
		return err
	}
	if s.sseMgr != nil {
		s.sseMgr.Broadcast("events_updated", nil)
	}
	return nil
}

// =====================
// Transaction Operations (Firestore)
// =====================

func (s *Service) GetAllTransactions() ([]models.Transaction, error) {
	repo := firebase.NewTransactionsRepository()
	ctx := context.Background()
	txs, err := repo.GetAll(ctx)
	if err != nil {
		return nil, err
	}
	return firestoreTransactionsToModel(txs), nil
}

func (s *Service) GetTransactionsByMonth(year, month int) ([]models.Transaction, error) {
	repo := firebase.NewTransactionsRepository()
	ctx := context.Background()
	txs, err := repo.GetByMonth(ctx, year, month)
	if err != nil {
		return nil, err
	}
	return firestoreTransactionsToModel(txs), nil
}

func (s *Service) CreateTransaction(tx *models.Transaction) error {
	repo := firebase.NewTransactionsRepository()
	ctx := context.Background()
	ftx := &firebase.FirestoreTransaction{
		ID:        uuid.New().String(),
		Amount:    tx.Amount,
		Category:  tx.Category,
		Date:      tx.Date,
		Type:      tx.Type,
		Status:    tx.Status,
		Note:      tx.Note,
		CreatedBy: tx.CreatedBy,
	}
	if err := repo.Create(ctx, ftx); err != nil {
		return err
	}
	tx.ID = ftx.ID
	if s.sseMgr != nil {
		s.sseMgr.Broadcast("transactions_updated", nil)
	}
	return nil
}

func (s *Service) UpdateTransaction(tx *models.Transaction) error {
	repo := firebase.NewTransactionsRepository()
	ctx := context.Background()
	ftx := &firebase.FirestoreTransaction{
		ID:        tx.ID,
		Amount:    tx.Amount,
		Category:  tx.Category,
		Date:      tx.Date,
		Type:      tx.Type,
		Status:    tx.Status,
		Note:      tx.Note,
		CreatedBy: tx.CreatedBy,
		CreatedAt: tx.CreatedAt,
	}
	if err := repo.Update(ctx, ftx); err != nil {
		return err
	}
	if s.sseMgr != nil {
		s.sseMgr.Broadcast("transactions_updated", nil)
	}
	return nil
}

func (s *Service) DeleteTransaction(id string) error {
	repo := firebase.NewTransactionsRepository()
	ctx := context.Background()
	if err := repo.Delete(ctx, id); err != nil {
		return err
	}
	if s.sseMgr != nil {
		s.sseMgr.Broadcast("transactions_updated", nil)
	}
	return nil
}

// =====================
// Budget Operations (Firestore)
// =====================

func (s *Service) GetBudget(month string) (*models.Budget, error) {
	repo := firebase.NewBudgetsRepository()
	ctx := context.Background()
	fbudget, err := repo.Get(ctx, month)
	if err != nil {
		return nil, err
	}
	if fbudget == nil {
		return nil, nil
	}
	return &models.Budget{
		ID:        fbudget.ID,
		Month:     fbudget.Month,
		Amount:    fbudget.Amount,
		UpdatedAt: fbudget.UpdatedAt,
	}, nil
}

func (s *Service) SetBudget(month string, amount int) error {
	repo := firebase.NewBudgetsRepository()
	ctx := context.Background()
	if err := repo.Set(ctx, month, amount); err != nil {
		return err
	}
	if s.sseMgr != nil {
		s.sseMgr.Broadcast("budget_updated", nil)
	}
	return nil
}

// =====================
// MealPlan Operations (Firestore)
// =====================

func (s *Service) GetAllMealPlans() ([]models.MealPlan, error) {
	repo := firebase.NewMealPlansRepository()
	ctx := context.Background()
	plans, err := repo.GetAll(ctx)
	if err != nil {
		return nil, err
	}
	return firestoreMealPlansToModel(plans), nil
}

func (s *Service) GetMealPlanByWeek(weekStart string) (*models.MealPlan, error) {
	repo := firebase.NewMealPlansRepository()
	ctx := context.Background()
	plan, err := repo.GetByWeek(ctx, weekStart)
	if err != nil {
		return nil, err
	}
	if plan == nil {
		return nil, nil
	}
	plans := firestoreMealPlansToModel([]firebase.FirestoreMealPlan{*plan})
	if len(plans) == 0 {
		return nil, nil
	}
	return &plans[0], nil
}

func (s *Service) CreateOrUpdateMealPlan(plan *models.MealPlan) error {
	repo := firebase.NewMealPlansRepository()
	ctx := context.Background()
	fplan := &firebase.FirestoreMealPlan{
		WeekStart: plan.WeekStart,
		Meals:     plan.Meals,
		CreatedBy: plan.CreatedBy,
	}
	if err := repo.Upsert(ctx, fplan); err != nil {
		return err
	}
	plan.ID = fplan.ID
	plan.CreatedAt = fplan.CreatedAt
	plan.UpdatedAt = fplan.UpdatedAt
	if s.sseMgr != nil {
		s.sseMgr.Broadcast("mealplans_updated", nil)
	}
	return nil
}

func (s *Service) DeleteMealPlan(id string) error {
	repo := firebase.NewMealPlansRepository()
	ctx := context.Background()
	if err := repo.Delete(ctx, id); err != nil {
		return err
	}
	if s.sseMgr != nil {
		s.sseMgr.Broadcast("mealplans_updated", nil)
	}
	return nil
}

// =====================
// WeekendActivity Operations (Firestore)
// =====================

func (s *Service) GetAllWeekendActivities() ([]models.WeekendActivity, error) {
	repo := firebase.NewWeekendActivitiesRepository()
	ctx := context.Background()
	activities, err := repo.GetAll(ctx)
	if err != nil {
		return nil, err
	}
	return firestoreWeekendActivitiesToModel(activities), nil
}

func (s *Service) CreateWeekendActivity(act *models.WeekendActivity) error {
	repo := firebase.NewWeekendActivitiesRepository()
	ctx := context.Background()
	fact := &firebase.FirestoreWeekendActivity{
		ID:         uuid.New().String(),
		Date:       act.Date,
		Activities: act.Activities,
		CreatedBy:  act.CreatedBy,
	}
	if err := repo.Create(ctx, fact); err != nil {
		return err
	}
	act.ID = fact.ID
	if s.sseMgr != nil {
		s.sseMgr.Broadcast("weekend_activities_updated", nil)
	}
	return nil
}

func (s *Service) UpdateWeekendActivity(act *models.WeekendActivity) error {
	repo := firebase.NewWeekendActivitiesRepository()
	ctx := context.Background()
	fact := &firebase.FirestoreWeekendActivity{
		ID:         act.ID,
		Date:       act.Date,
		Activities: act.Activities,
		CreatedBy:  act.CreatedBy,
		CreatedAt:  act.CreatedAt,
	}
	if err := repo.Update(ctx, fact); err != nil {
		return err
	}
	if s.sseMgr != nil {
		s.sseMgr.Broadcast("weekend_activities_updated", nil)
	}
	return nil
}

func (s *Service) DeleteWeekendActivity(id string) error {
	repo := firebase.NewWeekendActivitiesRepository()
	ctx := context.Background()
	if err := repo.Delete(ctx, id); err != nil {
		return err
	}
	if s.sseMgr != nil {
		s.sseMgr.Broadcast("weekend_activities_updated", nil)
	}
	return nil
}

// =====================
// FamilyMember Operations (SQLite - keep for now)
// =====================

func (s *Service) GetAllFamilyMembers() ([]models.FamilyMember, error) {
	return s.repo.GetAllFamilyMembers()
}

func (s *Service) CreateFamilyMember(m *models.FamilyMember) error {
	return s.repo.CreateFamilyMember(m)
}

// =====================
// Converter functions
// =====================

func firestoreBillsToModel(fbills []firebase.FirestoreBill) []models.Bill {
	bills := make([]models.Bill, len(fbills))
	for i, fb := range fbills {
		bills[i] = models.Bill{
			ID:           fb.ID,
			Title:        fb.Title,
			Amount:       fb.Amount,
			DueDate:      fb.DueDate,
			Frequency:    fb.Frequency,
			Category:     fb.Category,
			IsPaid:       fb.IsPaid,
			PaidDate:     fb.PaidDate,
			PaidBy:       fb.PaidBy,
			NotifyBefore: fb.NotifyBefore,
			NotifiedAt:   fb.NotifiedAt,
			Note:         fb.Note,
			CreatedBy:    fb.CreatedBy,
			CreatedAt:    fb.CreatedAt,
			UpdatedAt:    fb.UpdatedAt,
		}
	}
	return bills
}

func firestoreRemindersToModel(frems []firebase.FirestoreReminder) []models.Reminder {
	reminders := make([]models.Reminder, len(frems))
	for i, fr := range frems {
		reminders[i] = models.Reminder{
			ID:           fr.ID,
			Title:        fr.Title,
			Amount:       fr.Amount,
			DueDate:      fr.DueDate,
			Frequency:    fr.Frequency,
			Category:     fr.Category,
			IsPaid:       fr.IsPaid,
			PaidDate:     fr.PaidDate,
			PaidBy:       fr.PaidBy,
			NotifyBefore: fr.NotifyBefore,
			NotifiedAt:   fr.NotifiedAt,
			Note:         fr.Note,
			CreatedBy:    fr.CreatedBy,
			CreatedAt:    fr.CreatedAt,
			UpdatedAt:    fr.UpdatedAt,
		}
	}
	return reminders
}

func firestoreEventsToModel(fevents []firebase.FirestoreEvent) []models.Event {
	events := make([]models.Event, len(fevents))
	for i, fe := range fevents {
		events[i] = models.Event{
			ID:         fe.ID,
			Title:      fe.Title,
			Date:       fe.Date,
			Type:       fe.Type,
			Color:      fe.Color,
			NotifyDays: fe.NotifyDays,
			Note:       fe.Note,
			CreatedBy:  fe.CreatedBy,
			CreatedAt:  fe.CreatedAt,
			UpdatedAt:  fe.UpdatedAt,
		}
	}
	return events
}

func firestoreTransactionsToModel(ftxs []firebase.FirestoreTransaction) []models.Transaction {
	txs := make([]models.Transaction, len(ftxs))
	for i, ft := range ftxs {
		txs[i] = models.Transaction{
			ID:        ft.ID,
			Amount:    ft.Amount,
			Category:  ft.Category,
			Date:      ft.Date,
			Type:      ft.Type,
			Status:    ft.Status,
			Note:      ft.Note,
			CreatedBy: ft.CreatedBy,
			CreatedAt: ft.CreatedAt,
			UpdatedAt: ft.UpdatedAt,
		}
	}
	return txs
}

func firestoreMealPlansToModel(fplans []firebase.FirestoreMealPlan) []models.MealPlan {
	plans := make([]models.MealPlan, len(fplans))
	for i, fp := range fplans {
		plans[i] = models.MealPlan{
			ID:        fp.ID,
			WeekStart: fp.WeekStart,
			Meals:     fp.Meals,
			CreatedBy: fp.CreatedBy,
			CreatedAt: fp.CreatedAt,
			UpdatedAt:  fp.UpdatedAt,
		}
	}
	return plans
}

func firestoreWeekendActivitiesToModel(facts []firebase.FirestoreWeekendActivity) []models.WeekendActivity {
	activities := make([]models.WeekendActivity, len(facts))
	for i, fa := range facts {
		activities[i] = models.WeekendActivity{
			ID:         fa.ID,
			Date:       fa.Date,
			Activities: fa.Activities,
			CreatedBy: fa.CreatedBy,
			CreatedAt: fa.CreatedAt,
			UpdatedAt: fa.UpdatedAt,
		}
	}
	return activities
}

// Ensure time is used
var _ = fmt.Sprintf
var _ = time.Now
