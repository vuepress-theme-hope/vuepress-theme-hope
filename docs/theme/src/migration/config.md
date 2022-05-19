---
title: Config Migration Guide
icon: config
category:
  - Migration
tag:
  - Migration
  - Theme Config
---

:::: code-group

::: code-group-item TS

```diff
  // .vuepress/config.ts
- import theme from "vuepress-theme-hope";
+ import { defineUserConfig } from "vuepress";
+ import { hopeTheme } from "vuepress-theme-hope";

- export default theme.config({
+ export default defineUserConfig({
    // your site config here
    // ...

-   themeConfig:{
+   theme: hopeTheme({
      // your theme config here
      // ...
-   },
+   }),
  });
```

:::

::: code-group-item JS

```diff
// .vuepress/config.js
- const { config } = require("vuepress-theme-hope");
+ const { hopeTheme } = require("vuepress-theme-hope");

- module.exports = theme.config({
+ module.exports = {
    // your site config here
    // ...

-   themeConfig:{
+   theme: hopeTheme({
      // your theme config here
      // ...
-   },
+   }),
- });
+ };
```

:::

::::

## Theme Usage

- rename `themeConfig` to `hopeTheme`
- rename `navbarConfig` to `navbar`
- rename `sidebarConfig` to `sidebar`
- added `arraySidebar` and `objectSidebar` helpers
- remove `config`

## Theme Options

- changed `author` type from `string | undefined` to `AuthorInfo[] | AuthorInfo | string[] | string | undefined`

  ```ts
  interface AuthorInfo {
    name: string;
    url?: string;
  }
  ```

  This change allows you to add multiple authors and set sites for them.

### Navigation Bar

- unified `nav`, `navbar` to `navbar`

- rename `darkLogo` to `logoDark`

- rename `navAutoHide`to `navbarAutoHide`

- added `navbarIcon` option

### Sidebar

- rename `sidebarDepth` to `headerDepth`

- remove `displayAllHeaders`

### Navbar Sidebar Config Unified

- change `items` in navbar config to `children`

- change `title` to `text` and `path` to `link` in sidebar configuration.

- V2 navbar supports setting the Markdown file path directly like the sidebar to automatically generate text, icons and links

- add `activeMatch` to control route activation

So both are unified as `text`, `icon`, `prefix`, `link`, `children`, `activeMatch`.

### Search

Since the theme no longer has a built-in search:

- remove `search`, `searchPlaceholder`, `searchMaxSuggestions`

- remove `algolia`, `algoliaType`

### Page Link

- rename `prevLinks` to `prevLink`

- rename `nextLinks` to `nextLink`

- rename `editLinks` to `editLink`

- rename `updateTime` to `lastUpdated`

### Outlook

- clear `iconPrefix` default value from `icon-`

  You now need to set this option according to icons you are using

  - If you use IconFont, you may need to set it to `iconfont icon-`
  - If you use FontAwesome, you may need to set it to `fa fa-`

- update values of `darkmode` option

  - add `"enable"`
  - rename `"switch"` to `"toggle"`
  - rename `"auto-switch"` to `"switch"`

### Blog Config

- supports separate config in each language

- add `blog.description` to set blogger description or motto

- rename `blog.links` to `blog.medias`

- change default value of `blog.roundAvatar` from `true` to `false`

- rename `blog.perPage` to `blog.articlePerPage`

- move `blog.autoExcerpt` to `plugins.blog.autoExcerpt`, and change default value from `true` to `false`

### Encryption Config

- change `encrypt.status: "global" | "local"` (default `"local"`) to `encrypt.global: boolean` (default `false`)

- rename `encrypt.global` to `encrypt.admin`

### custom layout

- remove `custom`

### Page Layout

- rename `anchorDisplay` to `toc`

### Reading Speed

- move `wordPerMinute` to `plugins.readingTime.wordPerMinute`

## Plugin Changes

### Addition

- Added `plugins.blog` to control blog links
- Added `plugins.nprogress` to control nprogress
- Added `plugins.prismjs` to control Prism.js

### Changes

Move all plugin related options under `plugins`.

- rename `activeHash` to `plugins.activeHeaderLinks`

  The theme now uses official plugin `@vuepress/plugin-active-header-links`.

- move `comment` moved to `plugins.comment`

- move `copyCode` to `plugins.copyCode`

- move `copyright` to `plugins.copyright`

  The plugin is disabled by default now.

- move `feed` to `plugins.feed`

  The theme no longer outputs feed files in three formats by default. If necessary, please set options to output formats needed.

- move `git` to `plugins.git`

  The theme use official plugin `@vuepress/plugin-git` now.

- move `mdEnhance` to `plugins.mdEnhance`

  - change default value of `plugins.mdEnhance.codegroup` from `true` to `false`

  - change default value of `plugins.mdEnhance.lazyLoad` from `true` to `false`

  - add `plugins.mdEnhance.gfm`

    Control supporting gfm

  - add `plugins.mdEnhance.vpre`

    The following syntax is no longer built into VuePress2.

    ```md
    ::: v-pre

    :::
    ```

  - remove `plugins.mdEnhance.lineNumbers`

    VuePress2 supports line numbers config for code blocks individually

  - remove `plugins.mdEnhance.imageFix`

    Image related issues have been fixed in V2

- move `photoSwipe` to `plugins.photoSwipe`

- move `pwa` to `plugins.pwa`

- move `readingTime` to `plugins.readingTime`

- move `seo` to `plugins.seo`

- move `sitemap` to `plugins.sitemap`

### Deletion

- remove `addThis`

  `vuepress-plugin-add-this` V2 was marked as deprecated when migrating and the theme no longer bundles it by default.

- remove `chunkRename`

  The theme no longer provides this functionality.

- remove `cleanUrl`

  The theme no longer provides this functionality.

- remove `git`

  The theme now uses official plugin `@vuepress/plugin-git`.

- remove `smoothScroll`

  The theme now provides smooth scrolling via CSS and no longer provides compatibility with older browsers.
