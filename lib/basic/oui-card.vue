<script lang="ts" setup>
defineProps<{
  title?: string
}>()
</script>

<template>
  <div class="oui-card">
    <div v-if="$slots.header || $slots.title || title" class="oui-card-header">
      <slot name="header">
        <slot name="title">
          {{ title }}
        </slot>
      </slot>
    </div>
    <div class="oui-card-body">
      <slot />
    </div>
    <div v-if="$slots.footer" class="oui-card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>
