<script setup lang="ts">
const props = defineProps<{
  data: unknown
  name: string
  type: 'null' | 'boolean' | 'number' | 'string'
  role?: string
  ariaLevel?: number
}>()

function formatValue() {
  switch (props.type) {
    case 'null':
      return 'null'
    case 'boolean':
      return String(props.data)
    case 'number':
      return String(props.data)
    case 'string':
      return JSON.stringify(props.data).slice(1, -1)
    default:
      return String(props.data)
  }
}
</script>

<template>
  <span :class="type" :role="role" :aria-level="ariaLevel">
    <span class="key">{{ name }}</span>
    <span v-if="name !== ''" class="separator">:&nbsp;</span>
    <span v-if="type === 'string'" class="quotes">"</span>
    <span class="value">{{ formatValue() }}</span>
    <span v-if="type === 'string'" class="quotes">"</span>
  </span>
</template>
