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

You can also customize your playground config by using `PlaygroundOptions`, i.e:

::: code-tabs#config

@tab TS

```ts {8-22}
// .vuepress/config.ts
import { mdEnhance } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhance({
      // playground config here
      playground: {
        mode: "external",
        external: {
          base: "https://sfc.vuejs.org/",
          defaultImportsMap: "import-map.json",
        },
        internal: {
          defaultImportsMap: "import-map.json",
          autoResize: true,
          showCode: true,
          showCompileOutput: false,
          showImportMap: true,
          clearConsole: false,
        },
      },
    }),
  ],
};
```

@tab JS

```js {8-22}
// .vuepress/config.js
const { mdEnhance } = require("vuepress-plugin-md-enhance");

module.exports = {
  plugins: [
    mdEnhance({
      // playground config here
      playground: {
        mode: "external",
        external: {
          base: "https://sfc.vuejs.org/",
          defaultImportsMap: "import-map.json",
        },
        internal: {
          defaultImportsMap: "import-map.json",
          autoResize: true,
          showCode: true,
          showCompileOutput: false,
          showImportMap: true,
          clearConsole: false,
        },
      },
    }),
  ],
};
```

:::

Detail config is here:

```ts
export type PlaygroundMode = "internal" | "external";

export interface PlaygroundOptions {
  mode?: PlaygroundMode;
  external?: PlaygroundExternalOptions;
  internal?: PlaygroundInternalOptions;
}

export interface PlaygroundExternalOptions {
  base?: string;
  defaultImportsMap?: string;
  options?: Record<string, string>;
}

export interface PlaygroundInternalOptions {
  defaultVueRuntimeURL?: string;
  vueVersion?: string;
  defaultImportsMap?: string;
  autoResize?: boolean;
  showCode?: boolean;
  showCompileOutput?: boolean;
  showImportMap?: boolean;
  clearConsole?: boolean;
  layout?: string;
  sfcOptions?: SFCOptions;
  ssr?: boolean;
}
```

## Usage

we can use `external` and `internal` mode.

- `external` mode can use your own playground, which is more flexible.
- `internal` mode can directly render the code.

## Demo

### External mode

#### Customize imports

:::: playground Playground demo

::: file App.vue

```vue
<script setup>
import { ref } from "vue";

import Comp from "./Comp.vue";

const msg = ref("Hello World!");
</script>

<template>
  <h1>{{ msg }}</h1>
  <input v-model="msg" />
  <Comp />
</template>
```

:::
::: file Comp.vue

```vue
<template>
  <div>Comp</div>
</template>
```

:::
::: imports

```json
{
  "imports": {
    "vue": "https://sfc.vuejs.org/vue.runtime.esm-browser.js"
  }
}
```

:::
::::

#### Customize imports map file

:::: playground Playground demo2
::: file App.vue

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
::: file Comp.vue

```vue
<template>
  <div>Comp</div>
</template>
```

:::
::: imports import_map.json

```json
{
  "imports": {
    "a": "b"
  }
}
```

:::
::: settings

```json
{
  "mode": "external",
  "external": {
    "base": "https://element-plus.run/"
  }
}
```

:::
::::

#### Customize settings

:::: playground Playground demo3
::: file App.vue

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
::: imports user-imports.json

```json
{
  "imports": {
    "lodash-es": "https://cdn.jsdelivr.net/npm/lodash-es@4.17.21/lodash.min.js"
  }
}
```

:::
::: settings

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
::::

### Internal mode

:::: playground Internal mode
::: file App.vue

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
::: settings

```json
{
  "mode": "internal"
}
```

:::
::::

:::: playground Internal mode2 - show compile outpu
::: file App.vue

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
::: settings

```json
{
  "mode": "internal",
  "internal": {
    "showCompileOutput": "true"
  }
}
```

:::
::::
