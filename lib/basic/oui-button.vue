<script lang="ts" setup>
withDefaults(defineProps<{
  title?: string
  mode?: 'primary' | 'danger' | 'secondary' | 'ghost'
  size?: 'small' | 'normal' | 'large'
}>(), {
  mode: 'secondary',
  size: 'normal',
})
</script>

<template>
  <button class="oui-button" :class="[mode && `_button_mode_${mode}`, size && `_button_size_${size}`]">
    <slot>{{ title }}</slot>
  </button>
</template>
