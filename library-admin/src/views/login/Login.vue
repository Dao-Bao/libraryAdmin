<template>
  <div class="login">
    <div class="content">
      <div class="loginfont">图书物流中心仓储管理信息系统</div>
      <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="100px" class="form">
        <el-form-item label="账号：" prop="userName">
          <el-input v-model="ruleForm.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="passWord">
          <el-input type="password" v-model="ruleForm.passWord" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
          <el-button type="primary" @click="submitForm">登录</el-button>
          <el-button type="success">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { apiLogin } from '@/utils/http_url'
export default {
  data () {
    return {
      ruleForm: {
        userName: '',
        passWord: ''
      }
    }
  },
  methods: {
    submitForm () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          // console.log(this.ruleForm)
          if (this.ruleForm.userName === '') {
            this.$message({
              type: 'warning',
              message: '账号不能为空'
            })
          } else if (this.ruleForm.passWord === '') {
            this.$message({
              type: 'warning',
              message: '密码不能为空'
            })
          } else {
            apiLogin(this.ruleForm).then(res => {
              // console.log(res)
              if (res.code === 200) {
                this.$router.push('/home')
              } else if (res.code === 1400) {
                this.$message.warning({
                  type: 'warning',
                  message: res.msg
                })
              } else if (res.code === 1401) {
                this.$message({
                  type: 'warning',
                  message: res.msg
                })
              } else if (res.code === 1402) {
                this.$message({
                  type: 'warning',
                  message: res.msg
                })
              }
            }).catch(e => {
              this.$message.error(e.msg)
            })
          }
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  position: relative;
  .content {
    background-color: red;
    width: 40%;
    text-align: center;
    .loginfont {
      font-size: 20px;
      font-weight: 600;
      padding-top: 2%;
    }
    .form {
      width: 80%;
      margin: 2% auto 0 auto;
      padding-bottom: 2%;
    }
  }
}
</style>
