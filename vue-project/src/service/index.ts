import axios, { type AxiosInstance } from "axios"

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "https://some-domain.com/api/",
  timeout: 10000,
})

axiosInstance.interceptors.request.use((config) => {
  return config
})

axiosInstance.interceptors.response.use((response) => {
  return response
})

export default axiosInstance
