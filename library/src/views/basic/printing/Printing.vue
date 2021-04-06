<template>
  <div class="printing">
    <Title :title="title" />

    <!-- 搜索栏 -->
    <el-form :inline="true" :model="searchMenu" size="small" class="demo-form-inline" >
      <el-form-item label="出版社编号">
        <el-input v-model="searchMenu.printingId" placeholder="请输入出版社编号"></el-input>
      </el-form-item>
      <el-form-item label="出版社名称">
        <el-input v-model="searchMenu.printingName" placeholder="请输入出版社名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="warning" icon="el-icon-search" size="small" @click="search">查询</el-button>
        <el-button icon="el-icon-refresh" @click="reset">重置</el-button>
      </el-form-item>
      <el-form-item style="float:right">
        <el-button type="danger" icon="el-icon-plus" size="small" @click="addprinting">增加出版社</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格 -->
    <el-table :data="tableData" :header-cell-style="{'color':'#333333','background-color':'#E5E8F8'}" style="width:99%;margin-top:20px;border-radius:10px;background:rgba(255,255,255,0.5)">
      <el-table-column prop="printingId" label="出版社编号"></el-table-column>
      <el-table-column prop="printingName" label="出版社名称"></el-table-column>
      <el-table-column prop="printingAddress" label="出版社地址"></el-table-column>
    </el-table>

    <!-- 新增弹框 -->
    <el-dialog :title="diaTitle" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="出版社编号" :label-width="formLabelWidth" required>
          <el-input v-model="form.printingId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="出版社名称" :label-width="formLabelWidth" required>
          <el-input v-model="form.printingName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="出版社地址" :label-width="formLabelWidth" required>
          <el-input v-model="form.printingAddress" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addPrinting">确 定</el-button>
        <el-button @click="close">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { apiPostPrinting, apiGetPrinting, apiGetPrintingOne } from '@/utils/http_url'
export default {
  name: 'Printing',
  data () {
    return {
      title: '出版社信息',
      searchMenu: {},
      tableData: [],
      form: {},
      formLabelWidth: '100px',
      diaTitle: '',
      dialogFormVisible: false
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    getList () {
      apiGetPrinting().then(res => {
        this.tableData = res
      }).catch(e => {
        this.$message.warning(e.msg)
      })
    },
    search() {
      apiGetPrintingOne(this.searchMenu).then(res => {
        this.tableData = res
      }).catch(e => {
        this.$message.warning(e.msg)
      })
    },
    reset() {
      this.searchMenu = {}
      this.getList()
    },
    addprinting () {
      this.dialogFormVisible = true
    },
    addPrinting () {
      apiPostPrinting(this.form).then(res => {
        if (res.code = 200) {
          this.dialogFormVisible = false
          this.$message.success('新增成功!')
          this.form = {}
          this.getList()
        }
      })
    },
    close () {
      this.dialogFormVisible = false
      this.form = {}
      this.getList()
    }
  }
}
</script>

<style lang="scss" scoped>
.printing {
  margin-top: 1%;
  margin-left: 1%;
  ::v-deep .demo-form-inline {
    .el-form-item__label {
      color: #FFF
    }
  }
}
</style>
