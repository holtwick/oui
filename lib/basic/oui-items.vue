<script lang="ts" setup>
/**
 * A list of items with selection property.
 *
 * v-model is the selection index.
 *
 * items are the items, you should provide a slot for display.
 *
 *  <OuiItems :items="items" @action="doAction" v-model="selected">
 *    <template #="{ item }">{{ item.title }} </template>
 *  </OuiItems>
 *
 * Used in: oui-completion, oui-tag-input, oui-combobox
 */

import type { OuiMenuItem } from '../float/_types'
import { ref, watch } from 'vue'

import './oui-items.styl'

const props = defineProps<{
  items: any[]
}>()

const emit = defineEmits(['action'])

const model = defineModel<number>({ required: true })

const container = ref<HTMLElement>()

watch(model, scrollToSelected, { immediate: true })

function doSelect(index: number) {
  model.value = index
}

function doAction(item: OuiMenuItem, index: number) {
  emit('action', item, index)
}

function scrollToSelected(selected: number = model.value ?? 0) {
  const divItem = container.value?.querySelectorAll('.oui-items-item')[selected]
  if (divItem) {
    divItem.scrollIntoView({
      // behavior: "smooth", // this causes issues on chrome
      block: 'nearest',
      inline: 'nearest',
    })
  }
}
</script>

<template>
  <div ref="container" class="oui-items">
    <div
      v-for="(item, index) in items" :key="item.id" :data-id="item.id" :data-index="index" class="oui-items-item" :class="{
        '-selected': model != null && model === index,
        '-active': model != null && model === index,
        [item.class]: item.class,
      }" @pointerdown="doSelect(index)" @click="doAction(item, index)" @keydown.enter="doAction(item, index)"
    >
      <slot :item="item" :index="index">
        {{ index }}. {{ item }}
      </slot>
    </div>
    <slot v-if="items.length <= 0" name="empty">
      Empty
    </slot>
  </div>
</template>
