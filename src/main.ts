// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
// import { aliases, fa } from 'vuetify/iconsets/fa'
import { aliases, mdi } from "vuetify/iconsets/mdi-svg";
import "@mdi/font/css/materialdesignicons.css";
// import { mdiAccount } from '@mdi/js'

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
});

app.use(vuetify);
app.use(router);

app.mount("#app");
