const dept = require('../../../db/warehouse');

module.exports = (req, res) => {
  dept
    .find({})
    .then(data => {
      let outList = []
      let inList = []
      let sumList = []
      // 筛选出库/入库数组
      data.map(item => {
        if (item.outwarehousingtype === '换书出库' || item.outwarehousingtype === '销售出库') {
          item.books.forEach(i => {
            i.booknum = -Number(i.booknum)
            outList.push(i)
          })
        }
      })
      data.map(item => {
        if (item.warehousingtype === '采购入库' || item.warehousingtype === '推书入库') {
          item.books.forEach(i => {
            i.booknum = Number(i.booknum)
            inList.push(i)
          })
        }
      })
      // 数组去重
      outList = Array.from(new Set(outList))
      inList = Array.from(new Set(inList))
      // 筛选出入库数组中，id相同的对象
      for(let i = 0; i < outList.length; i++) {
        for(let j = 0; j < inList.length; j++) {
          if (outList[i].id = inList[j].id) {
            sumList.push(outList[i])
            sumList.push(inList[j])
          }
        }
      }
      // 求和
      let sum = sumList.reduce((prev, cur) => {
        return Number(cur.booknum) + Number(prev)
      }, 0)
      if (sum < 0) {
        sum = 0
      }
      // 重新赋值data中图书数量
      // data.forEach(item => {
      //   item.books.forEach(i => {
      //     sumList.forEach(j => {
      //       if(i.id = j.id) {
      //         i.booknum = sum
      //       }
      //     })
      //   })
      // })
      res.send(sumList)
    })
    .catch(e => {
      res.send({
        code: 1402,
        msg: '服务器异常',
        data: []
      })
    })
}