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
                }, {
                  id: 225,
                  name: '客户信息',
                  path: '/customer',
                  url: '/basic/customer/Customer'
                }]
              }, {
                id: 33,
                name: '库存盘点',
                path: '/checking',
                children: [{
                  id: 332,
                  name: '库存信息盘点',
                  path: '/checkinginfo',
                  url: '/checking/check/CheckingCheck'
                }]
              }, {
                id: 44,
                name: '出库管理',
                path: '/delivery',
                children: [{
                  id: 441,
                  name: '图书出库',
                  path: '/deliverybook',
                  url: '/delivery/Delivery'
                }]
              }, {
                id: 55,
                name: '入库管理',
                path: '/warehousing',
                children: [{
                  id: 551,
                  name: '图书入库',
                  path: '/warehouding',
                  url: '/warehousing/Warehousing'
                }]
              }, {
                id: 66,
                name: '查询管理',
                path: '/query',
                children: [
                  {
                    id: 661,
                    name: '库存查询',
                    path: '/stock',
                    url: '/query/stock/Stock'
                  }, {
                    id: 662,
                    name: '信息查询',
                    path: '/message',
                    url: '/query/message/Message'
                  }, {
                    id: 664,
                    name: '出入库订单查询',
                    path: '/stocks',
                    url: '/query/stocks/Stocks'
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