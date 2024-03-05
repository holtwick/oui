import { defineConfig } from 'histoire'
import { HstVue } from '@histoire/plugin-vue'

// https://histoire.dev/guide/vue3/getting-started.html

export default defineConfig({
  plugins: [
    HstVue(),
  ],
  setupFile: 'stories/histoire.setup.ts',
  outDir: '.histoire/dist',
  storyMatch: [
    'stories/**/*.story.vue',
  ],
  storyIgnored: [
    '**/node_modules/**',
    '**/dist/**',
  ],
  // tree: {
  //   file: 'path',
  // },
})
