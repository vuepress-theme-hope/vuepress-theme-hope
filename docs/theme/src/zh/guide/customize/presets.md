---
title: 主题预设
icon: palette
category:
  - 自定义
tag:
  - 自定义
  - 预设
---

为了满足不同用户的需求，主题提供了一些预设，你可以在 `vuepress-theme-hope/presets` 下获取它们并自行导入。

## 组件相关

::: tip

为了通过别名替换组件，你需要将 `{ custom: true }` 作为第二个选项传入 `hopeTheme`。

:::

### 必应壁纸

将博客主页的背景替换为每日的必应壁纸。

组件:

- `"vuepress-theme-hope/presets/BingHeroBackground.js"`: 每日必应壁纸组件

使用:

覆盖 `@theme-hope/modules/blog/components/BlogHero`，将上方组件导入原 `BlogHero` 的 `heroBg` 插槽。

::: details 代码示例

```ts
// .vuepress/config.ts
import { getDirname, path } from "@vuepress/utils";
import { defineUserConfig } from "vuepress";

const __dirname = getDirname(import.meta.url);

export default defineUserConfig({
  // ...

  alias: {
    "@theme-hope/modules/blog/components/BlogHero": path.resolve(
      __dirname,
      "./components/BlogHero.vue",
    ),
  },
});
```

```vue
<!-- .vuepress/components/BlogHero.vue -->
<script setup lang="ts">
import BlogHero from "vuepress-theme-hope/blog/components/BlogHero.js";
import BingHeroBackground from "vuepress-theme-hope/presets/BingHeroBackground.js";
</script>

<template>
  <BlogHero>
    <template #heroBg>
      <BingHeroBackground />
    </template>
  </BlogHero>
</template>
```

:::

### 一言描述

将博客主页的描述替换为随机的一言词句。

组件:

- `"vuepress-theme-hope/presets/HitokotoBlogHero.js"`: 一言名句组件

使用:

覆盖 `@theme-hope/modules/blog/components/BlogHero`，将上方组件导入原 `BlogHero` 的 `heroInfo` 插槽，同时原样传入插槽属性。

::: details 示例

```ts
// .vuepress/config.ts
import { getDirname, path } from "@vuepress/utils";
import { defineUserConfig } from "vuepress";

const __dirname = getDirname(import.meta.url);

export default defineUserConfig({
  // ...

  alias: {
    "@theme-hope/modules/blog/components/BlogHero": path.resolve(
      __dirname,
      "./components/BlogHero.vue",
    ),
  },
});
```

```vue
<!-- .vuepress/components/BlogHero.vue -->
<script setup lang="ts">
import BlogHero from "vuepress-theme-hope/blog/components/BlogHero.js";
import HitokotoBlogHero from "vuepress-theme-hope/presets/HitokotoBlogHero.js";
</script>

<template>
  <BlogHero>
    <template #heroInfo="heroInfo">
      <HitokotoBlogHero v-bind="heroInfo" />
    </template>
  </BlogHero>
</template>
```

:::

## 组合式 API 相关

### 运行时间

获取站点的运行时间。

```ts
export const setupRunningTimeFooter: (
  /**
   * 计算运行时间的日期
   */
  date: string | Date,
  /**
   * 运行时间的本地化文字
   *
   * @description :day, :hour, :minute, :second 会被对应的值替换
   */
  locales: Record<string, string> = {
    "/": "Running time: :day days :hour hours :minute minutes :second seconds",
  },
  /**
   * 是否保留页脚的原有内容
   *
   * @default false
   */
  preserveContent = false,
) => void;
```

::: details 代码示例

```ts
// .vuepress/client.ts
import { defineClientConfig } from "@vuepress/client";
import { setupRunningTimeFooter } from "vuepress-theme-hope/presets/footerRunningTime.js";

export default defineClientConfig({
  setup() {
    setupRunningTimeFooter(
      new Date("2022-01-01"),
      {
        "/": "Running time: :day days :hour hours :minute minutes :second seconds",
        "/zh/": "已运行 :day 天 :hour 小时 :minute 分钟 :second 秒",
      },
      true,
    );
  },
});
```

:::

## 样式相关

你可以创建客户端配置文件 `.vuepress/client.{ts,js}`，并通过 `import` 语句导入下方文件。

### 文档

- `"vuepress-theme-hope/presets/shinning-feature-panel.scss"`: 为项目主页的特性添加闪光效果。

### 博客

- `"vuepress-theme-hope/presets/left-blog-info.scss"`: 将博主信息移动至文章列表的左侧。

### 其他

- `"vuepress-theme-hope/presets/bounce-icon.scss"`: 为页面图标添加鼠标悬停的跳动效果。

## 更多

如果你在 VuePress Theme Hope 的基础上，做了很棒的自定义，你可以将它们抽离成预设并给我们发送 PR。
