import { createApp } from 'vue'

import('./app-mobile.vue').then(app => createApp(app.default).mount('#app'))
// import('./app.vue').then(app => createApp(app.default).mount('#app'))

// createApp(App).mount('#app')
