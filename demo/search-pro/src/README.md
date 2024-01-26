---
home: true
title: Home
icon: homed
heroImage: https://theme-hope-assets.vuejs.press/logo.svg
heroText: vuepress-plugin-search-pro
tagline: Client search plugin for VuePress2
actions:
  - text: Docs
    link: https://plugin-search-pro.vuejs.press

footer: MIT Licensed, Copyright © 2019-present Mr.Hope
---

## How to use

### Install

```bash
pnpm add -D vuepress-plugin-search-pro
```

### Usage

```ts title=".vuepress/config.ts"
import { searchProPlugin } from "vuepress-plugin-search-pro";

export default {
  plugins: [
    searchProPlugin({
      // your options
    }),
  ],
};
```
