<script lang="ts" setup>
import { useLocalStorage } from '@vueuse/core'
import { ref } from 'vue'

const props = defineProps<{
  title?: string
  collapsible?: boolean
  collapsed?: boolean
  hideArrow?: boolean
  name?: string
}>()

// const isCollapsed = defineModel({ required: false, default: false })
const isCollapsed = props.name
  ? useLocalStorage(`oui.card.collapsed.${props.name}`, props.collapsed ?? false)
  : ref(props.collapsed ?? false)

function toggleCollapse() {
  if (props.collapsible) {
    isCollapsed.value = !isCollapsed.value
  }
}
</script>

<template>
  <div class="oui-card" :class="{ 'is-collapsible': collapsible, 'is-collapsed': isCollapsed }">
    <div v-if="$slots.header || $slots.title || title" class="oui-card-header" :class="{ 'is-clickable': collapsible }" @click="toggleCollapse">
      <slot name="header">
        <div class="oui-card-header-content">
          <span v-if="collapsible && !hideArrow" class="oui-card-arrow" :class="{ 'is-collapsed': isCollapsed }">
            ▼
          </span>
          <slot name="title">
            {{ title }}
          </slot>
        </div>
      </slot>
    </div>
    <div v-if="!isCollapsed" class="oui-card-body">
      <slot />
    </div>
    <div v-if="$slots.footer && !isCollapsed" class="oui-card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>
