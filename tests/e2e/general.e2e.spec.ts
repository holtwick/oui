import { expect, test } from '@playwright/test'
import { setPageAndWait } from './helpers'
import { preparePageForScreenshot, screenshotOptions, waitForAnimations } from './screenshot-helpers'

const demoComponents = [
  'oui-button',
  'oui-input',
  'oui-object',
  'oui-form-item',
  'oui-notice',
  'oui-slider',
  'css-form',
]

test.describe('Demo Component Visual Tests', () => {
  for (const dark of [false, true]) {
    for (const demoName of demoComponents) {
      test(`${demoName} dark=${dark} visual regression test`, async ({ page }) => {
        // Set consistent viewport (this will override the global setting for specific needs)
        await page.setViewportSize({ width: 1200, height: 800 })

        await setPageAndWait(page, demoName, dark)

        // Prepare page for consistent screenshots
        await preparePageForScreenshot(page)

        // Wait for animations to complete
        await waitForAnimations(page)

        // Look for the demo main content area first, then fallback
        const demoMain = page.locator('.oui-demo')
        const app = page.locator('#app')

        const demoMainVisible = await demoMain.isVisible()

        const pngFileName = `${demoName}-${dark ? 'dark' : 'light'}.png`
        if (demoMainVisible) {
          // Take screenshot of the demo main content area
          await expect(demoMain).toHaveScreenshot(pngFileName, {
            ...screenshotOptions,
            fullPage: false, // Don't use fullPage for locator screenshots
          } as any)
        }
        else {
          // Fallback to full app screenshot
          await expect(app).toHaveScreenshot(pngFileName, {
            ...screenshotOptions,
            fullPage: false, // Keep consistent with locator approach
          } as any)
        }
      })
    }
  }
})
