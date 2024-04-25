import { useEventListener } from '@vueuse/core'
import type { Ref } from 'vue'
import { onMounted, ref } from 'vue'
import { Logger } from 'zeed'
import { useWindowResize } from './window-resize'

const log = Logger('sep', globalThis.debugUI ?? false)

interface SeparatorState {
  value: number
  startValue: number
  pageX: number
  pageY: number
  deltaX: number
  deltaY: number
  minValue: number
  maxValue: number
}

export function useSeparator(
  el: Ref<HTMLElement>,
  value: Ref<number>,
  opt: {
    vertical?: boolean
    minValue?: number
    maxValue?: number
    reverse?: boolean
    calcElementSize?: (info: SeparatorState) => number
  } = {},
) {
  const dragging = ref(false)
  const collapsed = ref(false)
  let startX = 0
  let startY = 0
  const deltaX = ref(0)
  const deltaY = ref(0)
  let startValue = value.value ?? 0

  const {
    vertical = false,
    reverse = false,
    minValue = 0,
    maxValue = Number.POSITIVE_INFINITY,
    calcElementSize = (info) => {
      let delta = vertical ? info.deltaY : info.deltaX
      if (reverse)
        delta = -1 * delta
      return Math.max(minValue, Math.min(maxValue, info.startValue + delta))
    },
  } = opt

  let lastSeparatorState: SeparatorState = {
    startValue,
    deltaX: deltaX.value,
    deltaY: deltaY.value,
    pageX: 0,
    pageY: 0,
    value: value?.value ?? 0,
    minValue,
    maxValue,
  }

  function cancelEvent(e: MouseEvent) {
    log('sep cancel')
    e?.stopPropagation()
    e?.preventDefault()
  }

  function onMouseDown(e: MouseEvent) {
    const { pageX, pageY } = e
    dragging.value = true
    startX = pageX
    startY = pageY
    startValue = value?.value || 0
    // document.body.style.userSelect = "none"
    // document.body.style.webkitUserSelect = "none"
    bindEvents()
    return cancelEvent(e)
  }

  function onMouseMove(e: MouseEvent) {
    if (!dragging.value)
      return
    const { pageX, pageY } = e
    deltaX.value = pageX - startX
    deltaY.value = pageY - startY
    if (value) {
      lastSeparatorState = {
        ...lastSeparatorState,
        startValue,
        deltaX: deltaX.value,
        deltaY: deltaY.value,
        pageX,
        pageY,
        value: value.value,
      }
      const size = calcElementSize(lastSeparatorState)
      value.value = size
    }
    return cancelEvent(e)
  }

  function onMouseUp(e: MouseEvent) {
    dragging.value = false
    // document.body.style.userSelect = "auto"
    // document.body.style.webkitUserSelect = "auto"
    unbindEvents()
    return cancelEvent(e)
  }

  function onDblClick() {
    collapsed.value = !collapsed.value
  }

  const mouseOptions = { passive: false }

  useEventListener(el, 'mousedown', onMouseDown)
  useEventListener(el, 'touchdown', onMouseDown)
  useEventListener(el, 'dblclick', onDblClick)

  let docListeners: any[] = []

  // https://github.com/antoniandre/splitpanes/blob/master/src/components/splitpanes/splitpanes.vue
  function bindEvents() {
    docListeners = [
      useEventListener(document, 'mousemove', onMouseMove, mouseOptions),
      useEventListener(document, 'mouseup', onMouseUp),
      useEventListener(document, 'touchmove', onMouseMove, mouseOptions),
      useEventListener(document, 'touchend', onMouseUp),
    ]
  }

  function unbindEvents() {
    docListeners.forEach(stop => stop())
    docListeners = []
  }

  function recalc() {
    value.value = calcElementSize(lastSeparatorState)
  }

  useWindowResize(recalc)
  onMounted(recalc)

  return {
    dragging,
    collapsed,
    deltaX,
    deltaY,
    recalc,
  }
}
