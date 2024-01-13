<script lang="ts" setup>
import type { Placement } from '@floating-ui/vue'
import type { Ref } from 'vue'
import type { OuiMenuItem } from './_types'
import OuiFloat from './oui-float.vue'

// defineOptions({
//   inheritAttrs: false,
// })

const props = defineProps<{
  items: OuiMenuItem[]
  reference: Ref<HTMLElement | undefined>
  placement?: Placement
  args?: any
  done?: (() => void) | undefined
}>()

const active = defineModel({ default: true })

async function doAction(item: OuiMenuItem) {
  item?.action?.(item, ...(props.args ?? []))
  props.done?.()
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
    <nav class="_menu" @contextmenu.stop.prevent="">
      <template v-for="(item, i) in items" :key="i">
        <a
          v-if="item.title"
          class="_menu_item"
          :class="{
            _menu_checked_possible: item.checked != null,
            _menu_checked: typeof item.checked === 'function' ? item.checked(item) : !!item.checked,
          }"
          :data-test-menu="item.title"
          @pointerup="doAction(item)"
        >
          {{ item.title }}
        </a>
        <hr v-else class="_menu_separator">
      </template>
    </nav>
  </OuiFloat>
</template>
