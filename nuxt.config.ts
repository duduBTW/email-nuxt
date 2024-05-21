import { PROJECT_ICONS } from "./composables/icons";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["sanitize.css"],
  modules: ["@vesp/nuxt-fontawesome", "@nuxtjs/google-fonts", "@pinia/nuxt"],
  fontawesome: {
    icons: {
      solid: Object.values(PROJECT_ICONS),
    },
  },
  googleFonts: {
    families: {
      Montserrat: true,
    },
  },
  runtimeConfig: {
    public: {
      AUTH_ID: "authId",
      AUTH_ID_LIST: "authIdList",
    },
  },
});
