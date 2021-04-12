<template>
  <div class="stock">
    <Title :title="title" />

    <!-- 搜索栏 -->
    <el-form :inline="true" :model="searchMenu" size="small" class="demo-form-inline">
      <el-form-item label="入库单编号">
        <el-input v-model="searchMenu._id" placeholder="请输入入库单号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="warning" icon="el-icon-search" @click="search">查询</el-button>
        <el-button icon="el-icon-refresh" @click="reset">重置</el-button>
      </el-form-item>
      <el-form-item style="float:right">
        <el-button type="danger" icon="el-icon-plus" size="small" @click="addbook">新增出库单</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格 -->
    <el-table :data="tableData" :header-cell-style="{'color':'#333333','background-color':'#E5E8F8'}" style="width:99%;margin-top:20px;border-radius:10px;background:rgba(255,255,255,0.5)">
      <el-table-column prop="_id" label="图书编号"></el-table-column>
      <el-table-column prop="outwarehousingprice" label="总金额"></el-table-column>
      <el-table-column prop="outwarehousingprinting" label="出版社"></el-table-column>
      <el-table-column prop="outwarehousingtotal" label="出库总数"></el-table-column>
      <el-table-column prop="outwarehousingtime" label="出库时间"></el-table-column>
      <el-table-column prop="outwarehousingtype" label="出库方式"></el-table-column>
      <el-table-column prop="outwarehousingperson" label="制单人"></el-table-column>
      <el-table-column prop="outwarehousingremark" label="备注"></el-table-column>
    </el-table>

    <!-- 新增入库单 -->
    <el-dialog title="新增入库单" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="总金额" :label-width="formLabelWidth" required>
          <el-input v-model="form.outwarehousingprice" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="出版社" :label-width="formLabelWidth" required>
          <el-input v-model="form.outwarehousingprinting" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="出库总数" :label-width="formLabelWidth" required>
          <el-input v-model="form.outwarehousingtotal" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="出库时间" :label-width="formLabelWidth" required>
          <el-input v-model="form.outwarehousingtime" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="出库方式" :label-width="formLabelWidth" required>
          <el-select v-model="form.outwarehousingtype" placeholder="请选择出库方式">
            <el-option label="销售出库" value="销售出库"></el-option>
            <el-option label="换书出库" value="换书出库"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="制单人" :label-width="formLabelWidth" required>
          <el-input v-model="form.outwarehousingperson" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="form.outwarehousingremark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addware">确 定</el-button>
        <el-button @click="close">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { apiPostOutwarehouse, apiGetOutwarehouse, apiGetOutwarehouseOne } from '@/utils/http_url'
export default {
  name: 'delivery',
  data () {
    return {
      title: '出库管理',
      searchMenu: {},
      tableData: [],
      dialogFormVisible: false,
      form: {},
      formLabelWidth: '80px'
    }
  },
  mounted () {
    this.getlist()
  },
  methods:{
    getlist () {
      apiGetOutwarehouse().then(res => {
        this.tableData = res
      }).catch(e => {
        this.$message.warning(e.msg)
      })
    },
    search () {
      apiGetOutwarehouseOne(this.searchMenu).then(res => {
        this.tableData = res
      }).catch(e => {
        this.$message.warning(e.msg)
      })
    },
    reset () {
      this.searchMenu = {}
      this.getlist()
    },
    addbook () {
      this.dialogFormVisible = true
    },
    addware () {
      apiPostOutwarehouse(this.form).then(res => {
        this.dialogFormVisible = false
        this.form = {}
        this.$message.success('新增成功!')
        this.getlist()
      })
    },
    close () {
      this.dialogFormVisible = false
      this.form = {}
      this.getlist()
    }
  }
}
</script>

<style lang="scss" scoped>
.stock {
  margin-top: 1%;
  margin-left: 1%;
  ::v-deep .demo-form-inline {
    .el-form-item__label {
      color: #FFF
    }
  }
}
</style>
