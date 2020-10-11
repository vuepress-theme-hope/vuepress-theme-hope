---
home: true
title: vuepress-plugin-add-this
icon: homefill
heroImage: /logo.svg
heroText: vuepress-plugin-add-this
tagline: 为 Vuepress 提供 addthis 支持
footer: MIT Licensed | Copyright © 2019-present Mr.Hope
copyright: false
---

## 使用插件

### 安装

```bash
npm i -D vuepress-plugin-add-this
```

### 使用

```js
// .vuepress/config.js
module.exports = {
  plugin: [
    "add-this",
    {
      pubid: "你的 pubid",
    },
  ],
};
```
