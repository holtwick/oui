import type { Page } from '@playwright/test'

/**
 * Helper utilities for OUI component testing
 */

/**
 * Navigate to a specific demo component
 * @param page - Playwright page instance
 * @param componentName - Name of the component (e.g., 'Button', 'Input', 'Modal')
 */
export async function navigateToDemo(page: Page, componentName: string) {
  await page.goto('/')
  await page.click(`text=${componentName}`)
  await page.waitForLoadState('networkidle')
}

/**
 * Wait for OUI component to be fully loaded
 * @param page - Playwright page instance
 */
export async function waitForComponentLoad(page: Page) {
  await page.waitForLoadState('networkidle')
  await page.waitForTimeout(100) // Small buffer for animations
}

/**
 * Toggle a demo property checkbox
 * @param page - Playwright page instance
 * @param propertyName - Name of the property (e.g., 'Disabled', 'show')
 * @param checked - Whether to check or uncheck
 */
export async function toggleDemoProperty(page: Page, propertyName: string, checked: boolean) {
  const checkbox = page.locator(`[title="${propertyName}"]`)
  if (checked) {
    await checkbox.check()
  }
  else {
    await checkbox.uncheck()
  }
}

/**
 * Get demo state object value
 * @param page - Playwright page instance
 * @param propertyPath - Path to the property (e.g., 'state.value')
 */
export async function getDemoState(page: Page, propertyPath: string) {
  return await page.evaluate((path) => {
    // This would need to be implemented based on how the demo exposes state
    return (window as any).demoState?.[path]
  }, propertyPath)
}

/**
 * Test accessibility of a component
 * @param page - Playwright page instance
 */
export async function testAccessibility(page: Page) {
  // Basic keyboard navigation test
  await page.keyboard.press('Tab')
  await page.keyboard.press('Enter')
  await page.keyboard.press('Escape')
}

/**
 * Test responsive behavior at different breakpoints
 * @param page - Playwright page instance
 * @param callback - Test function to run at each breakpoint
 */
export async function testResponsive(page: Page, callback: (width: number) => Promise<void>) {
  const breakpoints = [320, 768, 1024, 1440] // Mobile, tablet, desktop, large desktop

  for (const width of breakpoints) {
    await page.setViewportSize({ width, height: 800 })
    await page.waitForTimeout(100) // Allow for layout changes
    await callback(width)
  }
}
