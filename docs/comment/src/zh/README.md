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

footer: MIT Licensed | Copyright © 2019-present Mr.Hope
copyrightText: false
---

## 安装

:::: code-group

::: code-group-item yarn

```bash
yarn add -D vuepress-plugin-comment2@next
```

:::

::: code-group-item npm

```bash
npm i -D vuepress-plugin-comment2@next
```

:::

::::

## 使用

:::: code-group

::: code-group-item ts

```ts
// .vuepress/config.ts
export default {
  plugins: [
    [
      "@mr-hope/comment",
      {
        // 插件选项
      },
    ],
  ],
};
```

:::

::: code-group-item js

```js
// .vuepress/config.js
module.exports = {
  plugins: [
    [
      "@mr-hope/comment",
      {
        // 插件选项
      },
    ],
  ],
};
```

:::

::::
