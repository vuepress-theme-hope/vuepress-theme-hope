---
home: true
title: Home
icon: home
heroImage: /logo.svg
heroText: vuepress-plugin-comment2
tagline: Comment and pageview plugin for VuePress2
actions:
  - text: Get Started 💡
    link: /guide/
    type: primary

  - text: Config 🛠
    link: /config/

features:
  - title: Giscus
    icon: fab fa-github
    details: A comments system powered by GitHub Discussions.
    link: /guide/giscus.html

  - title: Waline
    icon: w
    details: A powerful comment system with backend

  - title: Twikoo
    icon: t
    details: A concise, safe and free static site commenting system, based on Tencent Cloud Development
    link: /guide/twikoo.html

  - title: Artalk
    icon: a
    details: A neat self-hosted commenting system based on golang
    link: /guide/artalk.html

footer: Theme by <a href="https://theme-hope.vuejs.press" target="_blank">VuePress Theme Hope</a> | MIT Licensed, Copyright © 2019-present Mr.Hope

copyright: false
---

## Install

::: code-tabs#shell

@tab pnpm

```bash
pnpm add -D vuepress-plugin-comment2
```

@tab yarn

```bash
yarn add -D vuepress-plugin-comment2
```

@tab npm

```bash
npm i -D vuepress-plugin-comment2
```

:::

### Usage

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { commentPlugin } from "vuepress-plugin-comment2";

export default {
  plugins: [
    commentPlugin({
      // your options
    }),
  ],
};
```

@tab JS

```js
// .vuepress/config.js
import { commentPlugin } from "vuepress-plugin-comment2";

export default {
  plugins: [
    commentPlugin({
      // your options
    }),
  ],
};
```

:::

## Migrating from V1

See [Migration Guide](./migration.md).

<NetlifyBadge />

<script setup lang="ts">
import NetlifyBadge from "@NetlifyBadge";
</script>
