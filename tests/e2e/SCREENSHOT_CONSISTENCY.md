# Screenshot Consistency Guide

This document explains how consistent screenshots are guaranteed across different machines, pixel ratios, DPI settings, and **browsers** (Chromium, Firefox, WebKit).

## Multi-Browser Configuration

Our Playwright configuration ensures consistent screenshots across **all three major browser engines**:

### 1. Chromium (Chrome/Edge) - Browser Launch Arguments
```typescript
launchOptions: {
  args: [
    '--disable-web-security',
    '--disable-features=TranslateUI',
    '--force-device-scale-factor=1',     // Force pixel ratio = 1
    '--high-dpi-support=1',              // Enable HiDPI support
    '--force-color-profile=srgb',        // Force consistent color profile
  ],
}
```

### 2. Firefox - User Preferences
```typescript
firefoxUserPrefs: {
  'layout.css.devPixelsPerPx': '1.0',       // Force device pixel ratio to 1
  'gfx.webrender.enabled': false,           // Disable hardware acceleration
  'gfx.color_management.mode': 2,           // Force sRGB color profile
  'general.smoothScroll': false,            // Disable smooth scrolling
  'toolkit.cosmeticAnimations.enabled': false, // Disable animations
}
```

### 3. WebKit (Safari) - Limited Configuration
```typescript
launchOptions: {
  args: [
    '--disable-web-security',  // Basic security bypass for testing
  ],
}
```
*Note: WebKit has fewer configuration options but still uses shared CSS consistency rules*

### 4. Cross-Browser CSS Consistency
Our `screenshot-helpers.ts` includes browser-specific CSS:

```typescript
// Chromium/WebKit scrollbar hiding
::-webkit-scrollbar { width: 0px; background: transparent; }

// Firefox scrollbar hiding  
* { scrollbar-width: none; -ms-overflow-style: none; }

// Browser-specific font rendering
/* Firefox */
* {
  -moz-osx-font-smoothing: grayscale;
  text-rendering: geometricPrecision;
}

/* WebKit */  
* {
  -webkit-font-smoothing: subpixel-antialiased;
  text-rendering: geometricPrecision;
}
```

### 5. Universal Settings (All Browsers)
```typescript
viewport: { width: 1280, height: 720 },  // Fixed viewport size
deviceScaleFactor: 1,                     // Force pixel ratio = 1
isMobile: false,
hasTouch: false,
```

### 3. Visual Comparison Thresholds
```typescript
toHaveScreenshot: {
  threshold: 0.2,           // Allow 0.2% pixel difference
  mode: 'pixel',           // Pixel-perfect comparison
  animations: 'disabled',  // Disable animations
}
```

### 4. CSS Consistency Helpers
Our `screenshot-helpers.ts` includes CSS that:
- Hides scrollbars: `scrollbar-width: none`
- Disables animations: `animation: none !important`
- Forces font smoothing: `-webkit-font-smoothing: antialiased`
- Removes cursors: `cursor: none !important`

## How Different Screen Setups AND Browsers Are Handled

### Cross-Browser Rendering Differences
Each browser engine renders content slightly differently:

- **Chromium**: Uses Blink rendering engine with extensive configuration options
- **Firefox**: Uses Gecko rendering engine with Firefox-specific preferences  
- **WebKit**: Uses WebKit rendering engine with limited configuration but CSS consistency

### High DPI / Retina Displays (All Browsers)
- **Chromium**: `--force-device-scale-factor=1` 
- **Firefox**: `layout.css.devPixelsPerPx: '1.0'`
- **WebKit**: `deviceScaleFactor: 1` (CSS-based normalization)

### Font Rendering Consistency
- **Chromium**: Uses `antialiased` font smoothing
- **Firefox**: Uses `grayscale` font smoothing + `geometricPrecision` 
- **WebKit**: Uses `subpixel-antialiased` + `geometricPrecision`

### Color Profile Consistency  
- **Chromium**: `--force-color-profile=srgb`
- **Firefox**: `gfx.color_management.mode: 2` (sRGB)
- **WebKit**: Relies on system color profile (limited control)

### Animation/Transition Handling
- **All browsers**: CSS rules disable animations and transitions
- **Firefox**: Additional `toolkit.cosmeticAnimations.enabled: false`
- **Chromium**: Launch args disable background throttling
- **WebKit**: JavaScript-based smooth scrolling disabling

### Different Screen Resolutions  
- Fixed `viewport: { width: 1280, height: 720 }` ensures consistent render area
- Screenshots are taken of this fixed viewport, not the physical screen

### Different Operating Systems
- `--force-color-profile=srgb` ensures consistent colors across macOS/Windows/Linux
- `-webkit-font-smoothing: antialiased` provides consistent text rendering
- Browser launch args disable OS-specific features that could affect rendering

### Different Pixel Ratios
- All handled by forcing `deviceScaleFactor: 1`
- Whether running on 1x, 2x, or 3x displays, screenshots will be identical

## Best Practices for Screenshot Tests

### 1. Use Preparation Functions
```typescript
await preparePageForScreenshot(page)
await waitForAnimations(page)
```

### 2. Use Consistent Options
```typescript
await expect(locator).toHaveScreenshot('test.png', screenshotOptions)
```

### 3. Wait for Stability
```typescript
await page.waitForLoadState('networkidle')
await page.waitForTimeout(300) // Let any layout settle
```

## Troubleshooting Screenshot Differences

If you still see differences:

### 1. Check Font Loading
- Ensure web fonts are loaded before screenshots
- Consider using `font-display: block` for critical fonts

### 2. Check Dynamic Content
- Mock time-sensitive content
- Disable random content or animations

### 3. Check Layout Stability
- Wait for images to load: `await page.waitForLoadState('networkidle')`
- Wait for layout shifts to settle

### 4. Update Baselines
If legitimate changes require new baselines:
```bash
pnpm playwright test --update-snapshots
```

## Environment Variables

Set these for consistent CI/CD:

```bash
# Force consistent timezone
TZ=UTC

# Disable system font fallbacks
PLAYWRIGHT_BROWSERS_PATH=0

# Force consistent locale
LC_ALL=en_US.UTF-8
LANG=en_US.UTF-8
```

## Testing Setup

Our E2E server runs on port 5174 with optimized settings for consistent rendering:

```typescript
webServer: {
  command: 'pnpm dev:e2e',
  url: 'http://localhost:5174',
  reuseExistingServer: !process.env.CI,
}
```

This ensures the same rendering environment across all test runs.
