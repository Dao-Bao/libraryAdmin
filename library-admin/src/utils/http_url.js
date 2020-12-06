import { get, post, postUpload, put, del } from './axios'

export const apiGet = (url, data) => get(`/api${url}`, data)
export const apiPut = (url, data) => put(`/api${url}`, data)
export const apiPost = (url, data) => post(`/api${url}`, data)
export const apiDel = (url, data) => del(`/api${url}`, data)

// 登录
export const apiLogin = data => post('/api/login', data)
// 注册
export const apiPostReg = data => post('/api/reg', data)
