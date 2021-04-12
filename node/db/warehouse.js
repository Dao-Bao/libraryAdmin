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
let WareHouseSchema = new Schema({
  warehousingprice: { type: Number, require: true }, /* 总金额 */
  warehousingprinting: { type: String, require: true }, /* 出版社名称 */
  warehousingtotal: { type: Number, require: true }, /* 入库总数 */
  warehousingtime: { type: String, require: true }, /* 入库时间 */
  warehousingtype: { type: String, require: true }, /* 入库方式 */
  warehousingperson: { type: String, require: true }, /* 制单人 */
  warehousingremark: { type: String, require: false }, /* 备注 */
  date: {type: String, require: false }
})

/* 建表 */
let warehouse = mongoose.model('warehouse', WareHouseSchema);
module.exports = warehouse