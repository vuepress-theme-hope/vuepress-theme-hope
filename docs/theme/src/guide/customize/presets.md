---
title: Theme Presets
icon: palette
order: 7
category:
  - Customize
tag:
  - Customize
  - Preset
---

In order to meet the needs of different users, the theme provides some presets, you can get them under `vuepress-theme-hope/presets` and import them yourself.

## Component related

### Bing Wallpapers

Replace the background of your blog's homepage with daily Bing wallpaper.

Usage:

Override `heroBg` slot of `<Blog>` with the component from `"vuepress-theme-hope/presets/BingHeroBackground.js"`.

::: details Code Example

```vue title=".vuepress/layouts/Blog.vue"
<script setup lang="ts">
import { Blog } from "vuepress-theme-hope/blog";
import BingHeroBackground from "vuepress-theme-hope/presets/BingHeroBackground.js";
</script>

<template>
  <Blog>
    <template #heroBg>
      <BingHeroBackground />
    </template>
  </Blog>
</template>
```

```ts title=".vuepress/client.ts"
import { defineClientConfig } from "vuepress/client";
import Blog from "./layouts/Blog.vue";

export default defineClientConfig({
  //...

  layouts: {
    // ...
    Blog,
  },
});
```

:::

### Hitokoto Description

Replace the description of the blog's home page with a random Hitokoto sentence (Chinese only).

Usage:

Override `heroInfo` slot of `<Blog>` with the component from `"vuepress-theme-hope/presets/HitokotoBlogHero.js"`.

::: details Code Example

```vue title=".vuepress/layouts/Blog.vue"
<script setup lang="ts">
import { Blog } from "vuepress-theme-hope/blog";
import HitokotoBlogHero from "vuepress-theme-hope/presets/HitokotoBlogHero.js";
</script>

<template>
  <Blog>
    <template #heroInfo="data">
      <HitokotoBlogHero v-bind="data" />
    </template>
  </Blog>
</template>
```

```ts title=".vuepress/client.ts"
import { defineClientConfig } from "vuepress/client";
import Blog from "./layouts/Blog.vue";

export default defineClientConfig({
  //...

  layouts: {
    // ...
    Blog,
  },
});
```

:::

## Composable Related

### Transparent Navbar

Make navbar transparent in certain pages while at page top.

```ts
export declare const setupTransparentNavbar: (options?: {
  /**
   * @default 'blog-homepage'
   */
  type?: "homepage" | "blog-homepage" | "all";

  /**
   * Transparent threshold
   *
   * @default 50
   */
  threshold?: number;

  /**
   * Text color in light mode
   */
  light?: string;

  /**
   * Text color in dark mode
   */
  dark?: string;
}) => void;
```

::: details Code Example

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

### Running time

Get the running time of the site in footer.

```ts
export declare const setupRunningTimeFooter: (
  /**
   * The date to calculate the running time
   */
  date: string | Date,
  /**
   * The locales of running time
   *
   * @description :day, :hour, :minute, :second will be replaced by the corresponding value
   *
   * @default { "/": "Running time: :day days :hour hours :minute minutes :second seconds" }
   */
  locales?: Record<string, string>,
  /**
   * Whether to preserve the original content of the footer
   *
   * @default false
   */
  preserveContent?: boolean,
) => void;
```

::: details Code Example

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

### Snowfall

Add snowfall effect to the site.

```ts
export declare const setupSnowFall: (options: {
  /**
   * Image of snowflake
   */
  image?: string;

  /**
   * Count of snowflakes
   *
   * @default 25
   */
  count?: number;

  /**
   * Min size of snowflake in pixels
   *
   * @default 5
   */
  minSize?: number;

  /**
   * Max size of snowflake in pixels
   *
   * @default 10
   */
  maxSize?: number;

  /**
   * Speed of snowflake
   *
   * @default 1
   */
  speed?: number;
}) => void;
```

::: details Code Example

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

## Config Related

### Custom Blog Types

- Recent Updated:

  ```ts
  // vuepress-theme-hope/presets/getRecentUpdatedArticles.js
  export interface RecentUpdateArticlesOptions {
    /**
     * Path of this blog type
     *
     * @default "/recent-updated/"
     */
    path?: string;

    /**
     * Locale text for the blog type
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

  ::: details Code Example

  ```ts twoslash title=".vuepress/theme.ts"
  import { hopeTheme } from "vuepress-theme-hope";
  import { getRecentUpdatedArticles } from "vuepress-theme-hope/presets/getRecentUpdatedArticles.js";

  export default hopeTheme({
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
  });
  ```

  :::

- Slides:

  ```ts
  // vuepress-theme-hope/presets/getSlides.js
  export interface SlidesOptions {
    /**
     * Path of this blog type
     *
     * @default "/slides/"
     */
    path?: string;

    /**
     * Locales for the blog type
     *
     * @example {
     *  '/': 'Slides',
     *  '/zh/': '幻灯片',
     * }
     */
    locales?: Record<string, string>;
  }

  export declare const getSlides = (options: SlidesOptions) => BlogTypeOptions;
  ```

  ::: details Code Example

  ```ts twoslash title=".vuepress/theme.ts"
  import { hopeTheme } from "vuepress-theme-hope";
  import { getSlides } from "vuepress-theme-hope/presets/getSlides.js";

  export default hopeTheme({
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
  });
  ```

  :::

## Style Related

You can create a [client config file](../../cookbook/vuepress/config.md#client-config-file) and import the following files through the `import` statement.

### Docs

- `"vuepress-theme-hope/presets/shinning-feature-panel.scss"`: Add shinning effect to the features of the project home page.

### Blog

- `"vuepress-theme-hope/presets/left-blog-info.scss"`: Move the blogger information to the left of the article list.
- `"vuepress-theme-hope/presets/round-blogger-avatar.scss"`: Clip blogger avatar to round shape
- `"vuepress-theme-hope/presets/squircle-blogger-avatar.scss"`: Clip blogger avatar to a squircle

### Others

- `"vuepress-theme-hope/presets/bounce-icon.scss"`: Add a mouseover bounce effect to the page icon.
- `"vuepress-theme-hope/presets/hide-navbar-icon.scss"`: Hide navbar icon.
- `"vuepress-theme-hope/presets/hide-sidebar-icon.scss"`: Hide sidebar icon.
- `"vuepress-theme-hope/presets/hr-driving-car.scss"`: Add a driving car to all hr elements

## More

If you have great customizations based on VuePress Theme Hope, you can pull them out into presets and send us a PR.
