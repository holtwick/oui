import { basename } from 'node:path'
import { expect, test } from '@playwright/test'
import { glob } from 'glob'

/**
 * Visual regression tests for individual demo components
 * This approach tests each .demo.vue file in isolation for better stability and focus
 */

// Get all demo files dynamically
const demoFiles = await glob('**/*.demo.vue', {
  cwd: '/Users/dirk/work/github-oui',
  ignore: ['**/node_modules/**', '**/_archive/**'],
})

const demoComponents = demoFiles.map((file) => {
  const relativePath = `./${file}`
  const componentName = basename(file, '.demo.vue')
  return {
    path: relativePath,
    name: componentName,
    url: `/#${relativePath}`,
  }
})

test.describe('Demo Components Visual Tests', () => {
  // Configure viewport and other settings for consistent screenshots
  test.beforeEach(async ({ page }) => {
    // Set consistent viewport
    await page.setViewportSize({ width: 1200, height: 800 })

    // Disable animations for consistent screenshots
    await page.addStyleTag({
      content: `
        *, *::before, *::after {
          animation-delay: -1ms !important;
          animation-duration: 1ms !important;
          animation-iteration-count: 1 !important;
          background-attachment: initial !important;
          scroll-behavior: auto !important;
          transition-duration: 0s !important;
          transition-delay: 0s !important;
        }
      `,
    })
  })

  // Test each demo component individually
  for (const demo of demoComponents) {
    test(`${demo.name} component visual test`, async ({ page }) => {
      // Navigate directly to the demo component
      await page.goto(demo.url)

      // Wait for the component to be fully loaded
      await page.waitForLoadState('networkidle')

      // Hide the sidebar and controls for cleaner screenshots
      await page.evaluate(() => {
        // Hide sidebar
        const sidebar = document.querySelector('.sidebar')
        if (sidebar)
          sidebar.style.display = 'none'

        // Hide demo controls/properties panel
        const properties = document.querySelector('.properties')
        if (properties)
          properties.style.display = 'none'

        // Hide any demo UI controls
        const demoUI = document.querySelector('.demo-ui')
        if (demoUI)
          demoUI.style.display = 'none'

        // Make the main content area take full width
        const main = document.querySelector('.main')
        if (main) {
          main.style.marginLeft = '0'
          main.style.width = '100%'
        }
      })

      // Wait a bit for any layout changes to settle
      await page.waitForTimeout(100)

      // Take screenshot of just the demo content
      const demoContent = page.locator('.demo, .component, main').first()

      await expect(demoContent).toHaveScreenshot(`${demo.name}.png`, {
        animations: 'disabled',
        threshold: 0.2, // Allow for small differences
        maxDiffPixels: 500,
      })
    })

    // Also test mobile viewport for responsive components
    test(`${demo.name} component mobile visual test`, async ({ page }) => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 })

      await page.goto(demo.url)
      await page.waitForLoadState('networkidle')

      // Hide UI elements like in desktop test
      await page.evaluate(() => {
        const sidebar = document.querySelector('.sidebar')
        if (sidebar)
          sidebar.style.display = 'none'
        const properties = document.querySelector('.properties')
        if (properties)
          properties.style.display = 'none'
        const demoUI = document.querySelector('.demo-ui')
        if (demoUI)
          demoUI.style.display = 'none'
        const main = document.querySelector('.main')
        if (main) {
          main.style.marginLeft = '0'
          main.style.width = '100%'
        }
      })

      await page.waitForTimeout(100)

      const demoContent = page.locator('.demo, .component, main').first()
      await expect(demoContent).toHaveScreenshot(`${demo.name}-mobile.png`, {
        animations: 'disabled',
        threshold: 0.2,
        maxDiffPixels: 500,
      })
    })
  }
})

test.describe('Demo Components Functionality', () => {
  // Test basic functionality of key components
  test('button demo interactions', async ({ page }) => {
    await page.goto('/#./lib/basic/oui-button.demo.vue')
    await page.waitForLoadState('networkidle')

    // Test button clicks
    const primaryButton = page.locator('button:has-text("Primary")').first()
    await expect(primaryButton).toBeVisible()
    await expect(primaryButton).toBeEnabled()

    // Test disabled state if there's a checkbox to toggle it
    const disabledCheckbox = page.locator('input[type="checkbox"]').first()
    if (await disabledCheckbox.isVisible()) {
      await disabledCheckbox.check()
      await expect(primaryButton).toBeDisabled()
    }
  })

  test('input demo interactions', async ({ page }) => {
    await page.goto('/#./lib/basic/oui-input.demo.vue')
    await page.waitForLoadState('networkidle')

    // Test input functionality
    const textInput = page.locator('input[type="text"]').first()
    if (await textInput.isVisible()) {
      await textInput.fill('Test input value')
      await expect(textInput).toHaveValue('Test input value')
    }
  })

  test('modal demo interactions', async ({ page }) => {
    await page.goto('/#./lib/modal/oui-modal.demo.vue')
    await page.waitForLoadState('networkidle')

    // Test modal opening
    const openButton = page.locator('button:has-text("Open")').first()
    if (await openButton.isVisible()) {
      await openButton.click()

      // Check if modal appears
      const modal = page.locator('.oui-modal, [role="dialog"]').first()
      await expect(modal).toBeVisible()

      // Test closing modal
      const closeButton = page.locator('button:has-text("Close"), .close').first()
      if (await closeButton.isVisible()) {
        await closeButton.click()
        await expect(modal).not.toBeVisible()
      }
    }
  })
})
