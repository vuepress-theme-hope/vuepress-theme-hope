---
home: true
title: vuepress-plugin-add-this
icon: homefill
heroImage: /logo.svg
heroText: vuepress-plugin-add-this
tagline: 为 Vuepress 提供 addthis 支持
action:
  - text: 快速上手 💡
    link: /zh/guide/

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

```js {3-7}
module.exports = {
  plugin: [
    "add-this",
    {
      pubid: "你的 pubid",
    },
  ],
};
```
