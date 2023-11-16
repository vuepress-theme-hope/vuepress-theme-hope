---
home: true
title: Home
icon: home
bgImage: https://theme-hope-assets.vuejs.press/bg/6-light.svg
bgImageDark: https://theme-hope-assets.vuejs.press/bg/6-dark.svg
bgImageStyle:
  background-attachment: fixed
heroText: vuepress-plugin-comment2
tagline: Comment and pageview plugin for VuePress2
actions:
  - text: Guide
    icon: lightbulb
    link: ./guide/
    type: primary

  - text: Config
    icon: tools
    link: ./config/

highlights:
  - header: Giscus
    bgImage: https://theme-hope-assets.vuejs.press/bg/10-light.svg
    bgImageDark: https://theme-hope-assets.vuejs.press/bg/10-dark.svg
    bgImageStyle:
      background-attachment: local
    image: /assets/image/github-dark.svg
    imageDark: /assets/image/github-light.svg
    description: |-
      A comments system powered by GitHub Discussions.
    type: no-order
    highlights:
      - title: Learn more
        link: ./guide/giscus.html

  - header: Waline
    image: https://waline.js.org/logo.png
    bgImage: https://theme-hope-assets.vuejs.press/bg/2-light.svg
    bgImageDark: https://theme-hope-assets.vuejs.press/bg/2-dark.svg
    bgImageStyle:
      background-repeat: repeat
      background-size: initial
    description: |-
      A powerful comment system with backend
    type: no-order
    highlights:
      - title: Learn more
        link: ./guide/waline.html

  - header: Twikoo
    bgImage: https://theme-hope-assets.vuejs.press/bg/11-light.svg
    bgImageDark: https://theme-hope-assets.vuejs.press/bg/11-dark.svg
    bgImageStyle:
    image: /assets/image/twikoo.png
    description: |-
      A concise, safe and free static site commenting system, based on Tencent Cloud Development.
    type: no-order
    highlights:
      - title: Learn more
        link: ./guide/twikoo.html

  - header: Artalk
    bgImage: https://theme-hope-assets.vuejs.press/bg/7-light.svg
    bgImageDark: https://theme-hope-assets.vuejs.press/bg/7-dark.svg
    bgImageStyle:
      background-size: initial
    image: https://artalk.js.org/favicon.png
    description: |-
      A neat self-hosted commenting system based on golang server.
    type: no-order
    highlights:
      - title: Learn more
        link: ./guide/artalk.html

footer: Theme by <a href="https://theme-hope.vuejs.press" target="_blank">VuePress Theme Hope</a> | MIT Licensed, Copyright © 2019-present Mr.Hope

copyright: false
---

<HighlightPanel header="How to use" image="/assets/image/box.svg" bgImage="https://theme-hope-assets.vuejs.press/bg/3-light.svg" bgImageDark="https://theme-hope-assets.vuejs.press/bg/3-dark.svg">
<template #highlights>

### Install

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

</template>
</HighlightPanel>

<script setup lang="ts">
import HighlightPanel from "@theme-hope/components/HighlightPanel";
</script>
