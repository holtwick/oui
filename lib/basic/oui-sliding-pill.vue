<script lang="ts" setup generic="K extends string">
import type { OuiSlidingPillOption } from './_types'
import { useElementBounding, useResizeObserver } from '@vueuse/core'
import { computed, nextTick, onMounted, ref, watch } from 'vue'

import './oui-sliding-pill.styl'

const props = defineProps<{
  options: OuiSlidingPillOption<K>[]
  className?: string
  pillClass?: string
}>()

const modelValue = defineModel<K>({ required: false })

const containerRef = ref<HTMLElement>()
const activeItemRef = ref<HTMLElement>()

const { left: activeItemLeft, top: activeItemTop, width: activeItemWidth, height: activeItemHeight } = useElementBounding(activeItemRef)
const { left: containerLeft, top: containerTop } = useElementBounding(containerRef)

const relativeLeft = computed(() => activeItemLeft.value - containerLeft.value)
const relativeTop = computed(() => activeItemTop.value - containerTop.value)

const shouldAnimate = ref(false)
const isUserInteraction = ref(false)

const activeOption = ref<OuiSlidingPillOption<K>>()
const pillStyle = computed(() => ({
  left: `${relativeLeft.value}px`,
  width: `${activeItemWidth.value}px`,
  top: `${relativeTop.value}px`,
  height: `${activeItemHeight.value}px`,
}))

const computedPillClass = computed(() => [
  '_pill',
  { '_no-animate': !shouldAnimate.value },
  { _hidden: !activeOption.value },
  props.pillClass,
  activeOption.value?.pillClass,
].filter(Boolean))

async function updateActiveItemRef(animated = false) {
  activeOption.value = props.options.find(option => option.name === modelValue.value)
  await nextTick()
  shouldAnimate.value = animated

  const activeItemEl = containerRef.value?.querySelector('._active')
  if (activeItemEl instanceof HTMLElement) {
    activeItemRef.value = activeItemEl
  }
}

watch(modelValue, async () => {
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
  <div ref="containerRef" class="oui-sliding-pill" :class="className">
    <div :class="computedPillClass" :style="pillStyle" />
    <slot
      :options="options"
      :model-value="modelValue"
      :active-option="activeOption"
      :update-model-value="(value: K) => modelValue = value"
    />
  </div>
</template>
