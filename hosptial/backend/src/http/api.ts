import http from "../http/index";

// 发送验证码
export const getCode = (data: { tel: string }) => {
  return http({
    method: "post",
    url: "/get/code",
    data,
  });
};

// 注册用户
export const userAuth = (data: {
  phone: string;
  password: string;
  code: string;
}) => {
  return http({
    method: "post",
    url: "/user/authentication",
    data,
  });
};

// 登录
export const login = (data: { phone: string; password: string }) => {
  return http({
    method: "post",
    url: "/user/login",
    data,
  });
};

// 权限管理列表
export const authAdmin = (params: { phone: string; password: string }) => {
  return http({
    method: "get",
    url: "/auth/admin",
    params,
  });
};

// 获取菜单权限数据
export const userGetMenu = () => {
  return http({
    method: "get",
    url: "/user/getMenu",
  });
};

// 获取菜单修改
export const userSetMenu = (data: {
  name: string;
  permissions: string;
  id: string;
}) => {
  return http({
    method: "post",
    url: "/user/setMenu",
    data,
  });
};

// 获取菜单权限列表
export const menuList = (params: { pagaeNum: number; pageSize: number }) => {
  return http({
    method: "get",
    url: "/user/menuList",
    params,
  });
};
