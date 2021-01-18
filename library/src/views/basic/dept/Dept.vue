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
              <el-table-column prop="_id" label="部门编号"></el-table-column>
              <el-table-column prop="deprName" label="部门名称"></el-table-column>
              <el-table-column prop="manage" label="部门经理"></el-table-column>
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
  </div>
</template>

<script>
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
      tableData: [{
        _id: '13246',
        deprName: '财务部',
        manage: '张三'
      }, {
        _id: '798846',
        deprName: '后勤部',
        manage: '李四'
      }]
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    /* 新增部门 */
    addDept () {
      alert('新增部门')
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
      alert('编辑')
    },
    handleDel (row) {
      alert('删除')
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
}
</style>
