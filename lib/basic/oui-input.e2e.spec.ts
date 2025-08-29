import { expect, test } from '@playwright/test'

test.describe('OuiInput Browser Tests', () => {
  test('clearable input functionality with isolated component', async ({ page }) => {
    // Create a simple HTML page with our component
    await page.setContent(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <script type="module" src="/lib/basic/oui-input.vue"></script>
        <link rel="stylesheet" href="/lib/basic/oui-form.styl">
      </head>
      <body>
        <div id="app">
          <oui-input 
            v-model="value" 
            clearable="true"
            title="Test Input"
            placeholder="Type something..."
          ></oui-input>
        </div>
        
        <script type="module">
          import { createApp, ref } from 'vue'
          import OuiInput from '/lib/basic/oui-input.vue'
          
          const app = createApp({
            components: { OuiInput },
            setup() {
              const value = ref('Initial value')
              return { value }
            }
          })
          
          app.mount('#app')
        </script>
      </body>
      </html>
    `)

    // Wait for Vue to initialize
    await page.waitForTimeout(1000)

    // Find the input
    const input = page.locator('input')
    await expect(input).toBeVisible()

    // Check initial value
    await expect(input).toHaveValue('Initial value')

    // The clear button should be visible since there's an initial value
    const clearButton = page.locator('.oui-input-clearable')
    await expect(clearButton).toBeVisible()

    // Click the clear button
    await clearButton.click()

    // Input should be cleared
    await expect(input).toHaveValue('')

    // Clear button should no longer be visible
    await expect(clearButton).not.toBeVisible()

    // Type some text
    await input.fill('New text')
    await expect(input).toHaveValue('New text')

    // Clear button should be visible again
    await expect(clearButton).toBeVisible()
  })

  test('input without clearable prop should not show clear button', async ({ page }) => {
    await page.setContent(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
      </head>
      <body>
        <div id="app">
          <oui-input 
            v-model="value" 
            title="Test Input"
          ></oui-input>
        </div>
        
        <script type="module">
          import { createApp, ref } from 'vue'
          import OuiInput from '/lib/basic/oui-input.vue'
          
          const app = createApp({
            components: { OuiInput },
            setup() {
              const value = ref('Some value')
              return { value }
            }
          })
          
          app.mount('#app')
        </script>
      </body>
      </html>
    `)

    await page.waitForTimeout(1000)

    // Clear button should not exist
    const clearButton = page.locator('.oui-input-clearable')
    await expect(clearButton).not.toBeVisible()

    // But input should still work normally
    const input = page.locator('input')
    await expect(input).toBeVisible()
    await expect(input).toHaveValue('Some value')
  })
})
