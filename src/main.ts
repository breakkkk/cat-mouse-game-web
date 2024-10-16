/*
 * @Author: 南靳
 * @Date: 2024-10-09 13:23:42
 * @LastEditors: 南靳
 * @LastEditTime: 2024-10-15 15:44:15
 * @FilePath: /cat-mouse-game/src/main.ts
 * @Description:
 */
import './assets/main.css'
import 'element-plus/dist/index.css'

import { createApp } from 'vue'
import ElementPlus from 'element-plus'

import App from './App.vue'
import router from './router'
import { PiniaSingleton } from './plugins/pinia'

const app = createApp(App)

app.use(PiniaSingleton.getInstance())
app.use(ElementPlus)
app.use(router)

app.mount('#app')
