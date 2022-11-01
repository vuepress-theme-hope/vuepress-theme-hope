---
title: 配置迁移指南
icon: config
category:
  - 迁移
tag:
  - 迁移
  - 主题配置
---

::: code-tabs#language

@tab TS

```diff
  // .vuepress/config.ts
- import theme from "vuepress-theme-hope";
+ import { defineUserConfig } from "vuepress";
+ import { hopeTheme } from "vuepress-theme-hope";

- export default theme.config({
+ export default defineUserConfig({
    // your site config here
    // ...

-   themeConfig:{
+   theme: hopeTheme({
      // your theme config here
      // ...
-   },
+   }),
  });
```

@tab JS

```diff
// .vuepress/config.js
- const { config } = require("vuepress-theme-hope");
+ import { hopeTheme } from "vuepress-theme-hope";

- module.exports = theme.config({
+ export default {
    // your site config here
    // ...

-   themeConfig:{
+   theme: hopeTheme({
      // your theme config here
      // ...
-   },
+   }),
- });
+ };
```

:::

## 主题使用

- 移除 `config`
- `themeConfig` 重命名为 `hopeTheme`
- `navbarConfig` 重命名为 `navbar`
- `sidebarConfig` 重命名为 `sidebar`
- 新增 `arraySidebar`, `objectSidebar`

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

- 新增 `navbarIcon` 选项控制导航栏图标

- 新增 `navbarLayout` 选项控制导航栏布局

由于主题不再内置搜索:

- 移除 `search`, `searchPlaceholder`, `searchMaxSuggestions`

- 移除 `algolia`, `algoliaType`

### 侧边栏

- `sidebarDepth` 重命名为 `headerDepth`

- 移除 `displayAllHeaders`

### 导航栏侧边栏配置统一

- 导航栏配置中的 `items` 改为 `children`

- 侧边栏配置中的 `title` 改为 `text`, `path` 改为 `link`。

- V2 导航栏支持像侧边栏一样直接设置 Markdown 文件路径自动生成文字、图标与链接

这样他们的配置统一为 `text`, `icon`, `prefix`, `link`, `children`。

- 两者配置新增 `activeMatch` 控制激活情况

### 页面链接

- `prevLinks` 重命名为 `prevLink`

- `nextLinks` 重命名为 `nextLink`

- `editLinks` 重命名为 `editLink`

- `updateTime` 重命名为 `lastUpdated`

### 外观

- 新增 `iconAssets` 选项

- `iconPrefix` 默认值从 `iconAssets` 推断

- 更新 `darkmode` 选项的值

  - 添加 `"enable"`
  - 将 `"switch"` 重命名为 `"toggle"`
  - 将 `"auto-switch"` 重命名为 `"switch"`

- 默认禁用 `themeColor` 与 `fullscreen`

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

### 新增

- 新增 `plugins.blog` 控制博客地址
- 新增 `plugins.nprogress` 控制加载进度条
- 新增 `plugins.prismjs` 控制是否启用 Prism.js 高亮代码块

### 改动

所有插件相关选项均被移至 `plugins` 下。

- `activeHash` 移动至 `plugins.activeHeaderLinks`

  主题现在使用 `@vuepress/plugin-active-header-links` 官方插件。 ![警告](https://img.shields.io/badge/-warning-yellow)

- `comment` 移动至 `plugins.comment`

  - 添加 `twikoo` 和 `giscus` 评论服务的支持 ![新增](https://img.shields.io/badge/-New-brightgreen)

  - Vssue 目前缺失 ![警告](https://img.shields.io/badge/-warning-yellow)

    Vssue 是用 Vue2 编写的，作者 [meteorlxy](https://github.com/meteorlxy) 尚未使其与 Vue3 兼容

  - Valine 服务被移除 ![移除](https://img.shields.io/badge/-removed-red)

    Valine 缺乏维护，并且它可能会泄露你的隐私。你应该改用 [Waline](https://waline.js.org)。

- `copyCode` 移动至 `plugins.copyCode`

- `copyright` 移动至 `plugins.copyright`

  插件默认禁用 ![警告](https://img.shields.io/badge/-warning-yellow)

- `feed` 移动至 `plugins.feed`

  - 支持通过 `plugins.feed.customElements` 选项移除自定义组件和元素 ![新增](https://img.shields.io/badge/-新增-brightgreen)

  - 通过 `plugins.feed.getter` 选项完全自定义 Feed 生成 ![新增](https://img.shields.io/badge/-新增-brightgreen)

  - 多分类支持 ![新增](https://img.shields.io/badge/-新增-brightgreen)

  - 所有的输出选项从插件选项中的 `output` 选项移出到根选项下，并进行了重命名。

    - `feed.output.atom.enable` 重命名为 `plugins.feed.atom` ![警告](https://img.shields.io/badge/-warning-yellow)

    - `feed.output.json.enable` 重命名为 `plugins.feed.json` ![警告](https://img.shields.io/badge/-warning-yellow)

    - `feed.output.rss.enable` 重命名为 `plugins.feed.rss` ![警告](https://img.shields.io/badge/-warning-yellow)

    - `feed.output.atom.path` 重命名为 `plugins.feed.atomOutputFilename` ![警告](https://img.shields.io/badge/-warning-yellow)

    - `feed.output.json.path` 重命名为 `plugins.feed.jsonOutputFilename` ![警告](https://img.shields.io/badge/-warning-yellow)

    - `feed.output.rss.path` 重命名为 `plugins.feed.rssOutputFilename` ![警告](https://img.shields.io/badge/-warning-yellow)

  - `plugins.feed.atom`, `plugins.feed.json` 和 `plugins.feed.rss` 现在默认为 `false` ![警告](https://img.shields.io/badge/-warning-yellow)

    主题不再默认输出三种格式的 Feed 文件，你需要手动启用以输出需要的格式。

- `git` 移动至 `plugins.git`

  主题现在使用官方插件 `@vuepress/plugin-git`，所以支持选项有变化。 ![警告](https://img.shields.io/badge/-warning-yellow)

- `mdEnhance` 移动至 `plugins.mdEnhance`

  - Markdown 链接检查 ![新增](https://img.shields.io/badge/-新增-brightgreen)

    该插件现在检查你的 Markdown 链接，并在检测到损坏的链接时警告你。

    你可以通过 `plugins.mdEnhance.linkCheck` 选项控制此行为

  - 图像标记支持 ![新增](https://img.shields.io/badge/-新增-brightgreen)

    通过 `plugins.mdEnhance.imageMark` 使用 `#light` 和 `#dark` 后缀标记图像以在日间模式或夜间模式下显示它们。

  - Chart.js 支持 ![新增](https://img.shields.io/badge/-新增-brightgreen)

    新增 `plugins.mdEnhance.chart` 选项提供 [chart.js](https://www.chartjs.org/docs/latest/) 支持

    ````md
    ::: chart 标题

    ```json
    {
      // chart.js 配置
    }
    ```

    :::

    ::: chart 标题

    ```js
    module.exports = {
      // chart.js 配置
    };
    ```

    :::
    ````

  - ECharts 支持 ![新增](https://img.shields.io/badge/-新增-brightgreen)

    新增 `plugins.mdEnhance.echarts` 选项提供 [ECharts](https://echarts.apache.org/en/index.html) 支持。

    ````md
    ::: echarts 标题

    ```json
    {
      // echarts 配置
    }
    ```

    :::

    ::: echarts 标题

    ```js
    module.exports = {
      // echarts 配置
    };
    ```

    :::
    ````

  - 包含文件支持 ![新增](https://img.shields.io/badge/-新增-brightgreen)

    新增 `plugins.mdEnhance.include` 选项使用 `@include()` 将其他文件内容导入到 Markdown 中。

    使用 `@include(filename)` 导入文件。

    如果要部分导入文件，你可以指定导入的行数

    - `@include(filename{start-end})`
    - `@include(filename{start-})`
    - `@include(filename{-end})`

  - 选项卡支持 ![新增](https://img.shields.io/badge/-新增-brightgreen)

    新增 `plugins.mdEnhance.tabs` 选项通过 `tabs` 容器创建选项卡。

  - `plugins.mdEnhance.gfm` ![新增](https://img.shields.io/badge/-新增-brightgreen)

    一键支持 GFM

  - `plugins.mdEnhance.vPre` ![新增](https://img.shields.io/badge/-新增-brightgreen)

    VuePress 2 从 `@vuepress/core` 中删除了以下容器支持，因此添加了此选项

    ```md
    ::: v-pre

    一些 {{vue 语法}}。

    :::
    ```

  - `mdEnhance.codegroup` 重命名为 `plugins.mdEnhance.codetabs` ![警告](https://img.shields.io/badge/-warning-yellow)

  - `plugins.mdEnhance.lazyLoad` 改为 `plugins.mdEnhance.imageLazyload`，默认值由 `true` 改为 `false` ![警告](https://img.shields.io/badge/-warning-yellow)

  - 移除 `plugins.mdEnhance.enableAll` ![移除](https://img.shields.io/badge/-removed-red)

    有太多不知道自己在做什么的菜鸟用户，他们只是启用此选项而没有使用提供的所有功能，但他们抱怨加载速度。

  - 移除 `plugins.mdEnhance.lineNumbers` ![移除](https://img.shields.io/badge/-removed-red)

    VuePress2 支持单独对代码块配置行号

  - 移除 `plugins.mdEnhance.imageFix` ![移除](https://img.shields.io/badge/-removed-red)

    图片相关问题已在 V2 中得到修正

- `photoSwipe` 移动至 `plugins.photoSwipe`

- `pwa` 移动至 `plugins.pwa`

  - `plugins.pwa.update` ![新增](https://img.shields.io/badge/-新增-brightgreen): 控制 SW 的更新逻辑

    - `"disabled"`: 即使有新的 service worker 也不做任何事情，新的 service work 开始等待后，会在用户下次访问时接管页面，让用户获得新内容。

    - `"available"`: 仅当新的 service worker 可用时才显示更新弹出窗口

    - `"hint"`: 显示更新内容可用提示，并允许用户立即刷新。当新的 SW 成功注册后，将转为更新内容就绪弹窗。

      当你希望用户立即查看新文档时，这很有帮助。

    - `"force"`: 立即注销当前 Service Worker 然后刷新以获取新内容

  - `plugins.pwa.appendBase` ![新增](https://img.shields.io/badge/-新增-brightgreen): 自动向 `manifest` 选项插入 `base`

  - `plugins.pwa.hintComponent` ![新增](https://img.shields.io/badge/-新增-brightgreen): 检测到新内容的提示组件

  - shouldPrefetch 提示 ![新增](https://img.shields.io/badge/-新增-brightgreen): 现在插件将检查配置文件中的 `shouldPrefetch` 选项并警告你禁用它。

  - `plugins.pwa.cacheHTML` 默认值由 `true` 改为 `false` ![警告](https://img.shields.io/badge/-warning-yellow)

    这能有效降低 SW 更新时间

  - `pwa.popupComponent` 重命名为 `plugins.pwa.updateComponent` ![警告](https://img.shields.io/badge/-warning-yellow)

    这是因为我们新增了一个提示弹窗，所以需要避免名称混淆

- `readingTime` 移动至 `plugins.readingTime`

- `seo` 移动至 `plugins.seo`

  - JSON-LD 支持 ![新增](https://img.shields.io/badge/-新增-brightgreen)

    该插件现在可以为你生成 JSON-LD 脚本标签，并提供一个选项 `plugins.seo.jsonLd` 让你自定义 JSON-LD 属性。

  - 自动描述生成 ![新增](https://img.shields.io/badge/-新增-brightgreen)

    该插件可以通过 `plugins.seo.autoDescription` 选项自动为你生成描述

  - 规范链接 ![新增](https://img.shields.io/badge/-新增-brightgreen)

    你可以通过 `plugins.seo.canonicalLink` 选项设置规范链接。当你的文档部署在多个地方时，它很有用。

  - `seo.customMeta` 重命名为 `plugins.seo.customHead` ![警告](https://img.shields.io/badge/-warning-yellow)

    现在你可以编辑所有 `<head>` 标签，而不是仅 `<meta>` 标签。

- `sitemap` 移动至 `plugins.sitemap`

  - `plugins.sitemap.priority` ![新增](https://img.shields.io/badge/-新增-brightgreen): 设置优先级的默认值

  - `sitemap.urls` 重命名为 `plugins.sitemap.extraUrls` ![警告](https://img.shields.io/badge/-warning-yellow)

  - `sitemap.exclude` 重命名为 `plugins.sitemap.excludeUrls` ![警告](https://img.shields.io/badge/-warning-yellow)

  - `sitemap.outFile` 重命名为 `plugins.sitemap.sitemapFilename` ![警告](https://img.shields.io/badge/-warning-yellow)

  - `sitemap.modifyTimeGetter` 重命名为 `plugins.sitemap.modifyTimeGetter` ![警告](https://img.shields.io/badge/-warning-yellow)

### 移除

- 移除 `chunkRename`

  主题不再提供此功能。

- 移除 `cleanUrl`

  主题不再提供此功能。

- 移除 `smoothScroll`

  主题现在通过 CSS 提供平滑滚动，不再对旧浏览器提供兼容。
