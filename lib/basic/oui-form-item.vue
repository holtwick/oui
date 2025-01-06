<script lang="ts" setup>
import './oui-form-item.styl'

defineProps<{
  title?: string
  description?: string
  required?: boolean
  id?: string
  disabled?: boolean
}>()
</script>

<template>
  <template v-if="title != null || $slots.description || description">
    <div class="oui-form-item" :class="{ _disabled: disabled }">
      <label>
        <div v-if="title" class="oui-form-item-title">
          {{ title }}
          <span v-if="required">*</span>
        </div>
        <div class="oui-form-item-body">
          <slot />
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
    <slot />
  </template>
</template>
