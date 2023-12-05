---
home: true
title: Home
heroImage: https://theme-hope-assets.vuejs.press/logo.svg
heroText: vuepress-plugin-copy-code2
tagline: Code Copy plugin for VuePress2
actions:
  - text: Docs
    link: https://plugin-copy-code2.vuejs.press

footer: MIT Licensed, Copyright © 2019-present Mr.Hope
---

## Demo

```ts
// .vuepress/config.ts
import { copyCodePlugin } from "vuepress-plugin-copy-code2";

export default {
  plugins: [
    copyCodePlugin({
      // your options
    }),
  ],
};
```
