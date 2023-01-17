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

你可以直接在客户端侧获取相关数据:

```vue
<template>
  <div>
    <p>预计阅读时间: {{ page.readingTime.minutes }} 分钟</p>
    <p>字数: {{ page.readingTime.words }} 字</p>
  </div>
</template>

<script setup lang="ts">
import { usePageData } from "@vuepress/client";
import { computed } from "vue";

const pageData = usePageData();
</script>
```

如果你希望和内置多语言嵌套使用，我们全局提供了多语言变量 `READING_TIME_LOCALES`，通过安装并引入 `vuepress-shared`，你可以自动为所有页面提供多语言文本:

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

// 多语言文本
const readingTimeInfo = computed(() => {
  const { minutes, words } = pageData.value.readingTime;

  return {
    time:
      minutes < 1
        ? // 小于一分钟有一个特殊的提示
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
