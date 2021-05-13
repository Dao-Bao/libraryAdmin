const dept = require('../../../db/warehouse');

module.exports = (req, res) => {
  dept
    .find({})
    .then(data => {
      let outList = []
      let inList = []
      let sumList = []
      let newSumList = []
      let newData = []
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
      outList.forEach(item => {
        inList.forEach(i => {
          if(item.id === i.id) {
            sumList.push(item)
            sumList.push(i)
          }
        })
      })
      sumList = Array.from(new Set(sumList))
      // 求和
      // let sum = sumList.reduce((prev, cur) => {
      //   return Number(cur.booknum) + Number(prev)
      // }, 0)
      // if (sum < 0) {
      //   sum = 0
      // }
      // 重新赋值data中图书数量
      data.forEach(item => {
        item.books.forEach(i => {
          sumList.forEach(j => {
            if(i.id == j.id) {
              newSumList.push(i)
            }
          })
        })
      })
      // 去重
      newSumList = Array.from(new Set(newSumList))
      // 获取需要做累加的id
      let obj = {}
      newSumList.forEach(v => obj[v.id] = obj[v.id] === undefined ? v.booknum : obj[v.id] + v.booknum)
      // 遍历新data。重新赋值数组
      data.forEach(item => {
        item.books.forEach(i => {
          newData.push(i)
        })
      })
      // 通过newData每项的id与需要做累加的id做匹配
      newData.forEach(item => {
        Object.keys(obj).forEach(i => {
          if (item.id == i) {
            item.booknum = obj[item.id]
          }
        })
      })
      // 新数组去重
      for(let i = 0; i < newData.length; i++){
        for(let j = i + 1; j < newData.length; j++){
          if(newData[i].id == newData[j].id) {
            newData.splice(j, 1)
            j--
          }
        }
      }
      res.send(newData)
    })
    .catch(e => {
      res.send({
        code: 1402,
        msg: '服务器异常',
        data: []
      })
    })
}