# OuiFloat

A flexible floating element component for creating tooltips, dropdowns, popovers, and menus. Built on top of [Floating UI](https://floating-ui.com/) for intelligent positioning.

## Basic Usage

### With External Reference

```vue
<script setup>
import { ref } from 'vue'
import { OuiFloat, OuiButton } from '@/lib'

const show = ref(false)
const anchor = ref()
</script>

<template>
  <OuiButton ref="anchor" @click="show = !show">
    Click to toggle
  </OuiButton>
  <OuiFloat v-model="show" :reference="anchor" placement="right" :offset="10">
    <div>This is floating content</div>
  </OuiFloat>
</template>
```

### With Trigger Slot

```vue
<template>
  <OuiFloat placement="bottom" :offset="10" close hover arrow>
    <template #trigger>
      <OuiButton>Click me</OuiButton>
    </template>
    
    <div>Floating content here</div>
  </OuiFloat>
</template>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `reference` | `Ref<HTMLElement>` | - | External reference element for positioning |
| `transition` | `string` | `${name}-transition` | CSS transition name |
| `placement` | `Placement` | `'top'` | Initial placement (`top`, `bottom`, `left`, `right`, etc.) |
| `arrow` | `boolean` | `false` | Show arrow pointing to reference |
| `offset` | `OffsetOptions` | `0` | Distance from reference element |
| `padding` | `Padding` | `16` | Padding for boundary detection |
| `close` | `boolean` | `false` | Close on outside click or Escape key |
| `hover` | `boolean` | `false` | Show/hide on hover |
| `delayEnter` | `number` | `0` | Hover enter delay in ms |
| `delayLeave` | `number` | `250` | Hover leave delay in ms |

## Model

| Model | Type | Description |
|-------|------|-------------|
| `v-model` | `boolean` | Controls visibility of floating element |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `close` | - | Emitted when float is closed |
| `dblclick` | `MouseEvent` | Emitted on double click |

## Slots

| Slot | Props | Description |
|------|-------|-------------|
| `default` | - | Main floating content |
| `trigger` | `{ active: boolean }` | Trigger element with auto-wiring |
| `click` | `{ active: boolean }` | Click trigger (deprecated, use `trigger`) |
| `hover` | `{ active: boolean }` | Hover trigger (not commonly used) |

## CSS Classes

The component supports predefined styling variants through CSS classes:

### `_tooltip`
```vue
<OuiFloat class="oui-float _tooltip" hover>
  Tooltip content
</OuiFloat>
```

### `_dropdown`
```vue
<OuiFloat class="oui-float _dropdown" close>
  Dropdown content
</OuiFloat>
```

### `_menu`
```vue
<OuiFloat class="oui-float _menu">
  Menu content
</OuiFloat>
```

## Examples

### Tooltip
```vue
<OuiFloat hover class="oui-float _tooltip">
  <template #trigger>
    <span>Hover me</span>
  </template>
  This is a tooltip
</OuiFloat>
```

### Dropdown with Form
```vue
<OuiFloat placement="right" :offset="10" close hover class="oui-float _dropdown">
  <template #trigger="{ active }">
    <OuiButton>Dropdown {{ active ? '▲' : '▼' }}</OuiButton>
  </template>

  <form>
    <input type="text" name="search" placeholder="Search...">
    <select>
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
    </select>
  </form>
</OuiFloat>
```

### Popover with Arrow
```vue
<OuiFloat 
  placement="bottom" 
  :offset="10" 
  close 
  arrow
  transition="oui-float-transition"
>
  <template #trigger>
    <OuiButton>Show Popover</OuiButton>
  </template>
  
  <div style="padding: 16px;">
    <h3>Popover Title</h3>
    <p>This is a popover with an arrow.</p>
  </div>
</OuiFloat>
```

## Positioning

The component uses Floating UI for intelligent positioning with:

- **Auto-flipping**: Automatically flips to opposite side if no space
- **Shifting**: Moves along the axis to stay in viewport  
- **Size adjustment**: Adjusts size to fit available space
- **Arrow positioning**: Automatically positions arrow to point at reference

## Interactions

- **Click outside**: Closes float when `close` prop is true
- **Escape key**: Closes float when `close` prop is true  
- **Hover**: Shows/hides on hover when `hover` prop is true
- **Focus within**: Keeps float open when content has focus (with hover)

## Notes

- Uses `teleport` to render floating content in document body
- Automatically prevents body scroll interference
- Supports custom transitions through the `transition` prop
- Works with keyboard navigation and screen readers
- Arrow automatically adjusts position based on placement
