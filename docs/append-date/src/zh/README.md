---
home: true
title: 主页
icon: home
heroText: vuepress-plugin-append-date

footer: 使用 <a href="https://theme-hope.vuejs.press/zh/" target="_blank">VuePress Theme Hope</a> 主题 | MIT 协议, 版权所有 © 2019-present Mr.Hope

copyright: false
---

::: important

此插件需要 [`@vuepress/plugin-git`][git] 一起使用。

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

```ts title=".vuepress/config.ts"
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

```js title=".vuepress/config.js"
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

追加时间时使用的 frontmatter 键名。

### format

- 类型: `"date" | "time" | "full"`
- 默认值: `"date"`

追加时间时使用的日期格式。

[git]: https://ecosystem.vuejs.press/zh/plugins/git.html
