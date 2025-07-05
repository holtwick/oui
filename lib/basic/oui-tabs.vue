<script lang="ts" setup generic="K extends string">
import type { OuiTab } from './_types'
import { computed } from 'vue'
import OuiSlider from './oui-slider.vue'
import './oui-tabs.styl'

const props = defineProps<{
  tabs: OuiTab<K>[]
  className?: string
}>()

const modelValue = defineModel<K>({ required: false })

const name = computed<string>(() => modelValue.value ?? props.tabs?.[0]?.name ?? 'default')
</script>

<template>
  <div class="oui-tabs">
    <OuiSlider
      v-model="modelValue"
      :options="tabs"
      class="oui-tabs-nav _nav"
    >
      <template #default="{ options, updateModelValue }">
        <template v-for="tab in options" :key="tab.name">
          <button :class="{ _active: modelValue === tab.name }" @click="updateModelValue(tab.name)">
            <slot :name="`tab-${tab.name}`" v-bind="{ tab }">
              <template v-if="tab.icon">
                <component :is="tab.icon" />
              </template>
              {{ tab.title ?? tab.name }}
            </slot>
          </button>
        </template>
      </template>
    </OuiSlider>

    <div>
      <slot :key="name" :name="name">
        <slot />
      </slot>
    </div>
  </div>
</template>
