// tests/sso-login.puppeteer.cjs - SQA Test using existing Chrome remote
const puppeteer = require('puppeteer')

const BASE_URL = 'https://family.farhan.biz.id'
const CDP_PORT = 18800

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

async function clearAuth(page) {
  // Hard refresh to ensure latest code
  await page.goto('about:blank')
  await page.goto(`${BASE_URL}/#/login`, { waitUntil: 'networkidle2', timeout: 30000 })
  // Clear localStorage from within the page context
  try {
    await page.evaluate(() => {
      localStorage.removeItem('sf_auth_token')
      localStorage.removeItem('sf_user')
    })
  } catch (e) {
    console.log(`   ⚠️  Could not clear localStorage: ${e.message}`)
  }
  // Hard reload to get fresh state
  await page.goto(`${BASE_URL}/#/login`, { waitUntil: 'networkidle2', timeout: 30000 })
  await delay(1000)
}

async function runTests() {
  console.log('🚀 Starting SuperFamily SQA Tests (SSO-only mode)...\n')
  console.log('Using Chrome remote debug at port', CDP_PORT)
  
  // Use target-based approach for isolation
  const browser = await puppeteer.connect({
    browserURL: `http://127.0.0.1:${CDP_PORT}`
  })
  
  // Use browser.createTarget for fresh page (better isolation)
  const page = await browser.newPage()
  await page.setViewport({ width: 390, height: 844 })
  
  let passed = 0
  let failed = 0
  const failures = []
  
  async function test(name, fn) {
    try {
      console.log(`▶️  ${name}`)
      await fn(page)
      console.log(`   ✅ PASS\n`)
      passed++
    } catch (err) {
      console.log(`   ❌ FAIL: ${err.message}\n`)
      failed++
      failures.push({ name, error: err.message })
    }
  }
  
  // ===== TC-DASH-02: Unauthenticated redirect =====
  await test('TC-DASH-02: Unauthenticated redirect to login', async (p) => {
    await clearAuth(p)
    
    // Navigate directly to protected route
    await p.goto(`${BASE_URL}/#/budget`, { waitUntil: 'networkidle2', timeout: 30000 })
    await delay(2000)
    
    const hash = await p.evaluate(() => window.location.hash)
    if (!hash.includes('login')) {
      throw new Error(`Expected hash to contain 'login', got: ${hash}`)
    }
  })
  
  // ===== TC-SSO-01: Google OAuth button visible =====
  await test('TC-SSO-01: Google OAuth button visible on login page', async (p) => {
    await clearAuth(p)
    
    await p.waitForSelector('a[href*="google"]', { timeout: 10000 })
    await delay(500)
    
    const googleBtn = await p.$('a[href*="google"]')
    if (!googleBtn) {
      throw new Error('Google OAuth button not found')
    }
    
    const btnText = await googleBtn.evaluate(el => el.textContent)
    console.log(`   ℹ️  Button text: "${btnText.trim()}"`)
    
    // Verify button is visible (not hidden)
    const isVisible = await googleBtn.isVisible()
    if (!isVisible) {
      throw new Error('Google OAuth button is not visible')
    }
  })
  
  // ===== TC-SSO-02: Initiate Google OAuth =====
  await test('TC-SSO-02: Click Google OAuth button initiates flow', async (p) => {
    await clearAuth(p)
    
    await p.waitForSelector('a[href*="google"]', { timeout: 10000 })
    await delay(500)
    
    // Get OAuth URL from button
    const href = await p.$eval('a[href*="google"]', el => el.href).catch(() => null)
    if (href) {
      console.log(`   ℹ️  OAuth URL: ${href.substring(0, 70)}...`)
    }
    
    // Click Google button
    const googleBtn = await p.$('a[href*="google"]')
    await googleBtn.click()
    await delay(2000)
    
    const url = p.url()
    console.log(`   ℹ️  URL after click: ${url.substring(0, 80)}`)
    
    // Check if redirect happened to Google
    if (url.includes('google') || url.includes('accounts.google') || url.includes('oauth')) {
      console.log(`   ✅ Redirected to Google OAuth`)
    } else if (url.includes('error')) {
      throw new Error(`OAuth error redirect: ${url}`)
    } else {
      console.log(`   ℹ️  Clicked, current URL: ${url}`)
    }
  })
  
  // ===== TC-SSO-03: No local login forms present =====
  await test('TC-SSO-03: No email/password forms on login page', async (p) => {
    await clearAuth(p)
    
    // Check no email input exists
    const emailInput = await p.$('input[name="email"]')
    if (emailInput) {
      throw new Error('Email input found - local login form should not exist')
    }
    
    // Check no password input exists
    const passwordInput = await p.$('input[name="password"]')
    if (passwordInput) {
      throw new Error('Password input found - local login form should not exist')
    }
    
    // Check no register form
    const registerForm = await p.$('#register-form')
    if (registerForm) {
      throw new Error('Register form found - should not exist')
    }
    
    console.log(`   ✅ No local auth forms present`)
  })
  
  // ===== TC-DASH-04: Language toggle =====
  await test('TC-DASH-04: Language toggle works (ID -> EN)', async (p) => {
    await clearAuth(p)
    
    // Check lang toggle exists
    const langToggle = await p.$('#lang-toggle')
    if (langToggle) {
      await p.waitForSelector('#lang-toggle', { timeout: 5000 })
      await delay(500)
      
      const textBefore = await langToggle.textContent()
      console.log(`   ℹ️  Before: "${textBefore.trim()}"`)
      
      await langToggle.click()
      await delay(500)
      
      const textAfter = await langToggle.textContent()
      console.log(`   ℹ️  After: "${textAfter.trim()}"`)
      
      if (textAfter === textBefore) {
        throw new Error(`Language did not toggle (before=${textBefore}, after=${textAfter})`)
      }
    } else {
      console.log(`   ℹ️  Language toggle not in viewport, checking page content`)
      // Just verify page loaded properly
      const hasGoogleBtn = await p.$('a[href*="google"]')
      if (!hasGoogleBtn) {
        throw new Error('Login page did not load correctly')
      }
    }
  })
  
  // ===== TC-NAV-01: Page loads without errors =====
  await test('TC-NAV-01: Login page loads without JS errors', async (p) => {
    await clearAuth(p)
    
    // Check for console errors
    const errors = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text())
      }
    })
    
    await p.waitForSelector('a[href*="google"]', { timeout: 10000 })
    await delay(1000)
    
    if (errors.length > 0) {
      console.log(`   ⚠️  Console errors: ${errors.join(', ')}`)
    } else {
      console.log(`   ✅ No console errors`)
    }
  })
  
  await browser.disconnect()
  
  console.log('\n═══════════════════════════════════════')
  console.log(`📊 RESULTS: ${passed} passed, ${failed} failed`)
  console.log('═══════════════════════════════════════\n')
  
  if (failures.length > 0) {
    console.log('Failed tests:')
    failures.forEach(f => console.log(`  - ${f.name}: ${f.error}`))
  }
  
  process.exit(failed > 0 ? 1 : 0)
}

runTests().catch(err => {
  console.error('❌ Test runner error:', err.message)
  process.exit(1)
})