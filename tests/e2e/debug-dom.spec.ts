import { expect, test } from '@playwright/test'

test('debug dom structure', async ({ page }) => {
  await page.goto('/#./lib/basic/oui-button.demo.vue')
  await page.waitForLoadState('networkidle')

  // Debug the DOM structure
  const html = await page.content()
  console.log('Page HTML structure:')
  console.log(html)

  // Check what main element looks like
  const mainElements = await page.locator('main, .main, #app').all()
  console.log('Found main elements:', mainElements.length)

  for (let i = 0; i < mainElements.length; i++) {
    const element = mainElements[i]
    const text = await element.textContent()
    console.log(`Main element ${i}:`, text?.slice(0, 100))
  }
})
