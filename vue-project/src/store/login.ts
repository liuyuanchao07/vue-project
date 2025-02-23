import { defineStore } from "pinia"
import router from "@/router/index"
import { accountLogin, phoneLogin } from "@/service/request"
import { ElMessage, ElLoading } from "element-plus"

const useLoginStore = defineStore("login", {
  state: () => ({
    token: localStorage.getItem("token") ?? "",
    username: localStorage.getItem("username") ?? "",
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

      const result = await accountLogin(username, password)
      loading.close()
      ElMessage({
        message: "登录成功",
        type: "success",
      })
      this.token = result.data.data.token
      this.username = result.data.data.username
      this.id = result.data.data.id
      localStorage.setItem("token", this.token)
      localStorage.setItem("username", this.username)
      localStorage.setItem("id", this.id)
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
      this.username = result.data.data.username
      this.id = result.data.data.id
      localStorage.setItem("token", this.token)
      localStorage.setItem("username", this.username)
      localStorage.setItem("id", this.id)
      router.push("/main")
    },
  },
})

export default useLoginStore
