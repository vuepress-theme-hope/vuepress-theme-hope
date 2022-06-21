---
home: true
title: 主页
icon: home
heroImage: /logo.svg
heroText: vuepress-plugin-blog2
tagline: 为 VuePress2 提供博客功能
actions:
  - text: 快速上手 💡
    link: /zh/guide.html
    type: primary

  - text: 配置 🛠
    link: /zh/config.html

footer: MIT Licensed | Copyright © 2019-present Mr.Hope
copyright: false
---

## 使用插件

### 安装

::: code-tabs#shell

@tab pnpm

```bash
pnpm add -D vuepress-plugin-blog2@next
```

@tab yarn

```bash
yarn add -D vuepress-plugin-blog2@next
```

@tab npm

```bash
npm i -D vuepress-plugin-blog2@next
```

:::

### 使用

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { blogPlugin } from "vuepress-plugin-blog2";

export default {
  plugins: [
    blogPlugin({
      //插件选项
    }),
  ],
};
```

@tab JS

```js
// .vuepress/config.js
const { blogPlugin } = require("vuepress-plugin-blog2");

module.exports = {
  plugins: [
    blogPlugin({
      //插件选项
    }),
  ],
};
```

:::

## 从 V1 迁移

此插件未发布 V1 版本。

如果你在 VuePress1 中使用了 `@vuepress/plugin-blog`，你应该了解这个插件的受众与 `@vuepress/plugin-blog` 完全不同。

- `@vuepress/plugin-blog` 更像是一个针对用户的博客工具集合。

  它为您提供了使用 frontmatter、dir 和其他条件进行过滤的详细选项。此外，它还附带了 Feed、Sitemap、mailchimp、分页和其他博客相关功能。主要地，您可以使用复杂的选项获得所需的集合，并且结果会在全局范围内注入 Vue 组件，并提供分页。

- 然而，`vuepress-plugin-blog2` 是针对主题开发者的，并且只有 < 1kb Gzipped 的客户端大小。

  由于 VuePress2 出于可扩展性的原因，`siteData.pages` 不再可用，该插件仅将 Node 侧将它们注入到 routeMeta 并提供组合 API 供您在客户端获取它们。同时，它不提供任何相关功能，例如分页、feed、sitemap。主要地，你需要编写函数从页面对象返回内容来获取文章集合，并且需要使用其他插件来提供其他功能，并自己处理分页相关功能。
