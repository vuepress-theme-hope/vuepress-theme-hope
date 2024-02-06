---
title: Sandpack 交互演示
icon: code
---

<!-- #region before -->

基于 `sandpack-vue3` 的 Sandpack 交互演示支持。

<!-- more -->

::: tip

如果你需要重度依赖 Sandpack 交互演示，你才应该使用本插件。

:::

## 配置

在你的项目中安装 `sandpack-vue3`:

::: code-tabs#shell

@tab pnpm

```bash
pnpm add -D sandpack-vue3
```

@tab yarn

```bash
yarn add -D sandpack-vue3
```

@tab npm

```bash
npm i -D sandpack-vue3
```

:::

之后启用它:

<!-- #endregion before -->

::: code-tabs#config

@tab TS

```ts {8} title=".vuepress/config.ts"
import { mdEnhance } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhance({
      // 启用 Sandpack 交互演示
      sandpack: true,
    }),
  ],
};
```

@tab JS

```js {8} title=".vuepress/config.js"
import { mdEnhance } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhance({
      // 启用 Sandpack 交互演示
      sandpack: true,
    }),
  ],
};
```

:::

<!-- #region after -->

## 使用

要使用交互演示，你应该使用一个名为 `sandpack#template` 的容器。

在其中，你可以使用 3 个指令：

- `@file FullPathFile` 紧跟文件的代码块，同时也支持文件选项，例如：`@file FullPathFile [active readOnly hidden]`
- `@options` 紧跟一个自定义 "options" 的 javascript 代码块
- `@setup` 紧跟一个自定义 "customSetup" 的 javascript 代码块

你可以查看以下演示以查看更多详细信息。

你可以在客户端配置文件中引入并调用 `defineSandpackConfig` 来自定义 `sandpack-vue3` ：

```ts title=".vuepress/client.ts"
import { defineClientConfig } from "vuepress/client";
import { defineSandpackConfig } from "vuepress-plugin-md-enhance/client";

defineSandpackConfig({
  // 这里是 sandpack 配置
});

export default defineClientConfig({
  // ...
});
```

## 示例

:::: md-demo Vue 示例

::: sandpack#vue Vue 示例

@file /src/App.vue

```vue
<script setup>
import { ref } from "vue";

const msg = ref("Hello Playground!");
</script>

<template>
  <h1>{{ msg }}</h1>
  <input v-model="msg" />
</template>
```

:::

::::

:::: md-demo 带自定义设置的 Vue 示例

::: sandpack#vue 带自定义设置的 Vue 示例

@file /src/App.vue

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

@file /src/Comp.vue

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

@options

```js
{
  activeFile: "/src/Comp.vue",
}
```

@setup

```js
{
  dependencies: {
    "@vueuse/core": "latest",
    "@vueuse/shared": "latest",
    "vue-demi": "latest",
  }
}
```

:::

::::

:::: md-demo 带文件选项的 Vue 示例

::: sandpack#vue 带文件选项的 Vue 示例

@file /src/App.vue [readOnly]

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

@file /src/Comp.vue [active]

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

@setup

```js
{
  dependencies: {
    "@vueuse/core": "latest",
    "@vueuse/shared": "latest",
    "vue-demi": "latest",
  }
}
```

:::

::::

:::: md-demo React 示例

::: sandpack#react React 示例 [rtl theme=dark]

@file /App.js

```js
export default function App() {
  return <h1>Hello world</h1>;
}
```

:::

::::

<!-- #endregion after -->
