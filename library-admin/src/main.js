import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import Fragment from 'vue-fragment' // 解决一个template模版下多根问题
import '@/plugins/component' // 公共组件挂载

Vue.use(ElementUI)
Vue.use(Antd)
Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.use(Fragment.Plugin)

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
