<script lang="ts" setup>
import { type OffsetOptions, type Padding, type Placement, arrow as arrowMiddleware, autoUpdate, flip, offset, shift, size, useFloating } from '@floating-ui/vue'
import type { Ref } from 'vue'
import { computed, ref, useAttrs, watch } from 'vue'
import { onClickOutside, onKeyStroke } from '@vueuse/core'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<{
  reference: Ref<HTMLElement | undefined>
  transition?: string
  placement?: Placement
  arrow?: boolean
  offset?: OffsetOptions
  padding?: Padding
  close?: boolean
}>()

const emit = defineEmits(['close'])

defineSlots<{
  default(): any
  click(): any
}>()

const active = defineModel<boolean>()

// Floating

const slotReference = ref()
const reference = computed<any>(() => slotReference.value ?? props.reference)

const floating = ref()
const floatingArrow = ref()

const placement = computed<Placement>(() => props.placement ?? 'top')

// https://floating-ui.com/docs/vue
const { floatingStyles, middlewareData, placement: placementActual } = useFloating(reference, floating, {
  placement,
  whileElementsMounted: autoUpdate,
  middleware: [
    offset(props.offset ?? 0),
    size(),
    flip(),
    shift({
      padding: props.padding ?? 16,
    }),
    arrowMiddleware({
      element: floatingArrow,
    }),
  ],
})

// Close

watch(active, (v) => {
  if (v === false)
    emit('close')
})

function doClose(e?: Event) {
  if (props.close && active.value) {
    e?.preventDefault()
    e?.stopPropagation()
    active.value = false
  }
}

onKeyStroke('Escape', doClose)
onClickOutside(floating, doClose)

// Name

const attrs = useAttrs()
const name = computed(() => String(attrs.class || 'oui-modal').split(/\s+/gim)?.[0])
</script>

<template>
  <template v-if="$slots.click">
    <div
      ref="slotReference"
      style="display: inline-block"
      @click.prevent.stop="active = !active"
      @contextmenu.prevent.stop="active = !active"
    >
      <slot name="click" />
    </div>
  </template>
  <teleport to="body">
    <Transition :name="transition ?? `${name}-transition`">
      <div v-show="active" ref="floating" :style="floatingStyles" :class="$attrs.class || 'oui-float'" v-bind="$attrs" class="_float">
        <div
          v-show="arrow ?? false"
          ref="floatingArrow"
          class="_float_arrow"
          :class="`_float_arrow_${placementActual}`"
          :style="{
            position: 'absolute',
            left: middlewareData.arrow?.x != null ? `${middlewareData.arrow.x}px` : '',
            top: middlewareData.arrow?.y != null ? `${middlewareData.arrow.y}px` : '',
          }"
        />
        <div class="_float_inner">
          <slot />
        </div>
      </div>
    </Transition>
  </teleport>
</template>
