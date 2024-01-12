<script lang="ts" setup>
import { type OffsetOptions, type Padding, type Placement, arrow as arrowMiddleware, autoUpdate, flip, offset, shift, size, useFloating } from '@floating-ui/vue'
import { onClickOutside, onKeyStroke } from '@vueuse/core'
import { computed, ref, watch } from 'vue'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<{
  name?: string
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
  float(): any
}>()

const active = defineModel<boolean>()

// Floating

const slotReference = ref()
const reference = computed<any>(() => slotReference.value)

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

onKeyStroke('Escape', e => doClose (e))
onClickOutside(floating, e => doClose())
</script>

<template>
  <component :is="$slots.float" ref="xxx" class="gfajkhdss" />
  <button
    ref="slotReference"
    v-bind="$attrs"
    @click.prevent.stop="active = !active"
    @contextmenu.prevent.stop="active = !active"
  >
    <slot />
  </button>
  <teleport to="body">
    <Transition :name="transition ?? `${name}-transition`">
      <div v-show="active" ref="floating" :style="floatingStyles" :class="name ?? 'oui-float'" class="_float">
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
          <slot name="float">
            Please define slot #float.
          </slot>
        </div>
      </div>
    </Transition>
  </teleport>
</template>
