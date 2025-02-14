<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <div class="panel-main">
      <el-tabs v-model="activeName" stretch="true" type="border-card">
        <el-tab-pane name="account">
          <template #label>
            <div class="label">
              <span class="icon"
                ><el-icon><Avatar /></el-icon
              ></span>
              <span class="text">账号登录</span>
            </div>
          </template>
          <PanelAccount ref="accountRef" />
        </el-tab-pane>
        <el-tab-pane name="phone">
          <template #label>
            <div class="label">
              <span class="icon"
                ><el-icon><Iphone /></el-icon
              ></span>
              <span class="text">手机登录</span>
            </div>
          </template>
          <PanelPhone />
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="control">
      <el-checkbox v-model="remember" @change="handleCheckState">记住密码</el-checkbox>
      <el-link :underline="false" type="primary">忘记密码</el-link>
    </div>
    <el-button class="login-button" size="large" type="primary" @click="handleLogin"
      >立即登录</el-button
    >
  </div>
</template>

<script setup lang="ts">
import PanelAccount from "./PanelAccount.vue"
import PanelPhone from "./PanelPhone.vue"
import { ref, watch } from "vue"
import { throttle } from "lodash"
const remember = ref<boolean>(Boolean(localStorage.getItem("loginFlag") === "false" ? false : true))
const activeName = ref<string>("account")
const accountRef = ref<InstanceType<typeof PanelAccount>>() // 取得组件的实例 固定写法

// 判断是否记住密码(方法2)
watch(remember, (newVal) => {
  localStorage.setItem("loginFlag", String(newVal))
})

const handleLogin = throttle(() => {
  if (activeName.value === "account") {
    // 1. 获取子组件的实例
    // 2. 调用子组件的方法
    accountRef.value.loginAction(remember.value)
  } else {
  }
}, 1000)
</script>

<style lang="less" scoped>
.login-panel {
  width: 330px;
}

.title {
  margin-bottom: 15px;
  text-align: center;
}

.control {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.panel-main {
  margin-bottom: 10px;
}

.login-button {
  width: 100%;
}

.label {
  display: flex;
  align-items: center;
}

.icon {
  margin-right: 5px;
  margin-top: 3px;
}
</style>
