<template>
  <div class="reservoir">
    <Title :title="title" />

    <!-- 搜索栏 -->
    <el-form :inline="true" :model="searchMenu" size="small" class="demo-form-inline" >
      <el-form-item label="库位编号">
        <el-input v-model="searchMenu.printingId" placeholder="请输入库位编号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="warning" icon="el-icon-search" size="small" @click="search">查询</el-button>
        <el-button icon="el-icon-refresh" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格 -->
    <el-table :data="tableData" :header-cell-style="{'color':'#333333','background-color':'#E5E8F8'}" style="width:99%;margin-top:20px;border-radius:10px;background:rgba(255,255,255,0.5)">
      <el-table-column prop="reservoirId" label="库位编号"></el-table-column>
      <el-table-column prop="isEnpty" label="是否为空"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { apiGetReservoir } from '@/utils/http_url'
export default {
  name: 'reservoir',
  data () {
    return {
      title: '库位信息',
      searchMenu: {},
      tableData: []
    }
  },
  methods: {
    search() {
      apiGetReservoir(this.searchMenu).then(res => {
        this.tableData = res
      }).catch(e => {
        this.$message.warning(e.msg)
      })
    },
    reset() {
      this.searchMenu = {}
      // this.getList()
      this.tableData = []
    }
  }
}
</script>

<style lang="scss" scoped>
.reservoir {
  margin-top: 1%;
  margin-left: 1%;
  ::v-deep .demo-form-inline {
    .el-form-item__label {
      color: #FFF
    }
  }
}
</style>
