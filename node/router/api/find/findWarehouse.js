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
        newdata.splice(newdata.findIndex(item => item === undefined), 1)
      }
      res.send(newdata)
      // if (data) {
      //   res.send(data)
      // } else {
      // }
    })
    .catch(e => {
      res.send({
        code: 1402,
        msg: '服务器异常',
        data: []
      })
    })
}