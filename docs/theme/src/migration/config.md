---
title: Config Migration Guide
icon: config
category:
  - Migration
tag:
  - Migration
  - Theme Config
---

## Theme usage

- `config` renamed to `defineHopeConfig`
- `themeConfig` renamed to `defineThemeConfig`
- `navbarConfig` renamed to `defineNavbarConfig`
- `sidebarConfig` renamed to `defineSidebarConfig`

  At the same time, `defineSidebarArrayConfig`, `defineSidebarObjectConfig` are newly provided

## ThemeConfig

- `author` type changed from `string | undefined` to `AuthorInfo[] | AuthorInfo | string[] | string | undefined`

  ```ts
  interface AuthorInfo {
    name: string;
    url?: string;
  }
  ```

  This change allows you to add multiple authors and set sites for them.

### Navigation Bar

- `nav`, `navbar` unified to `navbar`

- `darkLogo` renamed to `logoDark`

- `navAutoHide` renamed to `navbarAutoHide`

- Added `navbarIcon` option

Since the theme no longer has a built-in search:

- Removed `search`, `searchPlaceholder`, `searchMaxSuggestions`

- remove `algolia`, `algoliaType`

### Sidebar

- `sidebarDepth` renamed to `headingDepth`

- remove `displayAllHeaders`

### Navbar Sidebar Config Unified

- `items` in navbar config changed to `children`

- Changed `title` to `text` and `path` to `link` in sidebar configuration.

- The V2 navigation bar supports setting the Markdown file path directly like the sidebar to automatically generate text, icons and links

In this way, their configuration is unified as `text`, `icon`, `prefix`, `link`, `children`.

- Added `activeMatch` to control activation in both configurations

### Page Link

- remove `prevLinks` and `nextLinks`

- `editLinks` renamed to `editLink`

- `updateTime` renamed to `lastUpdated`

### Outlook

- `iconPrefix` default value is cleared from `icon-`.

  You now need to configure it yourself according to the Font Class that uses the icon

  - If you use IconFont, you may need to set it to `iconfont icon-`
  - If you use FontAwesome, you may need to set it to `fa fa-`

- `darkmode` added `"force-dark"` to force dark mode

### Blog Config

- Blog config now supports separate config in each language

- Added `blog.description` to set blogger description or motto

- `blog.links` renamed to `blog.medias`

- `blog.roundAvatar` default value changed from `true` to `false`

- `blog.perPage` renamed to `blog.articlePerPage`

- `blog.autoExcerpt` moved to `plugins.blog.autoExcerpt`, and default value changed from `true` to `false`

### Encryption Config

- `encrypt.status: "global" | "local"` (default `"local"`) changed to `encrypt.global: boolean` (default `false`)

- `encrypt.global` renamed to `encrypt.admin`

### custom layout

- remove `custom`

### Page Layout

- `anchorDisplay` renamed to `toc`

### Reading speed

- `wordPerMinute` moved to `plugins.readingTime.wordPerMinute`

## plugin changes

### Changes

All plugin related options have been moved under `plugins`.

- `activeHeaderLinks` moved to `plugins.activeHeaderLinks`

- `comment` moved to `plugins.comment`

- `copyCode` moved to `plugins.copyCode`

- `feed` moved to `plugins.feed`

  The theme no longer outputs feed files in three formats by default. If necessary, please set options to output formats needed.

- `mdEnhance` moved to `plugins.mdEnhance`

  - Theme default value for `plugins.mdEnhance.codegroup` changed from `true` to `false`

  - `plugins.mdEnhance.lazyLoad` default value changed from `true` to `false`

  - Added `plugins.mdEnhance.vpre`

    The following syntax is no longer built into VuePress2.

    ```md
    ::: v-pre

    :::
    ```

  - Removed `plugins.mdEnhance.lineNumbers`

    VuePress2 supports line numbers config for code blocks individually

  - remove `plugins.mdEnhance.imageFix`

    Image related issues have been fixed in V2

- `photoSwipe` moved to `plugins.photoSwipe`

- `pwa` moved to `plugins.pwa`

- `readingTime` moved to `plugins.readingTime`

- `seo` moved to `plugins.seo`

- `sitemap` moved to `plugins.sitemap`

### Add

- Added `plugins.blog` to control blog address

### Remove

- remove `activeHash`

  The theme now uses official plugin `@vuepress/plugin-active-header-links`.

- remove `addThis`

  `vuepress-plugin-add-this` V2 was marked as deprecated when migrating and the theme no longer bundles it by default.

- remove `chunkRename`

  The theme no longer provides this functionality.

- remove `cleanUrl`

  The theme no longer provides this functionality.

- remove `copyright`

  Related plugin ism't compatible with V2 yet.

- remove `git`

  The theme now uses official plugin `@vuepress/plugin-git`.

- remove `smoothScroll`

  The theme now provides smooth scrolling via CSS and no longer provides compatibility with older browsers.
