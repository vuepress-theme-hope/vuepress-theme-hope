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

## Navbar Related

:::: fields
@`navbar` type=`NavbarOptions | false` recommended=Yes default=`false`

Navbar config.

See also: [Layout → Navbar → Navbar links](../../guide/layout/navbar.md#navbar-links) and [Layout → Navbar → Disable Navbar](../../guide/layout/navbar.md#disabling-navbar).

@`navbarLayout` type=`NavbarLayoutOptions` default=`{ start: ["Brand"], center: ["Links"], end: ["Language", "Repo", "Outlook", "Search"] }`

Customize navbar layout.

See also: [Layout → Navbar → Navbar layout](../../guide/layout/navbar.md#layout-config).

Each field accepts an array of built-in navbar component names or custom component names:

```ts
type NavbarComponent =
  "Brand" | "Links" | "Language" | "Search" | "Outlook" | "Repo";
```

@@`navbarLayout.start` type=`(NavbarComponent | string)[]`

The navbar components at the start.

@@`navbarLayout.center` type=`(NavbarComponent | string)[]`

The navbar components in the center.

@@`navbarLayout.end` type=`(NavbarComponent | string)[]`

The navbar components at the end.

@`logo` type=string recommended=Yes

Navbar logo, should be absolute path relative to `.vuepress/public` folder.

See also: [Layout → Navbar → Site Logo](../../guide/layout/navbar.md#site-logo).

@`logoDark` type=string default=`logo`

Navbar logo in dark mode, should be absolute path relative to `.vuepress/public` folder.

See also: [Layout → Navbar → Site Logo](../../guide/layout/navbar.md#site-logo).

@`navbarTitle` type=string default=`$siteLocale.title`

Navbar title, you can set it to an empty string to hide it.

@`repo` type=string

Repository link.

See also: [Layout → Navbar → Git Repository and Edit Links](../../guide/layout/navbar.md#git-repository-and-edit-links).

@`repoDisplay` type=boolean default=`true`

Whether display repo link in navbar.

See also: [Layout → Navbar → Git Repository and Edit Links](../../guide/layout/navbar.md#git-repository-and-edit-links).

@`repoLabel` type=string

Repository aria label of navbar.

::: note

The theme can recognize links of GitHub, Gitlab, Gitee and Bitbucket.

:::

See also: [Layout → Navbar → Git Repository and Edit Links](../../guide/layout/navbar.md#git-repository-and-edit-links).

@`navbarAutoHide` type=`'always' | 'mobile' | 'none'` default=`'mobile'`

Whether to hide navbar when scrolling down.

@`hideSiteNameOnMobile` type=boolean default=`true`

Whether hide site title on mobile.

::::

## Sidebar Related

For guide, see [Layout → Sidebar](../../guide/layout/sidebar.md).

::: fields
@`sidebar` type=`SidebarOptions` recommended=Yes default=`'structure'`

Sidebar Config.

@`sidebarSorter` type=`SidebarSorter` root-only=Yes default=`["readme", "order", "title", "filename"]`

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

Its type is:

```ts twoslash
import type {
  ThemeNormalPageFrontmatter,
  ThemePageData,
} from "vuepress-theme-hope";

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
  "readme" | "order" | "date" | "date-desc" | "filename" | "title";

type SidebarSorterFunction = (infoA: SidebarInfo, infoB: SidebarInfo) => number;

type SidebarSorter =
  | SidebarSorterFunction
  | SidebarSorterKeyword
  | (SidebarSorterKeyword | SidebarSorterFunction)[];
```

:::

## Route Navigation

::: fields
@`breadcrumb` type=boolean default=`true`

Whether enable route navigation globally.

@`breadcrumbIcon` type=boolean default=`true`

Whether show icons in route navigation.

@`prevLink` type=boolean default=`true`

Whether show prevLink in bottom.

@`nextLink` type=boolean default=`true`

Whether show nextLink in bottom.

:::

## Page Meta

:::: fields
@`titleIcon` type=boolean default=`true`

Whether to display an icon beside the page title.

@`pageInfo` type=`ArticleInfo[] | false` default=`["Author", "Original", "Date", "Category", "Tag", "ReadingTime"]`

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

@`lastUpdated` type=boolean default=`true`

Whether to show "Last Updated" or not.

@`contributors` type=`'content' | 'meta' | boolean` default=`'meta'`

Whether to show "Contributors" or not.

- `'content'`: show as content in main text
- `'meta'`: show as meta info at the bottom of content
- `true`: same as `'meta'`
- `false`: disable it

@`changelog` type=boolean

Whether to show changelog.

@`editLink` type=boolean default=`true`

Whether to show "Edit this page" or not.

@`editLinkPattern` type=string

Pattern of edit link. While `:repo` `:branch` `:path` will be automatically replaced by `docsRepo` `docsBranch` and `docsDir + filePath`.

::: note

The theme provides built-in support for GitHub, Gitlab, Gitee and Bitbucket.

:::

@`docsRepo` type=string default=`repo`

The repo of your docs.

@`docsBranch` type=string default=`'main'`

The branch of your docs.

@`docsDir` type=string

Docs dir location in repo.

::::

## Footer

::: fields
@`footer` type=string

The default content for the footer, can accept HTMLString.

@`copyright` type=`string | false` default=`'Copyright © <author>'`

The default copyright info, set it to `false` to disable it by default.

@`displayFooter` type=boolean

Whether to display footer by default.

:::

## Others

::: fields
@`home` type=string default="Key of current locale"

Home path of current locale, used as the link of back-to-home and navbar logo.

@`rtl` type=boolean

Whether to use RTL layout.

@`toc` type=`GetHeadersOptions | boolean` default=`true`

Whether show toc list.

@@`toc.selector` type=string default=`'#markdown-content > h1, #markdown-content > h2, #markdown-content > h3, #markdown-content > h4, #markdown-content > h5, #markdown-content > h6, [vp-content] > h2'`

The selector of the headers.

@@`toc.ignore` type=`string[]` default=`[".vp-badge", ".vp-icon"]`

Ignore specific elements within the header, should be an array of `CSS Selector`.

@@`toc.levels` type=`HeaderLevels` default=`'deep'`

The levels of the headers.

`1` to `6` for `<h1>` to `<h6>`

- `false`: No headers.
- `number`: only headings of that level will be displayed.
- `[number, number]`: headings level tuple, where the first number should be less than the second number, for example, `[2, 4]` which means all headings from `<h2>` to `<h4>` will be displayed.
- `'deep'`: same as `[2, 6]`, which means all headings from `<h2>` to `<h6>` will be displayed.

:::
