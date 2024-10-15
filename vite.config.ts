/*
 * @Author: 南靳
 * @Date: 2024-09-20 17:08:41
 * @LastEditors: 南靳
 * @LastEditTime: 2024-10-09 13:56:52
 * @FilePath: /cat-mouse-game/vite.config.ts
 * @Description: 
 */
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        javascriptEnabled: true,
        additionalData: '@import "./src/assets/variable.scss";',
      },
    },
  },
})
