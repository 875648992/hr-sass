<template>
  <el-dialog
    title="提示"
    :visible="dialogVisible"
    width="60%"
    @close="off"
  >
    <span>
      <el-form :model="form" label-width="100px">
        <el-form-item label="部门名称">
          <el-input v-model="form.name" placeholder="请输入部门名称" />
        </el-form-item>
        <el-form-item label="部门编码">
          <el-input v-model="form.name" placeholder="请输入部门编码" />
        </el-form-item>
        <el-form-item label="部门负责人">
          <el-select v-model="form.region" placeholder="请选择部门负责人">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="部门介绍">
          <el-input v-model="form.name" type="textarea" placeholder="请输入部门介绍" :rows="3" />
        </el-form-item>
      </el-form>
    </span>
    <span slot="footer" class="dialog-footer">
      <el-row type="flex" justify="center">
        <el-button size="small" @click="off">取 消</el-button>
        <el-button size="small" type="primary">确 定</el-button>
      </el-row>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    pid: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      form: {}
    }
  },
  methods: {
    off() {
      this.$emit('off')
    }
  }
}
</script>
<style lang="scss" scoped></style>
