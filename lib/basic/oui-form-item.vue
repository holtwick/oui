<script lang="ts" setup>
import './oui-form-item.styl'

defineProps<{
  title?: string
  description?: string
  required?: boolean
  id?: string
}>()
</script>

<template>
  <template v-if="title || $slots.description || description">
    <div class="oui-form-item">
      <label>
        <div class="oui-form-item-title">
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
