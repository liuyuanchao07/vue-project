<template>
  <el-dialog center width="400" title="新建用户" v-model="modelState" @closed="closeModel">
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="80px">
      <el-form-item label="用户名" prop="name" placeholder="请输入用户名">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="真实姓名" prop="realname" placeholder="请输入真实姓名">
        <el-input v-model="ruleForm.realname" />
      </el-form-item>
      <el-form-item v-if="isNewRecord" label="密码" prop="password" placeholder="请输入密码">
        <el-input v-model="ruleForm.password" />
      </el-form-item>
      <el-form-item label="电话号码" prop="cellphone" placeholder="请输入电话号码">
        <el-input v-model="ruleForm.cellphone" />
      </el-form-item>
      <el-form-item label="选择角色" prop="roleId">
        <el-select v-model="ruleForm.roleId" placeholder="请选择一个角色">
          <el-option
            v-for="item in roleList"
            :label="item.label"
            :value="item.value"
            :key="item.label"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="选择部门" prop="department">
        <el-select v-model="ruleForm.departmentId" placeholder="请选择一个部门">
          <el-option
            v-for="item in departmenetList"
            :label="item.label"
            :value="item.value"
            :key="item.label"
          />
        </el-select>
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
import { defineExpose, ref, reactive, onMounted } from "vue"
import type { FormInstance, FormRules } from "element-plus"
import { getRoleList, getDepartmentList } from "@/service/request"

const modelState = ref(false)
const ruleFormRef = ref<FormInstance>()
const isNewRecord = ref(false)
const roleList = ref([])
const departmenetList = ref([])

interface RuleForm {
  name: string
  realname: string
  password: string
  cellphone: string
  roleId: string
  departmentId: string
}

const ruleForm = reactive<RuleForm>({
  name: "",
  realname: "",
  password: "",
  cellphone: "",
  roleId: "",
  departmentId: "",
})

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
  modelState.value = false
  ruleFormRef.value.resetFields()
  for (const key in ruleForm) {
    ruleForm[key] = ""
  }
}

onMounted(async () => {
  const roleListResult = await getRoleList()
  const departmentListResult = await getDepartmentList()
  roleList.value = roleListResult.data.data
  departmenetList.value = departmentListResult.data.data
})

defineExpose({
  changeModelState,
})
</script>

<style lang="less" scoped>
:global(.el-dialog__header.show-close) {
  padding-right: 0;
}
</style>
