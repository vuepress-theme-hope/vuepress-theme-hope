---
home: true
title: Home
icon: home
heroImage: /logo.svg
heroText: vuepress-plugin-redirect
tagline: Redirect plugin for VuePress2
actions:
  - text: Docs
    link: https://vuepress-theme-hope.github.io/v2/redirect/

footer: MIT Licensed | Copyright © 2022-present Mr.Hope
---

## How to use

### Install

```bash
pnpm add -D vuepress-plugin-redirect@next
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
