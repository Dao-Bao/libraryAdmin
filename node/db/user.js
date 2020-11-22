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
let userSchema = new Schema({
  userName: { type: Number, require: true },
  passWord: { type: String, require: true }
})

/* 建表 */
let user = mongoose.model('user', userSchema);
module.exports = user