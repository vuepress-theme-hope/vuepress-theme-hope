---
home: true
title: 主页
icon: home
heroImage: /logo.svg
heroText: vuepress-plugin-auto-catalog
tagline: 为 VuePress2 提供自动目录页生成
actions:
  - text: 快速上手 💡
    link: /zh/guide.html
    type: primary

  - text: 配置 🛠
    link: /zh/config.html

footer: 使用 <a href="https://vuepress-theme-hope.github.io/v2/" target="_blank">VuePress Theme Hope</a> 主题 | MIT 协议, 版权所有 © 2019-present Mr.Hope

copyright: false
---

## 使用插件

### 安装

::: code-tabs#shell

@tab pnpm

```bash
pnpm add -D vuepress-plugin-auto-catalog@next
```

@tab yarn

```bash
yarn add -D vuepress-plugin-auto-catalog@next
```

@tab npm

```bash
npm i -D vuepress-plugin-auto-catalog@next
```

:::

### 使用

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { autoCatalogPlugin } from "vuepress-plugin-auto-catalog";

export default {
  plugins: [
    autoCatalogPlugin({
      //插件选项
    }),
  ],
};
```

@tab JS

```js
// .vuepress/config.js
import { autoCatalogPlugin } from "vuepress-plugin-auto-catalog";

export default {
  plugins: [
    autoCatalogPlugin({
      //插件选项
    }),
  ],
};
```

:::
