<script lang="ts" setup>
import type { LoggerInterface } from 'zeed'
import { computed, ref, watch } from 'vue'
import { isNumber, isString, Logger, promisify, uuid } from 'zeed'
import OuiFloat from '../float/oui-float.vue'
import { t } from './i18n'
import OuiClose from './oui-close.vue'
import OuiItems from './oui-items.vue'

import './oui-combobox.styl'

const props = withDefaults(
  defineProps<{
    /** HTML `id` attribute of input element */
    id?: string

    /** Suggestions */
    items: any[] // (string | number | Item | any)[]

    /** Simple value, usually the value of `id` */
    modelValue?: any // string | number | any

    /** HTML input field placeholder */
    placeholder?: string

    /** Show trailing select field icon. Default: false  */
    selectIcon?: boolean
    // openOnFocus?: boolean

    /** Show clear button if there is content */
    clearable?: boolean

    disabled?: boolean

    clearOnSelection?: boolean

    //

    formatValue?: (value: any) => string

    parseValue?: (value: string) => any

    //

    /** Allow to create new item, return its id */
    addItemAction?: (title: string) => any

    /** The text of the add item */
    addItemTitle?: string

    addItemClass?: string

    addItemFooter?: boolean
  }>(),
  {
    id: uuid(),
    placeholder: '',
    selectIcon: false,
    // openOnFocus: true,
    clearable: false,
    clearOnSelection: false,
    addItemFooter: false,
    disabled: false,
  },
)

const emit = defineEmits([
  'update:modelValue',
  'change',
  'deleteLast',
])
const log: LoggerInterface = Logger('oui-combobox')

interface Item {
  id: string | number

  /** Title to be presented */
  title: string

  /** Text to be considered in search */
  search?: string

  /** Perform this action on selection */
  action?: (title: string) => void

  /** Is not automatically selected, if other possible selections are available */
  skipSelection?: boolean

  /** HTML/CSS class of item */
  class?: string
}

interface FilterItem extends Item { }

const target = ref()
const input = ref()
const selected = ref(0)
const focus = ref(false)
const showPopover = ref(false)
const inputValue = ref<string>('')
const applyFilter = ref(false)

// todo: sort weight like: the smaller indexOf, the better
// todo: use fuzzy search?
// todo: highlight matches?
const filteredItems = computed<FilterItem[]>(() => {
  let items = Object.values(props.items ?? []).map((item) => {
    if (isString(item) || isNumber(item)) {
      const title = props.formatValue?.(item as any) ?? ''
      return {
        id: item,
        title,
      }
    }
    return item
  })

  if (applyFilter.value) {
    log('filter', inputValue.value)
    const value = inputValue.value.trim()
    const lvalue = value.toLowerCase()
    let exactMatch = false

    // Filter items
    items = items.filter((item) => {
      if (value) {
        if (item.title.toLowerCase() === lvalue)
          exactMatch = true
        else if (props.parseValue && props.parseValue(value) === item.id)
          exactMatch = true

        if (!exactMatch) {
          const search = item.search?.toString().toLowerCase() ?? item.title.toString().toLowerCase()
          return search.includes(lvalue)
        }
        return exactMatch
      }
      return true
    })

    log('exactMatch', exactMatch)

    if (value && !exactMatch) {
      if (props.addItemAction) {
        const addItem = {
          action: () => {
            if (props.addItemAction) {
              promisify(props.addItemAction(value)).then(id =>
                setModelValue(id),
              )
            }
          },
          title: t(props.addItemTitle ?? 'ui.combobox.addTitle', [value]), //  ??
          class: props.addItemClass ?? 'oui-combobox-item-add',
          skipSelection: items.length > 0,
          // id: '_create',
        }
        if (props.addItemFooter === true)
          items.push(addItem)
        else
          items.unshift(addItem)
      }
      else if (props.formatValue && props.parseValue) {
        const value = props.parseValue(inputValue.value ?? '')
        if (value) {
          const addItem = {
            title: props.formatValue(value),
            id: value,
            class: props.addItemClass ?? 'oui-combobox-item-preview',
          }
          items.unshift(addItem)
        }
      }
    }
  }

  return items as FilterItem[]
})

function updateInputValue() {
  log('did change value', props.modelValue)

  if (props.formatValue)
    inputValue.value = props.formatValue(props.modelValue) ?? ''
  else
    inputValue.value = (props?.items as any).find((item: Item) => item.id === props.modelValue)?.title ?? ''
}

/** If model value changes update the represented value */
watch(() => props.modelValue, updateInputValue, { immediate: true })

function setModelValue(value: string | number | undefined) {
  log('set modelValue', value)
  emit('change', value)
  if (props.modelValue !== value)
    emit('update:modelValue', value)
  if (props.clearOnSelection === true)
    inputValue.value = ''
}

function doMove(delta: number, e?: KeyboardEvent) {
  if (e?.metaKey)
    return
  showPopover.value = true
  selected.value = Math.max(0, Math.min(filteredItems.value.length - 1, selected.value + delta))
  e?.stopPropagation()
  e?.preventDefault()
}

function doSelectItemByClickOnList(item: any) {
  log('doSelectItem', item)
  if (item.action)
    item.action(inputValue.value)
  else
    setModelValue(item.id)
  showPopover.value = false
  // focus.value = false
}

function doSelect(closePopover: boolean = true) {
  log('doSelect')
  const item = filteredItems.value[selected.value]
  if (item.action)
    item.action(inputValue.value)
  else
    setModelValue(item.id)
  if (closePopover)
    showPopover.value = false
  selected.value = 0
}

function doDeleteLast(ev: Event) {
  if (inputValue.value?.length === 0) {
    ev.preventDefault()
    doClear()
    emit('deleteLast')
  }
}

function doClear() {
  showPopover.value = false
}

function doInput() {
  showPopover.value = true
  applyFilter.value = true
  selected.value = filteredItems.value?.[0]?.skipSelection ? 1 : 0
}

function doBlur() {
  log('blur', focus.value, document.activeElement)
  if (focus.value === true) {
    focus.value = false
    if (inputValue.value.trim().length === 0) {
      log('input empty')
      setModelValue(undefined)
    }
    else if (props.parseValue) {
      setModelValue(props.parseValue(inputValue.value))
    }
    else if (showPopover.value === true) {
      const item = filteredItems.value[selected.value]
      if (item?.id)
        setModelValue(item.id)
      // else keep previous one
    }
    updateInputValue()
    showPopover.value = false
  }
}

function doFocus() {
  log('focus')
  applyFilter.value = false
  focus.value = true
  showPopover.value = true
  input.value.select()
  queueMicrotask(() => {
    selected.value = filteredItems.value.findIndex(item => item.id === props.modelValue)
  })
}
</script>

<template>
  <div
    ref="target"
    class="oui-input-container oui-combobox"
    :class="{ '-focus': focus }"
    @click="input.focus()"
  >
    <slot name="before" />
    <input
      :id="id"
      ref="input"
      v-model="inputValue"
      autocomplete="off"
      :placeholder="placeholder"
      class="oui-combobox-input"
      :disabled="disabled"
      @focus="doFocus"
      @blur="doBlur"
      @input="doInput"
      @keydown.down="doMove(+1, $event)"
      @keydown.up="doMove(-1, $event)"
      @keydown.esc="doClear"
      @keydown.enter="doSelect(true)"
      @keydown.backspace="doDeleteLast"
    >
    <div
      v-if="clearable && (modelValue || inputValue)"
      class="oui-combobox-clearable"
      @click="setModelValue(undefined)"
    >
      <OuiClose />
    </div>
    <div v-if="selectIcon" class="oui-combobox-select-icon" />
    <slot name="after" class="completion-after" />
    <OuiFloat
      v-model="showPopover"
      :reference="target"
      placement="bottom-start"
      theme="dropdown"
      :offset="4"
      class="oui-float _dropdown combobox-dropdown"
    >
      <div class="oui-combobox-popover-content">
        <slot name="header" />
        <slot v-if="filteredItems.length <= 0" name="empty">
          <div class="oui-items-item">
            {{ t('ui.combobox.empty') }}
          </div>
        </slot>
        <OuiItems
          v-else
          v-slot="{ item }"
          v-model="selected"
          :items="filteredItems"
          @pointerdown="focus = false"
          @pointerup="showPopover = false"
          @action="doSelectItemByClickOnList"
        >
          <slot name="item" :item="(item as Item | FilterItem)">
            {{ item.title }}&nbsp;
          </slot>
        </OuiItems>
        <slot />
        <slot name="footer" />
        <div class="oui-combobox-popover-content-spacer" />
      </div>
    </OuiFloat>
  </div>
</template>
