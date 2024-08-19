/*
 * @Author: 七条
 * @LastEditors: 七条
 * @LastEditTime: 2024-08-19 17:05:39
 * @Description:
 *
 */
import { expect, test } from 'vitest'
import { sum } from '../index'

test('HomeView.vue', async () => {
  expect(sum(1, 4)).toBe(5)
})
