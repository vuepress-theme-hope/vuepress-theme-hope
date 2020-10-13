---
home: true
title: "@mr-hope/vuepress-plugin-copy-code"
icon: homefill
heroImage: /logo.svg
heroText: "@mr-hope/vuepress-plugin-copy-code"
tagline: 为 Vuepress 提供代码块一键复制
action:
  - text: 快速上手 💡
    link: /zh/guide/

  - text: 配置 🛠
    link: /zh/config/

footer: MIT Licensed | Copyright © 2019-present Mr.Hope
copyright: false
---

## 使用插件

### 安装

```bash
npm i -D @mr-hope/vuepress-plugin-copy-code
```

或

```bash
yarn add -D @mr-hope/vuepress-plugin-copy-code
```

### 使用

```js {3-7}
// .vuepress/config.js
module.exports = {
  plugin: [
    "@mr-hope/copy-code",
    {
      // 你的选项
    },
  ],
};
```
