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
// 根据筛选条件
export const apiGetUser = data => get('/api/getusercond',data)
// 删除
export const apiDelUser = data => del('/api/deluser', data)
// 编辑
export const apiPutUser = data => put('/api/updateuser', data)
// 重置密码
export const apiPutUserPass = data => put('/api/updateuserpass', data)
// 修改用户状态
export const apiPutUserStatus = data => put('/api/updateuserstatus', data)

/* 基本信息--员工信息--部门 */
// 新增
export const apiPostDept = data => post('/api/addDept', data)
// 查找列表
export const apiGetDeptList = data => get('/api/findDept', data)
// 修改
export const apiPutDept = data => put('/api/updateDept', data)
// 删除
export const apiDelDept = data => del('/api/delDept', data)

/* 基本信息--员工信息--岗位信息 */
// 新增
export const apiPostPost = data => post('/api/addPost', data)
// 查找列表
export const apiGetPostList = data => get('/api/findPost', data)
// 修改
export const apiPutPost = data => put('/api/updatePost', data)
// 删除
export const apiDelPost = data => del('/api/delPost', data)

/* 基本信息--员工信息--员工信息 */
// 新增
export const apiPostEmployee = data => post('/api/addEmployee', data)
// 查找列表
export const apiGetEmployeeList = data => get('/api/findEmployee', data)
// 修改
export const apiPutEmployee = data => put('/api/updateEmployee', data)
// 删除
export const apiDelEmployee = data => del('/api/delEmployee', data)
