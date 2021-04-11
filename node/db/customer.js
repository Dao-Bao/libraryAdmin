/* 引入mongooseDB */
const mongoose = require('mongoose');

/* 连接数据库 */
mongoose
  .connect('mongodb://localhost:27017/libraryAdmin', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(res => {
    console.log('客户接口启动');
  })
  .catch(e => {
    console.log(e);
  })

/* 用Schema建表 */
let Schema = mongoose.Schema;

/* 数据表接收数据规则 */
let CustomerSchema = new Schema({
  customerName: { type: String, require: false }, /* 客户名称 */
  customerSex: { type: String, require: true }, /* 性别 */
  customerAddress: { type: String, require: true }, /* 地址 */
  customerPhone: { type: Number, require: true }, /* 手机号 */
  customerEamil: { type: String, require: true }, /* E-mail */
  remark: { type: String, require: false }, /* 备注 */
  date: {type: String, require: false}
})

/* 建表 */
let customer = mongoose.model('customer', CustomerSchema);
module.exports = customer