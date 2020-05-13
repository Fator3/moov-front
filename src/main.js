import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
import 'nprogress/nprogress.css'
import Vuelidate from 'vuelidate'
import DateFilter from './filters/date'
import vuetify from './plugins/vuetify'
import ScrollLoader from 'vue-scroll-loader'
import VueAnalytics from 'vue-analytics'

Vue.filter('date', DateFilter)
Vue.use(Vuelidate)
Vue.config.productionTip = false
Vue.use(ScrollLoader)

Vue.use(VueAnalytics, {
  id: 'UA-162394288-1'
})

const requireComponent = require.context(
  './components',
  false,
  /Base[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)

  const componentName = upperFirst(
    camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, '$1'))
  )

  Vue.component(componentName, componentConfig.default || componentConfig)
})

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
