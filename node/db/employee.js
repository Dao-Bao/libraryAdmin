/* 引入mongooseDB */
const mongoose = require('mongoose');

/* 连接数据库 */
mongoose
  .connect('mongodb://localhost:27017/libraryAdmin', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(res => {
    console.log('员工信息接口启动');
  })
  .catch(e => {
    console.log(e);
  })

/* 用Schema建表 */
let Schema = mongoose.Schema;

/* 数据表接收数据规则 */
let EmployeeSchema = new Schema({
  employeeId: { type: Number, require: true }, /* 员工编号 */
  employeeName: { type: String, require: true }, /* 员工名称 */
  employeeDept: { type: String, require: true },/* 部门 */
  employeePost: { type: String, require: true }, /* 岗位 */
  date: {type: String, require: false }
})

/* 建表 */
let employee = mongoose.model('employee', EmployeeSchema);
module.exports = employee