const dept = require('../../../db/post');
module.exports = (req, res) => {
  let reqData = req.body;

	dept
    .updateOne({ _id: reqData._id }, { "$set": { "postId": reqData.postId, "postName":reqData.postName,"postDesc":reqData.postDesc} })
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