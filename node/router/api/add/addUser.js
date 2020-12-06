const user = require('../../../db/user');

module.exports = (req, res) => {
    //得到前端传过来的数据
	let reqData = req.body;
  // console.log('userData', reqData);

	user
		.findOne({ userName: reqData.userName }) //检测数据库中有没有该用户
		.then(data=>{
			if(data){
				res.send({
          code:1400,
          msg:"用户名存在",
          data: []
        });
			}else{
				user
					.create({
						userName: reqData.userName,
						passWord: reqData.passWord
					})
					.then((data) => {
						res.send({
              code:200,
              msg:"注册成功",
              data: []
            })
					})
					.catch((e) => {
						res.send({
              code: 1400,
              msg: '服务器异常',
            })
					})
			}
		})
		.catch(e => {
      res.send({
        code: 1403,
        msg:"服务器异常"
      })
		})
}