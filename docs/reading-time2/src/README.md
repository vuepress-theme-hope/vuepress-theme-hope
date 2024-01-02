---
home: true
title: Home
icon: home
heroText: vuepress-plugin-reading-time2
tagline: Expect reading time and word count statistics
actions:
  - text: Guide
    icon: lightbulb
    link: ./guide.html
    type: primary

  - text: Config
    icon: tools
    link: ./config.html

footer: Theme by <a href="https://theme-hope.vuejs.press" target="_blank">VuePress Theme Hope</a> | MIT Licensed, Copyright © 2019-present Mr.Hope

copyright: false
---

## How to use

### Install

::: code-tabs#shell

@tab pnpm

```bash
pnpm add -D vuepress-plugin-reading-time2
```

@tab yarn

```bash
yarn add -D vuepress-plugin-reading-time2
```

@tab npm

```bash
npm i -D vuepress-plugin-reading-time2
```

:::

### Usage

In config file:

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { readingTimePlugin } from "vuepress-plugin-reading-time2";

export default {
  plugins: [
    readingTimePlugin({
      // your options
    }),
  ],
};
```

@tab JS

```js
// .vuepress/config.js
import { readingTimePlugin } from "vuepress-plugin-reading-time2";

export default {
  plugins: [
    readingTimePlugin({
      // your options
    }),
  ],
};
```

:::

In any components:

```vue
<script setup lang="ts">
import {
  useReadingTimeData,
  useReadingTimeLocale,
} from "vuepress-plugin-reading-time2/client";

const readingTimeData = useReadingTimeData(); // { minutes: 1.1, words: 100 }
const readingTimeLocale = useReadingTimeLocale(); // { time: "1 minute", words: "100 words" }
</script>
```
