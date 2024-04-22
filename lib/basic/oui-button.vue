<script lang="ts" setup>
withDefaults(defineProps<{
  title?: string
  mode?: 'primary' | 'danger' | 'secondary' | 'ghost'
  size?: 'small' | 'normal' | 'large'
  dropdown?: boolean
}>(), {
  mode: 'secondary',
  size: 'normal',
  dropdown: false,
})
</script>

<template>
  <button
    class="oui-button" :class="[
      mode && `_button_mode_${mode}`,
      size && `_button_size_${size}`,
      dropdown && `_button_dropdown`,
    ]"
  >
    <slot>{{ title }}</slot>
  </button>
</template>
