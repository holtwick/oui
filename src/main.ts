import { createApp } from 'vue'
import { valueToBoolean } from 'zeed'

const isE2E = valueToBoolean(import.meta.env.APP_E2E, false)

if (isE2E) {
  import('./app-e2e.vue').then(app => createApp(app.default).mount('#app'))
}
else {
  import('./app.vue').then(app => createApp(app.default).mount('#app'))
}
