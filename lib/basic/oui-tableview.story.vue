<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
import { createArray, sortedOrderby, uuid } from 'zeed'
import type { OuiTableColumn } from '../lib'
import { OuiDraggable, OuiTable, useMenu } from '../lib'
import OuiTableview from './oui-tableview.vue'

const state = reactive({
  sort: '',
  footer: true,
  selectable: true,
  selected: undefined,
})

const columns: OuiTableColumn[] = [
  { title: '#', name: 'id', sortable: false },
  { title: 'One', name: 'one', sortable: true, width: 200 },
  { title: 'Two', name: 'two', sortable: true, footer: 'Two feet' },
  { title: '', name: 'action', align: 'right' },
]

const _data = createArray(1000, (index) => {
  return { id: index, one: uuid(), two: uuid() }
})

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

const x = ref(0)
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
          <OuiTableview
            v-model="state.selected"
            v-model:sort="state.sort"
            :columns="columns"
            :data="data"
            :footer="state.footer"
            :selectable="state.selectable"
            style="height: 400px;"
            @context="menu"
          >
            <template #col-one="{ value, col }">
              {{ col.name }} {{ value }}
            </template>
            <template #col-action="{ value, col }">
              <button class="oui-button" size="small" @click="console.log(value, col)">
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
        </div>
      </template>
    </Variant>
  </Story>
</template>
