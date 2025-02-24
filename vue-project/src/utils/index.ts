import router from "@/router"
import type { RouteRecordRaw } from "vue-router"

interface IMenus {
  children: { url: string }[]
  url: string
}
export let firstMenu: RouteRecordRaw[] = []

export const addRoutesfromMenu = (menus: IMenus[]) => {
  const files: Record<string, () => Promise<unknown>> = import.meta.glob("@/views/main/**/*.vue")
  const filesKeys: string[] = Object.keys(files)
  const localRoutes: RouteRecordRaw[] = []
  menus.forEach((menu: { children: { url: string }[]; url: string }) => {
    if (menu.children) {
      menu.children.forEach((child: { url: string }) => {
        filesKeys.find((item) => {
          if (item.includes(child.url)) {
            localRoutes.push({
              path: child.url,
              component: files[item],
            })
          }
        })
      })
    } else {
      filesKeys.find((item) => {
        if (item.includes(menu.url)) {
          localRoutes.push({
            path: menu.url,
            component: files[item],
          })
        }
      })
    }
  })

  firstMenu = [localRoutes[0]]

  localRoutes.forEach((item) => {
    router.addRoute("main", item)
  })
}
