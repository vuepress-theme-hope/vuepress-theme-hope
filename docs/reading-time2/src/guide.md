---
title: Guide
icon: lightbulb
---

This plugin will inject expect reading time and word count statistics into the page data.

Relevant information will be injected into the `readingTime` property in the following format:

```ts
interface ReadingTime {
  /** Expect reading minute */
  minutes: number;
  /** Words count */
  words: number;
}
```

<!-- more -->

## Node Side

For any page, you can get estimated reading time and word count from `page.data.readingTime`:

```ts
page.data.readingTime; // { minutes: 3.2, words: 934 }
```

You can access it for further processing in the `extendsPage` lifecycle:

```ts
export default {
  // ...
  extendsPage: (page) => {
    page.data.readingTime;
  },
};
```

You can also get the reading time of each page in the `onInitialized` lifecycle:

```ts
export default {
  // ...
  onInitialized: (app) => {
    app.pages.map((page) => {
      page.data.readingTime;
    });
  },
};
```

## Client Side

You can import `useReadingTimeData` and `useReadingTimeLocale` from `vuepress-plugin-reading-time2` to get the reading time data and locale data of the current page:

```vue
<script setup lang="ts">
import {
  useReadingTimeData,
  useReadingTimeLocale,
} from "vuepress-plugin-reading-time2/client";

const readingTimeData = useReadingTimeData();
const readingTimeLocale = useReadingTimeLocale();
</script>
```

Related types:

```ts
interface ReadingTime {
  minutes: number;
  words: number;
}

export const useReadingTimeData: () => ComputedRef<ReadingTime | null>;

interface ReadingTimeLocale {
  time: string;
  words: string;
}

export const useReadingTimeLocale: () => ComputedRef<ReadingTimeLocale>;
```
