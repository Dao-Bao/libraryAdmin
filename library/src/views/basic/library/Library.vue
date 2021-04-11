<template>
  <div class="library">
    <Title :title="title" />

    <!-- 搜索栏 -->
    <el-form :inline="true" :model="searchMenu" size="small" class="demo-form-inline" >
      <el-form-item label="图书编号">
        <el-input v-model="searchMenu._id" placeholder="请输入图书编号"></el-input>
      </el-form-item>
      <el-form-item label="图书姓名">
        <el-input v-model="searchMenu.libiaryName" placeholder="请输入图书名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="warning" icon="el-icon-search" size="small" @click="search">查询</el-button>
        <el-button icon="el-icon-refresh" @click="reset">重置</el-button>
      </el-form-item>
      <el-form-item style="float:right">
        <el-button type="danger" icon="el-icon-plus" size="small" @click="opendia">增加图书</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格 -->
    <el-table :data="tableData" :header-cell-style="{'color':'#333333','background-color':'#E5E8F8'}" style="width:99%;margin-top:20px;border-radius:10px;background:rgba(255,255,255,0.5)">
      <el-table-column prop="libraryId" label="图书编号"></el-table-column>
      <el-table-column prop="libraryName" label="图书名称"></el-table-column>
      <el-table-column prop="printing" label="出版社"></el-table-column>
      <el-table-column prop="barCode" label="条形码"></el-table-column>
      <el-table-column prop="libraryPrice" label="图书单价"></el-table-column>
      <el-table-column prop="libraryAuthor" label="作者"></el-table-column>
      <el-table-column prop="type" label="种类"></el-table-column>
      <el-table-column prop="dateTime" label="出版日期"></el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
    </el-table>

    <!-- 新增弹框 -->
    <el-dialog :title="diaTitle" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="图书编号" :label-width="formLabelWidth" required>
          <el-input v-model="form.libraryId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图书名称" :label-width="formLabelWidth" required>
          <el-input v-model="form.libraryName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="出版社" :label-width="formLabelWidth" required>
          <el-input v-model="form.printing" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="条形码" :label-width="formLabelWidth" required>
          <el-input v-model="form.barCode" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图书单价" :label-width="formLabelWidth" required>
          <el-input v-model="form.libraryPrice" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="作者" :label-width="formLabelWidth" required>
          <el-input v-model="form.libraryAuthor" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="种类" :label-width="formLabelWidth" required>
          <el-input v-model="form.type" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="出版日期" :label-width="formLabelWidth" required>
          <el-input v-model="form.dateTime" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="form.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addLibrary">确 定</el-button>
        <el-button @click="close">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { apiPostLibrary, apiGetLibrary, apiGetLibraryOne } from '@/utils/http_url'
export default {
  name: 'Library',
  data () {
    return {
      title: '图书信息',
      searchMenu: {},
      tableData: [],
      diaTitle: '新增图书',
      dialogFormVisible: false,
      form: {},
      formLabelWidth: '100px'
    }
  },
  mounted () {
    this.getlist()
  },
  methods: {
    getlist () {
      apiGetLibrary().then(res => {
        this.tableData = res
      }).catch(e => {
        this.$message.warning(e.msg)
      })
    },
    search () {
      apiGetLibraryOne(this.form).then(res => {
        this.tableData = res
      }).catch(e => {
        this.$message.warning(e.msg)
      })
    },
    reset() {
      this.searchMenu = {}
    },
    opendia () {
      this.dialogFormVisible = true
    },
    addLibrary () {
      apiPostLibrary(this.form).then(res => {
        this.$message.success('添加成功！')
        this.dialogFormVisible = false
        this.form = {}
        this.getlist()
      }).catch(e => {
        this.$message.warning(e.msg)
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
.library {
  margin-top: 1%;
  margin-left: 1%;
}
</style>
