const express = require("express");  /**引入express框架 */
const path = require("path");
const http = require("http"); /**引入http模块 */
const cors = require("cors");

let app = express();   

const server = http.createServer((req, res) => {

  /**添加响应头 */
  res.setHeader("Access-Control-Allow-Origin", "*");

  /**获取请求路径 */
  var pathname = url.parse(req.url).pathname;
  var query = url.parse(req.url, true).query;

    /**关闭nodejs 默认访问 favicon.ico */ 
    if (!pathname.indexOf('/favicon.ico')) {
      return; 
    };

    /**路由器处理*/
    route(handle, pathname, query, res);
});


app.listen(9000, () => { console.log("服务器启动...") });  /**监听9000端口 */

/**中间件 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); /**解决跨域 */

/* 监听路由(前端发起增删改查操作) */
app.post('/login', require('./router/api/find/login')) /* 登录接口 */
app.post('/reg', require('./router/api/add/addUser')) /* 注册 */

app.post('/addrole', require('./router/api/add/role/addRole')) /* 角色--新增 */
app.get('/getrolelist', require('./router/api/find/role/findRole')) /* 角色--查询（列表） */
app.get('/getrolecond', require('./router/api/find/role/findRoleCond')) /* 角色--查询（条件） */
app.put('/updaterole', require('./router/api/update/updateRole')) /* 角色--编辑 */
app.delete('/delrole', require('./router/api/remove/delRole')) /* 角色--删除 */

app.post('/addsystemuser', require('./router/api/add/addSystemUser')) /* 用户--新增 */
app.get('/getuserlist', require('./router/api/find/user/findUser')) /* 用户--查询（列表） */
app.get('/getusercond', require('./router/api/find/user/findUserCond')) /* 用户--查询（条件） */
app.delete('/deluser', require('./router/api/remove/delUser')) /* 用户--删除 */
app.put('/updateuser', require('./router/api/update/updateUser')) /* 用户--编辑 */
app.put('/updateuserpass', require('./router/api/update/updateUserPass')) /* 用户--重置密码 */
app.put('/updateuserstatus', require('./router/api/update/updateUserStatus')) /* 用户--修改账号状态 */

app.post('/addDept', require('./router/api/add/addDept'))/* 新增部门 */
app.get('/findDept', require('./router/api/find/department/findDept'))/* 查询部门列表 */
app.put('/updateDept', require('./router/api/update/updateDept'))/* 修改部门 */
app.delete('/delDept', require('./router/api/remove/delDept'))/* 删除部门 */