import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import 'vuetify/styles'
import './style.css'
import '@mdi/font/css/materialdesignicons.css'

import vuetify from './plugins/vuetify'

const app = createApp(App)
app.use(router)
app.use(i18n)
app.use(vuetify)
app.mount('#app')