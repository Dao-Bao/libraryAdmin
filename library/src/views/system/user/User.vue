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
        <el-button type="warning" icon="el-icon-search" size="small" @click="search">查询</el-button>
        <el-button icon="el-icon-refresh" @click="reset">重置</el-button>
      </el-form-item>
      <el-form-item style="float:right">
        <el-button type="danger" icon="el-icon-plus" size="small" @click="adduser">增加用户</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table :data="tableData" :header-cell-style="{'color':'#333333','background-color':'#E5E8F8'}" style="width:99%;margin-top:20px;border-radius:10px;background:rgba(255,255,255,0.5)">
      <el-table-column prop="_id" label="用户编号"></el-table-column>
      <el-table-column prop="loginNum" label="登录账号"></el-table-column>
      <el-table-column prop="userName" label="用户昵称"></el-table-column>
      <el-table-column prop="phone" label="手机号码"></el-table-column>
      <el-table-column prop="status" label="状态" width="100px">
        <template slot-scope="scope">
          <span v-if="scope.row.status === true" style="margin-right:5px">正常</span>
          <el-switch v-model="scope.row.status" active-color="#409eff" inactive-color="#dcdfe6" @change="changeSwitch(scope.row)"></el-switch>
          <span v-if="scope.row.status === false" style="margin-left:5px">禁用</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间"></el-table-column>
      <el-table-column label="操作" width="220px">
        <template slot-scope="scope">
          <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.row)">修改</el-button>
          <el-button type="text" icon="el-icon-delete" @click="handleDel(scope.row)">删除</el-button>
          <el-button type="text" icon="el-icon-key" @click="handleResetPassWord(scope.row)">重置密码</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增/修改弹框 -->
    <el-dialog :title="diaTitle" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="用户昵称" :label-width="formLabelWidth" required>
          <el-input v-model="form.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="登录账号" :label-width="formLabelWidth" required>
          <el-input v-model="form.loginNum" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item v-if="this.diaTitle !== '修改用户'" label="登录密码" :label-width="formLabelWidth" required>
          <el-input v-model="form.loginPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth" required>
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色选择" :label-width="formLabelWidth" required>
          <el-select v-model="form.role" placeholder="选择用户角色">
            <el-option v-for="(i, index) in roleList" :key="index" :label="i.roleName" :value="i._id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth" required>
          <el-radio-group v-model="form.status">
            <el-radio v-for="(i, index) in statusList" :key="index" :label="i.value" >{{i.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="form.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addnewuser">确 定</el-button>
        <el-button @click="close">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getTime } from '@/mixins/time'
import { apiGetRoleList, apiPostUser, apiGetUserList } from '@/utils/http_url'
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
      tableData: [],
      diaTitle: '',
      form: {},
      dialogFormVisible: false,
      formLabelWidth: '80px',
      roleList: []
    }
  },
  mounted () {
    this.getlist()
  },
  methods: {
    /* 获取角色列表 */
    getRole () {
      apiGetRoleList().then(res => {
        this.roleList = res
      }).catch(e => {
        this.$message.warning(e.msg)
      })
    },
    /* 获取用户列表 */
    getlist () {
      apiGetUserList().then(res => {
        // console.log(res)
        this.tableData = res
        this.tableData.forEach(item => {
          if (item.status === '0') {
            item.status = true
          } else {
            item.status = false
          }
        })
      }).catch(e => {
        this.$message.warning(e.msg)
      })
    },
    search () {
      console.log(this.searchMenu)
    },
    reset () {
      this.searchMenu = {}
    },
    adduser () {
      this.diaTitle = '新增用户'
      this.dialogFormVisible = true
      this.getRole()
    },
    addnewuser () {
      if (this.diaTitle === '新增用户') {
        const params = {
          userName: this.form.userName,
          loginNum: this.form.loginNum,
          loginPass: this.form.loginPass,
          phone: this.form.phone,
          role: this.form.role,
          status: this.form.status,
          remark: this.form.remark
        }
        apiPostUser(params).then(res => {
          if (res.code ===200) {
            this.$message.success('添加成功')
            this.dialogFormVisible = false
          }
        }).catch(e => {
          this.$message.warning(e.msg)
        })
      }
    },
    close () {
      this.dialogFormVisible = false
      this.form = {}
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
    },
    /* 修改 */
    handleEdit (row) {
      this.diaTitle = '修改用户'
      this.form = row
      if (this.form.status === false) {
        this.form.status = 1
      } else {
        this.form.status = 0
      }
      this.dialogFormVisible = true
      this.getRole()
    }
  }
}
</script>

<style lang="scss" scoped>
.user {
  margin-left: 1%;
  margin-left: 1%;
  margin-bottom: 1%;
  ::v-deep .demo-form-inline {
    .el-form-item__label {
      color: #FFF
    }
  }
}
</style>
