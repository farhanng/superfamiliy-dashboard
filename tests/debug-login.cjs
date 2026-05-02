// tests/debug-login.cjs - Debug login page structure
const puppeteer = require('puppeteer')

const BASE_URL = 'https://family.farhan.biz.id'
const CDP_PORT = 18800

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

async function run() {
  console.log('🔍 Debugging SuperFamily Login Page...\n')
  
  const browser = await puppeteer.connect({
    browserURL: `http://127.0.0.1:${CDP_PORT}`
  })
  
  const page = await browser.newPage()
  await page.setViewport({ width: 390, height: 844 })
  
  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 30000 })
  await delay(3000)
  
  console.log('📍 Current URL:', page.url())
  console.log('📍 Current hash:', await page.evaluate(() => window.location.hash))
  
  // Get page content structure
  const bodyHTML = await page.$eval('body', el => el.innerHTML.substring(0, 2000))
  console.log('\n📄 Body HTML (first 2000 chars):\n', bodyHTML)
  
  // Check for any input fields
  const inputs = await page.$$eval('input', els => els.map(e => ({ name: e.name, type: e.type, value: e.value })))
  console.log('\n🔵 Input fields found:', inputs)
  
  // Check for any links
  const links = await page.$$eval('a', els => els.map(e => ({ text: e.textContent?.trim()?.substring(0, 30), href: e.href })))
  console.log('\n🔗 Links found:', links.slice(0, 10))
  
  await browser.disconnect()
}

run().catch(console.error)