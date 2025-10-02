<!-- eslint-disable vue/return-in-computed-property -->
<script setup lang="ts">
import type { Component, PropType } from 'vue'
import type { Path } from '../util'
import { computed, getCurrentInstance } from 'vue'
import { objectToString } from '../util'
import ArrayWrapper from './ArrayWrapper.vue'
import FalseWrapper from './FalseWrapper.vue'
import NullWrapper from './NullWrapper.vue'
import NumberWrapper from './NumberWrapper.vue'
import ObjectWrapper from './ObjectWrapper.vue'
import StringWrapper from './StringWrapper.vue'
import TrueWrapper from './TrueWrapper.vue'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps({
  path: {
    required: true,
    type: Array as PropType<Path>,
  },
  data: {
    required: true,
  },
  name: {
    required: true,
    type: String,
  },
  collapseSignal: {
    default: false,
    type: Boolean,
  },
  expandSignal: {
    default: false,
    type: Boolean,
  },
  expandOnCreatedAndUpdated: {
    required: true,
    type: Function,
  },
  getKeys: {
    required: true,
    type: Function as PropType<
      (
        object: Record<PropertyKey, unknown> | unknown[],
        path: Path,
      ) => string[]
    >,
  },
  ariaLevel: {
    required: true,
    type: Number,
  },
})

const componentMap: Record<string, Component> = {
  'null-wrapper': NullWrapper,
  'true-wrapper': TrueWrapper,
  'false-wrapper': FalseWrapper,
  'number-wrapper': NumberWrapper,
  'string-wrapper': StringWrapper,
  'array-wrapper': ArrayWrapper,
  'object-wrapper': ObjectWrapper,
}

const type = computed(() => objectToString(props.data))
const is = computed(() => {
  let componentName: string | undefined
  switch (type.value) {
    case 'Null':
      componentName = 'null-wrapper'
      break
    case 'Boolean':
      componentName = props.data ? 'true-wrapper' : 'false-wrapper'
      break
    case 'Number':
      componentName = 'number-wrapper'
      break
    case 'String':
      componentName = 'string-wrapper'
      break
    case 'Array':
      componentName = 'array-wrapper'
      break
    case 'Object':
      componentName = 'object-wrapper'
      break
  }
  return componentName ? componentMap[componentName] : undefined
})
const role = computed(() => {
  if (props.ariaLevel === 0) {
    if (type.value === 'Array' || type.value === 'Object')
      return 'tree'
    else
      return void 0
  }
  else {
    if (type.value === 'Array' || type.value === 'Object')
      return 'group'
    else
      return 'treeitem'
  }
})
const attrs = computed(() => {
  const attrs: { role?: string, ariaLevel?: number } = {}
  if (role.value !== void 0) {
    attrs.role = role.value
    attrs.ariaLevel = props.ariaLevel + 1
  }
  return attrs
})

// Register circular component references
const instance = getCurrentInstance()
if (instance) {
  const components = instance.appContext.components
  ;(ArrayWrapper.components as any).Wrapper = instance.type
  ;(ObjectWrapper.components as any).Wrapper = instance.type
}
</script>

<template>
  <component
    :is="is"
    :name="name"
    :path="path"
    :data="data"
    :collapse-signal="collapseSignal"
    :expand-signal="expandSignal"
    :expand-on-created-and-updated="expandOnCreatedAndUpdated"
    :get-keys="getKeys"
    :class="ariaLevel === 0 ? 'oui-object' : void 0"
    v-bind="attrs"
  />
</template>
