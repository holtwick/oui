<script lang="ts" setup>
import { isArray, isPrimitive } from 'zeed'
import './oui-form.styl'
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  options?: [string | number, string | number][] | (string | number)[]
}>(), {

})

const model = defineModel({ required: true })

const allOptions = computed(() => (props.options ?? []).map(v => isPrimitive(v) ? [v, v] : v,
))
</script>

<template>
  <select v-model="model">
    <slot>
      <template
        v-for="[key, value] in allOptions"
        :key="key"
      >
        <option :value="key">
          {{ value }}
        </option>
      </template>
    </slot>
  </select>
</template>
