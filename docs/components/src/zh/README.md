---
home: true
title: 主页
icon: home
heroImage: /logo.svg
heroText: "@mr-hope/vuepress-plugin-components"
tagline: 组件库插件
actions:
  - text: 快速上手 💡
    link: /zh/guide.html
    type: primary

  - text: 配置 🛠
    link: /zh/config.html

footer: MIT Licensed | Copyright © 2019-present Mr.Hope
copyright: false
---

## 安装

::: code-tabs

@codetab pnpm

```bash
pnpm add -D @mr-hope/vuepress-plugin-components@next
```

@codetab yarn

```bash
yarn add -D vuepress-plugin-add-this@next
```

@codetab npm

```bash
npm i -D @mr-hope/vuepress-plugin-components@next
```

:::

## 使用

::: code-tabs

@codetab TS

```ts
// .vuepress/config.ts
import { componentsPlugin } from "@mr-hope/vuepress-plugin-components";

export default {
  plugins: [
    componentsPlugin({
      // 插件选项
    }),
  ],
};
```

@codetab JS

```js
// .vuepress/config.js
const { componentsPlugin } = require("@mr-hope/vuepress-plugin-components");

module.exports = {
  plugins: [
    componentsPlugin({
      // 插件选项
    }),
  ],
};
```

:::
