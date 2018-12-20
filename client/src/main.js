import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCoffee)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false

Vue.prototype.$server = axios.create({
  baseURL: 'http://localhost:3000'
})
// Vue.prototype.$server = axios.create({
//   baseURL: 'http://35.187.249.174:3000'
// })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
