<template>
  <div class="login">
    <div v-if="!show">
      <div class="loginfont">图书物流中心仓储管理信息系统</div>
      <div class="content" id="content">
        <el-form ref="form" :model="ruleForm" label-width="80px" class="form">
          <el-form-item label="账号">
            <el-input v-model="ruleForm.loginNum"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password" v-model="ruleForm.loginPass"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login">登录</el-button>
            <el-button @click="open">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- 注册 -->
    <Reg :show="show" @close="close" />
  </div>
</template>

<script>
import Reg from './reg'
import { initDynamicRoutes } from '@/router'
export default {
  data () {
    return {
      ruleForm: {},
      show: false
    }
  },
  components: {
    Reg
  },
  methods: {
    login () {
      if (this.ruleForm.userName === '') {
        this.$message.error('账号不能为空')
        this.$notice.warning('账号不能为空')
      } else if (this.ruleForm.passWord === '') {
        this.$notice.warning('密码不能为空')
      } else {
        this.$store.dispatch('Login', this.ruleForm).then(res => {
          initDynamicRoutes()
          this.$router.push('/home')
        }).catch(e => {
          this.$notice.warning(e.msg)
        })
      }
    },
    open () {
      this.show = true
    },
    close (val) {
      this.show = val
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 50vh;
  position: relative;
  background: url('../../assets/bk.jpg');
  background-size: 100%;
  background-repeat: no-repeat;
  .loginfont {
    font-size: 30px;
    font-weight: 600;
    position: absolute;
    top: 30%;
    left: 50%;
    color: #FFFFFF;
    transform: translate(-50%, -50%);
  }
  .content {
    width: 30%;
    text-align: center;
    background: #fafafa;
    border-radius: 2%;
    border: 1px #fafafa solid;
    position: absolute;
    left: 50%;
    top: 100%;
    transform: translate(-50%, -50%);
    box-shadow: rgb(246, 233, 233) 0px 0px 8px 5px;
    .form {
      width: 80%;
      margin-top: 10%;
    }
  }
}
</style>
