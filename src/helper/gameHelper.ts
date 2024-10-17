/*
 * @Author: 南靳
 * @Date: 2024-10-16 11:25:03
 * @LastEditors: 南靳
 * @LastEditTime: 2024-10-17 17:06:21
 * @FilePath: /cat-mouse-game/src/helper/gameHelper.ts
 * @Description:
 */
import { nanoid } from 'nanoid'
import { generatorRandomPoint } from './test'
import { PlayerRoleTypeEnum } from '@/cons/enums'

// 生成一个当前地址玩家
export const generatorEmptyPointPlayer = (point: AMap.LngLat): IGame.Player => {
  const player = {
    id: nanoid(),
    isLocal: true,
    playerType: PlayerRoleTypeEnum.Mouse,
    point: point || new AMap.LngLat(0, 0)
  }
  return player
}

// 生成随机地址玩家
export const generatorPlayer = (polygon: AMap.Polygon): IGame.Player => {
  let point = generatorRandomPoint(polygon)
  while (!polygon.contains(point)) {
    point = generatorRandomPoint(polygon)
  }
  return {
    id: nanoid(),
    isLocal: true,
    playerType: PlayerRoleTypeEnum.Mouse,
    point: point
  }
}

// 当前玩家位置上报
export const reportCurrentPlayer = (player: IGame.Player) => {
  // todo上报当前位置
}
