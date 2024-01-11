<script lang="ts" setup>
import { type Placement, arrow, autoUpdate, flip, offset, shift, size, useFloating } from '@floating-ui/vue'
import type { Ref } from 'vue'
import { computed, ref } from 'vue'

const props = defineProps<{
  reference: Ref<HTMLElement | undefined>
  transition?: string
  placement?: Placement
  arrow?: boolean
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

// https://floating-ui.com/docs/vue
const { floatingStyles, middlewareData } = useFloating(reference, floating, {
  placement,
  whileElementsMounted: autoUpdate,
  middleware: [
    offset(8),
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
    <Transition :name="transition ?? `${String($attrs.class || 'oui-float').split(' ')?.[0]}-transition`">
      <div v-show="active" ref="floating" :style="floatingStyles" v-bind="$attrs" class="_float">
        <div
          ref="floatingArrow"
          class="_float_arrow"
          :class="`_float_arrow_${placement}`"
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
