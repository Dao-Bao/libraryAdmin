const role = require("../../../db/user");

module.exports = (req, res) => {
    let data = req

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