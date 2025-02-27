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

// 查询用户的详细信息
export const getUserInfo = (id: number) => {
  return axiosInstance({
    method: "get",
    url: "/users",
    params: {
      id,
    },
  })
}

// 获取用户菜单
export const getMenu = (id: number) => {
  return axiosInstance({
    method: "get",
    url: "/getMenu",
    params: {
      id,
    },
  })
}

// 获取用户列表
export const getUsers = (params: {
  username: string
  realname: string
  phone: string
  state: string
  createDate: string[]
}) => {
  return axiosInstance({
    method: "get",
    url: "/getUsers",
    params,
  })
}

// 获取角色菜单
export const getRoleList = () => {
  return axiosInstance({
    method: "get",
    url: "/getRoleList",
  })
}

// 获取部门菜单
export const getDepartmentList = () => {
  return axiosInstance({
    method: "get",
    url: "/getDepartmenetList",
  })
}

// 获取权限列表
export const getPermissionList = () => {
  return axiosInstance({
    method: "get",
    url: "/getPermissionList",
  })
}

// 获取商品统计数据
export const getStatisticData = () => {
  return axiosInstance({
    method: "get",
    url: "/getStatisticData",
  })
}
