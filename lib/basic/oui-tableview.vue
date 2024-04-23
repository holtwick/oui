<script lang="ts" setup generic="K extends string, T extends Record<K, any>">
import { computed, createApp, reactive, watch } from 'vue'
import { arraySetArrayInPlace, createArray, parseOrderby } from 'zeed'
import type { OuiTableColumn } from './_types'
import OuiVirtualList from './oui-virtual-list.vue'

import './oui-tableview.styl'

const props = withDefaults(defineProps<{
  data: T[]
  columns: OuiTableColumn<K>[]
  rowHeight?: number
  header?: boolean | undefined
  footer?: boolean | undefined
  selectable?: boolean
}>(), {
  rowHeight: 44,
  columns: undefined,
  header: undefined,
  footer: false,
  selectable: true,
})

const emit = defineEmits<{
  context: [row: T, pos: number, event: Event]
}>()

const modelSort = defineModel<string>('sort')
const modelSelected = defineModel<number | undefined>()

const sortName = computed(() => parseOrderby(modelSort.value).field)
const sortAsc = computed(() => parseOrderby(modelSort.value).asc)

const widths = reactive([])

watch(() => props.data, () => {
  arraySetArrayInPlace(widths, props.columns.map(c => c.width ?? 120))
}, { immediate: true })

// const cols = computed<OuiTableColumn<K>[]>(() => props.columns ?? (Object.keys(props.data?.[0] ?? {}) as any)?.map((name: string) => ({ name })))
const showHeader = computed(() => props.header ?? props.columns != null)
const tableStyle = computed(() => `--tableview-columns: ${
  widths.map(w => `${w ?? 120}px`).join(' ')
}`)

function doToggleSort(name: string) {
  if (sortName.value === name) {
    modelSort.value = `${name} ${!sortAsc.value ? 'asc' : 'desc'}`
    return
  }
  modelSort.value = `${name} asc`
}

function doSelect(pos: number) {
  if (modelSelected.value === pos)
    modelSelected.value = undefined
  else
    modelSelected.value = pos
}
</script>

<template>
  <div class="oui-tableview" :style="tableStyle">
    <div v-if="showHeader" class="_tableview_header">
      <div class="_tableview_row">
        <template v-for="col, pos in columns" :key="col.name">
          <div
            class="_tableview_cell"
            :class="{
              _sortable: col.sortable === true,
              _asc: sortName === col.name && sortAsc,
              _desc: sortName === col.name && !sortAsc,
              _active: sortName === col.name,
            }"
            @xclick="doToggleSort(col.name)"
          >
            <slot :name="`header-${col.name}`" v-bind="{ col, pos }">
              {{ col.title ?? col.name }}
              <template v-if="col.sortable === true && sortName === col.name" />
              <span @click="(widths as any)[pos] -= 100">
                {{ widths[pos] }}
              </span>
            </slot>
          </div>
        </template>
      </div>
    </div>
    <OuiVirtualList class="_tableview_body" :data="data" :height="rowHeight">
      <template #default="{ item, index }">
        <div
          class="_tableview_row"
          :class="{
            _selectable: selectable,
            _active: modelSelected === index,
          }"
          @click="doSelect(index)"
          @contextmenu.prevent="emit('context', item, index, $event)"
        >
          <template v-for="col, pos in columns" :key="col.name">
            <div
              class="_tableview_cell"
              :align="col.align ?? 'left'"
              :valign="col.valign ?? 'top'"
            >
              <slot
                :name="`col-${col.name}`" v-bind="{
                  value: item[col.name],
                  col,
                  pos,
                  row: item }"
              >
                {{ item[col.name] }}
              </slot>
            </div>
          </template>
        </div>
      </template>
    </OuiVirtualList>
    <div v-if="footer === true" class="_tableview_footer">
      <div class="_tableview_row">
        <template v-for="col, pos in columns" :key="col.name">
          <div class="_tableview_cell" :align="col.align ?? 'left'" :valign="col.valign ?? 'top'">
            <slot :name="`footer-${col.name}`" v-bind="{ col, pos }">
              {{ col.footer ?? '' }}
            </slot>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
