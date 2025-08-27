import { expect, test } from '@playwright/test'
import { setPageAndWait } from './helpers'

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
        await page.setViewportSize({ width: 1200, height: 800 })
        await setPageAndWait(page, demoName, dark)

        // Wait for the Vue app to fully initialize and load the demo
        // await page.waitForLoadState('networkidle')

        // Wait for the oui-demo structure to be present (more reliable than generic selectors)
        // await page.waitForSelector('.oui-demo', { timeout: 45000 })
        // await page.waitForTimeout(1000) // Additional time for content to stabilize

        // Look for the demo main content area first, then fallback
        const demoMain = page.locator('.oui-demo')
        const app = page.locator('#app')

        const demoMainVisible = await demoMain.isVisible()

        const pngFileName = `${demoName}-${dark ? 'dark' : 'light'}.png`
        if (demoMainVisible) {
          // Take screenshot of the demo main content area
          await expect(demoMain).toHaveScreenshot(pngFileName, {
            animations: 'disabled',
            fullPage: true,
          })
        }
        else {
          // Fallback to full app screenshot
          await expect(app).toHaveScreenshot(pngFileName, {
            animations: 'disabled',
            fullPage: true,
          })
        }
      })
    }
  }
})
