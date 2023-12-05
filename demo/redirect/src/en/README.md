---
home: true
title: Home
icon: home
heroImage: https://theme-hope-assets.vuejs.press/logo.svg
heroText: vuepress-plugin-redirect
tagline: Redirect plugin for VuePress2
actions:
  - text: Docs
    link: https://plugin-redirect.vuejs.press

footer: MIT Licensed | Copyright © 2022-present Mr.Hope
redirectFrom:
  - /en/redirect-from.html
---

## How to use

### Install

```bash
pnpm add -D vuepress-plugin-redirect
```

### Usage

```ts
// .vuepress/config.ts
import { redirectPlugin } from "vuepress-plugin-redirect";

export default {
  plugins: [
    redirectPlugin({
      // your options
    }),
  ],
};
```
