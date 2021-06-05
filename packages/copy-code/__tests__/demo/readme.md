---
home: true
title: "@mr-hope/vuepress-plugin-copy-code"
heroImage: /logo.svg
heroText: "@mr-hope/vuepress-plugin-copy-code"
tagline: 为 VuePress 提供一键复制代码支持
footer: MIT Licensed | Copyright © 2019-present Mr.Hope
---

## 使用插件

### 安装

```bash
npm i -D @mr-hope/vuepress-plugin-copy-code
```

### 使用

```js
// .vuepress/config.js
module.exports = {
  plugins: [
    [
      "@mr-hope/copy-code",
      {
        // 你的配置选项
      },
    ],
  ],
};
```
