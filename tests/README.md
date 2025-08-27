# E2E Testing with Playwright - Demo Component Focus

This project uses [Playwright](https://playwright.dev/) for end-to-end testing of the OUI component library, with a special focus on testing individual `.demo.vue` components for visual regression and functionality.

## Why Test Demo Components Directly?

Testing demo components directly provides several advantages over testing the full demo application:

1. **Focused Testing**: Each component is tested in isolation without surrounding UI noise
2. **Faster Execution**: No need to navigate through the demo application UI
3. **Stable Screenshots**: Clean, consistent visual baselines without dynamic demo controls
4. **Better Debugging**: Issues are isolated to specific components
5. **Comprehensive Coverage**: All demo components can be tested automatically

## Setup

The testing environment is already configured. Dependencies are installed automatically when running:

```bash
pnpm install
```

## Running Tests

### Run all E2E tests
```bash
pnpm test:e2e
```

### Run tests with UI (interactive mode)
```bash
pnpm test:e2e:ui
```

### Run tests in headed mode (see browser)
```bash
pnpm test:e2e:headed
```

### Debug specific test
```bash
pnpm test:e2e:debug
```

### View test report
```bash
pnpm test:e2e:report
```

### Run all tests (unit + e2e)
```bash
pnpm test:all
```

## Test Structure

Tests are organized in `/tests/e2e/` with the following structure:

- `basic-components.spec.ts` - Tests for basic UI components (Button, Input, Checkbox)
- `modal-components.spec.ts` - Tests for modal and dialog functionality  
- `float-components.spec.ts` - Tests for floating elements (tooltips, menus)
- `component-integration.spec.ts` - Comprehensive integration tests
- `visual-regression.spec.ts` - Screenshot/visual comparison tests
- `helpers.ts` - Utility functions for testing

## Test Coverage

### Components Tested
- **OuiButton** - All variants, sizes, states, interactions
- **OuiInput** - Text input, validation, different types
- **OuiCheckbox** - Toggle functionality, switch variant, disabled state
- **OuiModal** - Show/hide, content rendering, backdrop behavior
- **OuiDialog** - Alert, confirm, prompt functionality
- **OuiFloat** - Tooltips, dropdown menus, positioning
- **OuiTabs** - Tab navigation, content switching
- **OuiTableView** - Virtual scrolling, headers, footers
- **Form Components** - Complex form interactions

### Test Types
- **Functional Testing** - Component behavior and interactions
- **Visual Testing** - Screenshot comparisons for UI consistency  
- **Responsive Testing** - Mobile and desktop layouts
- **Accessibility Testing** - Keyboard navigation, focus management
- **Integration Testing** - Component interactions and workflows

## Configuration

Tests are configured in `playwright.config.ts`:

- **Base URL**: `http://localhost:5173` (development server)
- **Browsers**: Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari
- **Screenshots**: Taken on failure
- **Traces**: Collected on retry for debugging
- **Dev Server**: Automatically started before tests

## Writing Tests

### Basic Test Structure
```typescript
import { test, expect } from '@playwright/test'
import { navigateToDemo, toggleDemoProperty } from './helpers'

test.describe('Component Name', () => {
  test('should do something', async ({ page }) => {
    await navigateToDemo(page, 'ComponentName')
    
    // Test component functionality
    await expect(page.locator('selector')).toBeVisible()
  })
})
```

### Using Test Helpers
```typescript
// Navigate to a demo component
await navigateToDemo(page, 'Button')

// Toggle demo properties
await toggleDemoProperty(page, 'Disabled', true)

// Test responsive behavior
await testResponsive(page, async (width) => {
  // Test at each breakpoint
})
```

### Visual Testing
```typescript
// Take screenshot for comparison
await expect(page).toHaveScreenshot('test-name.png')

// Screenshot specific element
await expect(element).toHaveScreenshot('element.png')
```

## Debugging

### VS Code Integration
Install the [Playwright VS Code extension](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright) for:
- Running tests from editor
- Setting breakpoints
- Step-through debugging

### Browser Debug Mode
```bash
pnpm test:e2e:debug
```

### Trace Viewer
After test failure, view detailed traces:
```bash
npx playwright show-trace test-results/path-to-trace.zip
```

## CI/CD

Tests run automatically on:
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop`

GitHub Actions workflow includes:
- Unit test execution
- E2E test execution across all browsers
- Test report and artifact uploads
- Failure notifications

## Best Practices

1. **Page Object Pattern** - Use helper functions for reusable actions
2. **Wait Strategies** - Use proper waits (`waitForLoadState`, `waitForSelector`)
3. **Stable Selectors** - Prefer text content or data attributes over CSS classes
4. **Test Isolation** - Each test should be independent
5. **Screenshot Consistency** - Disable animations for visual tests
6. **Mobile First** - Test responsive behavior across breakpoints

## Troubleshooting

### Common Issues

**Tests failing locally but passing in CI:**
- Check viewport size differences
- Ensure consistent animation states
- Verify dev server startup timing

**Screenshot mismatches:**
- Update screenshots: `npx playwright test --update-snapshots`
- Check for OS-specific rendering differences
- Ensure consistent font rendering

**Flaky tests:**
- Add proper wait conditions
- Increase timeouts if necessary
- Check for race conditions in component rendering
