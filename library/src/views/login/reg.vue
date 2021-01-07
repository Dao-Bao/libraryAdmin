<template>
  <div class="reg" v-if="this.show">
    <el-page-header @back="back" content="注册" />
    <div class="loginfont">图书物流中心仓储管理信息系统</div>
    <el-form ref="form" status-icon :model="form" label-width="80px" class="form">
      <el-form-item label="账号" prop="userName">
        <el-input v-model="ruleForm.userName"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
        <el-button @click="open">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { apiPostReg } from '@/utils/http_url'
export default {
  name: 'Reg',
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      form: {}
    }
  },
  props: {
    show: Boolean
  },
  methods: {
    back () {
      this.$emit('close', false)
    },
    // 注册
    reg () {
      console.log(this.form)
      const params = {
        userName: this.form.userName,
        passWord: this.form.passWord
      }
      apiPostReg(params).then(res => {
        console.log(res)
      }).catch(e => {
        console.log(e)
      })
    },
    // 重置
    reset () {
      this.form = {}
    }
  }
}
</script>

<style lang="scss" scoped>
.reg {
  position: relative;
  .loginfont {
    font-size: 30px;
    font-weight: 600;
    position: absolute;
    top: 100%;
    left: 50%;
    color: #FFFFFF;
    transform: translate(-50%, 28%);
  }
  .form {
    width: 35%;
    // margin:0 auto;
    position: absolute;
    left: 50%;
    top: 100%;
    transform: translate(-50%, 40%);
    text-align: center;
    background: #fafafa;
    border-radius: 2%;
    border: 1px #EEEEEE solid;
    box-shadow: rgb(246, 233, 233) 0px 0px 8px 5px;
    padding-left: 5%;
    padding-right: 2%;
    padding-top: 2%;
  }
}
</style>
