---
home: true
title: vuepress-plugin-comment
icon: homefill
heroImage: /logo.svg
heroText: vuepress-plugin-comment
tagline: Comment and visitors plugin for vuepress
action:
  - text: Get Started 💡
    link: /guide/

  - text: Config 🛠
    link: /config/

copyright: false
footer: MIT Licensed | Copyright © 2019-present Mr.Hope
---

## Install

```bash
npm i -D @mr-hope/vuepress-plugin-comment
```

Or

```bash
yarn add -D @mr-hope/vuepress-plugin-comment
```

### Usage

```js {3-7}
// .vuepress/config.js
module.exports = {
  plugin: [
    "@mr-hope/comment",
    {
      // your options
    },
  ],
};
```
