<template>
  <div class="stock">
    <Title :title="title" />

    <!-- 搜索栏 -->
    <el-form :inline="true" :model="searchMenu" size="model" class="demo-form-inline" style="text-align:center">
      <el-form-item label="图书编号">
        <el-input v-model="searchMenu.book" placeholder="请输入图书编号查询库存"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="warning" icon="el-icon-search" @click="search">查询</el-button>
        <el-button icon="el-icon-refresh" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格 -->
    <el-table :data="tableData" :header-cell-style="{'color':'#333333','background-color':'#E5E8F8'}" style="width:99%;margin-top:20px;border-radius:10px;background:rgba(255,255,255,0.5)">
      <el-table-column prop="_id" label="图书编号"></el-table-column>
      <el-table-column prop="bookNum" label="图书库存量"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'stock',
  data () {
    return {
      title: '库存查询',
      searchMenu: {},
      tableData: []
    }
  },
  methods:{
    search () {
      console.log(this.searchMenu)
    },
    reset () {
      console.log('重置', this.searchMenu)
    }
  }
}
</script>

<style lang="scss" scoped>
.stock {
  margin-top: 1%;
  margin-left: 1%;
  ::v-deep .demo-form-inline {
    .el-form-item__label {
      color: #FFF
    }
  }
}
</style>
