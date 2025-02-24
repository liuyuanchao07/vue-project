<template>
  <div class="menu">
    <div class="logo" v-show="!props.isCollapse">后台管理系统</div>
    <div class="menu">
      <el-menu
        background-color="#001529"
        class="el-menu-vertical-demo"
        default-active="110"
        text-color="#fff"
        :collapse="props.isCollapse"
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
import { useRouter } from "vue-router"
import useLoginStore from "@/store/login"

const router = useRouter()

// 定义props接收属性
const props = defineProps({
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
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 16px;
}

.el-menu {
  border-right: none;
  user-select: none;
}
</style>
