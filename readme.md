<!-- markdownlint-disable -->
<p align="center">
  <img width="240" src="https://vuepress-theme-hope.github.io/logo.svg" style="text-align: center;"/>
</p>
<h1 align="center">vuepress-theme-hope</h1>
<h4 align="center">A vuepress theme with tons of features✨ / 一个具有强大功能的 vuepress 主题✨</h4>

[![Author: Mr.Hope](https://img.shields.io/badge/作者-Mr.Hope-blue.svg?style=for-the-badge)](https://mrhope.site) [![License](https://img.shields.io/npm/l/vuepress-theme-hope.svg?style=for-the-badge)](https://github.com/vuepress-theme-hope/vuepress-theme-hope/blob/main/LICENSE)

<!-- markdownlint-restore -->

[![Version](https://img.shields.io/npm/v/vuepress-theme-hope.svg?style=flat-square&logo=npm) ![Downloads](https://img.shields.io/npm/dm/vuepress-theme-hope.svg?style=flat-square&logo=npm) ![Size](https://img.shields.io/bundlephobia/min/vuepress-theme-hope?style=flat-square&logo=npm)](https://www.npmjs.com/package/vuepress-theme-hope)

[![DeepScan grade](https://deepscan.io/api/teams/9792/projects/17544/branches/405512/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=9792&pid=17544&bid=405512)
![CodeQL](https://github.com/vuepress-theme-hope/vuepress-theme-hope/actions/workflows/codeql-analysis.yml/badge.svg)
[![codecov](https://codecov.io/gh/vuepress-theme-hope/vuepress-theme-hope/branch/main/graph/badge.svg?token=TNYMbGlxQ9)](https://codecov.io/gh/vuepress-theme-hope/vuepress-theme-hope)
![Test theme](https://github.com/vuepress-theme-hope/vuepress-theme-hope/actions/workflows/test-v2.yml/badge.svg)

A vuepress theme with tons of features✨ / 一个具有强大功能的 vuepress 主题 ✨

## Warning

Current branch is based on VuePress@v2, and still in W.I.P. For stable releasae in v1, please see [v1 branch](https://github.com/vuepress-theme-hope/vuepress-theme-hope/tree/v1/).

当前分支基于 VuePress@v2，仍处于 W.I.P. 稳定 v1 发行版请参见[v1 分支](https://github.com/vuepress-theme-hope/vuepress-theme-hope/tree/v1/)。

## Details

V2 will come together with _VuePress@v2_, with the power of _vite@v2_ _webpack@v5_ and _vue@v3_.

V2 will be a totally rewrite including:

- All the components will be rewrite with _composition api in vue3_
- All the styles will be mirgate to _sass_

Also we are going to make sure the rewrite one has a better performance!🚀 (no less than 25% increasement)

---

Here is a list of changes:

> Note: All plugin names are in PascalCase and without `vuepress-plugin-` prefix, you should change to `kebab-case` and add the prefix yourself to get the correct plugin name.

## AddThis💌 ![deprecated](https://img.shields.io/badge/-deprecated-yellow)

We are just making this plugin compatable with V2. This plugin will no longer under maintainment.

### Why❔

AdBlocks are blocking addThis link heavily, and in most cases this plugin won't work.

### Solution💡

We will provide a new share plugin in v2.

## Comment2💬

Renamed from `@mr-hope/vuepress-plugin-comment` to `vuepress-plugin-comment2`. ⚠

### Changes

- [x] Drop Valine support! ![removed](https://img.shields.io/badge/-removed-red)

  Valine is lack of maintainence and can leak your privacy. You should use [Waline](https://waline.js.org) instead.

- [x] Option `hint` (default `true`) for handling page info hints. ![new](https://img.shields.io/badge/-new-brightgreen)

- [x] Allow I18N Customize ![new](https://img.shields.io/badge/-new-brightgreen)

- [x] Muti categories support ![new](https://img.shields.io/badge/-new-brightgreen)

### Note

Vssue is currently being dropped because vssue has not support v2 yet. We will add it back after it supports v2.

## CopyCode2📋

Renamed from `@mr-hope/vuepress-plugin-copy-code` to `vuepress-plugin-copy-code2`. ⚠

### Changes

- [x] Option `delay` (default `500`) for handling the page swtiching transition. ![new](https://img.shields.io/badge/-new-brightgreen)

- [ ] Option `pure` (default `false`) for handling fancy styles. ![new](https://img.shields.io/badge/-new-brightgreen)

- [x] Allow I18N Customize ![new](https://img.shields.io/badge/-new-brightgreen)

## Feed2

Renamed from `@mr-hope/vuepress-plugin-feed` to `vuepress-plugin-feed2`. ⚠

### Changes

- [x] Better log output. ![improve](https://img.shields.io/badge/-improved-blue)

- [x] Muti categories support ![new](https://img.shields.io/badge/-new-brightgreen)

## MdEnhance

### Changes

- [ ] Auto inject cdn links for markdown demo ![new](https://img.shields.io/badge/-new-brightgreen)

- [x] Option `delay` (default `500`) for handling the page swtiching transition. ![new](https://img.shields.io/badge/-new-brightgreen)

- [x] Drop flowchart support ![removed](https://img.shields.io/badge/-removed-red)

  We are adding mermaid support, and mermaid support flowchart.

- [x] Move SlidePage layout from theme to the plugin

- [x] Allow I18N Title in details block ![new](https://img.shields.io/badge/-new-brightgreen)

- [x] Allow I18N Customize ![new](https://img.shields.io/badge/-new-brightgreen)

## LightGallery ![new](https://img.shields.io/badge/-new-brightgreen)

- [x] Build a photo preview plugin using [lightGallary](https://www.lightgalleryjs.com/)

## Pwa2

Renamed from `@mr-hope/vuepress-plugin-pwa` to `vuepress-plugin-pwa2`. ⚠

### Changes

- [x] Allow I18N Customize ![new](https://img.shields.io/badge/-new-brightgreen)

## PhotoSwipe ![deprecated](https://img.shields.io/badge/-deprecated-yellow)

This plugin will still be under maintained, but we are going to build a better plugin using [lightGallary](https://www.lightgalleryjs.com/).

### Changes

- [x] Option `delay` (default `500`) for handling the page swtiching transition. ![new](https://img.shields.io/badge/-new-brightgreen)

- [x] Allow I18N Customize ![new](https://img.shields.io/badge/-new-brightgreen)

## ReadingTime2

Renamed from `@mr-hope/vuepress-plugin-reading-time` to `vuepress-plugin-reading-time2`. ⚠

- [x] Allow I18N Customize ![new](https://img.shields.io/badge/-new-brightgreen)

## SassPalette ![new](https://img.shields.io/badge/-new-brightgreen)

- [x] A new palette handling config and palette across theme and plugins using sass

Options:

```ts
export interface PaletteOptions {
  /** identifier for palette */
  id: string;

  /**
   * user config file path, relative to source dir
   *
   * @default ".vuepress/styles/config.scss"
   */
  config?: string;

  /**
   * default config file path, should be absolute path
   *
   * This is the file you should use to provide default values with `!default`
   *
   * @default "vuepress-plugin-sass-palette/styles/default/config.scss"
   */
  defaultConfig?: string;

  /**
   * user palette file path, relative to source dir
   *
   * @default ".vuepress/styles/palette.scss"
   */
  palette?: string;

  /**
   * default palette file path, should be absolute path
   *
   * This is the file you should use to provide default values with `!default`
   *
   * @default "vuepress-plugin-sass-palette/styles/default/palette.scss"
   */

  defaultPalette?: string;

  /**
   * user style file path, relative to source dir
   *
   * @default ".vuepress/styles/palette.scss"
   */
  style?: string;
}
```

## SEO2

Renamed from `@mr-hope/vuepress-plugin-seo` to `vuepress-plugin-seo2`. ⚠

### Changes

- [ ] JSON-LD support ![new](https://img.shields.io/badge/-new-brightgreen)

- [x] Better log output. ![improve](https://img.shields.io/badge/-improved-blue)

- [x] Muti categories support ![new](https://img.shields.io/badge/-new-brightgreen)

- [ ] Alternate Language Link support ![new](https://img.shields.io/badge/-new-brightgreen)

## Share2 ![new](https://img.shields.io/badge/-new-brightgreen)

- [ ] A new share plugin providing page share.

## SimpleBlog ![new](https://img.shields.io/badge/-new-brightgreen)

- [ ] Build a own blog plugin to support blog with better performance

## Sitemap2

Renamed from `@mr-hope/vuepress-plugin-sitemap` to `vuepress-plugin-sitemap2`. ⚠

### Changes

- [x] Better log output. ![improve](https://img.shields.io/badge/-improved-blue)

- [x] Muti categories support ![new](https://img.shields.io/badge/-new-brightgreen)

## VuepressThemeHope

- [ ] Pure Mode in theme and all plugins #438 ![new](https://img.shields.io/badge/-new-brightgreen)

- [ ] Dim non focused area #168 ![new](https://img.shields.io/badge/-new-brightgreen)

- [ ] Code block theme config #189 ![new](https://img.shields.io/badge/-new-brightgreen)

- [ ] Muti categories support ![new](https://img.shields.io/badge/-new-brightgreen)

- [ ] Drop fullscreen feature, or make it a optional feature (disabled by default). ![removed](https://img.shields.io/badge/-removed-red)

  Most visitors do not use this feature.

- [ ] Drop themecolor feature, or make it a optional feature (disabled by default). ![removed](https://img.shields.io/badge/-removed-red)

  Most visitors do not use this feature.

- [ ] Allow I18N Customize ![new](https://img.shields.io/badge/-new-brightgreen)
