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
