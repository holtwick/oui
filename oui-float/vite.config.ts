import { URL, fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

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

  // https://vitejs.dev/guide/build.html#library-mode
  build: {
    lib: {
      // formats: ['es'],
      // Could also be a dictionary or array of multiple entry points
      entry: [fileURLToPath(new URL('./lib/main.ts', import.meta.url))],
      name: 'main',
      fileName: 'main',
    },
    rollupOptions: {
    // preserveEntrySignatures: "strict",
      external: 'vue', // Object.keys(pkg.dependencies),
      output: {
        // preserveModules: true,
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
