const user = require('../../../db/user');
module.exports = (req, res) => {
  let reqData = req.body;

	user
    .updateOne({ _id: reqData._id }, { "$set": { "status":reqData.status } })
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