<script lang="ts" setup>
import { autoUpdate, flip, offset, shift, size, useFloating } from '@floating-ui/vue'
import type { Ref } from 'vue'
import { computed, ref } from 'vue'

defineOptions({
  // name: 'CustomName',
  inheritAttrs: false,
  // customOptions: {},
})

const props = defineProps<{
  target: Ref<HTMLElement | undefined>
  transition?: string
  arrow?: boolean
  theme?: string
  placement?: string
}>()

// const emit = defineEmits([
//   'update:modelValue',
//   'close',
//   'unhandledClick',
//   'mousedown',
//   'mouseup',
// ])

const active = defineModel()

const floating = ref()

const placement = computed(() => props.placement ?? 'top')

// https://floating-ui.com/docs/vue
const { floatingStyles } = useFloating(props.target, floating, {
  placement: placement.value,
  whileElementsMounted: autoUpdate,
  middleware: [
    offset(0),
    size(),
    flip(),
    shift({
      padding: 16,
    }),
  ],
})
</script>

<template>
  <teleport to="body">
    <Transition :name="theme ?? 'popover'">
      <div
        v-show="active"
        ref="floating"
        :data-transition="transition"
        class="tw-popover"
        :class="[`-${theme}`]"
        :aria-hidden="!(active)"
        draggable="false"
      >
        <div
          v-show="arrow"
          id="arrow"
          class="tw-popover-arrow"
          :class="`-${theme}-arrow`"
          data-popper-arrow
          :style="floatingStyles"
        />
        <div class="tw-popover-inner" :class="`-${theme}-inner`">
          <slot />
        </div>
      </div>
    </Transition>
  </teleport>
</template>
