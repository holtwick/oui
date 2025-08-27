import { expect, test } from '@playwright/test'

/**
 * Visual regression tests for demo components
 * Tests individual .demo.vue files for clean, focused component screenshots
 */

const demoComponents = [
  {
    name: 'oui-button',
    url: '/#./lib/basic/oui-button.demo.vue',
  },
  {
    name: 'oui-input',
    url: '/#./lib/basic/oui-input.demo.vue',
  },
  {
    name: 'oui-modal',
    url: '/#./lib/modal/oui-modal.demo.vue',
  },
  {
    name: 'oui-float',
    url: '/#./lib/float/oui-float.demo.vue',
  },
  {
    name: 'oui-menu',
    url: '/#./lib/float/oui-menu.demo.vue',
  },
]

test.describe('Demo Components Visual Tests', () => {
  // Configure viewport and disable animations for consistent screenshots
  test.beforeEach(async ({ page }) => {
    // Set consistent viewport
    await page.setViewportSize({ width: 1200, height: 800 })
  })

  // Test each demo component individually
  for (const demo of demoComponents) {
    test(`${demo.name} component visual test`, async ({ page }) => {
      // Navigate directly to the demo component
      await page.goto(demo.url)

      // Wait for the page to be loaded
      await page.waitForLoadState('domcontentloaded')

      // Wait for any Vue components to mount
      await page.waitForTimeout(1000)

      // Hide the sidebar and controls for cleaner screenshots
      await page.evaluate(() => {
        // Hide sidebar if present
        const sidebar = document.querySelector('.sidebar')
        if (sidebar instanceof HTMLElement) {
          sidebar.style.display = 'none'
        }

        // Hide demo controls/properties panel if present
        const properties = document.querySelector('.properties')
        if (properties instanceof HTMLElement) {
          properties.style.display = 'none'
        }

        // Hide any demo UI controls if present
        const demoUI = document.querySelector('.demo-ui')
        if (demoUI instanceof HTMLElement) {
          demoUI.style.display = 'none'
        }

        // Make the main content area take full width
        const main = document.querySelector('main, .main')
        if (main instanceof HTMLElement) {
          main.style.marginLeft = '0'
          main.style.width = '100%'
          main.style.padding = '20px'
        }

        // Disable animations
        const style = document.createElement('style')
        style.textContent = `
          *, *::before, *::after {
            animation-delay: -1ms !important;
            animation-duration: 1ms !important;
            animation-iteration-count: 1 !important;
            background-attachment: initial !important;
            scroll-behavior: auto !important;
            transition-duration: 0s !important;
            transition-delay: 0s !important;
          }
        `
        document.head.appendChild(style)
      })

      // Wait for layout changes to settle
      await page.waitForTimeout(500)

      // Take screenshot of the main content area
      const mainContent = page.locator('main, .main').first()

      await expect(mainContent).toHaveScreenshot(`${demo.name}-desktop.png`, {
        animations: 'disabled',
        threshold: 0.3,
        maxDiffPixels: 1000,
      })
    })

    // Also test mobile viewport for responsive components
    test(`${demo.name} component mobile visual test`, async ({ page }) => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 })

      await page.goto(demo.url)
      await page.waitForLoadState('domcontentloaded')
      await page.waitForTimeout(1000)

      // Hide UI elements and disable animations
      await page.evaluate(() => {
        const sidebar = document.querySelector('.sidebar')
        if (sidebar instanceof HTMLElement) {
          sidebar.style.display = 'none'
        }

        const properties = document.querySelector('.properties')
        if (properties instanceof HTMLElement) {
          properties.style.display = 'none'
        }

        const main = document.querySelector('main, .main')
        if (main instanceof HTMLElement) {
          main.style.marginLeft = '0'
          main.style.width = '100%'
          main.style.padding = '20px'
        }

        const style = document.createElement('style')
        style.textContent = `
          *, *::before, *::after {
            animation-delay: -1ms !important;
            animation-duration: 1ms !important;
            animation-iteration-count: 1 !important;
            background-attachment: initial !important;
            scroll-behavior: auto !important;
            transition-duration: 0s !important;
            transition-delay: 0s !important;
          }
        `
        document.head.appendChild(style)
      })

      await page.waitForTimeout(500)

      const mainContent = page.locator('main, .main').first()
      await expect(mainContent).toHaveScreenshot(`${demo.name}-mobile.png`, {
        animations: 'disabled',
        threshold: 0.3,
        maxDiffPixels: 1000,
      })
    })
  }
})

test.describe('Demo Components Functionality', () => {
  // Test basic functionality of key components
  test('button demo interactions', async ({ page }) => {
    await page.goto('/#./lib/basic/oui-button.demo.vue')
    await page.waitForLoadState('domcontentloaded')
    await page.waitForTimeout(1000)

    // Test button visibility
    const buttons = page.locator('button')
    await expect(buttons.first()).toBeVisible()

    // Test different button variants if visible
    const primaryButton = page.locator('button').filter({ hasText: 'Primary' }).first()
    if (await primaryButton.isVisible()) {
      await expect(primaryButton).toBeEnabled()
    }

    // Test disabled state toggle if there's a checkbox
    const checkboxes = page.locator('input[type="checkbox"]')
    const count = await checkboxes.count()
    if (count > 0) {
      const disabledCheckbox = checkboxes.first()
      await disabledCheckbox.check()

      // Check if button becomes disabled
      if (await primaryButton.isVisible()) {
        await expect(primaryButton).toBeDisabled()
      }

      // Re-enable
      await disabledCheckbox.uncheck()
      if (await primaryButton.isVisible()) {
        await expect(primaryButton).toBeEnabled()
      }
    }
  })

  test('input demo interactions', async ({ page }) => {
    await page.goto('/#./lib/basic/oui-input.demo.vue')
    await page.waitForLoadState('domcontentloaded')
    await page.waitForTimeout(1000)

    // Test input functionality
    const textInputs = page.locator('input[type="text"]')
    const count = await textInputs.count()
    if (count > 0) {
      const textInput = textInputs.first()
      await textInput.fill('Test input value')
      await expect(textInput).toHaveValue('Test input value')
    }
  })

  test('modal demo interactions', async ({ page }) => {
    await page.goto('/#./lib/modal/oui-modal.demo.vue')
    await page.waitForLoadState('domcontentloaded')
    await page.waitForTimeout(1000)

    // Look for open/show buttons
    const openButtons = page.locator('button').filter({ hasText: /open|show/i })
    const count = await openButtons.count()
    if (count > 0) {
      const openButton = openButtons.first()
      await openButton.click()

      // Wait for modal to appear
      await page.waitForTimeout(500)

      // Check if modal appears (look for common modal selectors)
      const modalSelectors = ['.oui-modal', '[role="dialog"]', '.modal', '.dialog']
      let modalFound = false

      for (const selector of modalSelectors) {
        const modals = page.locator(selector)
        const modalCount = await modals.count()
        if (modalCount > 0) {
          await expect(modals.first()).toBeVisible()
          modalFound = true

          // Try to close modal
          const closeButtons = page.locator('button').filter({ hasText: /close|cancel|×/i })
          const closeCount = await closeButtons.count()
          if (closeCount > 0) {
            await closeButtons.first().click()
            await page.waitForTimeout(500)
          }
          break
        }
      }
    }
  })
})
