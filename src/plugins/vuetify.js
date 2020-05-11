import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'mdiSvg'
  },
  theme: {
    options: {
      customProperties: true
    },
    themes: {
      light: {
        primary: '#7F56C3',
        secondary: '#51C2F7'
      },
      dark: {
        primary: '#7F56C3',
        secondary: '#51C2F7'
      }
    }
  }
})
