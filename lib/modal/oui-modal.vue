<script lang="ts" setup>
import { onKeyStroke, useEventListener } from '@vueuse/core'
import { onMounted, ref } from 'vue'
import type { LoggerInterface } from 'zeed'
import { Logger } from 'zeed'
import { OuiClose } from '../basic'
import { vFocustrap } from './oui-focustrap-directive'

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

const emit = defineEmits(['close', 'cancel'])

const log: LoggerInterface = Logger('oui-modal')

const _active = defineModel({ default: true })

onKeyStroke('Escape', (e) => {
  if (_active.value) {
    e.preventDefault()
    e.stopPropagation()
    _active.value = false
  }
})

const rootCss = document.documentElement.style

if (window.visualViewport != null) {
  function resizeHandler() {
    const visibleHeight = `${window.visualViewport?.height.toString()}px`
    const visibleOffsetTop = `${window.visualViewport?.offsetTop.toString()}px`
    document.documentElement.style.height = visibleHeight
    log('new height', visibleHeight, window.visualViewport)
    rootCss.setProperty('--visible-height', visibleHeight)
    // rootCss.setProperty('--visible-offset-top', visibleOffsetTop)
    // window.scrollTo(0, 0)
  }

  useEventListener(window.visualViewport, 'resize', resizeHandler)
  useEventListener(window.visualViewport, 'scroll', resizeHandler)

  onMounted(resizeHandler)
}

const root = ref()

function doCancel() {
  emit('cancel')
  doClose()
}

function doClose() {
  emit('close', false)
  _active.value = false
  // emit('update:modelValue', false)
}

function didOpen() {
  if (root.value)
    root.value.querySelector('.focus')?.focus()

  // useEventListener(root.value, 'touchmove', (e: any) => e.preventDefault(), true)
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
          [`_modal_size_${size}`]: true }"
        :tabindex="-1"
        aria-modal="true"
        role="dialog"
      >
        <div
          class="oui-modal-overlay _modal_overlay"
          aria-label="Close"
          @click="doCancel"
        />
        <div v-focustrap class="oui-modal-container _modal_container">
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
