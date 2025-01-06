<script lang="ts" setup>
import { type InputTypeHTMLAttribute, onBeforeUnmount, ref, watch } from 'vue'
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
  type?: InputTypeHTMLAttribute // 'text' | 'url' | 'email' | 'tel' | 'search'
  id?: string
  lazy?: boolean
  lazyDelay?: number
}>(), {
  type: 'text',
  lazyDelay: 1000,
})

const model = defineModel<string | undefined>({ required: true })

const value = ref('')

let timeout: any

function stopTimeout() {
  clearTimeout(timeout)
}

onBeforeUnmount(stopTimeout)

watch(value, (v) => {
  if (!props.lazy) {
    model.value = v
  }
  else if (props.lazyDelay > 0) {
    stopTimeout()
    timeout = setTimeout(() => model.value = v, props.lazyDelay)
  }
})

watch(() => model.value, v => value.value = v ?? '', { immediate: true })

function lazyUpdate() {
  if (props.lazy) {
    stopTimeout()
    model.value = value.value
  }
}
</script>

<template>
  <OuiFormItem
    :id="id"
    :title="title"
    :description="description"
    :required="required"
  >
    <template v-if="$slots.start || $slots.end">
      <div class="oui-input oui-input-container" :disabled="$attrs.disabled">
        <slot name="start" />
        <input
          :id="id"
          v-model="value"
          :type="type"
          v-bind="$attrs"
          @blur="lazyUpdate"
          @keypress.enter="lazyUpdate"
        >
        <slot name="end" />
      </div>
    </template>
    <template v-else>
      <input
        :id="id"
        v-model="value"
        :type="type"
        class="oui-input oui-input-string"
        v-bind="$attrs"
        @blur="lazyUpdate"
        @keypress.enter="lazyUpdate"
      >
    </template>
  </OuiFormItem>
</template>
