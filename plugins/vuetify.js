import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import '@mdi/font/css/materialdesignicons.css'
import '@fortawesome/fontawesome-free/css/all.css'
// import 'echarts'

export default defineNuxtPlugin((nuxtApp) => {
  // Doing something with nuxtApp
  const vuetify = createVuetify({
    components,
    icons: {
      iconfont: "mdi" || "mdiSvg" || "md" || "fa" || "fa4" || "faSvg",
    },
    theme: {
      themes: {
        light: {
          primary: '#424242',
          secondary: '#b0bec5',
          accent: '#8c9eff',
          error: '#b71c1c',
          background:'#fff'
        },
      },
    },
  });
  nuxtApp.vueApp.use(vuetify);
});
