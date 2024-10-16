<!--
 * @Author: 南靳
 * @Date: 2024-10-09 13:30:26
 * @LastEditors: 南靳
 * @LastEditTime: 2024-10-16 14:53:56
 * @FilePath: /cat-mouse-game/src/views/game/mapContainer.vue
 * @Description: 
-->
<template>
  <div>
    <div class="header">
      <ElButton @click="startDraw" v-if="drawStatus === DrawFencesStatusEnum.None"
        >开始绘制</ElButton
      >
      <ElButton @click="startEditPolygon" v-if="drawStatus === DrawFencesStatusEnum.Edit"
        >开始编辑</ElButton
      >
      <ElButton @click="endEditPolygon" v-if="drawStatus === DrawFencesStatusEnum.Editing"
        >保存编辑</ElButton
      >
      <ElButton @click="startDibble" v-if="drawStatus === DrawFencesStatusEnum.Edit"
        >开始挖洞</ElButton
      >
      <ElButton @click="startPick" v-if="gameStatus === GameStatusEnum.None">开始游戏</ElButton>
    </div>
    <div id="container"> </div>
  </div>
</template>
<script lang="ts" setup>
import getAMapInstance from './getAMapInstance'
import { ref } from 'vue'
import XEUtils from 'xe-utils'
import { ElMessage } from 'element-plus'
import { watch } from 'vue'
import { useFencesPathStore, useGameStore, usePlayerPointStore } from '../../store/game'
import { PiniaSingleton } from '../../plugins/pinia/index'
import { DrawFencesStatusEnum, GameStatusEnum } from '@/cons/enums'
import { generatorPlayer } from '../../helper/gameHelper'
import { generatorRandomPoint } from '../../helper/test'

const drawStatus = ref<DrawFencesStatusEnum>(DrawFencesStatusEnum.None)

const polygon = ref<AMap.Polygon>()
// 围栏路径点
const { fencesPath, addPath, resetPath } = useFencesPathStore(PiniaSingleton.getInstance())
const { playerPointList, updatePlayer } = usePlayerPointStore(PiniaSingleton.getInstance())
const { gameStatus, gameStart, gameEnd } = useGameStore(PiniaSingleton.getInstance())

const polyEditor = ref<AMap.PolygonEditor>()
const pathDeep = ref<number>(0)

const markerMap = ref<{
  [k in string]: AMap.Marker
}>({})

const map = getAMapInstance((map) => {
  // 监听点击事件
  map.on('click', (e: any) => {
    // 绘制围栏
    if (
      polygon.value &&
      (drawStatus.value === DrawFencesStatusEnum.Draw ||
        drawStatus.value === DrawFencesStatusEnum.Dibbling)
    ) {
      const { lng, lat } = e.lnglat

      addPath(new AMap.LngLat(lng, lat), pathDeep.value)
      polygon.value.setPath(XEUtils.clone(fencesPath, true))
    }
  })

  map.on('rightclick', (e: any) => {
    if (polygon.value) {
      const { lng, lat } = e.lnglat

      addPath(new AMap.LngLat(lng, lat), pathDeep.value)
      drawStatus.value === DrawFencesStatusEnum.Draw && endDraw()
      drawStatus.value === DrawFencesStatusEnum.Dibbling && endDibble()
    }
  })
  map.on('mousemove', (e: any) => {
    if (
      polygon.value &&
      (drawStatus.value === DrawFencesStatusEnum.Draw ||
        drawStatus.value === DrawFencesStatusEnum.Dibbling)
    ) {
      const { lng, lat } = e.lnglat

      const path = XEUtils.clone(fencesPath, true)
      if (path.length == pathDeep.value) {
        path.push([])
      }
      const len = path.length
      path[len - 1].push(new AMap.LngLat(lng, lat))
      polygon.value.setPath(path)
    }
  })

  // 加载插件
  map.plugin(['AMap.PolygonEditor'], () => {
    console.log('AMap.PolygonEditor 加载完毕')
  })
})

// 开始绘制
const startDraw = () => {
  if (!map.value) return
  drawStatus.value = DrawFencesStatusEnum.Draw
  // 围栏路径
  if (!polygon.value) {
    polygon.value = new AMap.Polygon({
      path: [], //路径
      fillColor: '#fff', //多边形填充颜色
      strokeWeight: 2, //线条宽度，默认为 2
      strokeColor: 'red', //线条颜色
      bubble: true
    })
    map.value.add(polygon.value)
    polyEditor.value = new AMap.PolygonEditor(map.value, polygon.value)
  }
}
const endDraw = () => {
  if (!polygon.value) return

  if (fencesPath[0] && fencesPath[0].length < 3) {
    ElMessage.error('请至少绘制三个点')
    return
  }
  finshEdit()
}

// 编辑图形
const startEditPolygon = () => {
  drawStatus.value = DrawFencesStatusEnum.Editing
  polyEditor.value?.open()
}
const endEditPolygon = () => {
  drawStatus.value = DrawFencesStatusEnum.Edit

  const path = polyEditor.value?.getTarget()?.getPath() || null
  if (path) {
    resetPath(path as AMap.LngLat[][])
  }
  polyEditor.value?.close()
}

// 挖洞
const startDibble = () => {
  drawStatus.value = DrawFencesStatusEnum.Dibbling
  pathDeep.value++
}
const endDibble = () => {
  drawStatus.value = DrawFencesStatusEnum.Edit
  finshEdit()
}

// 完成编辑
const finshEdit = () => {
  if (!polygon.value) return
  drawStatus.value = DrawFencesStatusEnum.Edit
  polygon.value.setPath(fencesPath)
}

// 绘制玩家marker
const drawPlayerMarker = () => {
  playerPointList.forEach((player) => {
    if (markerMap.value[player.id]) {
      player.point && markerMap.value[player.id].setPosition(player.point)
    } else {
      generatorMarker(player)
    }
  })
}

const startPick = () => {
  gameInit()

  drawPlayerMarker()
  // 测试模拟移动
  setInterval(() => {
    playerPointList.forEach((player) => {
      if (polygon.value) {
        updatePlayer({
          ...player,
          point: generatorRandomPoint(polygon.value)
        })
      }
    })
    drawPlayerMarker()
  }, 1000 * 5)
}

// 生成marker
const generatorMarker = (player: IGame.Player) => {
  const icon = new AMap.Icon({
    size: new AMap.Size(25, 25), //图标尺寸
    image: 'https://web.xinyifm.cn/oss/xc-h5/activity/ann-detail-icon.png', //Icon 的图像
    imageOffset: new AMap.Pixel(0, 0), //图像相对展示区域的偏移量，适于雪碧图等
    imageSize: new AMap.Size(25, 25)
  })
  // 将 Icon 实例添加到 marker 上:
  if (player.point) {
    const marker = new AMap.Marker({
      position: player.point, //点标记的位置
      offset: new AMap.Pixel(0, 0), //偏移量
      icon: icon //添加 Icon 实例
    })
    map.value?.add(marker)
    markerMap.value[player.id] = marker
  }
}

// #region 游戏测试
const gameInit = () => {
  if (!polygon.value || !map.value) return
  // 生成随机玩家
  const player = generatorPlayer(polygon.value)
  updatePlayer(player)
}
// #endregion
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
