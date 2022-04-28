---
home: true
title: 主页
icon: home
heroImage: /logo.svg
heroText: vuepress-plugin-comment2
tagline: 评论与阅读量插件
actions:
  - text: 快速上手 💡
    link: /zh/guide/
    type: primary

  - text: 配置 🛠
    link: /zh/config/

footer: MIT Licensed | Copyright © 2019-present Mr.Hope
copyright: false
---

## 安装

:::: code-group

::: code-group-item pnpm

```bash
pnpm add -D vuepress-plugin-comment2@next
```

:::

::: code-group-item yarn

```bash
yarn add -D vuepress-plugin-comment2@next
```

:::

::: code-group-item npm

```bash
npm i -D vuepress-plugin-comment2@next
```

:::

::::

## 使用

:::: code-group

::: code-group-item TS

```ts
// .vuepress/config.ts
import { commentPlugin } from "vuepress-plugin-comment2";

export default {
  plugins: [
    commentPlugin({
      // 插件选项
    }),
  ],
};
```

:::

::: code-group-item JS

```js
// .vuepress/config.js
const { commentPlugin } = require("vuepress-plugin-comment2");

module.exports = {
  plugins: [
    commentPlugin({
      // 插件选项
    }),
  ],
};
```

:::

::::

## 从 V1 迁移

详见 [迁移指南](./migration.md)
