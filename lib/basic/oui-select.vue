<script lang="ts" setup>
import type { OuiSegmentedOption } from './_types'
import { computed } from 'vue'
import { isPrimitive } from 'zeed'
import OuiButton from './oui-button.vue'
import OuiFormItem from './oui-form-item.vue'

import OuiSegmented from './oui-segmented.vue'
import './oui-form.styl'

const props = withDefaults(defineProps<{
  options?: [string | number, string | number][] | (string | number)[]
  title?: string
  button?: string
  description?: string
  required?: boolean
  id?: string
  segmented?: boolean
}>(), {

})

const model = defineModel<string>({ required: true }) // todo: only string for now

const allOptions = computed(() => (props.options ?? []).map(v => isPrimitive(v) ? [v, v] : v))

const segmentedOptions = computed<OuiSegmentedOption[]>(() => {
  return allOptions.value.map(([name, title]) => ({
    name: String(name),
    title: String(title),
  }))
})
</script>

<template>
  <OuiFormItem :id="id" :title="title" :description="description" :required="required">
    <template v-if="segmented">
      <OuiSegmented v-bind="$attrs" :id="id" v-model="model" :options="segmentedOptions" />
    </template>
    <template v-else-if="$slots.button || button != null">
      <div class="oui-select-container">
        <slot name="button">
          <OuiButton :title="Object.fromEntries(allOptions)?.[model] || button" dropdown />
        </slot>
        <select v-bind="$attrs" :id="id" v-model="model" class="oui-select-invisible">
          <slot>
            <template v-for="[key, value] in allOptions" :key="key">
              <option :value="key">
                {{ value }}
              </option>
            </template>
          </slot>
        </select>
      </div>
    </template>
    <template v-else>
      <select v-bind="$attrs" :id="id" v-model="model" class="oui-select">
        <slot>
          <template v-for="[key, value] in allOptions" :key="key">
            <option :value="key">
              {{ value }}
            </option>
          </template>
        </slot>
      </select>
    </template>
  </OuiFormItem>
</template>
