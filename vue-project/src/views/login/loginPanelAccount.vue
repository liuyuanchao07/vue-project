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
import useLoginStore from "@/store/login.ts"
const accountFromRef = ref<FormInstance>()
const loginStore = useLoginStore()
const accountForm = reactive({
  name: localStorage.getItem("name") ?? "",
  password: localStorage.getItem("password") ?? "",
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

const loginAction = (flag: boolean) => {
  accountFromRef.value.validate((valid) => {
    if (valid) {
      const { name, password } = accountForm
      loginStore.loginAccountAction({ name, password }).then(() => {
        // 判断是否记住密码(方法1 方法2是watch)
        // localStorage.setItem("loginFlag", String(flag))
        if (flag) {
          localStorage.setItem("name", name)
          localStorage.setItem("password", password)
        } else {
          localStorage.removeItem("name")
          localStorage.removeItem("password")
        }
      })
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
