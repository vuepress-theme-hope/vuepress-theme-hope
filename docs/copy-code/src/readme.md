---
home: true
title: "@mr-hope/vuepress-plugin-copy-code"
icon: homefill
heroImage: /logo.svg
heroText: "@mr-hope/vuepress-plugin-copy-code"
tagline: Code Copy plugin for vuepress
action:
  - text: Guide 💡
    link: /guide/

  - text: Config 🛠
    link: /config/

footer: MIT Licensed | Copyright © 2019-present Mr.Hope
copyrightText: false
---

## How to use

### Install

```bash
npm i -D @mr-hope/vuepress-plugin-copy-code
```

Or

```bash
yarn add -D @mr-hope/vuepress-plugin-copy-code
```

### Usage

```js {3-7}
// .vuepress/config.js
module.exports = {
  plugin: [
    "@mr-hope/copy-code",
    {
      // your options
    },
  ],
};
```
