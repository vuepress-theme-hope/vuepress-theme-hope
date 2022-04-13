---
home: true
title: Home
icon: home
heroImage: /logo.svg
heroText: vuepress-plugin-redirect2
tagline: Redirect plugin for VuePress2
action:
  - text: Docs
    link: https://vuepress-theme-hope.github.io/v2/redirect/

footer: MIT Licensed | Copyright © 2022-present Mr.Hope
---

## How to use

### Install

```bash
yarn add -D vuepress-plugin-redirect2@next
```

### Usage

```ts
// .vuepress/config.ts
import { redirect } from "vuepress-plugin-redirect2";

export default {
  plugins: [
    redirect({
      // your options
    }),
  ],
};
```
