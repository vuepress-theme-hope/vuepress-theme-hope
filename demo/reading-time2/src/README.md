---
home: true
title: Home
icon: home
heroImage: https://theme-hope-assets.vuejs.press/logo.svg
heroText: vuepress-plugin-reading-time2
tagline: Reading time plugin for VuePress2
actions:
  - text: Docs
    link: https://plugin-reading-time2.vuejs.press

footer: MIT Licensed, Copyright © 2019-present Mr.Hope
---

## How to use

### Install

```bash
pnpm add -D vuepress-plugin-reading-time2
```

### Usage

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

In any components:

```vue
<script setup lang="ts">
import {
  useReadingTimeData,
  useReadingTimeLocale,
} from "vuepress-plugin-reading-time2/client";

const readingTimeData = useReadingTimeData(); // { minute: 1.1, words: 100 }
const readingTimeLocale = useReadingTimeLocale(); // { time: "1 minute", words: "100 words" }
</script>

<template>
  <p>
    Readable content:
    <ul>
      <li>Reading time: {{ readingTimeLocale.time }}</li>
      <li>Words count: {{ readingTimeLocale.words }}</li>
    </ul>
  </p>

  <p>
    Data:
    <ul>
      <li>Expect reading time (in minutes): {{ readingTimeData.minutes }}</li>
      <li>Number of Words in page: {{ readingTimeData.words }}</li>
    </ul>
  </p>
</template>
```

Readable content:

- Reading time: {{ readingTimeLocale.time }}
- Words count: {{ readingTimeLocale.words }}

Data:

- Expect reading time (in minutes): {{ readingTimeData.minutes }}
- Number of Words in page: {{ readingTimeData.words }}

<script setup lang="ts">
import {
  useReadingTimeData,
  useReadingTimeLocale,
} from "vuepress-plugin-reading-time2/client";

const readingTimeData = useReadingTimeData(); // { minute: 1.1, words: 100 }
const readingTimeLocale = useReadingTimeLocale(); // { time: "1 minute", words: "100 words" }
</script>
