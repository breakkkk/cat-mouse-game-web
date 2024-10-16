/*
 * @Author: 南靳
 * @Date: 2024-10-15 14:28:52
 * @LastEditors: 南靳
 * @LastEditTime: 2024-10-16 14:40:07
 * @FilePath: /cat-mouse-game/src/cons/enums.ts
 * @Description:
 */

export enum DrawFencesStatusEnum {
  None,
  Draw,
  Edit,
  Editing,
  Dibbling
}

// 玩家角色类型
export enum PlayerRoleTypeEnum {
  None,
  Cat,
  Mouse
}

export enum GameStatusEnum {
  None,
  Readying,
  Playing,
  Ending
}
