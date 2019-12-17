import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from '@/api/index'

// import vueTap from 'v-tap'

import '@/components/globals/index'

import { Swipe, SwipeItem, List, Popup, Picker, Dialog, DatetimePicker, Loading, Uploader, Overlay } from 'vant'

import '@/icons'

// 引入全局css
import '@/assets/styles/base.scss'
// 引入过滤器
import filter from '@/utils/filter'

import '@/utils/permission'

import cnzz from '@/cnzz'

Vue.use(Swipe).use(SwipeItem).use(List).use(Popup).use(Picker).use(DatetimePicker).use(Loading).use(Dialog).use(Uploader).use(Overlay)
// Vue.use(vueTap)

Vue.config.productionTip = false
Vue.prototype.$api = api

// 在router完成后调用微信config
router.afterEach((route) => {
  cnzz() // 在router完成后调用cnzz统计插件
})

// 挂载过滤器
Object.keys(filter).forEach(key => {
  Vue.filter(key, filter[key])
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
