import { createApp } from 'vue'

import('./app-mobile.vue').then(app => createApp(app.default).mount('#app'))
// import('./app.vue').then(app => createApp(app.default).mount('#app'))

// import app from './app.vue'
// import app from './app-mobile.vue'
// createApp(app).mount('#app')
