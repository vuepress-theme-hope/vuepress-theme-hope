---
home: true
title: Home
icon: home
heroImage: /logo.svg
heroText: vuepress-plugin-sitemap2
tagline: Sitemap generation for VuePress2
action:
  - text: Docs
    link: https://vuepress-theme-hope.github.io/v2/sitemap/

footer: MIT Licensed | Copyright © 2019-present Mr.Hope
---

## How to use

### Install

```bash
yarn add -D vuepress-plugin-sitemap2@next
```

### Usage

```ts
// .vuepress/config.ts
import { sitemap } from "vuepress-plugin-sitemap2";

export default {
  plugins: [
    sitemap({
      // your options
    }),
  ],
};
```
