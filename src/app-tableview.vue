<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
import { createArray, sortedOrderby, uuid } from 'zeed'
import type { OuiTableColumn } from '@/lib'
import { OuiCheckbox, OuiObject, OuiSelect, OuiTableview, useMenu } from '@/lib'

const state = reactive({
  sort: '',
  footer: true,
  header: true,
  selectable: true,
  selected: undefined,
  fillLast: true,
  scrollToEnd: false,
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
  <h2>Complex example</h2>
  <p>
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
  </p>
  <div>
    <OuiTableview
      v-model="state.selected"
      v-model:sort="state.sort"
      :columns="columns"
      :data="data"
      :footer="state.footer"
      :header="state.header"
      :selectable="state.selectable"
      :fill-last="state.fillLast"
      :scroll-to-end="state.scrollToEnd"
      :row-attrs="(_item, index) => index % 2 === 0 ? { style: 'background:var(--p1-100)' } : {}"
      style="height: 400px;"
      @context="menu"
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

    <OuiObject :value="state" />
  </div>
</template>
