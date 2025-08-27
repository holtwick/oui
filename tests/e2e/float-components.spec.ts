import { expect, test } from '@playwright/test'

test.describe('OUI Float Components', () => {
  test('tooltip functionality', async ({ page }) => {
    await page.goto('/')

    // Navigate to tooltip demo
    await page.click('text=Tooltip')

    // Test tooltip on text
    const tooltipText = page.locator('text=Vue.js')
    await tooltipText.hover()

    // Wait for tooltip to appear
    await expect(page.locator('.oui-tooltip')).toBeVisible()
    await expect(page.locator('text=A longer tooltip')).toBeVisible()

    // Test tooltip on button
    const tooltipButton = page.locator('text=Tooltip').nth(1) // Second instance (button)
    await tooltipButton.hover()
    await expect(page.locator('text=Hello, I am a tooltip')).toBeVisible()

    // Move away to hide tooltip
    await page.mouse.move(0, 0)
    await expect(page.locator('.oui-tooltip')).not.toBeVisible()
  })

  test('float menu functionality', async ({ page }) => {
    await page.goto('/')

    // Navigate to float demo
    await page.click('text=Float')

    // Test dropdown menu
    await page.click('text=APPS')
    await expect(page.locator('text=App1')).toBeVisible()
    await expect(page.locator('text=App2')).toBeVisible()

    // Click outside to close
    await page.click('body')
    await expect(page.locator('text=App1')).not.toBeVisible()
  })
})
