# vue3-local-scope

[![NPM version](https://img.shields.io/npm/v/vue3-local-scope?color=a1b858&label=)](https://www.npmjs.com/package/vue3-local-scope)

Similar to [vue-local-scope](https://github.com/posva/vue-local-scope), for use in Vue 3 with full type hints.

## Usage

Vue3 Local Scope exports two things:

- **LocalScope**: a functional component that passes any props to the scoped slot with full type hints.
- **createLocalScope**: same as [vue-local-scope#createLocalScope](https://github.com/posva/vue-local-scope/tree/master#createlocalscope).

### LocalScope

LocalScope is the same as [vue-local-scope#LocalScope](https://github.com/posva/vue-local-scope/blob/master/README.md#localscope). It renders anything passed as the scoped slot. It allows you to avoid duplicating your code and provides full types.

```html
<template>
  <local-scope
    v-for="(it, i) in textures"
    :key="i"
    :x="offset.x + grid.w * (i % 4)"
    :y="offset.y + grid.h * (i / 4 | 0)"
    v-slot="{ x, y }"
  >
  <!-- The template correctly recognizes the types x, y -->
    <sprite
      :texture="it"
      :scale="0.5"
      :x="x"
      :y="y"
    />
    <text :x="x" :y="y - 40">
      {{ `rotate = ${it.rotate}` }}
    </text>
  </local-scope>
</template>

<script setup lang="ts">
import { LocalScope } from 'vue3-local-scope'
import { ref } from 'vue'
const textures = ref([])
// ....
</script>
```

As it is a functional component, you can return any number of elements, and LocalScope will be invoked whenever certain content in the same template changes.

## createLocalScope

Refer to [vue-local-scope#createLocalScope](https://github.com/posva/vue-local-scope/tree/master#createlocalscope).

## License

[MIT](./LICENSE) License © 2022 [hairyf](https://github.com/hairyf)