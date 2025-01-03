<script lang="ts" setup generic="K extends string">
import type { OuiTab } from './_types'
import { useElementBounding, useElementSize } from '@vueuse/core'
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import './oui-tabs.styl'

const props = defineProps<{
  tabs: OuiTab<K>[]
  className?: string
}>()

const modelValue = defineModel<K>({ required: false })

const name = computed<string>(() => modelValue.value ?? props.tabs?.[0]?.name ?? 'default')

const tabsRef = ref<HTMLElement>()
const activeTabRefs = ref<HTMLElement>()

const activeTabLeft = ref(0)
const activeTabTop = ref(0)
const activeTabWidth = ref(0)
const activeTabHeight = ref(0)

// const { x, y, width, height } = useElementBounding(activeTabRefs)

function setActiveTab() {
  const activeTab = tabsRef.value?.querySelector('._active')
  if (activeTab instanceof HTMLElement) {
    activeTabLeft.value = activeTab.offsetLeft
    activeTabTop.value = activeTab.offsetTop
    activeTabWidth.value = activeTab.offsetWidth
    activeTabHeight.value = activeTab.offsetHeight
  }
}

watch(modelValue, async () => {
  await nextTick()
  setActiveTab()
})

onMounted(setActiveTab)
</script>

<template>
  <div ref="tabsRef" class="oui-tabs">
    <nav class="oui-tabs-nav _nav">
      <div class="_pill" :style="{ left: `${activeTabLeft}px`, width: `${activeTabWidth}px`, top: `${activeTabTop}px`, height: `${activeTabHeight}px` }" />
      <template v-for="tab in tabs" :key="tab.name">
        <button
          ref="tabRefs"
          :class="{ _active: modelValue === tab.name }"
          @click="modelValue = tab.name"
        >
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
