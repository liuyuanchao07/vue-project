<template>
  <div class="account">
    <el-form label-width="70px" :model="accountRuleForm" :rules="rules">
      <el-form-item label="用户名" prop="username">
        <el-input placeholder="请输入用户名" v-model="accountRuleForm.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          placeholder="请输入密码"
          v-model="accountRuleForm.password"
          show-password
          type="password"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, defineExpose } from "vue"
import type { FormRules } from "element-plus"

interface accountRuleForm {
  username: string
  password: string
}

const accountRuleForm = reactive<accountRuleForm>({
  username: "",
  password: "",
})

const rules = reactive<FormRules<accountRuleForm>>({
  username: [{ required: true, message: "请输入用户名", trigger: "change" }],
  password: [
    { required: true, message: "请输入用户名", trigger: "change" },
    { min: 8, max: 11, message: "密码长度为8-11位", trigger: "change" },
  ],
})

const loginAccount = () => {
  console.log(1111)
}

defineExpose({
  loginAccount,
})
</script>

<style lang="less" scoped></style>
