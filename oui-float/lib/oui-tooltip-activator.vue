<script lang="ts" setup>
import { useEventListener } from '@vueuse/core'
import { ref } from 'vue'
import type { Placement } from '@floating-ui/vue'
import OuiFloat from './oui-float.vue'

defineOptions({
  inheritAttrs: false,
})

let _activated = false
let ignore = false

if (_activated)
  throw new Error('tw-tooltip-trigger can only be activated once')

_activated = true

const active = ref<boolean>(false)
const placement = ref<Placement>('top')
const reference = ref()
const text = ref('')

const delay = 600
let debounceTimer: any = 0

function onTooltipHover(ev: Event) {
  // log("onTooltipHover", ignore, ev)
  if (ignore)
    return

  clearTimeout(debounceTimer)
  let el: HTMLElement | null = ev.target as any

  // Check if we are still inside. If not, hide immediately
  let didLeave = true
  while (el != null && el?.tagName !== 'BODY') {
    const tooltip = el.getAttribute('tooltip')
    if (tooltip && tooltip?.length > 0) {
      if (el.isEqualNode(reference.value as any)) {
        didLeave = false
        break
      }
    }
    el = el.parentElement
  }

  if (didLeave)
    active.value = false

  el = ev.target as any

  // Show tooltip on rest with some delay
  debounceTimer = setTimeout(() => {
    while (el != null && el?.tagName !== 'BODY') {
      // let title = el.title
      // if (title) {
      //   el.setAttribute("tooltip", title)
      // }
      const tooltip = el.getAttribute('tooltip')
      if (tooltip && tooltip?.length > 0) {
        // el.title = ""
        reference.value = el
        text.value = tooltip?.toString()?.trim() || ''
        placement.value = el.getAttribute('tooltip-placement') || 'top' as any
        active.value = true
        return
      }
      el = el.parentElement
    }
    active.value = false
    reference.value = undefined
  }, delay) // debounce
}

function onTouchDown(ev: Event) {
  active.value = false
  ignore = true
}

function onTouchUp(ev: Event) {
  ignore = false
}

const useCapture = false

useEventListener(window, 'mouseover', onTooltipHover, useCapture)

// These are for handling touch events. Since mouseover comes AFTER touch events
// we use `mouseup` to finish the touch exception. We cannot generally set
// ignore on first touch, because these days devices may have mixed input
// useEventListener(window, "touchstart", onTouchDown, useCapture)
useEventListener(window, 'mousedown', onTouchDown, useCapture)
useEventListener(window, 'mouseup', onTouchUp, useCapture)

// useEventListener(window, "focus", onTooltipHover, useCapture)
</script>

<template>
  <OuiFloat
    v-model="active"
    :reference="reference"
    arrow
    :offset="6"
    class="oui-float oui-tooltip _tooltip"
    transition="oui-float-transition"
    :placement="placement"
  >
    {{ text }}
  </OuiFloat>
</template>
