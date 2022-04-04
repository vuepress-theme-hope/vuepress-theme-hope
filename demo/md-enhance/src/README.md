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
yarn add -D vuepress-plugin-md-enhance@next
```

### Usage

```ts
// .vuepress/config.ts
import { mdEnhance } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhance({
      // your options
    }),
  ],
};
```
