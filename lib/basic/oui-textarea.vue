<script lang="ts" setup>
import { useTextareaAutosize } from '@vueuse/core'
import { onBeforeUnmount, ref, watch } from 'vue'
import OuiFormItem from './oui-form-item.vue'

import './oui-form.styl'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<{
  title?: string
  description?: string
  required?: boolean
  id?: string
  autosize?: boolean
  lazy?: boolean
  lazyDelay?: number
  disabled?: boolean
}>(), {
  autosize: false,
  lazy: false,
  lazyDelay: 5000,
})

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

const { textarea } = props.autosize === true ? useTextareaAutosize({ input: model as any }) : { textarea: ref<HTMLTextAreaElement | null>(null) }
</script>

<template>
  <OuiFormItem :id="id" :title="title" :description="description" :required="required">
    <!-- Conditionally pass the title slot -->
    <template v-if="$slots.title" #title>
      <slot name="title" />
    </template>

    <!-- Conditionally pass the description slot -->
    <template v-if="$slots.description" #description>
      <slot name="description" />
    </template>

    <textarea :id="id" v-bind="$attrs" ref="textarea" v-model="tempValue" class="oui-textarea" :class="{ _autosize: props.autosize }" rows="6" @blur="lazyUpdate" />
  </OuiFormItem>
</template>
