<template>
  <div class="phone">
    <el-form label-width="70px" :model="phoneRuleForm" :rules="rules">
      <el-form-item label="手机号" prop="phone">
        <el-input placeholder="请输入手机号" v-model="phoneRuleForm.phone" />
      </el-form-item>
      <el-form-item label="验证码" prop="validateCode">
        <el-input placeholder="请输入验证码" v-model="phoneRuleForm.validateCode">
          <template #append>
            <el-button>验证码</el-button>
          </template>
        </el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, defineExpose } from "vue"
import type { FormRules } from "element-plus"

interface phoneRuleForm {
  phone: string
  validateCode: string
}

const phoneRuleForm = reactive<phoneRuleForm>({
  phone: "",
  validateCode: "",
})

const rules = reactive<FormRules<phoneRuleForm>>({
  phone: [
    {
      required: true,
      pattern: /^1[3-9]\d{9}$/,
      message: "请正确输入11位数字手机号",
      trigger: "change",
    },
  ],
  validateCode: [
    {
      required: true,
      pattern: /^\d{4}$/,
      message: "请输入4位手机验证码",
      trigger: "change",
    },
  ],
})

const loginPhone = () => {
  console.log(222)
}

defineExpose({
  loginPhone,
})
</script>

<style lang="less" scoped>
.phone {
  &_validate {
    display: inline-block;
    margin: 0 -20px;
  }
}
</style>
