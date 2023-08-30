---
title: Sandpack 交互演示
icon: code
---

插件为你带来了 Sandpack 交互演示支持。

<!-- more -->

::: tip

如果你需要重度依赖 Sandpack 交互演示，你才应该使用本插件。

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
      // 启用 Sandpack 交互演示
      sandpack: true,
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
      // 启用 Sandpack 交互演示
      sandpack: true,
    }),
  ],
};
```

:::

## 使用

要使用交互演示，你应该使用一个名为 `sandpack#template` 的容器。

在其中，你可以使用 3 个指令：

- `@file FullPathFile` 紧跟文件的代码块，同时也支持文件选项，例如：`@file FullPathFile {active readOnly hidden}`
- `@options` 紧跟一个自定义 "options" 的 javascript 代码块
- `@setup` 紧跟一个自定义 "customSetup" 的 javascript 代码块

你可以查看以下演示以查看更多详细信息。

你可以在客户端配置文件中引入并调用 `defineSandpackConfig` 来自定义 `sandpack-vue3` ：

```ts
// .vuepress/client.ts
import { defineClientConfig } from "@vuepress/client";
import { defineSandpackConfig } from "vuepress-plugin-md-enhance/client";

defineSandpackConfig({
  // 这里是 sandpack 配置
});

export default defineClientConfig({
  // ...
});
```

## 示例

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

:::: details 代码

````md
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
````

::::

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

:::: details 代码

````md
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
````

::::

::: sandpack#vue 带文件选项的 Vue 示例

@file /src/App.vue {readOnly}

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

@file /src/Comp.vue {active}

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

:::: details Code

````md
::: sandpack#vue 带文件选项的 Vue 示例

@file /src/App.vue {readOnly}

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

@file /src/Comp.vue {active}

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
````

::::

::: sandpack#react React 示例

@file /App.js

```js
export default function App() {
  return <h1>Hello world</h1>;
}
```

:::

:::: details 代码

````md
::: sandpack#react React 示例

@file /App.js

```js
export default function App() {
  return <h1>Hello world</h1>;
}
```

:::
````

::::
