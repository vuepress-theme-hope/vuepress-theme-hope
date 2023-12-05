---
home: true
title: Home
icon: home
heroImage: https://theme-hope-assets.vuejs.press/logo.svg
heroText: vuepress-plugin-feed2
tagline: Feed plugin for VuePress2
actions:
  - text: Docs
    link: https://plugin-feed2.vuejs.press

footer: MIT Licensed, Copyright © 2019-present Mr.Hope
---

<template v-if="!isDev">

- [Atom Feed](/atom.xml)
- [JSON Feed](/feed.json)
- [RSS Feed](/rss.xml)

</template>

## How to use

### Install

```bash
pnpm add -D vuepress-plugin-feed2
```

### Usage

```ts
// .vuepress/config.ts
import { feedPlugin } from "vuepress-plugin-feed2";

export default {
  plugins: [
    feedPlugin({
      // your options
    }),
  ],
};
```

<script setup>
const isDev = __VUEPRESS_DEV__;
</script>
