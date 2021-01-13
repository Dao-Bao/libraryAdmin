import { get, post, put, del } from './axios'

export const apiGet = (url, data) => get(`/api${url}`, data)
export const apiPut = (url, data) => put(`/api${url}`, data)
export const apiPost = (url, data) => post(`/api${url}`, data)
export const apiDel = (url, data) => del(`/api${url}`, data)

// 登录
export const apiLogin = data => post('/api/login', data)
// 注册
export const apiPostReg = data => post('/api/reg', data)

/* ------------系统管理------------ */
/* 角色管理 */
// 新增
export const apiPostRole = data => post('/api/addrole', data)
// 获取列表
export const apiGetRoleList = data => get('/api/getrolelist', data)
// 根据查询条件获取结果
export const apiGetRole = data => get('/api/getrolecond', data)
// 删除
export const apiDelRole = data => del('/api/delrole', data)
// 编辑
export const apiPutRole = data => put('/api/updaterole', data)

/* 用户管理 */
// 新增
export const apiPostUser = data => post('/api/addsystemuser', data)
// 获取用户列表
export const apiGetUserList = data => get('/api/getuserlist', data)
