const dept = require('../../../db/department');
module.exports = (req, res) => {
  let reqData = req.body;

	dept
    .updateOne({ _id: reqData._id }, { "$set": { "deptName":reqData.deptName,"deptManager":reqData.deptManager, "deptDesc": reqData.deptDesc} })
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