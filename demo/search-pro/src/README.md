---
home: true
title: Home
icon: homed
heroImage: /logo.svg
heroText: vuepress-plugin-search-pro
tagline: Client search plugin for VuePress2
actions:
  - text: Docs
    link: https://vuepress-theme-hope.github.io/v2/search-pro/

footer: MIT Licensed, Copyright © 2019-present Mr.Hope
---

## How to use

### Install

```bash
pnpm add -D vuepress-plugin-search-pro@next
```

### Usage

```ts
// .vuepress/config.ts
import { searchProPlugin } from "vuepress-plugin-search-pro";

export default {
  plugins: [
    searchProPlugin({
      // your options
    }),
  ],
};
```
