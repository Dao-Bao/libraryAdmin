import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

// 消除重复点击获取路由
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

// 公共路由
export const constantRoutes = [
  {
    path: '/',
    component: () => import('@/views/login/Login')
  }, {
    path: '/home',
    component: () => import('@/views/home/Home'),
    children: [
      {
        path: '',
        component: {render(c) { return c('router-view') }},
        children: []
      }
    ]
  }
]

// 异步路由
export function initDynamicRoutes () {
  const currentRoutes = router.options.routes
  const menuData = store.state.loginStore.menuData
  menuData.forEach(item => {
    item.children.forEach(item => {
      item.component = () => import(`@/views${item.url}.vue`)
      currentRoutes[1].children.push(item)
      // item.children.forEach(i => {
      //   i.component = () => import(`@/views${i.url}.vue`)
      //   currentRoutes[1].children[0].children.push(i)
      //   // console.log(currentRoutes[1].children[0].children)
      // })
    })
  })
  router.addRoutes(currentRoutes)
}

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: constantRoutes
})

export default router
