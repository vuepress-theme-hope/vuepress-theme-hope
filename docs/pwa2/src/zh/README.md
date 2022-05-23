---
home: true
title: 主页
icon: home
heroImage: /logo.svg
heroText: vuepress-plugin-pwa2
tagline: 渐进式网页应用 (Progressive Web App) 支持
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
pnpm add -D vuepress-plugin-pwa2@next
```

@tab yarn

```bash
yarn add -D vuepress-plugin-pwa2@next
```

@tab npm

```bash
npm i -D vuepress-plugin-pwa2@next
```

:::

### 使用

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { pwaPlugin } from "vuepress-plugin-pwa2";

export default {
  plugins: [
    pwaPlugin({
      // 你的选项
    }),
  ],
};
```

@tab JS

```js
// .vuepress/config.js
const { pwaPlugin } = require("vuepress-plugin-pwa2");

module.exports = {
  plugins: [
    pwaPlugin({
      // 你的选项
    }),
  ],
};
```

:::

::: tip

如果你正在使用本插件，我们推荐在你的 VuePress 配置文件中设置 `shouldPrefetch: false`。

:::
