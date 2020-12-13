import Vue from 'vue'
import Vuex from 'vuex'
import { constantRoutes } from '@/router'
import { apiLogin } from '@/utils/http_url'
// import { setToken, setInfo, setRoleList, setRouterList, getInfo, getMenuList } from '@/utils/auth'

Vue.use(Vuex)

const loginStore = {
  state: {
    menuData: JSON.parse(sessionStorage.getItem('menulist') || '[]'),
    routes: [],
    addRoutes: []
  },
  mutations: {
    SET_MENUDATA: (state, menuList) => {
      state.menuData = menuList
    },
    SET_ROUTES: (state, routes) => {
      state.addRoutes = routes
      state.routes = constantRoutes.concat(routes)
    }
  },
  actions: {
    // 登录
    Login ({ commit }, loginInfo) {
      return new Promise((resolve, reject) => {
        const params = {
          userName: loginInfo.userName,
          passWord: loginInfo.passWord
        }
        apiLogin(params).then(res => {
          commit('SET_MENUDATA', res.data.menulist)
          // commit('SET_ROUTES', res.data.routerList)
          sessionStorage.setItem('menulist', JSON.stringify(res.data.menulist))
          resolve()
        }).catch(e => {
          reject(e)
        })
      })
    }
  }
}

export default loginStore
