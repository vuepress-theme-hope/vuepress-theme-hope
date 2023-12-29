---
home: true
title: 主页
icon: home
heroText: vuepress-plugin-append-date
tagline: 从 git 中获取日期信息并添加到 Frontmatter 中

footer: 使用 <a href="https://theme-hope.vuejs.press/zh/" target="_blank">VuePress Theme Hope</a> 主题 | MIT 协议, 版权所有 © 2019-present Mr.Hope

copyright: false
---

::: warning

此插件需要 `@vuepress/plugin-git` 一起使用。

:::

## 使用插件

### 安装

::: code-tabs#shell

@tab pnpm

```bash
pnpm add -D vuepress-plugin-append-date
```

@tab yarn

```bash
yarn add -D vuepress-plugin-append-date
```

@tab npm

```bash
npm i -D vuepress-plugin-append-date
```

:::

### 使用

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { appendDatePlugin } from "vuepress-plugin-append-date";

export default {
  plugins: [
    appendDatePlugin({
      //插件选项
    }),
  ],
};
```

@tab JS

```js
// .vuepress/config.js
import { appendDatePlugin } from "vuepress-plugin-append-date";

export default {
  plugins: [
    appendDatePlugin({
      //插件选项
    }),
  ],
};
```

:::

## 插件选项

### key

- 类型: `string`
- 默认值: `"date"`

Frontmatter 键名。

### format

- 类型: `"date" | "time" | "full"`
- 默认值: `"date"`

日期格式。
