import { expect, test } from '@playwright/test'

/**
 * Visual regression tests for demo components
 * This approach tests individual .demo.vue files for clean, focused component screenshots
 * Perfect for UI library documentation and component showcase
 */

const demoComponents = [
  {
    name: 'oui-button',
    url: '/#./lib/basic/oui-button.demo.vue',
    description: 'Button component with various styles and states',
  },
  {
    name: 'oui-input',
    url: '/#./lib/basic/oui-input.demo.vue',
    description: 'Input components with different types and validation',
  },
  {
    name: 'oui-slider',
    url: '/#./lib/basic/oui-slider.demo.vue',
    description: 'Slider/range input component',
  },
  {
    name: 'oui-chart',
    url: '/#./lib/basic/oui-chart.demo.vue',
    description: 'Chart visualization component',
  },
  {
    name: 'oui-modal',
    url: '/#./lib/modal/oui-modal.demo.vue',
    description: 'Modal dialog component',
  },
  {
    name: 'oui-float',
    url: '/#./lib/float/oui-float.demo.vue',
    description: 'Floating element positioning',
  },
  {
    name: 'oui-menu',
    url: '/#./lib/float/oui-menu.demo.vue',
    description: 'Dropdown menu component',
  },
]

test.describe('Demo Component Visual Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Set a consistent viewport for all tests
    await page.setViewportSize({ width: 1200, height: 800 })
  })

  // Generate a test for each demo component
  for (const demo of demoComponents) {
    test(`${demo.name} desktop visual test`, async ({ page }) => {
      await page.goto(demo.url)
      await page.waitForLoadState('networkidle')

      // Clean up the UI for focused component screenshots
      await page.addStyleTag({
        content: `
          /* Hide demo UI elements for clean screenshots */
          .sidebar { display: none !important; }
          .properties { display: none !important; }
          .demo-controls { display: none !important; }
          
          /* Optimize main content area */
          main { 
            margin-left: 0 !important; 
            width: 100% !important; 
            padding: 20px !important;
            background: white;
          }
          
          /* Disable animations for consistent screenshots */
          *, *::before, *::after {
            animation-duration: 0s !important;
            animation-delay: 0s !important;
            transition-duration: 0s !important;
            transition-delay: 0s !important;
          }
        `,
      })

      // Wait for any dynamic content to settle
      await page.waitForTimeout(500)

      // Take screenshot of the main content
      await expect(page.locator('main')).toHaveScreenshot(`${demo.name}-desktop.png`, {
        animations: 'disabled',
        threshold: 0.2,
        maxDiffPixels: 1000,
      })
    })

    test(`${demo.name} mobile visual test`, async ({ page }) => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 })

      await page.goto(demo.url)
      await page.waitForLoadState('networkidle')

      await page.addStyleTag({
        content: `
          .sidebar { display: none !important; }
          .properties { display: none !important; }
          .demo-controls { display: none !important; }
          main { 
            margin-left: 0 !important; 
            width: 100% !important; 
            padding: 15px !important;
            background: white;
          }
          *, *::before, *::after {
            animation-duration: 0s !important;
            animation-delay: 0s !important;
            transition-duration: 0s !important;
            transition-delay: 0s !important;
          }
        `,
      })

      await page.waitForTimeout(500)

      await expect(page.locator('main')).toHaveScreenshot(`${demo.name}-mobile.png`, {
        animations: 'disabled',
        threshold: 0.2,
        maxDiffPixels: 1000,
      })
    })
  }
})

test.describe('Demo Component Interactions', () => {
  test('button component interactions', async ({ page }) => {
    await page.goto('/#./lib/basic/oui-button.demo.vue')
    await page.waitForLoadState('networkidle')

    // Test basic button presence
    const buttons = page.locator('button')
    await expect(buttons.first()).toBeVisible()

    // Test different button variants
    const primaryButton = buttons.filter({ hasText: 'Primary' }).first()
    if (await primaryButton.isVisible()) {
      await expect(primaryButton).toBeEnabled()
      await primaryButton.click()
    }

    // Test disabled state if there's a toggle
    const checkboxes = page.locator('input[type="checkbox"]')
    if (await checkboxes.count() > 0) {
      const disabledToggle = checkboxes.first()
      await disabledToggle.check()

      if (await primaryButton.isVisible()) {
        await expect(primaryButton).toBeDisabled()
      }
    }
  })

  test('input component interactions', async ({ page }) => {
    await page.goto('/#./lib/basic/oui-input.demo.vue')
    await page.waitForLoadState('networkidle')

    const inputs = page.locator('input[type="text"], input[type="email"], input[type="password"]')
    const inputCount = await inputs.count()

    if (inputCount > 0) {
      const firstInput = inputs.first()
      await firstInput.fill('Test input value')
      await expect(firstInput).toHaveValue('Test input value')

      // Clear input
      await firstInput.clear()
      await expect(firstInput).toHaveValue('')
    }
  })

  test('modal component interactions', async ({ page }) => {
    await page.goto('/#./lib/modal/oui-modal.demo.vue')
    await page.waitForLoadState('networkidle')

    // Look for buttons that might open modals
    const openButtons = page.locator('button').filter({ hasText: /open|show|modal/i })
    const buttonCount = await openButtons.count()

    if (buttonCount > 0) {
      const openButton = openButtons.first()
      await openButton.click()

      // Wait for modal to appear
      await page.waitForTimeout(1000)

      // Check for modal presence
      const modals = page.locator('.oui-modal, [role="dialog"], .modal')
      const modalCount = await modals.count()

      if (modalCount > 0) {
        await expect(modals.first()).toBeVisible()

        // Try to close modal
        const closeButtons = page.locator('button').filter({ hasText: /close|cancel|×|✕/i })
        const closeCount = await closeButtons.count()

        if (closeCount > 0) {
          await closeButtons.first().click()
          await page.waitForTimeout(500)
        }
      }
    }
  })
})
