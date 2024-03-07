import { defineConfig } from 'histoire'
import { HstVue } from '@histoire/plugin-vue'

// https://histoire.dev/guide/vue3/getting-started.html

export default defineConfig({
  plugins: [
    HstVue(),
  ],
  setupFile: 'histoire.setup.ts',
  outDir: '.histoire/dist',
  storyMatch: [
    '**/*.story.vue',
  ],
  storyIgnored: [
    '**/node_modules/**',
    '**/dist/**',
  ],
  tree: {
    file: 'path',
  },
})
