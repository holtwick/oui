<script lang="ts" setup>
import type { Placement } from '@floating-ui/vue'
import type { Ref } from 'vue'
import type { OuiMenuItem } from './_types'
import OuiFloat from './oui-float.vue'
import OuiMenuItems from './oui-menu-items.vue'

defineProps<{
  items: OuiMenuItem[]
  reference: Ref<HTMLElement | undefined>
  placement?: Placement
  args?: any
  done?: (() => void) | undefined
}>()

const active = defineModel({ default: true })

function onDone(item: OuiMenuItem) {
  if (item.close !== false)
    active.value = false
}
</script>

<template>
  <OuiFloat
    v-model="active"
    class="oui-menu"
    :reference="reference"
    :placement="placement ?? 'bottom-start'"
    :offset="4"
    close
    @close="done?.()"
  >
    <OuiMenuItems
      v-model="active"
      :items="items"
      :args="args"
      :done="done"
      @done="onDone"
    />
  </OuiFloat>
</template>
