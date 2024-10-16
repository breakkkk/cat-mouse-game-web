/*
 * @Author: 南靳
 * @Date: 2024-10-16 11:03:50
 * @LastEditors: 南靳
 * @LastEditTime: 2024-10-16 14:21:38
 * @FilePath: /cat-mouse-game/src/helper/test.ts
 * @Description:
 */
// 生成随机点位
export const generatorRandomPoint = (polygon: AMap.Polygon): AMap.LngLat => {
  if (!polygon) {
    throw new Error('polygon不存在')
  }
  // 获取多边形的边界框
  const bounds = polygon.getBounds()

  // 获取边界框的东北角和西南角坐标
  const northEast = bounds.northEast
  const southWest = bounds.southWest

  // 生成随机点的经纬度
  const randomLat = northEast.lat + (southWest.lat - northEast.lat) * Math.random()
  const randomLng = southWest.lng + (northEast.lng - southWest.lng) * Math.random()

  // 创建随机点的经纬度对象
  const randomPoint = new AMap.LngLat(randomLng, randomLat)

  return randomPoint
}
