<!--
 * @Author: 南靳
 * @Date: 2024-10-09 13:30:26
 * @LastEditors: 南靳
 * @LastEditTime: 2024-10-10 19:31:13
 * @FilePath: /cat-mouse-game/src/views/game/mapContainer.vue
 * @Description: 
-->
<template>
  <div>
    <div class="header">
      <ElButton @click="startDraw" v-if="!isDraw">开始绘制</ElButton>
      <ElButton @click="endDraw" v-if="isDraw">结束绘制</ElButton>
      <ElButton @click="startEditPolygon" v-if="!isEdit && polyEditor">开始编辑</ElButton>
      <ElButton @click="endEditPolygon" v-if="isEdit && polyEditor">保存编辑</ElButton>
      <ElButton @click="startDibble" v-if="!isDibble && polyEditor">开始挖洞</ElButton>
      <ElButton @click="endDibble" v-if="isDibble && polyEditor">保存挖洞</ElButton>
    </div>
    <div id="container"> </div>
  </div>
</template>
<script lang="ts" setup>
import getAMapInstance from './getAMapInstance'
import { ref } from 'vue'

const isDraw = ref<boolean>(false)
const isEdit = ref<boolean>(false)
const isDibble = ref<boolean>(false)

const polygon = ref<AMap.Polygon>()
const fencesPath = ref<AMap.LngLat[][]>([])
const polyEditor = ref<AMap.PolygonEditor>()
const map = getAMapInstance((map) => {
  // 监听点击事件
  map.on('click', (e: any) => {
    console.log('e', e)
    if (!polygon.value || !isDraw.value) return

    const { lng, lat } = e.lnglat
    // state.drawPoints.push(lnglat);

    if (fencesPath.value.length == 0) {
      fencesPath.value.push([])
    }
    const len = fencesPath.value.length
    fencesPath.value[len - 1].push(new AMap.LngLat(lng, lat))
    polygon.value.setPath(fencesPath.value)
  })

  // 加载插件
  map.plugin(['AMap.PolygonEditor'], () => {
    console.log('AMap.PolygonEditor 加载完毕')
  })
})

// 开始绘制
const startDraw = () => {
  if (!map.value) return
  isDraw.value = true
  // 围栏路径
  if (!polygon.value) {
    polygon.value = new AMap.Polygon({
      path: [], //路径
      fillColor: '#fff', //多边形填充颜色
      strokeWeight: 2, //线条宽度，默认为 2
      strokeColor: 'red' //线条颜色
    })
    map.value.add(polygon.value)
    polyEditor.value = new AMap.PolygonEditor(map.value, polygon.value)
    fencesPath.value = polygon.value.getPath() as AMap.LngLat[][]

    polygon.value.on('click', (e: any) => {
      console.log('polygon event', e)
      if (!isDibble.value || !polygon.value) return
      const { lng, lat } = e.lnglat

      const len = fencesPath.value.length
      fencesPath.value[len - 1].push(new AMap.LngLat(lng, lat))
      polygon.value.setPath(fencesPath.value)
    })
  }
}
const endDraw = () => {
  if (!polygon.value) return

  isDraw.value = false
  polygon.value.setPath(fencesPath.value)
}

// 编辑图形
const startEditPolygon = () => {
  isEdit.value = true
  polyEditor.value?.open()
}
const endEditPolygon = () => {
  isEdit.value = false

  const path = polyEditor.value?.getTarget()?.getPath() || null
  if (path) {
    fencesPath.value = path as AMap.LngLat[][]
  }
  polyEditor.value?.close()
}

// 挖洞
const startDibble = () => {
  isDibble.value = true
  fencesPath.value.push([])
}
const endDibble = () => {
  isDibble.value = true
}

const getArratDepth = (arr: any, depth: number = 0): number => {
  if (!Array.isArray(arr)) {
    return depth
  }
  return getArratDepth(arr[0], depth)
}
</script>
<style scoped lang="scss">
#container {
  padding: 0px;
  margin: 0px;
  width: 100%;
  height: 800px;
}
.header {
  position: fixed;
  left: 20px;
  top: 20px;
  z-index: 10;
}
</style>
