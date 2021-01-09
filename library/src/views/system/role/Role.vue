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
          <el-option v-for="(i, index) in statusList" :key="index" :label="i.label" :value="i.value"></el-option>
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
    <el-table :data="tableData" style="margin-top:60px">
      <el-table-column prop="roleName" label="角色名"></el-table-column>
      <el-table-column prop="perm" label="权限标识"></el-table-column>
      <el-table-column prop="date" label="创建时间"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status === true" style="margin-right:5px">正常</span>
          <el-switch v-model="scope.row.status" active-color="#409eff" inactive-color="#dcdfe6" @change="changeSwitch(scope.row)"></el-switch>
          <span v-if="scope.row.status === false" style="margin-left:5px">冻结</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.row)">修改</el-button>
          <el-button type="text" icon="el-icon-delete" @click="handleDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增/修改弹框 -->
    <el-dialog :title="title" :visible="dialogFormVisible">
      <el-form :model="addform">
        <el-form-item label="角色名称" :label-width="formLabelWidth" required>
          <el-input v-model="addform.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="权限标识" :label-width="formLabelWidth" required>
          <el-input v-model="addform.perm" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth" required>
          <el-radio-group v-model="addform.status">
            <el-radio v-for="(i, index) in statusList" :key="index" :label="i.value" >{{i.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addRoleForm">确 定</el-button>
        <el-button @click="close">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { apiPostRole, apiGetRoleList, apiPutRole, apiDelRole } from '@/utils/http_url'
export default {
  name: 'Role',
  data () {
    return {
      title: '角色管理',
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
      title: '',
      dialogFormVisible: false,
      addform: {},
      formLabelWidth: '80px'
    }
  },
  mounted () {
    this.getlist()
  },
  methods: {
    getlist () {
      apiGetRoleList().then(res => {
        this.tableData = res
        this.tableData.forEach(item => {
          if (item.status === 0) {
            item.status = true
          }
          if (item.status === 1) {
            item.status = false
          }
        })
      })
    },
    search () {
      console.log(this.searchMenu)
    },
    resetSearch () {
      this.searchMenu = {}
    },
    /* 新增 */
    addrole () {
      this.title = '新增角色'
      this.dialogFormVisible = true
    },
    /* 提交信息 */
    addRoleForm () {
      if (this.title === '新增角色') {
        const params = {
          roleName: this.addform.roleName,
          perm: this.addform.perm,
          status: this.addform.status,
          date: this.getLocalDate()
        }
        apiPostRole(params).then(res => {
          if (res.code === 200) {
            this.$message.success('添加成功')
            this.dialogFormVisible = false
            this.addform = {}
            this.getlist()
          }
        }).catch(e => {
          this.$message.warning(e.msg)
        })
      } else {
        const params = {
          roleName: this.addform.roleName,
          perm: this.addform.perm,
          status: this.addform.status,
          date: this.getLocalDate(),
          _id: this.addform._id
        }
        apiPutRole(params).then(res => {
          if (res.code === 200) {
            this.$message.success('修改成功')
            this.dialogFormVisible = false
            this.addform = {}
            this.getlist()
          }
        }).catch(e => {
          this.$message.warning(e.msg)
        })
      }
    },
    close () {
      this.dialogFormVisible = false
      this.addform = {}
      this.getlist()
    },
    // 禁用角色状态
    changeSwitch (row) {
      this.$confirm('此操作将修改该角色状态, 是否继续?', '警告', {
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
    // 编辑
    handleEdit (row) {
      this.title = '修改角色'
      this.addform = row
      if (this.addform.status ===  true) {
        this.addform.status = 0
      } else {
        this.addform.status = 1
      }
      this.dialogFormVisible = true
    },
    // 删除
    handleDel (val) {
      this.$confirm("确定删除" + val.roleName + "的数据项?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        apiDelRole(val).then(res => {
          if (res.code === 200) {
            this.$message.success('删除成功')
            this.getlist()
          }
        }).catch(e => {
          this.$message.warning(e.msg)
        })
      })
      .catch(() => {
      })
    },
    getLocalDate () {
      var date = new Date()
      var seperator1 = "-"
      var seperator2 = ":"
      var month = date.getMonth() + 1
      var strDate = date.getDate()
      var hours = date.getHours() // 时
      var minutes = date.getMinutes() // 分
      var seconds = date.getSeconds() // 秒
      if (month >= 1 && month <= 9) {
        month = "0" + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate
      }
      if (hours >= 0 && hours <= 9) {
        hours = "0" + hours
      }
      if (minutes >= 0 && minutes <= 9) {
        minutes = "0" + minutes
      }
      if (seconds >= 0 && seconds <= 9) {
        seconds = "0" + seconds
      }
      var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
          + " " + hours + seperator2 + minutes
          + seperator2 + seconds
      return currentdate
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
