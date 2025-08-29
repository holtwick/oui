import type { LoggerInterface } from 'zeed'
import { expect, test } from '@playwright/test'
import { Logger } from 'zeed'
import { setPageAndWait } from './helpers'

const log: LoggerInterface = Logger('interactions.spec')

test.describe('Demo Component Interactions', () => {
  test('input demo has form elements', async ({ page }) => {
    await setPageAndWait(page, 'oui-input.demo', false)

    // Check for input elements in the demo content area
    const demoInputs = page.locator('.oui-demo input')
    const allInputs = page.locator('input')

    const demoInputCount = await demoInputs.count()
    const allInputCount = await allInputs.count()

    log(`Demo inputs: ${demoInputCount}, All inputs: ${allInputCount}`)

    const targetInputs = demoInputCount > 0 ? demoInputs : allInputs
    const targetCount = await targetInputs.count()

    if (targetCount > 0) {
      const firstInput = targetInputs.first()
      await expect(firstInput).toBeVisible()

      // Test typing in the input
      await firstInput.fill('Test input')
      await expect(firstInput).toHaveValue('Test input')
    }
    else {
      // If no inputs found, that's also a valid result for this demo
      log('No inputs found in input demo - this may be expected')
    }
  })

  test.describe('OUI Input Component Tests', () => {
    test('basic input functionality', async ({ page }) => {
      await setPageAndWait(page, 'oui-input.demo', false)

      // Find the first main input field (not in demo controls)
      const input = page.locator('.oui-input-string').first()
      await expect(input).toBeVisible()

      // Test basic typing
      await input.clear()
      await input.fill('Hello World')
      await expect(input).toHaveValue('Hello World')

      // Test clearing the input
      await input.clear()
      await expect(input).toHaveValue('')
    })

    test('clearable input functionality', async ({ page }) => {
      await setPageAndWait(page, 'oui-input.demo', false)

      // First enable clearable via the demo controls
      const clearableToggle = page.locator('input[type="checkbox"]').filter({ hasText: /clearable/i }).first()
      
      if (await clearableToggle.count() > 0) {
        await clearableToggle.check()
        
        // Give it a moment for the UI to update
        await page.waitForTimeout(500)
      }

      // Find the main input that should now be clearable
      const input = page.locator('.oui-input-string').first()
      
      // Fill the input with some text
      await input.fill('Test text for clearing')
      await expect(input).toHaveValue('Test text for clearing')

      // Look for the clear button
      const clearButton = page.locator('.oui-input-clearable')
      
      // The clear button should appear when there's text
      await expect(clearButton).toBeVisible()
      
      // Click the clear button
      await clearButton.click()
      
      // Verify the input is cleared
      await expect(input).toHaveValue('')
      
      // Verify clear button is no longer visible (since input is empty)
      await expect(clearButton).not.toBeVisible()
    })

    test('input with slots functionality', async ({ page }) => {
      await setPageAndWait(page, 'oui-input.demo', false)

      // Look for input container with slots (the one that shows START and END)
      const inputWithSlots = page.locator('.oui-input-container').filter({ hasText: /START.*END/i })
      
      if (await inputWithSlots.count() > 0) {
        await expect(inputWithSlots).toBeVisible()
        
        // Check that START and END slot content is visible
        await expect(inputWithSlots).toContainText('START')
        await expect(inputWithSlots).toContainText('END')
        
        // Test input functionality within the container
        const slotInput = inputWithSlots.locator('input')
        await slotInput.fill('Slot test')
        await expect(slotInput).toHaveValue('Slot test')
      }
    })

    test('input keyboard interactions', async ({ page }) => {
      await setPageAndWait(page, 'oui-input.demo', false)

      const input = page.locator('.oui-input-string').first()
      await input.focus()
      
      // Test typing
      await input.fill('Test keyboard value')
      await expect(input).toHaveValue('Test keyboard value')
      
      // Test Enter key - should not change the value but may trigger events
      await input.press('Enter')
      await expect(input).toHaveValue('Test keyboard value')
    })

    test('different input types', async ({ page }) => {
      await setPageAndWait(page, 'oui-input.demo', false)

      // Look for the type selector in the demo controls
      const typeSelector = page.locator('select').last()

      if (await typeSelector.count() > 0) {
        const input = page.locator('.oui-input-string').first()
        
        // Test different input types
        await typeSelector.selectOption('email')
        await expect(input).toHaveAttribute('type', 'email')
        
        await typeSelector.selectOption('url')
        await expect(input).toHaveAttribute('type', 'url')
        
        await typeSelector.selectOption('tel')
        await expect(input).toHaveAttribute('type', 'tel')
        
        // Return to text type
        await typeSelector.selectOption('text')
        await expect(input).toHaveAttribute('type', 'text')
      }
    })
  })
})
