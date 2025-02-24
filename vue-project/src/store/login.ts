import { defineStore } from "pinia"
import router from "@/router"
import { addRoutesfromMenu, firstMenu } from "@/utils"
import { accountLogin, phoneLogin, getUserInfo, getMenu } from "@/service/request"
import { ElMessage, ElLoading } from "element-plus"

const useLoginStore = defineStore("login", {
  state: () => ({
    token: localStorage.getItem("token") ?? "",
    user: localStorage.getItem("user") ?? "",
    id: localStorage.getItem("id") ?? "",
    userMenus: JSON.parse(localStorage.getItem("userMenus") as string) ?? [],
    activeMenuId: localStorage.getItem("activeMenuId") ?? "",
  }),
  actions: {
    // 1. 用户名密码登录
    async accountLoginAction(username: string, password: string) {
      const loading = ElLoading.service({
        lock: true,
        text: "Loading",
        background: "rgba(0, 0, 0, 0.7)",
      })

      const loginResult = await accountLogin(username, password)

      this.token = loginResult.data.data.token
      this.user = loginResult.data.data.user
      this.id = loginResult.data.data.id
      localStorage.setItem("token", this.token)
      localStorage.setItem("user", this.user)
      localStorage.setItem("id", this.id)

      // 2. 获取登录用户的详细信息
      const userInfoResult = await getUserInfo(loginResult.data.data.id)

      // 3. 根据详细信息返回用户菜单
      const userMenuResult = await getMenu(userInfoResult.data.data.id)
      this.userMenus = userMenuResult.data.data
      if (this.userMenus[0].children) {
        this.activeMenuId = String(this.userMenus[0].children[0].id)
      } else {
        this.activeMenuId = String(this.userMenus[0].id)
      }
      localStorage.setItem("activeMenuId", this.activeMenuId)
      localStorage.setItem("userMenus", JSON.stringify(userMenuResult.data.data))

      // 4. 生成动态路由
      addRoutesfromMenu(this.userMenus)

      loading.close()
      ElMessage({
        message: "登录成功",
        type: "success",
      })

      router.push(firstMenu[0].path)
    },
    // 手机号登录
    async phoneLoginAction(phoneNum: string, validateCode: string) {
      const loading = ElLoading.service({
        lock: true,
        text: "Loading",
        background: "rgba(0, 0, 0, 0.7)",
      })

      const result = await phoneLogin(phoneNum, validateCode)
      loading.close()
      ElMessage({
        message: "登录成功",
        type: "success",
      })
      this.token = result.data.data.token
      this.user = result.data.data.user
      this.id = result.data.data.id
      localStorage.setItem("token", this.token)
      localStorage.setItem("user", this.user)
      localStorage.setItem("id", this.id)
      router.push("/main")
    },
    // 存储当前高亮menu的Id
    setActiveMenuId(id: string) {
      this.activeMenuId = id
      localStorage.setItem("activeMenuId", this.activeMenuId)
    },
  },
})

export default useLoginStore
