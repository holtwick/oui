<script lang="ts" setup>
import type { InputTypeHTMLAttribute } from 'vue'
import { onBeforeUnmount, ref, watch } from 'vue'
import OuiFormItem from './oui-form-item.vue'

import './oui-form.styl'

defineOptions({
  inheritAttrs: false,
})

// type InputTypeHTMLAttribute = 'button' | 'checkbox' | 'color' | 'date' | 'datetime-local' | 'email' | 'file' | 'hidden' | 'image' | 'month' | 'number' | 'password' | 'radio' | 'range' | 'reset' | 'search' | 'submit' | 'tel' | 'text' | 'time' | 'url' | 'week' | (string & {});

const props = withDefaults(defineProps<{
  title?: string
  description?: string
  required?: boolean
  id?: string
  type?: InputTypeHTMLAttribute // 'text' | 'url' | 'email' | 'tel' | 'search'
  lazy?: boolean
  lazyDelay?: number
  disabled?: boolean
}>(), {
  type: 'text',
  lazy: false,
  lazyDelay: 5000,
})

const emit = defineEmits<{
  update: [value: string | undefined | null]
}>()

const model = defineModel<string | undefined>({ required: true })

const tempValue = ref('')

let timeout: any

function stopTimeout() {
  clearTimeout(timeout)
}

onBeforeUnmount(stopTimeout)

watch(tempValue, (v) => {
  if (!props.lazy) {
    model.value = v
  }
  else if (props.lazyDelay > 0) {
    stopTimeout()
    timeout = setTimeout(() => model.value = v, props.lazyDelay)
  }
})

watch(() => model.value, v => tempValue.value = v ?? '', { immediate: true })

function lazyUpdate() {
  if (props.lazy) {
    stopTimeout()
    model.value = tempValue.value
  }
}

function doUpdate(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    tempValue.value = model.value ?? ''
  }
  emit('update', tempValue.value)
  if (event.key === 'Enter') {
    lazyUpdate()
  }
}
</script>

<template>
  <OuiFormItem :id="id" :title="title" :description="description" :required="required">
    <template v-if="$slots.start || $slots.end">
      <div class="oui-input oui-input-container" :disabled="disabled ? true : undefined">
        <slot name="start" />
        <input :id="id" v-model="tempValue" :type="type" v-bind="$attrs" :disabled="disabled ? true : undefined" @keypress="doUpdate" @blur="lazyUpdate">
        <slot name="end" />
      </div>
    </template>
    <template v-else>
      <input :id="id" v-model="tempValue" :type="type" class="oui-input oui-input-string" :disabled="disabled ? true : undefined" v-bind="$attrs" @keypress="doUpdate" @blur="lazyUpdate">
    </template>
  </OuiFormItem>
</template>
