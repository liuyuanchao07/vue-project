import axios, { type AxiosInstance } from "axios"

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://192.168.0.138:5000",
  timeout: 10000,
})

axiosInstance.interceptors.request.use((config) => {
  return config
})

axiosInstance.interceptors.response.use((response) => {
  return response
})

export default axiosInstance
