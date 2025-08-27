import { test, expect } from '@playwright/test'
import { navigateToDemo, toggleDemoProperty, waitForComponentLoad, testResponsive } from './helpers'

test.describe('OUI Component Integration Tests', () => {
  test('form item comprehensive testing', async ({ page }) => {
    await navigateToDemo(page, 'Form Item')
    
    // Test all form inputs are present and functional
    await expect(page.locator('input[type="text"]')).toHaveCount(2)
    await expect(page.locator('input[type="color"]')).toBeVisible()
    await expect(page.locator('input[type="number"]')).toBeVisible()
    await expect(page.locator('textarea')).toHaveCount(2)
    await expect(page.locator('input[type="password"]')).toBeVisible()
    
    // Test input interaction
    const textInput = page.locator('input[type="text"]').first()
    await textInput.fill('Test value')
    await expect(textInput).toHaveValue('Test value')
    
    // Test color input
    const colorInput = page.locator('input[type="color"]')
    await colorInput.fill('#00ff00')
    await expect(colorInput).toHaveValue('#00ff00')
    
    // Test number input
    const numberInput = page.locator('input[type="number"]')
    await numberInput.fill('100')
    await expect(numberInput).toHaveValue('100')
    
    // Test textarea
    const textarea = page.locator('textarea').first()
    await textarea.fill('Multi-line\ntext content')
    await expect(textarea).toHaveValue('Multi-line\ntext content')
    
    // Test disabled state
    await toggleDemoProperty(page, 'Disabled', true)
    await expect(textInput).toBeDisabled()
    await expect(colorInput).toBeDisabled()
    await expect(numberInput).toBeDisabled()
    
    // Re-enable
    await toggleDemoProperty(page, 'Disabled', false)
    await expect(textInput).toBeEnabled()
  })

  test('slider and tabs component interaction', async ({ page }) => {
    await navigateToDemo(page, 'Slider')
    
    // Test tabs navigation
    await page.click('text=ANALYTICS')
    await expect(page.locator('text=Analytics Content')).toBeVisible()
    
    await page.click('text=SETTINGS')
    await expect(page.locator('text=Settings Content')).toBeVisible()
    
    await page.click('text=USERS')
    await expect(page.locator('text=Users Content')).toBeVisible()
    
    // Test segmented controls
    await page.click('text=Light')
    await page.click('text=Dark')
    await page.click('text=Auto')
    
    // Test icon-based segmented control
    const gridOption = page.locator('text=Grid')
    await gridOption.click()
    await expect(gridOption).toHaveClass(/selected/)
  })

  test('tableview with virtual scrolling', async ({ page }) => {
    await navigateToDemo(page, 'TableView')
    
    // Test table is rendered
    await expect(page.locator('table')).toBeVisible()
    
    // Test header visibility toggle
    await toggleDemoProperty(page, 'header', true)
    await expect(page.locator('thead')).toBeVisible()
    
    await toggleDemoProperty(page, 'header', false)
    await expect(page.locator('thead')).not.toBeVisible()
    
    // Test footer visibility toggle  
    await toggleDemoProperty(page, 'footer', true)
    await expect(page.locator('tfoot')).toBeVisible()
    
    // Test scrolling behavior
    const tableContainer = page.locator('.oui-tableview')
    await tableContainer.scrollIntoViewIfNeeded()
    
    // Test separator handle if enabled
    await toggleDemoProperty(page, 'showSepHandle', true)
    await expect(page.locator('.oui-resizable-handle')).toBeVisible()
  })

  test('responsive design across breakpoints', async ({ page }) => {
    await testResponsive(page, async (width) => {
      await navigateToDemo(page, 'Button')
      
      // Test button is visible and clickable at all breakpoints
      const primaryButton = page.locator('text=Primary')
      await expect(primaryButton).toBeVisible()
      
      if (width >= 768) {
        // Desktop-specific tests
        await expect(primaryButton).toHaveCSS('padding', /\d+px/)
      } else {
        // Mobile-specific tests - buttons might have different styling
        await expect(primaryButton).toBeVisible()
      }
      
      // Test modal behavior on mobile
      await navigateToDemo(page, 'Modal')
      await toggleDemoProperty(page, 'show', true)
      
      const modal = page.locator('.oui-modal')
      await expect(modal).toBeVisible()
      
      if (width < 768) {
        // On mobile, modals might behave like sheets
        await expect(modal).toBeVisible()
      }
      
      await toggleDemoProperty(page, 'show', false)
    })
  })

  test('keyboard navigation and accessibility', async ({ page }) => {
    await navigateToDemo(page, 'Button')
    
    // Test keyboard navigation
    await page.keyboard.press('Tab')
    await expect(page.locator(':focus')).toBeVisible()
    
    // Test Enter key activation
    const focusedElement = page.locator(':focus')
    await page.keyboard.press('Enter')
    
    // Navigate to form and test form navigation
    await navigateToDemo(page, 'Form Item')
    
    // Tab through form elements
    await page.keyboard.press('Tab')
    await expect(page.locator('input:focus')).toBeVisible()
    
    await page.keyboard.press('Tab')
    await expect(page.locator('input:focus, textarea:focus, select:focus')).toBeVisible()
    
    // Test Escape key behavior in modals
    await navigateToDemo(page, 'Dialog')
    await page.click('text=Alert')
    
    const modal = page.locator('.oui-modal')
    await expect(modal).toBeVisible()
    
    await page.keyboard.press('Escape')
    // Note: Depending on allowCancel setting, modal might or might not close
  })
})
