---
title: Vue 交互演示
icon: fab fa-vuejs
---

此插件通过 `@vue/repl` 提供 Vue 交互演示支持。

<!-- more -->

::: tip

由于我们提供了一个运行时编译器，我们引入了带有 TypeScript 支持的整个 `@vue/compiler-sfc` 包，因此整个 Vue Playground 块大于 4MB。 因此，只有在严重依赖交互式 Vue Playground 时才应使用它。

你可以使用 [Vue Demo](./demo/vue.md) 和 [交互演示 Vue 预设](./playground.md#vue) 作为替代。

:::

## 配置

::: code-tabs#config

@tab TS

```ts {8}
// .vuepress/config.ts
import { mdEnhance } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhance({
      // 启用 vue 交互演示
      vuePlayground: true,
    }),
  ],
};
```

@tab JS

```js {8}
// .vuepress/config.js
import { mdEnhance } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhance({
      // 启用 vue 交互演示
      vuePlayground: true,
    }),
  ],
};
```

:::

## 用法

要使用 vue 交互演示，你应该使用一个名为 `vue-playground` 的容器。

在其中，你可以使用 3 个指令：

- `@file 文件名` 紧跟文件的代码块
- `@import` 紧跟一个自定义“导入映射”的 json 块
- `@setting` 紧跟一个自定义设置的 json 块

你可以查看以下案例以查看更多详细信息。

## 高级

你可以在客户端配置文件中导入并使用 `defineVuePlaygroundConfig` 来自定义 Vue Playground 的默认配置:

```ts
// .vuepress/client.ts
import { defineClientConfig } from "@vuepress/client";
import { defineVuePlaygroundConfig } from "vuepress-plugin-md-enhance/client";

defineVuePlaygroundConfig({
  // 在此设置 @vue/repl 选项
});

export default defineClientConfig({
  // ...
});
```

## 案例

::: vue-playground Vue 交互演示

@file App.vue

```vue
<script setup>
import { ref } from "vue";

const msg = ref("你好交互演示!");
</script>

<template>
  <h1>{{ msg }}</h1>
  <input v-model="msg" />
</template>
```

:::

:::: details Code

````md
::: vue-playground Vue 交互演示

@file App.vue

```vue
<script setup>
import { ref } from "vue";

const msg = ref("你好交互演示!");
</script>

<template>
  <h1>{{ msg }}</h1>
  <input v-model="msg" />
</template>
```

:::
````

::::

::: vue-playground 自定义导入与映射的 Vue 交互演示

@file App.vue

```vue
<script setup>
import { ref } from "vue";
import Comp from "./Comp.vue";

const msg = ref("Hello Playground!");
</script>

<template>
  <h1>{{ msg }}</h1>
  <input v-model="msg" />
  <Comp />
</template>
```

@file Comp.vue

```vue
<script setup>
import { useBattery } from "@vueuse/core";
import { ref } from "vue";

const { charging, level } = useBattery();
</script>

<template>
  <h1>Battery status</h1>
  <p>Charging: {{ charging }}</p>
  <p>Level: {{ level * 100 }}%</p>
</template>
```

@import

```json
{
  "imports": {
    "@vueuse/core": "https://unpkg.com/@vueuse/core/index.mjs",
    "@vueuse/shared": "https://unpkg.com/@vueuse/shared/index.mjs",
    "vue-demi": "https://unpkg.com/vue-demi/lib/index.mjs"
  }
}
```

@setting

```json
{
  "showCompileOutput": true
}
```

:::

:::: details Code

````md
::: vue-playground 自定义导入与映射的 Vue 交互演示

@file App.vue

```vue
<script setup>
import { ref } from "vue";
import Comp from "./Comp.vue";

const msg = ref("Hello Playground!");
</script>

<template>
  <h1>{{ msg }}</h1>
  <input v-model="msg" />
  <Comp />
</template>
```

@file Comp.vue

```vue
<script setup>
import { useBattery } from "@vueuse/core";
import { ref } from "vue";

const { charging, level } = useBattery();
</script>

<template>
  <h1>Battery status</h1>
  <p>Charging: {{ charging }}</p>
  <p>Level: {{ level * 100 }}%</p>
</template>
```

@import

```json
{
  "imports": {
    "@vueuse/core": "https://unpkg.com/@vueuse/core/index.mjs",
    "@vueuse/shared": "https://unpkg.com/@vueuse/shared/index.mjs",
    "vue-demi": "https://unpkg.com/vue-demi/lib/index.mjs"
  }
}
```

@setting

```json
{
  "showCompileOutput": true
}
```

:::
````

::::
