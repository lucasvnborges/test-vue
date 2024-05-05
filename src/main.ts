import './assets/main.css'
import 'vue3-toastify/dist/index.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { plugin, defaultConfig } from '@formkit/vue'
import App from './App.vue'
import router from './router'
import config from './config/formkit.config'
import Vue3Toasity, { type ToastContainerOptions } from 'vue3-toastify'

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
  app.use(Vue3Toasity, {
    autoClose: 3000
  } as ToastContainerOptions)
  app.mount('#app')
})
