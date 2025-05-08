<script lang="ts" setup>
import { ref } from 'vue'
import OuiButton from '../basic/oui-button.vue'
import OuiInput from '../basic/oui-input.vue'
import OuiText from '../basic/oui-text.vue'
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

const ok = ref()

const active = ref(true)

function doConfirm() {
  if (props.mode === 'prompt')
    props.done?.(value.value)
  else
    props.done?.(true)
  active.value = false
}

function doCancel() {
  if (props.mode === 'prompt')
    props.done?.(null)
  else
    props.done?.(false)
  active.value = false
}

//  ?? fallbackTitles[mode]
// const fallbackTitles: Record<string, string> = {
//   alert: 'Alert',
//   confirm: 'Confirm',
//   prompt: 'Prompt',
// }
</script>

<template>
  <OuiModal
    v-model="active"
    :title="title"
    :no-sheet="mode !== 'dialog'"
    size="small"
    class="oui-dialog"
    @close="doCancel"
  >
    <OuiText>
      <p>{{ message }}</p>

      <OuiInput
        v-if="mode === 'prompt'"
        v-model="value"
        class="_focus"
        @keypress.enter="doConfirm"
      />
    </OuiText>
    <template #footer>
      <OuiButton
        mode="neutral"
        @click="doCancel"
      >
        {{ cancel ?? 'Cancel' }}
      </OuiButton>
      <OuiButton
        v-if="mode === 'confirm' || mode === 'prompt'"
        ref="ok"
        class="_focus"
        mode="primary"
        @click="doConfirm"
      >
        {{ confirm ?? 'OK' }}
      </OuiButton>
    </template>
  </OuiModal>
</template>
