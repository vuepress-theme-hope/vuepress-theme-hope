---
title: 主题布局选项
icon: config
order: 3
category:
  - 配置
tag:
  - 主题配置
  - 布局
---

以下选项控制主题布局。

<!-- more -->

## 导航栏

具体介绍详见 [布局 → 导航栏](../../guide/layout/navbar.md)。

### navbar <Badge text="建议配置" type="tip" />

- 类型: `HopeThemeNavbarConfig | false`
- 默认值: `false`

导航栏配置，具体配置方式见上方详情。

### navbarIcon

- 类型: `boolean`
- 默认值: `true`

是否在导航栏显示图标。

### navbarLayout

- 类型: `HopeNavbarLayoutOptions`

  ```ts
  type HopeThemeNavbarComponent =
    | "Brand"
    | "Links"
    | "Language"
    | "Search"
    | "Outlook"
    | "Repo";

  interface HopeNavbarLayoutOptions {
    left: HopeThemeNavbarComponent[];
    center: HopeThemeNavbarComponent[];
    right: HopeThemeNavbarComponent[];
  }
  ```

- 默认值: `{ left: ["Brand"], center: ["Links"], right: ["Language", "Repo", "Outlook", "Search"] }`

自定义导航栏布局

### logo <Badge text="建议配置" type="tip" />

- 类型: `string`
- 必填: 否

导航栏图标，应为基于 `.vuepress/public` 文件夹的绝对路径。

### logoDark

- 类型: `string`
- 必填: 否

夜间模式下导航栏图标，应为基于 `.vuepress/public` 文件夹的绝对路径。

### repo

- 类型: `string`
- 必填: 否

仓库配置，用于在导航栏中显示仓库链接。

### repoDisplay

- 类型: `boolean`
- 默认值: `true`

是否在导航栏显示仓库链接。

### repoLabel

- 类型: `string`
- 必填: 否

用于导航栏仓库按钮的无障碍标签。

::: note

主题可以正确识别 GitHub, Gitlab, Gitee, Bitbucket 的链接。

:::

### navbarAutoHide

- 类型: `"always" | "mobile" | "none"`
- 默认值: `"mobile"`

是否在向下滚动时自动隐藏导航栏。

### hideSiteNameonMobile

- 类型: `boolean`
- 默认值: `true`

是否在移动视图下隐藏站点名称。

## 侧边栏

关于配置指南，详见 [布局 → 侧边栏](../../guide/layout/sidebar.md)。

### sidebar <Badge text="建议配置" type="tip" />

- 类型: `HopeThemeSidebarConfig | "structure" | "heading" | false`
- 默认值: `"structure"`

侧边栏配置。

### sidebarIcon

- 类型: `boolean`
- 默认值: `true`

是否在侧边栏显示图标。

### headerDepth

- 类型: `number`
- 默认值: `2`

侧边栏嵌套的标题深度。

## 路径导航

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

## 标题

### titleIcon

- 类型: `boolean`
- 默认值: `true`

是否在页面标题旁显示图标。

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

## Meta

### lastUpdated

- 类型: `boolean`
- 默认值: `true`

是否显示页面最后更新时间

### contributors

- 类型: `boolean`
- 默认值: `true`

是否显示页面贡献者

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

- 类型: `string | boolean`
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

### toc {#toc-heading}

- 类型: `boolean`
- 默认值: `true`

是否在桌面模式下右侧展示标题列表
