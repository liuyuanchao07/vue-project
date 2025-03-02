import axios, { type AxiosInstance } from "axios"
import router from "@/router"

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://192.168.0.107:5000",
  timeout: 10000,
})

const whiteList: string[] = ["/accountLogin", "/getValidateCode", "/phoneLogin"]

axiosInstance.interceptors.request.use(
  (config) => {
    const token: string | null = localStorage.getItem("token")
    if (token && !whiteList.includes(config.url as string)) {
      config.headers!.Authorization = `Bearer ${token}`
    }

    if (!token && !whiteList.includes(config.url as string)) {
      router.push("/login")
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  },
)

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  function (error) {
    return Promise.reject(error)
  },
)

export default axiosInstance
