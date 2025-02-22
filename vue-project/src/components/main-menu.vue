<template>
  <div class="main-menu">
    <div class="logo">LOGO</div>
    <div class="menu">
      <el-menu
        background-color="transparent"
        class="el-menu-vertical-demo"
        default-active="110"
        text-color="#fff"
        :collapse="isCollapse"
      >
        <el-sub-menu :index="String(item.id)" v-for="item in loginStore.userMenus" :key="item.id">
          <template #title>
            <el-icon><component :is="item.icon.split('el-icon')[1]" /></el-icon>
            <span>{{ item.name }}</span>
          </template>
          <template v-if="`children` in item">
            <el-menu-item
              @click="handleMenuClick(subItem)"
              :index="String(subItem.id)"
              v-for="subItem in item.children"
              :key="`${subItem.parentId}-${subItem.id}`"
              >{{ subItem.name }}</el-menu-item
            >
          </template>
        </el-sub-menu>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from "../router"
import useLoginStore from "@/store/login.ts"
// 定义props接收属性
defineProps({
  isCollapse: {
    type: Boolean,
    default: false,
  },
})
const loginStore = useLoginStore()

const handleMenuClick = (item) => {
  router.push(item.url)
}
</script>

<style lang="less" scoped>
.logo {
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
}

.el-menu {
  border-right: none;
  user-select: none;
}
</style>
