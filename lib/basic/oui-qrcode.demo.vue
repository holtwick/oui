<script lang="ts" setup>
import { reactive } from 'vue'
import { OuiDemo, OuiInput, OuiQrcode } from '@/lib'

import './oui-resizeable.demo.styl'

const state = reactive({
  content: 'https://oui.holtwick.de',
})
</script>

<template>
  <h2>QR Code</h2>

  <div>
    <OuiQrcode :content="state.content" />
  </div>

  <OuiDemo :state="state">
    <OuiInput v-model="state.content" switch title="content" />
  </OuiDemo>
</template>

<style>
.oui-qrcode svg {
  display: inline-block;
  max-width: min(50vh, 50vw);
  max-height: min(50vh, 50vw);
}
</style>
