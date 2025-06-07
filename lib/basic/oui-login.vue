<script lang="ts" setup>
import { ref, watch } from 'vue'
import { vFocustrap } from '../modal/oui-modal.focustrap'

import './oui-notice.styl'

defineOptions({
  inheritAttrs: false,
})

defineProps<{
  title?: string
}>()

const root = ref()

watch(root, (el) => {
  if (el) {
    (el.querySelector('._focus')
      ?? el.querySelector('input,button,select')
      ?? el).focus()
  }
}, { immediate: true })
</script>

<template>
  <div ref="root" v-focustrap class="oui-login">
    <p>Welcome, please authorize.</p>
    <p>
      <OuiInput v-model="state.title" class="_focus" placeholder="User" name="username" />
    </p>
    <p>
      <OuiPassword v-model="state.demoInput" :show-meter="false" placeholder="Password" name="password" />
    </p>
    <div class="oui-login-container-button">
      <OuiButton :disabled="false" mode="primary">
        Login
      </OuiButton>
    </div>
  </div>
</template>
