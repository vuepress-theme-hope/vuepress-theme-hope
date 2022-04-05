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

:::: code-group

::: code-group-item yarn

```bash
yarn add -D vuepress-plugin-sitemap2@next
```

:::

::: code-group-item npm

```bash
npm i -D vuepress-plugin-sitemap2@next
```

:::

::::

### 使用

:::: code-group

::: code-group-item TS

```ts
// .vuepress/config.ts
import { sitemap } from "vuepress-plugin-sitemap2";

export default {
  plugins: [
    sitemap({
      // 配置选项
    }),
  ],
};
```

:::

::: code-group-item JS

```js
// .vuepress/config.js
const { sitemap } = require("vuepress-plugin-sitemap2");

module.exports = {
  plugins: [
    sitemap({
      // 配置选项
    }),
  ],
};
```

:::

::::
