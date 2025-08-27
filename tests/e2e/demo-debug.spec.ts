import type { LoggerInterface } from 'zeed'
import { test } from '@playwright/test'
import { Logger } from 'zeed'

const log: LoggerInterface = Logger('demo-debug.spec')

/**
 * Debug test to understand demo component DOM structure
 */

test('debug button demo DOM structure', async ({ page }) => {
  await page.goto('/#./lib/basic/oui-button.demo.vue')
  log('=== Navigated to URL')

  // Wait longer for JavaScript to initialize
  await page.waitForLoadState('networkidle')
  log('=== Network idle reached')

  // Wait for Vue app to actually mount - look for specific Vue elements
  await page.waitForSelector('#app > *', { timeout: 30000 })
  log('=== App has content')

  // Additional wait for demo content
  await page.waitForTimeout(3000)
  log('=== Additional timeout complete')

  // Check again what elements exist
  const appDiv = await page.locator('#app').isVisible()
  log('=== #app visible:', appDiv)

  const appHasChildren = await page.locator('#app > *').count()
  log('=== #app children count:', appHasChildren)

  const mainElement = await page.locator('main').isVisible()
  log('=== main visible:', mainElement)

  const buttons = await page.locator('button').count()
  log('=== button count:', buttons)

  const inputs = await page.locator('input').count()
  log('=== input count:', inputs)

  // Check for Vue-specific elements
  const vueElements = await page.locator('[data-v-], .oui-').count()
  log('=== Vue elements count:', vueElements)

  // Get page title to verify it loaded
  const title = await page.title()
  log('=== Page title:', title)

  // Check if JS errors occurred
  const consoleMessages: string[] = []
  page.on('console', msg => consoleMessages.push(msg.text()))
  page.on('pageerror', error => log('=== PAGE ERROR:', error.message))

  // Trigger any pending JS by scrolling
  await page.evaluate(() => window.scrollTo(0, 100))
  await page.waitForTimeout(1000)

  // Take a screenshot for visual debugging
  await page.screenshot({ path: 'debug-demo-after-wait.png', fullPage: true })

  // Get HTML again after waiting
  const finalHtml = await page.locator('#app').innerHTML()
  log('=== Final #app HTML preview:', finalHtml.substring(0, 500))

  // Check if any JavaScript is actually running
  const windowVue = await page.evaluate(() => (window as any).Vue !== undefined)
  log('=== Vue available on window:', windowVue)

  log('=== Console messages count:', consoleMessages.length)
  if (consoleMessages.length > 0) {
    log('=== First few console messages:', consoleMessages.slice(0, 3))
  }
})
