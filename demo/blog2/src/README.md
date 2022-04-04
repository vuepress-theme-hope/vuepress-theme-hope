---
home: true
title: Home
heroImage: /logo.svg
heroText: vuepress-plugin-blog2
tagline: Add blog support for VuePress2
actions:
  - text: Docs
    link: https://vuepress-theme-hope.github.io/v2/blog/

footer: MIT Licensed | Copyright © 2021-present Mr.Hope
---

## How to use

### Install

```bash
yarn add -D vuepress-plugin-blog2@next
```

### Usage

```ts
// .vuepress/config.ts
import { blog } from "vuepress-plugin-blog2";

export default {
  plugins: [
    blog({
      // your options
    }),
  ],
};
```
