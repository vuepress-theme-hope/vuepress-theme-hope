---
title: 指南
icon: lightbulb
---

这个插件将会向页面数据注入预计阅读时间与字数统计。

相关信息会注入到 `readingTime` 属性，格式如下:

```ts
interface ReadingTime {
  /** 分钟数 */
  minutes: number;
  /** 字数 */
  words: number;
}
```

<!-- more -->

## 在 Node 侧用

对于任何页面，你可以从 `page.data.readingTime` 获取预计阅读时间与字数统计:

```ts
page.data.readingTime; // { minutes: 3.2, words: 934 }
```

你可以在 `extendsPage` 生命周期获取它做进一步处理:

```ts
export default {
  // ...
  extendsPage: (page) => {
    page.data.readingTime;
  },
};
```

也可以在 `onInitialized` 生命周期获取每个页面的阅读时间:

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

## 客户端侧

你可以从 `vuepress-plugin-reading-time2` 导入 `useReadingTimeData` 和 `useReadingTimeLocale` 来获取当前页面的阅读时间数据和语言环境数据：

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

相关类型:

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
