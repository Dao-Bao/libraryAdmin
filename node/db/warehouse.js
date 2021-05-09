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
  warehousingId: { type: Number, require: false }, /* 入库单编号 */
  warehousingprice: { type: Number, require: false }, /* 入库总金额 */
  warehousingprinting: { type: String, require: false }, /* 入库出版社名称 */
  warehousingtotal: { type: Number, require: false }, /* 入库总数 */
  warehousingtime: { type: String, require: false }, /* 入库时间 */
  warehousingtype: { type: String, require: false }, /* 入库方式 */
  warehousingperson: { type: String, require: false }, /* 入库制单人 */
  warehousingremark: { type: String, require: false }, /* 入库备注 */
  outwarehousingId: { type: Number, require: false }, /* 出库单编号 */
  bookname: { type: String, require: false }, /* 图书名称 */
  outwarehousingprice: { type: Number, require: false }, /* 出库总金额 */
  outwarehousingprinting: { type: String, require: false }, /* 出库出版社名称 */
  outwarehousingtotal: { type: Number, require: false }, /* 出库总数 */
  bookprice: { type: Number, require: false }, /* 图书单价 */
  booknum: { type: Number, require: false }, /* 图书数量 */
  outwarehousingtime: { type: String, require: false }, /* 出库时间 */
  outwarehousingtype: { type: String, require: false }, /* 出库方式 */
  warehousename: { type: String, require: false }, /* 仓库名称 */
  kwname: { type: String, require: false }, /* 库位名称 */
  kqname: { type: String, require: false }, /* 库区名称 */
  outwarehousingperson: { type: String, require: false }, /* 出库制单人 */
  outwarehousingremark: { type: String, require: false }, /* 出库备注 */
  date: {type: String, require: false },
  books: { type: Array, required: true } /* 详细订单信息 */
})

/* 建表 */
let warehouse = mongoose.model('warehouse', WareHouseSchema);
module.exports = warehouse