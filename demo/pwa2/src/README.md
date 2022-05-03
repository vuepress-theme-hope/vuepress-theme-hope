---
home: true
title: Home
heroImage: /logo.svg
heroText: vuepress-plugin-pwa2
tagline: Turning on Progressive Web App Support
actions:
  - text: Docs
    link: https://vuepress-theme-hope.github.io/v2/pwa/

footer: MIT Licensed | Copyright © 2019-present Mr.Hope
---

## How to use

### Install

```bash
pnpm add -D vuepress-plugin-pwa2@next
```

### Usage

```ts
// .vuepress/config.ts
import { pwaPlugin } from "vuepress-plugin-pwa2";

export default {
  plugins: [
    pwaPlugin({
      // your options
    }),
  ],
};
```
