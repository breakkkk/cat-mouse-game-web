/*
 * @Author: 南靳
 * @Date: 2024-10-12 16:15:43
 * @LastEditors: 南靳
 * @LastEditTime: 2024-10-12 16:16:00
 * @FilePath: /Silk-All-Backend/src/plugins/pinia/index.ts
 * @Description:
 */
import { createPinia } from 'pinia'

// 单例模式获取 pinia对象
export const PiniaSingleton = (function () {
  let instance

  function createInstance() {
    return createPinia()
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance()
      }
      return instance
    }
  }
})()
