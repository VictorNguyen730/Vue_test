// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
  typescript: {
    strict: true
  },
  devServer: {
    host: '0.0.0.0', // bind to all network interfaces (works with VPN)
    port: 3000       // keep using port 3000
  }
})
