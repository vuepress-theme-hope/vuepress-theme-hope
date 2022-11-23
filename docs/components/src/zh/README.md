---
home: true
title: 主页
icon: home
heroImage: /logo.svg
heroText: vuepress-plugin-components
tagline: 组件库插件
actions:
  - text: 快速上手 💡
    link: /zh/guide/
    type: primary

  - text: 配置 🛠
    link: /zh/config.html

footer: 使用 <a href="https://vuepress-theme-hope.github.io/v2/" target="_blank">VuePress Theme Hope</a> 主题 | MIT 协议, 版权所有 © 2019-present Mr.Hope

copyright: false
---

## 安装

::: code-tabs#shell

@tab pnpm

```bash
pnpm add -D vuepress-plugin-components@next
```

@tab yarn

```bash
yarn add -D vuepress-plugin-components@next
```

@tab npm

```bash
npm i -D vuepress-plugin-components@next
```

:::

## 使用

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { componentsPlugin } from "vuepress-plugin-components";

export default {
  plugins: [
    componentsPlugin({
      // 插件选项
    }),
  ],
};
```

@tab JS

```js
// .vuepress/config.js
import { componentsPlugin } from "vuepress-plugin-components";

export default {
  plugins: [
    componentsPlugin({
      // 插件选项
    }),
  ],
};
```

:::
