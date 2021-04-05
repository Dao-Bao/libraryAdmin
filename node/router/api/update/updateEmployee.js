const dept = require('../../../db/employee');
module.exports = (req, res) => {
  let reqData = req.body;

	dept
    .updateOne({ _id: reqData._id }, { "$set": { "employeeId": reqData.employeeId, "employeeName":reqData.employeeName,"employeeDept": reqData.employeeDept, "employeePost":reqData.employeePost} })
    .then((data) => {
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
}