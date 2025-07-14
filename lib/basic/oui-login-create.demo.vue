<script lang="ts" setup>
import type { LoggerInterface } from 'zeed'
import { ref } from 'vue'
import { Logger } from 'zeed'
import { OuiDemo, OuiLoginCreate } from '@/lib'
import OuiCheckbox from './oui-checkbox.vue'

const log: LoggerInterface = Logger('oui-login-create-demo')

const showConfirmation = ref(false)
const lastCreatedAccount = ref<{ username: string, password: string } | null>(null)

function handleAccountCreate(username: string, password: string) {
  log.info('Account created:', { username, passwordLength: password.length })
  lastCreatedAccount.value = { username, password }
}
</script>

<template>
  <div class="demo-container">
    <OuiLoginCreate
      :require-confirmation="showConfirmation"
      @create="handleAccountCreate"
    />
  </div>
  <OuiDemo>
    <OuiCheckbox v-model="showConfirmation">
      Confirmation required
    </OuiCheckbox>
  </OuiDemo>
</template>
