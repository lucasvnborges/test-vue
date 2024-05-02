import { pt } from '@formkit/i18n'
import { defaultConfig } from '@formkit/vue'

type ConfigType = ReturnType<typeof defaultConfig>

const config: ConfigType = defaultConfig({
  locales: { pt },
  locale: 'pt'
})

export default config
