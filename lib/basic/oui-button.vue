<script lang="ts" setup>
import { computed, useSlots } from 'vue'

import './oui-form.styl'

const props = withDefaults(defineProps<{
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

const slots = useSlots()

const slotText = computed(() => {
  const defaultSlot = slots.default?.({})

  if (!defaultSlot || defaultSlot.length === 0)
    return ''

  // Extract text content from slot
  const textContent = defaultSlot.map((vnode: any) => {
    if (typeof vnode.children === 'string') {
      return vnode.children
    }
    return ''
  }).join('')

  return textContent
})

const buttonTitle = computed(() => (props.title || slotText.value || '').trim())
</script>

<template>
  <a
    v-if="href && !disabled" :href="href" :target="target" class="oui-button" :class="[
      mode && `_button_mode_${mode}`,
      size && `_button_size_${size}`,
      dropdown && `_button_dropdown`,
    ]" role="button" :aria-label="buttonTitle" :aria-disabled="disabled"
  >
    <slot>{{ title }}</slot>
  </a>
  <button
    v-else :disabled="disabled ? true : undefined" class="oui-button" :class="[
      mode && `_button_mode_${mode}`,
      size && `_button_size_${size}`,
      dropdown && `_button_dropdown`,
    ]" :aria-label="buttonTitle" :aria-disabled="disabled"
  >
    <slot>{{ title }}</slot>
  </button>
</template>
