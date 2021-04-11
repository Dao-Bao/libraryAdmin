const user = require('../../../db/reservoir');
module.exports = (req, res) => {
  let reqData = req.body;

	user
    .create({
      reservoirId: reqData.reservoirId,
      reservoirKQId: reqData.reservoirKQId,
      reservoirWareHouse: reqData.reservoirWareHouse,
      reservoirName: reqData.reservoirName,
      reservoirKQName: reqData.reservoirKQName,
      reservoirWareHouseName: reqData.reservoirWareHouseName,
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