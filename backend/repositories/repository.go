package repositories

import (
	"crypto/rand"
	"database/sql"
	"encoding/base64"
	"fmt"
	"strings"
	"time"

	"superfamily-backend/models"

	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

type Repository struct {
	db *sql.DB
}

func New(db *sql.DB) *Repository {
	return &Repository{db: db}
}

// =====================
// User Operations
// =====================

func (r *Repository) CreateUser(email, password, name string) (*models.User, error) {
	// Hash password with bcrypt cost 10
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), 10)
	if err != nil {
		return nil, fmt.Errorf("failed to hash password: %w", err)
	}

	id := uuid.New().String()
	createdAt := time.Now()

	_, err = r.db.Exec(
		`INSERT INTO users (id, email, password_hash, name, role, created_at) VALUES (?, ?, ?, ?, ?, ?)`,
		id, email, string(hashedPassword), name, "member", createdAt,
	)
	if err != nil {
		return nil, fmt.Errorf("failed to create user: %w", err)
	}

	return &models.User{
		ID:        id,
		Email:     email,
		Name:      name,
		Role:      "member",
		CreatedAt: createdAt,
	}, nil
}

func (r *Repository) GetUserByEmail(email string) (*models.User, error) {
	var user models.User
	err := r.db.QueryRow(
		`SELECT id, email, password_hash, name, role, created_at FROM users WHERE email = ?`,
		email,
	).Scan(&user.ID, &user.Email, &user.PasswordHash, &user.Name, &user.Role, &user.CreatedAt)

	if err == sql.ErrNoRows {
		return nil, nil
	}
	if err != nil {
		return nil, fmt.Errorf("failed to get user: %w", err)
	}

	return &user, nil
}

func (r *Repository) GetUserByID(id string) (*models.User, error) {
	var user models.User
	err := r.db.QueryRow(
		`SELECT id, email, password_hash, name, role, created_at FROM users WHERE id = ?`,
		id,
	).Scan(&user.ID, &user.Email, &user.PasswordHash, &user.Name, &user.Role, &user.CreatedAt)

	if err == sql.ErrNoRows {
		return nil, nil
	}
	if err != nil {
		return nil, fmt.Errorf("failed to get user: %w", err)
	}

	return &user, nil
}

func (r *Repository) ValidatePassword(user *models.User, password string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(password))
	return err == nil
}

// =====================
// Bill Operations
// =====================

func (r *Repository) GetAllBills() ([]models.Bill, error) {
	rows, err := r.db.Query(`
		SELECT id, title, amount, due_date, frequency, category, is_paid, paid_date, paid_by, 
		       notify_before, notified_at, note, created_by, created_at, updated_at
		FROM bills ORDER BY due_date ASC
	`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var bills []models.Bill
	for rows.Next() {
		var bill models.Bill
		err := rows.Scan(
			&bill.ID, &bill.Title, &bill.Amount, &bill.DueDate, &bill.Frequency, &bill.Category,
			&bill.IsPaid, &bill.PaidDate, &bill.PaidBy, &bill.NotifyBefore, &bill.NotifiedAt,
			&bill.Note, &bill.CreatedBy, &bill.CreatedAt, &bill.UpdatedAt,
		)
		if err != nil {
			return nil, err
		}
		bills = append(bills, bill)
	}

	return bills, nil
}

func (r *Repository) GetBillByID(id string) (*models.Bill, error) {
	var bill models.Bill
	err := r.db.QueryRow(`
		SELECT id, title, amount, due_date, frequency, category, is_paid, paid_date, paid_by,
		       notify_before, notified_at, note, created_by, created_at, updated_at
		FROM bills WHERE id = ?
	`, id).Scan(
		&bill.ID, &bill.Title, &bill.Amount, &bill.DueDate, &bill.Frequency, &bill.Category,
		&bill.IsPaid, &bill.PaidDate, &bill.PaidBy, &bill.NotifyBefore, &bill.NotifiedAt,
		&bill.Note, &bill.CreatedBy, &bill.CreatedAt, &bill.UpdatedAt,
	)

	if err == sql.ErrNoRows {
		return nil, nil
	}
	if err != nil {
		return nil, err
	}

	return &bill, nil
}

func (r *Repository) CreateBill(bill *models.Bill) error {
	bill.ID = uuid.New().String()
	bill.CreatedAt = time.Now()
	bill.UpdatedAt = time.Now()

	_, err := r.db.Exec(`
		INSERT INTO bills (id, title, amount, due_date, frequency, category, is_paid, paid_date, paid_by,
		                  notify_before, notified_at, note, created_by, created_at, updated_at)
		VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
	`, bill.ID, bill.Title, bill.Amount, bill.DueDate, bill.Frequency, bill.Category,
		bill.IsPaid, bill.PaidDate, bill.PaidBy, bill.NotifyBefore, bill.NotifiedAt,
		bill.Note, bill.CreatedBy, bill.CreatedAt, bill.UpdatedAt)

	return err
}

func (r *Repository) UpdateBill(bill *models.Bill) error {
	bill.UpdatedAt = time.Now()
	_, err := r.db.Exec(`
		UPDATE bills SET title=?, amount=?, due_date=?, frequency=?, category=?, is_paid=?,
		                 paid_date=?, paid_by=?, notify_before=?, notified_at=?, note=?,
		                 created_by=?, updated_at=?
		WHERE id=?
	`, bill.Title, bill.Amount, bill.DueDate, bill.Frequency, bill.Category,
		bill.IsPaid, bill.PaidDate, bill.PaidBy, bill.NotifyBefore, bill.NotifiedAt,
		bill.Note, bill.CreatedBy, bill.UpdatedAt, bill.ID)

	return err
}

func (r *Repository) DeleteBill(id string) error {
	_, err := r.db.Exec(`DELETE FROM bills WHERE id = ?`, id)
	return err
}

func (r *Repository) MarkBillPaid(id string, paidBy string) error {
	paidDate := time.Now().Format("2006-01-02")
	_, err := r.db.Exec(`UPDATE bills SET is_paid=1, paid_date=?, paid_by=?, updated_at=? WHERE id=?`,
		paidDate, paidBy, time.Now(), id)
	return err
}

func (r *Repository) MarkBillUnpaid(id string) error {
	_, err := r.db.Exec(`UPDATE bills SET is_paid=0, paid_date=NULL, paid_by=NULL, updated_at=? WHERE id=?`,
		time.Now(), id)
	return err
}

func (r *Repository) GetBillsDueSoon(days int) ([]models.Bill, error) {
	futureDate := time.Now().AddDate(0, 0, days).Format("2006-01-02")
	today := time.Now().Format("2006-01-02")

	rows, err := r.db.Query(`
		SELECT id, title, amount, due_date, frequency, category, is_paid, paid_date, paid_by,
		       notify_before, notified_at, note, created_by, created_at, updated_at
		FROM bills WHERE is_paid=0 AND due_date >= ? AND due_date <= ?
	`, today, futureDate)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var bills []models.Bill
	for rows.Next() {
		var bill models.Bill
		err := rows.Scan(
			&bill.ID, &bill.Title, &bill.Amount, &bill.DueDate, &bill.Frequency, &bill.Category,
			&bill.IsPaid, &bill.PaidDate, &bill.PaidBy, &bill.NotifyBefore, &bill.NotifiedAt,
			&bill.Note, &bill.CreatedBy, &bill.CreatedAt, &bill.UpdatedAt,
		)
		if err != nil {
			return nil, err
		}
		bills = append(bills, bill)
	}

	return bills, nil
}

// =====================
// Reminder Operations
// =====================

func (r *Repository) GetAllReminders() ([]models.Reminder, error) {
	rows, err := r.db.Query(`
		SELECT id, title, amount, due_date, frequency, category, is_paid, paid_date, paid_by,
		       notify_before, notified_at, note, created_by, created_at, updated_at
		FROM reminders ORDER BY due_date ASC
	`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var reminders []models.Reminder
	for rows.Next() {
		var rem models.Reminder
		err := rows.Scan(
			&rem.ID, &rem.Title, &rem.Amount, &rem.DueDate, &rem.Frequency, &rem.Category,
			&rem.IsPaid, &rem.PaidDate, &rem.PaidBy, &rem.NotifyBefore, &rem.NotifiedAt,
			&rem.Note, &rem.CreatedBy, &rem.CreatedAt, &rem.UpdatedAt,
		)
		if err != nil {
			return nil, err
		}
		reminders = append(reminders, rem)
	}

	return reminders, nil
}

func (r *Repository) CreateReminder(rem *models.Reminder) error {
	rem.ID = uuid.New().String()
	rem.CreatedAt = time.Now()
	rem.UpdatedAt = time.Now()

	_, err := r.db.Exec(`
		INSERT INTO reminders (id, title, amount, due_date, frequency, category, is_paid, paid_date, paid_by,
		                       notify_before, notified_at, note, created_by, created_at, updated_at)
		VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
	`, rem.ID, rem.Title, rem.Amount, rem.DueDate, rem.Frequency, rem.Category,
		rem.IsPaid, rem.PaidDate, rem.PaidBy, rem.NotifyBefore, rem.NotifiedAt,
		rem.Note, rem.CreatedBy, rem.CreatedAt, rem.UpdatedAt)

	return err
}

func (r *Repository) UpdateReminder(rem *models.Reminder) error {
	rem.UpdatedAt = time.Now()
	_, err := r.db.Exec(`
		UPDATE reminders SET title=?, amount=?, due_date=?, frequency=?, category=?, is_paid=?,
		                     paid_date=?, paid_by=?, notify_before=?, notified_at=?, note=?,
		                     created_by=?, updated_at=?
		WHERE id=?
	`, rem.Title, rem.Amount, rem.DueDate, rem.Frequency, rem.Category,
		rem.IsPaid, rem.PaidDate, rem.PaidBy, rem.NotifyBefore, rem.NotifiedAt,
		rem.Note, rem.CreatedBy, rem.UpdatedAt, rem.ID)

	return err
}

func (r *Repository) DeleteReminder(id string) error {
	_, err := r.db.Exec(`DELETE FROM reminders WHERE id = ?`, id)
	return err
}

func (r *Repository) MarkReminderPaid(id string, paidBy string) error {
	paidDate := time.Now().Format("2006-01-02")
	_, err := r.db.Exec(`UPDATE reminders SET is_paid=1, paid_date=?, paid_by=?, updated_at=? WHERE id=?`,
		paidDate, paidBy, time.Now(), id)
	return err
}

func (r *Repository) MarkReminderUnpaid(id string) error {
	_, err := r.db.Exec(`UPDATE reminders SET is_paid=0, paid_date=NULL, paid_by=NULL, updated_at=? WHERE id=?`,
		time.Now(), id)
	return err
}

// =====================
// Event Operations
// =====================

func (r *Repository) GetAllEvents() ([]models.Event, error) {
	rows, err := r.db.Query(`
		SELECT id, title, date, type, color, notify_days, note, created_by, created_at, updated_at
		FROM events ORDER BY date ASC
	`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var events []models.Event
	for rows.Next() {
		var event models.Event
		err := rows.Scan(
			&event.ID, &event.Title, &event.Date, &event.Type, &event.Color,
			&event.NotifyDays, &event.Note, &event.CreatedBy, &event.CreatedAt, &event.UpdatedAt,
		)
		if err != nil {
			return nil, err
		}
		events = append(events, event)
	}

	return events, nil
}

func (r *Repository) CreateEvent(event *models.Event) error {
	event.ID = uuid.New().String()
	event.CreatedAt = time.Now()
	event.UpdatedAt = time.Now()

	_, err := r.db.Exec(`
		INSERT INTO events (id, title, date, type, color, notify_days, note, created_by, created_at, updated_at)
		VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
	`, event.ID, event.Title, event.Date, event.Type, event.Color,
		event.NotifyDays, event.Note, event.CreatedBy, event.CreatedAt, event.UpdatedAt)

	return err
}

func (r *Repository) UpdateEvent(event *models.Event) error {
	event.UpdatedAt = time.Now()
	_, err := r.db.Exec(`
		UPDATE events SET title=?, date=?, type=?, color=?, notify_days=?, note=?, created_by=?, updated_at=?
		WHERE id=?
	`, event.Title, event.Date, event.Type, event.Color,
		event.NotifyDays, event.Note, event.CreatedBy, event.UpdatedAt, event.ID)

	return err
}

func (r *Repository) DeleteEvent(id string) error {
	_, err := r.db.Exec(`DELETE FROM events WHERE id = ?`, id)
	return err
}

// =====================
// Transaction Operations
// =====================

func (r *Repository) GetAllTransactions() ([]models.Transaction, error) {
	rows, err := r.db.Query(`
		SELECT id, amount, category, date, type, status, note, created_by, created_at, updated_at
		FROM transactions ORDER BY date DESC
	`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var transactions []models.Transaction
	for rows.Next() {
		var tx models.Transaction
		err := rows.Scan(
			&tx.ID, &tx.Amount, &tx.Category, &tx.Date, &tx.Type, &tx.Status,
			&tx.Note, &tx.CreatedBy, &tx.CreatedAt, &tx.UpdatedAt,
		)
		if err != nil {
			return nil, err
		}
		transactions = append(transactions, tx)
	}

	return transactions, nil
}

func (r *Repository) GetTransactionsByMonth(year, month int) ([]models.Transaction, error) {
	startDate := fmt.Sprintf("%04d-%02d-01", year, month)
	var endDate string
	if month == 12 {
		endDate = fmt.Sprintf("%04d-01-01", year+1)
	} else {
		endDate = fmt.Sprintf("%04d-%02d-01", year, month+1)
	}

	rows, err := r.db.Query(`
		SELECT id, amount, category, date, type, status, note, created_by, created_at, updated_at
		FROM transactions WHERE date >= ? AND date < ?
		ORDER BY date DESC
	`, startDate, endDate)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var transactions []models.Transaction
	for rows.Next() {
		var tx models.Transaction
		err := rows.Scan(
			&tx.ID, &tx.Amount, &tx.Category, &tx.Date, &tx.Type, &tx.Status,
			&tx.Note, &tx.CreatedBy, &tx.CreatedAt, &tx.UpdatedAt,
		)
		if err != nil {
			return nil, err
		}
		transactions = append(transactions, tx)
	}

	return transactions, nil
}

func (r *Repository) CreateTransaction(tx *models.Transaction) error {
	tx.ID = uuid.New().String()
	tx.CreatedAt = time.Now()
	tx.UpdatedAt = time.Now()

	_, err := r.db.Exec(`
		INSERT INTO transactions (id, amount, category, date, type, status, note, created_by, created_at, updated_at)
		VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
	`, tx.ID, tx.Amount, tx.Category, tx.Date, tx.Type, tx.Status,
		tx.Note, tx.CreatedBy, tx.CreatedAt, tx.UpdatedAt)

	return err
}

func (r *Repository) UpdateTransaction(tx *models.Transaction) error {
	tx.UpdatedAt = time.Now()
	_, err := r.db.Exec(`
		UPDATE transactions SET amount=?, category=?, date=?, type=?, status=?, note=?, created_by=?, updated_at=?
		WHERE id=?
	`, tx.Amount, tx.Category, tx.Date, tx.Type, tx.Status,
		tx.Note, tx.CreatedBy, tx.UpdatedAt, tx.ID)

	return err
}

func (r *Repository) DeleteTransaction(id string) error {
	_, err := r.db.Exec(`DELETE FROM transactions WHERE id = ?`, id)
	return err
}

// =====================
// Budget Operations
// =====================

func (r *Repository) GetBudget(month string) (*models.Budget, error) {
	var budget models.Budget
	err := r.db.QueryRow(`SELECT id, month, amount, updated_at FROM budgets WHERE month = ?`, month).
		Scan(&budget.ID, &budget.Month, &budget.Amount, &budget.UpdatedAt)

	if err == sql.ErrNoRows {
		return nil, nil
	}
	if err != nil {
		return nil, err
	}

	return &budget, nil
}

func (r *Repository) SetBudget(month string, amount int) error {
	existing, err := r.GetBudget(month)
	if err != nil {
		return err
	}

	if existing != nil {
		_, err = r.db.Exec(`UPDATE budgets SET amount=?, updated_at=? WHERE month=?`,
			amount, time.Now(), month)
	} else {
		_, err = r.db.Exec(`INSERT INTO budgets (id, month, amount, updated_at) VALUES (?, ?, ?, ?)`,
			uuid.New().String(), month, amount, time.Now())
	}

	return err
}

// =====================
// MealPlan Operations
// =====================

func (r *Repository) GetAllMealPlans() ([]models.MealPlan, error) {
	rows, err := r.db.Query(`
		SELECT id, week_start, meals, created_by, created_at, updated_at
		FROM meal_plans ORDER BY week_start DESC
	`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var plans []models.MealPlan
	for rows.Next() {
		var plan models.MealPlan
		err := rows.Scan(
			&plan.ID, &plan.WeekStart, &plan.Meals, &plan.CreatedBy, &plan.CreatedAt, &plan.UpdatedAt,
		)
		if err != nil {
			return nil, err
		}
		plans = append(plans, plan)
	}

	return plans, nil
}

func (r *Repository) GetMealPlanByWeek(weekStart string) (*models.MealPlan, error) {
	var plan models.MealPlan
	err := r.db.QueryRow(`
		SELECT id, week_start, meals, created_by, created_at, updated_at
		FROM meal_plans WHERE week_start = ?
	`, weekStart).Scan(
		&plan.ID, &plan.WeekStart, &plan.Meals, &plan.CreatedBy, &plan.CreatedAt, &plan.UpdatedAt,
	)

	if err == sql.ErrNoRows {
		return nil, nil
	}
	if err != nil {
		return nil, err
	}

	return &plan, nil
}

func (r *Repository) CreateOrUpdateMealPlan(plan *models.MealPlan) error {
	existing, err := r.GetMealPlanByWeek(plan.WeekStart)
	if err != nil {
		return err
	}

	plan.UpdatedAt = time.Now()

	if existing != nil {
		plan.ID = existing.ID
		plan.CreatedAt = existing.CreatedAt
		_, err = r.db.Exec(`UPDATE meal_plans SET meals=?, created_by=?, updated_at=? WHERE week_start=?`,
			plan.Meals, plan.CreatedBy, plan.UpdatedAt, plan.WeekStart)
	} else {
		plan.ID = uuid.New().String()
		plan.CreatedAt = time.Now()
		_, err = r.db.Exec(`
			INSERT INTO meal_plans (id, week_start, meals, created_by, created_at, updated_at)
			VALUES (?, ?, ?, ?, ?, ?)
		`, plan.ID, plan.WeekStart, plan.Meals, plan.CreatedBy, plan.CreatedAt, plan.UpdatedAt)
	}

	return err
}

func (r *Repository) DeleteMealPlan(id string) error {
	_, err := r.db.Exec(`DELETE FROM meal_plans WHERE id = ?`, id)
	return err
}

// =====================
// WeekendActivity Operations
// =====================

func (r *Repository) GetAllWeekendActivities() ([]models.WeekendActivity, error) {
	rows, err := r.db.Query(`
		SELECT id, date, activity, status, created_by, created_at, updated_at
		FROM weekend_activities ORDER BY date DESC
	`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var activities []models.WeekendActivity
	for rows.Next() {
		var act models.WeekendActivity
		err := rows.Scan(
			&act.ID, &act.Date, &act.Activity, &act.Status, &act.CreatedBy, &act.CreatedAt, &act.UpdatedAt,
		)
		if err != nil {
			return nil, err
		}
		activities = append(activities, act)
	}

	return activities, nil
}

func (r *Repository) CreateWeekendActivity(act *models.WeekendActivity) error {
	act.ID = uuid.New().String()
	act.CreatedAt = time.Now()
	act.UpdatedAt = time.Now()

	_, err := r.db.Exec(`
		INSERT INTO weekend_activities (id, date, activity, status, created_by, created_at, updated_at)
		VALUES (?, ?, ?, ?, ?, ?, ?)
	`, act.ID, act.Date, act.Activity, act.Status, act.CreatedBy, act.CreatedAt, act.UpdatedAt)

	return err
}

func (r *Repository) UpdateWeekendActivity(act *models.WeekendActivity) error {
	act.UpdatedAt = time.Now()
	_, err := r.db.Exec(`
		UPDATE weekend_activities SET date=?, activity=?, status=?, created_by=?, updated_at=?
		WHERE id=?
	`, act.Date, act.Activity, act.Status, act.CreatedBy, act.UpdatedAt, act.ID)

	return err
}

func (r *Repository) DeleteWeekendActivity(id string) error {
	_, err := r.db.Exec(`DELETE FROM weekend_activities WHERE id = ?`, id)
	return err
}

// =====================
// FamilyMember Operations
// =====================

func (r *Repository) GetAllFamilyMembers() ([]models.FamilyMember, error) {
	rows, err := r.db.Query(`SELECT id, name, relationship, phone, created_at FROM family_members ORDER BY name ASC`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var members []models.FamilyMember
	for rows.Next() {
		var m models.FamilyMember
		err := rows.Scan(&m.ID, &m.Name, &m.Relationship, &m.Phone, &m.CreatedAt)
		if err != nil {
			return nil, err
		}
		members = append(members, m)
	}

	return members, nil
}

func (r *Repository) CreateFamilyMember(m *models.FamilyMember) error {
	m.ID = uuid.New().String()
	m.CreatedAt = time.Now()

	_, err := r.db.Exec(
		`INSERT INTO family_members (id, name, relationship, phone, created_at) VALUES (?, ?, ?, ?, ?)`,
		m.ID, m.Name, m.Relationship, m.Phone, m.CreatedAt,
	)
	return err
}

// =====================
// WhitelistUser Operations
// =====================

func (r *Repository) GetAllWhitelistUsers() ([]models.WhitelistUser, error) {
	rows, err := r.db.Query(`
		SELECT id, email, name, status, created_at, created_by, updated_at 
		FROM whitelist_users 
		ORDER BY created_at DESC
	`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var users []models.WhitelistUser
	for rows.Next() {
		var u models.WhitelistUser
		err := rows.Scan(&u.ID, &u.Email, &u.Name, &u.Status, &u.CreatedAt, &u.CreatedBy, &u.UpdatedAt)
		if err != nil {
			return nil, err
		}
		users = append(users, u)
	}

	return users, nil
}

func (r *Repository) GetWhitelistUserByEmail(email string) (*models.WhitelistUser, error) {
	var u models.WhitelistUser
	err := r.db.QueryRow(`
		SELECT id, email, name, status, created_at, created_by, updated_at 
		FROM whitelist_users WHERE email = ?
	`, email).Scan(&u.ID, &u.Email, &u.Name, &u.Status, &u.CreatedAt, &u.CreatedBy, &u.UpdatedAt)

	if err == sql.ErrNoRows {
		return nil, nil
	}
	if err != nil {
		return nil, err
	}

	return &u, nil
}

func (r *Repository) CreateWhitelistUser(email, name, createdBy string) (*models.WhitelistUser, error) {
	id := uuid.New().String()
	now := time.Now()

	var createdByPtr *string
	if createdBy != "" {
		createdByPtr = &createdBy
	}

	_, err := r.db.Exec(`
		INSERT INTO whitelist_users (id, email, name, status, created_at, created_by, updated_at) 
		VALUES (?, ?, ?, 'active', ?, ?, ?)
	`, id, email, name, now, createdByPtr, now)
	if err != nil {
		if strings.Contains(err.Error(), "UNIQUE constraint") {
			return nil, fmt.Errorf("email already in whitelist")
		}
		return nil, err
	}

	return &models.WhitelistUser{
		ID:        id,
		Email:     email,
		Name:      name,
		Status:    "active",
		CreatedAt: now,
		CreatedBy: createdByPtr,
		UpdatedAt: now,
	}, nil
}

func (r *Repository) UpdateWhitelistUserStatus(email, status string) error {
	_, err := r.db.Exec(`UPDATE whitelist_users SET status = ?, updated_at = ? WHERE email = ?`,
		status, time.Now(), email)
	return err
}

func (r *Repository) DeleteWhitelistUser(email string) error {
	_, err := r.db.Exec(`DELETE FROM whitelist_users WHERE email = ?`, email)
	return err
}

// =====================
// UserAccount Operations
// =====================

func (r *Repository) GetUserAccountByGoogleEmail(googleEmail string) (*models.UserAccount, error) {
	var ua models.UserAccount
	err := r.db.QueryRow(`
		SELECT id, user_id, google_email, google_user_id, google_name, linked_at 
		FROM user_accounts WHERE google_email = ?
	`, googleEmail).Scan(&ua.ID, &ua.UserID, &ua.GoogleEmail, &ua.GoogleUserID, &ua.GoogleName, &ua.LinkedAt)

	if err == sql.ErrNoRows {
		return nil, nil
	}
	if err != nil {
		return nil, err
	}

	return &ua, nil
}

func (r *Repository) CreateUserAccount(userID, googleEmail, googleUserID string, googleName *string) (*models.UserAccount, error) {
	id := uuid.New().String()
	now := time.Now()

	_, err := r.db.Exec(`
		INSERT INTO user_accounts (id, user_id, google_email, google_user_id, google_name, linked_at) 
		VALUES (?, ?, ?, ?, ?, ?)
	`, id, userID, googleEmail, googleUserID, googleName, now)
	if err != nil {
		if strings.Contains(err.Error(), "UNIQUE constraint") {
			return nil, fmt.Errorf("google account already linked")
		}
		return nil, err
	}

	return &models.UserAccount{
		ID:           id,
		UserID:       userID,
		GoogleEmail:  googleEmail,
		GoogleUserID: googleUserID,
		GoogleName:   googleName,
		LinkedAt:     now,
	}, nil
}

func (r *Repository) CreateUserWithGoogle(email, name, googleEmail, googleUserID string, googleName *string) (*models.User, error) {
	// Create user with random password (not usable for local login)
	randomPassword := generateRandomString(32)
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(randomPassword), 10)
	if err != nil {
		return nil, fmt.Errorf("failed to hash password: %w", err)
	}

	id := uuid.New().String()
	createdAt := time.Now()

	_, err = r.db.Exec(
		`INSERT INTO users (id, email, password_hash, name, role, provider, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)`,
		id, email, string(hashedPassword), name, "member", "google", createdAt,
	)
	if err != nil {
		return nil, fmt.Errorf("failed to create user: %w", err)
	}

	// Link to Google account
	_, err = r.CreateUserAccount(id, googleEmail, googleUserID, googleName)
	if err != nil {
		return nil, fmt.Errorf("failed to link google account: %w", err)
	}

	return &models.User{
		ID:        id,
		Email:     email,
		Name:      name,
		Role:      "member",
		Provider:  "google",
		CreatedAt: createdAt,
	}, nil
}

// generateRandomString generates cryptographically secure random string
func generateRandomString(length int) string {
	bytes := make([]byte, length)
	rand.Read(bytes)
	return base64.RawURLEncoding.EncodeToString(bytes)[:length]
}