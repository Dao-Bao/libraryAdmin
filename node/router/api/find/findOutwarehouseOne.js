/* 引入reservoir表规则 */
const resevoir = require('../../../db/warehouse');

module.exports = (req, res) => {
  let data = req.query
  resevoir
  .find({
    $or: [
      {outwarehousingId: data.outwarehousingId}
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