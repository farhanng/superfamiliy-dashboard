// tests/sso-login.spec.js - SQA Test for SuperFamily SSO + Dashboard
import { test, expect } from '@playwright/test'

const BASE_URL = 'https://family.farhan.biz.id'
const BACKEND_API = 'https://superfamily-backend-hpd7gsjsza-as.a.run.app'

test.describe('SuperFamily SSO & Dashboard SQA', () => {

  test.beforeEach(async ({ page }) => {
    // Clear auth state before each test
    await page.goto(BASE_URL)
    await page.evaluate(() => {
      localStorage.removeItem('sf_auth_token')
      localStorage.removeItem('sf_user')
    })
  })

  // ===== SSO TESTS =====

  test('TC-SSO-01: Initiate Google OAuth from login page', async ({ page }) => {
    await page.goto(BASE_URL)
    
    // Check login page loads
    await expect(page.locator('text=SuperFamily')).toBeVisible()
    
    // Check Google OAuth button exists
    const googleBtn = page.locator('a:has-text("Login with Google")')
    await expect(googleBtn).toBeVisible()
    
    // Click Google OAuth button
    await googleBtn.click()
    
    // Should redirect to Google OAuth
    await expect(page).toHaveURL(/google.*oauth|accounts\.google/)
  })

  test('TC-LOC-01: Local login with valid credentials', async ({ page }) => {
    await page.goto(BASE_URL)
    
    // Fill login form (pre-filled values exist)
    await page.fill('input[name="email"]', 'farhan@superfamily.local')
    await page.fill('input[name="password"]', 'farhan123')
    
    // Submit
    await page.click('button[type="submit"]')
    
    // Wait for redirect to dashboard
    await page.waitForURL(/#home/, { timeout: 10000 })
    
    // Check dashboard loaded
    await expect(page.locator('text=SuperFamily')).toBeVisible()
  })

  test('TC-LOC-02: Local login with invalid credentials', async ({ page }) => {
    await page.goto(BASE_URL)
    
    // Fill with wrong credentials
    await page.fill('input[name="email"]', 'wrong@test.com')
    await page.fill('input[name="password"]', 'wrongpassword')
    
    // Submit
    await page.click('button[type="submit"]')
    
    // Error message should appear
    await expect(page.locator('#auth-error')).toBeVisible()
    await expect(page.locator('#auth-error')).not.toBeEmpty()
  })

  test('TC-DASH-02: Unauthenticated redirect to login', async ({ page }) => {
    // Try to access protected route directly
    await page.goto(`${BASE_URL}/#budget`)
    
    // Should redirect to login
    await expect(page).toHaveURL(/#login/)
    await expect(page.locator('input[name="email"]')).toBeVisible()
  })

  test('TC-LOC-05: Logout works correctly', async ({ page }) => {
    // First login
    await page.goto(BASE_URL)
    await page.fill('input[name="email"]', 'farhan@superfamily.local')
    await page.fill('input[name="password"]', 'farhan123')
    await page.click('button[type="submit"]')
    await page.waitForURL(/#home/, { timeout: 10000 })
    
    // Click logout button
    await page.click('#logout-btn')
    
    // Confirm logout
    page.on('dialog', dialog => dialog.accept())
    await page.click('#logout-btn')
    
    // Should be redirected to login
    await page.waitForURL(/#login/, { timeout: 5000 })
  })

  test('TC-DASH-01: Authenticated user can access home screen', async ({ page }) => {
    // Login first
    await page.goto(BASE_URL)
    await page.fill('input[name="email"]', 'farhan@superfamily.local')
    await page.fill('input[name="password"]', 'farhan123')
    await page.click('button[type="submit"]')
    await page.waitForURL(/#home/, { timeout: 10000 })
    
    // Check home screen elements
    await expect(page.locator('#screen-content')).toBeVisible()
    
    // Check bottom navigation
    await expect(page.locator('nav')).toBeVisible()
  })

  test('TC-DASH-03: Bottom navigation works', async ({ page }) => {
    // Login first
    await page.goto(BASE_URL)
    await page.fill('input[name="email"]', 'farhan@superfamily.local')
    await page.fill('input[name="password"]', 'farhan123')
    await page.click('button[type="submit"]')
    await page.waitForURL(/#home/, { timeout: 10000 })
    
    // Click budget nav item
    await page.click('a[data-route="budget"]')
    
    // Should navigate to budget
    await expect(page).toHaveURL(/#budget/)
  })

  test('TC-DASH-04: Language toggle works', async ({ page }) => {
    await page.goto(BASE_URL)
    
    // Default is ID
    const langToggle = page.locator('#lang-toggle')
    await expect(langToggle).toContainText('ID')
    
    // Toggle to EN
    await langToggle.click()
    
    // Should show EN
    await expect(page.locator('#lang-toggle')).toContainText('EN')
  })
})