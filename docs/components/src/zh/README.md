---
home: true
title: 主页
icon: home
heroImage: /logo.svg
heroText: vuepress-plugin-components
tagline: 面向 VuePress2 的常用组件
actions:
  - text: 快速上手 💡
    link: ./guide/
    type: primary

  - text: 配置 🛠
    link: ./config.html

footer: 使用 <a href="https://theme-hope.vuejs.press/zh/" target="_blank">VuePress Theme Hope</a> 主题 | MIT 协议, 版权所有 © 2019-present Mr.Hope

copyright: false
---

## 安装

::: code-tabs#shell

@tab pnpm

```bash
pnpm add -D vuepress-plugin-components
```

@tab yarn

```bash
yarn add -D vuepress-plugin-components
```

@tab npm

```bash
npm i -D vuepress-plugin-components
```

:::

## 使用

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { componentsPlugin } from "vuepress-plugin-components";

export default {
  plugins: [
    componentsPlugin({
      // 插件选项
    }),
  ],
};
```

@tab JS

```js
// .vuepress/config.js
import { componentsPlugin } from "vuepress-plugin-components";

export default {
  plugins: [
    componentsPlugin({
      // 插件选项
    }),
  ],
};
```

:::
