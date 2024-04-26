<script lang="ts" setup>
defineProps<{
  title?: string
}>()
</script>

<template>
  <div class="oui-notice">
    <div class="oui-notice-body">
      <div class="oui-notice-icon">
        <slot name="icon" />
      </div>
      <div class="oui-notice-title">
        <slot name="title">
          {{ title }}
        </slot>
      </div>
      <div class="oui-notice-message">
        <slot />
      </div>
    </div>
  </div>
</template>
