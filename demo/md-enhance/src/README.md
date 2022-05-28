---
home: true
title: Home
icon: home
heroImage: /logo.svg
heroText: vuepress-plugin-md-enhance
tagline: Enhancement for Markdown in VuePress
actions:
  - text: Demo
    link: /demo/
    type: primary

  - text: Docs
    link: https://vuepress-theme-hope.github.io/v2/md-enhance/

footer: MIT Licensed | Copyright © 2019-present Mr.Hope
---

### Install

```bash
pnpm add -D vuepress-plugin-md-enhance@next
```

### Usage

```ts
// .vuepress/config.ts
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhancePlugin({
      // your options
    }),
  ],
};
```
