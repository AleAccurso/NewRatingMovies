import colors from "vuetify/es5/util/colors";
import i18n from "./config/i18n";

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: "%s - ratingMovies",
    title: "ratingMovies",
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
  serverMiddleware: [
    // { path: '/api', handler: '~/api/index.js'},
  ],

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
    // nuxt-i18n - translation module
    [
      "@nuxtjs/i18n",
      {
        vueI18nLoader: true,
        defaultLocale: "fr",
        locales: [
          {
            code: "en",
            name: "English",
          },
          {
            code: "fr",
            name: "Français",
          },
          {
            code: "nl",
            name: "Nederlands",
          },
          {
            code: "it",
            name: "Italiano",
          },
        ],
        vueI18n: i18n,
      },
    ],
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    // '@nuxtjs/proxy',
    "@nuxtjs/axios",
    "@nuxtjs/auth-next",
    "@nuxtjs/toast",
  ],

  /* axios: {
    baseURL: process.env.BASE_URL || "http://localhost:8010/api",
  }, */

  env: {
    /* baseURL: "http://localhost:8010/api", */
    baseURL: "http://newratingmovies-backend.herokuapp.com/api",
    API_PIC_URL: "http://image.tmdb.org/t/p/w500",
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, ctx) {},
  },

  //Axios
  axios: {
    /* baseURL: "http://localhost:8010/api", */
    baseURL: "http://newratingmovies-backend.herokuapp.com/api",
  },

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
      /* themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      }, */
    },
  },

  //Toast alerts settings
  toast: {
    position: "top-center",
    duration: 2000,
    className: "toast",
  },

  //Translation module
  i18n: {
    locales: [
      { code: "en", iso: "en-US", file: "en.json", dir: "ltr" },
      { code: "fr", iso: "fr-BE", file: "fr.json", dir: "ltl" },
      { code: "nl", iso: "nl-BE", file: "nl.json", dir: "ltl" },
      { code: "it", iso: "it-IT", file: "it.json", dir: "ltl" },
    ],
    defaultLocale: "fr",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root", // recommended
    },
    vueI18n: i18n,
  },
};
