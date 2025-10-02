<script setup lang="ts">
import type { PropType } from 'vue'
import type { Path } from './util'
import { computed } from 'vue'
import ArrayWrapper from './array-wrapper.vue'
import ObjectWrapper from './object-wrapper.vue'
import PrimitiveWrapper from './primitive-wrapper.vue'
import { objectToString } from './util'

defineOptions({
  name: 'Wrapper',
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
    type: Function as PropType<(path: Path) => boolean>,
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
  level: {
    required: true,
    type: Number,
  },
})

const type = computed(() => objectToString(props.data))

const isComplex = computed(() => type.value === 'Array' || type.value === 'Object')

const primitiveType = computed(() => {
  switch (type.value) {
    case 'Null':
      return 'null'
    case 'Boolean':
      return 'boolean'
    case 'Number':
      return 'number'
    case 'String':
      return 'string'
    default:
      return undefined
  }
})

const role = computed(() => {
  if (props.level === 0) {
    return isComplex.value ? 'tree' : undefined
  }
  else {
    return isComplex.value ? 'group' : 'treeitem'
  }
})

const childLevel = computed(() => props.level + 1)

const ariaAttrs = computed(() => {
  if (role.value === undefined)
    return { level: childLevel.value }
  return {
    role: role.value,
    level: childLevel.value,
  }
})
</script>

<template>
  <PrimitiveWrapper
    v-if="primitiveType"
    :data="data"
    :name="name"
    :type="primitiveType"
    v-bind="ariaAttrs"
  />
  <ArrayWrapper
    v-else-if="type === 'Array'"
    :data="data as unknown[]"
    :name="name"
    :path="path"
    :collapse-signal="collapseSignal"
    :expand-signal="expandSignal"
    :expand-on-created-and-updated="expandOnCreatedAndUpdated"
    :get-keys="getKeys"
    :class="level === 0 ? 'oui-object' : undefined"
    v-bind="ariaAttrs"
  />
  <ObjectWrapper
    v-else-if="type === 'Object'"
    :data="data as Record<PropertyKey, unknown>"
    :name="name"
    :path="path"
    :collapse-signal="collapseSignal"
    :expand-signal="expandSignal"
    :expand-on-created-and-updated="expandOnCreatedAndUpdated"
    :get-keys="getKeys"
    :class="level === 0 ? 'oui-object' : undefined"
    v-bind="ariaAttrs"
  />
</template>
