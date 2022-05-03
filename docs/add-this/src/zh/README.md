---
home: true
title: 主页
icon: home
heroImage: /logo.svg
heroText: vuepress-plugin-add-this
tagline: 为 VuePress2 提供 addthis 支持
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

:::: code-group

::: code-group-item pnpm

```bash
pnpm add -D vuepress-plugin-add-this@next
```

:::

::: code-group-item yarn

```bash
yarn add -D vuepress-plugin-add-this@next
```

:::

::: code-group-item npm

```bash
npm i -D vuepress-plugin-add-this@next
```

:::

::::

### 使用

:::: code-group

::: code-group-item TS

```ts
// .vuepress/config.ts
import { addThisPlugin } from "vuepress-plugin-add-this";

export default {
  plugins: [addThisPlugin({ pubid: "你的 pubid" })],
};
```

:::

::: code-group-item JS

```js
// .vuepress/config.js
const { addThis } = addThisPlugin("vuepress-plugin-add-this");

module.exports = {
  plugins: [addThisPlugin({ pubid: "你的 pubid" })],
};
```

:::

::::

## 从 V1 迁移

此插件与 V1 相比没有变更。
