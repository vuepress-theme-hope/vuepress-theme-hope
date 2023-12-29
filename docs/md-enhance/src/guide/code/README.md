---
title: Coding
icon: laptop-code
dir:
  collapsible: false
  order: 5
index: false
---

<!-- #region intro -->

This plugin provides the following features to enhance coding:

- Code Tabs: Add tabs to your code block.
- Code Demo: Display and run code snippets in browser.
- Playground: Embed external playground site.
- Kotlin Playground: Reactive kotlin playground.
- Vue Playground: Reactive vue playground.

<!-- #endregion intro -->

<!-- more -->

## Demo

<!-- #region demo -->

### Code Tabs

::: code-tabs#shell

@tab pnpm

```bash
pnpm add -D vuepress-plugin-md-enhance
```

@tab yarn

```bash
yarn add -D vuepress-plugin-md-enhance
```

@tab:active npm

```bash
npm i -D vuepress-plugin-md-enhance
```

:::

- [View Detail](./code-tabs.md)

### Code Demo

::: normal-demo A normal demo

```html
<h1>VuePress Theme Hope</h1>
<p>Is <span id="very">very</span> powerful!</p>
```

```js
document.querySelector("#very").addEventListener("click", () => {
  alert("Very powerful!");
});
```

```css
span {
  color: red;
}
```

:::

- [View Detail](./demo/README.md)

### Playground

::: playground#ts TS demo

@file index.ts

```ts
const msg = "hello world";

const speak = (msg: string) => console.log(msg);

speak(msg);
```

:::

- [View Detail](./playground.md)

### Kotlin Playground

::: kotlin-playground Kotlin Playground

@file main.kt

```kotlin
class Contact(val id: Int, var email: String)

fun main(args: Array<String>) {
    val contact = Contact(1, "mary@gmail.com")
    println(contact.id)
}
```

:::

- [View Detail](./kotlin-playground.md)

### Vue Playground

::: vue-playground Vue Playground

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

- [View Detail](./vue-playground.md)

### Sandpack

::: sandpack#vue Vue Playground

@file src/App.vue

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

- [View Detail](./sandpack.md)

<!-- #endregion demo -->
