---
title: 代码
icon: laptop-code
dir:
  collapsible: false
  order: 5
index: false
---

<!-- #region intro -->

该插件提供以下功能来增强代码编写。

- 代码选项卡：为代码块添加选项卡。
- 代码演示：在浏览器中显示和运行代码片段。
- 交互演示：嵌入外部演示站点。
- Kotlin 交互演示：响应式 Kotlin 演示。
- Vue 交互演示：响应式 Vue 演示。

<!-- #endregion intro -->

<!-- more -->

## 案例

<!-- #region demo -->

### 代码选项卡

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

- [查看详情](./code-tabs.md)

### 代码演示

::: normal-demo 一个普通 Demo

```html
<h1>VuePress Theme Hope</h1>
<p><span id="very">非常</span>强大!</p>
```

```js
document.querySelector("#very").addEventListener("click", () => {
  alert("非常强大");
});
```

```css
span {
  color: red;
}
```

:::

- [查看详情](./demo/README.md)

### 交互演示

::: playground#ts TS 案例

@file index.ts

```ts
const msg = "hello world";

const speak = (msg: string) => console.log(msg);

speak(msg);
```

:::

- [查看详情](./playground.md)

### Kotlin 交互演示

::: kotlin-playground Kotlin 交互演示

@file main.kt

```kotlin
class Contact(val id: Int, var email: String)

fun main(args: Array<String>) {
    val contact = Contact(1, "mary@gmail.com")
    println(contact.id)
}
```

:::

- [查看详情](./kotlin-playground.md)

### Vue 交互演示

::: vue-playground Vue 交互演示

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

- [查看详情](./vue-playground.md)

### Sandpack 交互演示

::: sandpack#vue Vue 交互演示

@file /src/App.vue

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

- [查看详情](./sandpack.md)

<!-- #endregion demo -->
