import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/login",
    component: () => import("../views/login/index.vue"),
  },
  {
    path: "/main",
    name: "main",
    component: () => import("../views/main/index.vue"),
    children: [
      {
        path: "/dashboard",
        meta: {
          id: "1",
          name: "控制台",
          icon: "Platform",
          path: "/dashboard",
        },
        component: () => import("../views/dashboard/index.vue"),
      },
      {
        path: "/auth",
        meta: {
          id: "2",
          name: "权限管理",
          icon: "Grid",
          path: "/auth",
        },
        children: [
          {
            path: "/auth/admin",
            meta: {
              id: "3",
              name: "账号管理",
              icon: "Avatar",
              path: "/auth/admin",
            },
            component: () => import("../views/auth/admin.vue"),
          },
          {
            path: "/auth/group",
            meta: {
              id: "4",
              name: "群组管理",
              icon: "Avatar",
              path: "/auth/group",
            },
            component: () => import("../views/auth/group.vue"),
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

// beforeEach 前置守卫
router.beforeEach((to, from) => {
  const token = localStorage.getItem("token");
  if (!token && to.path !== "/login") {
    return "/login";
  }

  if (token && to.path === "/login") {
    return "/main";
  }
});

export default router;
