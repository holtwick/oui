# oui-notification

> [!NOTE]
> **oui** componentents are *headless* i.e. they do not come with CSS by default. These examples import CSS syles, but you are free to do it from scratch as well.

Simple notofications

```vue
<script lang="ts" setup>
import { OuiNotificationActivator, emitNotificationInfo } from 'oui-notification'

import 'oui-notification/css'

function doEmit() {
  emitNotificationInfo('Hello', 'This is a test', 2000)
}
</script>

<template>
  <button @click="doEmit">
    Notification
  </button>
  <OuiNotificationActivator />
</template>
```
