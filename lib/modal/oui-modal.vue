<script lang="ts" setup>
import { onKeyStroke } from '@vueuse/core'
import { ref } from 'vue'
import { OuiClose } from '../basic'
import { vFocustrap } from './oui-modal.focustrap'

import './oui-modal.styl'

withDefaults(defineProps<{
  close?: boolean
  title?: string
  transition?: string
  noSheet?: boolean
  size?: 'small' | 'normal' | 'large'
}>(), {
  close: false,
  noSheet: false,
  size: 'normal',
})

const emit = defineEmits<{
  close: []
  cancel: []
  open: []
}>()

const _active = defineModel({ default: true })

onKeyStroke('Escape', (e) => {
  if (_active.value) {
    e.preventDefault()
    e.stopPropagation()
    _active.value = false
  }
})

const root = ref()

function doCancel() {
  emit('cancel')
  doClose()
}

function doClose() {
  emit('close')
  _active.value = false
  // emit('update:modelValue', false)
}

function didOpen() {
  if (root.value) {
    const el = root.value.querySelector('._focus')
      ?? root.value.querySelector('input,button,select')
      ?? root.value
    el.focus()
  }

  emit('open')
}

const name = 'oui-modal' // computed(() => String(attrs.class || 'oui-modal').split(/\s+/gim)?.[0])
</script>

<template>
  <Teleport to="body">
    <Transition
      appear
      :name="transition ?? `${name}-transition`"
      @after-enter="didOpen"
    >
      <div
        v-if="_active"
        ref="root"
        :class="{
          [name]: true,
          [$attrs.class as string]: true,
          _active,
          _modal_sheet: !noSheet,
          _modal_has_footer: $slots.footer,
          [`_modal_size_${size}`]: true }"
        :tabindex="-1"
        aria-modal="true"
        role="dialog"
      >
        <div
          class="_modal_overlay"
          aria-label="Close"
          @click="doCancel"
        />
        <div v-focustrap class="_modal_container">
          <button
            v-if="close"
            tooltip="Close"
            class="oui-modal-close _modal_close"
            @click="doCancel"
          >
            <slot name="close">
              <OuiClose />
            </slot>
          </button>
          <header
            v-if="title || $slots.title || $slots.header || close === true"
            class="oui-modal-header _modal_header"
          >
            <div v-if="title || $slots.title" class="oui-modal-title title _modal_title">
              <slot name="title">
                {{ title }}
              </slot>
            </div>

            <slot name="header" />
          </header>
          <section class="oui-modal-body body _modal_body">
            <slot />
          </section>
          <footer v-if="$slots.footer" class="oui-modal-footer footer _modal_footer">
            <slot name="footer" />
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
