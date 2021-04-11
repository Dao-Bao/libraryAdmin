const user = require('../../../db/library');
module.exports = (req, res) => {
  let reqData = req.body;

	user
    .create({
      libraryId: reqData.libraryId,
      libraryName: reqData.libraryName,
      printing: reqData.printing,
      barCode: reqData.barCode,
      libraryPrice: reqData.libraryPrice,
      libraryAuthor: reqData.libraryAuthor,
      type: reqData.type,
      dateTime: reqData.dateTime,
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