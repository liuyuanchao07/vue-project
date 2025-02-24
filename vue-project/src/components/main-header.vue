<template>
  <div class="header">
    <div class="header_collapse" @click="collapseChange">
      <el-icon><component :is="collapse ? 'Expand' : 'Fold'" /></el-icon>
    </div>
    <div class="header_info">
      <div class="header_icon">
        <el-icon size="16"><Bell /></el-icon>
        <el-icon size="16"><ChatDotRound /></el-icon>
        <el-icon size="16"><Postcard /></el-icon>
      </div>
      <div class="header_avatar">
        <el-avatar
          :size="30"
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        />
      </div>
      <el-dropdown @command="handleLogout">
        <span class="el-dropdown-link">
          {{ loginStore.user }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="logout">
              <el-icon size="16"><CircleClose /></el-icon>
              <span>退出系统</span></el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from "vue"
import { useRouter } from "vue-router"
import useLoginStore from "@/store/login"
const loginStore = useLoginStore()
const router = useRouter()
const collapse = ref<boolean>(false)

const emit = defineEmits(["changeCollapse"])

const handleLogout = (command: string) => {
  if (command === "logout") {
    localStorage.removeItem("token")
    localStorage.removeItem("id")
    localStorage.removeItem("user")
    localStorage.removeItem("userMenus")
    router.push("/login")
  }
}

const collapseChange = () => {
  collapse.value = !collapse.value
  emit("changeCollapse", collapse.value)
}
</script>

<style lang="less" scoped>
.header {
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;

  &_info {
    display: flex;
    align-items: center;
  }

  &_collapse {
    line-height: 0;
    cursor: pointer;
  }

  &_icon {
    .el-icon {
      margin-right: 10px;
    }
  }

  &_avatar {
    margin-right: 5px;
  }

  .el-dropdown-link {
    outline: none;
  }
}
</style>
