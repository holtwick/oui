<script lang="ts" setup>
import { emitNotificationInfo } from 'oui-notification'
import 'oui-notification/css'

function doEmit() {
  emitNotificationInfo('Hello')
}
</script>

<template>
  <button @click="doEmit">
    Notification
  </button>
</template>
