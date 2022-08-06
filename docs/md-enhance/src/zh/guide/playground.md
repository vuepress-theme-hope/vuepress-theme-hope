---
title: Playground
icon: code
---

插件为你带来了 Playground 支持。

<!-- more -->

## 配置

::: code-tabs#config

@tab TS

```ts {8}
// .vuepress/config.ts
import { mdEnhance } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhance({
      // 配置你的 playground
      playground: true, // 使用默认配置
    }),
  ],
};
```

@tab JS

```js {8}
// .vuepress/config.js
const { mdEnhance } = require("vuepress-plugin-md-enhance");

module.exports = {
  plugins: [
    mdEnhance({
      // 配置你的 playground
      playground: true, // 使用默认配置
    }),
  ],
};
```

:::

你也可以使用 `PlaygroundOptions` 自定义你的 playground 配置：

::: code-tabs#config

@tab TS

```ts {8-21}
// .vuepress/config.ts
import { mdEnhance } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhance({
      // 配置你的 playground
      playground: {
        mode: "external", // 使用外置模式
        external: {
          base: "https://sfc.vuejs.org/", // 使用 vue sfc playground.
          defaultImportsMap: "import-map.json",
        },
        internal: {
          defaultImportsMap: "import-map.json",
          showCode: false, // 不显示代码
          showCompileOutput: false, // 不显示 js, css, ssr 面板
          showImportMap: true, // 显示 import map
          clearConsole: false, // 不清空控制台
        },
      },
    }),
  ],
};
```

@tab JS

```js {8-21}
// .vuepress/config.js
const { mdEnhance } = require("vuepress-plugin-md-enhance");

module.exports = {
  plugins: [
    mdEnhance({
      // 配置你的 playground
      playground: {
        mode: "external", // 使用外置模式
        external: {
          base: "https://sfc.vuejs.org/", // 使用 vue sfc playground.
          defaultImportsMap: "import-map.json",
        },
        internal: {
          defaultImportsMap: "import-map.json",
          showCode: false, // 不显示代码
          showCompileOutput: false, // 不显示 js, css, ssr 面板
          showImportMap: true, // 显示 import map
          clearConsole: false, // 不清空控制台
        },
      },
    }),
  ],
};
```

:::

## 使用

我们可以使用 `external` 和 `internal` 模式。

- `external` 模式嵌入 `iframe` 来展示 playground。你也可以使用自己的在线 playground，外置 playground 会比较灵活。
- `internal` 模式使用 `@vue/repl` 直接渲染代码。

## 案例

### 外置模式

#### 基础用法

::: playground 基础用法

@file App.vue

```vue
<script setup>
import { ref } from "vue";

const msg = ref("Hello World!");
</script>

<template>
  <h1>{{ msg }}</h1>
  <input v-model="msg" />
</template>
```

:::

:::: details 代码

````md
::: playground 基础用法

@file App.vue

```vue
<script setup>
import { ref } from "vue";

const msg = ref("Hello World!");
</script>

<template>
  <h1>{{ msg }}</h1>
  <input v-model="msg" />
</template>
```

:::
````

::::

#### 高级用法

本示例向你展示如何自定义你的 playground。

- 使用你自己的 playground
- 使用你自己的 import map
- 应用额外的配置到你的 playground

::: playground 高级用法
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
<template>
  <div>Comp</div>
  <el-row class="mb-4">
    <el-button>Default</el-button>
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
    <el-button>中文</el-button>
  </el-row>
</template>
```

@imports user-imports.json

```json
{
  "imports": {
    "lodash-es": "https://cdn.jsdelivr.net/npm/lodash-es@4.17.21/lodash.min.js"
  }
}
```

@settings

```json
{
  "mode": "external",
  "external": {
    "base": "https://vue-sfc-playground.vercel.app/",
    "options": {
      "showOutput": "true"
    }
  }
}
```

:::

:::: details 代码

````md
::: playground 高级用法
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
<template>
  <div>Comp</div>
  <el-row class="mb-4">
    <el-button>Default</el-button>
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
    <el-button>中文</el-button>
  </el-row>
</template>
```

@imports user-imports.json

```json
{
  "imports": {
    "lodash-es": "https://cdn.jsdelivr.net/npm/lodash-es@4.17.21/lodash.min.js"
  }
}
```

@settings

```json
{
  "mode": "external",
  "external": {
    "base": "https://vue-sfc-playground.vercel.app/",
    "options": {
      "showOutput": "true"
    }
  }
}
```

:::
````

::::

### 内置模式

#### 基础用法

::: playground 基础用法
@file App.vue

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

@settings

```json
{
  "mode": "internal"
}
```

:::

:::: details 代码

````md
::: playground 基础用法
@file App.vue

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

@settings

```json
{
  "mode": "internal"
}
```

:::
````

::::

#### 高级用法

显示 playground 的 `JS`, `CSS`, `SSR` 面板，并显示代码编辑器。

Playground 的 `key` 是自动产生的。它是基于标题计算的。
你也可以自己指定它，使用 `playground#customId` 形式。

::: playground#customId 高级用法
@file App.vue

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

@settings

```json
{
  "mode": "internal",
  "internal": {
    "showCode": "true",
    "showCompileOutput": "true"
  }
}
```

:::

:::: details 代码

````md
::: playground#customId 高级用法
@file App.vue

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

@settings

```json
{
  "mode": "internal",
  "internal": {
    "showCode": "true",
    "showCompileOutput": "true"
  }
}
```

:::
````

::::
