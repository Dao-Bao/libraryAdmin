<template>
  <div class="login">
    <div v-if="!show">
      <div class="loginfont">图书物流中心仓储管理信息系统</div>
      <div class="content" id="content">
        <a-form-model class="form" ref="ruleForm" :model="ruleForm" v-bind="layout">
          <a-form-model-item label="登录账号" prop="userName">
            <a-input v-model="ruleForm.userName" type="text" autocomplete="off" />
          </a-form-model-item>
          <a-form-model-item label="密码" prop="passWord">
            <a-input v-model="ruleForm.passWord" type="password" autocomplete="off" />
          </a-form-model-item>
          <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
            <a-button type="primary" @click="login" :disabled="ruleForm.userName === '' || ruleForm.passWord === ''">
              登录
            </a-button>
            <a-button style="margin-left: 10px" @click="open">
              注册
            </a-button>
          </a-form-model-item>
        </a-form-model>
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
      ruleForm: {
        userName: '',
        passWord: ''
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 }
      },
      show: false
    }
  },
  components: {
    Reg
  },
  mounted () {
    // const height = document.querySelector('.content').clientHeight
    // document.querySelector('.form').style.marginTop = height / 2 + 'px'
  },
  methods: {
    login () {
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
        this.$store.dispatch('Login', this.ruleForm).then(res => {
          // if (res.code === 200) {
          // initDynamicRoutes()
          this.$router.push('/home')
          // } else if (res.code === 1400) {
          //   this.$message.warning('3')
          // } else if (res.code === 1401) {
          //   this.$message.warning('2')
          // } else if (res.code === 1402) {
          //   this.$message.warning('1')
          // }
        }).catch(e => {
          this.$message.warning(e.msg)
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
    width: 29%;
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
      width: 100%;
      margin: 0 auto;
      padding-left: 2%;
      padding-right: 2%;
      padding-top: 15%;
    }
    ::v-deep .ant-col-14 {
      width: 77.333333%;
    }
  }
}
</style>
