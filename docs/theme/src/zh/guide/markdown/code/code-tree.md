---
title: 代码树
icon: file-code
category:
  - Markdown
tag:
  - Markdown
  - 代码树
---

将多个文件的代码块与文件树一起展示。

<!-- more -->

## 配置

```ts twoslash {5} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  markdown: {
    codeTree: true,
  },
});
```

你也可以传入对象以设置代码树的默认高度。

```ts twoslash {5-7} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  markdown: {
    codeTree: {
      height: "400px",
    },
  },
});
```

## 语法

将多个代码块包裹在 `code-tree` 容器中，并为代码块添加 `title="文件路径"` 属性以声明其所属文件。

- 容器标记后的文字会成为代码树的标题。
- `height` 声明代码树的高度，纯数字会被视为像素值。
- `entry` 声明默认打开的文件，代码块上的 `:active` 具有更高优先级。
- 没有 `title` 属性的代码块会被忽略，文件会按其路径排列。
- 未声明 `entry` 与 `:active` 时，默认打开第一个代码块。

### 嵌入目录

使用 `@[code-tree](目录路径)` 将目录中的所有代码文件渲染为代码树。以 `/` 开头的路径从源目录解析，其他路径从当前页面所在目录解析。

## 演示

:::: preview

::: code-tree 项目文件 height="320px" entry="src/index.ts"

```ts title="src/index.ts"
import { createApp } from "vue";

import App from "./App.vue";

createApp(App).mount("#app");
```

```vue title="src/App.vue"
<script setup>
import { ref } from "vue";

const msg = ref("Hello World!");
</script>

<template>
  <h1>{{ msg }}</h1>
</template>
```

```json title="package.json"
{
  "name": "demo",
  "scripts": {
    "dev": "vite"
  }
}
```

:::

::::

::: warning

代码树依赖高亮器的代码块标题功能，该功能在 `@vuepress/plugin-shiki` 与 `@vuepress/plugin-prismjs` 中默认启用。请不要禁用 `codeBlockTitle` 或用自定义渲染函数替换它，否则代码树不会渲染任何代码块。

:::
