---
home: true
title: 主页
icon: home
heroImage: /logo.svg
bgImage: https://theme-hope-assets.vuejs.press/bg/6-light.svg
bgImageDark: https://theme-hope-assets.vuejs.press/bg/6-dark.svg
bgImageStyle:
  background-attachment: fixed
heroText: vuepress-plugin-comment2
tagline: 评论与阅读量插件
actions:
  - text: 快速上手 💡
    link: ./guide/
    type: primary

  - text: 配置 🛠
    link: ./config/

highlights:
  - header: Giscus
    bgImage: https://theme-hope-assets.vuejs.press/bg/10-light.svg
    bgImageDark: https://theme-hope-assets.vuejs.press/bg/10-dark.svg
    bgImageStyle:
      background-attachment: local
    image: /assets/image/github-dark.svg
    imageDark: /assets/image/github-light.svg
    description: |-
      由 GitHub Discussions 提供支持的评论系统
    type: no-order
    highlights:
      - title: 了解更多
        link: ./guide/giscus.html

  - header: Waline
    image: https://waline.js.org/logo.png
    bgImage: https://theme-hope-assets.vuejs.press/bg/2-light.svg
    bgImageDark: https://theme-hope-assets.vuejs.press/bg/2-dark.svg
    bgImageStyle:
      background-repeat: repeat
      background-size: initial
    description: |-
      一个带后端的强大评论系统
    type: no-order
    highlights:
      - title: 了解更多
        link: ./guide/waline.html

  - header: Twikoo
    bgImage: https://theme-hope-assets.vuejs.press/bg/11-light.svg
    bgImageDark: https://theme-hope-assets.vuejs.press/bg/11-dark.svg
    bgImageStyle:
    image: /assets/image/twikoo.png
    description: |-
      一个简洁、安全且免费的静态网站评论系统，基于腾讯云开发
    type: no-order
    highlights:
      - title: 了解更多
        link: ./guide/twikoo.html

  - header: Artalk
    bgImage: https://theme-hope-assets.vuejs.press/bg/7-light.svg
    bgImageDark: https://theme-hope-assets.vuejs.press/bg/7-dark.svg
    bgImageStyle:
      background-size: initial
    image: https://artalk.js.org/favicon.png
    description: |-
      一个基于 golang 服务器的简洁自托管评论系统。
    type: no-order
    highlights:
      - title: 了解更多
        link: ./guide/artalk.html

footer: 使用 <a href="https://theme-hope.vuejs.press/zh/" target="_blank">VuePress Theme Hope</a> 主题 | MIT 协议, 版权所有 © 2019-present Mr.Hope

copyright: false
---

<HighlightPanel header="如何使用" image="/assets/image/box.svg" bgImage="https://theme-hope-assets.vuejs.press/bg/3-light.svg" bgImageDark="https://theme-hope-assets.vuejs.press/bg/3-dark.svg">
<template #highlights>

### 安装

::: code-tabs#shell

@tab pnpm

```bash
pnpm add -D vuepress-plugin-comment2
```

@tab yarn

```bash
yarn add -D vuepress-plugin-comment2
```

@tab npm

```bash
npm i -D vuepress-plugin-comment2
```

:::

### 使用

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { commentPlugin } from "vuepress-plugin-comment2";

export default {
  plugins: [
    commentPlugin({
      // 插件选项
    }),
  ],
};
```

@tab JS

```js
// .vuepress/config.js
import { commentPlugin } from "vuepress-plugin-comment2";

export default {
  plugins: [
    commentPlugin({
      // 插件选项
    }),
  ],
};
```

:::

## 从 V1 迁移

详见 [迁移指南](./migration.md)

</template>
</HighlightPanel>

<script setup lang="ts">
import HighlightPanel from "@theme-hope/components/HighlightPanel";
</script>
