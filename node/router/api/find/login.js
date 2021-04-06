/* 引入user表规则 */
const user = require('../../../db/user');

module.exports = (req, res) => {
  /* 得到前端来的数据 */
  let userData = req.body;
  
  user
    .findOne({ loginNum: userData.loginNum }) /* 查表中是否有该用户 */
    .then(data => {
      if (data) {
        if (data.loginPass === userData.loginPass) { // 如果有该用户，做密码匹配
          // console.log(data)
          res.send({
            code: 200,
            msg: 'success',
            data: {
              menulist: [{
                id: 11,
                name: '系统管理',
                path: '/system',
                children: [
                  {
                    id: 111,
                    name: '角色管理',
                    path: '/role',
                    url: '/system/role/Role'
                  }, {
                    id: 222,
                    name: '用户管理',
                    path: '/user',
                    url: '/system/user/User'
                  }
                ]
              }, {
                id: 22,
                name: '基本信息',
                path: '/basic',
                children: [{
                  id: 221,
                  name: '员工信息',
                  path: '/dep',
                  url: '/basic/dept/Dept'
                }, {
                  id: 222,
                  name: '库位信息',
                  path: '/reservoir',
                  url: '/basic/reservoir/Reservoir'
                }, {
                  id: 223,
                  name: '出版社信息',
                  path: '/printing',
                  url: '/basic/printing/Printing'
                }, {
                  id: 224,
                  name: '图书信息',
                  path: '/library',
                  url: '/basic/library/Library'
                }]
              }, {
                id: 33,
                name: '查询管理',
                path: '/query',
                children: [
                  {
                    id: 111,
                    name: '库存查询',
                    path: '/stock',
                    url: '/query/stock/Stock'
                  }, {
                    id: 222,
                    name: '信息管理',
                    path: '/message',
                    url: '/query/message/Message'
                  }
                ]
              }],
              userlist: [{
                userName: 'admin',
                token: '20210103172598'
              }]
            }
          })
        } else {
          res.send({
            code: 1400,
            msg: '密码错误',
            data:[]
          })
        }
      } else {
        res.send({
          code: 1401,
          msg: '用户未注册',
          data: []
        })
      }
    })
    .catch(e => {
      res.send({
        code: 1402,
        msg: '服务器异常',
        data: []
      })
    })
}