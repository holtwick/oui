import { expect, test } from '@playwright/test'

/**
 * Simple demo component visual tests
 * Testing individual .demo.vue files for focused component screenshots
 */

test.describe('Demo Component Visual Tests', () => {
  test('button demo component screenshot', async ({ page }) => {
    // Navigate to the button demo directly
    await page.goto('/#./lib/basic/oui-button.demo.vue')

    // Wait for page to load
    await page.waitForLoadState('networkidle')

    // Hide sidebar and controls for clean screenshot
    await page.addStyleTag({
      content: `
        .sidebar { display: none !important; }
        .properties { display: none !important; }
        main { margin-left: 0 !important; width: 100% !important; padding: 20px !important; }
        /* Disable animations for consistent screenshots */
        *, *::before, *::after {
          animation-duration: 0s !important;
          transition-duration: 0s !important;
        }
      `,
    })

    // Take screenshot of the main content area
    await expect(page.locator('main').first()).toHaveScreenshot('button-demo.png', {
      fullPage: false,
      animations: 'disabled',
    })
  })

  test('input demo component functionality', async ({ page }) => {
    await page.goto('/#./lib/basic/oui-input.demo.vue')
    await page.waitForLoadState('networkidle')

    // Test that input components are rendered
    const inputs = page.locator('input')
    const inputCount = await inputs.count()

    if (inputCount > 0) {
      const firstInput = inputs.first()
      await firstInput.fill('Test value')
      await expect(firstInput).toHaveValue('Test value')
    }

    // Take a screenshot for visual verification
    await page.addStyleTag({
      content: `
        .sidebar { display: none !important; }
        .properties { display: none !important; }
        main { margin-left: 0 !important; width: 100% !important; padding: 20px !important; }
        *, *::before, *::after {
          animation-duration: 0s !important;
          transition-duration: 0s !important;
        }
      `,
    })

    await expect(page.locator('main').first()).toHaveScreenshot('input-demo.png', {
      fullPage: false,
      animations: 'disabled',
    })
  })

  test('modal demo component functionality', async ({ page }) => {
    await page.goto('/#./lib/modal/oui-modal.demo.vue')
    await page.waitForLoadState('networkidle')

    // Look for buttons that might open modals
    const buttons = page.locator('button')
    const buttonCount = await buttons.count()

    if (buttonCount > 0) {
      // Try clicking the first button (might be an open modal button)
      await buttons.first().click()
      await page.waitForTimeout(500) // Wait for modal animation
    }

    // Take screenshot
    await page.addStyleTag({
      content: `
        .sidebar { display: none !important; }
        .properties { display: none !important; }
        main { margin-left: 0 !important; width: 100% !important; padding: 20px !important; }
        *, *::before, *::after {
          animation-duration: 0s !important;
          transition-duration: 0s !important;
        }
      `,
    })

    await expect(page.locator('main').first()).toHaveScreenshot('modal-demo.png', {
      fullPage: false,
      animations: 'disabled',
    })
  })
})
