<script lang="ts" setup>
import { OuiButton, OuiClose, OuiLog, useLog, useMenu, useMenuWithValue, vMenu } from '@/lib'
import OuiText from '../basic/oui-text.vue'

// const log: LoggerInterface = Logger('oui-menu.demo')
const log = useLog('menu-events')

const simpleMenu = useMenu([
  { title: 'CONTACT', header: true },
  {
    title: `ABC`,
    action: self => log('action', self),
    icon: OuiClose,
  },
  {},
  { title: 'SUBMENU EXAMPLE', header: true },
  {
    title: 'File',
    submenu: [
      { title: 'New', action: self => log('New file', self) },
      { title: 'Open', action: self => log('Open file', self) },
      {},
      { title: 'Save', action: self => log('Save file', self) },
      { title: 'Save As...', action: self => log('Save as file', self) },
    ],
  },
  {
    title: 'Edit',
    submenu: [
      { title: 'Undo', action: self => log('Undo', self) },
      { title: 'Redo', action: self => log('Redo', self) },
      {},
      { title: 'Cut', action: self => log('Cut', self) },
      { title: 'Copy', action: self => log('Copy', self) },
      { title: 'Paste', action: self => log('Paste', self) },
    ],
  },
  {},
  { title: 'REGULAR ITEMS', header: true },
  {
    title: `action XYZ`,
    action: self => log('action', self),
  },
  {
    title: `url holtwick.de`,
    url: 'https://holtwick.de/en/imprint',
  },
])

const menu = useMenuWithValue((item: number) => [{
  title: `Hello ${item}`,
  action: () => {
    log('hallo', { item })
  },
}])
</script>

<template>
  <OuiText>
    <h1>v-menu</h1>
    <OuiButton v-menu="simpleMenu">
      Click me
    </OuiButton>
    <p>You may click with right or left mouse key.</p>

    <h1>useMenuWithValue</h1>
    <OuiButton v-menu="menu(1)">
      Click 1
    </OuiButton>
    <OuiButton v-menu="menu(2)">
      Click 2
    </OuiButton>
    <p>You may click with right or left mouse key.</p>

    <h1>Menu Events</h1>
    <OuiLog :log="log" />
  </OuiText>
</template>
