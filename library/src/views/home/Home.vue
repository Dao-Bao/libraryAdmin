<template>
  <!-- 头 -->
  <el-container class="home">
    <el-header style="display:flex; margin-top:1%; height:35px;">
      <div style="font-size:14px;flex:1;line-height:30px;"><router-link to="/home">图书物流中心仓储管理信息系统</router-link></div>
      <div style="display:flex;float: right">
        <el-dropdown placement="bottom-start"  @command="handleCommand">
          <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" class="headerImg" alt="">
          <el-dropdown-menu slot="dropdown">
            <!-- <el-dropdown-item>个人中心</el-dropdown-item> -->
            <el-dropdown-item command="aa">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <div class="user-role">
          <div class="wollocom">欢迎您, {{userName}}</div>
          <div class="header-time">{{ nowDate }},{{ nowTime }}</div>
        </div>
      </div>
    </el-header>
    <!-- 内容 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200">
        <menu-bar></menu-bar>
      </el-aside>

      <!--右边内容显示区-->
      <el-container>
        <el-main class="main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import MenuBar from '@/components/MenuBar'
export default {
  name: 'Home',
  data () {
    return {
      userName: JSON.parse(sessionStorage.getItem('userinfo')),
      nowDate: null, // 存放年月日变量
      nowTime: null, // 存放时分秒变量
      timer: '', // 定义一个定时器的变量
      currentTime: new Date() // 获取当前时间
    }
  },
  components: {
    MenuBar
    // Tabs
  },
  created () {
    this.timer = setInterval(this.getTime, 1000)
  },
  // mounted () {
  //   console.log(this.$store.state.LoginStore.userInfo)
  // },
  methods: {
    // 获取当前日期
    getTime () {
      const date = new Date()
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      const hour = date.getHours()
      const minute = date.getMinutes()
      const second = date.getSeconds()
      this.month = check(month)
      this.day = check(day)
      this.hour = check(hour)
      this.minute = check(minute)
      this.second = check(second)
      function check (i) {
        const num = (i < 10) ? ('0' + i) : i
        return num
      }
      this.nowDate = year + '年' + this.month + '月' + this.day + '日'
      this.nowTime = this.hour + ':' + this.minute + ':' + this.second
    },
    // 登出
    logout () {
      sessionStorage.clear()
      this.$router.push('/')
    },
    handleCommand (command) {
      if (command === 'aa') {
        this.logout()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100vh;
  display: flex;
  .headerImg {
    width: 40px;
    cursor: pointer;
  }
  .user-role {
    font-size: 14px;
  }
  a:hover {
    color: #66b1ff;
  }
  a {
    color: #606266;
  }
  .menu-bar:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-menu {
    border-right: none;;
  }

  .el-aside {
    border-right: 1px solid #e6e6e6;
  }
  .main {
    padding: 0;
    // display: flex;
    .arrowIcon {
      border: 1px solid transparent;
      float: left;
      height: 39px;
      width: 50px;
      color: #409EFF;
      position: relative;
      .el-icon-s-unfold, .el-icon-s-fold {
        position:absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
  ::v-deep .el-divider--horizontal {
    margin: 2px 0 20px 0;
  }
}
</style>
