<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools>
        <template #left>
          <span>本月: 社保在缴 公积金在缴</span>
        </template>
        <template #right>
          <el-button type="warning" size="small">导入</el-button>
          <el-button type="danger" size="small">导出</el-button>
          <el-button type="primary" size="small" icon="el-icon-plus">新增员工</el-button>
        </template>
      </page-tools>
      <el-card>
        <el-table :data="tableList" border>
          <el-table-column align="center" label="序号" type="index" :index="indexMethods" sortable />
          <el-table-column align="center" prop="username" label="姓名" sortable />
          <el-table-column align="center" prop="workNumber" label="工号" sortable />
          <el-table-column align="center" prop="formOfEmployment" :formatter="formatter" label="聘用形式" sortable />
          <el-table-column align="center" prop="departmentName" label="部门" sortable />
          <el-table-column align="center" label="入职时间" sortable>
            <template v-slot="{ row }">
              {{ row.timeOfEntry | formatTime }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="账户状态" sortable>
            <template v-slot="{ row }">
              <el-switch
                :value="row.enableState === 1"
                active-color="#13ce66"
                inactive-color="#ff4949"
              />
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable width="280">
            <template v-slot="{ row }">
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small" @click="del(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row type="flex" justify="end" align="middle" style="height: 60px">
          <el-pagination
            layout="total, prev, pager, next"
            :total="total"
            background
            :current-page="page"
            :page-size="pageSize"
            @current-change="handleCurrentChange"
          />
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getEmployeeList, delEmployee } from '@/api/employee'
import employees from '@/api/constant/employees'
export default {
  name: 'Employees',
  data() {
    return {
      tableList: [],
      total: 10,
      page: 1,
      pageSize: 5
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      const { total, rows } = await getEmployeeList(this.page, this.pageSize)
      this.total = total
      this.tableList = rows
    },
    indexMethods(index) {
      return (this.page - 1) * this.pageSize + index + 1
    },
    handleCurrentChange(value) {
      this.page = value
      this.getList()
    },
    formatter(row, column, cellValue, index) {
      const obj = employees.hireType.find(item => item.id === cellValue)
      return obj.value
    },
    async del(id) {
      try {
        await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          type: 'warning'
        })
      } catch {
        return
      }
      await delEmployee(id)
      this.$message.success('删除成功')
      if (this.tableList.length === 1) this.page--
      this.getList()
    }
  }
}
</script>

<style></style>
