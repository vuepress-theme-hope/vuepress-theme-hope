---
home: true
title: "@mr-hope/vuepress-plugin-pwa"
icon: homefill
heroImage: /logo.svg
heroText: "@mr-hope/vuepress-plugin-pwa"
tagline: A powerfull PWA plugin
action:
  - text: Guide 💡
    link: /guide/

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
const { head } = require("@mr-hope/vuepress-plugin-pwa");

const pwaOptions = {
  // your options
};

// .vuepress/config.js
module.exports = {
  head: head(pwaOptions, [
    /*
     * your original head
     * omit this param if you don’t have any config
     */
  ]),
  plugins: [["@mr-hope/pwa", pwaOptions]],
};
```

::: tip
You should use `head` function because plugins cannot insert head tags to the output HTML.

The function will inject some PWA related tags to the `<head>` tag part of output site HTML files.
:::
