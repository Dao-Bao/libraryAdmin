const user = require('../../../db/user');
module.exports = (req, res) => {
  let reqData = req.body;

	user
    .create({
      userName: reqData.userName,
      loginNum: reqData.loginNum,
      loginPass: reqData.loginPass,
      phone: reqData.phone,
      role: reqData.role,
      status: reqData.status,
      remark: reqData.remark
    })
    .then(() => {
      res.send({
        code:200,
        msg:"success",
        data: []
      })
    })
    .catch((e) => {
      res.send({
        code: 1400,
        msg: '服务器异常',
      })
    })
		.catch(e => {
      res.send({
        code: 1403,
        msg:"服务器异常"
      })
		})
}