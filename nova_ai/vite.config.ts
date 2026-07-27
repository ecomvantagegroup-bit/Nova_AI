import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/nova_ai/',

  server: { 
    host: true, 
    // Allow any tunnel host domain (Serveo, Ngrok, VS Code, etc.)
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