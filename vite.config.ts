import { URL, fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({
      rollupTypes: true,
    }),
  ],
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
})
