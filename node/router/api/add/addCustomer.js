const user = require('../../../db/customer');
module.exports = (req, res) => {
  let reqData = req.body;

	user
    .create({
      customerName: reqData.customerName,
      customerSex: reqData.customerSex,
      customerAddress: reqData.customerAddress,
      customerPhone: reqData.customerPhone,
      customerEamil: reqData.customerEamil,
      remark: reqData.remark,
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