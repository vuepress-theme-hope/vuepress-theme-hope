---
home: true
title: vuepress-plugin-add-this
icon: homefill
heroImage: /logo.svg
heroText: vuepress-plugin-add-this
tagline: AddThis plugin for vuepress
footer: MIT Licensed | Copyright © 2019-present Mr.Hope
copyright: false
---

## How to use

### Install

```bash
npm i -D vuepress-plugin-add-this
```

### Usage

```js
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
