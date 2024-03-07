/// <reference types="histoire" />

import { URL, fileURLToPath } from 'node:url'
import process from 'node:process'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

const plugins = [
  vue(),
]

if (!process.env.HISTOIRE) {
  plugins.push(
    dts({
      rollupTypes: true,
    }),
  )
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins,
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./lib', import.meta.url)),
    },
  },

  // https://vitejs.dev/guide/build.html#library-mode
  build: {
    lib: {
      formats: ['es'],
      entry: [fileURLToPath(new URL('./lib/lib.ts', import.meta.url))],
      fileName: 'lib',
    },
    rollupOptions: {
      // preserveEntrySignatures: "strict",
      external: 'vue', // Object.keys(pkg.dependencies),
    },
  },

  histoire: {
    setupFile: '/histoire.setup.ts',
  },
})
