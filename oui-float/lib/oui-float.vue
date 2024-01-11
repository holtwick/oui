<script lang="ts" setup>
import { type Placement, arrow, autoUpdate, flip, offset, shift, size, useFloating } from '@floating-ui/vue'
import type { Ref } from 'vue'
import { computed, ref } from 'vue'

const props = defineProps<{
  reference: Ref<HTMLElement | undefined>
  transition?: string
  placement?: Placement
  arrow?: boolean
  class?: string
}>()

defineSlots<{
  default(): any
  click(): any
}>()

const active = defineModel<boolean>()

const slotReference = ref()
const reference = computed<any>(() => slotReference.value ?? props.reference)

const floating = ref()
const floatingArrow = ref()

const placement = computed<Placement>(() => props.placement ?? 'top')
const className = computed(() => props.class ?? 'oui-float')

// https://floating-ui.com/docs/vue
const { floatingStyles, middlewareData } = useFloating(reference, floating, {
  placement,
  whileElementsMounted: autoUpdate,
  middleware: [
    offset(0),
    size(),
    flip(),
    shift({
      padding: 16,
    }),
    arrow({
      element: floatingArrow,
    }),
  ],
})
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
    <Transition :name="transition ?? `${className}-transition`">
      <div v-show="active" ref="floating" :style="floatingStyles" :class="className" class="_float">
        <div
          ref="floatingArrow"
          class="_float_arrow"
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
