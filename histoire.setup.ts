import { defineSetupVue3 } from '@histoire/plugin-vue'
import WrapperGlobal from './src/histoire-wrapper.vue'

import './stylus/default-story.styl'

export const setupVue3 = defineSetupVue3(({ app, addWrapper }) => {
  addWrapper(WrapperGlobal)
})
