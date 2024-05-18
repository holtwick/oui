<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core'
import { computed, onMounted, ref } from 'vue'
import { debounce, last, sortedOrderby, throttle, useDefer } from 'zeed'
import pkg from '../package.json'
import OuiText from '../lib/basic/oui-text.vue'
import { OuiButton, OuiCheckbox, OuiNotice, OuiResizeable, OuiTooltipActivator } from '@/lib'

import './index.styl'

const modes = import.meta.glob('../**/(app-*|*.demo).vue', {
  import: 'default',
  eager: true,
})

const docs = import.meta.glob('../**/*.md', {
  import: 'default',
  eager: true,
})

const mode = useLocalStorage('oui.demo.mode', './app-text.vue')
const dark = useLocalStorage('oui.demo.dark', true)

const showProperties = useLocalStorage('oui.demo.properties', true)
const showUI = ref(true)

const allModes = computed(() => {
  return sortedOrderby(Object.keys(modes).map(value => ({
    value,
    title: last(value.split('/'))?.replace(/\.(demo\.vue|vue)/gi, ''),
  })), 'title')
})

const comp = computed(() => {
  return modes[mode.value]
})

const doc = computed(() => {
  return docs[mode.value.replace(/\.demo\.vue$/, '.md')]
})

const active = ref(false)

onMounted(() => {
  active.value = true
})

function toggleDark() {
  document.documentElement.classList.toggle('dark')
}

onMounted(() => {
  const app = document.querySelector('#app') as HTMLElement

  // app.addEventListener('touchstart', (ev: MouseEvent) => {
  //   console.log('move', ev.target)
  //   ev.preventDefault()
  //   ev.stopPropagation()
  // })

  let elementFocus: HTMLElement | undefined

  // const fn = debounce(() => {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: 'instant',
  //   })
  //   elementFocus?.scrollIntoView({
  //     behavior: 'instant',
  //     block: 'center',
  //     inline: 'center',
  //   })
  // }, { delay: 1000 })

  // window.addEventListener('scroll', (ev) => {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: 'instant',
  //   })

  //   console.log('scroll', ev.target)
  //   fn()
  // })

  // app.addEventListener('focus', (ev: FocusEvent) => {
  //   elementFocus = ev.target as any
  //   setTimeout(() => {
  //     elementFocus?.scrollIntoView({
  //       behavior: 'instant',
  //       block: 'center',
  //       inline: 'center',
  //     })
  //   }, 1000)
  // })

  // app.addEventListener('blur', () => {
  //   elementFocus = undefined
  // })

  //   console.log('focus', document.body.scrollTop, ev.target)
  //   // ev.preventDefault()
  //   // ev.stopPropagation()
  //   // window.scrollTo(0, 0)
  //   const el = ev.target as HTMLElement
  //   window.setTimeout(() => {
  //     console.log('scroll', window.scrollY, document.body.scrollTop)
  //     window.scrollTo({
  //       top: 0,
  //       behavior: 'instant',
  //     })
  //     // document.body.scrollTop = 0
  //     // window.scrollTo(0, 0)
  //     window.setTimeout(() => {
  //       el?.scrollIntoView({
  //         behavior: 'instant',
  //         block: 'center',
  //         inline: 'center',
  //       })
  //     }, 500)
  //     // document.querySelector('sandbox')?.scrollIntoView()
  //   }, 1000)
  // }, {
  //   passive: false,
  //   capture: true,
  // })

  // app.addEventListener('touchmove', (ev: MouseEvent) => {
  //   console.log('move', ev.target)
  //   ev.preventDefault()
  //   ev.stopPropagation()
  //   window.scrollTo(0, 0)
  // }, {
  //   passive: false,
  //   capture: true,
  // })

  // app.addEventListener('touchmove', (ev: MouseEvent) => {
  //   console.log('move', ev.target)
  //   ev.preventDefault()
  //   ev.stopPropagation()
  //   window.scrollTo(0, 0)
  // }, {
  //   passive: false,
  //   capture: true,
  // })
})
</script>

<template>
  <div class="oui-demo">
    <div class="oui-demo-header">
      <select v-model="mode" class="oui-select">
        <template v-for="({ value, title }) in allModes" :key="value">
          <option :value="value">
            {{ title }}
          </option>
        </template>
      </select>

      <div class="_space" />

      <div class="_middle">
        <OuiCheckbox v-model="dark" switch tooltip="Show light and dark side by side">
          dual
        </OuiCheckbox>
      </div>

      <div class="_space" />

      <div class="_middle">
        v{{ pkg.version }}
      </div>

      <OuiButton @click="toggleDark">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun-moon"><path d="M12 8a2.83 2.83 0 0 0 4 4 4 4 0 1 1-4-4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.9 4.9 1.4 1.4" /><path d="m17.7 17.7 1.4 1.4" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.3 17.7-1.4 1.4" /><path d="m19.1 4.9-1.4 1.4" /></svg>
      </OuiButton>

      <OuiButton @click="showProperties = !showProperties">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-panel-right"><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M15 3v18" /></svg>
      </OuiButton>
    </div>
    <div class="oui-demo-body">
      <div id="sandbox" class="oui-demo-sandbox" :class="{ _sidebyside: dark }">
        <template v-if="active && comp">
          <div>
            <component :is="comp" />
          </div>
          <div v-if="dark" class="dark default">
            <component :is="comp" />
          </div>
        </template>
        <template v-else>
          <OuiNotice title="Choose a demo">
            <template #icon>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-triangle-alert"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" /><path d="M12 9v4" /><path d="M12 17h.01" /></svg>
            </template>
            <p>
              From the select field on the top right
              <br>
              you may choose a demo.
            </p>
          </OuiNotice>
        </template>
      </div>
      <OuiResizeable
        :hide="!showProperties"
        name="demo.props"
        :size="400"
        side="left"
        :max-size="800"
        :min-size="200"
        color="var(--t3-fg)"
        class="oui-demo-sidebar"
      >
        <div class="oui-demo-props">
          <div id="props" />
          <br>
          <div id="state" />
        </div>
        <template v-if="doc">
          <OuiResizeable
            :hide="!showProperties"
            name="demo.doc"
            :size="400"
            side="top"
            :max-size="800"
            :min-size="60"
            color="var(--t3-fg)"
            class="oui-demo-state"
          >
            <OuiText>
              <component :is="doc" />
            </OuiText>
          </OuiResizeable>
        </template>
      </OuiResizeable>
    </div>
  </div>
  <OuiTooltipActivator />
</template>
