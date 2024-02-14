<script lang="ts" setup>
import type { OuiMenuItem } from './_types'

const props = defineProps<{
  items: OuiMenuItem[]
  args?: any
  done?: (() => void) | undefined
}>()

const emit = defineEmits<{
  done: [item: OuiMenuItem]
}>()

async function doAction(item: OuiMenuItem) {
  setTimeout(() => {
    item?.action?.(item, ...(props.args ?? [])) // todo is that ok?
  }, 50)
  emit('done', item)
  props.done?.()
}
</script>

<template>
  <nav class="_menu" @contextmenu.stop.prevent="">
    <template v-for="(item, i) in items" :key="i">
      <a
        v-if="item.title"
        class="_menu_item"
        :class="{
          _menu_disabled: item.disabled === true,
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
</template>
