<template>
  <el-dialog
    title="提示"
    :visible="dialogVisible"
    width="60%"
    @close="off"
  >
    <span>
      <el-form ref="form" :model="form" label-width="100px" :rules="rules">
        <el-form-item label="部门名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入部门名称" />
        </el-form-item>
        <el-form-item label="部门编码" prop="code">
          <el-input v-model="form.code" placeholder="请输入部门编码" />
        </el-form-item>
        <el-form-item label="部门负责人" prop="manager">
          <el-select v-model="form.manager" placeholder="请选择部门负责人" @focus="focus">
            <el-option v-for="item in employee" :key="item.id" :label="item.username" :value="item.username" />
          </el-select>
        </el-form-item>
        <el-form-item label="部门介绍" prop="introduce">
          <el-input v-model="form.introduce" type="textarea" placeholder="请输入部门介绍" :rows="3" />
        </el-form-item>
      </el-form>
    </span>
    <span slot="footer" class="dialog-footer">
      <el-row type="flex" justify="center">
        <el-button size="small" @click="off">取 消</el-button>
        <el-button size="small" type="primary" @click="onSubmit">确 定</el-button>
      </el-row>
    </span>
  </el-dialog>
</template>

<script>
import { getEmployee } from '@/api/employee'
import { addDepart, getDepart, updateDepart } from '@/api/departments'
export default {
  name: 'AddDepart',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    currentInfo: {
      type: Object,
      required: true
    }
  },
  data() {
    const validateName = async(rule, value, callback) => {
      const { depts } = await getDepart()
      let son = false
      if (this.form.id) {
        son = depts.filter(item => item.pid === this.currentInfo.pid)
      } else {
        son = depts.filter(item => item.pid === this.currentInfo.id)
      }
      const result = son.some(item => item.name === value)
      result ? callback(new Error(`部门 ${value} 已经存在`)) : callback()
    }
    const validateCode = async(rule, value, callback) => {
      const { depts } = await getDepart()
      if (this.currentInfo.code === value) return callback()
      const result = depts.some(item => item.code === value)
      result ? callback(new Error(`部门编码 ${value} 已经存在`)) : callback()
    }
    return {
      form: {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      },
      rules: {
        name: [
          { required: true, message: '部门名称不能为空', trigger: ['blur', 'change'] },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: ['blur', 'change'] },
          { validator: validateName, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '部门编码不能为空', trigger: ['blur', 'change'] },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: ['blur', 'change'] },
          { validator: validateCode, trigger: 'blur' }
        ],
        manager: [
          { required: true, message: '部门名称不能为空', trigger: 'change' }
        ],
        introduce: [
          { required: true, message: '部门名称不能为空', trigger: ['blur', 'change'] }
        ]
      },
      employee: []
    }
  },
  methods: {
    off() {
      this.$emit('update:dialogVisible', false)
      this.$refs.form.resetFields()
    },
    async focus() {
      const res = await getEmployee()
      this.employee = res
    },
    async onSubmit() {
      this.$refs.form.validate(vaild => {
        if (!vaild) return
      })
      if (this.form.id) {
        await updateDepart({
          ...this.form,
          id: this.currentInfo.id
        })
        this.$message.success('修改成功')
      } else {
        await addDepart({
          ...this.form,
          pid: this.currentInfo.id
        })
        this.$message.success('添加成功')
      }
      this.$emit('update:dialogVisible', false)
      this.$emit('applyList')
    }
  }
}
</script>
<style lang="scss" scoped></style>
