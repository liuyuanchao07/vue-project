<template>
  <div class="login">
    <div class="login_containter">
      <h3 class="login_title">后台管理系统</h3>
      <div class="login_panel">
        <el-tabs type="border-card" stretch v-model="activePanel">
          <el-tab-pane name="account">
            <template #label>
              <span class="custom-tabs-label">
                <el-icon><UserFilled /></el-icon>
                <span>登录账号</span>
              </span>
            </template>
            <LoginAccount ref="accountRef" />
          </el-tab-pane>
          <el-tab-pane name="phone">
            <template #label>
              <span class="custom-tabs-label">
                <el-icon><Iphone /></el-icon>
                <span>手机登录</span>
              </span>
            </template>
            <LoginPhone ref="phoneRef" />
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="login_bottom">
        <el-checkbox v-model="rememberPassword">记住密码</el-checkbox>
        <el-link type="primary">忘记密码</el-link>
      </div>
      <el-button class="login_button" @click="handleLogin" type="primary">立即登录</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import LoginAccount from "@/views/login/loginAccount.vue"
import LoginPhone from "@/views/login/loginPhone.vue"
import { ref } from "vue"
const rememberPassword = ref<boolean>(false)
const activePanel = ref<string>("account")
const accountRef = ref<LoginAccount>()
const phoneRef = ref()

const handleLogin = () => {
  if (activePanel.value === "account") {
    console.log(accountRef.value.loginAccount())
  } else {
  }
}
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  &_containter {
    width: 350px;
  }

  &_title {
    margin-bottom: 20px;
    text-align: center;
  }

  &_panel {
    margin-bottom: 5px;

    .custom-tabs-label {
      display: flex;
      align-items: center;
    }

    .custom-tabs-label span {
      margin-left: 4px;
    }
  }

  &_bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
  }

  &_button {
    width: 100%;
    height: 40px;
  }
}
</style>
