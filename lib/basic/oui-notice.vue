<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import './oui-notice.styl'
import { immediate } from 'zeed'

defineProps<{
  title?: string
  cover?: boolean
}>()

const root = ref()

watch(root, (el) => {
  if (el) {
    (el.querySelector('._focus')
    ?? el.querySelector('input,button,select')
    ?? el).focus()
  }
}, { immediate: true })
</script>

<template>
  <template v-if="cover">
    <Teleport to="body" :disabled="!cover">
      <div ref="root" v-focustrap class="oui-notice _notice_cover _keyboard_aware_height" data-noscroll="true">
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
    </Teleport>
  </template>
  <template v-else>
    <div v-focustrap class="oui-notice">
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
</template>
