<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <tree-item :node-data="company" :show="true" />
        <hr>
        <!-- 树菜单 -->
        <el-tree
          :data="nodeData"
          default-expand-all
          :expand-on-click-node="true"
        >
          <template v-slot="{ data }">
            <!-- {{ data }} -->
            <tree-item :node-data="data" @del="getDepaetList" @add="add" @edit="edit" />
          </template>
        </el-tree>
      </el-card>
      <add-depart ref="add" :dialog-visible.sync="dialogVisible" :current-info="currentInfo" @applyList="getDepaetList" />
    </div>
  </div>
</template>

<script>
import { getDepart, queryDepart } from '@/api/departments'
import treeItem from './components/treeItem.vue'
import { changeTreeData } from '@/utils'
import AddDepart from './components/addDepart.vue'
export default {
  name: 'Depart',
  components: { treeItem, AddDepart },
  data() {
    return {
      nodeData: [],
      company: {
        name: '江苏传智播客',
        manager: '负责人'
      },
      dialogVisible: false,
      currentInfo: {}
    }
  },
  created() {
    this.getDepaetList()
  },
  methods: {
    async getDepaetList() {
      const res = await getDepart()
      const { depts, companyName } = res
      this.nodeData = changeTreeData(depts)
      this.company.name = companyName
    },
    add(v) {
      console.log(v)
      this.currentInfo = v
      this.dialogVisible = true
    },
    async edit(v) {
      this.currentInfo = await queryDepart(v.id)
      this.dialogVisible = true
      this.$refs.add.form = v
    }
  }
}
</script>

<style>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>
