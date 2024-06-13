// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt', '@pinia/nuxt'],
  css: ['./assets/css/iconsax-css/style.css'],
  buildModules: ['@nuxtjs/moment'],
  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL,
    },
  },
  ssr: false,
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/library',
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  // loadingIndicator: {
  //   name: "circle",
  //   color: "purple",
  //   background: "green",
  // },
  routeRules: {
    '/vendor': { ssr: false },
    '/vendor/orders': { ssr: false },
  },
});
