---
home: true
title: Home
icon: home
heroImage: /logo.svg
heroText: vuepress-plugin-seo2
tagline: Full SEO enhance of your site
actions:
  - text: Docs
    link: https://vuepress-theme-hope.github.io/v2/seo/

footer: MIT Licensed | Copyright © 2019-present Mr.Hope
---

## How to use

### Install

```bash
pnpm add -D vuepress-plugin-seo2@next
```

### Usage

```ts
// .vuepress/config.ts
import { seoPlugin } from "vuepress-plugin-seo2";

export default {
  plugins: [
    seoPlugin({
      // your options
    }),
  ],
};
```
