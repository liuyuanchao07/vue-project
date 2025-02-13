<template>
  <div class="panel-account">
    <el-form
      ref="accountFromRef"
      :label-position="labelPosition"
      :model="accountForm"
      :rules="accountRules"
      size="large"
    >
      <el-form-item label="账号" prop="name">
        <el-input v-model="accountForm.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input show-password v-model="accountForm.password" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue"
import type { FormInstance, FormRules } from "element-plus"
import { ElMessage } from "element-plus"
const accountFromRef = ref<FormInstance>()
const accountForm = reactive({
  name: "",
  password: "",
})

interface RuleForm {
  name: string
  password: string
}

const accountRules = reactive<FormRules<RuleForm>>({
  name: [
    { required: true, message: "账号不能为空", trigger: "change" },
    { min: 3, max: 10, message: "账号输入的不对", trigger: "change" },
  ],
  password: [
    { required: true, message: "密码不能为空", trigger: "change" },
    { min: 3, max: 10, message: "密码输入的不对", trigger: "change" },
  ],
})

const loginAction = () => {
  accountFromRef.value.validate((valid) => {
    if (valid) {
      console.log("ok")
    } else {
      ElMessage.error({
        message: "Oops, this is a error message.",
        duration: 1000,
      })
    }
  })
}

defineExpose({
  loginAction,
})
</script>
