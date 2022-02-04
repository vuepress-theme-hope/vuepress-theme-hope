---
home: true
title: vuepress-plugin-blog2
heroImage: /logo.svg
heroText: vuepress-plugin-blog2
tagline: 为 VuePress 提供博客支持
footer: MIT Licensed | Copyright © 2021-present Mr.Hope
---

## 使用插件

### 安装

```bash
npm i -D vuepress-plugin-blog2@next
```

### 使用

```js {7}
// .vuepress/config.js
module.exports = {
  plugins: [
    [
      "blog2",
      {
        // your options
      },
    ],
  ],
};
```
