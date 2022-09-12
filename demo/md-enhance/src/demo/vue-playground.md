---
title: Vue Playground
---

## Demo

::: vue-playground Vue Playground

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

:::

::: vue-playground Vue Playground with cutomized settings and import

@file App.vue

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
    "@vueuse/core": "https://cdn.jsdelivr.net/npm/@vueuse/core"
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
