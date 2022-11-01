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
import { getDirname, path } from "@vuepress/utils";
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

const __dirname = getDirname(import.meta.url);

export default defineUserConfig({
  theme: hopeTheme({
    // your theme config here
  }),

  alias: {
    // Here you can redirect aliases to your own components
    // For example, here we change the theme’s home page component to HomePage.vue under user .vuepress/components
    "@theme-hope/components/HomePage.js": path.resolve(
      __dirname,
      "./components/HomePage.js"
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
  theme: hopeTheme({
    // your theme config here
  }),

  alias: {
    // Here you can redirect aliases to your own components
    // For example, here we change the theme’s home page component to HomePage.vue under user .vuepress/components
    "@theme-hope/components/HomePage.js": path.resolve(
      __dirname,
      "./components/HomePage.js"
    ),
  },
};
```

:::

::: tip

If you want to use `vue` files, you can make a simple js wrapper by writing:

```js
// wrapper.js
import YouComponent from "./YouComponent.vue";
export default YouComponent;
```

:::

Here are list of aliases.

::: details Theme components alias

Components:

- `@theme-hope/components/AutoLink.js`: basic link
- `@theme-hope/components/BreadCrumb.js`: breadcrumb
- `@theme-hope/components/CommonWrapper.js`: basic layout integration
- `@theme-hope/components/HomeFeatures.js`: homepage features
- `@theme-hope/components/HomeHero.js`: homepage logo and introduction
- `@theme-hope/components/HomePage.js`: home page
- `@theme-hope/components/Icon.js`: icon
- `@theme-hope/components/MarkdownContent.js`: Markdown content
- `@theme-hope/components/NormalPage.js`: normal page
- `@theme-hope/components/PageFooter.js`: page footer
- `@theme-hope/components/PageNav.js`: page navigation
- `@theme-hope/components/PageTitle.js`: page title
- `@theme-hope/components/SkipLink.js`: skip to main content
- `@theme-hope/components/transitions/DropTransition.js`: drop transition component
- `@theme-hope/components/transitions/FadeSlideY.js`: fade slide y transition component

Miscellaneous:

- `@theme-hope/components/icons/index.js`: theme icons
- `@theme-hope/composables/index.js`: theme Composition API
- `@theme-hope/utils/index.js`: theme utility functions

:::

::: details Navbar component alias

Components:

- `@theme-hope/modules/navbar/components/DropdownLink.js`: dropdown list
- `@theme-hope/modules/navbar/components/LanguageDropdown.js`: language dropdown
- `@theme-hope/modules/navbar/components/NavActions.js`: navbar functions
- `@theme-hope/modules/navbar/components/Navbar.js`: navbar
- `@theme-hope/modules/navbar/components/NavbarBrand.js`: navbar brand information
- `@theme-hope/modules/navbar/components/NavbarLinks.js`: navbar links
- `@theme-hope/modules/navbar/components/NavScreen.js`: navigation screen in mobile view
- `@theme-hope/modules/navbar/components/NavScreenDropdown.js`: mobile view navbar dropdown menu
- `@theme-hope/modules/navbar/components/NavScreenLinks.js`: mobile view navbar links
- `@theme-hope/modules/navbar/components/RepoLink.js`: repository link
- `@theme-hope/modules/navbar/components/ToggleNavbarButton.js`: navbar toggle button
- `@theme-hope/modules/navbar/components/ToggleSidebarButton.js`: sidebar toggle button

Miscellaneous:

- `@theme-hope/modules/navbar/components/icons/index.js`: navbar icons
- `@theme-hope/modules/navbar/composables/index.js`: navbar Composition API

:::

::: details Sidebar component alias

Components:

- `@theme-hope/modules/sidebar/components/Sidebar.js`: sidebar
- `@theme-hope/modules/sidebar/components/SidebarChild.js`: sidebar link item
- `@theme-hope/modules/sidebar/components/SidebarGroup.js`: sidebar grouping links
- `@theme-hope/modules/sidebar/components/SidebarLinks.js`: sidebar links

Miscellaneous:

- `@theme-hope/modules/sidebar/composables/index.js`: sidebar Composition API
- `@theme-hope/modules/sidebar/utils/index.js`: sidebar utility functions

:::

::: details Info module component alias

Components:

- `@theme-hope/modules/info/components/AuthorInfo.js`: author information
- `@theme-hope/modules/info/components/CategoryInfo.js`: category information
- `@theme-hope/modules/info/components/DateInfo.js`: date information
- `@theme-hope/modules/info/components/OriginalMark.js`: original mark
- `@theme-hope/modules/info/components/PageInfo.js`: page information
- `@theme-hope/modules/info/components/PageMeta.js`: page meta information
- `@theme-hope/modules/info/components/PageViewInfo.js`: page views information
- `@theme-hope/modules/info/components/ReadingTimeInfo.js`: reading time information
- `@theme-hope/modules/info/components/TagInfo.js`: tag information
- `@theme-hope/modules/info/components/TOC.js`: table of contents
- `@theme-hope/modules/info/components/WordInfo.js`: word information

Miscellaneous:

- `@theme-hope/modules/blog/components/icons.js`: info icons
- `@theme-hope/modules/blog/composables/index.js`: info Composables API
- `@theme-hope/modules/blog/utils/index.js`: info utility functions

:::

::: details Blog module component alias

Components:

- `@theme-hope/modules/blog/components/ArticleItem.js`: article item
- `@theme-hope/modules/blog/components/ArticleList.js`: article list
- `@theme-hope/modules/blog/components/ArticleType.js`: article type
- `@theme-hope/modules/blog/components/BloggerInfo.js`: blogger info
- `@theme-hope/modules/blog/components/BlogHero.js`: blog homepage logo and introduction
- `@theme-hope/modules/blog/components/BlogHome.js`: blog home page
- `@theme-hope/modules/blog/components/BlogPage.js`: normal blog page
- `@theme-hope/modules/blog/components/CategoryList.js`: Category list
- `@theme-hope/modules/blog/components/InfoList.js`: blog info list
- `@theme-hope/modules/blog/components/InfoPanel.js`: blog info panel
- `@theme-hope/modules/blog/components/Pagination.js`: pagination
- `@theme-hope/modules/blog/components/ProjectPanel.js`: blog homepage project panel
- `@theme-hope/modules/blog/components/SocialMedia.js`: social media links
- `@theme-hope/modules/blog/components/TagList.js`: tag list
- `@theme-hope/modules/blog/components/TimelineItems.js`: timeline items
- `@theme-hope/modules/blog/components/TimelineList.js`: timeline List

Miscellaneous:

- `@theme-hope/modules/blog/components/icons/index.js`: blog icons
- `@theme-hope/modules/blog/composables/index.js`: blog Composables API

:::

::: details Encryption module component alias

Components:

- `@theme-hope/modules/encrypt/components/GlobalEncrypt.js`: global encrypt wrapper
- `@theme-hope/modules/encrypt/components/LocalEncrypt.js`: local encrypt wrapper
- `@theme-hope/modules/encrypt/components/PasswordModal.js`: password input box

Miscellaneous:

- `@theme-hope/modules/encrypt/composables/index.js`: encryption Composition API
- `@theme-hope/modules/encrypt/utils/index.js`: encryption utility functions

:::

::: details Appearance module component alias

- `@theme-hope/modules/outlook/components/AppearanceMode.js`: theme mode
- `@theme-hope/modules/outlook/components/AppearanceSwitch.js`: theme appearance switch
- `@theme-hope/modules/outlook/components/OutlookButton.js`: appearance button
- `@theme-hope/modules/outlook/components/OutlookSettings.js`: appearance settings
- `@theme-hope/modules/outlook/components/ThemeColor.js`: theme color
- `@theme-hope/modules/outlook/components/ThemeColorPicker.js`: theme color picker
- `@theme-hope/modules/outlook/components/ToggleFullScreenButton.js`: fullscreen toggle button

Miscellaneous:

- `@theme-hope/modules/outlook/components/icons/index.js`: appearance icons
- `@theme-hope/modules/outlook/composables/index.js`: appearance Composition API

:::

## Using Slots

Some components provide slots, in this case, you can directly import the original component when overriding the component, and pass in the content you need through the slot.

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
  theme: hopeTheme({
    // your theme config here
  }),

  alias: {
    // Here you can direct aliases to your own components
    // For example, here we change the theme’s home page component to HomePage.vue under user .vuepress/components
    "@theme-hope/components/HomePage.js": path.resolve(
      __dirname,
      "./components/HomePage.js"
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

**theme**:

- `AutoLink`: `default`, `before`, `after`
- `CommonWrapper`: `default`, `navbarLeftStart`, `navbarLeftEnd`, `navbarCenterStart`, `navbarCenterEnd`, `navbarRightStart`, `navbarRightEnd`, `navScreenTop`, `navScreenBottom`, `sidebar`, `sidebarTop`, `sidebarBottom`
- `HomeHero`: `heroImage`, `heroInfo`
- `HomePage`: `top`, `center`, `bottom`
- `NormalPage`: `top`, `contentBefore`, `contentAfter`, `bottom`

**Navigation Bar**:

- `DropdownLink`: `title`
- `NavActions`: `before`, `after`
- `Navbar`: `leftStart`, `leftEnd`, `centerStart`, `centerEnd`, `rightStart`, `rightEnd`
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
