const user = require('../../../db/printing');
module.exports = (req, res) => {
  let reqData = req.body;

	user
    .create({
      printingId: reqData.printingId,
      printingName: reqData.printingName,
      printingContant: reqData.printingContant,
      sex: reqData.sex,
      position: reqData.position,
      address: reqData.address,
      phone: reqData.phone,
      printingEmail: reqData.printingEmail,
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