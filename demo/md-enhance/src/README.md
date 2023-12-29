---
home: true
title: Home
icon: home
heroImage: https://theme-hope-assets.vuejs.press/logo.svg
heroText: vuepress-plugin-md-enhance
tagline: Enhancement for Markdown in VuePress
actions:
  - text: Demo
    link: ./demo/
    type: primary

  - text: Docs
    link: https://plugin-md-enhance.vuejs.press

footer: MIT Licensed, Copyright © 2019-present Mr.Hope
---

### Install

```bash
pnpm add -D vuepress-plugin-md-enhance
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
