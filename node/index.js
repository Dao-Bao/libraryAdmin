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