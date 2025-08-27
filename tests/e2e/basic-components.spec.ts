import { expect, test } from '@playwright/test'

test.describe('OUI Basic Components', () => {
  test('button component interactions', async ({ page }) => {
    await page.goto('/')

    // Navigate to button demo
    await page.click('text=Button')

    // Test basic button functionality
    await expect(page.locator('text=Slot Bold')).toBeVisible()

    // Test different button modes
    await expect(page.locator('text=Danger')).toBeVisible()
    await expect(page.locator('text=Neutral')).toBeVisible()
    await expect(page.locator('text=Primary')).toBeVisible()

    // Test different button sizes
    await expect(page.locator('text=Small').first()).toBeVisible()
    await expect(page.locator('text=Normal').first()).toBeVisible()
    await expect(page.locator('text=Large').first()).toBeVisible()

    // Test disabled state toggle
    await page.check('[title="Disabled"]')
    await expect(page.locator('button:has-text("Primary")').first()).toBeDisabled()

    // Re-enable for further testing
    await page.uncheck('[title="Disabled"]')
    await expect(page.locator('button:has-text("Primary")').first()).toBeEnabled()
  })

  test('input component functionality', async ({ page }) => {
    await page.goto('/')

    // Navigate to input demo
    await page.click('text=Input')

    // Test basic input functionality
    const input = page.locator('input[type="text"]').first()
    await expect(input).toBeVisible()

    // Test input value change
    await input.fill('Test input value')
    await expect(input).toHaveValue('Test input value')

    // Test different input types
    await page.selectOption('select', 'email')
    await expect(page.locator('input[type="email"]')).toBeVisible()

    await page.selectOption('select', 'password')
    await expect(page.locator('input[type="password"]')).toBeVisible()
  })

  test('checkbox component interactions', async ({ page }) => {
    await page.goto('/')

    // Navigate to checkbox demo
    await page.click('text=Checkbox')

    // Test basic checkbox
    const checkbox = page.locator('input[type="checkbox"]').first()
    await expect(checkbox).toBeVisible()

    // Test checkbox toggle
    await checkbox.check()
    await expect(checkbox).toBeChecked()

    await checkbox.uncheck()
    await expect(checkbox).not.toBeChecked()

    // Test switch variant
    await expect(page.locator('text=Switch with label')).toBeVisible()

    // Test disabled state
    await page.check('[title="Disabled"]')
    await expect(checkbox).toBeDisabled()
  })
})
