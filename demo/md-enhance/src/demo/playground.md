---
title: Playground Demo
---

## Demo

### External mode

#### Customize imports

::: playground Playground demo

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

@imports

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

::: playground Playground demo2

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

@file Comp.vue

```vue
<template>
  <div>Comp</div>
</template>
```

@imports import_map.json

```json
{
  "imports": {
    "a": "b"
  }
}
```

@settings

```json
{
  "mode": "external",
  "external": {
    "base": "https://element-plus.run/"
  }
}
```

:::

#### Customize settings

::: playground Playground demo3

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

### Internal mode

::: playground Internal mode

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

::: playground Internal mode2 - show compile outpu

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
    "showCompileOutput": "true"
  }
}
```

:::
