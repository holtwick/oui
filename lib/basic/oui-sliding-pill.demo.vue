<script lang="ts" setup>
import type { OuiSlidingPillOption, OuiTab } from '@/lib'
import { ref } from 'vue'
import { OuiSegmented, OuiTabs } from '@/lib'

import './oui-sliding-pill.demo.styl'

// Tabs demo data
const selectedTab = ref<string>('overview')
const tabs: OuiTab[] = [
  { name: 'overview', title: 'Overview', pillClass: 'pill-blue' },
  { name: 'analytics', title: 'Analytics', pillClass: 'pill-green' },
  { name: 'settings', title: 'Settings', pillClass: 'pill-orange' },
  { name: 'users', title: 'Users', pillClass: 'pill-purple' },
]

// Segmented control demo data
const selectedSize = ref<string>('md')
const sizeOptions: OuiSlidingPillOption[] = [
  { name: 'sm', title: 'Small' },
  { name: 'md', title: 'Medium' },
  { name: 'lg', title: 'Large' },
]

const selectedTheme = ref<string>('light')
const themeOptions: OuiSlidingPillOption[] = [
  { name: 'light', title: 'Light' },
  { name: 'dark', title: 'Dark' },
  { name: 'auto', title: 'Auto' },
]

const selectedView = ref<string>('grid')
const viewOptions: OuiSlidingPillOption[] = [
  { name: 'list', title: 'List', icon: '📋' },
  { name: 'grid', title: 'Grid', icon: '⬜' },
  { name: 'card', title: 'Cards', icon: '🃏' },
]
</script>

<template>
  <div class="oui-sliding-pill-demo oui-text">
    <h1>Sliding Pill Components Demo</h1>

    <section>
      <h2>OUI Tabs</h2>
      <p>Navigation component with sliding pill indicator</p>

      <OuiTabs v-model="selectedTab" :tabs="tabs">
        <template #overview>
          <div class="tab-content">
            <h3>Overview Content</h3>
            <p>This is the overview tab content with general information.</p>
          </div>
        </template>

        <template #analytics>
          <div class="tab-content">
            <h3>Analytics Content</h3>
            <p>Here you would see charts and metrics.</p>
          </div>
        </template>

        <template #settings>
          <div class="tab-content">
            <h3>Settings Content</h3>
            <p>Configuration options would be displayed here.</p>
          </div>
        </template>

        <template #users>
          <div class="tab-content">
            <h3>Users Content</h3>
            <p>User management interface would be here.</p>
          </div>
        </template>
      </OuiTabs>

      <div class="current-selection">
        Current tab: <strong>{{ selectedTab }}</strong>
      </div>
    </section>

    <section>
      <h2>OUI Segmented Controls</h2>
      <p>Input-like segmented controls for option selection</p>

      <div class="segmented-examples">
        <div class="example">
          <label>Size Selection:</label>
          <OuiSegmented v-model="selectedSize" :options="sizeOptions" />
          <span class="selection">Selected: {{ selectedSize }}</span>
        </div>

        <div class="example">
          <label>Theme Selection:</label>
          <OuiSegmented v-model="selectedTheme" :options="themeOptions" size="lg" />
          <span class="selection">Selected: {{ selectedTheme }}</span>
        </div>

        <div class="example">
          <label>View Mode (with icons):</label>
          <OuiSegmented v-model="selectedView" :options="viewOptions" size="sm" />
          <span class="selection">Selected: {{ selectedView }}</span>
        </div>

        <div class="example">
          <label>Keyboard Navigation Demo:</label>
          <OuiSegmented v-model="selectedTheme" :options="themeOptions" />
          <div class="keyboard-hint">
            Use Tab to focus, Arrow keys to navigate, Enter/Space to select
          </div>
        </div>

        <div class="example">
          <label>Disabled State:</label>
          <OuiSegmented v-model="selectedTheme" :options="themeOptions" disabled />
        </div>

        <div class="example">
          <label>Error State:</label>
          <OuiSegmented v-model="selectedSize" :options="sizeOptions" error />
        </div>
      </div>
    </section>
  </div>
</template>
