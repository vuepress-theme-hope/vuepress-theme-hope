---
title: Replace Components
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

## How to Replace via Alias

You need to replace the component alias used in the theme with `alias` option in your own VuePress config file.

```ts twoslash title=".vuepress/config.ts"
import { getDirname, path } from "vuepress/utils";
import { hopeTheme } from "vuepress-theme-hope";

const __dirname = getDirname(import.meta.url);

export default {
  theme: hopeTheme(
    {
      // your theme config here
    },
    { custom: true },
  ),

  alias: {
    // Here you can redirect aliases to your own components
    // For example, here we change the theme's home page component to HomePage.vue under user .vuepress/components
    "@theme-hope/components/home/HomePage": path.resolve(
      __dirname,
      "./components/HomePage.vue",
    ),
  },
};
```

Here are list of aliases.

### Base Components

- `@theme-hope/components/base/AutoLink`: basic link

  Slots: `default`, `before`, `after`

- `@theme-hope/components/base/BreadCrumb`: breadcrumb

- `@theme-hope/components/base/EditIcon`: edit icon

- `@theme-hope/components/base/MainFadeInUpTransition`: main layout fade in up transition component

  Slots: `default`

- `@theme-hope/components/base/MainLayout`: main layout

  Slots: `default`, `navScreenTop`, `navScreenBottom`, `sidebarItems`, `sidebarTop`, `sidebarBottom`

  - `navScreenTop` slot is piped to `navScreenTop` slot of `NavBar` component.
  - `navScreenBottom` slot is piped to `navScreenBottom` slot of `NavBar` component.
  - `sidebarItems` slot is piped to `sidebarItems` slot of `Sidebar` component.
  - `sidebarTop` slot is piped to `sidebarTop` slot of `Sidebar` component.
  - `sidebarBottom` slot is piped to `sidebarBottom` slot of `Sidebar` component.

- `@theme-hope/components/base/MarkdownContent`: Markdown content

  Slots: `contentBefore`, `contentAfter`

- `@theme-hope/components/base/PageContent`: main page content

  Slots: `pageTop`, `pageBottom`, `content`, `contentBefore`, `contentAfter`, `toc`, `tocBefore`, `tocAfter`

  - `contentBefore` slot is piped to `contentBefore` slot of `MarkdownContent` component.
  - `contentAfter` slot is piped to `contentAfter` slot of `MarkdownContent` component.
  - `toc` slot is piped to `toc` slot of `TOC` component.
  - `tocBefore` slot is piped to `tocBefore` slot of `TOC` component.
  - `tocAfter` slot is piped to `tocAfter` slot of `TOC` component.

- `@theme-hope/components/base/PageFooter`: page footer

- `@theme-hope/components/base/PrintButton`: print button

- `@theme-hope/components/base/PageNav`: page navigation

- `@theme-hope/components/base/PageTitle`: page title

- `@theme-hope/components/base/SkipLink`: link pointing to main content

- `@theme-hope/components/base/TOC`: table of contents

  Slots: `toc` `tocBefore`, `tocAfter`

### Home Page Components

- `@theme-hope/components/home/FeatureSection`: homepage feature section

- `@theme-hope/components/home/HighlightSection`: homepage highlight section

- `@theme-hope/components/home/HeroInfo`: homepage logo and introduction

  Slots: `heroInfo`, `heroLogo`, `heroBg`

  - `heroInfo` slot receives `text` `tagline` `isFullScreen` and `style` props.
  - `heroLogo` slot receives `image` `imageDark` `alt` and `style` props.
  - `heroBg` slot receives `image` `imageDark` and `style` props.

- `@theme-hope/components/home/HeroSlideDownButton`: hero slide down button

- `@theme-hope/components/home/HomePage`: default home page (project home page)

  Slots: `heroInfo`, `heroLogo`, `heroBg`, `heroBefore`, `heroAfter`, `content`, `contentBefore`, `contentAfter`

  - `heroInfo` slot is piped to `heroInfo` slot of `HeroInfo` component.
  - `heroLogo` slot is piped to `heroLogo` slot of `HeroInfo` component.
  - `heroBg` slot is piped to `heroBg` slot of `HeroInfo` component.
  - `contentBefore` slot is piped to `contentBefore` slot of `MarkdownContent` component.
  - `contentAfter` slot is piped to `contentAfter` slot of `MarkdownContent` component.

- `@theme-hope/components/home/PortfolioHero`: portfolio hero

  Slots: `portfolioInfo`, `portfolioAvatar`, `portfolioBg`

  - `portfolioInfo` slot receives `name` `welcome` `title` `titles` and `links` props.
  - `portfolioAvatar` slot receives `avatar` `avatarDark` `style` and `alt` props.
  - `portfolioBg` slot receives `image` `imageDark` and `style` props.

- `@theme-hope/components/home/PortfolioHome`: portfolio home page

  Slots: `portfolioInfo`, `portfolioAvatar`, `portfolioBg`

  - `portfolioInfo` slot is piped to `portfolioInfo` slot of `PortfolioHero` component.
  - `portfolioAvatar` slot is piped to `portfolioAvatar` slot of `PortfolioHero` component.
  - `portfolioBg` slot is piped to `portfolioBg` slot of `PortfolioHero` component.

### Navbar Components

- `@theme-hope/components/navbar/I18nIcon`: i18n icon

- `@theme-hope/components/navbar/LanguageDropdown`: language dropdown

- `@theme-hope/components/navbar/Navbar`: navbar component

  Slots: `navScreenTop`, `navScreenBottom`

  - `navScreenTop` slot is piped to `before` slot of `NavScreen` component.
  - `navScreenBottom` slot is piped to `after` slot of `NavScreen` component.

- `@theme-hope/components/navbar/NavbarBrand`: navbar brand information

- `@theme-hope/components/navbar/NavbarDropdown`: dropdown list

  Slots: `title`

- `@theme-hope/components/navbar/NavbarLinks`: navbar links

- `@theme-hope/components/navbar/NavScreen`: navigation screen in mobile view

  Slots: `before`, `after`

- `@theme-hope/components/navbar/NavScreenLinks`: mobile view navbar links

- `@theme-hope/components/navbar/NavScreenMenu`: mobile view navbar dropdown menu

- `@theme-hope/components/navbar/RepoLink`: repository link

- `@theme-hope/components/navbar/ToggleNavbarButton`: navbar toggle button

- `@theme-hope/components/navbar/ToggleSidebarButton`: sidebar toggle button

### Sidebar Components

- `@theme-hope/components/sidebar/Sidebar`: sidebar

  Slots: `default`, `top`, `bottom`

  - `default` slot receives `sidebarItems` prop.

- `@theme-hope/components/sidebar/SidebarChild`: sidebar link item

- `@theme-hope/components/sidebar/SidebarGroup`: sidebar grouping links

- `@theme-hope/components/sidebar/SidebarLinks`: sidebar links

### Info Components

- `@theme-hope/components/info/AuthorInfo`: author information
- `@theme-hope/components/info/CategoryInfo`: category information
- `@theme-hope/components/info/DateInfo`: date information
- `@theme-hope/components/info/OriginalInfo`: original mark
- `@theme-hope/components/info/PageInfo`: page information
- `@theme-hope/components/info/PageMeta`: page meta information
- `@theme-hope/components/info/PageViewInfo`: page views information
- `@theme-hope/components/info/ReadingTimeInfo`: reading time information
- `@theme-hope/components/info/TagInfo`: tag information
- `@theme-hope/components/info/WordInfo`: word information
- `@theme-hope/components/info/icons`: info icons

### Appearance Components

- `@theme-hope/components/appearance/AppearanceButton`: appearance button
- `@theme-hope/components/appearance/AppearanceIcon`: appearance icon
- `@theme-hope/components/appearance/AppearanceSettings`: appearance settings
- `@theme-hope/components/appearance/ColorMode`: color mode
- `@theme-hope/components/appearance/ColorModeSwitch`: color mode switch
- `@theme-hope/components/appearance/ThemeColor`: theme color
- `@theme-hope/components/appearance/ThemeColorPicker`: theme color picker
- `@theme-hope/components/appearance/ToggleFullScreen`: fullscreen toggle
- `@theme-hope/components/appearance/ToggleFullScreenButton`: fullscreen toggle button

### Transition Components

- `@theme-hope/components/transition/DropTransition`: drop transition component

  Slots: `default`

### Blog Components

- `@theme-hope/components/blog/ArticleItem`: article item

  Slots: `articleTitle`, `articleCover`, `articleInfo`, `articleExcerpt`

  - `articleTitle` slot receives `title` `isEncrypted` and `type` props.
  - `articleCover` slot receives `cover` props.
  - `articleInfo` slot receives `author` `category` `tag` `date` `isOriginal` `pageview` `readingTime` and `readingTimeLocale` props.
  - `articleExcerpt` slot receives `excerpt` props.

- `@theme-hope/components/blog/ArticleList`: article list

  Slots: `articleTitle`, `articleCover`, `articleInfo`, `articleExcerpt`

  - `articleTitle` slot is piped to `articleTitle` slot of `ArticleItem` component.
  - `articleCover` slot is piped to `articleCover` slot of `ArticleItem` component.
  - `articleInfo` slot is piped to `articleInfo` slot of `ArticleItem` component.
  - `articleExcerpt` slot is piped to `articleExcerpt` slot of `ArticleItem` component.

- `@theme-hope/components/blog/ArticlesInfo`: article info

- `@theme-hope/components/blog/ArticleType`: article type

- `@theme-hope/components/blog/BloggerInfo`: blogger info

  Slots: `bloggerInfo`

  - `bloggerInfo` slot receives `name` `avatar` and `description` props.

- `@theme-hope/components/blog/BlogHero`: blog homepage logo and introduction

  Slots: `heroInfo`, `heroLogo`, `heroBg`,

  - `heroBg` slot receives `text` `tagline` `isFullScreen` and `style` props.
  - `heroLogo` slot receives `image` `imageDark` `alt` and `style` props.
  - `heroBg` slot receives `image` `imageDark` and `style` props.

- `@theme-hope/components/blog/BlogHome`: blog home

  Slots: `heroInfo`, `heroLogo`, `heroBg`, `heroBefore`, `heroAfter`, `articleCover`, `articleTitle`, `articleInfo`, `articleExcerpt`, `bloggerInfo`, `infoBefore`, `infoAfter`, `content`, `contentBefore`, `contentAfter`

  - `heroInfo` slot is piped to `info` slot of `BlogHero` component.
  - `heroLogo` slot is piped to `heroLogo` slot of `BlogHero` component.
  - `heroBg` slot is piped to `heroBg` slot of `BlogHero` component.
  - `articleCover` slot is piped to `articleCover` slot of `ArticleList` component.
  - `articleTitle` slot is piped to `articleTitle` slot of `ArticleList` component.
  - `articleInfo` slot is piped to `articleInfo` slot of `ArticleList` component.
  - `articleExcerpt` slot is piped to `articleExcerpt` slot of `ArticleList` component.
  - `bloggerInfo` slot is piped to `bloggerInfo` slot of `BloggerInfo` component.
  - `infoBefore` slot is piped to `infoBefore` slot of `InfoPanel` component.
  - `infoAfter` slot is piped to `infoAfter` slot of `InfoPanel` component.
  - `contentBefore` slot is piped to `before` slot of `MarkdownContent` component.
  - `contentAfter` slot is piped to `after` slot of `MarkdownContent` component.

- `@theme-hope/components/blog/BlogMainLayout`: blog main layout

  Slots: `default`, `navScreenTop`, `navScreenBottom`, `sidebarItems`, `sidebarTop`, `sidebarBottom`, `bloggerInfo`

  - `navScreenTop` slot is piped to `navScreenTop` slot of `NavBar` component.
  - `navScreenBottom` slot is piped to `navScreenBottom` slot of `NavBar` component.

- `@theme-hope/components/blog/CategoriesInfo`: Category info

- `@theme-hope/components/blog/CategoryList`: Category list

- `@theme-hope/components/blog/CategoryPage`: category page

  Slots: `default`, `articleTitle`, `articleCover`, `articleInfo`, `articleExcerpt`, `articleBefore`, `articleAfter`, `bloggerInfo`, `infoBefore`, `infoAfter`

  - `articleCover` slot is piped to `articleCover` slot of `ArticleList` component.
  - `articleTitle` slot is piped to `articleTitle` slot of `ArticleList` component.
  - `articleInfo` slot is piped to `articleInfo` slot of `ArticleList` component.
  - `articleExcerpt` slot is piped to `articleExcerpt` slot of `ArticleList` component.
  - `bloggerInfo` slot is piped to `bloggerInfo` slot of `BloggerInfo` component.
  - `infoBefore` slot is piped to `infoBefore` slot of `InfoPanel` component.
  - `infoAfter` slot is piped to `infoAfter` slot of `InfoPanel` component.

- `@theme-hope/components/blog/InfoList`: blog info list

  Slots: `bloggerInfo`, `infoBefore`, `infoAfter`

- `@theme-hope/components/blog/InfoPanel`: blog info panel

  - `bloggerInfo` slot is piped to `bloggerInfo` slot of `BloggerInfo` component.

- `@theme-hope/components/blog/Pagination`: pagination

- `@theme-hope/components/blog/ProjectPanel`: blog homepage project panel

- `@theme-hope/components/blog/SocialMedias`: social media links

- `@theme-hope/components/blog/TagList`: tag list

- `@theme-hope/components/blog/TagPage`: tag page

- `@theme-hope/components/blog/TagsInfo`: tag info

- `@theme-hope/components/blog/TimelineItems`: timeline items

- `@theme-hope/components/blog/TimelineList`: timeline List

- `@theme-hope/components/blog/TimelinePage`: timeline page

  Slots: `articleBefore`, `articleAfter`, `bloggerInfo`, `infoBefore`, `infoAfter`

  - `bloggerInfo` slot is piped to `bloggerInfo` slot of `BloggerInfo` component.
  - `infoBefore` slot is piped to `infoBefore` slot of `InfoPanel` component.
  - `infoAfter` slot is piped to `infoAfter` slot of `InfoPanel` component.

- `@theme-hope/components/blog/TypePage`: type page

  Slots: `default`, `articleTitle`, `articleCover`, `articleInfo`, `articleExcerpt`, `articleBefore`, `articleAfter`, `bloggerInfo`, `infoBefore`, `infoAfter`

  - `articleCover` slot is piped to `articleCover` slot of `ArticleList` component.
  - `articleTitle` slot is piped to `articleTitle` slot of `ArticleList` component.
  - `articleInfo` slot is piped to `articleInfo` slot of `ArticleList` component.
  - `articleExcerpt` slot is piped to `articleExcerpt` slot of `ArticleList` component.
  - `bloggerInfo` slot is piped to `bloggerInfo` slot of `BloggerInfo` component.
  - `infoBefore` slot is piped to `infoBefore` slot of `InfoPanel` component.
  - `infoAfter` slot is piped to `infoAfter` slot of `InfoPanel` component.

- `@theme-hope/components/blog/icons`: blog icons

### Encryption Components

- `@theme-hope/modules/encrypt/components/GlobalEncrypt`: global encrypt wrapper

  Slots: `default`

- `@theme-hope/modules/encrypt/components/LocalEncrypt`: local encrypt wrapper

  Slots: `default`

- `@theme-hope/modules/encrypt/components/PasswordModal`: password input box

## Overriding Components

Some components provide slots, in this case, you can directly import the original component when overriding the component, and pass in the content you need through the slot.

For details of each slot, please check [theme source code](https://github.com/vuepress-theme-hope/vuepress-theme-hope/tree/main/packages/theme/src/client/).

::: tip

For demo of common slots, please check:

- [Page Slot demo](../../demo/page-slot.md)。
- [Home Slot demo](../../demo/home-slot.md)。
- [Blog Slot demo](../../demo/blog-slot.md)。

:::

For example, if your site has strong social attributes, and you want to display a comment box on the homepage, you can display it like this:

::: code-tabs

@tab config.ts

```ts twoslash title=".vuepress/config.ts"
import { getDirname, path } from "vuepress/utils";
import { hopeTheme } from "vuepress-theme-hope";

const __dirname = getDirname(import.meta.url);

export default {
  theme: hopeTheme(
    {
      // your theme config here
    },
    { custom: true },
  ),

  alias: {
    // Here you can direct aliases to your own components
    // For example, here we change the theme's home page component to HomePage.vue under user .vuepress/components
    "@theme-hope/components/home/HomePage": path.resolve(
      __dirname,
      "./components/HomePage.vue",
    ),
  },
};
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
