import type { Locator, Page } from '@playwright/test'

/**
 * Standard screenshot options for consistent visual testing
 * These options ensure screenshots are taken consistently across different environments
 */
export const SCREENSHOT_OPTIONS = {
  // Disable animations for consistent screenshots
  animations: 'disabled' as const,

  // Wait for fonts to load
  fullPage: false,

  // Clip to avoid scrollbars and browser chrome
  clip: undefined,

  // Force consistent scale
  scale: 'device' as const,
} as const

/**
 * Take a screenshot of a specific component or element
 */
export async function takeComponentScreenshot(
  locator: Locator,
  name: string,
  options: Parameters<Locator['screenshot']>[0] = {},
) {
  return locator.screenshot({
    ...SCREENSHOT_OPTIONS,
    ...options,
  })
}

/**
 * Take a full page screenshot with consistent settings
 */
export async function takePageScreenshot(
  page: Page,
  name: string,
  options: Parameters<Page['screenshot']>[0] = {},
) {
  // Wait for page to be fully loaded
  await page.waitForLoadState('networkidle')

  // Hide scrollbars for consistent screenshots
  await page.addStyleTag({
    content: `
      * {
        scrollbar-width: none !important;
        -ms-overflow-style: none !important;
      }
      *::-webkit-scrollbar {
        display: none !important;
      }
    `,
  })

  return page.screenshot({
    ...SCREENSHOT_OPTIONS,
    fullPage: true,
    ...options,
  })
}

/**
 * Prepare page for consistent screenshot taking
 * This function should be called before taking any screenshots
 */
export async function preparePageForScreenshot(page: Page) {
  // Wait for all network requests to complete
  await page.waitForLoadState('networkidle')

  // Wait for fonts to load
  await page.waitForTimeout(500)

  // Disable animations globally
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation-duration: 0s !important;
        animation-delay: 0s !important;
        transition-duration: 0s !important;
        transition-delay: 0s !important;
      }
    `,
  })

  // Hide scrollbars
  await page.addStyleTag({
    content: `
      * {
        scrollbar-width: none !important;
        -ms-overflow-style: none !important;
      }
      *::-webkit-scrollbar {
        display: none !important;
      }
    `,
  })

  // Wait a bit more for any remaining layout shifts
  await page.waitForTimeout(300)
}

/**
 * Standard expect screenshot options for visual regression testing
 */
export const EXPECT_SCREENSHOT_OPTIONS = {
  // Allow small differences due to font rendering
  threshold: 0.2,

  // Use pixel-based comparison for more accurate results
  mode: 'pixel' as const,

  // Disable animations
  animations: 'disabled' as const,

  // Clip to avoid edge inconsistencies
  clip: undefined,

  // Force consistent scale
  scale: 'device' as const,
} as const

/**
 * Enhanced toHaveScreenshot with consistent options
 */
export async function expectScreenshot(
  locatorOrPage: Locator | Page,
  name: string,
  options: any = {},
) {
  if ('screenshot' in locatorOrPage) {
    // It's a page
    await preparePageForScreenshot(locatorOrPage as Page)
  }

  return (locatorOrPage as any).toHaveScreenshot(name, {
    ...EXPECT_SCREENSHOT_OPTIONS,
    ...options,
  })
}
