<template>
  <div class="common-layout">
    <el-container>
      <el-aside :width="menu.isCollapse ? '70px' : '200px'">
        <Aside />
      </el-aside>
      <el-container>
        <el-header>
          <Header />
        </el-header>
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import Aside from "../../components/aside.vue";
import Header from "../../components/header.vue";

import { ref } from "vue";
import menuStore from "../../store/menu";
const menu = menuStore();
</script>

<style lang="less" scoped>
.el-header {
  padding-left: 0;
  border-bottom: 1px solid #f5f5f5;
}
</style>
