---
home: true
title: Home
heroImage: /logo.svg
heroText: vuepress-plugin-copyright2
tagline: Append copyright information when copying
actions:
  - text: Docs
    link: https://vuepress-theme-hope.github.io/v2/copyright/

footer: Theme by <a href="https://vuepress-theme-hope.github.io/v2/" target="_blank">VuePress Theme Hope</a> | MIT Licensed, Copyright © 2019-present Mr.Hope
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
