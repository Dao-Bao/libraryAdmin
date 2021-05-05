<template>
    <el-button class="downBtn" icon="el-icon-download" size="small" @click="downuser">导出表单</el-button>
</template>
<script>
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
export default {
  name: 'DownLoad',
  data () {
    return {
      nowDate: ''
    }
  },
  mounted () {
    var d = new Date()
    this.nowDate = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() // 获取当前日期
  },
  methods: {
    // 导出表格
    downuser () {
      var wb = XLSX.utils.table_to_book(document.querySelector('#table'))
      var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
      try {
        FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), `${this.nowDate}名单.xlsx`)
      } catch (e) {
        if (typeof console !== 'undefined') {
          return wbout
        }
      }
    }
  }
}
</script>
<style scoped>
 .downBtn {
    color: #fff;
    background-color: #ffba00;
    border-color: #ffba00;
  }
</style>
