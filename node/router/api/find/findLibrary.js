/* 引入user表规则 */
const user = require('../../../db/library');

module.exports = (req, res) => {
  // let data = req.query
  user
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