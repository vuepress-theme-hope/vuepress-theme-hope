---
title: Theme Presets
icon: palette
order: 6
category:
  - Customize
tag:
  - Customize
  - Preset
---

In order to meet the needs of different users, the theme provides some presets, you can get them under `vuepress-theme-hope/presets` and import them yourself.

## Component related

::: tip

To replace component using alias, you need to set `{ custom: true }` as second argument to `hopeTheme`.

:::

### Bing Wallpapers

Replace the background of your blog's homepage with daily Bing wallpaper.

Components:

- `"vuepress-theme-hope/presets/BingHeroBackground.js"`: Daily Bing wallpaper component

Usage:

Override `@theme-hope/modules/blog/components/BlogHero` and import the above component into the `bg` slot of the original `BlogHero`.

::: details Code Example

```ts title=".vuepress/config.ts"
import { getDirname, path } from "vuepress/utils";
import { defineUserConfig } from "vuepress";

const __dirname = getDirname(import.meta.url);

export default defineUserConfig({
  //...

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

### Hitokoto Description

Replace the description of the blog's home page with a random Hitokoto sentence (Chinese only).

Components:

- `"vuepress-theme-hope/presets/HitokotoBlogHero.js"`: A sentence component

Usage:

Override `@theme-hope/modules/blog/components/BlogHero`, import the above component into the `info` slot of the original `BlogHero`, and pass in the slot properties as they are.

::: details Code Example

```ts title=".vuepress/config.ts"
import { getDirname, path } from "vuepress/utils";
import { defineUserConfig } from "vuepress";

const __dirname = getDirname(import.meta.url);

export default defineUserConfig({
  //...

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

## Composable Related

### Transparent Navbar

Make navbar transparent in certain pages while at page top.

```ts
export interface TransparentNavbarOptions {
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
   * Text color in lightmode
   *
   * @default '#fff'
   */
  light?: string;

  /**
   * Text color in darkmode
   *
   * @default '#bbb'
   */
  dark?: string;
}

export const setupTransparentNavbar: (
  options?: TransparentNavbarOptions,
) => void;
```

::: details Code Example

```ts title=".vuepress/client.ts"
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
const setupRunningTimeFooter: (
  /**
   * The date to calculate the running time
   */
  date: string | Date,
  /**
   * The locales of running time
   *
   * @description :day, :hour, :minute, :second will be replaced by the corresponding value
   */
  locales: Record<string, string> = {
    "/": "Running time: :day days :hour hours :minute minutes :second seconds",
  },
  /**
   * Whether to preserve the original content of the footer
   *
   * @default false
   */
  preserveContent = false,
) => void;
```

::: details Code Example

```ts title=".vuepress/client.ts"
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

## Style Related

You can create a [client config file](../../cookbook/vuepress/config.md#client-config-file) and import the following files through the `import` statement.

### Docs

- `"vuepress-theme-hope/presets/shinning-feature-panel.scss"`: Add shinning effect to the features of the project home page.

### Blog

- `"vuepress-theme-hope/presets/left-blog-info.scss"`: Move the blogger information to the left of the article list.
- `"vuepress-theme-hope/presets/round-blogger-avatar.scss"`: Clip blogger avatar to round shape

### Others

- `"vuepress-theme-hope/presets/bounce-icon.scss"`: Add a mouseover bounce effect to the page icon.
- `"vuepress-theme-hope/presets/hide-navbar-icon.scss"`: Hide navbar icon.
- `"vuepress-theme-hope/presets/hide-sidebar-icon.scss"`: Hide sidebar icon.
- `"vuepress-theme-hope/presets/hr-driving-car.scss"`: Add a driving car to all hr elements

## More

If you have great customizations based on VuePress Theme Hope, you can pull them out into presets and send us a PR.
