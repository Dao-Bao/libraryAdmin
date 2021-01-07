import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
import Fragment from 'vue-fragment' // 解决一个template模版下多根问题

Vue.use(ElementUI)
Vue.use(Fragment.Plugin)
Vue.prototype.$http = axios
Vue.config.productionTip = false

// 路由守卫
router.beforeEach((to, from, next) => {
  if (store.state.loginStore.token || JSON.parse(sessionStorage.getItem('token'))) {
    next()
  } else {
    if (to.path === '/') {
      next()
    } else {
      next('/')
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
