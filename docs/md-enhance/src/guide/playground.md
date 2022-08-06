---
title: Playground
icon: code
---

The plugin provides you playground support.

<!-- more -->

## Config

::: code-tabs#config

@tab TS

```ts {8}
// .vuepress/config.ts
import { mdEnhance } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhance({
      // playground config here
      playground: true, // use default settings
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
      // playground config here
      playground: true, // use default settings
    }),
  ],
};
```

:::

You can also customize your playground config by using `PlaygroundOptions`:

::: code-tabs#config

@tab TS

```ts {8-21}
// .vuepress/config.ts
import { mdEnhance } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhance({
      // playground config here
      playground: {
        mode: "external", // use external mode
        external: {
          base: "https://sfc.vuejs.org/", // use the vue sfc playground.
          defaultImportsMap: "import-map.json",
        },
        internal: {
          defaultImportsMap: "import-map.json",
          showCode: false, // hide code
          showCompileOutput: false, // hide js, css, ssr panel
          showImportMap: true, // show import map
          clearConsole: false, // do not clear console message
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
      // playground config here
      playground: {
        mode: "external", // use external mode
        external: {
          base: "https://sfc.vuejs.org/", // use the vue sfc playground.
          defaultImportsMap: "import-map.json",
        },
        internal: {
          defaultImportsMap: "import-map.json",
          showCode: false, // hide code
          showCompileOutput: false, // hide js, css, ssr panel
          showImportMap: true, // show import map
          clearConsole: false, // do not clear console message
        },
      },
    }),
  ],
};
```

:::

## Usage

We can use `external` and `internal` mode.

- `external` mode can embed an `iframe` to show the playground. You can also use your own online playground, which is more flexible.
- `internal` mode can directly render the code by using the `@vue/repl`.

## Demo

### External mode

#### Basic usage

::: playground Basic usage

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

:::: details Code

````md
::: playground Basic usage

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

#### Advanced usage

This example shows you how to customize your playground.

- Use your own playground
- Use your own import map
- Apply extra options to your playground

::: playground Advanced usage
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

:::: details Code

````md
::: playground Advanced usage
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

### Internal mode

#### Basic usage

::: playground Basic usage
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

:::: details Code

````md
::: playground Basic usage
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

#### Advanced usage

Display the playground, show `JS`, `CSS`, `SSR` panel, and show the code editor.

The playground's `key` is automaticlly generated. And it's calculated based on the title.
You can also specify it yourself by using `playground#customId`.

::: playground#customId Advanced usage
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

:::: details Code

````md
::: playground#customId Advanced usage
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
