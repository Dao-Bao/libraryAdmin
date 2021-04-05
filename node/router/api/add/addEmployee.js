const user = require('../../../db/employee');
module.exports = (req, res) => {
  let reqData = req.body;

	user
    .create({
      employeeId: reqData.employeeId,
      employeeName: reqData.employeeName,
      employeeDept: reqData.employeeDept,
      employeePost: reqData.employeePost,
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