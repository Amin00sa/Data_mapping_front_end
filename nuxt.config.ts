// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {enabled: true},
  modules: ['nuxt-icon',
    '@nuxt/image',
    '@nuxtjs/tailwindcss',
    'nuxt-headlessui',
    '@pinia/nuxt',
    'nuxt-lodash'
  ],
  runtimeConfig: {
    public: {
      apiBase: '',
      baseUrl: process.env.NUXT_PUBLIC_BASE_URL
    }
  },
})