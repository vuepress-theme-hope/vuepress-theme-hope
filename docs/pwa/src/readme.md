---
home: true
title: "@mr-hope/vuepress-plugin-pwa"
icon: home
heroImage: /logo.svg
heroText: "@mr-hope/vuepress-plugin-pwa"
tagline: A powerfull PWA plugin
action:
  - text: Guide 💡
    link: /guide/
    type: primary

  - text: Config 🛠
    link: /config/

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

```js
// .vuepress/config.js
module.exports = {
  plugins: [
    [
      "@mr-hope/pwa",
      {
        // your options
      },
    ],
  ],
};
```
