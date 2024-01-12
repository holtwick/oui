<script lang="ts" setup>
import type { Ref } from 'vue'
import type { OuiMenuItem } from './_types'
import OuiFloat from './oui-float.vue'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<{
  items: OuiMenuItem[]
  reference: Ref<HTMLElement | undefined>
  args?: any
  done?: (() => void) | undefined
}>()

async function doAction(item: OuiMenuItem) {
  item?.action?.(item, ...(props.args ?? []))
  props.done?.()
}
</script>

<template>
  <OuiFloat
    :reference="reference"
    placement="bottom-start"
    :offset="4"
    @close="done?.()"
  >
    <div class="_menu" @contextmenu.stop.prevent="">
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
    </div>
  </OuiFloat>
</template>
