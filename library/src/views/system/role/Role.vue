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
        <el-button type="warning" icon="el-icon-search" size="small" @click="search">查询</el-button>
        <el-button icon="el-icon-refresh" @click="reset">重置</el-button>
      </el-form-item>
      <el-form-item style="float:right">
        <el-button type="danger" icon="el-icon-plus" size="small" @click="addrole">增加角色</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格 -->
    <el-table :data="tableData" :header-cell-style="{'color':'#333333','background-color':'#E5E8F8'}" style="width:99%;margin-top:20px;border-radius:10px;background:rgba(255,255,255,0.5)">
      <el-table-column prop="_id" label="角色编号"></el-table-column>
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
    <el-dialog :title="diaTitle" :visible.sync="dialogFormVisible" style="border-radius:50px">
      <el-form :model="addform">
        <el-form-item label="角色名称" :label-width="formLabelWidth" required>
          <el-input v-model="addform.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="权限标识" :label-width="formLabelWidth" required>
          <el-select v-model="addform.perm" placeholder="用户状态">
            <el-option v-for="(i, index) in permList" :key="index" :label="i.label" :value="i.value"></el-option>
          </el-select>
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
import { getTime } from '@/mixins/time'
import { apiPostRole, apiGetRoleList, apiGetRole, apiPutRole, apiDelRole } from '@/utils/http_url'
export default {
  name: 'Role',
  mixins: [ getTime ],
  data () {
    return {
      title: '角色管理',
      searchMenu: {},
      searchShow: true,
      permList: [{
        label: '管理员',
        value: 'admin'
      }, {
        label: '其他用户',
        value: 'other'
      }, {
        label: '测试',
        value: 'test'
      }],
      statusList: [{
        label: '正常',
        value: 0
      }, {
        label: '禁用',
        value: 1
      }],
      tableData: [],
      diaTitle: '',
      dialogFormVisible: false,
      addform: {},
      formLabelWidth: '80px'
    }
  },
  mounted () {
    this.getlist()
  },
  methods: {
    // 获取初始化列表
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
      apiGetRole(this.searchMenu).then(res => {
        this.tableData = res
        this.tableData.forEach(item => {
          if (item.status === 0) {
            item.status = true
          }
          if (item.status === 1) {
            item.status = false
          }
        })
      }).catch(e => {
        this.$message.warning('e.msg')
      })
    },
    reset () {
      this.searchMenu = {}
      this.getlist()
    },
    /* 新增 */
    addrole () {
      this.diaTitle = '新增角色'
      this.dialogFormVisible = true
    },
    /* 提交信息 */
    addRoleForm () {
      if (this.diaTitle === '新增角色') {
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
      this.diaTitle = '修改角色'
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
    }
  }
}
</script>

<style lang="scss" scoped>
.role {
  margin-left: 1%;
  margin-left: 1%;
  margin-bottom: 1%;
  ::v-deep .demo-form-inline {
    .el-form-item__label {
      color: #FFF
    }
  }
  .el-dialog {
    border-radius: 10px;
  }
}
</style>
