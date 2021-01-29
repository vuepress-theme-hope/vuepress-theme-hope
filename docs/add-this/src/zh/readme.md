---
home: true
title: 主页
icon: home
heroImage: /logo.svg
heroText: vuepress-plugin-add-this
tagline: 为 VuePress 提供 addthis 支持
action:
  - text: 快速上手 💡
    link: /zh/guide/
    type: primary

  - text: 配置 🛠
    link: /zh/config/

footer: MIT Licensed | Copyright © 2019-present Mr.Hope
copyrightText: false
---

## 使用插件

### 安装

```bash
npm i -D vuepress-plugin-add-this
```

或

```bash
yarn add -D vuepress-plugin-add-this
```

### 使用

```js
module.exports = {
  plugins: [["add-this", { pubid: "你的 pubid" }]],
};
```
