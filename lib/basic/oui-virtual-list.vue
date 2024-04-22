<script lang="ts" setup generic="K extends string, T extends Record<K, any>">
import { useVirtualList } from '@vueuse/core'

const props = withDefaults(defineProps<{
  data: T[]
  height?: number
}>(), {
  height: 20,
})

// const emit = defineEmits<{
//   context: [row: T, pos: number, event: Event]
// }>()

const { scrollTo, containerProps, wrapperProps, list } = useVirtualList(props.data, { itemHeight: props.height })
</script>

<template>
  <div
    v-bind="containerProps"
    style="max-height: 100%; overflow: scroll;"
  >
    <div v-bind="wrapperProps">
      <div
        v-for="{ index, data: item } in list"
        :key="index"
        :xstyle="{ height: `${height}px` }"
      >
        <slot :item="item" :index="index">
          Placeholder {{ index }}
        </slot>
      </div>
    </div>
  </div>
</template>
