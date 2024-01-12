# oui-notification

> [!NOTE]
> **oui** componentents are *headless* i.e. they do not come with CSS by default. These examples import CSS syles, but you are free to do it from scratch as well.

Simple to use modal dialog view.

- title
- close button
- `esc` key support for close
- keyboard focus is trapped inside the view

```vue
<script lang="ts" setup>
import { ref } from 'vue'
import { OuiModal } from 'oui-modal'

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
