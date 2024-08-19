/*
 * @Author: 七条
 * @LastEditors: 七条
 * @LastEditTime: 2024-08-19 17:02:20
 * @Description:
 *
 */
import { expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import HomeView from '../HomeView.vue'

test('HomeView.vue', async () => {
  const wrapper = mount(HomeView)
  await wrapper.find('.subtract').trigger('click')
  await wrapper.find('.subtract').trigger('click')
  await wrapper.find('.subtract').trigger('click')
  await wrapper.find('.subtract').trigger('click')
  await wrapper.find('.add').trigger('click')
  expect(wrapper.find('.count').text()).toContain('-3')
})
