/* 引入mongooseDB */
const mongoose = require('mongoose');

/* 连接数据库 */
mongoose
  .connect('mongodb://localhost:27017/libraryAdmin', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(res => {
    console.log('图书接口启动');
  })
  .catch(e => {
    console.log(e);
  })

/* 用Schema建表 */
let Schema = mongoose.Schema;

/* 数据表接收数据规则 */
let LibrarySchema = new Schema({
  libraryId: { type: Number, require: true }, /* 图书编号 */
  libraryName: { type: String, require: true }, /* 图书名称 */
  printing: { type: String, require: true }, /* 出版社 */
  barCode: { type: String, require: true }, /* 条形码 */
  libraryPrice: { type: String, require: true }, /* 图书单价 */
  libraryAuthor: { type: String, require: true },/* 作者 */
  type: { type: String, require: true },/* 种类 */
  dateTime: { type: String, require: true }, /* 出版日期 */
  remark: { type: String, require: false }, /* 备注 */
  date: {type: String, require: false }
})

/* 建表 */
let library = mongoose.model('library', LibrarySchema);
module.exports = library