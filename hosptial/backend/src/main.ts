import "normalize.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import pinia from "./store";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
// import ElementPlus from "element-plus"
import "element-plus/dist/index.css";

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(router);
app.use(pinia);
app.mount("#app");
