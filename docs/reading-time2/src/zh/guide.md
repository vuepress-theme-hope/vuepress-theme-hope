---
title: 指南
icon: lightbulb
---

这个插件将会向页面数据注入预计阅读时间与字数统计。

相关信息会注入到页面数据的 `readingTime` 属性，格式如下:

```ts
interface ReadingTime {
  /** 分钟数 */
  minutes: number;
  /** 字数 */
  words: number;
}
```

<!-- more -->

## 使用插件

此插件主要面向插件和主题开发者，所以我们强烈建议你使用它的 use api:

```ts
// 你插件或主题的入口
import { useReadingTimePlugin } from "vuepress-plugin-reading-time2";

export default (options) => (app) => {
  useReadingTimePlugin(app, {
    // 你的选项
  });

  return {
    name: "vuepress-plugin-xxx", // or vuepress-theme-xxx
  };
};
```

::: tip 为什么需要 "use" api

1. 当你多次注册一个插件时，vuepress 会给你一个警告，告诉你只有第一个插件会生效。`useReadingTimePlugin` 会自动检测插件是否已经注册，避免多次注册。

1. 如果你在 `extendsPage` 生命周期访问阅读时间数据，那么 `vuepress-plugin-reading-time2` 必须在你的主题或插件之前被调用，否则你会得到未定义的 `page.data.readingTime`。`useReadingTimePlugin` 确保了 `vuepress-plugin-reading-time2` 在你的主题或插件之前被调用。

:::

我们也提供了一个 `removeReadingTimePlugin` api 来移除插件。你可以使用它来确保你的调用生效或清除插件:

```ts
// 你插件或主题的入口
import { useReadingTimePlugin } from "vuepress-plugin-reading-time2";

export default (options) => (app) => {
  // 这会移除任何当前存在的阅读时间插件
  removeReadingTimePlugin(app);

  // 所以这会生效，即使之前已经注册了一个阅读时间插件
  useReadingTimePlugin(app, {
    // 你的选项
  });

  return {
    name: "vuepress-plugin-xxx", // or vuepress-theme-xxx
  };
};
```

## 在 Node 侧获取数据

对于任何页面，你可以从 `page.data.readingTime` 获取预计阅读时间与字数统计:

```ts
page.data.readingTime; // { minutes: 3.2, words: 934 }
```

你可以在 `extendsPage` 以及其他生命周期获取它做进一步处理:

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

## 在客户端侧获取数据

你可以从 `vuepress-plugin-reading-time2/client` 导入 `useReadingTimeData` 和 `useReadingTimeLocale` 来获取当前页面的阅读时间数据和语言环境数据：

```vue
<script setup lang="ts">
import {
  useReadingTimeData,
  useReadingTimeLocale,
} from "vuepress-plugin-reading-time2/client";

const readingTimeData = useReadingTimeData(); // { minutes: 1.1, words: 100 }
const readingTimeLocale = useReadingTimeLocale(); // { time: "1 分钟", words: "100 字" }
</script>
```
