---
home: true
title: vuepress-plugin-add-this
icon: homefill
heroImage: /logo.svg
heroText: vuepress-plugin-add-this
tagline: AddThis plugin for vuepress
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
npm i -D vuepress-plugin-add-this
```

Or

```bash
yarn add -D vuepress-plugin-add-this
```

### Usage

```js {3-7}
// .vuepress/config.js
module.exports = {
  plugin: [
    "add-this",
    {
      pubid: "your pubid",
    },
  ],
};
```
