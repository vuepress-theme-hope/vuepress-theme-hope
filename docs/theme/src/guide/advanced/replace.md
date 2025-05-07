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

Some components provide slots, in this case, you can directly import the original component when overriding the component, and pass in the content you need through the slot.

## Theme Alias

### Base Components

- `@theme-hope/components/base/AutoLink`: basic link

  Slots: `default`, `before`, `after`

- `@theme-hope/components/base/BreadCrumb`: breadcrumb

- `@theme-hope/components/base/EditIcon`: edit icon

- `@theme-hope/components/base/MainFadeInUpTransition`: main layout transition

  Slots: `default`

- `@theme-hope/components/base/MainLayout`: main layout

  Slots: `default`, `navScreenTop`, `navScreenBottom`, `sidebarItems`, `sidebarTop`, `sidebarBottom`

  - `navScreenTop` `navScreenBottom` slots are piped to `NavBar` component.
  - `sidebarItems`, `sidebarTop`, `sidebarBottom` slots are piped to `Sidebar` component.

- `@theme-hope/components/base/MarkdownContent`: Markdown content

  Slots: `contentBefore`, `contentAfter`

- `@theme-hope/components/base/PageContent`: main page content

  Slots: `pageTop`, `pageBottom`, `content`, `contentBefore`, `contentAfter`, `toc`, `tocBefore`, `tocAfter`

  - `contentBefore`, `contentAfter` slots are piped to `MarkdownContent` component.
  - `toc`, `tocBefore`, `tocAfter` slots are piped to `TOC` component.

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

  - `heroInfo`, `heroLogo`, `heroBg` slots are piped to `HeroInfo` component.
  - `contentBefore`, `contentAfter` slots are piped to `MarkdownContent` component.

- `@theme-hope/components/home/PortfolioHero`: portfolio hero

  Slots: `portfolioInfo`, `portfolioAvatar`, `portfolioBg`

  - `portfolioInfo` slot receives `name` `welcome` `title` `titles` and `links` props.
  - `portfolioAvatar` slot receives `avatar` `avatarDark` `style` and `alt` props.
  - `portfolioBg` slot receives `image` `imageDark` and `style` props.

- `@theme-hope/components/home/PortfolioHome`: portfolio home page

  Slots: `portfolioInfo`, `portfolioAvatar`, `portfolioBg`

  - `portfolioInfo`, `portfolioAvatar`, `portfolioBg` slots are piped to `PortfolioHero` component.

### Navbar Components

- `@theme-hope/components/navbar/I18nIcon`: i18n icon

- `@theme-hope/components/navbar/LanguageDropdown`: language dropdown

- `@theme-hope/components/navbar/Navbar`: navbar component

  Slots: `navScreenTop`, `navScreenBottom`

  - `navScreenTop` `navScreenBottom` slots are piped to `NavBar` component.

- `@theme-hope/components/navbar/NavbarBrand`: navbar brand information

- `@theme-hope/components/navbar/NavbarDropdown`: dropdown list

  Slots: `title`

- `@theme-hope/components/navbar/NavbarLinks`: navbar links

- `@theme-hope/components/navbar/NavScreen`: navigation screen in mobile view

  Slots: `navScreenTop`, `navScreenBottom`

- `@theme-hope/components/navbar/NavScreenLinks`: mobile view navbar links

- `@theme-hope/components/navbar/NavScreenMenu`: mobile view navbar dropdown menu

- `@theme-hope/components/navbar/RepoLink`: repository link

- `@theme-hope/components/navbar/ToggleNavbarButton`: navbar toggle button

- `@theme-hope/components/navbar/ToggleSidebarButton`: sidebar toggle button

### Sidebar Components

- `@theme-hope/components/sidebar/Sidebar`: sidebar

  Slots: `sidebarItems`, `sidebarTop`, `sidebarBottom`

  - `sidebarItems` slot receives `sidebarItems` prop.

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

  - `articleTitle`, `articleCover`, `articleInfo`, `articleExcerpt` slots are piped to `ArticleItem` component.

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

  - `heroInfo`, `heroLogo`, `heroBg` slots are piped to `BlogHero` component.
  - `articleTitle`, `articleCover`, `articleInfo`, `articleExcerpt` slots are piped to `ArticleList` component.
  - `bloggerInfo` slot is piped to BloggerInfo` component.
  - `infoBefore`, `infoAfter` slots are piped to `InfoPanel` component.
  - `contentBefore`, `contentAfter` slots are piped to `MarkdownContent` component.

- `@theme-hope/components/blog/BlogMainLayout`: blog main layout

  Slots: `default`, `navScreenTop`, `navScreenBottom`, `sidebarItems`, `sidebarTop`, `sidebarBottom`, `bloggerInfo`

  - `navScreenTop`, `navScreenBottom` slots are piped to `NavBar` component.

- `@theme-hope/components/blog/CategoriesInfo`: Category info

- `@theme-hope/components/blog/CategoryList`: Category list

- `@theme-hope/components/blog/CategoryPage`: category page

  Slots: `default`, `articleTitle`, `articleCover`, `articleInfo`, `articleExcerpt`, `articleBefore`, `articleAfter`, `bloggerInfo`, `infoBefore`, `infoAfter`

  - `articleTitle`, `articleCover`, `articleInfo`, `articleExcerpt` slots are piped to `ArticleList` component.
  - `bloggerInfo` slot is piped to ``BloggerInfo` component.
  - `infoBefore`, `infoAfter` slots are piped to `InfoPanel` component.

- `@theme-hope/components/blog/InfoList`: blog info list

  Slots: `bloggerInfo`, `infoBefore`, `infoAfter`

- `@theme-hope/components/blog/InfoPanel`: blog info panel

  - `bloggerInfo` slot is piped to ``BloggerInfo` component.

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

  - `bloggerInfo` slot is piped to ``BloggerInfo` component.
  - `infoBefore`, `infoAfter` slots are piped to `InfoPanel` component.

- `@theme-hope/components/blog/TypePage`: type page

  Slots: `default`, `articleTitle`, `articleCover`, `articleInfo`, `articleExcerpt`, `articleBefore`, `articleAfter`, `bloggerInfo`, `infoBefore`, `infoAfter`

  - `articleTitle`, `articleCover`, `articleInfo`, `articleExcerpt` slots are piped to `ArticleList` component.
  - `bloggerInfo` slot is piped to ``BloggerInfo` component.
  - `infoBefore`, `infoAfter` slots are piped to `InfoPanel` component.

- `@theme-hope/components/blog/icons`: blog icons

### Encryption Components

- `@theme-hope/modules/encrypt/components/GlobalEncrypt`: global encrypt wrapper

  Slots: `default`

- `@theme-hope/modules/encrypt/components/LocalEncrypt`: local encrypt wrapper

  Slots: `default`

- `@theme-hope/modules/encrypt/components/PasswordModal`: password input box

### Others

Composables, layouts, utils can be also replaced via alias, check [theme source code](https://github.com/vuepress-theme-hope/vuepress-theme-hope/tree/main/packages/theme/src/client/) for details.
