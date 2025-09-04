<script lang="ts" setup generic="K">
import type { OuiSliderOption } from './_types'
import { useElementBounding, useResizeObserver } from '@vueuse/core'
import { computed, nextTick, onMounted, ref, watch } from 'vue'

import './oui-slider.styl'

const props = defineProps<{
  options: OuiSliderOption<K>[]
  className?: string
  sliderClass?: string
}>()

const model = defineModel<K>({ required: false })

const containerRef = ref<HTMLElement>()
const activeItemRef = ref<HTMLElement>()

const { update: updateActive, left: activeItemLeft, top: activeItemTop, width: activeItemWidth, height: activeItemHeight } = useElementBounding(activeItemRef)
const { update: updateContainer, left: containerLeft, top: containerTop } = useElementBounding(containerRef)

const relativeLeft = computed(() => activeItemLeft.value - containerLeft.value)
const relativeTop = computed(() => activeItemTop.value - containerTop.value)

const shouldAnimate = ref(false)
const isUserInteraction = ref(false)

const activeOption = ref<OuiSliderOption<K>>()
const sliderStyle = computed(() => ({
  left: `${relativeLeft.value}px`,
  width: `${activeItemWidth.value}px`,
  top: `${relativeTop.value}px`,
  height: `${activeItemHeight.value}px`,
}))

const computedSliderClass = computed(() => [
  '_slider',
  { '_no-animate': !shouldAnimate.value },
  { _hidden: !activeOption.value },
  props.sliderClass,
  activeOption.value?.sliderClass,
].filter(Boolean))

async function updateActiveItemRef(animated = false) {
  updateActive()
  updateContainer()

  activeOption.value = props.options.find(option => option.value === model.value)
  await nextTick()
  shouldAnimate.value = animated

  const activeItemEl = containerRef.value?.querySelector('._active')
  if (activeItemEl instanceof HTMLElement) {
    activeItemRef.value = activeItemEl
  }
}

watch(model, async () => {
  isUserInteraction.value = true
  await updateActiveItemRef(true)
  await nextTick()
  setTimeout(() => {
    isUserInteraction.value = false
  }, 250)
})

useResizeObserver(containerRef, () => updateActiveItemRef(isUserInteraction.value))

onMounted(() => updateActiveItemRef())

defineExpose({
  updateActiveItemRef,
})
</script>

<template>
  <div ref="containerRef" class="oui-slider" :class="className">
    <div :class="computedSliderClass" :style="sliderStyle" />
    <slot
      :options="options"
      :model-value="model"
      :active-option="activeOption"
      :update-model-value="(value: K) => model = value"
    />
  </div>
</template>
