/* 引入mongooseDB */
const mongoose = require('mongoose');

/* 连接数据库 */
mongoose
  .connect('mongodb://localhost:27017/libraryAdmin', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(res => {
    console.log('库位信息接口启动');
  })
  .catch(e => {
    console.log(e);
  })

/* 用Schema建表 */
let Schema = mongoose.Schema;

/* 数据表接收数据规则 */
let ReserovirSchema = new Schema({
  reservoirId: { type: Number, require: true }, /* 库位编号 */
  isEnpty: { type: String, require: true }, /* 是否为空 */
  date: {type: String, require: false }
})

/* 建表 */
let reservoir = mongoose.model('reservoir', ReserovirSchema);
module.exports = reservoir