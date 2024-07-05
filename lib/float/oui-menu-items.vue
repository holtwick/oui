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

const active = defineModel({ default: true })

async function doAction(item: OuiMenuItem) {
  if (item?.action) {
    setTimeout(() => {
      item?.action?.(item, ...(props.args ?? [])) // todo is that ok?
      emit('done', item)
      if (item.close !== false)
        active.value = false
      props.done?.()
    }, 50)
  }
}
</script>

<template>
  <nav class="_menu" @contextmenu.stop.prevent="">
    <template v-for="(item, i) in items" :key="i">
      <template v-if="item.title">
        <a
          class="_menu_item"
          :class="{
            _menu_disabled: item.disabled === true,
            _menu_checked_possible: item.checked != null,
            _menu_checked: typeof item.checked === 'function' ? item.checked(item) : !!item.checked,
          }"
          :href="item.url"
          :data-test-menu="item.title"
          :target="item.url?.includes('://') ? '_blank' : undefined"
          @pointerup="doAction(item)"
        >
          {{ item.title }}
        </a>
      </template>
      <template v-else>
        <hr class="_menu_separator">
      </template>
    </template>
  </nav>
</template>
