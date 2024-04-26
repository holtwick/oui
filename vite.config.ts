/// <reference types="histoire" />

import { URL, fileURLToPath } from 'node:url'
import process from 'node:process'
import type { UserConfig } from 'vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

const config: UserConfig = {
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./lib', import.meta.url)),
    },
  },
  server: {
    port: 8080,
  },

}

if (process.env.HISTOIRE) {
  config.histoire = {
    setupFile: '/histoire.setup.ts',
  }
}
else if (!process.env.BUILD_DEMO) {
  config.plugins?.push(
    dts({
      rollupTypes: true,
    }),
  )

  // https://vitejs.dev/guide/build.html#library-mode
  config.build = {
    lib: {
      formats: ['es'],
      entry: [fileURLToPath(new URL('./lib/lib.ts', import.meta.url))],
      fileName: 'lib',
    },
    rollupOptions: {
      // preserveEntrySignatures: "strict",
      external: 'vue', // Object.keys(pkg.dependencies),
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig(config)
