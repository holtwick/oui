# 🎨 Oui Kit

> *"Oui, c'est un kit!" ### Installation

```bash
npm install oui-kit
# or
pnpm add oui-kit
# or
yarn add oui-kit
```

**CDN Alternative:**

```html
<script src="https://unpkg.com/oui-kit@latest/dist/lib.js"></script>
<link rel="stylesheet" href="https://unpkg.com/oui-kit@latest/dist/lib.css">
```

## 🎯 Usage.js UI toolkit with a French touch* 🇫🇷

<div align="center">

**Modern • Lightweight • TypeScript-first • Accessible**

[![npm version](https://img.shields.io/npm/v/oui-kit.svg)](https://www.npmjs.com/package/oui-kit)
[![license](https://img.shields.io/npm/l/oui-kit.svg)](https://github.com/holtwick/oui/blob/main/LICENSE)
[![downloads](https://img.shields.io/npm/dm/oui-kit.svg)](https://www.npmjs.com/package/oui-kit)

[🚀 Get Started](#installation) • [📚 Documentation](https://oui.holtwick.de) • [🎮 Live Demo](https://oui.holtwick.de)

</div>

## ✨ Why Oui Kit?

- 🎯 **Vue 3 Native** - Built from the ground up for Vue 3 Composition API
- 🎨 **Stylus Powered** - Flexible theming system with Stylus CSS
- 📦 **Tree Shakeable** - Import only what you need
- 🔧 **TypeScript First** - Full TypeScript support out of the box
- ♿ **Accessible** - WCAG compliant components
- 🪶 **Lightweight** - Minimal bundle size impact
- 🎛️ **Customizable** - Easy to theme and extend

---

🎮 **Try it live:** <https://oui.holtwick.de>

📱 **Scan QR code for mobile demo:**

<img src="./qrcode.png" alt="QR Code to demo website" style="max-width: 20rem">

## 🚀 Quick Start

Get up and running in under 2 minutes!

### Installation

```bash
npm install oui-kit
# or
pnpm add oui-kit
# or
yarn add oui-kit
```

### CDN

```html
<script src="https://unpkg.com/oui-kit@latest/dist/lib.js"></script>
<link rel="stylesheet" href="https://unpkg.com/oui-kit@latest/dist/lib.css">
```

### NPM Package

```bash
npm install oui-kit
# or
pnpm add oui-kit
# or
yarn add oui-kit
```

### CDN

```html
<script src="https://unpkg.com/oui-kit@latest/dist/lib.js"></script>
<link rel="stylesheet" href="https://unpkg.com/oui-kit@latest/dist/lib.css">
```

## 🎯 Usage

### Basic Setup

```typescript
// main.ts
import { createApp } from 'vue'
import App from './App.vue'

// Import oui-kit styles
import 'oui-kit/css'

const app = createApp(App)
app.mount('#app')
```

### Your First Component

```vue
<script setup lang="ts">
import { OuiButton, OuiModal, useNotification } from 'oui-kit'
import { ref } from 'vue'

const showModal = ref(false)
const { notify } = useNotification()

function handleSuccess() {
  notify('🎉 Success! Your component is working!', 'success')
}

function handleInfo() {
  notify('ℹ️ This is an info message', 'info')
}
</script>

<template>
  <div class="demo-container">
    <h2>Welcome to Oui Kit!</h2>

    <div class="button-group">
      <OuiButton variant="primary" @click="handleSuccess">
        🎉 Show Success
      </OuiButton>

      <OuiButton variant="secondary" @click="handleInfo">
        ℹ️ Show Info
      </OuiButton>

      <OuiButton variant="outline" @click="showModal = true">
        📱 Open Modal
      </OuiButton>
    </div>

    <OuiModal v-model="showModal" title="🎨 Hello from Oui Kit!">
      <p>This modal demonstrates the power of Oui Kit components.</p>
      <p>Enjoy building beautiful Vue.js applications! 🚀</p>
    </OuiModal>
  </div>
</template>

<style lang="stylus">
@import 'oui-kit/stylus'

.demo-container
  padding: $spacing-lg
  max-width: 600px
  margin: 0 auto

.button-group
  display: flex
  gap: $spacing-md
  flex-wrap: wrap
  margin-top: $spacing-md
</style>
```

### Theme Customization

```stylus
// Import oui-kit and customize theme
@import 'oui-kit/stylus'

// Override theme variables
$primary-color = #6366f1
$secondary-color = #8b5cf6
$success-color = #10b981
$warning-color = #f59e0b
$error-color = #ef4444

// Custom spacing
$spacing-hero = 80px

.my-awesome-app
  padding: $spacing-hero
  background: linear-gradient(135deg, $primary-color, $secondary-color)
  color: white
  border-radius: $border-radius-lg

  &:hover
    transform: translateY(-2px)
    box-shadow: 0 10px 25px rgba($primary-color, 0.3)
```

## 🧩 Available Components

### 🎨 UI Components

| Component | Description | Features |
|-----------|-------------|----------|
| **OuiButton** | Versatile button component | Multiple variants, sizes, loading states |
| **OuiModal** | Beautiful modal dialogs | Backdrop blur, animations, accessibility |
| **OuiNotification** | Toast notification system | Auto-dismiss, positions, custom styling |
| **OuiFloat** | Floating positioning | Tooltips, dropdowns, popovers |

### 🔧 Composables & Utilities

| Composable | Description | Use Case |
|------------|-------------|----------|
| **useNotification** | Reactive notification system | Show success/error messages |
| **useModal** | Modal state management | Programmatic modal control |
| **useFloat** | Floating element positioning | Tooltips, dropdowns, menus |

## 🎨 Design System

### Color Palette

```stylus
// Primary Colors
$primary-color = #007bff      // Vibrant blue
$secondary-color = #6c757d    // Elegant gray
$success-color = #28a745      // Fresh green
$warning-color = #ffc107      // Golden yellow
$error-color = #dc3545       // Clear red

// Surface Colors
$surface-color = #ffffff      // Pure white
$surface-hover = #f8f9fa     // Light gray
$surface-active = #e9ecef    // Medium gray

// Text Colors
$text-primary = #212529      // Dark gray
$text-secondary = #6c757d    // Medium gray
$text-muted = #8e9aaf        // Light gray
```

### Typography Scale

```stylus
// Font Sizes
$font-size-xs = 0.75rem      // 12px
$font-size-sm = 0.875rem     // 14px
$font-size-md = 1rem         // 16px
$font-size-lg = 1.25rem      // 20px
$font-size-xl = 1.5rem       // 24px
$font-size-2xl = 2rem        // 32px

// Font Weights
$font-weight-light = 300
$font-weight-normal = 400
$font-weight-medium = 500
$font-weight-semibold = 600
$font-weight-bold = 700
```

### Spacing System

```stylus
// Consistent spacing scale
$spacing-xs = 4px           // Tiny
$spacing-sm = 8px           // Small
$spacing-md = 16px          // Medium
$spacing-lg = 24px          // Large
$spacing-xl = 32px          // Extra large
$spacing-2xl = 48px         // Double extra large
$spacing-3xl = 64px         // Triple extra large
```

## 🚀 Advanced Usage

### Custom Theme

```stylus
// themes/dark.styl
@import 'oui-kit/theme'

// Dark theme overrides
$surface-color = #1a1a1a
$surface-hover = #2d2d2d
$text-primary = #ffffff
$text-secondary = #a1a1a1
$border-color = #404040

// Import components with custom theme
@import 'oui-kit/stylus'
```

### Tree Shaking

```typescript
// Import only what you need
import * as OuiKit from 'oui-kit'
// Or import everything (not recommended for production)
import { OuiButton, OuiModal, useNotification } from 'oui-kit'
import { OuiButton } from 'oui-kit/button'
import { OuiModal } from 'oui-kit/modal'

import { useNotification } from 'oui-kit/notification'
```

## 🛠️ Development

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details on:

- Code style and formatting
- Testing requirements
- Git workflow and commit conventions
- Development setup

## Browser Support

oui-kit supports all modern browsers:

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## License

MIT License - see [LICENSE](./LICENSE) file for details.

## Acknowledgments

Derives from this previous work:

- [twindy](https://github.com/holtwick/twindy)
- [twindy-headless](https://github.com/holtwick/twindy-headless)

## Support

- 📖 [Documentation](https://oui.holtwick.de)
- 🐛 [Issues](https://github.com/holtwick/oui/issues)
- 💬 [Discussions](https://github.com/holtwick/oui/discussions)
- ❤️ [Sponsor](https://github.com/sponsors/holtwick)
