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
      <el-table-column prop="printingContant" label="联系人">
        <template slot-scope="scope">
          <p @click="detail(scope.row)" class="detail" style="cursor: pointer">{{scope.row.printingContant}}</p>
        </template>
      </el-table-column>
      <el-table-column prop="printingEmail" label="E-mail"></el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
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
        <el-form-item label="联系人" :label-width="formLabelWidth" required>
          <el-input v-model="form.printingContant" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth" required>
          <el-radio-group v-model="form.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="职位" :label-width="formLabelWidth" required>
          <el-input v-model="form.position" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth" required>
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth" required>
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="E-mail" :label-width="formLabelWidth" required>
          <el-input v-model="form.printingEmail" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="form.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addPrinting">确 定</el-button>
        <el-button @click="close">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 联系人详情 -->
    <el-dialog title="联系人明细" :visible.sync="dialogTableVisible" width="70%">
      <el-table :data="gridData">
        <el-table-column property="printingId" label="出版社编码"></el-table-column>
        <el-table-column property="printingContant" label="姓名"></el-table-column>
        <el-table-column property="sex" label="性别"></el-table-column>
        <el-table-column property="position" label="职位"></el-table-column>
        <el-table-column property="address" label="地址"></el-table-column>
        <el-table-column property="phone" label="电话"></el-table-column>
        <el-table-column property="printingEmail" label="E-mail"></el-table-column>
        <el-table-column property="remark" label="备注"></el-table-column>
      </el-table>
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
      dialogFormVisible: false,
      dialogTableVisible: false,
      gridData: []
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
    },
    detail(row) {
      apiGetPrintingOne({ printingId: row.printingId }).then(res => {
        this.dialogTableVisible = true
        this.gridData = res
      }).catch(e => {
        this.$message.warning(e.msg)
      })
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
  .detail:hover {
    color: #409EFF;
  }
}
</style>
