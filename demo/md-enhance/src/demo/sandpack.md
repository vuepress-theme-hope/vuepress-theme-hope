---
title: Sandpack
---

## Demo

### Vue

::: sandpack#vue Vue demo

@file src/App.vue

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

@file src/Comp.vue

```vue
<template>
  <div>Comp</div>
</template>
```

:::

::: sandpack#vue Vue demo with customized options

@file src/App.vue

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

@options

```js
{
  readOnly: true,
  showReadOnly: true
}
```

:::

### React demo

::: sandpack#react React demo

@file /App.js

```js
export default function App() {
  return <h1>Hello world</h1>;
}
```

:::

### Angular demo

::: sandpack#angular Angular demo

@file /src/app/app.component.ts

```ts
import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  helloWorld = "Hello world";
}
```

:::
