---
home: true
title: Home
heroImage: /logo.svg
heroText: vuepress-plugin-pwa2
tagline: Turning on Progressive Web App Support
footer: MIT Licensed | Copyright © 2019-present Mr.Hope
---

## How to use

### Install

```bash
yarn add -D vuepress-plugin-pwa2@next
```

### Usage

```ts
// .vuepress/config.ts
import { pwa } from "vuepress-plugin-pwa2";

export default {
  plugins: [
    pwa({
      // your options
    }),
  ],
};
```
