/*
 * @Author: 南靳
 * @Date: 2024-10-15 16:47:14
 * @LastEditors: 南靳
 * @LastEditTime: 2024-10-16 14:13:37
 * @FilePath: /cat-mouse-game/src/type/store/map.d.ts
 * @Description:
 */

namespace IGame {
  type Player = {
    id: string
    playerType: PlayerRoleTypeEnum
    point: AMap.LngLat | null
  }
}
