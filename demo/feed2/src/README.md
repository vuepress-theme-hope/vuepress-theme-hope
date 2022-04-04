---
home: true
title: Home
icon: home
heroImage: /logo.svg
heroText: vuepress-plugin-feed2
tagline: Feed plugin for VuePress2
actions:
  - text: Docs 💡
    link: https://vuepress-theme-hope.github.io/v2/feed/

footer: MIT Licensed | Copyright © 2019-present Mr.Hope
---

## How to use

### Install

```bash
yarn add -D vuepress-plugin-feed2@next
```

### Usage

```ts
// .vuepress/config.ts
import { feed } from "vuepress-plugin-feed2";

export default {
  plugins: [
    feed({
      // your options
    }),
  ],
};
```
