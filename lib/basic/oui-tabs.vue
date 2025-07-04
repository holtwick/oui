<script lang="ts" setup generic="K extends string">
import type { OuiTab } from './_types'
import { useElementBounding, useResizeObserver } from '@vueuse/core'
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import './oui-tabs.styl'

const props = defineProps<{
  tabs: OuiTab<K>[]
  className?: string
}>()

const modelValue = defineModel<K>({ required: false })

const name = computed<string>(() => modelValue.value ?? props.tabs?.[0]?.name ?? 'default')

const tabsRef = ref<HTMLElement>()
const activeTabRef = ref<HTMLElement>()

const { left: activeTabLeft, top: activeTabTop, width: activeTabWidth, height: activeTabHeight } = useElementBounding(activeTabRef)
const { left: containerLeft, top: containerTop } = useElementBounding(tabsRef)

const relativeLeft = computed(() => activeTabLeft.value - containerLeft.value)
const relativeTop = computed(() => activeTabTop.value - containerTop.value)

const shouldAnimate = ref(false)
const isUserInteraction = ref(false)

const activeTab = ref() //  computed(() => props.tabs.find(tab => tab.name === modelValue.value))
const pillStyle = computed(() => ({
  left: `${relativeLeft.value}px`,
  width: `${activeTabWidth.value}px`,
  top: `${relativeTop.value}px`,
  height: `${activeTabHeight.value}px`,
}))
const pillClass = computed(() => (activeTab.value as any)?.pillClass)

async function updateActiveTabRef(animated = false) {
  activeTab.value = props.tabs.find(tab => tab.name === modelValue.value)
  await nextTick()
  shouldAnimate.value = animated
  const activeTabEl = tabsRef.value?.querySelector('._active')
  if (activeTabEl instanceof HTMLElement) {
    activeTabRef.value = activeTabEl
  }
}

watch(modelValue, async () => {
  isUserInteraction.value = true
  await updateActiveTabRef(true)
  // Reset user interaction flag after animation completes
  await nextTick()
  setTimeout(() => {
    isUserInteraction.value = false
  }, 250)
})

useResizeObserver(tabsRef, () => updateActiveTabRef(isUserInteraction.value))

onMounted(() => updateActiveTabRef())
</script>

<template>
  <div ref="tabsRef" class="oui-tabs">
    <nav class="oui-tabs-nav _nav">
      <div class="_pill" :class="[{ '_no-animate': !shouldAnimate }, pillClass]" :style="pillStyle" />
      <template v-for="tab in tabs" :key="tab.name">
        <button ref="tabRefs" :class="{ _active: modelValue === tab.name }" @click="modelValue = tab.name">
          <template v-if="tab.icon">
            <component :is="tab.icon" />
          </template>
          {{ tab.title ?? tab.name }}
        </button>
      </template>
      <!-- <div class="ogrow" /> -->
    </nav>

    <div>
      <slot :key="name" :name="name">
        <slot />
      </slot>
    </div>
  </div>
</template>
