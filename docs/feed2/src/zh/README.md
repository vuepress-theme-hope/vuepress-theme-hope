---
home: true
title: 主页
icon: home
heroImage: /logo.svg
heroText: vuepress-plugin-feed2
tagline: 为 VuePress2 提供 Feed 生成
actions:
  - text: 快速上手 💡
    link: ./guide.html
    type: primary

  - text: 配置 🛠
    link: ./config/

footer: 使用 <a href="https://theme-hope.vuejs.press/zh/" target="_blank">VuePress Theme Hope</a> 主题 | MIT 协议, 版权所有 © 2019-present Mr.Hope

copyright: false
---

## 使用插件

### 安装

::: code-tabs#shell

@tab pnpm

```bash
pnpm add -D vuepress-plugin-feed2
```

@tab yarn

```bash
yarn add -D vuepress-plugin-feed2
```

@tab npm

```bash
npm i -D vuepress-plugin-feed2
```

:::

### 使用

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { feedPlugin } from "vuepress-plugin-feed2";

export default {
  plugins: [
    feedPlugin({
      // 插件选项
    }),
  ],
};
```

@tab JS

```js
// .vuepress/config.js
import { feedPlugin } from "vuepress-plugin-feed2";

export default {
  plugins: [
    feedPlugin({
      // 插件选项
    }),
  ],
};
```

:::

## 从 V1 迁移

详见 [迁移指南](./migration.md)。
