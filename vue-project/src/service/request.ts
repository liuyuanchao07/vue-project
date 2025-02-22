import axiosInstance from "@/service/index"

export const loginApi = () => {
  axiosInstance({
    method: "post",
  })
}
