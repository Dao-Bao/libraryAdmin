const user = require('../../../db/warehouse');
module.exports = (req, res) => {
  let reqData = req.body;

	user
    .create({
      outwarehousingprice: reqData.outwarehousingprice,
      outwarehousingprinting: reqData.outwarehousingprinting,
      outwarehousingtotal: reqData.outwarehousingtotal,
      outwarehousingtime: reqData.outwarehousingtime,
      outwarehousingtype: reqData.outwarehousingtype,
      outwarehousingperson: reqData.outwarehousingperson,
      outwarehousingremark: reqData.outwarehousingremark
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