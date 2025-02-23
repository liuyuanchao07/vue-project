import axiosInstance from "@/service/index"

// 登录接口
export const loginApi = () => {
  axiosInstance({
    method: "post",
  })
}
