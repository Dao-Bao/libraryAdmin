<template>
  <div class="stock">
    <Title :title="title" />

    <!-- 搜索栏 -->
    <el-form :inline="true" :model="searchMenu" size="small" class="demo-form-inline">
      <el-form-item label="图书编号">
        <el-input v-model="searchMenu.book" placeholder="请输入图书编号查询库存"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="warning" icon="el-icon-search" @click="search">查询</el-button>
        <el-button icon="el-icon-refresh" @click="reset">重置</el-button>
      </el-form-item>
      <el-form-item style="float:right">
        <el-button type="danger" icon="el-icon-plus" size="small" @click="addbook">新增入库单</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格 -->
    <el-table :data="tableData" :header-cell-style="{'color':'#333333','background-color':'#E5E8F8'}" style="width:99%;margin-top:20px;border-radius:10px;background:rgba(255,255,255,0.5)">
      <el-table-column prop="bookId" label="图书编号"></el-table-column>
      <el-table-column prop="isWare" label="是否入库"></el-table-column>
    </el-table>

    <!-- 新增入库单 -->
    <el-dialog title="新增入库单" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="图书编号" :label-width="formLabelWidth" required>
          <el-input v-model="form.bookNum" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="入库单号" :label-width="formLabelWidth" required>
          <el-input v-model="form.wareNum" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="form.remark" autocomplete="off"></el-input>
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
import { apiPostReservoir } from '@/utils/http_url'
export default {
  name: 'stock',
  data () {
    return {
      title: '入库管理',
      searchMenu: {},
      tableData: [],
      dialogFormVisible: false,
      form: {},
      formLabelWidth: '80px'
    }
  },
  methods:{
    search () {
      console.log(this.searchMenu)
    },
    reset () {
      console.log('重置', this.searchMenu)
    },
    addbook () {
      this.dialogFormVisible = true
    },
    addware () {
      this.form.isEnpty = 1
      apiPostReservoir(this.form).then(res => {
        this.dialogFormVisible = false
        this.form = {}
        this.$message.success('新增成功!')
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
