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

You can get relevant data directly on the client side:

```vue
<template>
  <div>
    <p>Expect reading time: {{ page.readingTime.minutes }} minute(s)</p>
    <p>Word count: {{ page.readingTime.words }} words</p>
  </div>
</template>

<script setup lang="ts">
import { usePageData } from "@vuepress/client";
import { computed } from "vue";

const pageData = usePageData();
</script>
```

If you want to use with different locales, we provide the multilingual variable `READING_TIME_LOCALES` globally. By installing and introducing `vuepress-shared`, you can automatically provide multilingual text for all pages:

```vue
<template>
  <div>
    <p>{{ readingTimeInfo.time }}</p>
    <p>{{ readingTimeInfo.word }}</p>
  </div>
</template>

<script setup lang="ts">
import { usePageData } from "@vuepress/client";
import { computed } from "vue";
import { useLocaleConfig } from "vuepress-shared/client";

const pageData = usePageData();
const readingTimeLocale = useLocaleConfig(readingTimeLocales);

// locale text
const readingTimeInfo = computed(() => {
  const { minutes, words } = pageData.value.readingTime;

  return {
    time:
      minutes < 1
        ? // we have a special hint for < 1 min
          readingTimeLocale.value.less1Minute
        : readingTimeLocale.value.time.replace(
            "$time",
            Math.round(minutes).toString()
          ),
    word: readingTimeLocale.value.word.replace("$word", words),
  };
});
</script>
```
