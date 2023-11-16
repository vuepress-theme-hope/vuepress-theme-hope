---
home: true
title: 主页
icon: home
heroText: vuepress-plugin-auto-catalog
tagline: 为 VuePress2 提供目录页生成与目录组件
actions:
  - text: 快速上手
    icon: lightbulb
    link: ./guide.html
    type: primary

  - text: 配置
    icon: tools
    link: ./config.html

features:
  - title: 一行代码生成目录
    icon: circle-check
    details: 通过开箱即用的自动目录组件轻松添加目录

  - title: 自动生成目录页
    icon: file
    details: 为每个目录自动生成目录页

footer: 使用 <a href="https://theme-hope.vuejs.press/zh/" target="_blank">VuePress Theme Hope</a> 主题 | MIT 协议, 版权所有 © 2019-present Mr.Hope

copyright: false
---

## 使用插件

### 安装

::: code-tabs#shell

@tab pnpm

```bash
pnpm add -D vuepress-plugin-auto-catalog
```

@tab yarn

```bash
yarn add -D vuepress-plugin-auto-catalog
```

@tab npm

```bash
npm i -D vuepress-plugin-auto-catalog
```

:::

### 使用

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { autoCatalogPlugin } from "vuepress-plugin-auto-catalog";

export default defineUserConfig({
  plugins: [
    autoCatalogPlugin({
      //插件选项
    }),
  ],
});
```

@tab JS

```js
// .vuepress/config.js
import { autoCatalogPlugin } from "vuepress-plugin-auto-catalog";

export default {
  plugins: [
    autoCatalogPlugin({
      //插件选项
    }),
  ],
};
```

:::
