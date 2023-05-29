---
home: true
title: 主页
icon: home
heroImage: /logo.svg
heroText: vuepress-plugin-comment2
tagline: 评论与阅读量插件
actions:
  - text: 快速上手 💡
    link: /zh/guide/
    type: primary

  - text: 配置 🛠
    link: /zh/config/

features:
  - title: Giscus
    icon: fab fa-github
    details: 由 GitHub Discussions 提供支持的评论系统
    link: /zh/guide/giscus.html

  - title: Waline
    icon: w
    details: 一个带后端的强大评论系统
    link: /zh/guide/waline.html

  - title: Twikoo
    icon: t
    details: 一个简洁、安全且免费的静态网站评论系统，基于腾讯云开发
    link: /zh/guide/twikoo.html

  - title: Artalk
    icon: a
    details: 一个基于 golang 的简洁自托管评论系统
    link: /zh/guide/artalk.html

footer: 使用 <a href="https://theme-hope.vuejs.press/zh/" target="_blank">VuePress Theme Hope</a> 主题 | MIT 协议, 版权所有 © 2019-present Mr.Hope

copyright: false
---

## 安装

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

## 使用

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

<NetlifyBadge alt="通过 Netlify 部署" />

<script setup lang="ts">
import NetlifyBadge from "@NetlifyBadge";
</script>
