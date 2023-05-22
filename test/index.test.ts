import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { LocalScope } from '../src'

describe('LocalScope', () => {
  it('works with v-slot', () => {
    const wrapper = mount({
      props: {},
      components: { LocalScope },
      template: `<LocalScope foo="foo" bar="bar" v-slot="{ foo, bar }">
        <div>{{ foo }} {{ bar }}</div>
      </LocalScope>`,
    })
    expect(wrapper.text()).toBe('foo bar')
  })
})
