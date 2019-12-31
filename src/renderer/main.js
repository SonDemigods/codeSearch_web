import Vue from 'vue'
import { api } from './api'
import config from './config'

import App from './App'
import router from './router'
import store from './store'

import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'

Vue.use(ViewUI)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
// 全局ajax
Vue.api = Vue.prototype.$api = api
Vue.config.productionTip = false

// 全局请求地址
Vue.baseUrl = Vue.prototype.$baseUrl = config.baseUrl

// 全局图片地址
Vue.picUrl = Vue.prototype.$picUrl = config.baseUrl + config.picUrl

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
