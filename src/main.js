import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import "flowbite";
import axios from "axios";

import "./assets/main.css";

axios.defaults.baseURL = "http://192.168.1.75:3000";

const pinia = createPinia();
const app = createApp(App);

pinia.use(piniaPluginPersistedstate);
app.use(router).use(pinia);

app.mount("#app");
