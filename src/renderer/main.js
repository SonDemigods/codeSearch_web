import Vue from 'vue'
import { api } from './api'

import App from './App'
import router from './router'
import store from './store'

import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'

Vue.use(ViewUI)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.api = Vue.prototype.$api = api
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
