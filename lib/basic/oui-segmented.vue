<script lang="ts" setup generic="K extends string">
import type { OuiSegmentedOption } from './_types'
import { computed, onMounted, ref } from 'vue'
import { t } from '@/basic/i18n'
import OuiSlider from './oui-slider.vue'

import './oui-form.styl'
import './oui-segmented.styl'

const props = defineProps<{
  options: OuiSegmentedOption<K>[]
  className?: string
  placeholder?: string
  disabled?: boolean
  error?: boolean
  size?: 'md' | 'lg'
}>()

const modelValue = defineModel<K>({ required: false })

const containerRef = ref<HTMLElement>()

// Ensure we have a default value if none is set
onMounted(() => {
  if (!modelValue.value && props.options.length > 0) {
    modelValue.value = props.options[0].name
  }
})

const computedClass = computed(() => [
  'oui-segmented',
  props.className,
  {
    _error: props.error,
    [`_size-${props.size || 'md'}`]: true,
  },
])

const activeOption = computed(() =>
  props.options.find(option => option.name === modelValue.value),
)

const displayValue = computed(() =>
  activeOption.value?.title || activeOption.value?.name || props.placeholder || t('Select option', 'oui.segmented.placeholder'),
)

function handleKeydown(event: KeyboardEvent) {
  if (props.disabled)
    return

  const currentIndex = modelValue.value ? props.options.findIndex(option => option.name === modelValue.value) : -1
  let newIndex = currentIndex

  switch (event.key) {
    case 'ArrowLeft':
    case 'ArrowUp':
      event.preventDefault()
      if (currentIndex > 0) {
        newIndex = currentIndex - 1
      }
      else if (currentIndex === -1) {
        newIndex = props.options.length - 1
      }
      else {
        newIndex = props.options.length - 1
      }
      break
    case 'ArrowRight':
    case 'ArrowDown':
      event.preventDefault()
      if (currentIndex < props.options.length - 1) {
        newIndex = currentIndex + 1
      }
      else if (currentIndex === -1) {
        newIndex = 0
      }
      else {
        newIndex = 0
      }
      break
    case 'Home':
      event.preventDefault()
      newIndex = 0
      break
    case 'End':
      event.preventDefault()
      newIndex = props.options.length - 1
      break
  }

  if (newIndex !== currentIndex && newIndex >= 0 && newIndex < props.options.length) {
    modelValue.value = props.options[newIndex].name
  }
}

const disabledConform = computed(() => {
  return props.disabled ? true : undefined
})
</script>

<template>
  <div ref="containerRef" class="oui-input oui-segmented" :class="computedClass" tabindex="0" role="radiogroup" :disabled="disabledConform" @keydown="handleKeydown">
    <OuiSlider v-model="modelValue" :options="options" class="oui-segmented-container" slider-class="oui-segmented-slider">
      <template #default="{ options: slidingOptions, updateModelValue }">
        <template v-for="option in slidingOptions" :key="option.name">
          <button :class="{ _active: modelValue === option.name }" :disabled="disabledConform" role="radio" :aria-checked="modelValue === option.name" :aria-label="option.title || option.name" tabindex="-1" @click="updateModelValue(option.name)">
            <slot :name="`option-${option.name}`" v-bind="{ option }">
              <template v-if="option.icon">
                <component :is="option.icon" v-if="typeof option.icon !== 'string'" />
                <span v-else v-text="option.icon" />
              </template>
              {{ option.title ?? option.name }}
            </slot>
          </button>
        </template>
      </template>
    </OuiSlider>
  </div>
</template>
