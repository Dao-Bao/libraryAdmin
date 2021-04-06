const user = require('../../../db/printing');

module.exports = (req, res) => {
  let data = req.query
  user
    .find({
      $or: [
        {printingId: data.printingId}, {printingName: data.printingName}
      ]
    })
    .then(data => {
      if (data) {
        res.send(data)
      } else {
      }
    })
    .catch(e => {
      res.send({
        code: 1402,
        msg: '服务器异常',
        data: []
      })
    })
}