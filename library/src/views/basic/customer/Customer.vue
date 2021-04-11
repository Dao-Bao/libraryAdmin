<template>
  <div class="reservoir">
    <Title :title="title" />

    <!-- 搜索栏 -->
    <el-form :inline="true" :model="searchMenu" size="small" class="demo-form-inline" >
      <el-form-item label="客户编号">
        <el-input v-model="searchMenu._v" placeholder="请输入客户编号"></el-input>
      </el-form-item>
      <el-form-item label="客户姓名">
        <el-input v-model="searchMenu.customerName" placeholder="请输入客户姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="warning" icon="el-icon-search" size="small" @click="search">查询</el-button>
        <el-button icon="el-icon-refresh" @click="reset">重置</el-button>
      </el-form-item>
      <el-form-item style="float:right">
        <el-button type="danger" icon="el-icon-plus" size="small" @click="opendia">增加客户</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格 -->
    <el-table :data="tableData" :header-cell-style="{'color':'#333333','background-color':'#E5E8F8'}" style="width:99%;margin-top:20px;border-radius:10px;background:rgba(255,255,255,0.5)">
      <el-table-column prop="_id" label="客户编号"></el-table-column>
      <el-table-column prop="customerName" label="姓名"></el-table-column>
      <el-table-column prop="customerSex" label="性别"></el-table-column>
      <el-table-column prop="customerAddress" label="地址"></el-table-column>
      <el-table-column prop="customerPhone" label="电话"></el-table-column>
      <el-table-column prop="customerEamil" label="E-mail"></el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
    </el-table>

    <!-- 新增/弹框 -->
    <el-dialog :title="diaTitle" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="用户姓名" :label-width="formLabelWidth" required>
          <el-input v-model="form.customerName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth" required>
          <el-input v-model="form.customerSex" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth" required>
          <el-input v-model="form.customerAddress" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth" required>
          <el-input v-model="form.customerPhone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="E-mail" :label-width="formLabelWidth" required>
          <el-input v-model="form.customerEamil" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="form.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addcustomer">确 定</el-button>
        <el-button @click="close">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { apiPostCustomer, apiGetCustomerList, apiGetCustomerOne } from '@/utils/http_url'
export default {
  name: 'reservoir',
  data () {
    return {
      title: '客户信息',
      searchMenu: {},
      tableData: [],
      diaTitle: '新增客户',
      dialogFormVisible: false,
      form: {},
      formLabelWidth: '80px'
    }
  },
  mounted () {
    this.getlist()
  },
  methods: {
    getlist () {
      apiGetCustomerList(this.searchMenu).then(res => {
        this.tableData = res
      }).catch(e => {
        this.$message.warning(e.msg)
      })
    },
    search() {
      apiGetCustomerOne(this.searchMenu).then(res => {
        this.tableData = res
      }).catch(e => {
        this.$message.warning(e.msg)
      })
    },
    reset() {
      this.searchMenu = {}
      // this.getList()
      this.tableData = []
    },
    opendia () {
      this.dialogFormVisible = true
    },
    addcustomer () {
      apiPostCustomer(this.form).then(res => {
        this.$message.success('添加成功！')
        this.dialogFormVisible = false
        this.form = {}
      })
    },
    close () {
      this.dialogFormVisible = false
      this.form = {}
    }
  }
}
</script>

<style lang="scss" scoped>
.reservoir {
  margin-top: 1%;
  margin-left: 1%;
  ::v-deep .demo-form-inline {
    .el-form-item__label {
      color: #FFF
    }
  }
}
</style>
