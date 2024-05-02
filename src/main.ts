import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { plugin, defaultConfig } from '@formkit/vue'
import App from './App.vue'
import router from './router'
// @ts-ignore
import config from '../formkit.config'

async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return
  }
  const { worker } = await import('./mocks/browser')
  return worker.start()
}

enableMocking().then(() => {
  // @ts-ignore
  const app = createApp(App)

  app.use(createPinia())
  app.use(router)
  app.use(plugin, defaultConfig(config))
  app.mount('#app')
})
