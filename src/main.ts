/*
 * @Author: 南靳
 * @Date: 2024-10-09 13:23:42
 * @LastEditors: 南靳
 * @LastEditTime: 2024-10-09 14:33:51
 * @FilePath: /cat-mouse-game/src/main.ts
 * @Description: 
 */
import './assets/main.css'
import 'element-plus/dist/index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(ElementPlus)
app.use(router)

app.mount('#app')
