<template>
  <el-button @click="logout">推出登录</el-button>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router"
const router = useRouter()

const logout = () => {
  localStorage.removeItem("token")
  localStorage.removeItem("id")
  localStorage.removeItem("user")
  router.push("/login")
}
</script>

<style lang="less" scoped></style>
