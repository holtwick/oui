<script lang="ts" setup>
import type { OuiTableColumn } from '@/lib'
import { OuiCheckbox, OuiDemo, OuiTableview, useMenu } from '@/lib'
import { computed, reactive } from 'vue'
import { createArray, sortedOrderby, uuid } from 'zeed'

const state = reactive({
  sort: '',
  footer: true,
  header: true,
  selectable: true,
  selected: undefined,
  fillLast: true,
  scrollToEnd: false,
  showSepHandle: false,
  first: 0,
  last: 0,
})

const columns: OuiTableColumn[] = [
  { title: '#', name: 'id', sortable: false },
  { title: 'One', name: 'one', sortable: true, width: 200 },
  { title: 'Two', name: 'two', sortable: true, footer: 'Two feet' },
  { title: 'Action', name: 'action', align: 'right' },
]

const _data = createArray(1000, (index) => {
  return { id: index, one: uuid(), two: uuid() }
})

const data = computed(() => sortedOrderby(_data, state.sort))

const menu = useMenu(row => [
  {
    title: row.one ?? '-',
    // eslint-disable-next-line no-alert
    action: () => alert('Hello World'),
  },
  {},
  {
    title: row.two ?? '-',
    // eslint-disable-next-line no-alert
    action: () => alert('Hello World'),
  },
])

function onVisible(offset: number, limit: number) {
  state.first = offset
  state.last = offset + limit
}
</script>

<template>
  <div :style="state.showSepHandle && '--separator-handle: rgba(255,0,0,0.25)'">
    <OuiTableview
      v-model="state.selected"
      v-model:sort="state.sort"
      name="demo"
      :columns="columns"
      :data="data"
      :footer="state.footer"
      :header="state.header"
      :selectable="state.selectable"
      :fill-last="state.fillLast"
      :scroll-to-end="state.scrollToEnd"
      :row-attrs="(_item, index) => index % 2 === 0 ? { style: 'background: var(--s2-bg)' } : {}"
      style="height: 80vh"
      @context="menu"
      @visible="onVisible"
    >
      <template #col-one="{ value, col }">
        {{ col.name }} {{ value }}
      </template>
      <template #col-action="{ item, col }">
        <button class="oui-button" size="small" @click="console.log(item.id, col)">
          Action
        </button>
      </template>
      <template #footer-one>
        One foot
      </template>
      <template #header-one>
        ONE
      </template>
    </OuiTableview>

    <OuiDemo :state="state">
      <OuiCheckbox v-model="state.fillLast" switch>
        fillLast
      </OuiCheckbox>
      <OuiCheckbox v-model="state.selectable" switch>
        selectable
      </OuiCheckbox>
      <OuiCheckbox v-model="state.footer" switch>
        footer
      </OuiCheckbox>
      <OuiCheckbox v-model="state.header" switch>
        header
      </OuiCheckbox>
      <OuiCheckbox v-model="state.scrollToEnd" switch>
        scrollToEnd
      </OuiCheckbox>
      <OuiCheckbox v-model="state.showSepHandle" switch>
        showSepHandle
      </OuiCheckbox>
    </OuiDemo>
  </div>
</template>
