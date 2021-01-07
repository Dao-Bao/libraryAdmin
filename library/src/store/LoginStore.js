import Vue from 'vue'
import Vuex from 'vuex'
import { constantRoutes } from '@/router'
import { apiLogin } from '@/utils/http_url'

Vue.use(Vuex)

const loginStore = {
  state: {
    menuData: JSON.parse(sessionStorage.getItem('menulist') || '[]'),
    routes: [],
    addRoutes: [],
    userInfo: '',
    token: ''
  },
  mutations: {
    SET_MENUDATA: (state, menuList) => {
      state.menuData = menuList
    },
    SET_ROUTES: (state, routes) => {
      state.addRoutes = routes
      state.routes = constantRoutes.concat(routes)
    },
    SET_INFO: (state, userinfo) => {
      state.userInfo = userinfo
    },
    SET_TOKEN: (state, token) => {
      state.token = token
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
          // console.log(res.data)
          commit('SET_MENUDATA', res.data.menulist) // 存vuex
          commit('SET_INFO', res.data.userlist[0].userName)
          commit('SET_TOKEN', res.data.userlist[0].token)
          // commit('SET_ROUTES', res.data.routerList)
          sessionStorage.setItem('menulist', JSON.stringify(res.data.menulist)) // 存session
          sessionStorage.setItem('userinfo', JSON.stringify(res.data.userlist[0].userName))
          sessionStorage.setItem('token', JSON.stringify(res.data.userlist[0].token))
          resolve()
        }).catch(e => {
          reject(e)
        })
      })
    }
  }
}

export default loginStore
