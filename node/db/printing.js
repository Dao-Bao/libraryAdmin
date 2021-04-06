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
  printingAddress: { type: String, require: true }, /* 出版社地址 */
  date: {type: String, require: false }
})

/* 建表 */
let printing = mongoose.model('printing', PrintingSchema);
module.exports = printing