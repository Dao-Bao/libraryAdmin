const user = require('../../../db/warehouse');
module.exports = (req, res) => {
  let reqData = req.body;

	user
    .create({
      outwarehousingId: reqData.outwarehousingId,
      bookname: reqData.bookname,
      outwarehousingprice: reqData.outwarehousingprice,
      outwarehousingprinting: reqData.outwarehousingprinting,
      outwarehousingtotal: reqData.outwarehousingtotal,
      bookprice: reqData.bookprice,
      booknum: reqData.booknum,
      outwarehousingtime: reqData.outwarehousingtime,
      outwarehousingtype: reqData.outwarehousingtype,
      warehousename: reqData.warehousename,
      kwname: reqData.kwname,
      kqname: reqData.kqname,
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