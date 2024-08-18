import "./assets/main.css";
import { createApp } from "vue";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import App from "./App.vue";

const app = createApp(App);
// const vuetify = createVuetify({ components, directives });
// app.use(vuetify).mount("#app");
app.mount("#app");
