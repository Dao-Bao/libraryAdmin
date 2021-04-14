/* 引入mongooseDB */
const mongoose = require('mongoose');

/* 连接数据库 */
mongoose
  .connect('mongodb://localhost:27017/libraryAdmin', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(res => {
    console.log('登录接口启动');
  })
  .catch(e => {
    console.log(e);
  })

/* 用Schema建表 */
let Schema = mongoose.Schema;

/* 数据表接收数据规则 */
let UserSchema = new Schema({
  userName: { type: String, require: false }, /* 用户昵称 */
  loginNum: { type: String, require: true }, /* 登录账号 */
  loginPass: { type: String, require: true }, /* 登录密码 */
  phone: { type: String, require: false }, /* 手机号 */
  role: { type: String, require: false }, /* 角色选择 */
  status: { type: String, require: false }, /* 状态 */
  remark: { type: String }, /* 备注 */
  perm: { type: String, require: true }, /* 权限 */
  date: {type: String, require: false}
})

/* 建表 */
let user = mongoose.model('user', UserSchema);
module.exports = user