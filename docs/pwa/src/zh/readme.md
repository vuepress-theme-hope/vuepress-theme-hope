---
home: true
title: "@mr-hope/vuepress-plugin-pwa"
icon: homefill
heroImage: /logo.svg
heroText: "@mr-hope/vuepress-plugin-pwa"
tagline: 一个强大的 PWA 插件
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

```js {3-7}
// .vuepress/config.js
module.exports = {
  plugin: [
    "@mr-hope/pwa",
    {
      // 你的选项
    },
  ],
};
```
