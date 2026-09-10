import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@tailwindcss/vite' // or '@vitejs/plugin-vue' depending on your import setup
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/Nova_AI/', // <-- Updated to match your exact repo name casing

  server: { 
    host: true, 
    allowedHosts: true, 
  },

  plugins: [
    vue(),
    tailwindcss(),
    vueJsx(),
    vueDevTools(), 
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
