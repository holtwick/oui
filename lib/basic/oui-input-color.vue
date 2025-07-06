<script lang="ts" setup>
import type { LoggerInterface } from 'zeed'
import { computed, onUnmounted, ref, watch } from 'vue'
import { Logger } from 'zeed'
import OuiInput from './oui-input.vue'

import './oui-input-color.styl'

// defineOptions({
//   inheritAttrs: false,
// })

const props = defineProps<{
  lazy?: boolean
  disabled?: boolean
}>()

const log: LoggerInterface = Logger('oui-input-color')

const model = defineModel<string | undefined>({ required: true, default: '' })
const colorInput = ref()
const tempValue = ref<string>(model.value ?? '')
const colorTestElement = ref<HTMLElement>()

function rgbToHex(rgb: string): string {
  // Parse rgb/rgba color to hex
  const match = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/)
  if (!match)
    return rgb

  const r = Number.parseInt(match[1])
  const g = Number.parseInt(match[2])
  const b = Number.parseInt(match[3])

  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
}

const normalizedColor = computed(() => {
  const parsed = parseColor(tempValue.value)
  if (!parsed)
    return '#aaaaaa' // Default color if parsing fails
  return parsed
})

function parseColor(colorString: string): string | undefined {
  if (!colorString?.trim())
    return

  // Create a temporary element if it doesn't exist
  if (!colorTestElement.value) {
    colorTestElement.value = document.createElement('div')
    colorTestElement.value.style.display = 'none'
    colorTestElement.value.style.position = 'absolute'
    colorTestElement.value.style.left = '-9999px'
    document.body.appendChild(colorTestElement.value)
  }

  // Clear any previous color
  colorTestElement.value.style.color = 'rgba(0, 0, 0, 0.5)'

  try {
    // Try to set the color
    colorTestElement.value.style.color = colorString.trim()

    // Get the computed color (this will be in rgb/rgba format)
    const computedColor = window.getComputedStyle(colorTestElement.value).color

    log('Computed color:', computedColor)

    // If the color was invalid, it will be empty or transparent
    if (!computedColor || computedColor === 'rgba(0, 0, 0, 0)' || computedColor === 'rgba(0, 0, 0, 0.5)' || computedColor === 'transparent') {
      return
    }

    return rgbToHex(computedColor)
  }
  catch (error) {
    log('Error parsing color:', error)
  }
}

function finalizeModelValue() {
  model.value = parseColor(tempValue.value)
  tempValue.value = model.value ?? ''
}

function onColorPickerChange(event: Event) {
  const target = event.target as HTMLInputElement
  tempValue.value = target.value
  finalizeModelValue()
}

// Cleanup the test element when component is unmounted
onUnmounted(() => {
  if (colorTestElement.value && colorTestElement.value.parentNode) {
    colorTestElement.value.parentNode.removeChild(colorTestElement.value)
  }
})

const focus = ref(false)

watch(model, (value) => {
  if (focus.value)
    return
  tempValue.value = value ?? ''
})

watch(tempValue, (value) => {
  if (props.lazy)
    return
  model.value = parseColor(value)
})
</script>

<template>
  <OuiInput v-model="tempValue" :lazy="false" :disabled="disabled" class="oui-input-color-container" @keypress.enter="finalizeModelValue" @blur="focus = false; finalizeModelValue()" @focus="focus = true">
    <template #start>
      <div class="oui-input-color" :style="{ '--color-value': normalizedColor }">
        <input ref="colorInput" :value="normalizedColor" type="color" tabindex="-1" @input="onColorPickerChange">
      </div>
    </template>
  </OuiInput>
  <div>
    {{ counter }} {{ model }} {{ tempValue }} {{ normalizedColor }}
  </div>
</template>
