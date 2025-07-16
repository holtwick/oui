<script lang="ts" setup>
import type { LoggerInterface } from 'zeed'
import { Logger } from 'zeed'
import { OuiButton, OuiClose, useMenu, useMenuWithValue, vMenu } from '@/lib'

const log: LoggerInterface = Logger('oui-menu.demo')

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
  <div>
    <h1>v-menu</h1>
    <OuiButton ref="button" v-menu="simpleMenu">
      Click me
    </OuiButton>
    <p>You may click with right or left mouse key.</p>

    <h1>useMenuWithValue</h1>
    <OuiButton ref="button" v-menu="menu(1)">
      Click 1
    </OuiButton>
    <OuiButton ref="button" v-menu="menu(2)">
      Click 2
    </OuiButton>
    <p>You may click with right or left mouse key.</p>
  </div>
</template>
