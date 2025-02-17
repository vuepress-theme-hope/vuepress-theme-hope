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

覆盖 `@theme-hope/modules/blog/components/BlogHero`，将上方组件导入原 `BlogHero` 的 `bg` 插槽。

::: details 代码示例

```ts twoslash title=".vuepress/config.ts"
import { getDirname, path } from "vuepress/utils";
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
    <template #bg>
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

覆盖 `@theme-hope/modules/blog/components/BlogHero`，将上方组件导入原 `BlogHero` 的 `info` 插槽，同时原样传入插槽属性。

::: details 示例

```ts twoslash title=".vuepress/config.ts"
import { getDirname, path } from "vuepress/utils";
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
    <template #info="info">
      <HitokotoBlogHero v-bind="info" />
    </template>
  </BlogHero>
</template>
```

:::

## 组合式 API 相关

### 透明导航栏

让导航栏在特定页面中，位于页面顶部时透明。

```ts
export declare const setupTransparentNavbar: (options?: {
  /**
   * @default 'blog-homepage'
   */
  type?: "homepage" | "blog-homepage" | "all";

  /**
   * 透明的临界距离
   *
   * @default 50
   */
  threshold?: number;

  /**
   * 浅色模式下字体颜色
   */
  light?: string;

  /**
   * 深色模式下字体颜色
   */
  dark?: string;
}) => void;
```

::: details 代码示例

```ts twoslash title=".vuepress/client.ts"
import { defineClientConfig } from "vuepress/client";
import { setupTransparentNavbar } from "vuepress-theme-hope/presets/transparentNavbar.js";

export default defineClientConfig({
  setup: () => {
    setupTransparentNavbar({ type: "homepage" });
  },
});
```

:::

### 运行时间

获取站点的运行时间。

```ts
export declare const setupRunningTimeFooter: (
  /**
   * 计算运行时间的日期
   */
  date: string | Date,
  /**
   * 运行时间的本地化文字
   *
   * @description :day, :hour, :minute, :second 会被对应的值替换
   *
   * @default { "/": "Running time: :day days :hour hours :minute minutes :second seconds" }
   */
  locales?: Record<string, string>,

  /**
   * 是否保留页脚的原有内容
   *
   * @default false
   */
  preserveContent?: boolean,
) => void;
```

::: details 代码示例

```ts twoslash title=".vuepress/client.ts"
import { defineClientConfig } from "vuepress/client";
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

### 下雪效果

为站点添加下雪效果。

```ts
export declare const setupSnowFall: (options: {
  /**
   * 雪花的图片文件
   */
  image?: string;

  /**
   * 雪花数量
   *
   * @default 25
   */
  count?: number;

  /**
   * 雪花的最小大小 (像素)
   *
   * @default 5
   */
  minSize?: number;

  /**
   * 雪花的最大大小 (像素)
   *
   * @default 10
   */
  maxSize?: number;

  /**
   * 雪花的下落速度
   *
   * @default 1
   */
  speed?: number;
}) => void;
```

::: details 代码示例

```ts twoslash title=".vuepress/client.ts"
import { defineClientConfig } from "vuepress/client";
import { setupSnowFall } from "vuepress-theme-hope/presets/snowFall.js";

export default defineClientConfig({
  setup() {
    setupSnowFall();
  },
});
```

:::

## 配置相关

### 自定义博客类型

- 最近更新:

  ```ts
  // vuepress-theme-hope/presets/getRecentUpdatedArticles.js
  export interface RecentUpdateArticlesOptions {
    /**
     * 此博客类型的路径
     *
     * @default "/recent-updated/"
     */
    path?: string;

    /**
     * 博客类型的本地化文字
     *
     * @example {
     *  '/': 'Recent Updated',
     *  '/zh/': '最近更新',
     * }
     */
    locales?: Record<string, string>;
  }

  export declare const getRecentUpdatedArticles: (
    options: RecentUpdateArticlesOptions,
  ) => BlogTypeOptions;
  ```

  ::: details 代码示例

  ```ts twoslash
  import { hopeTheme } from "vuepress-theme-hope";
  import { getRecentUpdatedArticles } from "vuepress-theme-hope/presets/getRecentUpdatedArticles.js";

  export default {
    theme: hopeTheme({
      plugins: {
        blog: {
          type: [
            getRecentUpdatedArticles({
              locales: {
                "/": "Recent Updated",
                "/zh/": "最近更新",
              },
            }),
          ],
        },
      },
    }),
  };
  ```

  :::

- Slides:

  ```ts
  // vuepress-theme-hope/presets/getSlides.js
  export interface SlidesOptions {
    /**
     * 此博客类型的路径
     *
     *
     * @default "/slides/"
     */
    path?: string;

    /**
     * 博客类型的本地化文文字
     *
     * @example {
     *  '/': 'Slides',
     *  '/zh/': '幻灯片',
     * }
     */
    locales?: Record<string, string>;
  }

  export declare const getSlides: (options: SlidesOptions) => BlogTypeOptions;
  ```

  ::: details 代码示例

  ```ts twoslash
  import { hopeTheme } from "vuepress-theme-hope";
  import { getSlides } from "vuepress-theme-hope/presets/getSlides.js";

  export default {
    theme: hopeTheme({
      plugins: {
        blog: {
          type: [
            getSlides({
              locales: {
                "/": "Slides",
                "/zh/": "幻灯片",
              },
            }),
          ],
        },
      },
    }),
  };
  ```

  :::

## 样式相关

你可以创建 [客户端配置文件](../../cookbook/vuepress/config.md#客户端配置文件) `.vuepress/client.{ts,js}`，并通过 `import` 语句导入下方文件。

### 文档

- `"vuepress-theme-hope/presets/shinning-feature-panel.scss"`: 为项目主页的特性添加闪光效果。

### 博客

- `"vuepress-theme-hope/presets/left-blog-info.scss"`: 将博主信息移动至文章列表的左侧。
- `"vuepress-theme-hope/presets/round-blogger-avatar.scss"`: 将博主头像裁剪为圆形。
- `"vuepress-theme-hope/presets/squircle-blogger-avatar.scss"`: 将博主头像裁剪为圆角矩形。

### 其他

- `"vuepress-theme-hope/presets/bounce-icon.scss"`: 为页面图标添加鼠标悬停的跳动效果。
- `"vuepress-theme-hope/presets/hide-navbar-icon.scss"`: 隐藏导航栏图标。
- `"vuepress-theme-hope/presets/hide-sidebar-icon.scss"`: 隐藏侧边栏图标。
- `"vuepress-theme-hope/presets/hr-driving-car.scss"`: 为所有 hr 元素添加驾驶的车图标

## 更多

如果你在 VuePress Theme Hope 的基础上，做了很棒的自定义，你可以将它们抽离成预设并给我们发送 PR。
