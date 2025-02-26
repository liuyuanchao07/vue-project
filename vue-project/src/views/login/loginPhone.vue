<template>
  <div class="phone">
    <el-form ref="phoneFormRef" label-width="70px" :model="phoneRuleForm" :rules="rules">
      <el-form-item label="手机号" prop="phone">
        <el-input placeholder="请输入手机号" v-model.trim="phoneRuleForm.phone" />
      </el-form-item>
      <el-form-item label="验证码" prop="validateCode">
        <el-input placeholder="请输入验证码" v-model.trim="phoneRuleForm.validateCode">
          <template #append>
            <el-button @click="receiveValidateCode">{{ validateCode.validText }}</el-button>
          </template>
        </el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, defineExpose } from "vue"
import type { FormInstance, FormRules } from "element-plus"
import useLoginStore from "@/store/login"
import { getValidateCode } from "@/service/request"
import { ElLoading } from "element-plus"
const loginStore = useLoginStore()
const phoneFormRef = ref<FormInstance>()

interface phoneRuleForm {
  phone: string
  validateCode: string
}

const phoneRuleForm = reactive<phoneRuleForm>({
  phone: "",
  validateCode: "",
})

const validateCode = reactive<{
  validText: string
  time: number
  timer: null | number
}>({
  validText: "获取验证码",
  time: 60,
  timer: null,
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

const receiveValidateCode = () => {
  if (validateCode.timer) return false
  phoneFormRef.value.validateField("phone").then(() => {
    const loading = ElLoading.service({
      lock: true,
      text: "Loading",
      background: "rgba(0, 0, 0, 0.7)",
    })
    getValidateCode(phoneRuleForm.phone).then((result) => {
      phoneRuleForm.validateCode = result.data.data.code
    })
    loading.close()
    validateCode.timer = setInterval(() => {
      validateCode.time -= 1
      validateCode.validText = `剩余${validateCode.time}秒`
      if (validateCode.time === 0) {
        validateCode.time = 60
        validateCode.validText = "获取验证码"
        clearInterval(validateCode.timer)
        validateCode.timer = null
      }
    }, 1000)
  })
}

const loginPhone = () => {
  if (!phoneFormRef.value) return
  phoneFormRef.value.validate((valid) => {
    if (valid) {
      // 获取用户输入的用户名和密码
      const { phone, validateCode } = phoneRuleForm
      // 向服务器发送网络请求
      loginStore.phoneLoginAction(phone, validateCode)
    }
  })
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
