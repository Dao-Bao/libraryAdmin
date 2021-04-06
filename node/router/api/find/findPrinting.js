const dept = require('../../../db/printing');

module.exports = (req, res) => {
  dept
    .find({})
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