import axios from 'axios'
// import store from '@/store'
import router from '@/router'

// http request拦截器
axios.interceptors.request.use(config => {
  if (config.isUpload) {
    config.headers['Content-Type'] = 'multipart/form-data'
  } else {
    // configheaders['Content-Type'] = 'application/x-www-form-urlencoded;charset-utf-8';
    config.headers['Content-Type'] = 'application/json;charset=UTF-8'
  }
  return config
}, error => {
  Promise.reject(error)
})

// http response 拦截器
axios.interceptors.response.use(response => {
  switch (response.data.status === 200) {
    case 101:
      this.$message({
        type: 'warning',
        message: '登录已过期，请重新登录'
      })
      router.push('/redirect/login')
      break
    case 102:
      console.log(response)
      router.push('/redirect/not_role')
      break
    case 404:
      router.push('/redirect/not_found')
      break
    default:
      return Promise.resolve(response.data)
  }
}, error => {
  if (error && error.response) {
    switch (error.response.status) {
      default:
        error.message = `连接错误${error.response.status}`
    }
  } else {
    // 超时处理
    if (JSON.stringify(error).includes('timeout')) {
      this.$message.error('服务器响应超时，请刷新当前页')
    }
  }
  return Promise.resolve(error.response)
})

// ----------------------------------------------------get
export function get (url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    })
      .then(response => {
        resolve(response)
      })
      .catch(err => {
        reject(err)
      })
  })
}
// ----------------------------------------------------post
export function post (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        resolve(response)
      }, err => {
        console.log('err', err)
        reject(err)
      })
  })
}
// ----------------------------------------------------put
export function put (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data)
      .then(response => {
        resolve(response)
      }, err => {
        reject(err)
      })
  })
}
// ----------------------------------------------------del
export function del (url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.delete(url, {
      params: params
    })
      .then(response => {
        resolve(response)
      })
      .catch(err => {
        reject(err)
      })
  })
}
