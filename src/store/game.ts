/*
 * @Author: 南靳
 * @Date: 2024-10-15 15:44:42
 * @LastEditors: 南靳
 * @LastEditTime: 2024-10-16 14:40:17
 * @FilePath: /cat-mouse-game/src/store/game.ts
 * @Description:
 */
// import type { IGame } from '@/type/store/map'
import { GameStatusEnum } from '@/cons/enums'
import { defineStore } from 'pinia'
import { readonly, ref } from 'vue'

export const useFencesPathStore = defineStore('fencesPathStore', () => {
  const pathList = ref<AMap.LngLat[][]>([])

  const addPath = (lnglat: AMap.LngLat, index: number) => {
    if (!pathList.value[index]) {
      pathList.value[index] = []
    }
    pathList.value[index].push(lnglat)
  }

  const resetPath = (newList: AMap.LngLat[][] = []) => {
    pathList.value = newList
  }

  return {
    fencesPath: pathList,
    addPath,
    resetPath
  }
})

export const usePlayerPointStore = defineStore('playerPoinitStoore', () => {
  const playerPointList = ref<IGame.Player[]>([])
  const addPlayer = (player: IGame.Player) => {
    playerPointList.value.push(player)
  }

  // 更新玩家信息
  const updatePlayer = (player: IGame.Player) => {
    const index = playerPointList.value.findIndex((v) => v.id === player.id)
    if (index > -1) {
      playerPointList.value.splice(index, 1, player)
    } else {
      addPlayer(player)
    }
  }

  // 删除玩家信息
  const removePlayer = () => {}
  return {
    playerPointList,
    updatePlayer
  }
})

export const useGameStore = defineStore('gameStore', () => {
  const gameStatus = ref<GameStatusEnum>(GameStatusEnum.None)

  const gameStart = () => {
    gameStatus.value = GameStatusEnum.Playing
  }

  const gameEnd = () => {
    gameStatus.value = GameStatusEnum.Ending
  }

  return {
    gameStatus,
    gameStart,
    gameEnd
  }
})
