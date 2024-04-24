<script lang="ts" setup generic="K extends string, T extends Record<K, any>">
import { computed, reactive, watch } from 'vue'
import { arraySetArrayInPlace, arraySum, parseOrderby } from 'zeed'
import type { OuiTableColumn } from './_types'
import OuiVirtualList from './oui-virtual-list.vue'
import OuiDraggable from './oui-draggable.vue'

import './oui-tableview.styl'

const props = withDefaults(defineProps<{
  data: T[]
  columns: OuiTableColumn<K>[]
  rowHeight?: number
  header?: boolean | undefined
  footer?: boolean | undefined
  selectable?: boolean
  fillLast?: boolean
}>(), {
  rowHeight: 44,
  header: undefined,
  footer: false,
  selectable: true,
  fillLast: true,
})

const emit = defineEmits<{
  context: [row: T, pos: number, event: Event]
}>()

const modelSort = defineModel<string>('sort')
const modelSelected = defineModel<number | undefined>()

const sortName = computed(() => parseOrderby(modelSort.value).field)
const sortAsc = computed(() => parseOrderby(modelSort.value).asc)

const widths = reactive<number[]>([])

watch(() => [props.data, props.fillLast], () => {
  let values = props.columns.map(c => c.width ?? 120)
  if (props.fillLast)
    values = values.slice(0, -1)
  arraySetArrayInPlace(widths, values)
}, { immediate: true })

// const cols = computed<OuiTableColumn<K>[]>(() => props.columns ?? (Object.keys(props.data?.[0] ?? {}) as any)?.map((name: string) => ({ name })))
const showHeader = computed(() => props.header ?? props.columns != null)

const tableStyle = computed(() => {
  const values = widths.map(w => `${w ?? 120}px`)
  if (props.fillLast)
    values.push('auto')
  return `--tableview-columns: ${values.join(' ')}`
})

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
  <div v-if="columns != null && data != null" class="oui-tableview" :style="tableStyle">
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
            </slot>
          </div>
        </template>
      </div>
    </div>
    <OuiVirtualList class="_tableview_body" :data="data" :row-height="rowHeight">
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
                  index,
                  value: item[col.name],
                  col,
                  pos,
                  item,
                }"
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
    <template v-for="w, i in widths" :key="i">
      <OuiDraggable
        class="_tableview_resize"
        :style="`left: ${arraySum(widths.slice(0, i + 1)) - 2}px`"
        @move="({ deltaX }) => widths[i] = Math.max(columns[i].minWidth ?? 80, Math.min(columns[i].maxWidth ?? 300, widths[i] + deltaX))"
      />
    </template>
  </div>
</template>
