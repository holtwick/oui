import { expect, test } from '@playwright/test'

test.describe('Basic Demo Test', () => {
  test('homepage loads', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Oui/)
  })

  test('navigate to button demo', async ({ page }) => {
    await page.goto('/#./lib/basic/oui-button.demo.vue')

    // Wait for the page to load
    await page.waitForLoadState('domcontentloaded')

    // Check that we have button elements
    const buttons = page.locator('button')
    await expect(buttons.first()).toBeVisible()
  })
})
