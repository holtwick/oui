<script lang="ts" setup>
import { computed, reactive } from 'vue'
import { sortedOrderby } from 'zeed'
import type { OuiTableColumn } from '../lib'
import { OuiTable, useMenu, useMenuWithValue } from '../lib'

const state = reactive({
  sort: '',
  footer: true,
  selectable: true,
  selected: undefined,
})

const columns: OuiTableColumn[] = [
  { title: '#', name: 'id', sortable: false },
  { title: 'One', name: 'one', sortable: true },
  { title: 'Two', name: 'two', sortable: true, footer: 'Two feet' },
  { title: '', name: 'action', align: 'right' },
]

const _data = [
  { id: 1, one: 1, two: 2 },
  { id: 2, one: 11, two: 22 },
  { id: 3, one: 111 }, // missing one
]

const data = computed(() => sortedOrderby(_data, state.sort))

const menu = useMenu((row: any) => [
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
</script>

<template>
  <Story auto-props-disabled>
    <template #controls>
      <HstText v-model="state.sort" title="Sort" />
      <HstNumber v-model="state.selected" title="Selected" />
      <HstCheckbox v-model="state.footer" title="Show footer" />
      <HstCheckbox v-model="state.selectable" title="Selectable" />
    </template>
    <Variant title="Default">
      <template #default>
        <h2>Complex example</h2>
        <div>
          <OuiTable
            v-model="state.selected"
            v-model:sort="state.sort"
            :columns="columns"
            :data="data"
            :footer="state.footer"
            :selectable="state.selectable"
            @context="menu"
          >
            <template #col-one="{ value, col }">
              {{ col.name }} {{ value }}
            </template>
            <template #col-action="{ value, col }">
              <button size="small" @click="console.log(value, col)">
                Action
              </button>
            </template>
            <template #footer-one>
              One foot
            </template>
            <template #header-one>
              ONE
            </template>
          </OuiTable>
        </div>

        <h2>Without columns definitions - super simple</h2>
        <div>
          <OuiTable :data="data" />
        </div>
      </template>
    </Variant>
  </Story>
</template>
