---
home: true
title: home
icon: home
heroImage: /logo.svg
heroText: "@mr-hope/vuepress-plugin-feed"
tagline: Feed plugin for vuepress
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
npm i -D @mr-hope/vuepress-plugin-feed
```

Or

```bash
yarn add -D @mr-hope/vuepress-plugin-feed
```

### Usage

```js
// .vuepress/config.js
module.exports = {
  plugins: [
    [
      "@mr-hope/feed",
      {
        // your options
      },
    ],
  ],
};
```
