/*
 * @Author: 南靳
 * @Date: 2024-09-20 17:08:41
 * @LastEditors: 南靳
 * @LastEditTime: 2024-10-17 17:10:37
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
  plugins: [vue(), vueJsx(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        javascriptEnabled: true,
        additionalData: '@import "./src/assets/variable.scss";'
      }
    }
  },
  server: {
    port: 5173,
    proxy: {
      // 选项写法
      '/api': {
        target: 'http://127.0.0.1:8000',
        // target: 'http://172.16.111.33:9797/rpc', // ToDo开发
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    },
    hmr: {
      overlay: false
    },
    host: '0.0.0.0'
  }
})
