<script lang="ts" setup generic="K extends string, T extends Record<K, any>">
import { useLocalStorage } from '@vueuse/core'
import { computed, ref, watch } from 'vue'
import { arraySetArrayInPlace, arraySum, parseOrderby } from 'zeed'
import type { OuiTableColumn } from './_types'
import { px } from './lib'
import OuiSeparator from './oui-separator.vue'
import OuiVirtualList from './oui-virtual-list.vue'

import './oui-tableview.styl'

const props = withDefaults(defineProps<{
  data: T[]
  columns: OuiTableColumn<K>[]
  rowHeight?: number
  header?: boolean
  footer?: boolean
  selectable?: boolean
  fillLast?: boolean
  scrollToEnd?: boolean
  rowAttrs?: (item: T, index: number) => any // Record<string, string>
  name?: string
}>(), {
  rowHeight: 44,
  header: true,
  footer: false,
  selectable: true,
  fillLast: true,
  scrollToEnd: false,
  rowAttrs: () => ({}),
})

const emit = defineEmits<{
  context: [row: T, pos: number, event: Event]
  select: [row: T, pos: number, event: Event]
}>()

const modelSort = defineModel<string>('sort')
const modelSelected = defineModel<number | undefined>()

const sortName = computed(() => parseOrderby(modelSort.value).field)
const sortAsc = computed(() => parseOrderby(modelSort.value).asc)

const widthsPlain = props.columns.map(c => c.width ?? 120)
const widths = props.name ? useLocalStorage<number[]>(`oui.tableview.${props.name}.widths`, widthsPlain) : ref(widthsPlain)

watch(() => [props.data, props.fillLast], () => {
  let values = props.columns.map((c, i) => widths.value[i] ?? c.width ?? 120)
  if (props.fillLast)
    values = values.slice(0, -1)
  arraySetArrayInPlace(widths.value, values)
}, { immediate: true })

const tableStyle = computed(() => {
  const values = widths.value.map(w => px(w ?? 120))
  if (props.fillLast)
    values.push('auto')
  return `--tableview-columns: ${values.join(' ')}`
})

function doToggleSort(col: OuiTableColumn<K>) {
  if (col.sortable !== true)
    return
  if (sortName.value === col.name) {
    modelSort.value = `${col.name} ${!sortAsc.value ? 'asc' : 'desc'}`
    return
  }
  modelSort.value = `${col.name} asc`
}

function doSelect(pos: number) {
  if (modelSelected.value === pos)
    modelSelected.value = undefined
  else
    modelSelected.value = pos
}

const marginLeft = ref(0)

const headerElement = ref<HTMLElement>()
const footerElement = ref<HTMLElement>()

function scrollX(x: number) {
  marginLeft.value = x
  if (headerElement.value)
    headerElement.value.style.marginLeft = px(-1 * x)
  if (footerElement.value)
    footerElement.value.style.marginLeft = px(-1 * x)
}
</script>

<template>
  <div v-if="columns != null && data != null" class="oui-tableview" :style="tableStyle">
    <div v-if="header" ref="headerElement" class="_tableview_header">
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
            @click="doToggleSort(col)"
          >
            <slot :name="`header-${col.name}`" v-bind="{ col, pos }">
              {{ col.title ?? col.name }}
              <template v-if="col.sortable === true && sortName === col.name" />
            </slot>
          </div>
        </template>
      </div>
    </div>
    <OuiVirtualList
      class="_tableview_body"
      :data="data"
      :row-height="rowHeight"
      :scroll-to-end="scrollToEnd"
      @scroll-x="scrollX"
    >
      <template #default="{ item, index }">
        <div
          class="_tableview_row"
          :class="{
            _selectable: selectable,
            _active: modelSelected === index,
          }"
          v-bind="rowAttrs(item, index)"
          @click="doSelect(index); emit('select', item, index, $event)"
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
    <div v-if="footer" ref="footerElement" class="_tableview_footer">
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
      <OuiSeparator
        v-model="widths[i]"
        side="right"
        :min-size="columns[i].minWidth ?? 80"
        :max-size="columns[i].maxWidth ?? 300"
        :style="{ left: px(arraySum(widths.slice(0, i + 1)) - 1 - marginLeft) }"
      />
    </template>
  </div>
</template>
