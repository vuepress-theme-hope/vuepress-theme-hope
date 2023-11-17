---
home: true
title: 主页
icon: home
heroImage: https://theme-hope-assets.vuejs.press/logo.svg
heroText: vuepress-plugin-feed2
tagline: 为 VuePress2 提供 Feed 生成
actions:
  - text: 文档
    link: https://plugin-feed2.vuejs.press/zh/

footer: MIT 协议, 版权所有 © 2019-present Mr.Hope
---

<template v-if="!isDev">

- [Atom Feed](/zh/atom.xml)
- [JSON Feed](/zh/feed.json)
- [RSS Feed](/zh/rss.xml)

</template>

## 使用插件

### 安装

```bash
pnpm add -D vuepress-plugin-feed2
```

### 使用

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

<script setup>
const isDev = __VUEPRESS_DEV__;
</script>
