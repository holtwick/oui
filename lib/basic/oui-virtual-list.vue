<script lang="ts" setup generic="K extends string, T extends Record<K, any>">
// Derived from https://github.com/waningflow/vue3-virtual-list
// Which is under MIT License https://github.com/waningflow/vue3-virtual-list/blob/master/package.json#L11

import { onMounted, ref, toRefs, watch } from 'vue'
import { px } from './lib'
// import { bus, useOnBus } from '@/protocol'

import './oui-virtual-list.styl'

const props = withDefaults(defineProps<{
  data: T[]
  rowHeight?: number
  rowBuffer?: number
  scrollToEnd?: boolean
}>(), {
  rowHeight: 20,
  rowBuffer: 5,
  scrollToEnd: false,
})

const { data, rowBuffer, rowHeight } = toRefs(props)
const root = ref<HTMLElement>()
const margin = /* props.margin ?? */ 0
const poolSteps = Math.ceil(rowBuffer.value / 10) * 2
const scrollHeight = ref(data.value.length * rowHeight.value + 2 * margin)
const indexFirst = ref(0)
const indexLast = ref(0)
const paddingTop = ref(margin)

let containerSize = 0
let isScrollBusy = false
let lastScrollX = 0

function handleScroll() {
  if (!root.value)
    return

  const scrollLeft = root.value.scrollLeft
  if (scrollLeft !== lastScrollX)
    lastScrollX = scrollLeft
    // bus.emit('updateScroll', scrollLeft)

  if (isScrollBusy)
    return

  isScrollBusy = true

  requestAnimationFrame(() => {
    isScrollBusy = false
    if (!root.value)
      return
    const range: number[] = []

    range[0] = Math.floor(root.value.scrollTop / rowHeight.value) - Math.floor(rowBuffer.value / 2)
    range[0] = Math.max(range[0], 0)

    range[1] = range[0] + Math.floor(root.value.clientHeight / rowHeight.value) + rowBuffer.value
    range[1] = Math.min(Math.ceil(range[1] / poolSteps) * poolSteps, data.value.length) // don't update too often

    range[0] = Math.max(Math.floor(range[0] / poolSteps) * poolSteps, 0)

    indexFirst.value = range[0]
    indexLast.value = range[1]
    paddingTop.value = range[0] * rowHeight.value + margin
  })
}

watch(data, (cData) => {
  scrollHeight.value = cData.length * rowHeight.value
})

watch(rowHeight, (cRowHeight) => {
  scrollHeight.value = data.value.length * cRowHeight
})

watch(() => data.value.length, handleScroll)

// useOnBus('listScrollTop', () => {
//   if (root.value)
//     root.value.scrollTop = 0
//   handleScroll()
// })

function scrollToEnd() {
  if (root.value) {
    if (props.scrollToEnd)
      root.value.scrollTop = scrollHeight.value
    else
      root.value.scrollTop = 0
  }
}

watch(() => props.scrollToEnd, scrollToEnd)

onMounted(() => {
  if (!root.value)
    return
  containerSize = root.value.clientHeight
  const contentLines = Math.ceil(containerSize / rowHeight.value)
  const totalLines = contentLines + rowBuffer.value
  const range = [0, totalLines]
  indexFirst.value = range[0]
  indexLast.value = range[0] + range[1]
  scrollToEnd()
})
</script>

<template>
  <div ref="root" class="oui-virtual-list" @scroll.passive="handleScroll">
    <div :style="`height: ${px(scrollHeight)}; padding-top: ${px(paddingTop)}`">
      <template v-for="(item, index) in data.slice(indexFirst, indexLast)" :key="indexFirst + index">
        <div :style="{ height: `${px(rowHeight)}` }">
          <slot :item="item" :index="indexFirst + index">
            Placeholder {{ index }}
          </slot>
        </div>
      </template>
    </div>
  </div>
</template>
