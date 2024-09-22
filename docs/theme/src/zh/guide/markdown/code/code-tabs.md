---
title: 代码块分组
icon: code
category:
  - Markdown
tag:
  - Markdown
  - 代码组
---

主题为你带来了代码块分组支持。

<!-- more -->

## 配置

```js {7} title=".vuepress/config.js"
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      markdownTab: {
        codeTabs: true,
      },
    },
  }),
};
```

## 使用

此功能和 [选项卡](../content/tabs.md) 相同，但它是专门为代码块构建的。

代码选项卡只会渲染 `@tab` 标记后的第一个代码块，其他 Markdown 内容将被忽略。

## 演示

:::: md-demo

安装 VuePress:

::: code-tabs#shell

@tab pnpm

```bash
pnpm add -D vuepress
```

@tab yarn

```bash
yarn add -D vuepress
```

@tab:active npm

```bash
npm i -D vuepress
```

:::

安装 VuePress Theme Hope:

::: code-tabs#shell

@tab pnpm

```bash
pnpm add -D vuepress-theme-hope
```

@tab yarn

```bash
yarn add -D vuepress-theme-hope
```

@tab:active npm

```bash
npm i -D vuepress-theme-hope
```

:::

::::
