<template>
  <div class="header">
    <div class="header_left">
      <div class="header_collapse" @click="collapseChange">
        <el-icon><component :is="collapse ? 'Expand' : 'Fold'" /></el-icon>
      </div>
      <Breadcrumb :breadcrumb="breadcrumb" />
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
import Breadcrumb from "@/components/main-breadcrumb.vue"
import { ref, watch, defineEmits } from "vue"
import { useRouter, useRoute } from "vue-router"
import useLoginStore from "@/store/login"
const loginStore = useLoginStore()
const router = useRouter()
const route = useRoute()
const collapse = ref<boolean>(false)

const breadcrumb = ref([])

const emit = defineEmits(["changeCollapse"])

const handleLogout = (command: string) => {
  if (command === "logout") {
    localStorage.removeItem("token")
    localStorage.removeItem("id")
    localStorage.removeItem("user")
    localStorage.removeItem("userMenus")
    localStorage.removeItem("activeMenuId")
    router.push("/login")
  }
}

const collapseChange = () => {
  collapse.value = !collapse.value
  emit("changeCollapse", collapse.value)
}

watch(
  route,
  (val) => {
    // 记录当前选择的侧边栏的Id以及面包屑导航
    let activeMenuId = ""
    const breadcrumbList = []
    loginStore.userMenus.forEach((item) => {
      if (item.children) {
        item.children.forEach((child) => {
          if (val.path === child.url) {
            activeMenuId = child.id
            breadcrumbList.push({
              name: item.name,
              url: item.children[0].url,
            })
            breadcrumbList.push({
              name: child.name,
            })
          }
        })
      } else {
        if (val.path === item.url) {
          activeMenuId = item.id
          breadcrumbList.push({
            name: item.name,
          })
        }
      }
    })
    loginStore.setActiveMenuId(String(activeMenuId))
    breadcrumb.value = breadcrumbList
  },
  {
    immediate: true,
  },
)
</script>

<style lang="less" scoped>
.header {
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;

  &_left {
    display: flex;
    align-items: center;
  }

  &_info {
    display: flex;
    align-items: center;
  }

  &_collapse {
    line-height: 0;
    cursor: pointer;
    margin-right: 15px;
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
