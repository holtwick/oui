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

const {
  update: updateActive,
  left: activeItemLeft,
  top: activeItemTop,
  width: activeItemWidth,
  height: activeItemHeight,
} = useElementBounding(activeItemRef)

const {
  update: updateContainer,
  left: containerLeft,
  top: containerTop,
} = useElementBounding(containerRef)

const relativeLeft = computed(() => activeItemLeft.value - containerLeft.value)
const relativeTop = computed(() => activeItemTop.value - containerTop.value)

// Animation and state management
const shouldAnimate = ref(false)
const isUserInteraction = ref(false)
const hadPreviousActiveElement = ref(false)
const isAnimating = ref(false)

// Animation target values (locked during animation)
const animationTargetLeft = ref(0)
const animationTargetTop = ref(0)
const animationTargetWidth = ref(0)
const animationTargetHeight = ref(0)

// Active option computed from model value
const activeOption = computed(() =>
  props.options.find(option => option.value === model.value),
)

// Transform-based slider positioning and styling
const sliderStyle = computed(() => ({
  transform: `translate(${isAnimating.value ? animationTargetLeft.value : relativeLeft.value}px, ${isAnimating.value ? animationTargetTop.value : relativeTop.value}px)`,
  width: `${isAnimating.value ? animationTargetWidth.value : activeItemWidth.value}px`,
  height: `${isAnimating.value ? animationTargetHeight.value : activeItemHeight.value}px`,
}))

const computedSliderClass = computed(() => [
  '_slider',
  { '_no-animate': !shouldAnimate.value },
  { _hidden: !activeOption.value },
  props.sliderClass,
  activeOption.value?.sliderClass,
].filter(Boolean))

// Update active item reference and positioning
async function updateActiveItemRef(animated = false) {
  updateActive()
  updateContainer()

  await nextTick()

  const activeItemEl = containerRef.value?.querySelector('._active')
  if (activeItemEl instanceof HTMLElement) {
    activeItemRef.value = activeItemEl

    // Wait for element bounding to update
    await nextTick()
    updateActive()
    updateContainer()

    if (animated) {
      // Lock target values for animation
      isAnimating.value = true
      animationTargetLeft.value = relativeLeft.value
      animationTargetTop.value = relativeTop.value
      animationTargetWidth.value = activeItemWidth.value
      animationTargetHeight.value = activeItemHeight.value
    }
  }

  shouldAnimate.value = animated
}

// Watch for model changes and handle animation
watch(model, async () => {
  isUserInteraction.value = true

  // Only animate if there was a previous active element
  const shouldAnimateTransition = hadPreviousActiveElement.value
  await updateActiveItemRef(shouldAnimateTransition)

  // Update the flag for future transitions
  hadPreviousActiveElement.value = !!model.value

  await nextTick()

  // Reset user interaction flag and unlock animation values after animation completes
  setTimeout(() => {
    isUserInteraction.value = false
    isAnimating.value = false // Unlock values to allow reactive updates
  }, 250)
})

// Handle resize events
useResizeObserver(containerRef, () => updateActiveItemRef(isUserInteraction.value))

// Initialize on mount
onMounted(() => {
  updateActiveItemRef()
  hadPreviousActiveElement.value = !!model.value
  isAnimating.value = false // Ensure we start in non-animating state
})

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
