---
home: true
title: 主页
icon: home
heroImage: /logo.svg
heroText: vuepress-plugin-search-pro
tagline: VuePress2 的客户端搜索插件
actions:
  - text: 快速上手 💡
    link: /zh/guide.html
    type: primary

  - text: 配置 🛠
    link: /zh/config.html

footer: MIT Licensed | Copyright © 2022-present Mr.Hope
copyrightText: false
---

## 使用插件

### 安装

::: code-tabs#shell

@tab pnpm

```bash
pnpm add -D vuepress-plugin-search-pro@next
```

@tab yarn

```bash
yarn add -D vuepress-plugin-search-pro@next
```

@tab npm

```bash
npm i -D vuepress-plugin-search-pro@next
```

:::

### 使用

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { searchProPlugin } from "vuepress-plugin-search-pro";

export default {
  plugins: [
    searchProPlugin({
      // 配置选项
    }),
  ],
};
```

@tab JS

```js
// .vuepress/config.js
import { searchProPlugin } from "vuepress-plugin-search-pro";

export default {
  plugins: [
    searchProPlugin({
      // 配置选项
    }),
  ],
};
```

:::
