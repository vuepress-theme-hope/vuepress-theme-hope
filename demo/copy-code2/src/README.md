---
home: true
title: Home
heroImage: /logo.svg
heroText: vuepress-plugin-copy-code2
tagline: Code Copy plugin for VuePress2
actions:
  - text: Docs
    link: https://vuepress-theme-hope.github.io/v2/copy-code/

footer: Theme by <a href="https://vuepress-theme-hope.github.io/v2/" target="_blank">VuePress Theme Hope</a> | MIT Licensed, Copyright © 2019-present Mr.Hope
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
