<template>
  <div class="header-container">
    <div class="header-left">
      <div class="header-icon" @click="collapseChange">
        <el-icon
          ><component :is="menu.isCollapse ? 'Expand' : 'Fold'"
        /></el-icon>
      </div>
      <ul class="header-menu">
        <li
          class="header-menu-item"
          :class="currentRoute.path === item.path ? 'active' : ''"
          v-for="(item, index) in menu.selectedMenu"
          :key="item.meta.id"
          @click="tagChange(item)"
        >
          <el-icon size="16"><component :is="item.meta.icon" /></el-icon>
          {{ item.meta.name }}
          <template v-if="menu.selectedMenu.length !== 1">
            <el-icon
              @click.stop="closeTag(index, item.path)"
              class="close-icon"
              size="16"
              ><Close
            /></el-icon>
          </template>
        </li>
      </ul>
    </div>
    <div class="header-right">
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-avatar
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          />
          <div class="username">Admin</div>
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>登出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import menuStore from "../store/menu";
const menu = menuStore();
const currentRoute = useRoute();
const router = useRouter();

const collapseChange = () => {
  menu.$patch({
    isCollapse: !menu.isCollapse,
  });
};

const tagChange = (item) => {
  router.push(item.path);
};

const closeTag = (index, path) => {
  if (menu.selectedMenu.length !== 1) {
    menu.closeTag(index);
  }

  // 删除的最后一项
  if (menu.selectedMenu.length === index) {
    // 而且还是当前项
    if (currentRoute.path === path) {
      router.push({
        path: menu.selectedMenu[index - 1].meta.path,
      });
    }
  } else {
    // 删除的不是最后一项
    // 如果是当前项
    if (currentRoute.path === path) {
      router.push({
        path: menu.selectedMenu[index].meta.path,
      });
    }
  }
};
</script>

<style lang="less" scoped>
.header-container {
  width: 100%;
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
}

.header-left,
.header-right {
  display: flex;
  height: 100%;
}

.header-right {
  align-items: center;
}

.header-icon {
  width: 60px;
  height: 100%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 1px solid #f5f5f5;
}

.el-dropdown-link {
  outline: none;
  display: flex;
  align-items: center;
}

.username {
  margin: 0 5px;
  font-size: 15px;
}

.header-menu {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
}
.header-menu-item {
  display: flex;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 30px 0 15px;
  font-size: 14px;
  cursor: pointer;
  position: relative;
  border-right: 1px solid #fff;

  &.active {
    background-color: #f5f5f5;
    color: #409eff;
  }
  &:hover {
    background-color: #f5f5f5;
    color: #409eff;

    .close-icon {
      display: block;
      color: #333;
    }
  }

  .el-icon {
    margin-right: 5px;
  }

  .close-icon {
    position: absolute;
    right: 3px;
    display: none;
  }
}
</style>
