import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { createLocalScope } from '../src'

describe('createLocalScope', () => {
  it('works with v-slot', () => {
    const LocalScope = createLocalScope({
      foo: ({ foo }) => foo.toUpperCase(),
      bar: ({ bar }) => bar,
      joined: ({ items }) => items.join(','),
    })

    const wrapper = mount({
      template:
      `<LocalScope :foo="foo" :bar="bar" :items="['one', 'two']" v-slot="{ foo, bar, joined }">
        <div>{{ foo }} {{ bar }}; {{ joined }}</div>
      </LocalScope>`,
      components: { LocalScope },
      data: () => ({ foo: 'foo', bar: 'bar' }),
    })

    expect(wrapper.text()).toBe('FOO bar; one,two')
  })
})
