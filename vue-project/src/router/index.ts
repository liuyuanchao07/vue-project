import { createRouter, createMemoryHistory, createWebHistory } from "vue-router"

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

export default router
