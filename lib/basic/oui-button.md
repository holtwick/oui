# oui-button

A versatile button component that can render as either a `<button>` or `<a>` element depending on the presence of the `href` prop. It supports various modes, sizes, and states for different UI contexts.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `undefined` | The title attribute and fallback text for the button. |
| `mode` | `'primary' \| 'danger' \| 'neutral' \| 'success' \| 'ghost' \| 'outline'` | `'neutral'` | The visual style mode of the button. |
| `size` | `'small' \| 'normal' \| 'large'` | `'normal'` | The size variant of the button. |
| `dropdown` | `boolean` | `false` | Whether the button should display a dropdown indicator. |
| `outline` | `boolean` | `false` | Whether the button should have an outline style (deprecated, use `mode="outline"` instead). |
| `href` | `string` | `undefined` | If provided, renders the button as an `<a>` element with this URL. |
| `target` | `string` | `'_blank'` | The target attribute for the link when `href` is set. |
| `disabled` | `boolean` | `false` | Whether the button is disabled. |

## Slots

| Slot | Description |
|------|-------------|
| (default) | The content of the button. Falls back to the `title` prop if no slot content is provided. |

## Example

```vue
<template>
  <div>
    <!-- Basic button -->
    <OuiButton>Click me</OuiButton>

    <!-- Button with mode and size -->
    <OuiButton mode="primary" size="large">Primary Large</OuiButton>

    <!-- Link button -->
    <OuiButton href="https://example.com" mode="outline">Visit Example</OuiButton>

    <!-- Disabled button -->
    <OuiButton disabled>Disabled</OuiButton>

    <!-- Dropdown button -->
    <OuiButton dropdown>Menu</OuiButton>
  </div>
</template>

<script setup>
import OuiButton from './oui-button.vue'
</script>
```