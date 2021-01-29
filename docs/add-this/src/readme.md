---
home: true
title: Home
icon: home
heroImage: /logo.svg
heroText: vuepress-plugin-add-this
tagline: AddThis plugin for vuepress
action:
  - text: Guide 💡
    link: /guide/
    type: primary

  - text: Config 🛠
    link: /config/

footer: MIT Licensed | Copyright © 2019-present Mr.Hope
copyrightText: false
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

```js
// .vuepress/config.js
module.exports = {
  plugins: [["add-this", { pubid: "your pubid" }]],
};
```
