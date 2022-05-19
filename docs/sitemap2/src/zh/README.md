---
home: true
title: 主页
icon: home
heroImage: /logo.svg
heroText: vuepress-plugin-sitemap2
tagline: VuePress2 的 Sitemap 生成
action:
  - text: 快速上手 💡
    link: /zh/guide.html
    type: primary

  - text: 配置 🛠
    link: /zh/config.html

footer: MIT Licensed | Copyright © 2019-present Mr.Hope
copyrightText: false
---

## 使用插件

### 安装

::: code-tabs

@codetab pnpm

```bash
pnpm add -D vuepress-plugin-sitemap2@next
```

@codetab yarn

```bash
yarn add -D vuepress-plugin-sitemap2@next
```

@codetab npm

```bash
npm i -D vuepress-plugin-sitemap2@next
```

:::

### 使用

::: code-tabs

@codetab TS

```ts
// .vuepress/config.ts
import { sitemapPlugin } from "vuepress-plugin-sitemap2";

export default {
  plugins: [
    sitemapPlugin({
      // 配置选项
    }),
  ],
};
```

@codetab JS

```js
// .vuepress/config.js
const { sitemapPlugin } = require("vuepress-plugin-sitemap2");

module.exports = {
  plugins: [
    sitemapPlugin({
      // 配置选项
    }),
  ],
};
```

:::
