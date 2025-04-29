---
title: 主题布局选项
icon: object-group
order: 3
category:
  - 配置
tag:
  - 主题配置
  - 布局
---

以下选项控制主题布局。

<!-- more -->

## 导航栏相关

### navbar <Badge text="建议配置" type="tip" /> {#navbar-header}

- 类型: `NavbarOptions | false`
- 默认值: `false`
- 详情:
  - [布局 → 导航栏 → 导航栏链接](../../guide/layout/navbar.md#导航栏链接)
  - [布局 → 导航栏 → 禁用导航栏](../../guide/layout/navbar.md#禁用导航栏)

导航栏配置。

### navbarLayout

- 类型: `NavbarLayoutOptions`

  ```ts
  /**
   * 内置导航栏组件
   */
  type NavbarComponent =
    | "Brand"
    | "Links"
    | "Language"
    | "Search"
    | "Outlook"
    | "Repo";

  /**
   * 导航栏布局选项
   */
  interface NavbarLayoutOptions {
    start?: (NavbarComponent | string)[];
    center?: (NavbarComponent | string)[];
    end?: (NavbarComponent | string)[];
  }
  ```

- 默认值: `{ start: ["Brand"], center: ["Links"], end: ["Language", "Repo", "Outlook", "Search"] }`
- 详情:
  - [布局 → 导航栏 → 导航栏布局](../../guide/layout/navbar.md#布局配置)

自定义导航栏布局。

### logo <Badge text="建议配置" type="tip" />

- 类型: `string`
- 必填: 否
- 详情:
  - [布局 → 导航栏 → 站点图标](../../guide/layout/navbar.md#站点图标)

导航栏图标，应为基于 `.vuepress/public` 文件夹的绝对路径。

### logoDark

- 类型: `string`
- 默认值: `logo`
- 详情:
  - [布局 → 导航栏 → 站点图标](../../guide/layout/navbar.md#站点图标)

夜间模式下导航栏图标，应为基于 `.vuepress/public` 文件夹的绝对路径。

### navbarTitle

- 类型: `string`
- 默认值: `$siteLocale.title`

导航栏标题，你可以设置为 `''` 来隐藏它。

### repo

- 类型: `string`
- 必填: 否
- 详情:
  - [布局 → 导航栏 → Git 仓库和编辑链接](../../guide/layout/navbar.md#git-仓库和编辑链接)

仓库配置，用于在导航栏中显示仓库链接。

### repoDisplay

- 类型: `boolean`
- 默认值: `true`
- 详情:
  - [布局 → 导航栏 → Git 仓库和编辑链接](../../guide/layout/navbar.md#git-仓库和编辑链接)

是否在导航栏显示仓库链接。

### repoLabel

- 类型: `string`
- 必填: 否
- 详情:
  - [布局 → 导航栏 → Git 仓库和编辑链接](../../guide/layout/navbar.md#git-仓库和编辑链接)

用于导航栏仓库按钮的无障碍标签。

::: note

主题可以正确识别 GitHub, Gitlab, Gitee, Bitbucket 的链接。

:::

### navbarAutoHide

- 类型: `"always" | "mobile" | "none"`
- 默认值: `"mobile"`

是否在向下滚动时自动隐藏导航栏。

### hideSiteNameOnMobile

- 类型: `boolean`
- 默认值: `true`

是否在移动视图下隐藏站点名称。

## 侧边栏相关

关于配置指南，详见 [布局 → 侧边栏](../../guide/layout/sidebar.md)。

### sidebar <Badge text="建议配置" type="tip" /> {#sidebar-header}

- 类型: `SidebarOptions`
- 默认值: `"structure"`

侧边栏配置。

### sidebarSorter <Badge text="仅限 Root" type="warning" />

- 类型: `SidebarSorter`

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
    | "readme"
    | "order"
    | "date"
    | "date-desc"
    | "filename"
    | "title";

  type SidebarSorterFunction = (
    infoA: SidebarInfo,
    infoB: SidebarInfo,
  ) => number;

  type SidebarSorter =
    | SidebarSorterFunction
    | SidebarSorterFunction[]
    | SidebarSorterKeyword
    | SidebarSorterKeyword[];
  ```

- 默认值: `["readme", "order", "title", "filename"]`

结构侧边栏排序器。

你可以:

- 填写自定义函数
- 提供一个排序器关键字
- 提供一组自定义函数或排序器关键字

可用的关键字有:

- `readme`: `README.md` 或 `readme.md` 在前
- `order`: 正序在前并按其值升序排列，负序在后并按其值降序排列
- `date`: 按日期升序排序
- `date-desc`: 按日期降序排序
- `title`: 按标题字母顺序排序
- `filename`: 按文件名字母顺序排序

## 导航相关

### breadcrumb

- 类型: `boolean`
- 默认值: `true`

是否全局启用路径导航。

### breadcrumbIcon

- 类型: `boolean`
- 默认值: `true`

是否在路径导航显示图标。

### prevLink

- 类型: `boolean`
- 默认值: `true`

是否在页面底部显示上一篇链接。

### nextLink

- 类型: `boolean`
- 默认值: `true`

是否在页面底部显示下一篇链接。

## 页面元数据

### pageInfo

- 类型: `ArticleInfo[] | false`
- 默认值: `["Author", "Original", "Date", "Category", "Tag", "ReadingTime"]`

文章信息，可以填入数组，数组的顺序是各条目显示的顺序。填入 `false` 使其被禁用。

可以填入的条目如下:

- `"Author"`: 作者
- `"Date"`: 写作日期
- `"Original"`: 是否原创
- `"Category"`: 分类
- `"Tag"`: 标签
- `"ReadingTime"`: 预计阅读时间
- `"Word"`: 字数
- `"PageView"`: 页面浏览量

### titleIcon

- 类型: `boolean`
- 默认值: `true`

是否在页面标题旁显示图标。

### lastUpdated

- 类型: `boolean`
- 默认值: `true`

是否显示页面最后更新时间

### contributors

- 类型: `"content" | "meta" | boolean`
- 默认值: `"meta"`

是否显示页面贡献者

- `"content"`: 显示在页面内容中
- `"meta"`: 显示在页面底部的元信息中
- `true`: 和 `"meta"` 相同
- `false`: 不显示

### changelog

- 类型: `boolean`
- 默认值: `false`

是否显示变更日志

### editLink

- 类型: `boolean`
- 默认值: `true`

是否展示编辑此页链接

### editLinkPattern

- 类型: `string`

编辑链接的匹配。其中 `:repo` `:branch` `:path` 会被自动替换为 `docsRepo` `docsBranch` 和 `docsDir + filePath`。

::: note

主题已经为 GitHub、Gitlab、Gitee 和 Bitbucket 提供了内置支持。

:::

### docsRepo

- 类型: `string`
- 默认值: `repo`

文档仓库

### docsBranch

- 类型: `string`
- 默认值: `"main"`

文档所在分支

### docsDir

- 类型: `string`
- 默认值: `""`

文档在仓库中的目录

## 页脚

### footer

- 类型: `string`
- 必填: 否

页脚的默认内容，可输入 HTMLString。

### copyright

- 类型: `string | false`
- 默认值: `"Copyright © <作者>"`

默认的版权信息，设置为 `false` 来默认禁用它。

### displayFooter

- 类型: `boolean`
- 默认值: `false`

是否默认显示页脚

## 杂项

### home

- 类型: `string`
- 默认值: 当前 `locale` 的键名

当前语言的主页路径，用于导航栏图标和返回主页按钮的链接。

### rtl

- 类型: `boolean`
- 默认值: `false`

是否使用 RTL 布局

### toc {#toc-heading}

- 类型: `GetHeadersOptions | boolean`

  ```ts
  export interface GetHeadersOptions {
    /**
     * 标题的选择器
     *
     * @default "#markdown-content >  h1, #markdown-content > h2, #markdown-content > h3, #markdown-content > h4, #markdown-content > h5, #markdown-content > h6, [vp-content] > h2"
     */
    selector?: string;
    /**
     * 忽略标题中的特定元素，应是一个 CSS 选择器数组
     *
     * @default [".vp-badge", ".vp-icon"]
     */
    ignore?: string[];
    /**
     * 标题的级别
     *
     * `1` 到 `6` 对应 `<h1>` 到 `<h6>`
     *
     * - `false`: 不显示标题列表
     * - `number`: 仅显示该级别的标题
     * - `[number, number]: 标题级别元组，第一个数字应小于第二个数字，例如 `[2, 4]`，表示显示所有 `<h2>` 到 `<h4>` 的标题。
     * - `deep`: 和 `[2, 6]` 相同，表示显示所有 `<h2>` 到 `<h6>` 的标题。
     *
     * @default "deep"
     */
    levels?: HeaderLevels;
  }
  ```

- 默认值: `true`

是否显示标题列表
