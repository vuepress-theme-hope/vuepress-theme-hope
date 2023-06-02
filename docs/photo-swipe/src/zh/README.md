---
home: true
title: 主页
icon: home
heroImage: /logo.svg
heroText: vuepress-plugin-photo-swipe
tagline: 为 VuePress2 提供图片预览支持
actions:
  - text: 快速上手 💡
    link: ./guide.html
    type: primary

  - text: 配置 🛠
    link: ./config.html

footer: 使用 <a href="https://theme-hope.vuejs.press/zh/" target="_blank">VuePress Theme Hope</a> 主题 | MIT 协议, 版权所有 © 2019-present Mr.Hope

copyright: false
---

让页面图像支持预览，缩放，共享，滑动查看和下载。

## 使用插件

### 安装

::: code-tabs#shell

@tab pnpm

```bash
pnpm add -D vuepress-plugin-photo-swipe
```

@tab yarn

```bash
yarn add -D vuepress-plugin-photo-swipe
```

@tab npm

```bash
npm i -D vuepress-plugin-photo-swipe
```

:::

### 使用

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { photoSwipePlugin } from "vuepress-plugin-photo-swipe";

export default {
  plugins: [
    photoSwipePlugin({
      // 你的选项
    }),
  ],
};
```

@tab JS

```js
// .vuepress/config.js
import { photoSwipePlugin } from "vuepress-plugin-photo-swipe";

export default {
  plugins: [
    photoSwipePlugin({
      // 你的选项
    }),
  ],
};
```

:::

## 从 V1 迁移

详见 [迁移指南](./migration.md)。
