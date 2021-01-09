const user = require('../../../db/role');
module.exports = (req, res) => {
  let reqData = req.body;

	user
    .updateOne({ _id: reqData._id }, { "$set": { "roleName":reqData.roleName,"perm":reqData.perm, "status": reqData.status, "date": reqData.date } })
    .then((data) => {
      res.send({
        code:200,
        msg:"success",
        data: []
      })
    })
    .catch((e) => {
      // console.log(e)
      res.send({
        code: 1400,
        msg: '服务器异常',
      })
    })
}