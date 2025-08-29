import { expect, test } from '@playwright/test'
import { setPageAndWait } from '../../tests/e2e/helpers'

test.describe('OuiInput Browser Tests', () => {
  test('clearable input functionality with isolated component', async ({ page }) => {
    await setPageAndWait(page, 'oui-input.demo', false)

    // Toggle the clearable option on
    const clearableToggle = page.locator('label').filter({ hasText: /clearable/i }).locator('input[type="checkbox"]').first()
    
    if (await clearableToggle.count() > 0) {
      await clearableToggle.check()
      
      // Give it a moment for the UI to update
      await page.waitForTimeout(500)
    }

    // Find the main input that should now be clearable
    const input = page.locator('.oui-input-string').first()
    
    // Add some text to make sure we can test clearing
    await input.fill('Test value')
    await expect(input).toHaveValue('Test value')

    // The clear button should be visible since there's a value
    const clearButton = page.locator('.oui-input-clearable')
    await expect(clearButton).toBeVisible()

    // Click the clear button
    await clearButton.click()

    // Input should be cleared
    await expect(input).toHaveValue('')

    // Clear button should no longer be visible
    await expect(clearButton).not.toBeVisible()

    // Type some text
    await input.fill('New text')
    await expect(input).toHaveValue('New text')

    // Clear button should be visible again
    await expect(clearButton).toBeVisible()
  })

  // Note: Test for clearable disabled case is covered in the main interactions.e2e.spec.ts
  // This isolated test focuses on the positive clearable functionality test
})
