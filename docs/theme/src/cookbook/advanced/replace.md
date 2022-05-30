---
title: Replacing Theme Components
icon: customize
category:
  - Advanced
tag:
  - Advanced
  - Customize
---

The theme imports components through `alias`, so you can use it to replace any component of the theme.

<!-- more -->

## Replace Components

You need to replace the component alias used in the theme with `alias` option in your own VuePress config file.

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { path } from "@vuepress/utils";
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    // your theme config here
  }),

  alias: {
    // Here you can redirect aliases to your own components
    // For example, here we change the theme’s home page component to HomePage.vue under user .vuepress/components
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
const { path } = require("@vuepress/utils");
const { hopeTheme } = require("vuepress-theme-hope");

module.exports = {
  theme: hopeTheme({
    // your theme config here
  }),

  alias: {
    // Here you can redirect aliases to your own components
    // For example, here we change the theme’s home page component to HomePage.vue under user .vuepress/components
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
- `@theme-hope/components/BreadCrumb`: breacrumb
- `@theme-hope/components/CommonWrapper`: basic layout integration
- `@theme-hope/components/HomeFeatures`: homepage features
- `@theme-hope/components/HomeHero`: homepage logo and introduction
- `@theme-hope/components/HomePage`: home page
- `@theme-hope/components/Icon`: icon
- `@theme-hope/components/MarkdownContent`: Markdown content
- `@theme-hope/components/NormalPage`: normal page
- `@theme-hope/components/PageFooter`: page footer
- `@theme-hope/components/PageNav`: page navigation
- `@theme-hope/components/PageTitle`: page title
- `@theme-hope/components/SkipLink`: skip to main content

Miscellaneous:

- `@theme-hope/components/icons`: theme icons
- `@theme-hope/components/transitions`: theme transitions
- `@theme-hope/composables`: theme Composition API
- `@theme-hope/utils`: theme utility functions

:::

::: details Navbar component alias

Components:

- `@theme-hope/module/navbar/components/DropdownLink`: dropdown list
- `@theme-hope/module/navbar/components/LanguageDropdown`: language dropdown
- `@theme-hope/module/navbar/components/NavActions`: navbar functions
- `@theme-hope/module/navbar/components/Navbar`: navbar
- `@theme-hope/module/navbar/components/NavbarBrand`: navbar brand information
- `@theme-hope/module/navbar/components/NavbarLinks`: navbar links
- `@theme-hope/module/navbar/components/NavScreen`: navigation screen in mobile view
- `@theme-hope/module/navbar/components/NavScreenDropdown`: mobile view navbar dropdown menu
- `@theme-hope/module/navbar/components/NavScreenLinks`: mobile view navbar links
- `@theme-hope/module/navbar/components/RepoLink`: repository link
- `@theme-hope/module/navbar/components/ToggleNavbarButton`: navbar toggle button
- `@theme-hope/module/navbar/components/ToggleSidebarButton`: sidebar toggle button

Miscellaneous:

- `@theme-hope/module/navbar/components/icons`: navbar icons
- `@theme-hope/module/navbar/composables`: navbar Composition API

:::

::: details Sidebar component alias

Components:

- `@theme-hope/module/sidebar/components/Sidebar`: sidebar
- `@theme-hope/module/sidebar/components/SidebarChild`: sidebar link item
- `@theme-hope/module/sidebar/components/SidebarGroup`: sidebar grouping links
- `@theme-hope/module/sidebar/components/SidebarLinks`: sidebar links

Miscellaneous:

- `@theme-hope/module/sidebar/composables`: sidebar Composition API
- `@theme-hope/module/sidebar/utils`: sidebar utility functions

:::

::: details Info module component alias

Components:

- `@theme-hope/module/info/components/AuthorInfo`: author information
- `@theme-hope/module/info/components/CategoryInfo`: category information
- `@theme-hope/module/info/components/DateInfo`: date information
- `@theme-hope/module/info/components/OriginalMark`: original mark
- `@theme-hope/module/info/components/PageInfo`: page information
- `@theme-hope/module/info/components/PageMeta`: page meta information
- `@theme-hope/module/info/components/PageViewInfo`: page views information
- `@theme-hope/module/info/components/ReadingTimeInfo`: reading time information
- `@theme-hope/module/info/components/TagInfo`: tag information
- `@theme-hope/module/info/components/TOC`: table of contents
- `@theme-hope/module/info/components/WordInfo`: word information

Miscellaneous:

- `@theme-hope/module/blog/components/icons`: info icons
- `@theme-hope/module/blog/composables`: info Composables API
- `@theme-hope/module/blog/utils`: info utility functions

:::

::: details Blog module component alias

Components:

- `@theme-hope/module/blog/components/ArticleItem`: article item
- `@theme-hope/module/blog/components/ArticleList`: article list
- `@theme-hope/module/blog/components/ArticleType`: article type
- `@theme-hope/module/blog/components/BloggerInfo`: blogger info
- `@theme-hope/module/blog/components/BlogHero`: blog homepage logo and introduction
- `@theme-hope/module/blog/components/BlogHome`: blog home page
- `@theme-hope/module/blog/components/BlogPage`: normal blog page
- `@theme-hope/module/blog/components/CategoryList`: Category list
- `@theme-hope/module/blog/components/InfoList`: blog info list
- `@theme-hope/module/blog/components/InfoPanel`: blog info panel
- `@theme-hope/module/blog/components/Pagination`: pagination
- `@theme-hope/module/blog/components/ProjectPanel`: blog homepage project panel
- `@theme-hope/module/blog/components/SocialMedia`: social media links
- `@theme-hope/module/blog/components/TagList`: tag list
- `@theme-hope/module/blog/components/TimelineItems`: timeline items
- `@theme-hope/module/blog/components/TimelineList`: timeline List

Miscellaneous:

- `@theme-hope/module/blog/components/icons`: blog icons
- `@theme-hope/module/blog/composables`: blog Composables API

:::

::: details Encryption module component alias

Components:

- `@theme-hope/module/encrypt/components/GlobalEncrypt`: gloabl encrypt wrapper
- `@theme-hope/module/encrypt/components/LocalEncrypt`: local encrypt wrapper
- `@theme-hope/module/encrypt/components/PasswordModal`: password input box

Miscellaneous:

- `@theme-hope/module/encrypt/composables`: encryption Composition API
- `@theme-hope/module/encrypt/utils`: encryption utility functions

:::

::: details Appearance module component alias

- `@theme-hope/module/outlook/components/AppearanceMode`: theme mode
- `@theme-hope/module/outlook/components/AppearanceSwitch`: theme appearance switch
- `@theme-hope/module/outlook/components/OutlookButton`: appearance button
- `@theme-hope/module/outlook/components/OutlookSettings`: appearance settings
- `@theme-hope/module/outlook/components/ThemeColor`: theme color
- `@theme-hope/module/outlook/components/ThemeColorPicker`: theme color picker
- `@theme-hope/module/outlook/components/ToggleFullScreenButton`: fullscreen toggle button

Miscellaneous:

- `@theme-hope/module/outlook/components/icons`: appearance icons
- `@theme-hope/module/outlook/composables`: appearance Composition API

:::

## Using Slots

Some components provide slots, in this case, you can directly import the original component when overriding the component, and pass in the content you need through the slot.

For example, if your site has strong social attributes, and you want to display a comment box on the homepage, you can display it like this:

::: code-tabs

@tab config.ts

```ts
// .vuepress/config.ts
import { path } from "@vuepress/utils";
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    // your theme config here
  }),

  alias: {
    // Here you can direct aliases to your own components
    // For example, here we change the theme’s home page component to HomePage.vue under user .vuepress/components
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
import HopeHomePage from "vuepress-theme-hope/lib/client/components/HomePage";
</script>
```

:::

Components that provide slots are as follows:

**theme**:

- `AutoLink`: `default`, `before`, `after`
- `CommonWrapper`: `default`, `navbarLeftStart`, `navbarLeftEnd`, `navbarCenterStart`, `navbarCenterEnd`, `navbarRightStart`, `navbarRightEnd`, `navScreenTop`, `navScreenBottom`, `sidebar`, `sidebarTop`, `sidebarBottom`
- `HomeHero`: `heroImage`, `heroInfo`
- `HomePage`: `top`, `center`, `bottom`
- `NormalPage`: `top`, `contentBefore`, `contentAfter`, `bottom`

**Navigation Bar**:

- `DropdownLink`: `title`
- `NavActions`: `before`, `after`
- `Navbar`: `left`, `center`, `right`
- `NavbarBrand`: `default`
- `NavScreen`: `before`, `after`
- `NavScreenDropdown`: `before`, `after`

**Sidebar**:

- `Sidebar`: `top`, `default`, `bottom`

**Blog**:

- `BlogHero`: `heroImage`, `heroInfo`

::: tip

For the corresponding location and function of each slot, please refer to [theme source code](https://github.com/vuepress-theme-hope/vuepress-theme-hope/tree/main/packages/theme/src/client/).

:::
