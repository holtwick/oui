<script lang="ts" setup>
import { ref } from 'vue'
import OuiButton from './oui-button.vue'
import OuiInput from './oui-input.vue'
import OuiNotice from './oui-notice.vue'
import OuiPassword from './oui-password.vue'

import './oui-login.styl'

defineOptions({
  inheritAttrs: false,
})

defineProps<{
  title?: string
}>()

defineEmits<{
  (e: 'login', username: string, password: string): void
}>()

const username = ref('')
const password = ref('')
</script>

<template>
  <OuiNotice title="Login">
    <template v-if="true" #default>
      <p>Welcome, please authorize.</p>
      <div class="oui-login">
        <div class="oui-login-username">
          <OuiInput v-model="username" class="_focus" placeholder="User" name="username" />
        </div>
        <div class="oui-login-password">
          <OuiPassword v-model="password" :show-meter="false" placeholder="Password" name="password" />
        </div>
        <div class="oui-login-button">
          <OuiButton  mode="primary" @click="$emit('login', username, password)">
            Login
          </OuiButton>
        </div>
      </div>
    </template>
  </OuiNotice>
</template>
