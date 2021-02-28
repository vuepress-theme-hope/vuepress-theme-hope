---
home: true
title: Home
icon: home
heroImage: /logo.svg
heroText: "@mr-hope/vuepress-plugin-seo"
tagline: Inject <meta> into your webpage to enhance the SEO of your webpage.
footer: MIT Licensed | Copyright © 2019-present Mr.Hope
copyrightText: false
---

## How to use

### Install

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

### Usage

```js
// .vuepress/config.js
module.exports = {
  plugins: [
    [
      "@mr-hope/seo",
      {
        // your options
      },
    ],
  ],
};
```
