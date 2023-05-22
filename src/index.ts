import type { AllowedComponentProps, ComponentCustomProps, VNode, VNodeProps } from 'vue-demi'
import { camelize, reactive } from 'vue-demi'

export function LocalScope<T extends object>(
  __VLS_props: T & VNodeProps & AllowedComponentProps & ComponentCustomProps,
  __VLS_ctx?: Pick<Exclude<typeof __VLS_setup, undefined>, 'slots'>,
  __VLS_setup?: {
    props: {} & T
    slots: { default?: ((props: T) => any) | undefined }
  },
) {
  const propKeys = Object.keys(__VLS_props || {}) as (keyof typeof __VLS_props)[]
  const p = propKeys.reduce((total, key) => {
    total[key] = __VLS_props[key]
    total[camelize(key as string)] = total[key]
    return total
  }, {} as any)
  return __VLS_ctx?.slots.default?.(p || {}) as VNode & { __ctx?: typeof __VLS_setup }
}

export type ComputedWithProps<T> = Record<string, (p: T) => any>

export function createLocalScope<T = any, C extends ComputedWithProps<T> = ComputedWithProps<T>>(cs: C) {
  const propKeys = Object.keys(cs || {}) as (keyof typeof cs)[]
  function create(props: any) {
    const reactivity = {} as any
    for (const k of propKeys)
      reactivity[k] = cs[k](props)
    return reactive(reactivity)
  }
  return (
    __VLS_props: T & VNodeProps & AllowedComponentProps & ComponentCustomProps,
    __VLS_ctx?: Pick<Exclude<typeof __VLS_setup, undefined>, 'slots'>,
    __VLS_setup?: {
      props: {} & T
      slots: { default?: ((props: { [key in keyof C]: ReturnType<C[key]> }) => any) | undefined }
    },
  ) => {
    return __VLS_ctx?.slots.default?.(create(__VLS_props)) as VNode & { __ctx?: typeof __VLS_setup }
  }
}
