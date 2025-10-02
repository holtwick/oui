# oui-modal

> [!NOTE]
> **oui** componentents are *headless* i.e. they do not come with CSS by default. These examples import CSS syles, but you are free to do it from scratch as well.

Simple to use modal dialog view.

- title
- close button
- `esc` key support for close
- keyboard focus is trapped inside the view

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `close` | `boolean` | `false` | Whether to show a close button in the header. |
| `allowCancel` | `boolean` | `true` | Whether the modal can be closed by clicking the overlay or pressing Escape. |
| `title` | `string` | `undefined` | The title displayed in the modal header. |
| `transition` | `string` | `undefined` | The transition name for the modal animation. Defaults to `oui-modal-transition`. |
| `forceSheet` | `boolean` | `false` | Forces the modal to display as a bottom sheet on all devices. |
| `noSheet` | `boolean` | `false` | Disables the bottom sheet behavior on mobile devices. |
| `size` | `'small' \| 'normal' \| 'large' \| 'max'` | `'normal'` | The size variant of the modal. |

## Model

| Model | Type | Description |
|-------|------|-------------|
| `modelValue` | `boolean` | Controls the visibility of the modal (v-model). |

## Events

| Event | Description |
|-------|-------------|
| `close` | Emitted when the modal is closed. |
| `cancel` | Emitted when the modal is cancelled (e.g., by clicking overlay or pressing Escape). |
| `open` | Emitted when the modal is opened. |

## Slots

| Slot | Description |
|------|-------------|
| `close` | Content for the close button. Defaults to an `OuiClose` icon. |
| `title` | Content for the title area. Falls back to the `title` prop. |
| `header` | Additional content in the header area. |
| (default) | The main content of the modal body. |
| `footer` | Content for the modal footer. |

## Features

- **Keyboard Support**: Press `Escape` to close the modal (if `allowCancel` is true).
- **Focus Trapping**: Keyboard focus is trapped inside the modal.
- **Scroll Lock**: Body scrolling is disabled when the modal is open.
- **Responsive**: Automatically displays as a bottom sheet on mobile devices (unless `noSheet` is true).
- **Draggable**: On touch devices, the modal can be swiped down to close.

```vue
<script lang="ts" setup>
import { OuiModal } from 'oui-modal'
import { ref } from 'vue'

import 'oui-modal/css'

const show = ref(false)
</script>

<template>
  <button @click="show = !show">
    Click to show modal
  </button>
  <OuiModal v-model="show">
    This is the modal
  </OuiModal>
</template>
```

## Advanced Example

```vue
<template>
  <div>
    <button @click="showModal = true">Open Modal</button>

    <OuiModal
      v-model="showModal"
      title="Confirm Action"
      :close="true"
      size="large"
      @close="onClose"
      @cancel="onCancel"
      @open="onOpen"
    >
      <template #header>
        <p>Additional header content</p>
      </template>

      <p>Are you sure you want to proceed?</p>

      <template #footer>
        <button @click="showModal = false">Cancel</button>
        <button @click="confirmAction">Confirm</button>
      </template>
    </OuiModal>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import OuiModal from './oui-modal.vue'

const showModal = ref(false)

function onOpen() {
  console.log('Modal opened')
}

function onClose() {
  console.log('Modal closed')
}

function onCancel() {
  console.log('Modal cancelled')
}

function confirmAction() {
  // Handle confirmation
  showModal.value = false
}
</script>
```
