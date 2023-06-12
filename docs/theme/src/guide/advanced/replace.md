---
title: Replacing Theme Components
icon: boxes-packing
order: -2
category:
  - Advanced
tag:
  - Advanced
  - Customize
---

When setting `{ custom: true }` in [Behavior options](../../config/theme/behavior.md), the theme will import components through `@theme-hope` alias, so you can use it to replace any component of the theme.

<!-- more -->

## Replace Components

You need to replace the component alias used in the theme with `alias` option in your own VuePress config file.

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { getDirname, path } from "@vuepress/utils";
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

const __dirname = getDirname(import.meta.url);

export default defineUserConfig({
  theme: hopeTheme(
    {
      // your theme config here
    },
    { custom: true }
  ),

  alias: {
    // Here you can redirect aliases to your own components
    // For example, here we change the theme's home page component to HomePage.vue under user .vuepress/components
    "@theme-hope/components/HomePage": path.resolve(
      __dirname,
      "./components/HomePage.vue"
    ),
  },
});
```

@tab JS

```js
// .vuepress/config.js
import { getDirname, path } from "@vuepress/utils";
import { hopeTheme } from "vuepress-theme-hope";

const __dirname = getDirname(import.meta.url);

export default {
  theme: hopeTheme(
    {
      // your theme config here
    },
    { custom: true }
  ),

  alias: {
    // Here you can redirect aliases to your own components
    // For example, here we change the theme's home page component to HomePage.vue under user .vuepress/components
    "@theme-hope/components/HomePage": path.resolve(
      __dirname,
      "./components/HomePage.vue"
    ),
  },
};
```

:::

Here are list of aliases.

::: details Theme components alias

Components:

- `@theme-hope/components/AutoLink`: basic link
- `@theme-hope/components/BreadCrumb`: breadcrumb
- `@theme-hope/components/CommonWrapper`: basic layout integration
- `@theme-hope/components/FeaturePanel`: homepage features
- `@theme-hope/components/HeroInfo`: homepage logo and introduction
- `@theme-hope/components/HighlightPanel`: homepage highlights
- `@theme-hope/components/HomePage`: home page
- `@theme-hope/components/HopeIcon`: icon
- `@theme-hope/components/MarkdownContent`: Markdown content
- `@theme-hope/components/NormalPage`: normal page
- `@theme-hope/components/PageFooter`: page footer
- `@theme-hope/components/PageNav`: page navigation
- `@theme-hope/components/PageTitle`: page title
- `@theme-hope/components/SkipLink`: skip to main content
- `@theme-hope/components/transitions/DropTransition`: drop transition component
- `@theme-hope/components/transitions/FadeSlideY`: fade slide y transition component

Miscellaneous:

- `@theme-hope/components/icons/index`: theme icons
- `@theme-hope/composables/index`: theme Composition API
- `@theme-hope/utils/index`: theme utility functions

:::

::: details Navbar component alias

Components:

- `@theme-hope/modules/navbar/components/DropdownLink`: dropdown list
- `@theme-hope/modules/navbar/components/LanguageDropdown`: language dropdown
- `@theme-hope/modules/navbar/components/NavActions`: navbar functions
- `@theme-hope/modules/navbar/components/Navbar`: navbar
- `@theme-hope/modules/navbar/components/NavbarBrand`: navbar brand information
- `@theme-hope/modules/navbar/components/NavbarLinks`: navbar links
- `@theme-hope/modules/navbar/components/NavScreen`: navigation screen in mobile view
- `@theme-hope/modules/navbar/components/NavScreenDropdown`: mobile view navbar dropdown menu
- `@theme-hope/modules/navbar/components/NavScreenLinks`: mobile view navbar links
- `@theme-hope/modules/navbar/components/RepoLink`: repository link
- `@theme-hope/modules/navbar/components/ToggleNavbarButton`: navbar toggle button
- `@theme-hope/modules/navbar/components/ToggleSidebarButton`: sidebar toggle button

Miscellaneous:

- `@theme-hope/modules/navbar/components/icons/index`: navbar icons
- `@theme-hope/modules/navbar/composables/index`: navbar Composition API

:::

::: details Sidebar component alias

Components:

- `@theme-hope/modules/sidebar/components/Sidebar`: sidebar
- `@theme-hope/modules/sidebar/components/SidebarChild`: sidebar link item
- `@theme-hope/modules/sidebar/components/SidebarGroup`: sidebar grouping links
- `@theme-hope/modules/sidebar/components/SidebarLinks`: sidebar links

Miscellaneous:

- `@theme-hope/modules/sidebar/composables/index`: sidebar Composition API
- `@theme-hope/modules/sidebar/utils/index`: sidebar utility functions

:::

::: details Info module component alias

Components:

- `@theme-hope/modules/info/components/AuthorInfo`: author information
- `@theme-hope/modules/info/components/CategoryInfo`: category information
- `@theme-hope/modules/info/components/DateInfo`: date information
- `@theme-hope/modules/info/components/OriginalInfo`: original mark
- `@theme-hope/modules/info/components/PageInfo`: page information
- `@theme-hope/modules/info/components/PageMeta`: page meta information
- `@theme-hope/modules/info/components/PageViewInfo`: page views information
- `@theme-hope/modules/info/components/ReadingTimeInfo`: reading time information
- `@theme-hope/modules/info/components/TagInfo`: tag information
- `@theme-hope/modules/info/components/TOC`: table of contents
- `@theme-hope/modules/info/components/WordInfo`: word information

Miscellaneous:

- `@theme-hope/modules/blog/components/icons`: info icons
- `@theme-hope/modules/blog/composables/index`: info Composables API
- `@theme-hope/modules/blog/utils/index`: info utility functions

:::

::: details Blog module component alias

Components:

- `@theme-hope/modules/blog/components/ArticleItem`: article item
- `@theme-hope/modules/blog/components/ArticleList`: article list
- `@theme-hope/modules/blog/components/ArticleType`: article type
- `@theme-hope/modules/blog/components/BloggerInfo`: blogger info
- `@theme-hope/modules/blog/components/BlogHero`: blog homepage logo and introduction
- `@theme-hope/modules/blog/components/BlogHome`: blog home page
- `@theme-hope/modules/blog/components/BlogWrapper`: common wrapper for blog page
- `@theme-hope/modules/blog/components/CategoryList`: Category list
- `@theme-hope/modules/blog/components/InfoList`: blog info list
- `@theme-hope/modules/blog/components/InfoPanel`: blog info panel
- `@theme-hope/modules/blog/components/Pagination`: pagination
- `@theme-hope/modules/blog/components/ProjectPanel`: blog homepage project panel
- `@theme-hope/modules/blog/components/SocialMedia`: social media links
- `@theme-hope/modules/blog/components/TagList`: tag list
- `@theme-hope/modules/blog/components/TimelineItems`: timeline items
- `@theme-hope/modules/blog/components/TimelineList`: timeline List

Miscellaneous:

- `@theme-hope/modules/blog/components/icons/index`: blog icons
- `@theme-hope/modules/blog/composables/index`: blog Composables API

:::

::: details Encryption module component alias

Components:

- `@theme-hope/modules/encrypt/components/GlobalEncrypt`: global encrypt wrapper
- `@theme-hope/modules/encrypt/components/LocalEncrypt`: local encrypt wrapper
- `@theme-hope/modules/encrypt/components/PasswordModal`: password input box

Miscellaneous:

- `@theme-hope/modules/encrypt/composables/index`: encryption Composition API
- `@theme-hope/modules/encrypt/utils/index`: encryption utility functions

:::

::: details Appearance module component alias

- `@theme-hope/modules/outlook/components/AppearanceMode`: theme mode
- `@theme-hope/modules/outlook/components/AppearanceSwitch`: theme appearance switch
- `@theme-hope/modules/outlook/components/OutlookButton`: appearance button
- `@theme-hope/modules/outlook/components/OutlookSettings`: appearance settings
- `@theme-hope/modules/outlook/components/ThemeColor`: theme color
- `@theme-hope/modules/outlook/components/ThemeColorPicker`: theme color picker
- `@theme-hope/modules/outlook/components/ToggleFullScreenButton`: fullscreen toggle button

Miscellaneous:

- `@theme-hope/modules/outlook/components/icons/index`: appearance icons
- `@theme-hope/modules/outlook/composables/index`: appearance Composition API

:::

## Using Slots

Some components provide slots, in this case, you can directly import the original component when overriding the component, and pass in the content you need through the slot.

::: tip

For demo of common slots, please refer [Main Layout Slot demo](../../demo/slot.md)。

:::

For example, if your site has strong social attributes, and you want to display a comment box on the homepage, you can display it like this:

::: code-tabs

@tab config.ts

```ts
// .vuepress/config.ts
import { getDirname, path } from "@vuepress/utils";
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

const __dirname = getDirname(import.meta.url);

export default defineUserConfig({
  theme: hopeTheme(
    {
      // your theme config here
    },
    { custom: true }
  ),

  alias: {
    // Here you can direct aliases to your own components
    // For example, here we change the theme's home page component to HomePage.vue under user .vuepress/components
    "@theme-hope/components/HomePage": path.resolve(
      __dirname,
      "./components/HomePage.vue"
    ),
  },
});
```

@tab HomePage.vue

```vue
<template>
  <HopeHomePage>
    <!-- Introduce comment component using bottom slot -->
    <template #bottom>
      <CommentService />
    </template>
  </HopeHomePage>
</template>
<script setup lang="ts">
import HopeHomePage from "vuepress-theme-hope/components/HomePage.js";
</script>
```

:::

Components that provide slots are as follows:

**Theme**:

- `AutoLink`: `default`, `before`, `after`
- `CommonWrapper`: `default`, `navbarStartBefore`, `navbarStartAfter`, `navbarCenterBefore`, `navbarCenterAfter`, `navbarEndBefore`, `navbarEndAfter`, `navScreenTop`, `navScreenBottom`, `sidebar`, `sidebarTop`, `sidebarBottom`
- `HeroInfo`: `heroImage`, `heroInfo`, `heroBg`

  - `heroInfo` slot will receive `text` `tagline` and `isFullScreen` props.
  - `heroImage` slot will receive `image` `imageDark` `heroStyle` `alt` and `isFullScreen` props.
  - `heroBg` slot will receive `image` `bgStyle` and `isFullScreen` props.

- `HomePage`: `top`, `center`, `bottom`
- `NormalPage`: `top`, `contentBefore`, `contentAfter`, `bottom`, `tocBefore`, `tocAfter`

**Blog**:

- `ArticleItem`: `title`, `cover`, `info`, `excerpt`

  - `title` slot will receive `title` `isEncrypted` and `type` props.
  - `excerpt` slot will receive `excerpt` props.
  - `cover` slot will receive `cover` props.
  - `info` slot will receive `info` props.

- `BlogHero`: `heroBg`, `heroInfo`

  - `heroInfo` slot will receive `text` `tagline` `image` `imageDark` `heroStyle` `alt` and `isFullScreen` props.
  - `heroBg` slot will receive `image` `bgStyle` and `isFullScreen` props.

**NavBar**:

- `DropdownLink`: `title`
- `NavActions`: `before`, `after`
- `Navbar`: `startBefore`, `startAfter`, `centerBefore`, `centerAfter`, `endBefore`, `endAfter`
- `NavbarBrand`: `default`
- `NavScreen`: `before`, `after`
- `NavScreenDropdown`: `before`, `after`

**SideBar**:

- `Sidebar`: `top`, `default`, `bottom`

**TOC**:

- `TOC`: `before`, `after`

::: tip

For the corresponding location and function of each slot, please refer to [theme source code](https://github.com/vuepress-theme-hope/vuepress-theme-hope/tree/main/packages/theme/src/client/).

:::
