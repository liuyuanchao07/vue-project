<template>
  <div class="aside-container">
    <div class="aside-logo">
      {{ menuState.isCollapse ? "陪诊" : "陪诊管理系统" }}
    </div>
    <div class="aside-menu">
      <Menu :menu="menu" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Menu from "./menu.vue";
import menuStore from "../store/menu";
import { useRouter } from "vue-router";
import { reactive } from "vue";
const router = useRouter();
const menu = reactive(router.options.routes[0].children);
const menuState = menuStore();
</script>

<style lang="less" scoped>
.aside {
  &-container {
    background-color: #545c64;
    height: 100vh;
  }

  &-logo {
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    color: #fff;
  }

  &-menu {
    .el-menu {
      border-right: none;
    }
  }
}
</style>
