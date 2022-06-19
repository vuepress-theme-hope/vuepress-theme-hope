---
home: true
title: 主页
icon: home
heroImage: /logo.svg
heroText: vuepress-plugin-redirect
tagline: VuePress2 的重定向插件
actions:
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

::: code-tabs#shell

@tab pnpm

```bash
pnpm add -D vuepress-plugin-redirect@next
```

@tab yarn

```bash
yarn add -D vuepress-plugin-redirect@next
```

@tab npm

```bash
npm i -D vuepress-plugin-redirect@next
```

:::

### 使用

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { redirectPlugin } from "vuepress-plugin-redirect";

export default {
  plugins: [
    redirectPlugin({
      // 配置选项
    }),
  ],
};
```

@tab JS

```js
// .vuepress/config.js
const { redirectPlugin } = require("vuepress-plugin-redirect");

module.exports = {
  plugins: [
    redirectPlugin({
      // 配置选项
    }),
  ],
};
```

:::
