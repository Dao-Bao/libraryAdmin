<template>
  <div class="user">
    <Title :title="title" />
    <!-- 搜索栏 -->
    <el-form :inline="true" :model="searchMenu" size="small" class="demo-form-inline" v-if="searchShow">
      <el-form-item label="用户名称">
        <el-input v-model="searchMenu.userName" placeholder="请输入用户名称"></el-input>
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
  </div>
</template>

<script>
export default {
  name: 'User',
  data () {
    return {
      title: '用户管理',
      searchMenu: {},
      searchShow: true
    }
  },
  methods: {
    addrole () {},
    search () {
      console.log(this.searchMenu)
    },
    resetSearch () {
      this.searchMenu = {}
    }
  }
}
</script>

<style lang="scss" scoped>
.user {
  margin: 2%;
  .searchBtn {
    color: #FFF;
    background-color: #20b2aa;
    border-color: #20b2aa;
  }
}
</style>
