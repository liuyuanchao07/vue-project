<template>
  <!-- <div class="main">
    <h2>main</h2>
    <button @click="loginout">logout</button>
  </div> -->
  <div class="common-layout">
    <el-container class="main-container">
      <el-aside class="main-aside" :width="isCollapse ? '80px' : '210px'">
        <MainMenu :isCollapse="isCollapse" />
      </el-aside>
      <el-container>
        <el-header class="main-header">
          <MainHeader @fold-change="handleFoldChange" />
        </el-header>
        <el-main class="main-content">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import MainMenu from "../../components/main-menu.vue"
import MainHeader from "../../components/main-header.vue"

let isCollapse = ref<boolean>(false)

const handleFoldChange = (isFold: boolean) => {
  isCollapse.value = isFold
}
</script>

<style lang="less" scoped>
.common-layout {
  height: 100%;
}
.main-container {
  height: 100%;
}
.main-aside {
  background-color: #001529;
}
.main-header {
  background-color: #fff;
}
.main-content {
  background-color: #f0f0f0;
}
</style>
