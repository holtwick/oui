<script lang="ts" setup generic="K extends string, T extends Record<K, any>">
import { computed } from 'vue'
import { parseOrderby } from 'zeed'
import type { OuiTableColumn } from './_types'

defineProps<{
  columns: OuiTableColumn<K>[]
  data: T[]
  footer?: boolean
}>()

const modelSort = defineModel<string>('sort')

const sortName = computed(() => parseOrderby(modelSort.value).field)
const sortAsc = computed(() => parseOrderby(modelSort.value).asc)

function doToggleSort(name: string) {
  if (sortName.value === name) {
    modelSort.value = `${name} ${!sortAsc.value ? 'asc' : 'desc'}`
    return
  }
  modelSort.value = `${name} asc`
}
</script>

<template>
  <table class="oui-table">
    <thead>
      <tr>
        <template v-for="col, pos in columns" :key="col.name">
          <th :class="{ _sortable: col.sortable === true, _asc: sortAsc, _desc: !sortAsc, _active: sortName === col.name }" @click="doToggleSort(col.name)">
            <slot :name="`header-${col.name}`" v-bind="{ col, pos }">
              {{ col.title ?? col.name }}
              <template v-if="col.sortable === true && sortName === col.name" />
            </slot>
          </th>
        </template>
      </tr>
    </thead>
    <tbody>
      <template v-for="row in data" :key="row">
        <tr>
          <template v-for="col, pos in columns" :key="col.name">
            <td :align="col.align ?? 'left'" :valign="col.valign ?? 'top'">
              <slot :name="`col-${col.name}`" v-bind="{ value: row[col.name], col, pos }">
                {{ row[col.name] }}
              </slot>
            </td>
          </template>
        </tr>
      </template>
    </tbody>
    <tfoot v-if="footer">
      <tr>
        <template v-for="col, pos in columns" :key="col.name">
          <td :align="col.align ?? 'left'" :valign="col.valign ?? 'top'">
            <slot :name="`footer-${col.name}`" v-bind="{ col, pos }">
              {{ col.footer ?? '' }}
            </slot>
          </td>
        </template>
      </tr>
    </tfoot>
  </table>
</template>
