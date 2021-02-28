---
home: true
title: 主页
icon: home
heroImage: /logo.svg
heroText: "@mr-hope/vuepress-plugin-sitemap"
tagline: 自动在你构建网页时为你生成网页的 sitemap。
footer: MIT Licensed | Copyright © 2019-present Mr.Hope
copyrightText: false
---

## 使用插件

### 安装

<CodeGroup>
<CodeGroupItem title="yarn">
```bash
yarn add -D @mr-hope/vuepress-plugin-sitemap
```
</CodeGroupItem>

<CodeGroupItem title="npm">
```bash
npm i -D @mr-hope/vuepress-plugin-sitemap
```
</CodeGroupItem>
</CodeGroup>

### 使用

```js
// .vuepress/config.js
module.exports = {
  plugins: [
    [
      "@mr-hope/sitemap",
      {
        // 你的选项
      },
    ],
  ],
};
```
