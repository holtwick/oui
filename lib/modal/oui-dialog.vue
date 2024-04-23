<script lang="ts" setup>
import { ref } from 'vue'
import { vAutofocus } from '../basic/directives'
import OuiModal from './oui-modal.vue'

const props = defineProps<{
  title?: string
  message: string
  mode: 'alert' | 'prompt' | 'confirm' | 'dialog'
  cancel?: string
  confirm?: string
  done?: any
  placeholder?: string
  defaultValue?: string
}>()

const value = ref(String(props.defaultValue ?? ''))

function doConfirm() {
  if (props.mode === 'prompt')
    props.done?.(value.value)
  else
    props.done?.(true)
}

function doCancel() {
  if (props.mode === 'prompt')
    props.done?.(null)
  else
    props.done?.(false)
}
</script>

<template>
  <OuiModal
    :title="title"
    :no-sheet="mode !== 'dialog'"
    @close="doCancel"
  >
    <div>
      {{ message }}
    </div>
    <input v-if="mode === 'prompt'" v-model="value" v-autofocus>
    <template #footer>
      <button @click="doCancel">
        {{ cancel ?? 'Cancel' }}
      </button>
      <button v-if="mode === 'confirm' || mode === 'prompt'" @click="doConfirm">
        {{ confirm ?? 'OK' }}
      </button>
    </template>
  </OuiModal>
</template>
