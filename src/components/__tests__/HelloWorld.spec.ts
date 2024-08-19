/*
 * @Author: 七条
 * @LastEditors: 七条
 * @LastEditTime: 2024-08-19 16:19:23
 * @Description:
 *
 */
import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import HelloWorld from '../HelloWorld.vue'

describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(HelloWorld, { props: { msg: 'Hello Vitest' } })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})
