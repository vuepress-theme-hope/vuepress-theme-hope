---
title: Config Migration Guide
icon: config
category:
  - Migration
tag:
  - Migration
  - Theme Config
---

::: code-tabs#language

@tab TS

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

@tab JS

```diff
// .vuepress/config.js
- const { config } = require("vuepress-theme-hope");
+ import { hopeTheme } from "vuepress-theme-hope";

- module.exports = theme.config({
+ export default {
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

- added `navbarIcon` option to control navbar icon display

- added `navbarLayout` option to control navbar layout

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

- Add `iconAssets` option

- `iconPrefix` default value now infers from `iconAssets`

- update values of `darkmode` option

  - add `"enable"`
  - rename `"switch"` to `"toggle"`
  - rename `"auto-switch"` to `"switch"`

- `themeColor` and `fullscreen` is disabled by default

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

  The theme now uses official plugin `@vuepress/plugin-active-header-links`. ![warning](https://img.shields.io/badge/-warning-yellow)

- move `comment` moved to `plugins.comment`

  - Adds support for `twikoo` and `giscus` ![New](https://img.shields.io/badge/-New-brightgreen)

  - Vssue is currently missing ![warning](https://img.shields.io/badge/-warning-yellow)

    Vssue is written in Vue2, and the author [meteorlxy](https://github.com/meteorlxy) has not yet made it compatible with Vue3 yet

  - Valine service is removed ![removed](https://img.shields.io/badge/-removed-red)

    Valine is lack of maintenance and can leak your privacy. You should use [Waline](https://waline.js.org) instead.

- move `copyCode` to `plugins.copyCode`

- move `copyright` to `plugins.copyright`

  The plugin is disabled by default now. ![warning](https://img.shields.io/badge/-warning-yellow)

- move `feed` to `plugins.feed`

  - Supports removing custom components and elements through `plugins.feed.customElements` options ![NEW](https://img.shields.io/badge/-new-brightgreen)

  - Customize feed generation via `plugins.feed.getter` option ![NEW](https://img.shields.io/badge/-new-brightgreen)

  - Multi-category support ![New](https://img.shields.io/badge/-new-brightgreen)

  - Move all output options from `plugins.feed.output` option to plugin option root and rename them.

    - `feed.output.atom.enable` renamed to `plugins.feed.atom` ![changed](https://img.shields.io/badge/-changed-yellow)

    - `feed.output.json.enable` renamed to `plugins.feed.json` ![changed](https://img.shields.io/badge/-changed-yellow)

    - `feed.output.rss.enable` renamed to `plugins.feed.rss` ![changed](https://img.shields.io/badge/-changed-yellow)

    - `feed.output.atom.path` renamed to `plugins.feed.atomOutputFilename` ![changed](https://img.shields.io/badge/-changed-yellow)

    - `feed.output.json.path` renamed to `plugins.feed.jsonOutputFilename` ![changed](https://img.shields.io/badge/-changed-yellow)

    - `feed.output.rss.path` renamed to `plugins.feed.rssOutputFilename`

    - `plugins.feed.atom`, `plugins.feed.json` and `plugins.feed.rss` is `false` by default ![warning](https://img.shields.io/badge/-warning-yellow)

      The theme no longer outputs feed files in three formats by default. If necessary, please set options to output formats needed.

- move `git` to `plugins.git`

  The theme use official plugin `@vuepress/plugin-git` now. ![warning](https://img.shields.io/badge/-warning-yellow)

- move `mdEnhance` to `plugins.mdEnhance`

  - Markdown link check ![New](https://img.shields.io/badge/-New-brightgreen)

    The plugin now check your Markdown links and warn you when broken links are detected.

    You can control this behavior with `plugins.mdEnhance.linkCheck` option

  - image mark support ![New](https://img.shields.io/badge/-New-brightgreen)

    Use `#light` and `#dark` suffix to mark images to display them in light mode or dark mode via `plugins.mdEnhance.imageMark` option

  - Chart.js support ![New](https://img.shields.io/badge/-New-brightgreen)

    Adds [chart.js](https://www.chartjs.org/docs/latest/) support via `plugins.mdEnhance.chart` option

    ````md
    ::: chart Title

    ```json
    {
      // chart.js config
    }
    ```

    :::

    ::: chart Title

    ```js
    module.exports = {
      // chart.js config
    };
    ```

    :::
    ````

  - ECharts support ![New](https://img.shields.io/badge/-New-brightgreen)

    Adds [ECharts](https://echarts.apache.org/en/index.html) support via `plugins.mdEnhance.echarts` option

    ````md
    ::: echarts Title

    ```json
    {
      // chart.js config
    }
    ```

    :::

    ::: echarts Title

    ```js
    module.exports = {
      // chart.js config
    };
    ```

    :::
    ````

  - content include support ![New](https://img.shields.io/badge/-New-brightgreen)

    use `@include()` to include other file content in Markdown via `plugins.mdEnhance.include` options.

    Use `@include(filename)` to include a file.

    To partially import the file, you can specify the range of lines to be included:

    - `@include(filename{start-end})`
    - `@include(filename{start-})`
    - `@include(filename{-end})`

  - tabs support ![New](https://img.shields.io/badge/-New-brightgreen)

    Use `tabs` container to create tabs via `plugins.mdEnhance.tabs` option.

  - add `plugins.mdEnhance.gfm` ![New](https://img.shields.io/badge/-New-brightgreen)

    Control supporting gfm

  - add `plugins.mdEnhance.vPre` ![New](https://img.shields.io/badge/-New-brightgreen)

    The following syntax is no longer built into VuePress2, so we add this option.

    ```md
    ::: v-pre

    :::
    ```

  - rename `mdEnhance.codegroup` to `plugins.mdEnhance.codetabs` ![changed](https://img.shields.io/badge/-changed-yellow)

  - rename `plugins.mdEnhance.lazyLoad` to `plugins.mdEnhance.lazyLoad` and change default value from `true` to `false` ![changed](https://img.shields.io/badge/-changed-yellow)

  - remove `plugins.mdEnhance.enableAll` ![removed](https://img.shields.io/badge/-removed-red)

    There are too many noob users who don’t know what they are doing, and they just enable this option without using all the feature provided, yet they complain about load speed.

  - remove `plugins.mdEnhance.lineNumbers` ![removed](https://img.shields.io/badge/-removed-red)

    VuePress2 supports line numbers config for code blocks individually

  - remove `plugins.mdEnhance.imageFix` ![removed](https://img.shields.io/badge/-removed-red)

    Image related issues have been fixed in V2

- move `photoSwipe` to `plugins.photoSwipe`

- move `pwa` to `plugins.pwa`

  - `plugins.pwa.update` ![New](https://img.shields.io/badge/-New-brightgreen): control the update logic of SW

    - `"disabled"`: Do nothing even when new service worker is available. After new service work succeeds installing and starts waiting, it will control page and provide new content in next visit.

    - `"available"`: Only display update popup when the new service worker is available

    - `"hint"`: Display a hint to let user choose to refresh immediately

    - `"force"`: unregister current service worker immediately then refresh to get new content

  - `plugins.pwa.appendBase` ![New](https://img.shields.io/badge/-New-brightgreen): automatically insert `base` to the `manifest` option

  - `plugins.pwa.hintComponent` ![New](https://img.shields.io/badge/-New-brightgreen): Hint component for detecting new content

  - shouldPrefetch hint ![New](https://img.shields.io/badge/-New-brightgreen): Now the plugin will check `shouldPrefetch` option in config file and warn you to disable it.

  - `plugins.pwa.cacheHTML` default value changed from `true` to `false` ![changed](https://img.shields.io/badge/-changed-yellow)

    This can effectively reduce the SW update time

  - `pwa.popupComponent` renamed to `plugins.pwa.updateComponent` ![changed](https://img.shields.io/badge/-changed-yellow)

    This is because we added a new prompt popup window, so we need to avoid name confusion

- move `readingTime` to `plugins.readingTime`

- move `seo` to `plugins.seo`

  - JSON-LD support ![New](https://img.shields.io/badge/-New-brightgreen)

    The plugin now can generate JSON-LD script tags for you, and is providing an option `plugin.seo.jsonLd` to let you customize the JSON-LD properties.

  - Description generation ![New](https://img.shields.io/badge/-New-brightgreen)

    The plugin can generate a description for you automatically via `plugin.seo.autoDescription` options

  - Canonical link ![New](https://img.shields.io/badge/-New-brightgreen)

    You can set canonical link via `plugin.seo.canonicalLink` option. It's useful when your docs

  - `seo.customMeta` renamed to `plugin.seo.customHead` ![changed](https://img.shields.io/badge/-changed-yellow)

    Now you can edit all head tags instead of only meta in V1.
    are deployed in several places.

- move `sitemap` to `plugins.sitemap`

  - `plugin.sitemap.priority` ![New](https://img.shields.io/badge/-New-brightgreen): setting default value for priority

  - `sitemap.urls` renamed to `plugin.sitemap.extraUrls` ![changed](https://img.shields.io/badge/-changed-yellow)

  - `sitemap.exclude` renamed to `plugin.sitemap.excludeUrls` ![changed](https://img.shields.io/badge/-changed-yellow)

  - `sitemap.outFile` renamed to `plugin.sitemap.sitemapFilename` ![changed](https://img.shields.io/badge/-changed-yellow)

  - `sitemap.modifyTimeGetter` renamed to `plugin.sitemap.modifyTimeGetter` ![changed](https://img.shields.io/badge/-changed-yellow)

### Deletion

- remove `chunkRename`

  The theme no longer provides this functionality.

- remove `cleanUrl`

  The theme no longer provides this functionality.

- remove `git`

  The theme now uses official plugin `@vuepress/plugin-git`.

- remove `smoothScroll`

  The theme now provides smooth scrolling via CSS and no longer provides compatibility with older browsers.
