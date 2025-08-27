<script lang="ts" setup>
import type { Ref } from 'vue'
import type { LoggerInterface } from 'zeed'
import type { OuiMenuItem } from './_types'
import { computed, ref } from 'vue'
import { Logger } from 'zeed'
import OuiFloat from './oui-float.vue'

const props = defineProps<{
  items: OuiMenuItem[]
  args?: any
  done?: (() => void) | undefined
}>()

const emit = defineEmits<{
  done: [item: OuiMenuItem]
}>()

const log: LoggerInterface = Logger('oui-menu-items')

const active = defineModel({ default: true })

const submenuActive = ref<Record<number, boolean>>({})
const submenuRefs = ref<Record<number, Ref<HTMLElement>>>({})

// Computed property for better performance
const checkedItems = computed(() => {
  return props.items.map((item) => {
    if (typeof item.checked === 'function') {
      return item.checked(item)
    }
    return !!item.checked
  })
})

function handleItemAction(item: OuiMenuItem, index: number) {
  if (item.disabled) {
    log.info('item is disabled, ignoring action')
    return
  }

  if (item.submenu) {
    toggleSubmenu(index)
  }
  else {
    doAction(item)
  }
}

function doAction(item: OuiMenuItem) {
  log.info('doAction called', item)

  if (item?.action) {
    try {
      item.action(item, ...(props.args ?? []))
      log.info('action executed successfully')
    }
    catch (error) {
      log.error('action execution failed', error)
    }
  }

  // Always emit done and close menu
  log.info('emitting done and closing menu')
  emit('done', item)
  if (item.close !== false) {
    active.value = false
  }
  props.done?.()
}

function onSubmenuDone(item: OuiMenuItem) {
  log.info('onSubmenuDone called', { item, title: item?.title })
  emit('done', item)
  if (item.close !== false) {
    active.value = false
  }
  props.done?.()
}

function setSubmenuRef(index: number) {
  return (el: HTMLElement | null) => {
    if (el) {
      submenuRefs.value[index] = el as any
    }
  }
}

function toggleSubmenu(index: number) {
  log.info('toggleSubmenu called', { index })
  submenuActive.value[index] = !submenuActive.value[index]
}

function showSubmenu(index: number) {
  // Close all other submenus efficiently
  for (const key in submenuActive.value) {
    const numKey = Number(key)
    if (numKey !== index) {
      submenuActive.value[numKey] = false
    }
  }
  submenuActive.value[index] = true
}

function hideAllSubmenus() {
  log.info('hideAllSubmenus called')
  for (const key in submenuActive.value) {
    submenuActive.value[Number(key)] = false
  }
}
</script>

<template>
  <nav class="_menu" @contextmenu.stop.prevent="">
    <template v-for="(item, i) in items" :key="i">
      <template v-if="item.title">
        <div v-if="item.header" class="_menu_header" :data-test-menu="item.title" @mouseenter="hideAllSubmenus">
          {{ item.title }}
        </div>
        <template v-else>
          <a
            :ref="(item.submenu ? setSubmenuRef(i) : undefined) as any"
            class="_menu_item"
            :class="{
              _menu_disabled: item.disabled === true,
              _menu_checked_possible: item.checked != null,
              _menu_checked: checkedItems[i],
              _menu_submenu: !!item.submenu,
            }"
            :href="item.url"
            :data-test-menu="item.title"
            :target="item.url?.includes('://') ? '_blank' : undefined"
            @click.prevent.stop="log.info('click on item', item.title); handleItemAction(item, i)"
            @contextmenu.prevent.stop="log.info('contextmenu on item', item.title); handleItemAction(item, i)"
            @mouseenter="log.info('mouseenter', item.title); item.submenu ? showSubmenu(i) : hideAllSubmenus()"
          >
            <template v-if="item.icon">
              <component :is="item.icon" class="_menu_icon" />
            </template>
            {{ item.title }}
            <span v-if="item.submenu" class="_menu_submenu_arrow">▶</span>
          </a>
          <OuiFloat v-if="item.submenu" v-model="submenuActive[i]" :reference="submenuRefs[i]" placement="right-start" :offset="-4" class="oui-menu">
            <OuiMenuItems :items="item.submenu" :args="args" :done="done" @done="onSubmenuDone" />
          </OuiFloat>
        </template>
      </template>
      <template v-else>
        <hr class="_menu_separator" @mouseenter="hideAllSubmenus">
      </template>
    </template>
  </nav>
</template>
