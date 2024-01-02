---
title: Guide
icon: lightbulb
---

This plugin will inject expect reading time and word count statistics into the page data.

Relevant information will be injected into page data with `readingTime` property in format:

```ts
interface ReadingTime {
  /** Expect reading minute */
  minutes: number;
  /** Words count */
  words: number;
}
```

<!-- more -->

## Using the plugin

This plugin is targeting plugin and theme developers mostly, so we strongly recommend you to use this plugin with it's use api:

```ts
// your plugin or theme entry
import { useReadingTimePlugin } from "vuepress-plugin-reading-time2";

export default (options) => (app) => {
  useReadingTimePlugin(app, {
    // your options
  });

  return {
    name: "vuepress-plugin-xxx", // or vuepress-theme-xxx
  };
};
```

::: tip Why you need "use" api

1. When you register a plugin multiple times, vuepress will gives you warning about that telling you only the first one takes effect. The `useReadingTimePlugin` automatically detects if the plugin is registered and avoid registering multiple times.
1. If you access reading time data in `extendsPage` lifecycle, then `vuepress-plugin-reading-time2` must be called before your theme or plugin, otherwise you will get `undefined` for `page.data.readingTime`. The `useReadingTimePlugin` ensures that `vuepress-plugin-reading-time2` is called before your theme or plugin.

:::

We also provides a `removeReadingTimePlugin` api to remove the plugin.You can use this to ensure your call take effect or clear the plugin:

```ts
// your plugin or theme entry
import { useReadingTimePlugin } from "vuepress-plugin-reading-time2";

export default (options) => (app) => {
  // this removes any existing reading time plugin at this time
  removeReadingTimePlugin(app);

  // so this will take effect even if there is a reading time plugin registered before
  useReadingTimePlugin(app, {
    // your options
  });

  return {
    name: "vuepress-plugin-xxx", // or vuepress-theme-xxx
  };
};
```

## Getting data on Node Side

For any page, you can get estimated reading time and word count from `page.data.readingTime`:

```ts
page.data.readingTime; // { minutes: 3.2, words: 934 }
```

You can access it for further processing in the `extendsPage` lifecycle and other lifecycle:

```ts
export default {
  // ...
  extendsPage: (page) => {
    page.data.readingTime; // { minutes: 3.2, words: 934 }
  },

  onInitialized: (app) => {
    app.pages.map((page) => {
      page.data.readingTime; // { minutes: 3.2, words: 934 }
    });
  },
};
```

## Getting data on Client Side

You can import `useReadingTimeData` and `useReadingTimeLocale` from `vuepress-plugin-reading-time2/client` to get the reading time data and locale data of the current page:

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
