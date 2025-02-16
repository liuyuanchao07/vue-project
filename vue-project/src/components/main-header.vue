<template>
  <div class="main-header">
    <div class="menu-icon" @click="menuIconClick">
      <template v-if="openClose">
        <el-icon size="20px"><Expand /></el-icon>
      </template>
      <template v-else>
        <el-icon size="20px"><Fold /></el-icon>
      </template>
    </div>
    <div class="content">
      <div class="breadcrumb">面包屑</div>
      <div class="info">
        <div class="operation">
          <el-icon size="18"><Memo /></el-icon>
          <el-icon size="18"><ChatDotSquare /></el-icon>
          <el-icon size="18"><Aim /></el-icon>
        </div>
        <div class="user-info">
          <el-dropdown>
            <span class="el-dropdown-link">
              <el-avatar
                :size="30"
                src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
              />
              <span class="name">coderwhy</span>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="exitSystem">退出系统</el-dropdown-item>
                <el-dropdown-item divided>个人信息</el-dropdown-item>
                <el-dropdown-item>修改密码</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import router from "../router"
const openClose = ref<boolean>(false)

// 声明事件
const emit = defineEmits(["foldChange"])

const menuIconClick = () => {
  // 内部改变状态
  openClose.value = !openClose.value
  // 将事件和状态传递给父组件
  // 发射事件
  emit("foldChange", openClose.value)
}

const exitSystem = () => {
  router.push("/login")
  localStorage.removeItem("token")
  localStorage.removeItem("userMenus")
}
</script>

<style lang="less" scoped>
.main-header {
  display: flex;
  align-items: center;
  flex: 1;
  font-size: 16px;
  height: 100%;
}
.menu-icon {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  padding: 0 18px;
}
.info {
  display: flex;
  align-items: center;
}
.user-info {
  margin-left: 10px;
}
.el-dropdown-link {
  outline: none;
  display: flex;
  align-items: center;
}
.operation .el-icon {
  margin: 0 5px;
}
.name {
  margin-left: 10px;
}
</style>
