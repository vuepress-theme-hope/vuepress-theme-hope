---
home: true
title: 主页
icon: home
heroImage: /logo.svg
heroText: vuepress-plugin-remove-pwa
tagline: 从你的 VuePress 站点中移除 Service Worker
actions:
  - text: 快速上手 💡
    link: /zh/guide.html
    type: primary

  - text: 配置 🛠
    link: /zh/config.html

footer: 使用 <a href="https://theme-hope.vuejs.press/zh/" target="_blank">VuePress Theme Hope</a> 主题 | MIT 协议, 版权所有 © 2019-present Mr.Hope

copyright: false
---

## 使用插件

### 安装

::: code-tabs#shell

@tab pnpm

```bash
pnpm add -D vuepress-plugin-remove-pwa@next
```

@tab yarn

```bash
yarn add -D vuepress-plugin-remove-pwa@next
```

@tab npm

```bash
npm i -D vuepress-plugin-remove-pwa@next
```

:::

### 使用

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { removePWAPlugin } from "vuepress-plugin-remove-pwa";

export default {
  plugins: [
    removePWAPlugin({
      // 你的选项
    }),
  ],
};
```

@tab JS

```js
// .vuepress/config.js
import { removePWAPlugin } from "vuepress-plugin-remove-pwa";

export default {
  plugins: [
    removePWAPlugin({
      // 你的选项
    }),
  ],
};
```

:::

<NetlifyBadge />

<script setup lang="ts">
import NetlifyBadge from "@NetlifyBadge";
</script>
