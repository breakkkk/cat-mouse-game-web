/*
 * @Author: 七条
 * @LastEditors: 七条
 * @LastEditTime: 2024-08-19 18:21:18
 * @Description:
 *
 */
import { expect, test } from 'vitest'
import { useCounterStore } from '../counter'
import { setActivePinia, createPinia } from 'pinia'

test('HomeView.vue', async () => {
  setActivePinia(createPinia())
  const counterStore = useCounterStore()
  counterStore.increment()
  counterStore.increment()
  expect(counterStore.count).toBe(2)
  expect(counterStore.doubleCount).toBe(4)
})
