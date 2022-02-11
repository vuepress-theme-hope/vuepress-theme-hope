---
home: true
title: PWA plugin
heroImage: /logo.svg
heroText: vuepress-plugin-pwa2
tagline: 为 VuePress 提供 PWA 支持
footer: MIT Licensed | Copyright © 2019-present Mr.Hope
---

## 使用插件

### 安装

```bash
npm i -D vuepress-plugin-pwa2
```

### 使用

```js {7}
// .vuepress/config.js
module.exports = {
  plugins: [
    [
      "pwa2",
      {
        // your options
      },
    ],
  ],
};
```
