import axiosInstance from "@/service/index"

// 账号登录接口
export const accountLogin = (username: string, password: string) => {
  return axiosInstance({
    method: "post",
    url: "/accountLogin",
    data: {
      username,
      password,
    },
  })
}

// 获取手机验证码
export const getValidateCode = (phoneNum: string) => {
  return axiosInstance({
    method: "get",
    url: "/getValidateCode",
    params: {
      phoneNum,
    },
  })
}

// 手机登录接口
export const phoneLogin = (phoneNum: string, validateCode: string) => {
  return axiosInstance({
    method: "post",
    url: "/phoneLogin",
    data: {
      phoneNum,
      validateCode,
    },
  })
}
