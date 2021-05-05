<template>
  <div class="reservoir">
    <Title :title="title" />

    <!-- 搜索栏 -->
    <el-form :inline="true" :model="searchMenu" size="small" class="demo-form-inline" >
      <el-form-item label="库位编码">
        <el-input v-model="searchMenu.reservoirId" placeholder="请输入库位编号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="warning" icon="el-icon-search" size="small" @click="search">查询</el-button>
        <el-button icon="el-icon-refresh" @click="reset">重置</el-button>
      </el-form-item>
      <el-form-item style="float:right">
        <el-button type="danger" icon="el-icon-plus" size="small" @click="opendia">增加库位</el-button>
        <down-load style="margin-left: 30px"/>
      </el-form-item>
    </el-form>

    <!-- 表格 -->
    <el-table :data="tableData" id="table" :header-cell-style="{'color':'#333333','background-color':'#E5E8F8'}" style="width:99%;margin-top:20px;border-radius:10px;background:rgba(255,255,255,0.5)">
      <el-table-column prop="reservoirId" label="库位编码"></el-table-column>
      <el-table-column prop="reservoirKQId" label="库区编码"></el-table-column>
      <el-table-column prop="reservoirWareHouse" label="仓库编码"></el-table-column>
      <el-table-column prop="reservoirName" label="库位名称"></el-table-column>
      <el-table-column prop="reservoirKQName" label="库区名称"></el-table-column>
      <el-table-column prop="reservoirWareHouseName" label="仓库名称"></el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
    </el-table>

    <!-- 新增弹框 -->
    <el-dialog :title="diaTitle" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="库位编码" :label-width="formLabelWidth" required>
          <el-input v-model="form.reservoirId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="库区编码" :label-width="formLabelWidth" required>
          <el-input v-model="form.reservoirKQId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="仓库编码" :label-width="formLabelWidth" required>
          <el-input v-model="form.reservoirWareHouse" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="库位名称" :label-width="formLabelWidth" required>
          <el-input v-model="form.reservoirName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="库区名称" :label-width="formLabelWidth" required>
          <el-input v-model="form.reservoirKQName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="仓库名称" :label-width="formLabelWidth" required>
          <el-input v-model="form.reservoirWareHouseName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="form.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addReservoir">确 定</el-button>
        <el-button @click="close">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { apiPostReservoir, apiGetReservoir, apiGetReservoirOne } from '@/utils/http_url'
export default {
  name: 'reservoir',
  data () {
    return {
      title: '库位信息',
      searchMenu: {},
      tableData: [],
      diaTitle: '新增库位',
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
      apiGetReservoir().then(res => {
        this.tableData = res
      }).catch(e => {
        this.$message.warning(e.msg)
      })
    },
    search() {
      apiGetReservoirOne(this.searchMenu).then(res => {
        this.tableData = res
      }).catch(e => {
        this.$message.warning(e.msg)
      })
    },
    reset() {
      this.searchMenu = {}
      this.getlist()
    },
    opendia () {
      this.dialogFormVisible = true
    },
    addReservoir () {
      apiPostReservoir(this.form).then(res => {
        this.$message.success('新增成功!')
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
