---
home: true
title: 主页
icon: home
heroImage: /logo.svg
heroText: "@mr-hope/vuepress-plugin-pwa"
tagline: 一个强大的 PWA 插件
action:
  - text: 快速上手 💡
    link: /zh/guide/
    type: primary

  - text: 配置 🛠
    link: /zh/config/

footer: MIT Licensed | Copyright © 2019-present Mr.Hope
copyrightText: false
---

渐进式网页应用 (Progressive Web App) 支持。

## 使用插件

### 安装

```bash
npm i -D @mr-hope/vuepress-plugin-pwa
```

或

```bash
yarn add -D @mr-hope/vuepress-plugin-pwa
```

### 使用

```js
// .vuepress/config.js
module.exports = {
  plugins: [
    [
      "@mr-hope/pwa",
      {
        // 你的选项
      },
    ],
  ],
};
```
