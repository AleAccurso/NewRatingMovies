require("dotenv").config();

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: "%s",
    title: "Rating Movies",
    htmlAttrs: {
      lang: "fr",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
      { name: "msapplication-TileColor", content: "#da532c" },
      { name: "theme-color", content: "#ffffff" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],

    link: [
      {
        rel: "apple-touch-icon",
        sizes: "152x152",
        href: "/apple-touch-icon.png",
      },
    ],
    link: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png",
      },
    ],
    link: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png",
      },
    ],
    link: [{ rel: "manifest", href: "/site.webmanifest" }],
    link: [
      { rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#5bbad5" },
    ],
    link: [{ rel: "preconnect", href: "https://fonts.googleapis.com" }],
    link: [{ rel: "preconnect", href: "https://fonts.gstatic.com" }],
    link: [
      {
        rel: "https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap",
        rel: "stylesheet",
      },
    ],
    link: [
      {
        rel: "https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&display=swap",
        rel: "stylesheet",
      },
    ],
    link: [
      {
        href: "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css",
        rel: "stylesheet",
        integrity:
          "sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC",
        crossorigin: "anonymous",
      },
    ],
  },
  serverMiddleware: [],

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{ src: "plugins/avatar", mode: "client" }],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  //Axios
  axios: {
    baseURL: process.env.BASE_URL,
    requestInterceptor: (config, { store }) => {
      const token = this.$cookiz.get("auth._token.local");
      if (token) {
        config.headers.common["access_token"] = token;
      }
      return config;
    },
  },

  // Environment variables
  env: {
    baseURL: process.env.BASE_URL,
    apiPicURL: process.env.API_PIC_URL,
    bannerPicURL: process.env.BANNER_PIC_URL,
    gcsPicURL: process.env.GCS_PIC_URL,
    MOVIE_GENRES: [
      "action",
      "adventure",
      "animation",
      "comedy",
      "crime",
      "documentary",
      "drama",
      "family",
      "fantasy",
      "history",
      "horror",
      "music",
      "mystery",
      "romance",
      "sciencefiction",
      "tvmovie",
      "thriller",
      "war",
      "western",
    ],
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, ctx) {
      if (ctx.isDev) {
        config.devtool = ctx.isClient ? "source-map" : "inline-source-map";
      }
    },
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",

    // @nuxtjs/i18n - translation module - https://phrase.com/blog/posts/nuxt-js-tutorial-i18n/
    [
      "@nuxtjs/i18n",
      {
        lazy: true,
        locales: [
          { code: "en", iso: "en-US", file: "en.json", name: "english" },
          { code: "fr", iso: "fr-BE", file: "fr.json", name: "french" },
          { code: "nl", iso: "nl-BE", file: "nl.json", name: "dutch" },
          { code: "it", iso: "it-IT", file: "it.json", name: "italian" },
        ],
        langDir: "locales/",
        defaultLocale: "fr",
        loadLanguagesAsync: true,
        detectBrowserLanguage: {
          useCookie: true,
          fallbackLocale: "fr",
          cookieKey: "route_path",
          locale: "fr",
        },
        vueI18nLoader: true,
      },
    ],
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/auth-next",
    "@nuxtjs/toast",
    ["cookie-universal-nuxt", { alias: "cookiz" }],
    ["@nuxtjs/dotenv", { systemvars: true }],
  ],

  // Auth
  auth: {
    strategies: {
      local: {
        token: {
          property: "token",
          global: true,
          required: true,
          type: "Bearer",
        },
        user: {
          property: "user",
          autoFetch: true,
        },
        endpoints: {
          login: { url: "/auth/login", method: "post" },
          logout: false,
          user: { url: "/auth/user", method: "get" },
        },
      },
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    theme: {
      dark: true,
    },
  },

  //Toast alerts settings
  toast: {
    position: "top-center",
    duration: 2000,
    className: "toast",
  },

  // Dov env module options
  dotenv: {
    /* module options */
  },
};
