const dept = require("../../../db/employee");

module.exports = (req, res) => {
    let data = req
  //查找条件
  dept
    .deleteOne({_id: data.query._id})
    .then((data) => {
      res.send({
        code: 200,
        msg: 'success',
        date: true
      })
    })
    .catch((e) => {
        console.log(e);
    });
};