<template>
  <div class="dept">
    <Title :title="title" />

    <!-- tab -->
    <el-tabs class="tab" v-model="activeName" type="border-card" @tab-click="handleClick">
      <el-tab-pane v-for="(i, index) in paneList" :key="index" :label="i.label" :name="i.name">
        <template>
          <div class="addBtn">
            <el-button v-if="activeName === '0'" type="text" icon="el-icon-plus" @click="addDept">新增部门</el-button>
            <el-button v-if="activeName === '1'" type="text" icon="el-icon-plus" @click="addReseroir">新增岗位</el-button>
            <el-button v-if="activeName === '2'" type="text" icon="el-icon-plus" @click="addUser">新增员工</el-button>
          </div>
          <div class="table">
            <el-table :data="tableData" :header-cell-style="{'color':'#333333','background-color':'#E5E8F8'}" style="width:99%;margin-top:20px;;background:rgba(255,255,255,0.5)">
              <template v-if="activeName === '0'">
                <el-table-column prop="_id" label="部门编号"></el-table-column>
                <el-table-column prop="deptName" label="部门名称"></el-table-column>
                <el-table-column prop="deptManager" label="部门经理"></el-table-column>
              </template>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.row)">修改</el-button>
                  <el-button type="text" icon="el-icon-delete" @click="handleDel(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </template>
      </el-tab-pane>
    </el-tabs>

    <!-- 弹框 -->
    <el-dialog class="dialog" :visible="dialogFormVisible" :show-close="false">
      <div slot="title" class="dialog-title"  style="text-align:center">
        <span class="title-text" style="font-size:20px;font-weight:700">{{diaTitle}}</span>
      </div>
      <el-form :model="form" style="width:90%">
        <el-form-item label="部门名称" :label-width="formLabelWidth">
          <el-input v-model="form.deptName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="部门经理" :label-width="formLabelWidth">
          <el-input v-model="form.deptManager" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="部门描述" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="form.deptDesc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align:center">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="onSubmit">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { apiPostDept, apiGetDeptList, apiPutDept, apiDelDept } from '@/utils/http_url'
export default {
  name: 'dept',
  data () {
    return {
      title: '员工信息',
      activeName: '0',
      paneList: [{
        label: '部门',
        name: '0'
      }, {
        label: '岗位信息',
        name: '1'
      }, {
        label: '员工信息',
        name: '2'
      }],
      tableData: [],
      diaTitle: '',
      formLabelWidth: '100px',
      form: {},
      dialogFormVisible: false
    }
  },
  mounted () {
    this.getlist('0')
  },
  methods: {
    handleClick(tab) {
      this.getlist(tab.name)
    },
    // 获取初始化表格数据
    getlist (val) {
      if (val === '0') {
        apiGetDeptList().then(res => {
          this.tableData = res
        }).catch(e => {
          this.$message.warning(e.msg)
        })
      } else if (val === '1') {
        alert('岗位')
      } else {
        alert('员工信息')
      }
    },
    /* 新增部门 */
    addDept () {
      this.diaTitle = '新增部门'
      this.dialogFormVisible = true
    },
    /* 新增岗位 */
    addReseroir () {
      alert('新增岗位')
    },
    /* 新增员工 */
    addUser () {
      alert('新增员工')
    },
    handleEdit (row) {
      // alert('编辑')
      this.diaTitle = '修改部门信息'
      this.form = row
      this.dialogFormVisible = true
    },
    handleDel (row) {
      /* apiDelDept */
      this.$confirm('将删除该用户, 是否确定?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        apiDelDept(row).then(res => {
          if (res.code === 200) {
            this.$message.success('删除成功！')
            this.dialogFormVisible = false
            this.getlist('0')
          }
        }).catch(e => {
          this.$message.warning(e.msg)
        })
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    },
    close () {
      this.dialogFormVisible = false
      this.form = {}
    },
    // 弹框提交
    onSubmit () {
      if (this.diaTitle === '新增部门') {
        apiPostDept(this.form).then(res => {
          if (res.code === 200) {
            this.$message.success('添加成功！')
            this.dialogFormVisible = false
            this.form = {}
            this.getlist('0')
          }
        }).catch(e => {
          this.$message.warning(e.message)
        })
      } else if (this.diaTitle === '修改部门信息') {
        apiPutDept(this.form).then(res => {
          if (res.code === 200) {
            this.$message.success('修改成功！')
            this.dialogFormVisible = false
            this.getlist('0')
          }
        }).catch(e => {
          this.$message.warning(e.msg)
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dept {
  margin-top: 1%;
  margin-left: 1%;
  .tab {
    width: 80%;
    margin: 0 auto;
    border-radius: 10px;
    ::v-deep .el-tabs__header {
      height: 90px;
      line-height: 90px;
      background-color: #FFFFFF;
      border-bottom: 1px solid #e8e8e8;
      border-radius: 10px 10px 0px 0px;
      margin: 0;
      .el-tabs__nav-wrap {
        overflow: hidden;
        margin-bottom: -1px;
        position: relative;
        border-radius: 30px;
        .el-tabs__item {
          color: black;
          background-color: #FFF;
          font-size: 20px;
          font-weight: 700;
        }
        .el-tabs__item.is-active {
          background-color: #FFF;
          border-right-color: #ffffff;
          border-left-color: #ffffff;
          color: #409EFF;
          background-color: #FFF;
          font-size: 20px;
          font-weight: 700;
        }
      }
    }
    ::v-deep .el-tabs__content {
      padding-left: 15px;
      padding-right: 15px;
      padding-top: 0;
      padding-bottom: 15px;
      .addBtn {
        float: right;
      }
    }
  }
  ::v-deep .el-dialog {
    border-radius: 10px;
  }
}
</style>
