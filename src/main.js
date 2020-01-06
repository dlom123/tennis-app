import Vue from 'vue'
import App from '@/App'
import router from '@/router'
import store from '@/store'
import '@/registerServiceWorker'
import vuetify from '@/plugins/vuetify'
import '@/assets/sass/index.sass'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
