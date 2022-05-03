---
home: true
title: 主页
icon: home
heroImage: /logo.svg
heroText: vuepress-plugin-photo-swipe
tagline: 为 VuePress2 提供图片预览支持
actions:
  - text: 快速上手 💡
    link: /zh/guide.html
    type: primary

  - text: 配置 🛠
    link: /zh/config.html

footer: MIT Licensed | Copyright © 2019-present Mr.Hope
copyright: false
---

让页面图像支持预览，缩放，共享，滑动查看和下载。

## 使用插件

### 安装

:::: code-group

::: code-group-item pnpm

```bash
pnpm add -D vuepress-plugin-photo-swipe@next
```

:::

::: code-group-item yarn

```bash
yarn add -D vuepress-plugin-photo-swipe@next
```

:::

::: code-group-item npm

```bash
npm i -D vuepress-plugin-photo-swipe@next
```

:::

::::

### 使用

:::: code-group

::: code-group-item TS

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

:::

::: code-group-item JS

```js
// .vuepress/config.js
const { photoSwipePlugin } = require("vuepress-plugin-photo-swipe");

module.exports = {
  plugins: [
    photoSwipePlugin({
      // 你的选项
    }),
  ],
};
```

:::

::::
