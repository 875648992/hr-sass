<template>
  <el-row type="flex" justify="space-between" align="middle" style="width:100%">
    <el-col :span="20">
      <span>{{ nodeData.name }}</span>
    </el-col>
    <el-col :span="4">
      <el-row type="flex" justify="space-between">
        <el-col :span="12">{{ nodeData.manager }}</el-col>
        <el-col :span="12">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link" @click.stop.prevent>
              操作<i class="el-icon-arrow-down el-icon--right" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add">添加部门</el-dropdown-item>
              <el-dropdown-item v-if="show" command="view">编辑部门</el-dropdown-item>
              <el-dropdown-item v-if="show" command="del">删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { delDepart } from '@/api/departments'
export default {
  name: 'Treeitem',
  props: {
    show: {
      type: Boolean,
      default: true
    },
    nodeData: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleCommand(v) {
      if (v === 'add') {
        this.add()
      } else if (v === 'view') {
        this.view()
      } else {
        this.del()
      }
    },
    add() {
      this.$emit('add', this.nodeData)
    },
    view() {
      this.$emit('edit', this.nodeData)
    },
    async del() {
      await delDepart(this.nodeData)
      this.$emit('del')
      this.$message.success('删除成功')
    }
  }
}
</script>
<style >
.el-icon-caret-right:before {
    content: "\e723";
}
.el-tree-node__expand-icon.expanded {
    transform: rotate(0deg);
}
.el-tree-node__expand-icon.expanded::before {
     content: "\e722";
}
.el-tree-node__expand-icon.is-leaf {
    color: #c0c4cc;
    cursor: default;
}
.el-tree-node__expand-icon.is-leaf::before {
     content: "\e6e3";
    color: #c0c4cc;
    cursor: default;
}
</style>
