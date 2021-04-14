/* 引入mongooseDB */
const mongoose = require('mongoose');

/* 连接数据库 */
mongoose
  .connect('mongodb://localhost:27017/libraryAdmin', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(res => {
    console.log('出版社接口启动');
  })
  .catch(e => {
    console.log(e);
  })

/* 用Schema建表 */
let Schema = mongoose.Schema;

/* 数据表接收数据规则 */
let PrintingSchema = new Schema({
  printingId: { type: Number, require: true }, /* 出版社编号 */
  printingName: { type: String, require: true }, /* 出版社名称 */
  printingContant: { type: String, require: true }, /* 联系人 */
  sex: { type: String, require: true }, /* 性别 */
  position: { type: String, require: true }, /* 职位 */
  address: { type: String, require: true }, /* 地址 */
  phone: { type: String, require: true }, /* 电话 */
  printingEmail: { type: String, require: true }, /* Email */
  remark: { type: String, require: false }, /* 备注 */
  date: {type: String, require: false }
})

/* 建表 */
let printing = mongoose.model('printing', PrintingSchema);
module.exports = printing