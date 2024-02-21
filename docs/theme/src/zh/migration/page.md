---
title: 页面迁移指南
icon: file
order: 3
category:
  - 迁移
tag:
  - 迁移
  - 页面
  - Frontmatter
---

## Frontmatter

### 废弃

- `time` 标记为废弃，请使用 `date`

- `categories` 标记为废弃，请使用 `category`

- `tags` 标记为废弃，请使用 `tag`

### 变更

- `author` 类型从 `string | undefined` 改为 `AuthorInfo[] | AuthorInfo | string[] | string | undefined`

  ```ts
  interface AuthorInfo {
    /**
     * 作者姓名
     */
    name: string;

    /**
     * 作者网站
     */
    url?: string;

    /**
     * 作者 Email
     */
    email?: string;
  }
  ```

  此改动允许你添加多个作者，并为其设置网站。

- `date` 现在仅支持使用 `-` 标记的标准 DateString

- `category` 类型从 `string | undefined` 改为 `string[] | string | undefined`

  主题现在支持多个分类。

- `pageInfo` 类型从 `PageInfo[] | false` 改为 `ArticleInfo[] | false`。

  可填入的值从 `"author"`, `"time"`, `"category"`, `"tag"`, `"reading-time"`, `"word"`, `"visitor"` 改为 `"Author"`, `"Date"`, `"Original"`, `"Category"`, `"Tag"`, `"ReadingTime"`, `"Word"`, `"PageView"`

- `sidebarDepth` 重命名为 `headerDepth`

- `copyrightText` 重命名为 `copyright`

- `anchorDisplay` 重命名为 `toc`

- `updateTime` 重命名为 `lastUpdated`

- `prev` 和 `next` 类型由 `string | false` 改为 `AutoLinkOptions | string | false`

  ```ts
  interface AutoLinkOptions {
    text: string;
    icon: string;
    link: string;
  }
  ```

### 移除

- 移除 `password`

  出于安全性考虑 V2 移除了这种通过密码原文加密的方式。

- 移除原 `copyright`

  相关插件暂未适配 V2。

- 移除 `mediaLink`

  页脚不再展示媒体链接。

## Markdown

- 代码演示语法变更

  旧语法:

  ```md
  ::: demo Title

  <!-- demo content -->

  :::

  ::: demo [vue] Title

  <!-- demo content -->

  :::

  ::: demo [react] Title

  <!-- demo content -->

  :::
  ```

  新语法:

  ```md
  ::: normal-demo Title

  <!-- demo content -->

  :::

  ::: vue-demo Title

  <!-- demo content -->

  :::

  ::: react-demo Title

  <!-- demo content -->

  :::
  ```

- 代码组语法变更

  旧语法:

  ````md
  :::: code-group

  ::: code-group-item pnpm

  ```bash
  pnpm create vuepress-theme-hope [dir]
  ```

  :::

  ::: code-group-item npm:active

  ```bash
  npm init vuepress-theme-hope@latest [dir]
  ```

  :::

  ::::
  ````

  新语法:

  ````md
  ::: code-tabs

  @tab pnpm

  ```bash
  pnpm create vuepress-theme-hope [dir]
  ```

  @tab:active npm

  ```bash
  npm init vuepress-theme-hope@latest [dir]
  ```

  :::
  ````

## 布局

### 项目主页

项目主页 frontmatter 选项已更改。

- `title` 重命名为 `heroText`
- `darkHeroImage` 重命名为 `heroImageDark`
- `action` 重命名为 `actions`
