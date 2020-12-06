<template>
  <div class="reg" v-if="this.show">
    <div class="loginfont">图书物流中心仓储管理信息系统</div>
    <a-page-header title="返回" @back="back"/>
    <a-form-model class="form" :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
      <span style="font-size:15px;font-weight:600;padding-top:1%;">注册账号</span>
      <a-form-model-item label="账号" prop="userName">
        <a-input v-model="form.userName" />
      </a-form-model-item>
      <a-form-model-item has-feedback label="密码" prop="passWord">
        <a-input v-model="form.passWord" type="password" autocomplete="off" />
      </a-form-model-item>
      <a-form-model-item has-feedback label="确认密码" prop="checkPassWord">
        <a-input v-model="form.checkPassWord" type="password" autocomplete="off" />
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="reg">注册</a-button>
        <a-button style="margin-left: 10px" @click="reset">重置</a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import { apiPostReg } from '@/utils/http_url'
export default {
  name: 'Reg',
  data () {
    return {
      form: {},
      labelCol: { span: 4 },
      wrapperCol: { span: 14 }
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
