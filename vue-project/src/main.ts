import "normalize.css"
import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import pinia from "./store"
import registerIcons from "./global/register-icons"
// import ElementPlus from "element-plus"
import "element-plus/dist/index.css"

const app = createApp(App)

app.use(registerIcons)
app.use(router)
app.use(pinia)
// 全局注册ElementPlus 不建议
// app.use(ElementPlus)
app.mount("#app")
