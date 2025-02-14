import { defineStore } from "pinia"
import router from "../../router"

interface IData {
  status: number
  data: {
    name: string
    password: string
    token: string
  }
}

interface IState {
  token: string
  userMenus: any
}

const useLoginStore = defineStore("login", {
  state: (): IState => ({
    token: localStorage.getItem("token") ?? "",
    userMenus: JSON.parse(localStorage.getItem("userMenus") as string) ?? [],
  }),
  actions: {
    // actions 支持异步操作
    loginAccountAction(account: { name: string; password: string }) {
      return new Promise((resolve, reject) => {
        // 这里是post请求
        let response: IData = {
          status: 0,
          data: {
            name: "liu",
            password: "12345",
            token: "xxxuuahsuahsa",
          },
        }
        resolve(response)
      }).then((res: any) => {
        this.token = res.data.token
        localStorage.setItem("token", this.token)

        // 这里还需要根据用户id去获取用户相信信息（主要是获取角色）
        // 这个请求需要携带token 需要在请求拦截器里加请求头以及判断是否有token
        this.userMenus = [
          {
            icon: "el-icon-monitor",
            id: 1,
            name: "系统总览",
            sort: 1,
            type: 1,
            url: "/main/analysis/",
            children: [
              {
                children: null,
                id: 110,
                name: "技术核心",
                parentId: 1,
                sort: 106,
                type: 2,
                url: "/main/analysis/overview",
              },
              {
                children: null,
                id: 111,
                name: "商品统计",
                parentId: 1,
                sort: 107,
                type: 3,
                url: "/main/analysis/dashbord",
              },
            ],
          },
          {
            icon: "el-icon-pieChart",
            id: 2,
            name: "系统总览",
            sort: 1,
            type: 1,
            url: "/main/analysis/",
            children: [
              {
                children: null,
                id: 112,
                name: "技术核心",
                parentId: 2,
                sort: 106,
                type: 2,
                url: "/main/analysis/overview",
              },
              {
                children: null,
                id: 113,
                name: "商品统计",
                parentId: 2,
                sort: 107,
                type: 3,
                url: "/main/analysis/dashbord",
              },
            ],
          },
        ]
        localStorage.setItem("userMenus", JSON.stringify(this.userMenus))
        // 页面跳转
        router.push("/main")
      })
    },
  },
})

export default useLoginStore
