<!-- eslint-disable vue/return-in-computed-property -->
<script setup lang="ts">
import type { PropType } from 'vue'
import type { Path } from '../util'
import { computed } from 'vue'
import { objectToString } from '../util'

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

const type = computed(() => objectToString(props.data))
const is = computed(() => {
  switch (type.value) {
    case 'Null':
      return 'null-wrapper'
    case 'Boolean':
      return props.data ? 'true-wrapper' : 'false-wrapper'
    case 'Number':
      return 'number-wrapper'
    case 'String':
      return 'string-wrapper'
    case 'Array':
      return 'array-wrapper'
    case 'Object':
      return 'object-wrapper'
  }
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
