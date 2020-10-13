---
home: true
title: vuepress-plugin-copy-code
icon: homefill
heroImage: /logo.svg
heroText: vuepress-plugin-copy-code
tagline: Code Copy plugin for vuepress
action:
  - text: Guide 💡
    link: /guide/

  - text: Config 🛠
    link: /config/

copyright: false
footer: MIT Licensed | Copyright © 2019-present Mr.Hope
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

```js {3-5}
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
