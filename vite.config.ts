import type { UserConfig } from 'vite'
import process from 'node:process'
import { fileURLToPath, URL } from 'node:url'
import MarkdownItShiki from '@shikijs/markdown-it'
import Vue from '@vitejs/plugin-vue'
import Markdown from 'unplugin-vue-markdown/vite'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { qrcode } from 'vite-plugin-qrcode'
import vueDevTools from 'vite-plugin-vue-devtools'
import { valueToBoolean } from 'zeed'
import pkg from './package.json'

const isE2E = valueToBoolean(process.env.APP_E2E, false)
const BUILD_LIB = valueToBoolean(process.env.BUILD_LIB, false)

const config: UserConfig = {
  server: {
    port: isE2E ? 5174 : undefined,
    strictPort: isE2E,
  },
  envPrefix: ['APP_', 'VITE_'],
  plugins: [
    qrcode(),

    Vue({
      include: [/\.vue$/, /\.md$/],
    }),

    !isE2E && vueDevTools(),

    // https://github.com/antfu/vite-plugin-md
    // Don't need this? Try vitesse-lite: https://github.com/antfu/vitesse-lite
    Markdown({
      headEnabled: false,
      // Exclude test and report directories to prevent conflicts
      exclude: [
        '**/tests/**',
        '**/test-results/**',
        '**/playwright-report/**',
        '**/node_modules/**',
      ],
      async markdownItSetup(md) {
        // https://prismjs.com/
        // md.use(MarkdownPrism)

        md.use(await MarkdownItShiki({
          langs: [
            'vue',
            'js',
            'ts',
            'styl',
            'css',
            'scss',
            'sass',
            'swift',
            'objc',
            'html',
            'json',
            'json5',
            'console',
            'md',
            'xml',
            'yaml', // Add YAML support for markdown frontmatter
          ],
          themes: {
            light: 'github-light',
            dark: 'github-dark',
          },
        }))
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./lib', import.meta.url)),
    },
    conditions: ['module', 'browser'],
  },
  // server: {
  //   port: 8080,
  // },
}

if (BUILD_LIB) {
  config.publicDir = false // Don't serve or copy public folder for library builds

  config.plugins?.push(
    dts({
      rollupTypes: false, // Generate separate .d.ts files for better tree-shaking
      include: ['lib/**/*'], // Only generate types for library code, not demo/src code
    }),
  )

  // https://vitejs.dev/guide/build.html#library-mode
  config.build = {
    // sourcemap: false,
    // cssMinify: 'lightningcss',
    // cssTarget: 'es2015',

    lib: {
      formats: ['es'],
      entry: [fileURLToPath(new URL('./lib/lib.ts', import.meta.url))],
      fileName: 'lib',
    },
    rollupOptions: {
      // preserveEntrySignatures: "strict",
      external: [
        'vue',
        '@vueuse/core',
        'zeed',
        ...Object.keys(pkg.optionalDependencies),
      ],
    },
  }
}
else {
  // Demo build - use separate output directory
  config.build = {
    outDir: 'www',
  }
}

// https://vitejs.dev/config/
export default defineConfig(config)
