const dept = require('../../../db/warehouse');

module.exports = (req, res) => {
  dept
    .find({})
    .then(data => {
      let newdata = data.map(item => {
        if (item.warehousingId) {
          return item
        } else {
          return 
        }
      })
      if (newdata) {
        newdata = newdata.filter(n => n)
      }
      res.send(newdata)
    })
    .catch(e => {
      res.send({
        code: 1402,
        msg: '服务器异常',
        data: []
      })
    })
}