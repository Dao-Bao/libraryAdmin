const role = require("../../../db/role");

module.exports = (req, res) => {
    let data = req
    console.log(data.query)

  //查找条件
  role
    .deleteOne({_id: data.query._id})
    .then((data) => {
        // console.log("删除成功");
      res.send({
        code: 200,
        msg: 'success',
        date: true
      })
    })
    .catch((e) => {
        // console.log("删除失败");
        console.log(e);
    });
};