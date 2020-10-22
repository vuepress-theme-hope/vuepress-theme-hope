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

```js
const { head } = require("@mr-hope/vuepress-plugin-pwa");

const pwaOptions = {
  // 你的选项
};

// .vuepress/config.js
module.exports = {
  head: head(pwaOptions, [
    /*
     * 你原始的 head 数组
     * 如果你原来没有配置，可以忽略此参数
     */
  ]),
  plugin: [["@mr-hope/pwa", pwaOptions]],
};
```

::: tip
你需要使用 `head` 函数的原因是插件不能在输出 HTML 中插入 head 标签。

该函数会将一些与 PWA 相关的标签注入到输出站点 HTMl 文件的 `<head>` 部分。
:::
