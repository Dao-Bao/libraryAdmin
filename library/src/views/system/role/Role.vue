<template>
  <div class="role">
    <Title :title="title" />
    <!-- 搜索栏 -->
    <el-form :inline="true" :model="searchMenu" size="small" class="demo-form-inline" v-if="searchShow">
      <el-form-item label="角色名称">
        <el-input v-model="searchMenu.roleName" placeholder="请输入角色名称"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="searchMenu.status" placeholder="角色状态">
          <el-option label="正常" value="0"></el-option>
          <el-option label="停用" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button class="searchBtn" icon="el-icon-search" size="small" @click="search">查询</el-button>
        <el-button icon="el-icon-refresh" @click="resetSearch">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 第二行 -->
    <div>
      <div style="float:left">
        <el-button type="primary" icon="el-icon-plus" size="small" @click="addrole">增加</el-button>
        <!-- <el-button class="downBtn" icon="el-icon-download" size="small" @click="downuser">导出</el-button> -->
      </div>
    </div>

    <!-- 表格 -->
    <el-table :data="tableData" style="margin-top:60px">
      <el-table-column prop="date" label="日期"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button type="text" @click="handleSee(scope.row)">查看</el-button>
          <el-button type="text" @click="handleDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'Role',
  data () {
    return {
      title: '角色管理',
      searchMenu: {},
      searchShow: true,
      tableData: [{
        date: '2020-12-23 05:30:28',
        name: '张三'
      }]
    }
  },
  methods: {
    addrole () {
      alert('新增')
    },
    search () {
      console.log(this.searchMenu)
    },
    resetSearch () {
      this.searchMenu = {}
    },
    // 查看
    handleSee (record) {
      console.log(record)
    },
    // 删除
    handleDel (val) {
      this.$confirm("确定删除" + val.name + "的数据项?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$message.success('删除成功')
      })
      .catch(() => {
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.role {
  margin: 1%;
  .searchBtn {
    color: #FFF;
    background-color: #20b2aa;
    border-color: #20b2aa;
  }
}
</style>
