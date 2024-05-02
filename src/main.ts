import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

if (process.env.NODE_ENV === 'development') {
  const { worker } = await import('./mocks/browser')
  worker.start()
}

// @ts-ignore
const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
