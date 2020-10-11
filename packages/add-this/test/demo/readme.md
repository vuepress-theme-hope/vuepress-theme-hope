---
home: true
title: vuepress-plugin-add-this
heroImage: /logo.svg
heroText: vuepress-plugin-add-this
tagline: 为 Vuepress 提供 add this 支持
footer: MIT Licensed | Copyright © 2019-present Mr.Hope
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
      pubid: "your pubid",
    },
  ],
};
```
