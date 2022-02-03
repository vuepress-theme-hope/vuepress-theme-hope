<!-- markdownlint-disable -->
<p align="center">
  <img width="240" src="https://vuepress-theme-hope.github.io/logo.svg" style="text-align: center;"/>
</p>
<h1 align="center">vuepress-theme-hope</h1>
<h4 align="center">A vuepress theme with tons of features✨ / 一个具有强大功能的 vuepress 主题✨</h4>

[![Author: Mr.Hope](https://img.shields.io/badge/作者-Mr.Hope-blue.svg?style=for-the-badge)](https://mrhope.site) [![License](https://img.shields.io/npm/l/vuepress-theme-hope.svg?style=for-the-badge)](https://github.com/vuepress-theme-hope/vuepress-theme-hope/blob/main/LICENSE)

<!-- markdownlint-restore -->

[![Version](https://img.shields.io/npm/v/vuepress-theme-hope.svg?style=flat-square&logo=npm) ![Downloads](https://img.shields.io/npm/dm/vuepress-theme-hope.svg?style=flat-square&logo=npm) ![Size](https://img.shields.io/bundlephobia/min/vuepress-theme-hope?style=flat-square&logo=npm)](https://www.npmjs.com/package/vuepress-theme-hope)

[![Open in Visual Studio Code](https://open.vscode.dev/badges/open-in-vscode.svg)](https://open.vscode.dev/vuepress-theme-hope/vuepress-theme-hope)

[![DeepScan grade](https://deepscan.io/api/teams/9792/projects/17544/branches/405512/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=9792&pid=17544&bid=405512)
![CodeQL](https://github.com/vuepress-theme-hope/vuepress-theme-hope/actions/workflows/codeql-analysis.yml/badge.svg)
[![codecov](https://codecov.io/gh/vuepress-theme-hope/vuepress-theme-hope/branch/main/graph/badge.svg?token=TNYMbGlxQ9)](https://codecov.io/gh/vuepress-theme-hope/vuepress-theme-hope)
![Test theme](https://github.com/vuepress-theme-hope/vuepress-theme-hope/actions/workflows/v2-test.yml/badge.svg)

[![opencollective](https://opencollective.com/vuepress-theme-hope/tiers/badge.svg)](https://opencollective.com/vuepress-theme-hope)

A vuepress theme with tons of features✨ / 一个具有强大功能的 vuepress 主题 ✨

## Warning

Current branch is based on VuePress@v2, and still in W.I.P. For stable releasae in v1, please see [v1 branch](https://github.com/vuepress-theme-hope/vuepress-theme-hope/tree/v1/).

当前分支基于 VuePress@v2，仍处于 W.I.P. 稳定 v1 发行版请参见[v1 分支](https://github.com/vuepress-theme-hope/vuepress-theme-hope/tree/v1/)。

### Attention ⚠️⚠️⚠️

**The V2 theme is still _in developing_, and only plugins are availale! So please ONLY use plugins now in production**.

**V2 主题仍在开发中，所以请仅在生产环境中使用目前发布的插件！**

## Details

V2 will come together with _VuePress@v2_, with the power of _vite@v2_ _webpack@v5_ and _vue@v3_.

V2 will be a totally rewrite including:

- All the components will be rewrite with _composition api in vue3_
- All the styles will be mirgate to _sass_

Also we are going to make sure the rewrite one has a better performance!🚀 (no less than 25% increasement)

---

Here is a list of changes:

> Note: All plugin names are in PascalCase and without `vuepress-plugin-` prefix, you should change to `kebab-case` and add the prefix yourself to get the correct plugin name.

## Changes in plugins

- [@mr-hope/components](https://github.com/vuepress-theme-hope/vuepress-theme-hope/blob/main/packages/components/README.md)

- [vuepress-plugin-add-this](https://github.com/vuepress-theme-hope/vuepress-theme-hope/blob/main/packages/add-this/README.md) ![deprecated](https://img.shields.io/badge/-deprecated-yellow)

- [vuepress-plugin-comment2](https://github.com/vuepress-theme-hope/vuepress-theme-hope/blob/main/packages/comment2/README.md)

- [vuepress-plugin-copy-code2](https://github.com/vuepress-theme-hope/vuepress-theme-hope/blob/main/packages/copy-code2/README.md)

- [vuepress-plugin-feed2](https://github.com/vuepress-theme-hope/vuepress-theme-hope/blob/main/packages/feed2/README.md)

- [vuepress-plugin-md-enhance](https://github.com/vuepress-theme-hope/vuepress-theme-hope/blob/main/packages/md-enhance/README.md)

- [vuepress-plugin-photo-swipe](https://github.com/vuepress-theme-hope/vuepress-theme-hope/blob/main/packages/photo-swipe/README.md)

- [vuepress-plugin-pwa2](https://github.com/vuepress-theme-hope/vuepress-theme-hope/blob/main/packages/pwa2/README.md)

- [vuepress-plugin-reading-time2](https://github.com/vuepress-theme-hope/vuepress-theme-hope/blob/main/packages/reading-time2/README.md)

- [vuepress-plugin-seo2](https://github.com/vuepress-theme-hope/vuepress-theme-hope/blob/main/packages/seo2/README.md)

- [vuepress-plugin-sitemap2](https://github.com/vuepress-theme-hope/vuepress-theme-hope/blob/main/packages/sitemap2/README.md)

## New plugins

- [x] LightGallery ![new](https://img.shields.io/badge/-new-brightgreen)

  A image viewer plugin for VuePress using [lightGallary](https://www.lightgalleryjs.com/)

  See [LightGallery](https://github.com/vuepress-theme-hope/vuepress-theme-hope/blob/main/packages/lightgallery/README.md)

- [x] SassPalette ![new](https://img.shields.io/badge/-new-brightgreen)

  A style system for sass across plugins and theme

  See [SassPalette](https://github.com/vuepress-theme-hope/vuepress-theme-hope/blob/main/packages/sass-palette/README.md)

- [ ] Share2 ![new](https://img.shields.io/badge/-new-brightgreen)

  A new share plugin providing page share.

- [ ] SimpleBlog ![new](https://img.shields.io/badge/-new-brightgreen)

  Build a own blog plugin to support blog with better performance

## Theme changes

- [ ] Pure Mode in theme and all plugins #438 ![new](https://img.shields.io/badge/-new-brightgreen)

- [ ] Dim non focused area #168 ![new](https://img.shields.io/badge/-new-brightgreen)

- [ ] Code block theme config #189 ![new](https://img.shields.io/badge/-new-brightgreen)

- [ ] Muti categories support ![new](https://img.shields.io/badge/-new-brightgreen)

- [ ] Drop fullscreen feature, or make it a optional feature (disabled by default). ![removed](https://img.shields.io/badge/-removed-red)

  Most visitors do not use this feature.

- [ ] Drop themecolor feature, or make it a optional feature (disabled by default). ![removed](https://img.shields.io/badge/-removed-red)

  Most visitors do not use this feature.

- [x] Allow I18N Customize ![new](https://img.shields.io/badge/-new-brightgreen)
