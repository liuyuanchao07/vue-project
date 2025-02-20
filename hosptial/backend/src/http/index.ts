import axios, { type AxiosInstance } from "axios";
import showMessage from "../components/ElMessage";
import { useRouter } from "vue-router";
const router = useRouter();

const http: AxiosInstance = axios.create({
  baseURL: "http://192.168.0.134:5000",
  timeout: 10000,
});

// 设置白名单
const whiteList: string[] = [
  "/get/code",
  "/user/authentication",
  "/user/login",
];

http.interceptors.request.use(
  function (config) {
    const token: string | null = localStorage.getItem("token");
    if (token && whiteList.includes(config.url as string)) {
      config.headers["x-token"] = token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  function (response) {
    if (response.data.code === -1) {
      showMessage({
        message: response.data.message,
      });
    }
    if (response.data.code === -2) {
      // token有问题
      localStorage.removeItem("token");
      localStorage.removeItem("userInfo");
      router.push("/login");
    }
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default http;
