---
home: true
title: Home
heroImage: https://theme-hope-assets.vuejs.press/logo.svg
heroText: vuepress-plugin-copyright2
tagline: Append copyright information when copying
actions:
  - text: Docs
    link: https://plugin-copyright2.vuejs.press

footer: MIT Licensed, Copyright © 2019-present Mr.Hope
---

## Demo

```ts
// .vuepress/config.ts
import { copyrightPlugin } from "vuepress-plugin-copyright2";

export default {
  plugins: [
    copyrightPlugin({
      // your options
    }),
  ],
};
```
