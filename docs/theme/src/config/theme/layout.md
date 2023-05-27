---
title: Theme Layout Options
icon: object-group
order: 4
category:
  - Config
tag:
  - Theme Config
  - Layout
---

The following options control theme layout.

<!-- more  -->

## Navbar Config

For related guide, please see [Layout → Navbar](../../guide/layout/navbar.md).

### navbar <Badge text="Recommended" type="tip" />

- Type: `NavbarConfig | false`
- Default: `false`

Navbar config

### navbarIcon

- Type: `boolean`
- Default: `true`

Whether display icons in navbar.

### navbarLayout

- Type: `NavbarLayoutOptions`

  ```ts
  /**
   * Navbar component
   */
  type NavbarComponent =
    | "Brand"
    | "Links"
    | "Language"
    | "Search"
    | "Outlook"
    | "Repo";

  /**
   * Navbar layout options
   */
  interface NavbarLayoutOptions {
    start?: (NavbarComponent | string)[];
    center?: (NavbarComponent | string)[];
    end?: (NavbarComponent | string)[];
  }
  ```

- Default: `{ start: ["Brand"], center: ["Links"], end: ["Language", "Repo", "Outlook", "Search"] }`

Customize navbar layout.

### logo <Badge text="Recommended" type="tip" />

- Type: `string`
- Required: No

Navbar logo, should be absolute path relative to `.vuepress/public` folder.

### logoDark

- Type: `string`
- Default: `logo`

Navbar logo in darkmode, should be absolute path relative to `.vuepress/public` folder.

### navTitle

- Type: `string | false`
- Default: `$siteLocale.title`

Navbar title

### repo

- Type: `string`
- Required: No

Repository link

### repoDisplay

- Type: `boolean`
- Default: `true`

Whether display repo link in navbar.

### repoLabel

- Type: `string`
- Required: No

Repository aria label of navbar.

::: note

The theme can recognize links of GitHub, Gitlab, Gitee and Bitbucket.

:::

### navbarAutoHide

- Type: `"always" | "mobile" | "none"`
- Default: `"mobile"`

Whether to hide navbar when scrolling down.

### hideSiteNameOnMobile

- Type: `boolean`
- Default: `true`

Whether hide site title on mobile.

## Sidebar Config

For guide, see [Layout → Sidebar](../../guide/layout/sidebar.md).

### sidebar <Badge text="Recommended" type="tip" />

- Type: `SidebarConfig | "structure" | "heading" | false`
- Default: `"structure"`

Sidebar Config.

### sidebarIcon

- Type: `boolean`
- Default: `true`

Whether show icons in the sidebar

### sidebarSorter <Badge text="Root only" type="warning" />

- Type: `SidebarSorter`

  ```ts
  interface SidebarFileInfo {
    type: "file";
    filename: string;

    title: string;
    order: number | null;
    path?: string | null;

    frontmatter: ThemeNormalPageFrontmatter;
    pageData: ThemePageData;
  }

  interface SidebarDirInfo {
    type: "dir";
    dirname: string;
    children: SidebarInfo[];

    title: string;
    order: number | null;

    groupInfo: {
      icon?: string;
      collapsible?: boolean;
      link?: string;
    };

    frontmatter: ThemeNormalPageFrontmatter | null;
    pageData: ThemePageData | null;
  }

  type SidebarInfo = SidebarFileInfo | SidebarDirInfo;

  type SidebarSorterKeyword =
    | "readme"
    | "order"
    | "date"
    | "date-desc"
    | "filename"
    | "title";

  type SidebarSorterFunction = (
    infoA: SidebarInfo,
    infoB: SidebarInfo
  ) => number;

  type SidebarSorter =
    | SidebarSorterFunction
    | SidebarSorterFunction[]
    | SidebarSorterKeyword
    | SidebarSorterKeyword[];
  ```

- Default: `["readme", "order", "title", "filename"]`

Structure sidebar sorter.

You can:

- fill in a custom function
- provide one sorter keyword
- provide an array of custom function or sorter keyword

Available keywords are:

- `readme`: `README.md` or `readme.md` first
- `order`: positive order first with its value ascending, negative order last with its value descending
- `date`: sort by date ascending
- `date-desc`: sort by date descending
- `title`: alphabetically sort by title
- `filename`: alphabetically sort by filename

### headerDepth

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

### prevLink

- Type: `boolean`
- Default: `true`

Whether show prevLink in bottom.

### nextLink

- Type: `boolean`
- Default: `true`

Whether show nextLink in bottom.

## Title

### titleIcon

- Type: `boolean`
- Default: `true`

Whether display icon besides page title

### pageInfo

- Type: `ArticleInfo[] | false`
- Default: `["Author", "Original", "Date", "Category", "Tag", "ReadingTime"]`

Article information. The order of the items decides the display order. Fill in `false` to disable it.

Available items in `ArticleInfo`:

- `"Author"`: author
- `"Date"`: writing date
- `"Original"`: is original
- `"Category"`: category
- `"Tag"`: tags
- `"ReadingTime"`: expect reading time
- `"Word"`: word number for the article
- `"PageView"`: pageviews

## Meta

### lastUpdated

- Type: `boolean`
- Default: `true`

Whether to show "Last Updated" or not.

### contributors

- Type: `boolean`
- Default: `true`

Whether to show "Contributors" or not.

### editLink

- Type: `boolean`
- Default: `true`

Whether to show "Edit this page" or not.

### editLinkPattern

- Type: `string`

Pattern of edit link. While `:repo` `:branch` `:path` will be automatically replaced by `docsRepo` `docsBranch` and `docsDir + filePath`。

::: note

The theme provides built-in support for GitHub, Gitlab, Gitee and Bitbucket.

:::

### docsRepo

- Type: `string`
- Default: `repo`

The repo of your docs

### docsBranch

- Type: `string`
- Default: `"main"`

The branch of your docs

### docsDir

- Type: `string`
- Default: `""`

Docs dir location in repo

## Footer

### footer

- Type: `string`
- Required: false

The default content for the footer, can accept HTMLString.

### copyright

- Type: `string | false`
- Default: `"Copyright © <author>"`

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

### rtl

- Type: `boolean`
- Default: `false`

Whether to use RTL layout.

### toc {#toc-heading}

- Type: `boolean`
- Default: `true`

Whether show toc list in desktop mode.
