const user = require('../../../db/department');
module.exports = (req, res) => {
  let reqData = req.body;

	user
    .create({
      deptId: reqData.deptId,
      deptName: reqData.deptName,
      deptManager: reqData.deptManager,
      deptDesc: reqData.deptDesc,
      date: reqData.date
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