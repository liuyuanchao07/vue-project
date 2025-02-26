<template>
  <div class="account">
    <el-form ref="accountFormRef" label-width="70px" :model="accountRuleForm" :rules="rules">
      <el-form-item label="用户名" prop="username">
        <el-input placeholder="请输入用户名" v-model.trim="accountRuleForm.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          placeholder="请输入密码"
          v-model.trim="accountRuleForm.password"
          show-password
          type="password"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, defineExpose } from "vue"
import type { FormInstance, FormRules } from "element-plus"
import useLoginStore from "@/store/login"
const loginStore = useLoginStore()
const accountFormRef = ref<FormInstance>()

interface accountRuleForm {
  username: string
  password: string
}

const accountRuleForm = reactive<accountRuleForm>({
  username: localStorage.getItem("username") ?? "",
  password: localStorage.getItem("password") ?? "",
})

const rules = reactive<FormRules<accountRuleForm>>({
  username: [{ required: true, message: "请输入用户名", trigger: "change" }],
  password: [
    { required: true, message: "请输入用户名", trigger: "change" },
    { min: 8, max: 11, message: "密码长度为8-11位", trigger: "change" },
  ],
})

const loginAccount = (rememberPassword) => {
  if (!accountFormRef.value) return
  accountFormRef.value.validate((valid) => {
    if (valid) {
      // 获取用户输入的用户名和密码
      const { username, password } = accountRuleForm
      // 向服务器发送网络请求并且携带账号密码
      loginStore.accountLoginAction(username, password).then(() => {
        if (rememberPassword) {
          localStorage.setItem("username", accountRuleForm.username)
          localStorage.setItem("password", accountRuleForm.password)
          localStorage.setItem("rememberPassword", rememberPassword)
        } else {
          localStorage.removeItem("username")
          localStorage.removeItem("password")
          localStorage.removeItem("rememberPassword")
        }
      })
    }
  })
}

defineExpose({
  loginAccount,
  accountRuleForm,
})
</script>

<style lang="less" scoped></style>
