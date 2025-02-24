import { createRouter, createWebHistory } from "vue-router"
import { addRoutesfromMenu } from "@/utils"
import { firstMenu } from "@/utils/index"

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
      component: () => import("@/views/login/login.vue"),
    },
    {
      path: "/main",
      name: "main",
      component: () => import("@/views/main/main.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NoFound",
      component: () => import("@/views/notFound/index.vue"),
    },
  ],
})

// 导航守卫
// to:跳转到的位置 from:从哪来
router.beforeEach((to, from) => {
  const token: string | null = localStorage.getItem("token")
  if (to.path !== "/login" && !token) {
    // 只有登录成功才可以进入到main页面
    return "/login"
  }

  if (to.path === "/login" && token) {
    return "/main"
  }

  if (/^\/main(\/)?$/.test(to.path) && from.path !== "/login") {
    return firstMenu[0].path
  }
})

export default router

// 解决刷新后动态路由消失的问题
const menus = JSON.parse(localStorage.getItem("userMenus") as string) ?? []
addRoutesfromMenu(menus)
