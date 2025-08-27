import { expect, test } from '@playwright/test'

test.describe('OUI Modal Components', () => {
  test('modal dialog functionality', async ({ page }) => {
    await page.goto('/')

    // Navigate to modal demo
    await page.click('text=Modal')

    // Test modal visibility toggle
    await page.check('[title="show"]')
    await expect(page.locator('.oui-modal')).toBeVisible()

    // Test modal content
    await expect(page.locator('text=Lorem ipsum dolor sit amet')).toBeVisible()

    // Test modal close
    await page.uncheck('[title="show"]')
    await expect(page.locator('.oui-modal')).not.toBeVisible()
  })

  test('dialog functionality', async ({ page }) => {
    await page.goto('/')

    // Navigate to dialog demo
    await page.click('text=Dialog')

    // Test modern alert
    await page.click('text=Alert')
    await expect(page.locator('.oui-modal')).toBeVisible()
    await expect(page.locator('text=Hello World')).toBeVisible()

    // Close the alert
    await page.click('button:has-text("OK")')
    await expect(page.locator('.oui-modal')).not.toBeVisible()

    // Test confirm dialog
    await page.click('text=Confirm')
    await expect(page.locator('.oui-modal')).toBeVisible()
    await expect(page.locator('button:has-text("Cancel")')).toBeVisible()
    await expect(page.locator('button:has-text("OK")')).toBeVisible()

    // Test cancel
    await page.click('button:has-text("Cancel")')
    await expect(page.locator('.oui-modal')).not.toBeVisible()

    // Test OK
    await page.click('text=Confirm')
    await page.click('button:has-text("OK")')
    await expect(page.locator('.oui-modal')).not.toBeVisible()
  })

  test('prompt dialog functionality', async ({ page }) => {
    await page.goto('/')

    // Navigate to dialog demo
    await page.click('text=Dialog')

    // Test prompt dialog
    await page.click('text=Prompt')
    await expect(page.locator('.oui-modal')).toBeVisible()

    // Test input field in prompt
    const promptInput = page.locator('input[type="text"]')
    await expect(promptInput).toBeVisible()
    await promptInput.fill('Test prompt response')

    // Submit prompt
    await page.click('button:has-text("OK")')
    await expect(page.locator('.oui-modal')).not.toBeVisible()
  })
})
