/*
 * @Author: 南靳
 * @Date: 2024-09-20 17:08:41
 * @LastEditors: 南靳
 * @LastEditTime: 2024-10-09 13:30:35
 * @FilePath: /cat-mouse-game/src/router/index.ts
 * @Description: 
 */
import { createRouter, createWebHistory } from 'vue-router'
import MapContainer from '../views/game/mapContainer.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'game',
      component: MapContainer
    },
  ]
})

export default router
