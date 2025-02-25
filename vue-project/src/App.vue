<script setup lang="ts">
import { ref } from "vue"
import { ElConfigProvider } from "element-plus"
import zhCn from "element-plus/dist/locale/zh-cn.mjs"
const locale = ref(zhCn)
</script>

<template>
  <div class="app">
    <el-config-provider :locale="locale">
      <RouterView />
    </el-config-provider>
  </div>
</template>

<style scoped>
.app {
  width: 100vw;
  height: 100vh;
  background-color: #fff;
}
</style>
