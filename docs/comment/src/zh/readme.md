---
home: true
title: vuepress-plugin-comment
icon: homefill
heroImage: /logo.svg
heroText: vuepress-plugin-comment
tagline: 评论与阅读量插件
action:
  - text: 快速上手 💡
    link: /zh/guide/

  - text: 配置 🛠
    link: /zh/config/

footer: MIT Licensed | Copyright © 2019-present Mr.Hope
copyrightText: false
---

## 安装

```bash
npm i -D @mr-hope/vuepress-plugin-comment
```

或

```bash
yarn add -D @mr-hope/vuepress-plugin-comment
```

## 使用

```js
// .vuepress/config.js
module.exports = {
  plugins: [
    [
      "@mr-hope/comment",
      {
        // 配置选项
      },
    ],
  ],
};
```
