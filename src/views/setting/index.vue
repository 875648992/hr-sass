<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs v-model="activeName">
          <el-tab-pane label="角色管理" name="first">
            <el-button size="small" type="primary" class="add" @click="dialogVisible = true">+新增角色</el-button>
            <!-- 表格 -->
            <el-table :data="roleTable" style="width: 100%" border>
              <el-table-column type="index" prop="date" label="序号" width="180" />
              <el-table-column prop="name" label="角色名" width="180" />
              <el-table-column prop="description" label="描述" />
              <el-table-column align="center" prop="address" label="操作">
                <template v-slot="{ row }">
                  <el-button size="small" type="success">分配权限</el-button>
                  <el-button size="small" type="primary" @click="edit(row.id)">编辑</el-button>
                  <el-button size="small" type="danger" @click="del(row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="公司信息" name="second">公司信息</el-tab-pane>
        </el-tabs>
        <el-row type="flex" justify="end">
          <el-pagination
            :current-page="page"
            :page-size="pageSize"
            layout="total, prev, pager, next"
            :total="total"
            @current-change="handleCurrentChange"
          />
        </el-row>
      </el-card>
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="40%"
        @close="close"
      >
        <el-form ref="form" :model="form" :rules="rules" label-width="100px">
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="form.name" placeholder="请输入角色名称" />
          </el-form-item>
          <el-form-item label="角色描述" prop="description">
            <el-input v-model="form.description" placeholder="请输入角色描述" />
          </el-form-item>
        </el-form>
        <template #footer>
          <el-row type="flex" justify="center">
            <span class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="onSubmit">确 定</el-button>
            </span>
          </el-row>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getAllRole, addRole, updateRole, getCurrentRole, delRole } from '@/api/setting'
export default {
  name: 'Setting',
  data() {
    return {
      activeName: 'first',
      roleTable: [],
      page: 1,
      pageSize: 2,
      total: 10,
      dialogVisible: false,
      form: {
        name: '',
        description: ''
      },
      rules: {
        name: [
          { required: true, message: '名称不能为空', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '描述不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    async getRoleList() {
      const { rows, total } = await getAllRole(this.page, this.pageSize)
      this.roleTable = rows
      this.total = total
    },
    handleCurrentChange(value) {
      this.page = value
      this.getRoleList()
    },
    async onSubmit() {
      try {
        await this.$refs.form.validate()
      } catch {
        return
      }
      if (this.form.id) {
        await updateRole(this.form)
        this.$message.success('修改成功')
      } else {
        await addRole(this.form)
        this.total++
        this.page = Math.ceil(this.total / this.pageSize)
        this.$message.success('添加成功')
      }
      this.getRoleList()
      this.dialogVisible = false
    },
    close() {
      this.$refs.form.resetFields()
      this.form = {
        name: '',
        description: ''
      }
    },
    async edit(id) {
      this.dialogVisible = true
      this.form = await getCurrentRole(id)
    },
    async del(id) {
      try {
        await this.$confirm('确定删除吗?', '温馨提示', {
          type: 'warning'
        })
      } catch {
        return
      }
      await delRole(id)
      if (this.roleTable.length === 1) this.page--
      this.$message.success('删除成功')
      this.getRoleList()
    }
  }
}
</script>

<style>
.el-tabs__header {
  margin-bottom: 40px;
}
.add{
  margin-bottom: 20px;
}
.has-gutter{
  background-color: #fafafa;
}
</style>
