---
home: true
title: 主页
icon: home
heroImage: /logo.svg
heroText: vuepress-plugin-seo2
tagline: 向你的网页注入 <meta>，来增强你网页的 SEO。
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

::: code-group-item yarn

```bash
yarn add -D vuepress-plugin-seo2@next
```

:::

::: code-group-item npm

```bash
npm i -D vuepress-plugin-seo2@next
```

:::

::::

### 使用

:::: code-group

::: code-group-item ts

```ts
// .vuepress/config.ts
import { seo } from "vuepress-plugin-seo2";

export default {
  plugins: [
    seo({
      // 你的选项
    }),
  ],
};
```

:::

::: code-group-item js

```js
// .vuepress/config.js
const { seo } = require("vuepress-plugin-seo2");

module.exports = {
  plugins: [
    seo({
      // 你的选项
    }),
  ],
};
```

:::

::::
