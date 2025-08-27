import { expect, test } from '@playwright/test'

test.describe('Visual Regression Tests', () => {
  test('homepage screenshot', async ({ page }) => {
    await page.goto('/')

    // Wait for the page to be fully loaded
    await page.waitForLoadState('networkidle')

    // Take a full page screenshot
    await expect(page).toHaveScreenshot('homepage.png', {
      fullPage: true,
      animations: 'disabled',
    })
  })

  test('button component variations', async ({ page }) => {
    await page.goto('/')
    await page.click('text=Button')

    // Wait for component to load
    await page.waitForLoadState('networkidle')

    // Take screenshot of button variants
    const buttonSection = page.locator('.oui-button').first().locator('..')
    await expect(buttonSection).toHaveScreenshot('button-variants.png', {
      animations: 'disabled',
    })
  })

  test('form components layout', async ({ page }) => {
    await page.goto('/')
    await page.click('text=Form Item')

    // Wait for component to load
    await page.waitForLoadState('networkidle')

    // Take screenshot of form layout
    await expect(page.locator('main')).toHaveScreenshot('form-components.png', {
      animations: 'disabled',
    })
  })

  test('mobile responsiveness', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }) // iPhone SE size
    await page.goto('/')

    // Wait for the page to be fully loaded
    await page.waitForLoadState('networkidle')

    // Take mobile screenshot
    await expect(page).toHaveScreenshot('homepage-mobile.png', {
      fullPage: true,
      animations: 'disabled',
    })
  })
})
