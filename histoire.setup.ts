import { defineSetupVue3 } from '@histoire/plugin-vue'

// import { createPinia } from 'pinia'
// import WrapperGlobal from './WrapperGlobal.vue'

// import './global.css'
import './stylus/story.styl'

export const setupVue3 = defineSetupVue3(({ app, addWrapper }) => {
  // const pinia = createPinia()
  // app.use(pinia)
  // addWrapper(WrapperGlobal)
})
