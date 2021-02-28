---
home: true
title: 主页
icon: home
heroImage: /logo.svg
heroText: "@mr-hope/vuepress-plugin-seo"
tagline: 向你的网页注入 <meta>，来增强你网页的 SEO。
footer: MIT Licensed | Copyright © 2019-present Mr.Hope
copyrightText: false
---

## 使用插件

### 安装

<CodeGroup>
<CodeGroupItem title="yarn">
```bash
yarn add -D @mr-hope/vuepress-plugin-seo
```
</CodeGroupItem>

<CodeGroupItem title="npm">
```bash
npm i -D @mr-hope/vuepress-plugin-seo
```
</CodeGroupItem>
</CodeGroup>

### 使用

```js
// .vuepress/config.js
module.exports = {
  plugins: [
    [
      "@mr-hope/seo",
      {
        // 你的选项
      },
    ],
  ],
};
```
