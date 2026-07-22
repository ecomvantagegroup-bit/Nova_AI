import { createApp } from "vue";
import App from "./App.jsx";
import router from "./router/router.jsx";
import "./style.css";

const app = createApp(App);

app.use(router);

app.mount("#app");