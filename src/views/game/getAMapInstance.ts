/*
 * @Author: 南靳
 * @Date: 2024-10-09 13:44:38
 * @LastEditors: 南靳
 * @LastEditTime: 2024-10-15 15:37:27
 * @FilePath: /cat-mouse-game/src/views/game/getAMapInstance.ts
 * @Description:
 */
import { onMounted, onUnmounted, readonly, ref, type Ref } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader'

const map = ref<AMap.Map | null>(null)
export default (cb?: (instance: AMap.Map) => void): Ref<AMap.Map | null> => {
  if (map.value) {
    cb && cb(map.value)
    return map
  }

  onMounted(() => {
    window._AMapSecurityConfig = {
      securityJsCode: '1fd506d77750177de2836349f614273f'
    }
    AMapLoader.load({
      key: '3f4bc4e6e9ab1434f7c5bf77d451e841', // 申请好的Web端开发者Key，首次调用 load 时必填
      version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: ['AMap.Scale', 'AMap.Geolocation'] //需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['...','...']
    })
      .then((AMap) => {
        map.value = new AMap.Map('container', {
          // 设置地图容器id
          viewMode: '3D', // 是否为3D地图模式
          zoom: 11, // 初始化地图级别
          center: [116.397428, 39.90923] // 初始化地图中心点位置
        })

        if (map.value) {
          cb && cb(map.value)
        }
      })
      .catch((e) => {
        console.log(e)
      })
  })

  onUnmounted(() => {
    map.value?.destroy()
  })

  return map
}
