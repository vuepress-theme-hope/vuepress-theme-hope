---
home: true
title: vuepress-plugin-add-this
heroImage: /logo.svg
heroText: vuepress-plugin-add-this
tagline: 为 VuePress 提供 add this 支持
footer: MIT Licensed | Copyright © 2019-present Mr.Hope
---

## 使用插件

### 安装

```bash
npm i -D vuepress-plugin-add-this
```

### 使用

```js {7}
// .vuepress/config.js
module.exports = {
  plugins: [
    [
      "add-this",
      {
        pubid: "your pubid",
      },
    ],
  ],
};
```
