<template>
  <div class="user">
    <Title :title="title" />
    <!-- 搜索栏 -->
    <el-form :inline="true" :model="searchMenu" size="small" class="demo-form-inline" v-if="searchShow">
      <el-form-item label="用户编号">
        <el-input v-model="searchMenu.userId" placeholder="请输入用户编号"></el-input>
      </el-form-item>
      <el-form-item label="手机号码">
        <el-input v-model="searchMenu.phone" placeholder="请输入手机号码"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="searchMenu.status" placeholder="用户状态">
          <el-option v-for="(i, index) in statusList" :key="index" :label="i.label" :value="i.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button class="searchBtn" icon="el-icon-search" size="small" @click="search">查询</el-button>
        <el-button icon="el-icon-refresh" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 第二行 -->
    <div>
      <div style="float:left">
        <el-button type="primary" icon="el-icon-plus" size="small" @click="adduser">增加</el-button>
        <!-- <el-button class="downBtn" icon="el-icon-download" size="small" @click="downuser">导出</el-button> -->
      </div>
    </div>
    <!-- 表格 :==v-bind-->
    <el-table :data="tableData" style="margin-top:60px">
      <el-table-column prop="userId" label="用户编号"></el-table-column>
      <el-table-column prop="loginNum" label="登录账号"></el-table-column>
      <el-table-column prop="userName" label="用户昵称"></el-table-column>
      <el-table-column prop="phone" label="手机号码"></el-table-column>
      <el-table-column prop="status" label="状态" width="100px">
        <template slot-scope="scope">
          <span v-if="scope.row.status === true" style="margin-right:5px">正常</span>
          <el-switch v-model="scope.row.status" active-color="#409eff" inactive-color="#dcdfe6" @change="changeSwitch(scope.row)"></el-switch>
          <span v-if="scope.row.status === false" style="margin-left:5px">冻结</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间"></el-table-column>
      <el-table-column label="操作" width="200px">
        <template slot-scope="scope">
          <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.row)">修改</el-button>
          <el-button type="text" icon="el-icon-delete" @click="handleDel(scope.row)">删除</el-button>
          <el-button type="text" icon="el-icon-key" @click="handleResetPassWord(scope.row)">重置</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getTime } from '@/mixins/time'
export default {
  name: 'User',
  mixins: [ getTime ],
  data () {
    return {
      title: '用户管理',
      searchMenu: {},
      searchShow: true,
      statusList: [{
        label: '正常',
        value: 0
      }, {
        label: '禁用',
        value: 1
      }],
      tableData: [{
        userId: '123',
        loginNum: 'zhangsan',
        userName: '张三',
        phone: '10086',
        status: 0,
        createTime: '2020-12-21 09:31:28'
      }]
    }
  },
  methods: {
    adduser () {},
    search () {
      console.log(this.searchMenu)
    },
    reset () {
      this.searchMenu = {}
    },
    // 禁用用户
    changeSwitch (row) {
      this.$confirm('此操作将修改该用户状态, 是否继续?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (row.status === false) {
          var switchStatus = 1
        } else {
          var switchStatuss = 0
        }
        this.$message.success('修改成功')
      }).catch(() => {
        this.$message.info('已取消操作')
        this.getlist()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.user {
  margin-left: 1%;
  margin-left: 1%;
  margin-bottom: 1%;
  .searchBtn {
    color: #FFF;
    background-color: #20b2aa;
    border-color: #20b2aa;
  }
}
</style>
