---
home: true
title: 主页
icon: home
heroImage: /logo.svg
heroText: vuepress-plugin-copy-code2
tagline: 为 VuePress2 提供代码块一键复制
actions:
  - text: 快速上手 💡
    link: /zh/guide.html
    type: primary

  - text: 配置 🛠
    link: /zh/config.html

footer: MIT Licensed | Copyright © 2019-present Mr.Hope
copyright: false
---

## 使用插件

### 安装

::: code-tabs#shell

@tab pnpm

```bash
pnpm add -D vuepress-plugin-copy-code2@next
```

@tab yarn

```bash
yarn add -D vuepress-plugin-copy-code2@next
```

@tab npm

```bash
npm i -D vuepress-plugin-copy-code2@next
```

:::

### 使用

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { copyCodePlugin } from "vuepress-plugin-copy-code2";

export default {
  plugins: [
    copyCodePlugin({
      // 插件选项
    }),
  ],
};
```

@tab JS

```js
// .vuepress/config.js
const { copyCodePlugin } = require("vuepress-plugin-copy-code2");

module.exports = {
  plugins: [
    copyCodePlugin({
      // 插件选项
    }),
  ],
};
```

:::

## 从 V1 迁移

详见 [迁移指南](./migration.md)
