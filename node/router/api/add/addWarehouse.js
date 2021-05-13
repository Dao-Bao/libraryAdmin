const user = require('../../../db/warehouse');
module.exports = (req, res) => {
  let reqData = req.body;
  
  if (reqData.warehousingId && reqData.outwarehousingId === undefined) {
    user
      .create({
        warehousingId: reqData.warehousingId,
        warehousingprice: reqData.warehousingprice,
        warehousingprinting: reqData.warehousingprinting,
        warehousingtotal: reqData.warehousingtotal,
        warehousingtime: reqData.warehousingtime,
        books: reqData.books,
        warehousingtype: reqData.warehousingtype,
        warehousingperson: reqData.warehousingperson,
        warehousingremark: reqData.warehousingremark
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