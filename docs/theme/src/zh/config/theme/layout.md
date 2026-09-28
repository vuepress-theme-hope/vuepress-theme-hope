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

:::: fields
@`navbar` type=`NavbarOptions | false` recommended=Yes default=`false`

导航栏配置。

参考：[布局 → 导航栏 → 导航栏链接](../../guide/layout/navbar.md#导航栏链接)和[布局 → 导航栏 → 禁用导航栏](../../guide/layout/navbar.md#禁用导航栏)。

@`navbarLayout` type=`NavbarLayoutOptions` default=`{ start: ["Brand"], center: ["Links"], end: ["Language", "Repo", "Outlook", "Search"] }`

自定义导航栏布局。

参考：[布局 → 导航栏 → 导航栏布局](../../guide/layout/navbar.md#布局配置)。

每个字段接受一组内置导航栏组件名称或自定义组件名称：

```ts
type NavbarComponent =
  "Brand" | "Links" | "Language" | "Search" | "Outlook" | "Repo";
```

@@`navbarLayout.start` type=`(NavbarComponent | string)[]`

导航栏开头的组件。

@@`navbarLayout.center` type=`(NavbarComponent | string)[]`

导航栏中间的组件。

@@`navbarLayout.end` type=`(NavbarComponent | string)[]`

导航栏结尾的组件。

@`logo` type=string recommended=Yes

导航栏图标，应为基于 `.vuepress/public` 文件夹的绝对路径。

参考：[布局 → 导航栏 → 站点图标](../../guide/layout/navbar.md#站点图标)。

@`logoDark` type=string default=`logo`

夜间模式下导航栏图标，应为基于 `.vuepress/public` 文件夹的绝对路径。

参考：[布局 → 导航栏 → 站点图标](../../guide/layout/navbar.md#站点图标)。

@`navbarTitle` type=string default=`$siteLocale.title`

导航栏标题，你可以设置为 `''` 来隐藏它。

@`repo` type=string

仓库配置，用于在导航栏中显示仓库链接。

参考：[布局 → 导航栏 → Git 仓库和编辑链接](../../guide/layout/navbar.md#git-仓库和编辑链接)。

@`repoDisplay` type=boolean default=`true`

是否在导航栏显示仓库链接。

参考：[布局 → 导航栏 → Git 仓库和编辑链接](../../guide/layout/navbar.md#git-仓库和编辑链接)。

@`repoLabel` type=string

用于导航栏仓库按钮的无障碍标签。

::: note

主题可以正确识别 GitHub, Gitlab, Gitee, Bitbucket 的链接。

:::

参考：[布局 → 导航栏 → Git 仓库和编辑链接](../../guide/layout/navbar.md#git-仓库和编辑链接)。

@`navbarAutoHide` type=`'always' | 'mobile' | 'none'` default=`'mobile'`

是否在向下滚动时自动隐藏导航栏。

@`hideSiteNameOnMobile` type=boolean default=`true`

是否在移动视图下隐藏站点名称。

::::

## 侧边栏相关

关于配置指南，详见 [布局 → 侧边栏](../../guide/layout/sidebar.md)。

::: fields
@`sidebar` type=`SidebarOptions` recommended=Yes default=`'structure'`

侧边栏配置。

@`sidebarSorter` type=`SidebarSorter` root-only=Yes default=`["readme", "order", "title", "filename"]`

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

其类型为：

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

## 导航相关

::: fields
@`breadcrumb` type=boolean default=`true`

是否全局启用路径导航。

@`breadcrumbIcon` type=boolean default=`true`

是否在路径导航显示图标。

@`prevLink` type=boolean default=`true`

是否在页面底部显示上一篇链接。

@`nextLink` type=boolean default=`true`

是否在页面底部显示下一篇链接。

:::

## 页面元数据

:::: fields
@`titleIcon` type=boolean default=`true`

是否在页面标题旁显示图标。

@`pageInfo` type=`ArticleInfo[] | false` default=`["Author", "Original", "Date", "Category", "Tag", "ReadingTime"]`

文章信息，可以填入数组，数组的顺序是各条目显示的顺序。填入 `false` 使其被禁用。

可以填入的条目如下:

- `'Author'`: 作者
- `'Date'`: 写作日期
- `'Original'`: 是否原创
- `'Category'`: 分类
- `'Tag'`: 标签
- `'ReadingTime'`: 预计阅读时间
- `'Word'`: 字数
- `'PageView'`: 页面浏览量

@`lastUpdated` type=boolean default=`true`

是否显示页面最后更新时间。

@`contributors` type=`'content' | 'meta' | boolean` default=`'meta'`

是否显示页面贡献者。

- `'content'`: 显示在页面内容中
- `'meta'`: 显示在页面底部的元信息中
- `true`: 和 `'meta'` 相同
- `false`: 不显示

@`changelog` type=boolean

是否显示变更日志。

@`editLink` type=boolean default=`true`

是否展示编辑此页链接。

@`editLinkPattern` type=string

编辑链接的匹配。其中 `:repo` `:branch` `:path` 会被自动替换为 `docsRepo` `docsBranch` 和 `docsDir + filePath`。

::: note

主题已经为 GitHub、Gitlab、Gitee 和 Bitbucket 提供了内置支持。

:::

@`docsRepo` type=string default=`repo`

文档仓库。

@`docsBranch` type=string default=`'main'`

文档所在分支。

@`docsDir` type=string

文档在仓库中的目录。

::::

## 页脚

::: fields
@`footer` type=string

页脚的默认内容，可输入 HTMLString。

@`copyright` type=`string | false` default=`'Copyright © <作者>'`

默认的版权信息，设置为 `false` 来默认禁用它。

@`displayFooter` type=boolean

是否默认显示页脚。

:::

## 杂项

::: fields
@`home` type=string default="当前 locale 的键名"

当前语言的主页路径，用于导航栏图标和返回主页按钮的链接。

@`rtl` type=boolean

是否使用 RTL 布局。

@`toc` type=`GetHeadersOptions | boolean` default=`true`

是否显示标题列表。

@@`toc.selector` type=string default=`'#markdown-content > h1, #markdown-content > h2, #markdown-content > h3, #markdown-content > h4, #markdown-content > h5, #markdown-content > h6, [vp-content] > h2'`

标题的选择器。

@@`toc.ignore` type=`string[]` default=`[".vp-badge", ".vp-icon"]`

忽略标题中的特定元素，应是一个 CSS 选择器数组。

@@`toc.levels` type=`HeaderLevels` default=`'deep'`

标题的级别。

`1` 到 `6` 对应 `<h1>` 到 `<h6>`

- `false`: 不显示标题列表
- `number`: 仅显示该级别的标题
- `[number, number]`: 标题级别元组，第一个数字应小于第二个数字，例如 `[2, 4]`，表示显示所有 `<h2>` 到 `<h4>` 的标题。
- `'deep'`: 和 `[2, 6]` 相同，表示显示所有 `<h2>` 到 `<h6>` 的标题。

:::
