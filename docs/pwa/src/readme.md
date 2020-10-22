---
home: true
title: "@mr-hope/vuepress-plugin-pwa"
icon: homefill
heroImage: /logo.svg
heroText: "@mr-hope/vuepress-plugin-pwa"
tagline: A powerfull PWA plugin
footer: MIT Licensed | Copyright © 2019-present Mr.Hope
copyrightText: false
---

This plugin will turn on Progressive Web App Support.

## How to use

### Install

```bash
npm i -D @mr-hope/vuepress-plugin-pwa
```

Or

```bash
yarn add -D @mr-hope/vuepress-plugin-pwa
```

### Usage

```js {3-7}
// .vuepress/config.js
module.exports = {
  plugin: [
    "@mr-hope/pwa",
    {
      // your options
    },
  ],
};
```
