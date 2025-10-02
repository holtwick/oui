<script setup lang="ts">
import { useDark, useLocalStorage, useToggle } from '@vueuse/core'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { last, sortedOrderby } from 'zeed'
import { OuiButton, OuiMobileActivator, OuiNotice, OuiResizeable, OuiSelect, OuiText, OuiTooltipActivator } from '@/lib'

import 'v-calendar/style.css'
import './app.styl'

const modes = import.meta.glob('../**/*.demo.vue', {
  import: 'default',
  eager: true,
})

const docs = import.meta.glob(['../lib/**/*.md', '../src/**/*.md'], {
  import: 'default',
  eager: true,
})

// Get initial mode from hash or fallback to localStorage
function getModeFromHash(): string {
  const hash = location.hash.slice(1)
  if (hash && Object.keys(modes).includes(hash)) {
    return hash
  }
  return ''
}

const mode = ref(getModeFromHash() || useLocalStorage('oui.demo.mode', './app.demo.vue').value)
const dark = useLocalStorage('oui.demo.dark', false)

const showProperties = useLocalStorage('oui.demo.properties', true)
const showSidebar = useLocalStorage('oui.demo.sidebar', true)
const showUI = useLocalStorage('oui.demo.ui', true)

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

// Watch for hash changes and update mode
function handleHashChange() {
  const hash = location.hash.slice(1)
  if (hash && Object.keys(modes).includes(hash)) {
    mode.value = hash
  }
}

// Watch mode changes and update hash
watch(mode, (newMode) => {
  if (newMode && location.hash !== `#${newMode}`) {
    location.hash = newMode
  }
}, { immediate: true })

onMounted(() => {
  active.value = true
  window.addEventListener('hashchange', handleHashChange)
})

// Clean up event listener when component unmounts
onUnmounted(() => {
  window.removeEventListener('hashchange', handleHashChange)
})

const isDark = useDark()
const toggleDark = useToggle(isDark)

function openInVSCode(filePath?: string) {
  const targetFile = filePath || mode.value
  if (targetFile) {
    const absolutePath = targetFile
      .replace('../', '/Users/dirk/work/github-oui/')
      .replace('./', '/Users/dirk/work/github-oui/src/')
    location.assign(`vscode://file${absolutePath}`)
    // window.open(`vscode://file${absolutePath}`)
  }
}

function openCurrentInVSCode() {
  openInVSCode(mode.value)
}
</script>

<template>
  <div class="oui-demo">
    <div class="oui-demo-header">
      <OuiButton class="oui-demo-sidebar-toggle" @click="showSidebar = !showSidebar">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-panel-left">
          <rect width="18" height="18" x="3" y="3" rx="2" />
          <path d="M9 3v18" />
        </svg>
      </OuiButton>
      <OuiSelect v-model="mode">
        <template v-for="({ value, title }) in allModes" :key="value">
          <option :value="value">
            {{ title }}
          </option>
        </template>
      </OuiSelect>

      <!-- <div class="_space" />

      <div class="_middle">
        <OuiCheckbox v-model="dark" switch tooltip="Show light and dark side by side">
          dual
        </OuiCheckbox>
      </div> -->

      <div class="_space" />

      <!-- <div class="_middle">
        v{{ pkg.version }}
      </div> -->

      <OuiButton @click="toggleDark()" @dblclick="dark = !dark">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun-moon">
          <path d="M12 8a2.83 2.83 0 0 0 4 4 4 4 0 1 1-4-4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.9 4.9 1.4 1.4" />
          <path d="m17.7 17.7 1.4 1.4" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.3 17.7-1.4 1.4" />
          <path d="m19.1 4.9-1.4 1.4" />
        </svg>
      </OuiButton>

      <OuiButton v-if="mode" @click="openCurrentInVSCode">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-external-link">
          <path d="M15 3h6v6" />
          <path d="M10 14 21 3" />
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        </svg>
      </OuiButton>

      <OuiButton @click="showProperties = !showProperties">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-panel-right">
          <rect width="18" height="18" x="3" y="3" rx="2" />
          <path d="M15 3v18" />
        </svg>
      </OuiButton>
    </div>
    <div class="oui-demo-body">
      <OuiResizeable :hide="!showSidebar" name="demo.sidebar" :size="250" side="right" :max-size="400" :min-size="200" color="var(--t3-fg)" class="oui-demo-navigation">
        <div class="oui-demo-nav-content">
          <div class="oui-demo-nav-list">
            <div v-for="({ value, title }) in allModes" :key="value" :class="{ active: mode === value }" class="oui-demo-nav-item">
              <button class="oui-demo-nav-button" @click="mode = value">
                {{ title }}
              </button>
              <button class="oui-demo-nav-open" title="Open in VSCode" @click="openInVSCode(value)">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-external-link">
                  <path d="M15 3h6v6" />
                  <path d="M10 14 21 3" />
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </OuiResizeable>
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
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-triangle-alert">
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
                <path d="M12 9v4" />
                <path d="M12 17h.01" />
              </svg>
            </template>
            <p>
              From the select field on the top right
              <br>
              you may choose a demo.
            </p>
          </OuiNotice>
        </template>
      </div>
      <OuiResizeable :hide="!showProperties" name="demo.props" :size="400" side="left" :max-size="800" :min-size="200" color="var(--t3-fg)" class="oui-demo-sidebar">
        <div class="oui-demo-props">
          <div id="props" />
          <br>
          <div id="state" />
        </div>
        <template v-if="doc">
          <OuiResizeable :hide="!showProperties" name="demo.doc" :size="400" side="top" :max-size="800" :min-size="60" color="var(--t3-fg)" class="oui-demo-state">
            <OuiText class="oui-demo-markdown">
              <component :is="doc" />
            </OuiText>
          </OuiResizeable>
        </template>
      </OuiResizeable>
    </div>
  </div>
  <OuiTooltipActivator />
  <OuiMobileActivator />
</template>
