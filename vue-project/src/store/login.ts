import { defineStore } from "pinia"
import router from "@/router/index"
import { accountLogin, phoneLogin, getUserInfo } from "@/service/request"
import { ElMessage, ElLoading } from "element-plus"

const useLoginStore = defineStore("login", {
  state: () => ({
    token: localStorage.getItem("token") ?? "",
    user: localStorage.getItem("user") ?? "",
    id: localStorage.getItem("id") ?? "",
  }),
  actions: {
    // 用户名密码登录
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

      // 获取登录用户的详细信息
      const userInfoResult = await getUserInfo(loginResult.data.data.id)
      console.log(userInfoResult)

      loading.close()
      ElMessage({
        message: "登录成功",
        type: "success",
      })

      router.push("/main")
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
  },
})

export default useLoginStore
