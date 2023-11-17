---
home: true
title: Home
icon: home
heroImage: https://theme-hope-assets.vuejs.press/logo.svg
heroText: vuepress-plugin-seo2
tagline: Full SEO enhance of your site
actions:
  - text: Docs
    link: https://plugin-seo2.vuejs.press

footer: MIT Licensed, Copyright © 2019-present Mr.Hope
---

## How to use

### Install

```bash
pnpm add -D vuepress-plugin-seo2
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
