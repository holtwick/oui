<script lang="ts" setup>
import './oui-form.styl'

withDefaults(defineProps<{
  title?: string
  mode?: 'primary' | 'danger' | 'neutral' | 'success' | 'ghost'
  size?: 'small' | 'normal' | 'large'
  dropdown?: boolean
  outline?: boolean
  href?: string
  target?: string
  disabled?: boolean
}>(), {
  mode: 'neutral',
  size: 'normal',
  dropdown: false,
  outline: false,
  target: '_blank',
  disabled: false,
})
</script>

<template>
  <a
    v-if="href && !disabled" :href="href" :target="target" class="oui-button" :class="[
      mode && `_button_mode_${mode}`,
      size && `_button_size_${size}`,
      dropdown && `_button_dropdown`,
    ]"
  >
    <slot>{{ title }}</slot>
  </a>
  <button
    v-else :disabled="disabled" class="oui-button" :class="[
      mode && `_button_mode_${mode}`,
      size && `_button_size_${size}`,
      dropdown && `_button_dropdown`,
    ]"
  >
    <slot>{{ title }}</slot>
  </button>
</template>
