/* 引入mongooseDB */
const mongoose = require('mongoose');

/* 连接数据库 */
mongoose
  .connect('mongodb://localhost:27017/libraryAdmin', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(res => {
    console.log('部门接口启动');
  })
  .catch(e => {
    console.log(e);
  })

/* 用Schema建表 */
let Schema = mongoose.Schema;

/* 数据表接收数据规则 */
let DeptSchema = new Schema({
  deptName: { type: String, require: false }, /* 部门名称 */
  deptManager: { type: String, require: false }, /* 部门经理 */
  deptDesc: { type: String, require: false }, /* 部门描述 */
  date: {type: String, require: false}
})

/* 建表 */
let dept = mongoose.model('department', DeptSchema);
module.exports = dept