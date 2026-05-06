package firebase

import (
	"context"
	"fmt"
	"time"

	"cloud.google.com/go/firestore"
)

// FirestoreBill represents a bill document in Firestore
type FirestoreBill struct {
	ID           string    `json:"id" firestore:"id"`
	Title        string    `json:"title" firestore:"title"`
	Amount       int       `json:"amount" firestore:"amount"`
	DueDate      string    `json:"due_date" firestore:"due_date"`
	Frequency    string    `json:"frequency" firestore:"frequency"`
	Category     string    `json:"category" firestore:"category"`
	IsPaid       bool      `json:"is_paid" firestore:"is_paid"`
	PaidDate     *string   `json:"paid_date,omitempty" firestore:"paid_date,omitempty"`
	PaidBy       *string   `json:"paid_by,omitempty" firestore:"paid_by,omitempty"`
	NotifyBefore int       `json:"notify_before" firestore:"notify_before"`
	NotifiedAt   *string   `json:"notified_at,omitempty" firestore:"notified_at,omitempty"`
	Note         *string   `json:"note,omitempty" firestore:"note,omitempty"`
	CreatedBy    *string   `json:"created_by,omitempty" firestore:"created_by,omitempty"`
	CreatedAt    time.Time `json:"created_at" firestore:"created_at"`
	UpdatedAt    time.Time `json:"updated_at" firestore:"updated_at"`
}

// FirestoreReminder represents a reminder document in Firestore
type FirestoreReminder struct {
	ID           string    `json:"id" firestore:"id"`
	Title        string    `json:"title" firestore:"title"`
	Amount       int       `json:"amount" firestore:"amount"`
	DueDate      string    `json:"due_date" firestore:"due_date"`
	Frequency    string    `json:"frequency" firestore:"frequency"`
	Category     string    `json:"category" firestore:"category"`
	IsPaid       bool      `json:"is_paid" firestore:"is_paid"`
	PaidDate     *string   `json:"paid_date,omitempty" firestore:"paid_date,omitempty"`
	PaidBy       *string   `json:"paid_by,omitempty" firestore:"paid_by,omitempty"`
	NotifyBefore int       `json:"notify_before" firestore:"notify_before"`
	NotifiedAt   *string   `json:"notified_at,omitempty" firestore:"notified_at,omitempty"`
	Note         *string   `json:"note,omitempty" firestore:"note,omitempty"`
	CreatedBy    *string   `json:"created_by,omitempty" firestore:"created_by,omitempty"`
	CreatedAt    time.Time `json:"created_at" firestore:"created_at"`
	UpdatedAt    time.Time `json:"updated_at" firestore:"updated_at"`
}

// FirestoreEvent represents an event document in Firestore
type FirestoreEvent struct {
	ID         string    `json:"id" firestore:"id"`
	Title      string    `json:"title" firestore:"title"`
	Date       string    `json:"date" firestore:"date"`
	Type       string    `json:"type" firestore:"type"`
	Color      *string   `json:"color,omitempty" firestore:"color,omitempty"`
	NotifyDays int       `json:"notify_days" firestore:"notify_days"`
	Note       *string   `json:"note,omitempty" firestore:"note,omitempty"`
	CreatedBy  *string   `json:"created_by,omitempty" firestore:"created_by,omitempty"`
	CreatedAt  time.Time `json:"created_at" firestore:"created_at"`
	UpdatedAt  time.Time `json:"updated_at" firestore:"updated_at"`
}

// FirestoreTransaction represents a transaction document in Firestore
type FirestoreTransaction struct {
	ID        string    `json:"id" firestore:"id"`
	Amount    int       `json:"amount" firestore:"amount"`
	Category  string    `json:"category" firestore:"category"`
	Date      string    `json:"date" firestore:"date"`
	Type      string    `json:"type" firestore:"type"`
	Status    string    `json:"status" firestore:"status"`
	Note      *string   `json:"note,omitempty" firestore:"note,omitempty"`
	CreatedBy *string   `json:"created_by,omitempty" firestore:"created_by,omitempty"`
	CreatedAt time.Time `json:"created_at" firestore:"created_at"`
	UpdatedAt time.Time `json:"updated_at" firestore:"updated_at"`
}

// FirestoreBudget represents a budget document in Firestore
type FirestoreBudget struct {
	ID        string    `json:"id" firestore:"id"`
	Month     string    `json:"month" firestore:"month"`
	Amount    int       `json:"amount" firestore:"amount"`
	UpdatedAt time.Time `json:"updated_at" firestore:"updated_at"`
}

// FirestoreMealPlan represents a meal plan document in Firestore
type FirestoreMealPlan struct {
	ID        string    `json:"id" firestore:"id"`
	WeekStart string    `json:"week_start" firestore:"week_start"`
	Meals     string    `json:"meals" firestore:"meals"`
	CreatedBy *string   `json:"created_by,omitempty" firestore:"created_by,omitempty"`
	CreatedAt time.Time `json:"created_at" firestore:"created_at"`
	UpdatedAt time.Time `json:"updated_at" firestore:"updated_at"`
}

// FirestoreWeekendActivity represents a weekend activity document in Firestore
type FirestoreWeekendActivity struct {
	ID         string    `json:"id" firestore:"id"`
	Date       string    `json:"date" firestore:"date"`
	Activities string    `json:"activities" firestore:"activities"` // JSON string array
	CreatedBy  *string   `json:"created_by,omitempty" firestore:"created_by,omitempty"`
	CreatedAt  time.Time `json:"created_at" firestore:"created_at"`
	UpdatedAt  time.Time `json:"updated_at" firestore:"updated_at"`
}

// =====================
// Bills Repository
// =====================

type BillsRepository struct {
	collection *firestore.CollectionRef
}

func NewBillsRepository() *BillsRepository {
	return &BillsRepository{
		collection: Collection("bills"),
	}
}

func (r *BillsRepository) GetAll(ctx context.Context) ([]FirestoreBill, error) {
	if r.collection == nil {
		return nil, fmt.Errorf("firebase client not initialized")
	}
	docs, err := r.collection.OrderBy("due_date", firestore.Asc).Documents(ctx).GetAll()
	if err != nil {
		return nil, err
	}

	bills := make([]FirestoreBill, 0, len(docs))
	for _, doc := range docs {
		var bill FirestoreBill
		if err := doc.DataTo(&bill); err != nil {
			continue
		}
		bill.ID = doc.Ref.ID
		bills = append(bills, bill)
	}
	return bills, nil
}

func (r *BillsRepository) GetByID(ctx context.Context, id string) (*FirestoreBill, error) {
	if r.collection == nil {
		return nil, fmt.Errorf("firebase client not initialized")
	}
	doc, err := r.collection.Doc(id).Get(ctx)
	if err != nil {
		return nil, err
	}
	if !doc.Exists() {
		return nil, nil
	}
	var bill FirestoreBill
	if err := doc.DataTo(&bill); err != nil {
		return nil, err
	}
	bill.ID = doc.Ref.ID
	return &bill, nil
}

func (r *BillsRepository) Create(ctx context.Context, bill *FirestoreBill) error {
	if r.collection == nil {
		return fmt.Errorf("firebase client not initialized")
	}
	now := time.Now()
	bill.CreatedAt = now
	bill.UpdatedAt = now
	_, err := r.collection.Doc(bill.ID).Set(ctx, bill)
	return err
}

func (r *BillsRepository) Update(ctx context.Context, bill *FirestoreBill) error {
	if r.collection == nil {
		return fmt.Errorf("firebase client not initialized")
	}
	bill.UpdatedAt = time.Now()
	_, err := r.collection.Doc(bill.ID).Set(ctx, bill)
	return err
}

func (r *BillsRepository) Delete(ctx context.Context, id string) error {
	if r.collection == nil {
		return fmt.Errorf("firebase client not initialized")
	}
	_, err := r.collection.Doc(id).Delete(ctx)
	return err
}

func (r *BillsRepository) MarkPaid(ctx context.Context, id string, paidBy string) error {
	if r.collection == nil {
		return fmt.Errorf("firebase client not initialized")
	}
	paidDate := time.Now().Format("2006-01-02")
	_, err := r.collection.Doc(id).Update(ctx, []firestore.Update{
		{Path: "is_paid", Value: true},
		{Path: "paid_date", Value: paidDate},
		{Path: "paid_by", Value: paidBy},
		{Path: "updated_at", Value: firestore.ServerTimestamp},
	})
	return err
}

func (r *BillsRepository) MarkUnpaid(ctx context.Context, id string) error {
	if r.collection == nil {
		return fmt.Errorf("firebase client not initialized")
	}
	_, err := r.collection.Doc(id).Update(ctx, []firestore.Update{
		{Path: "is_paid", Value: false},
		{Path: "paid_date", Value: nil},
		{Path: "paid_by", Value: nil},
		{Path: "updated_at", Value: firestore.ServerTimestamp},
	})
	return err
}

func (r *BillsRepository) GetDueSoon(ctx context.Context, days int) ([]FirestoreBill, error) {
	if r.collection == nil {
		return nil, fmt.Errorf("firebase client not initialized")
	}
	futureDate := time.Now().AddDate(0, 0, days).Format("2006-01-02")
	today := time.Now().Format("2006-01-02")

	docs, err := r.collection.
		Where("is_paid", "==", false).
		Where("due_date", ">=", today).
		Where("due_date", "<=", futureDate).
		OrderBy("due_date", firestore.Asc).
		Documents(ctx).GetAll()
	if err != nil {
		return nil, err
	}

	bills := make([]FirestoreBill, 0, len(docs))
	for _, doc := range docs {
		var bill FirestoreBill
		if err := doc.DataTo(&bill); err != nil {
			continue
		}
		bill.ID = doc.Ref.ID
		bills = append(bills, bill)
	}
	return bills, nil
}

// =====================
// Reminders Repository
// =====================

type RemindersRepository struct {
	collection *firestore.CollectionRef
}

func NewRemindersRepository() *RemindersRepository {
	return &RemindersRepository{
		collection: Collection("reminders"),
	}
}

func (r *RemindersRepository) GetAll(ctx context.Context) ([]FirestoreReminder, error) {
	if r.collection == nil {
		return nil, fmt.Errorf("firebase client not initialized")
	}
	docs, err := r.collection.OrderBy("due_date", firestore.Asc).Documents(ctx).GetAll()
	if err != nil {
		return nil, err
	}

	reminders := make([]FirestoreReminder, 0, len(docs))
	for _, doc := range docs {
		var rem FirestoreReminder
		if err := doc.DataTo(&rem); err != nil {
			continue
		}
		rem.ID = doc.Ref.ID
		reminders = append(reminders, rem)
	}
	return reminders, nil
}

func (r *RemindersRepository) Create(ctx context.Context, rem *FirestoreReminder) error {
	if r.collection == nil {
		return fmt.Errorf("firebase client not initialized")
	}
	now := time.Now()
	rem.CreatedAt = now
	rem.UpdatedAt = now
	_, err := r.collection.Doc(rem.ID).Set(ctx, rem)
	return err
}

func (r *RemindersRepository) Update(ctx context.Context, rem *FirestoreReminder) error {
	if r.collection == nil {
		return fmt.Errorf("firebase client not initialized")
	}
	rem.UpdatedAt = time.Now()
	_, err := r.collection.Doc(rem.ID).Set(ctx, rem)
	return err
}

func (r *RemindersRepository) Delete(ctx context.Context, id string) error {
	if r.collection == nil {
		return fmt.Errorf("firebase client not initialized")
	}
	_, err := r.collection.Doc(id).Delete(ctx)
	return err
}

func (r *RemindersRepository) MarkPaid(ctx context.Context, id string, paidBy string) error {
	if r.collection == nil {
		return fmt.Errorf("firebase client not initialized")
	}
	paidDate := time.Now().Format("2006-01-02")
	_, err := r.collection.Doc(id).Update(ctx, []firestore.Update{
		{Path: "is_paid", Value: true},
		{Path: "paid_date", Value: paidDate},
		{Path: "paid_by", Value: paidBy},
		{Path: "updated_at", Value: firestore.ServerTimestamp},
	})
	return err
}

func (r *RemindersRepository) MarkUnpaid(ctx context.Context, id string) error {
	if r.collection == nil {
		return fmt.Errorf("firebase client not initialized")
	}
	_, err := r.collection.Doc(id).Update(ctx, []firestore.Update{
		{Path: "is_paid", Value: false},
		{Path: "paid_date", Value: nil},
		{Path: "paid_by", Value: nil},
		{Path: "updated_at", Value: firestore.ServerTimestamp},
	})
	return err
}

// =====================
// Events Repository
// =====================

type EventsRepository struct {
	collection *firestore.CollectionRef
}

func NewEventsRepository() *EventsRepository {
	return &EventsRepository{
		collection: Collection("events"),
	}
}

func (r *EventsRepository) GetAll(ctx context.Context) ([]FirestoreEvent, error) {
	if r.collection == nil {
		return nil, fmt.Errorf("firebase client not initialized")
	}
	docs, err := r.collection.OrderBy("date", firestore.Asc).Documents(ctx).GetAll()
	if err != nil {
		return nil, err
	}

	events := make([]FirestoreEvent, 0, len(docs))
	for _, doc := range docs {
		var event FirestoreEvent
		if err := doc.DataTo(&event); err != nil {
			continue
		}
		event.ID = doc.Ref.ID
		events = append(events, event)
	}
	return events, nil
}

func (r *EventsRepository) Create(ctx context.Context, event *FirestoreEvent) error {
	if r.collection == nil {
		return fmt.Errorf("firebase client not initialized")
	}
	now := time.Now()
	event.CreatedAt = now
	event.UpdatedAt = now
	_, err := r.collection.Doc(event.ID).Set(ctx, event)
	return err
}

func (r *EventsRepository) Update(ctx context.Context, event *FirestoreEvent) error {
	if r.collection == nil {
		return fmt.Errorf("firebase client not initialized")
	}
	event.UpdatedAt = time.Now()
	_, err := r.collection.Doc(event.ID).Set(ctx, event)
	return err
}

func (r *EventsRepository) Delete(ctx context.Context, id string) error {
	if r.collection == nil {
		return fmt.Errorf("firebase client not initialized")
	}
	_, err := r.collection.Doc(id).Delete(ctx)
	return err
}

// =====================
// Transactions Repository
// =====================

type TransactionsRepository struct {
	collection *firestore.CollectionRef
}

func NewTransactionsRepository() *TransactionsRepository {
	return &TransactionsRepository{
		collection: Collection("transactions"),
	}
}

func (r *TransactionsRepository) GetAll(ctx context.Context) ([]FirestoreTransaction, error) {
	if r.collection == nil {
		return nil, fmt.Errorf("firebase client not initialized")
	}
	docs, err := r.collection.OrderBy("date", firestore.Desc).Documents(ctx).GetAll()
	if err != nil {
		return nil, err
	}

	txs := make([]FirestoreTransaction, 0, len(docs))
	for _, doc := range docs {
		var tx FirestoreTransaction
		if err := doc.DataTo(&tx); err != nil {
			continue
		}
		tx.ID = doc.Ref.ID
		txs = append(txs, tx)
	}
	return txs, nil
}

func (r *TransactionsRepository) GetByMonth(ctx context.Context, year, month int) ([]FirestoreTransaction, error) {
	if r.collection == nil {
		return nil, fmt.Errorf("firebase client not initialized")
	}
	startDate := fmt.Sprintf("%04d-%02d-01", year, month)
	var endDate string
	if month == 12 {
		endDate = fmt.Sprintf("%04d-01-01", year+1)
	} else {
		endDate = fmt.Sprintf("%04d-%02d-01", year, month+1)
	}

	docs, err := r.collection.
		Where("date", ">=", startDate).
		Where("date", "<", endDate).
		OrderBy("date", firestore.Desc).
		Documents(ctx).GetAll()
	if err != nil {
		return nil, err
	}

	txs := make([]FirestoreTransaction, 0, len(docs))
	for _, doc := range docs {
		var tx FirestoreTransaction
		if err := doc.DataTo(&tx); err != nil {
			continue
		}
		tx.ID = doc.Ref.ID
		txs = append(txs, tx)
	}
	return txs, nil
}

func (r *TransactionsRepository) Create(ctx context.Context, tx *FirestoreTransaction) error {
	if r.collection == nil {
		return fmt.Errorf("firebase client not initialized")
	}
	now := time.Now()
	tx.CreatedAt = now
	tx.UpdatedAt = now
	_, err := r.collection.Doc(tx.ID).Set(ctx, tx)
	return err
}

func (r *TransactionsRepository) Update(ctx context.Context, tx *FirestoreTransaction) error {
	if r.collection == nil {
		return fmt.Errorf("firebase client not initialized")
	}
	tx.UpdatedAt = time.Now()
	_, err := r.collection.Doc(tx.ID).Set(ctx, tx)
	return err
}

func (r *TransactionsRepository) Delete(ctx context.Context, id string) error {
	if r.collection == nil {
		return fmt.Errorf("firebase client not initialized")
	}
	_, err := r.collection.Doc(id).Delete(ctx)
	return err
}

// =====================
// Budgets Repository
// =====================

type BudgetsRepository struct {
	collection *firestore.CollectionRef
}

func NewBudgetsRepository() *BudgetsRepository {
	return &BudgetsRepository{
		collection: Collection("budgets"),
	}
}

func (r *BudgetsRepository) Get(ctx context.Context, month string) (*FirestoreBudget, error) {
	if r.collection == nil {
		return nil, fmt.Errorf("firebase client not initialized")
	}
	doc, err := r.collection.Doc(month).Get(ctx)
	if err != nil {
		return nil, err
	}
	if !doc.Exists() {
		return nil, nil
	}
	var budget FirestoreBudget
	if err := doc.DataTo(&budget); err != nil {
		return nil, err
	}
	budget.ID = doc.Ref.ID
	return &budget, nil
}

func (r *BudgetsRepository) Set(ctx context.Context, month string, amount int) error {
	if r.collection == nil {
		return fmt.Errorf("firebase client not initialized")
	}
	budget := FirestoreBudget{
		ID:        month,
		Month:     month,
		Amount:    amount,
		UpdatedAt: time.Now(),
	}
	_, err := r.collection.Doc(month).Set(ctx, budget)
	return err
}

// =====================
// MealPlans Repository
// =====================

type MealPlansRepository struct {
	collection *firestore.CollectionRef
}

func NewMealPlansRepository() *MealPlansRepository {
	return &MealPlansRepository{
		collection: Collection("mealPlans"),
	}
}

func (r *MealPlansRepository) GetAll(ctx context.Context) ([]FirestoreMealPlan, error) {
	if r.collection == nil {
		return nil, fmt.Errorf("firebase client not initialized")
	}
	docs, err := r.collection.OrderBy("week_start", firestore.Desc).Documents(ctx).GetAll()
	if err != nil {
		return nil, err
	}

	plans := make([]FirestoreMealPlan, 0, len(docs))
	for _, doc := range docs {
		var plan FirestoreMealPlan
		if err := doc.DataTo(&plan); err != nil {
			continue
		}
		plan.ID = doc.Ref.ID
		plans = append(plans, plan)
	}
	return plans, nil
}

func (r *MealPlansRepository) GetByWeek(ctx context.Context, weekStart string) (*FirestoreMealPlan, error) {
	if r.collection == nil {
		return nil, fmt.Errorf("firebase client not initialized")
	}
	doc, err := r.collection.Doc(weekStart).Get(ctx)
	if err != nil {
		return nil, err
	}
	if !doc.Exists() {
		return nil, nil
	}
	var plan FirestoreMealPlan
	if err := doc.DataTo(&plan); err != nil {
		return nil, err
	}
	plan.ID = doc.Ref.ID
	return &plan, nil
}

func (r *MealPlansRepository) Upsert(ctx context.Context, plan *FirestoreMealPlan) error {
	if r.collection == nil {
		return fmt.Errorf("firebase client not initialized")
	}
	plan.UpdatedAt = time.Now()
	existing, err := r.GetByWeek(ctx, plan.WeekStart)
	if err != nil {
		return err
	}
	if existing != nil {
		plan.ID = existing.ID
		plan.CreatedAt = existing.CreatedAt
	} else {
		plan.CreatedAt = time.Now()
	}
	_, err = r.collection.Doc(plan.WeekStart).Set(ctx, plan)
	return err
}

func (r *MealPlansRepository) Delete(ctx context.Context, id string) error {
	if r.collection == nil {
		return fmt.Errorf("firebase client not initialized")
	}
	_, err := r.collection.Doc(id).Delete(ctx)
	return err
}

// =====================
// WeekendActivities Repository
// =====================

type WeekendActivitiesRepository struct {
	collection *firestore.CollectionRef
}

func NewWeekendActivitiesRepository() *WeekendActivitiesRepository {
	return &WeekendActivitiesRepository{
		collection: Collection("weekendActivities"),
	}
}

func (r *WeekendActivitiesRepository) GetAll(ctx context.Context) ([]FirestoreWeekendActivity, error) {
	if r.collection == nil {
		return nil, fmt.Errorf("firebase client not initialized")
	}
	docs, err := r.collection.OrderBy("date", firestore.Desc).Documents(ctx).GetAll()
	if err != nil {
		return nil, err
	}

	activities := make([]FirestoreWeekendActivity, 0, len(docs))
	for _, doc := range docs {
		var act FirestoreWeekendActivity
		if err := doc.DataTo(&act); err != nil {
			continue
		}
		act.ID = doc.Ref.ID
		activities = append(activities, act)
	}
	return activities, nil
}

func (r *WeekendActivitiesRepository) Create(ctx context.Context, act *FirestoreWeekendActivity) error {
	if r.collection == nil {
		return fmt.Errorf("firebase client not initialized")
	}
	now := time.Now()
	act.CreatedAt = now
	act.UpdatedAt = now
	_, err := r.collection.Doc(act.ID).Set(ctx, act)
	return err
}

func (r *WeekendActivitiesRepository) Update(ctx context.Context, act *FirestoreWeekendActivity) error {
	if r.collection == nil {
		return fmt.Errorf("firebase client not initialized")
	}
	act.UpdatedAt = time.Now()
	_, err := r.collection.Doc(act.ID).Set(ctx, act)
	return err
}

func (r *WeekendActivitiesRepository) Delete(ctx context.Context, id string) error {
	if r.collection == nil {
		return fmt.Errorf("firebase client not initialized")
	}
	_, err := r.collection.Doc(id).Delete(ctx)
	return err
}

// =====================
// Helpers
// =====================

// strPtr returns a pointer to a string
func strPtr(s string) *string {
	return &s
}

// boolPtr returns a pointer to a bool
func boolPtr(b bool) *bool {
	return &b
}

// Helper to convert FirestoreBill to models.Bill
func BillToModel(fb FirestoreBill) interface{} {
	return map[string]interface{}{
		"id":            fb.ID,
		"title":         fb.Title,
		"amount":        fb.Amount,
		"due_date":      fb.DueDate,
		"frequency":     fb.Frequency,
		"category":      fb.Category,
		"is_paid":       fb.IsPaid,
		"paid_date":     fb.PaidDate,
		"paid_by":       fb.PaidBy,
		"notify_before": fb.NotifyBefore,
		"notified_at":   fb.NotifiedAt,
		"note":          fb.Note,
		"created_by":    fb.CreatedBy,
		"created_at":    fb.CreatedAt,
		"updated_at":    fb.UpdatedAt,
	}
}

// FirestoreDocToMap converts a Firestore document to map for response
func FirestoreDocToMap(doc *firestore.DocumentSnapshot, data interface{}) map[string]interface{} {
	m := make(map[string]interface{})
	m["id"] = doc.Ref.ID
	return m
}
