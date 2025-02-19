<template>
  <el-menu
    background-color="#545c64"
    class="el-menu-vertical-demo"
    default-active="1"
    text-color="#fff"
    :collapse="menuState.isCollapse"
  >
    <template v-for="item in menu">
      <template v-if="!item.children || item.children.length === 0">
        <el-menu-item
          @click="handleClick(item)"
          v-if="!item.children || item.children.length === 0"
          :index="item.meta.id"
          :key="item.meta.id"
        >
          <el-icon size="20"><component :is="item.meta.icon" /></el-icon>
          <span>{{ item.meta.name }}</span>
        </el-menu-item>
      </template>
      <template v-else>
        <el-sub-menu :index="item.meta.id" :key="item.meta.id">
          <template #title>
            <el-icon size="20"><component :is="item.meta.icon" /></el-icon>
            <span>{{ item.meta.name }}</span>
          </template>
          <el-menu-item
            @click="handleClick(child)"
            v-for="child in item.children"
            :index="child.meta.id"
            :key="child.meta.id"
          >
            <el-icon size="20"><component :is="child.meta.icon" /></el-icon>
            <span>{{ child.meta.name }}</span>
          </el-menu-item>
        </el-sub-menu>
      </template>
    </template>
  </el-menu>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { useRouter } from "vue-router";
import menuStore from "../store/menu";
const menuState = menuStore();
const { menu } = defineProps(["menu"]);

const router = useRouter();

const handleClick = (item) => {
  router.push(item.meta.path);
  menuState.addSelectedMenu(item);
};
</script>

<style lang="less" scoped></style>
