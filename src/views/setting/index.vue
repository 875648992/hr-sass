<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs v-model="activeName">
          <el-button size="small" type="primary" class="add">+ 新建角色</el-button>
          <el-tab-pane label="用户管理" name="first">
            <el-table :data="tableData" style="width: 100%" border>
              <el-table-column type="index" label="序号" width="100px" />
              <el-table-column prop="name" label="角色名" />
              <el-table-column prop="description" label="描述" />
              <el-table-column prop="date" label="操作">
                <el-button size="small" type="success">分配权限</el-button>
                <el-button size="small" type="primary">编辑</el-button>
                <el-button size="small" type="danger">删除</el-button>
              </el-table-column>
            </el-table>
            <el-row type="flex" justify="end">
              <el-pagination
                :current-page="page"
                :page-size="pagesize"
                layout="total, prev, pager, next"
                :total="total"
                @current-change="handleCurrentChange"
              />
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getRole } from '@/api/setting'
export default {
  name: 'Setting',
  data() {
    return {
      activeName: 'first',
      tableData: [],
      page: 1,
      pagesize: 2,
      total: 10
    }
  },
  created() {
    this.getRole()
  },
  methods: {
    async getRole() {
      const { rows, total } = await getRole(this.page, this.pagesize)
      this.tableData = rows
      this.total = total
    },
    async handleCurrentChange(v) {
      this.page = v
      const res = await this.getRole()
      console.log(res)
    }
  }
}
</script>

<style>
.add{
  margin-top: 30px;
  margin-bottom: 20px;
}
</style>
