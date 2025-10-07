<script lang="ts" setup>
import './oui-form-item.styl'

defineOptions({
  inheritAttrs: false,
})

defineProps<{
  title?: string
  description?: string
  required?: boolean
  id?: string
  disabled?: boolean
}>()
</script>

<template>
  <template v-if="title != null || $slots.title || $slots.description || description">
    <div class="oui-form-item" :class="{ _disabled: disabled }">
      <label>
        <template v-if="$slots.title || title">
          <div class="oui-form-item-title">
            <slot name="title">
              {{ title }} <span v-if="required">*</span>
            </slot>
          </div>
        </template>
        <div class="oui-form-item-body">
          <slot v-bind="$attrs" />
        </div>
        <template v-if="$slots.description || description">
          <div class="oui-form-item-description">
            <slot name="description">
              {{ description }}
            </slot>
          </div>
        </template>
      </label>
    </div>
  </template>
  <template v-else>
    <slot v-bind="$attrs" />
  </template>
</template>
