# Consistent Screenshot Testing Setup

This project is configured for consistent screenshot/visual regression testing across different machines, operating systems, and screen configurations.

## Key Configuration

### 1. Playwright Configuration (`playwright.config.ts`)

```typescript
use: {
  // Fixed viewport ensures consistent layout
  viewport: { width: 1280, height: 720 },
  
  // Force device scale factor to 1 to avoid HiDPI/Retina differences
  deviceScaleFactor: 1,
  
  // Disable mobile features for consistent desktop testing
  isMobile: false,
  hasTouch: false,
}

// Browser-specific settings
projects: [{
  name: 'chromium',
  use: {
    launchOptions: {
      args: [
        '--force-device-scale-factor=1',  // Force 1x scaling
        '--high-dpi-support=1',           // Consistent DPI handling
        '--force-color-profile=srgb',     // Consistent color profile
        // ... other consistency flags
      ],
    },
  },
}]

// Visual comparison settings
expect: {
  toHaveScreenshot: {
    threshold: 0.2,        // 20% difference tolerance
    mode: 'pixel',         // Pixel-level comparison
    animations: 'disabled', // Disable animations
  },
}
```

### 2. Screenshot Helpers (`tests/e2e/screenshot-helpers.ts`)

The `screenshot-helpers.ts` file provides utilities for:
- **Consistent screenshot options** with animations disabled
- **Page preparation** that hides scrollbars and disables hover effects
- **Animation waiting** that ensures all CSS animations complete
- **Font rendering consistency** with antialiasing settings

### 3. Environment Consistency

#### For Development Team:
1. **Use consistent browser versions** - Playwright downloads and uses specific browser versions
2. **Run tests in consistent environments** - preferably in CI/CD or Docker containers
3. **Disable system-level visual effects**:
   - Turn off animation effects in macOS System Preferences
   - Disable Windows visual effects
   - Use consistent zoom levels (100%)

#### For CI/CD:
```bash
# Install consistent fonts (in Docker/CI)
RUN apt-get update && apt-get install -y fonts-liberation fonts-dejavu-core

# Set consistent environment variables
ENV FORCE_COLOR=1
ENV NODE_ENV=test
```

## Usage

### Taking Screenshots

```typescript
import { expect, test } from '@playwright/test'
import { setPageAndWait } from './helpers'
import { screenshotOptions, preparePageForScreenshot, waitForAnimations } from './screenshot-helpers'

test('visual regression test', async ({ page }) => {
  await setPageAndWait(page, 'component-name', false)
  
  // Prepare for consistent screenshot
  await preparePageForScreenshot(page)
  await waitForAnimations(page)
  
  // Take screenshot with consistent options
  const element = page.locator('.component')
  await expect(element).toHaveScreenshot('component.png', screenshotOptions)
})
```

### Updating Screenshots

```bash
# Update all screenshots
pnpm test:e2e:update

# Update specific test screenshots
pnpm playwright test general.e2e.spec.ts --update-snapshots
```

## Troubleshooting Different Results

### Common Causes:
1. **Different OS font rendering** - solved by `--force-color-profile=srgb` and font CSS
2. **HiDPI/Retina displays** - solved by `--force-device-scale-factor=1`  
3. **Browser zoom** - solved by fixed `deviceScaleFactor: 1`
4. **Screen resolution differences** - solved by fixed `viewport` size
5. **Animations/transitions** - solved by `animations: 'disabled'` and animation waiting
6. **Scrollbar differences** - solved by CSS that hides scrollbars
7. **Hover states** - solved by CSS that disables hover during screenshots

### If You Still Get Differences:
1. **Check browser version**: `pnpm playwright --version`
2. **Clear old screenshots**: Delete `test-results/` folder and regenerate
3. **Check OS-specific differences**: Run tests on same OS as CI/CD
4. **Verify font installation**: Ensure consistent fonts across environments
5. **Use Docker**: Run tests in Docker containers for ultimate consistency

## Best Practices

1. **Always disable animations** in screenshot options
2. **Use consistent viewport sizes** (1280x720 or 1200x800)
3. **Wait for content to load** before taking screenshots
4. **Take screenshots of specific elements** rather than full pages when possible
5. **Use descriptive filenames** with component name and variant (e.g., `button-primary-dark.png`)
6. **Group related visual tests** together
7. **Set appropriate thresholds** (0.1-0.3 depending on complexity)

## File Structure

```
tests/e2e/
├── screenshot-helpers.ts     # Utilities for consistent screenshots
├── helpers.ts               # Page navigation and setup helpers  
├── general.e2e.spec.ts     # Visual regression tests
└── interactions.e2e.spec.ts # Interaction tests
```
