import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import Antd from "ant-design-vue";
import Maska from "maska";
import "ant-design-vue/dist/antd.less";
import "@/styles/rewrites.less";
import "@/styles/vars.less";

const app = createApp(App);
app.use(store);
app.use(Antd);
app.use(Maska);
app.mount("#app");
