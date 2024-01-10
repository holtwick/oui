import { URL, fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import pkg from './package.json'

const name = pkg.name

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    lib: {
      formats: ['es'],
      // Could also be a dictionary or array of multiple entry points
      entry: [fileURLToPath(new URL('./lib/main.ts', import.meta.url))],
      name: 'main',
      fileName: 'main',
    },
    rollupOptions: {
    // preserveEntrySignatures: "strict",
      external: 'vue', // Object.keys(pkg.dependencies),
      output: {
        preserveModules: true,

        // https://github.com/vitejs/vite/issues/1579#issuecomment-1755386035
        intro: 'import "./style.css";',
      },
    },
  },
})
