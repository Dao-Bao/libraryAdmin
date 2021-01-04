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
    <a-table :columns="columns" :data-source="data" style="margin-top:60px">
      <span slot="action" slot-scope="record">
        <a-button icon="eye" type="link" @click="handleSee(record)">查看</a-button>
        <a-button icon="delete" type="link" @click="handleDel(record)">删除</a-button>
      </span>
    </a-table>
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
      data: [{
        key: 1,
        name: '管理员',
        identify: 'admin'
      },
      {
        key: 2,
        name: '其他',
        identify: 'other'
      }],
      columns: [{
        title: '角色名',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '标识',
        dataIndex: 'identify',
        key: 'identify'
      },
      {
        title: '操作',
        key: 'action',
        scopedSlots: { customRender: 'action' }
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
    handleDel (record) {
      // console.log(record)
      this.$confirm({
        title: '删除提示',
        content: '确定删除名称为：' + record.name + '的数据项？',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk () {
          // console.log('OK')
          // this.$message.success('删除成功')
          // alert('删除成功')
          this.$notice.success('删除成功')
        },
        onCancel () {
          // console.log('Cancel')
          this.$notice.success('取消成功')
        }
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
