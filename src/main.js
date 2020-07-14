import Vue from 'vue'
import App from '@/App'
import router from '@/router'
import store from '@/store'
import axios from 'axios'
import vueDebounce from 'vue-debounce'
import '@/registerServiceWorker'
import vuetify from '@/plugins/vuetify'
import '@/assets/sass/index.sass'

Vue.config.productionTip = false
// create a globally-accessible instance of axios configured for the back-end API
Vue.prototype.$http = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL
})

Vue.use(vueDebounce)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
