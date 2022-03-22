---
title: 页面迁移指南
icon: page
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
    name: string;
    url?: string;
  }
  ```

  此改动允许你添加多个作者，并为其设置网站。

- `date` 现在仅支持使用 `-` 标记的标准 DateString

- `category` 类型从 `string | undefined` 改为 `string[] | string | undefined`

  主题现在支持多个分类。

- `pageInfo` 类型从 `PageInfo[] | false` 改为 `ArticleInfo[] | false`。

  可填入的值从 `"author"`, `"time"`, `"category"`, `"tag"`, `"reading-time"`, `"word"`, `"visitor"` 改为 `"Author"`, `"Date"`, `"Original"`, `"Category"`, `"Tag"`, `"ReadingTime"`, `"Word"`, `"PageView"`

- `sidebarDepth` 重命名为 `headingDepth`

- `copyrightText` 重命名为 `copyright`

- `anchorDisplay` 重命名为 `toc`

- `updateTime` 重命名为 `lastUpdated`

- `prev` 和 `next` 类型由 `string | false` 改为 `AutoLink | string | false`

  ```ts
  interface AutoLink {
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

## 布局

### 项目主页

项目主页 frontmatter 选项已更改。

- `title` 重命名为 `heroText`
- `darkHeroImage` 重命名为 `heroImageDark`
- `action` 重命名为 `actions`
