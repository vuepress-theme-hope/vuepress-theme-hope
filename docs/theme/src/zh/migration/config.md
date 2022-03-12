---
title: 配置迁移指南
icon: config
category:
  - 迁移
tag:
  - 迁移
  - 主题配置
---

## 主题使用

- `config` 重命名为 `defineHopeConfig`
- `themeConfig` 重命名为 `defineThemeConfig`
- `navbarConfig` 重命名为 `defineNavbarConfig`
- `sidebarConfig` 重命名为 `defineSidebarConfig`

  同时新提供 `defineSidebarArrayConfig`, `defineSidebarObjectConfig`

## 主题配置

- `author` 类型从 `string | undefined` 改为 `AuthorInfo[] | AuthorInfo | string[] | string | undefined`

  ```ts
  interface AuthorInfo {
    name: string;
    url?: string;
  }
  ```

  此改动允许你添加多个作者，并为其设置网站。

### 导航栏

- `nav`, `navbar` 统一为 `navbar`

- `darkLogo` 重命名为 `logoDark`

- `navAutoHide` 重命名为 `navbarAutoHide`

- 新增 `navbarIcon` 选项

由于主题不再内置搜索:

- 移除 `search`, `searchPlaceholder`, `searchMaxSuggestions`

- 移除 `algolia`, `algoliaType`

### 侧边栏

- `sidebarDepth` 重命名为 `headingDepth`

- 移除 `displayAllHeaders`

### 导航栏侧边栏配置统一

- 导航栏配置中的 `items` 改为 `children`

- 侧边栏配置中的 `title` 改为 `text`, `path` 改为 `link`。

- V2 导航栏支持像侧边栏一样直接设置 Markdown 文件路径自动生成文字、图标与链接

这样他们的配置统一为 `text`, `icon`, `prefix`, `link`, `children`。

- 两者配置新增 `activeMatch` 控制激活情况

### 页面链接

- 移除 `prevLinks` 和 `nextLinks`

- `editLinks` 重命名为 `editLink`

- `updateTime` 重命名为 `lastUpdated`

### 外观

- `iconPrefix` 默认值由 `icon-` 清空。

  你现在需要根据使用图标的 Font Class 自行配置

  - 如果你使用 IconFont，你可能需要将其设置为 `iconfont icon-`
  - 如果你使用 FontAwesome，你可能需要将其设置为 `fa fa-`

- `darkmode` 新增 `"force-dark"`，强制暗黑模式

### 博客配置

- 博客配置现在支持在每个语言中单独配置

- 新增 `blog.description` 配置博主描述或座右铭

- `blog.links` 重命名为 `blog.medias`

- `blog.roundAvatar` 默认值由 `true` 改为 `false`

- `blog.perPage` 重命名为 `blog.articlePerPage`

- `blog.autoExcerpt` 移动至 `plugins.blog.autoExcerpt`，且默认值由 `true` 改为 `false`

### 加密配置

- `encrypt.status: "global" | "local"` (默认 `"local"`) 改为 `encrypt.global: boolean` (默认 `false`)

- `encrypt.global` 重命名为 `encrypt.admin`

### 自定义布局

- 移除 `custom`

### 页面布局

- `anchorDisplay` 重命名为 `toc`

### 阅读速度

- `wordPerMinute` 移至 `plugins.readingTime.wordPerMinute`

## 插件变更

### 改动

所有插件相关选项均被移至 `plugins` 下。

- `activeHeaderLinks` 移动至 `plugins.activeHeaderLinks`

- `comment` 移动至 `plugins.comment`

- `copyCode` 移动至 `plugins.copyCode`

- `feed` 移动至 `plugins.feed`

  主题不再默认输出三种格式的 Feed 文件，如果有需要，请自行配置插件请求需要格式。

- `mdEnhance` 移动至 `plugins.mdEnhance`

  - `plugins.mdEnhance.codegroup` 的主题默认值由 `true` 改为 `false`

  - `plugins.mdEnhance.lazyLoad` 默认值由 `true` 改为 `false`

  - 新增 `plugins.mdEnhance.vpre`

    VuePress2 不再内置下列语法。

    ```md
    ::: v-pre

    :::
    ```

  - 移除 `plugins.mdEnhance.lineNumbers`

    VuePress2 支持单独对代码块配置行号

  - 移除 `plugins.mdEnhance.imageFix`

    图片相关问题已在 V2 中得到修正

- `photoSwipe` 移动至 `plugins.photoSwipe`

- `pwa` 移动至 `plugins.pwa`

- `readingTime` 移动至 `plugins.readingTime`

- `seo` 移动至 `plugins.seo`

- `sitemap` 移动至 `plugins.sitemap`

### 新增

- 新增 `plugins.blog` 控制博客地址

### 移除

- 移除 `activeHash`

  主题现在使用 `@vuepress/plugin-active-header-links` 官方插件。

- 移除 `addThis`

  `vuepress-plugin-add-this` V2 迁移时已标为废弃，主题不再默认捆绑。

- 移除 `chunkRename`

  主题不再提供此功能。

- 移除 `cleanUrl`

  主题不再提供此功能。

- 移除 `copyright`

  相关插件暂未适配 V2。

- 移除 `git`

  主题现在使用 `@vuepress/plugin-git` 官方插件。

- 移除 `smoothScroll`

  主题现在通过 CSS 提供平滑滚动，不再对旧浏览器提供兼容。
