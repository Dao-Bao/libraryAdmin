const user = require('../../../db/warehouse');
module.exports = (req, res) => {
  let reqData = req.body;

  if(reqData.outwarehousingId && reqData.warehousingId === undefined) {
    user
      .create({
        outwarehousingId: reqData.outwarehousingId,
        bookname: reqData.bookname,
        outwarehousingprice: reqData.outwarehousingprice,
        outwarehousingprinting: reqData.outwarehousingprinting,
        outwarehousingtotal: reqData.outwarehousingtotal,
        outwarehousingtime: reqData.outwarehousingtime,
        books: reqData.books,
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
  } else {
    return
  }
}