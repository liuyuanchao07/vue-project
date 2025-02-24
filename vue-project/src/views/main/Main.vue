<template>
  <div class="main_layout">
    <el-container class="main_container">
      <el-aside class="main_aside" :width="isCollapse ? '70px' : '160px'">
        <MainMenu :isCollapse="isCollapse" />
      </el-aside>
      <el-container>
        <el-header class="main_header">
          <MainHeader @changeCollapse="changeCollapse" />
        </el-header>
        <el-main class="main_content">
          1111
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import MainMenu from "@/components/main-menu.vue"
import MainHeader from "@/components//main-header.vue"

const isCollapse = ref<boolean>(false)

const changeCollapse = (status) => {
  isCollapse.value = status
}
</script>

<style lang="less" scoped>
.main {
  &_layout {
    height: 100%;
  }

  &_container {
    height: 100%;
  }

  &_aside {
    background-color: #001529;
  }

  &_header {
    background-color: #fff;
    height: 45px;
  }

  &_content {
    background-color: #f0f0f0;
  }
}
</style>
