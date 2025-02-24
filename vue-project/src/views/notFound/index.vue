<template>
  <div class="notfound">
    <el-result icon="info" title="404 找不到该画面">
      <template #sub-title>
        <p>您请求的页面无法找到 请点击按钮返回首页</p>
      </template>
      <template #extra>
        <el-button @click="returnHomePage">返回首页</el-button>
      </template>
    </el-result>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router"
const router = useRouter()

const returnHomePage = () => {
  router.push("/main")
}
</script>

<style lang="less" scoped>
.notfound {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
