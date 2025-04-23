import { createVuetify } from 'vuetify'
import { mdiWeatherSunny, mdiWeatherNight } from '@mdi/js'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const myThemes = {
  light: {
    dark: false,
    colors: {
      primary: '#B39DDB',
      secondary: '#F48FB1',
      accent: '#FFAB91',
      error: '#E57373',
      warning: '#FFB74D',
      info: '#81D4FA',
      success: '#AED581'
    }
  },
  dark: {
    dark: true,
    colors: {
      primary: '#9575CD',
      secondary: '#F06292',
      accent: '#FF8A65',
      error: '#EF5350',
      warning: '#FFB74D',
      info: '#4FC3F7',
      success: '#81C784'
    }
  }
}

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: myThemes
  },
  icons: {
    defaultSet: 'mdi',
    aliases: {
      'weather-sunny': mdiWeatherSunny,
      'weather-night': mdiWeatherNight,
    }
  }
})
