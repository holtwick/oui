<script lang="ts" setup>
import { ref } from 'vue'
import OuiFormItem from './oui-form-item.vue'
import OuiInput from './oui-input.vue'
import OuiInputPasswordMeter from './oui-password-meter.vue'

import './oui-password.styl'

defineOptions({
  inheritAttrs: false,
})

withDefaults(defineProps<{
  showMeter?: boolean
  showVisibility?: boolean
  placeholder?: string
  title?: string
  description?: string
  required?: boolean
  id?: string
}>(), {
  showVisibility: true,
  showMeter: true,
})

const model = defineModel<string | undefined>({ required: true })

const show = ref(false)
</script>

<template>
  <OuiFormItem
    :id="id"
    :title="title"
    :description="description"
    :required="required"
  >
    <div class="oui-password">
      <OuiInput
        v-model="model"
        :type="show ? 'text' : 'password'"
        :placeholder="placeholder"
        v-bind="$attrs"
      >
        <template #end>
          <template v-if="showVisibility">
            <button @click="show = !show">
              <template v-if="show">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-off"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" /><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" /><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" /><line x1="2" x2="22" y1="2" y2="22" /></svg>
              </template>
              <template v-if="!show">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
              </template>
            </button>
          </template>
        </template>
      </OuiInput>
      <template v-if="showMeter !== false">
        <OuiInputPasswordMeter :value="model" />
      </template>
    </div>
  </OuiFormItem>
</template>
