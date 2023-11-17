---
home: true
title: Home
icon: home
heroImage: https://theme-hope-assets.vuejs.press/logo.svg
heroText: vuepress-plugin-sitemap2
tagline: Sitemap generation for VuePress2
actions:
  - text: Docs
    link: https://plugin-sitemap2.vuejs.press

footer: MIT Licensed, Copyright © 2019-present Mr.Hope
---

<template v-if="!isDev">

## [View Sitemap](/sitemap.xml)

</template>

## How to use

### Install

```bash
pnpm add -D vuepress-plugin-sitemap2
```

### Usage

```ts
// .vuepress/config.ts
import { sitemapPlugin } from "vuepress-plugin-sitemap2";

export default {
  plugins: [
    sitemapPlugin({
      // your options
    }),
  ],
};
```

<script setup>
const isDev = __VUEPRESS_DEV__;
</script>
