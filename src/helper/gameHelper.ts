/*
 * @Author: 南靳
 * @Date: 2024-10-16 11:25:03
 * @LastEditors: 南靳
 * @LastEditTime: 2024-10-16 14:27:12
 * @FilePath: /cat-mouse-game/src/helper/gameHelper.ts
 * @Description:
 */
import { nanoid } from 'nanoid'
import { generatorRandomPoint } from './test'
import { PlayerRoleTypeEnum } from '@/cons/enums'

// 生成玩家
export const generatorPlayer = (polygon: AMap.Polygon): IGame.Player => {
  let point = generatorRandomPoint(polygon)
  while (!polygon.contains(point)) {
    point = generatorRandomPoint(polygon)
  }
  return {
    id: nanoid(),
    playerType: PlayerRoleTypeEnum.Mouse,
    point: point
  }
}
