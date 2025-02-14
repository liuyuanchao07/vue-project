import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from "vue-router"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/login",
    },
    {
      path: "/login",
      component: () => import("../views/login/Login.vue"),
    },
    {
      path: "/main",
      component: () => import("../views/main/Main.vue"),
    },
    {
      path: "/:pathMatch(.*)",
      component: () => import("../views/notFound/NotFound.vue"),
    },
  ],
})

// 导航守卫
// to:跳转到的位置 from:从哪来
router.beforeEach((to, from) => {
  if (to.path === "/main") {
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
