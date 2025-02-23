import { createRouter, createWebHistory } from "vue-router"

// 此方法可以判断当前环境是开发还是生产环境
console.log(import.meta.env.VITE_MODE)

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/login",
    },
    {
      path: "/login",
      component: () => import("../views/login/login.vue"),
    },
    {
      path: "/main/",
      component: () => import("../views/main/main.vue"),
      children: [
        {
          path: "/main/analysis/overview",
          component: () => import("../views/main/analysis/overview/index.vue"),
        },
        {
          path: "/main/analysis/dashboard",
          component: () => import("../views/main/analysis/dashboard/index.vue"),
        },
        {
          path: "/main/system/user",
          component: () => import("../views/main/system/user/index.vue"),
        },
        {
          path: "/main/system/role",
          component: () => import("../views/main/system/role/index.vue"),
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NoFound",
      component: () => import("../views/notFound/index.vue"),
    },
  ],
})

// 导航守卫
// to:跳转到的位置 from:从哪来
router.beforeEach((to) => {
  if (to.path !== "/login") {
    // 只有登录成功才可以进入到main页面
    if (!localStorage.getItem("token")) {
      return "/login"
    }
  }

  if (to.path === "/login") {
    if (localStorage.getItem("token")) {
      return "/main"
    }
  }
})

export default router
/*
  动态路由 根据用户的权限信息 动态的添加路由 （而不是一次性的注册所有的路由）

  第一种方式 基于角色动态路由管理
  但是有弊端：每增加一个角色都要增加key/value 所有最好由后端返回
  const role = {
    "superadmin": [所有的路由] => router.main.children
    "admin": [一部分路由] => router.main.children
    "service": [少部分路由] => router.main.children
  }

  第二种方式 把取得的动态菜单映射成动态路由
  常用
*/
