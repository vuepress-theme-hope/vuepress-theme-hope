---
title: Playground Demo
---

## Demo

### TS

::: playground#ts TS demo 1

@file index.ts

```ts
const msg = "hello world";

const speak = (msg: string) => console.log(msg);

speak(msg);
```

:::

::: playground#ts TS demo 2

@file index.ts

```ts
const msg = "hello world";

const speak = (msg: string) => console.log(msg);

speak(msg);
```

@settings

```json
{
  "target": "es5"
}
```

:::

### Vue

#### Customize imports

::: playground#vue Vue demo

@file App.vue

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

@file Comp.vue

```vue
<template>
  <div>Comp</div>
</template>
```

@import

```json
{
  "imports": {
    "vue": "https://sfc.vuejs.org/vue.runtime.esm-browser.js"
  }
}
```

:::

#### Customize settings

::: playground#vue Vue demo 2

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

@import

```json
{
  "imports": {
    "lodash-es": "https://cdn.jsdelivr.net/npm/lodash-es@4.17.21/lodash.min.js"
  }
}
```

@setting

```json
{
  "service": "https://vue-sfc-playground.vercel.app/",
  "showOutput": true
}
```

:::
