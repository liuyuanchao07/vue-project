<template>
  <el-dialog center width="400" title="新建用户" v-model="modelState" @close="closeModel">
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="80px">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="真实姓名" prop="realname">
        <el-input v-model="ruleForm.realname" />
      </el-form-item>
      <el-form-item v-if="isNewRecord" label="密码" prop="password">
        <el-input v-model="ruleForm.password" />
      </el-form-item>
      <el-form-item label="电话号码" prop="cellphone">
        <el-input v-model="ruleForm.cellphone" />
      </el-form-item>
      <el-form-item label="选择角色" prop="role">
        <el-input v-model="ruleForm.role" />
      </el-form-item>
      <el-form-item label="选择部门" prop="department">
        <el-input v-model="ruleForm.department" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeModel">取消</el-button>
        <el-button type="primary">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { defineExpose, ref, reactive } from "vue"
import type { FormInstance, FormRules } from "element-plus"

const modelState = ref(false)
const ruleFormRef = ref<FormInstance>()

interface RuleForm {
  name: string
  realname: string
  password: string
  cellphone: string
  role: string
  department: string
}

const ruleForm = reactive<RuleForm>({
  name: "",
  realname: "",
  password: "",
  cellphone: "",
  role: "",
  department: "",
})

const isNewRecord = ref(false)

const rules = reactive<FormRules<RuleForm>>({
  realname: [{ required: true, message: "请输入真实姓名", trigger: "change" }],
})

const changeModelState = (record) => {
  modelState.value = true

  if (record) {
    isNewRecord.value = false
    for (const key in record) {
      if (key in ruleForm) {
        ruleForm[key] = record[key]
      }
    }
  } else {
    isNewRecord.value = true
  }
}

const closeModel = () => {
  ruleFormRef.value.resetFields()
  for (const key in ruleForm) {
    ruleForm[key] = ""
  }
  modelState.value = false
}

defineExpose({
  changeModelState,
})
</script>

<style lang="less" scoped>
:global(.el-dialog__header.show-close) {
  padding-right: 0;
}
</style>
