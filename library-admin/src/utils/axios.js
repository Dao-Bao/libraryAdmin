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
      // case 400:
      //   error.message = '错误请求'
      //   break
      // case 401:
      //   error.message = '未授权，请重新登录'
      //   break
      // case 403:
      //   error.message = '拒绝访问'
      //   break
      // case 404:
      //   error.message = '请求错误,未找到该资源'
      //   break
      // case 405:
      //   error.message = '请求方法未允许'
      //   break
      // case 408:
      //   error.message = '请求超时'
      //   break
      // case 500:
      //   error.message = '服务器端出错'
      //   break
      // case 501:
      //   error.message = '网络未实现'
      //   break
      // case 502:
      //   error.message = '网络错误'
      //   break
      // case 503:
      //   error.message = '服务不可用'
      //   break
      // case 504:
      //   error.message = '网络超时'
      //   break
      // case 505:
      //   error.message = 'http版本不支持该请求'
      //   break
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
export function postUpload (url, data, isUpload = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data, isUpload)
      .then(response => {
        resolve(response)
      }, err => {
        console.log('err', err)
        reject(err)
      })
  })
}
// ----------------------------------------------------patch
export function patch (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data)
      .then(response => {
        resolve(response)
      }, err => {
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
