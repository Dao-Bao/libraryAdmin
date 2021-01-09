/* 引入mongooseDB */
const mongoose = require('mongoose');

/* 连接数据库 */
mongoose
  .connect('mongodb://localhost:27017/libraryAdmin', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(res => {
    console.log('角色接口启动');
  })
  .catch(e => {
    console.log(e);
  })

/* 用Schema建表 */
let Schema = mongoose.Schema;

/* 数据表接收数据规则 */
let roleSchema = new Schema({
  roleName: { type: String, require: false },
  perm: { type: String, require: false },
  status: { type: Number, require: false },
  date: {type: String, require: false}
})

/* 建表 */
let role = mongoose.model('role', roleSchema);
module.exports = role