/** @format */

// https://nuxt.com/docs/api/configuration/nuxt-config
import Icons from 'unplugin-icons/vite';

export default defineNuxtConfig({
  alias: {
    pinia: '/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs',
  },
  app: {
    head: {
      bodyAttrs: {
        class: 'bg-white dark:bg-black transition duration-300',
      },
      link: [
        {
          rel: 'stylesheet',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css',
        },
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon.ico',
        },
      ],
      title: 'Barraya App',
    },
  },
  build: {
    transpile: [
      '@iconify/vue',
      'zod',
      '@vee-validate/zod',
      'vee-validate',
      'daisyui',
    ],
  },
  css: ['~/assets/css/tailwind.css'],
  modules: [
    '@vueuse/nuxt',
    ['@pinia/nuxt', { autoImports: ['defineStore', 'acceptHMRUpdate'] }],
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  typescript: {
    shim: false,
  },
  vite: {
    plugins: [
      Icons({
        autoInstall: true,
      }),
    ],
  },
});
