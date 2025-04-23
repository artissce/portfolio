import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import es from './locales/es.json'
import de from './locales/de.json'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  availableLocales: ['es', 'en', 'de'],
  messages: { en, es, de }
})

export default i18n