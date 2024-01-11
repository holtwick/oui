<script lang="ts" setup>
import { type Placement, autoUpdate, flip, offset, shift, size, useFloating } from '@floating-ui/vue'
import type { Ref } from 'vue'
import { computed, ref } from 'vue'

const props = defineProps<{
  reference: Ref<HTMLElement | undefined>
  transition?: string
  placement?: Placement
}>()

const active = defineModel<boolean>()

const placement = computed<Placement>(() => props.placement ?? 'top')
const reference = computed<any>(() => props.reference)

const floating = ref()

// https://floating-ui.com/docs/vue
const { floatingStyles } = useFloating(reference, floating, {
  placement,
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
    <Transition :name="transition ?? 'oui-float-transition'">
      <div v-show="active" ref="floating" :style="floatingStyles">
        <slot />
      </div>
    </Transition>
  </teleport>
</template>
