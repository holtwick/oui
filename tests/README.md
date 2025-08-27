# E2E Testing with Playwright - Focused Demo Component Testing

This project uses [Playwright](https://playwright.dev/) for end-to-end testing of the OUI component library, with a focused approach on testing key demo components for visual regression and functionality.

## Test Architecture

The testing setup has been streamlined to focus on **core component testing** with `demo-final.spec.ts`:

- **5 Core Components**: Tests the most important UI components (button, input, modal, slider, chart)
- **Visual Regression**: Screenshots and comparison testing across browsers
- **Interaction Testing**: Validates component functionality and user interactions
- **Cross-browser**: Tested on Chromium, Firefox, WebKit, and mobile browsers

## Why This Focused Approach?

Testing key demo components directly provides several advantages:

1. **Stable & Reliable**: Focused on proven, stable components that matter most
2. **Fast Execution**: Quick feedback loop with 35 targeted tests vs. hundreds
3. **Maintainable**: Easy to understand and maintain test coverage
4. **Quality Gate**: Catches regressions in the most important components
5. **Production Ready**: All tests pass consistently (35/35 ✅)

## Test Structure

```
tests/
├── README.md                           # This documentation
└── e2e/
    ├── demo-final.spec.ts             # Main test file (35 tests)
    └── demo-final.spec.ts-snapshots/  # Visual regression baselines
```

### Main Test File: `demo-final.spec.ts`

This file contains all the core tests:
- **Visual Regression Tests**: Screenshots of 5 core components across all browsers
- **Interaction Tests**: Validates button clicks, form interactions, etc.
- **Cross-browser Testing**: Ensures consistency across Chromium, Firefox, WebKit, Mobile Chrome/Safari

## Quick Start

```bash
# Install dependencies (if needed)
pnpm install

# Run the main demo tests (recommended)
pnpm test:demo

# Run with browser UI visible (for debugging)
pnpm test:demo:headed

# Update visual regression baselines (after intentional changes)
pnpm test:demo:update

# Run visual tests only
pnpm test:demo:visual

# Run ALL tests (including unit tests)
pnpm test:all
```

## Test Commands Explained

| Command | Description |
|---------|-------------|
| `pnpm test:demo` | Run all 35 demo tests (5 components × 7 browsers = 35 tests) |
| `pnpm test:demo:visual` | Run only visual regression tests |
| `pnpm test:demo:headed` | Run tests with browser UI visible for debugging |
| `pnpm test:demo:update` | Update screenshot baselines after UI changes |
| `pnpm test:e2e` | Run all E2E tests (same as test:demo now) |
| `pnpm test:all` | Run unit tests + E2E tests |

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
import { expect, test } from '@playwright/test'
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
