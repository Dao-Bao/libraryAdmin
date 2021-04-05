/* 引入mongooseDB */
const mongoose = require('mongoose');

/* 连接数据库 */
mongoose
  .connect('mongodb://localhost:27017/libraryAdmin', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(res => {
    console.log('岗位接口启动');
  })
  .catch(e => {
    console.log(e);
  })

/* 用Schema建表 */
let Schema = mongoose.Schema;

/* 数据表接收数据规则 */
let PostSchema = new Schema({
  postId: { type: Number, require: true }, /* 岗位编号 */
  postName: { type: String, require: true }, /* 岗位名称 */
  postDesc: { type: String, require: true }, /* 岗位描述 */
  date: {type: String, require: false }
})

/* 建表 */
let post = mongoose.model('post', PostSchema);
module.exports = post