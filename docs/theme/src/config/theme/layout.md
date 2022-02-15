---
title: Theme Layout Config
icon: config
category:
  - config
tag:
  - themeConfig
  - config
---

## Navbar Config

For related guide, please see [Layout → Navbar](../../guide/layout/navbar.md).

## navbar <Badge text="Recommanded" />

- Type: `HopeThemeNavbarConfig | false`
- Default: `false`

Navbar config

### logo <Badge text="Recommanded" />

- Type: `string | null`
- Required: No

Navbar logo, should be absolute path relative to `.vuepress/public` folder.

### logoDark

- Type: `string | null`
- Required: No

Navbar logo in darkmode, should be absolute path relative to `.vuepress/public` folder.

### repo

- Type: `string | null`
- Required: No

Repository link

### repoDisplay

- Type: `boolean`
- Default: `true`

Whether display repo link in navbar.

### repoLabel

- Type: `string | null`
- Required: No

Repository aria label of navbar.

::: note

The theme can recognize links of GitHub, Gitlab, Gitee and Bitbucket.

:::

### navbarAutoHide

- Type: `"always" | "mobile" | "none"`
- Default: `"mobile"`

Whether to hide navbar when scrolling down.

### hideSiteNameonMobile

- Type: `boolean`
- Default: `true`

Whether hide site title on mobile.

## Sidebar Config

For guide, see [Layout → Sidebar](../../guide/layout/sidebar.md).

### sidebar <Badge text="Recommanded" />

- Type: `HopeThemeSidebarConfig | "auto" | false`
- Default: `'auto'`

Sidebar Config.

### sidebarIcon

- Type: `boolean`
- Default: `true`

Whether show icons in the sidebar

### headingDepth

- Type: `number`
- Default: `2`

Nested headings depth in sidebar

## Route Navigation

### breadcrumb

- Type: `boolean`
- Default: `true`

Whether enable route navigation globally.

### breadcrumbIcon

- Type: `boolean`
- Default: `true`

Whether show icons in route navigation

## Title

## titleIcon

- Type: `boolean`
- Default: `true`

Whether display icon besides page title

## pageInfo

- Type: `ArticleInfo[] | false`
- Default: `["Author", "Original", "PageView", "Date", "Category", "Tag", "ReadingTime"]`

Article information. The order of the items decides the display order. Fill in `false` to disable it.

Available items in `ArticleInfo`:

- `'Author'`: author
- `'Date'`: writing date
- `'Original'`: is original
- `'Category'`: category
- `'Tag'`: tags
- `'ReadingTime'`: expect reading time
- `'Word'`: word number for the article
- `'PageView'`: pageviews

## Meta

### meta.lastUpdated

- Type: `boolean`
- Default: `true`

Whether to show "Last Updated" or not.

### meta.contributors

- Type: `boolean`
- Default: `true`

Whether to show "Contributors" or not.

### meta.editLink

- Type: `boolean`
- Default: `true`

Whether to show "Edit this page" or not.

### meta.editLinkPattern

- Type: `string`

Pattern of edit link. While `:repo` `:branch` `:path` wil be automatically replaced by `docsRepo` `docsBranch` and `docsDir + filePath`。

::: note

The theme provide built-in support for GitHub, Gitlab, Gitee and Bitbucket.

:::

### meta.docsRepo

- Type: `string`
- Default: `themeConfig.repo`

The repo of your docs

### meta.docsBranch

- Type: `string`
- Default: `'main'`

The branch of your docs

### meta.docsDir

- Type: `string`
- Default: `''`

Docs dir location in repo

## Footer

### footer

- Type: `string`
- Required: false

The default content for the footer, can accept HTMLString.

### copyright

- Type: `string | boolean`
- Default: `'Copyright © <author>'`

The default copyright info, set it to `false` to disable it by default.

### displayFooter

- Type: `boolean`
- Default: `false`

Whether to display footer by default.

## Others

### home

- Type: `string`
- Default: Key of current locale

Home path of current locale, used as the link of back-to-home and navbar logo.

### toc

- Type: `boolean`
- Default: `true`

Whether show toc list in desktop mode.
