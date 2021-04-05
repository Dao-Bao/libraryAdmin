const user = require('../../../db/post');
module.exports = (req, res) => {
  let reqData = req.body;

	user
    .create({
      postId: reqData.postId,
      postName: reqData.postName,
      postDesc: reqData.postDesc,
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