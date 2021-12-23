---
title: 导航栏
icon: navbar
category: layout
tags:
  - layout
  - navbar
---

导航栏可能包含你的站点名称、[搜索框](#搜索框)、 [导航栏链接](#导航栏链接)、[多语言切换](https://v1.vuepress.vuejs.org/zh/guide/i18n.html)、[仓库链接](#git-仓库和编辑链接)，它们均取决于你的配置。

<!-- more -->

## 导航栏链接

你可以通过 `themeConfig.nav` 增加一些导航栏链接。

基础的配置项有 `text` 导航栏文字，`link` 导航栏链接， `icon` 导航栏图标:

<CodeGroup>
<CodeGroupItem title="js">

```js
// .vuepress/config.js
const { config } = require("vuepress-theme-hope");

module.exports = config({
  themeConfig: {
    nav: [
      { text: "指南", link: "/zh/guide/", icon: "creative" },
      { text: "配置", link: "/zh/config/", icon: "config" },
      { text: "常见问题", link: "/zh/FAQ/", icon: "question" },
    ],
  },
});
```

</CodeGroupItem>

<CodeGroupItem title="ts">

```ts
// .vuepress/config.ts
import theme from "vuepress-theme-hope";

export default theme.config({
  themeConfig: {
    nav: [
      { text: "指南", link: "/zh/guide/", icon: "creative" },
      { text: "配置", link: "/zh/config/", icon: "config" },
      { text: "常见问题", link: "/zh/FAQ/", icon: "question" },
    ],
  },
});
```

</CodeGroupItem>
</CodeGroup>

当你提供了一个 `items` 数组而不是一个单一的 `link` 时，它将显示为下拉列表 :

<CodeGroup>
<CodeGroupItem title="js">

```js
// .vuepress/config.js
const { config } = require("vuepress-theme-hope");

module.exports = config({
  themeConfig: {
    nav: [
      {
        text: "基础",
        icon: "info",
        items: [
          { text: "Markdown", link: "/zh/basic/markdown/", icon: "markdown" },
          { text: "VuePress", link: "/zh/basic/vuepress/", icon: "vue" },
        ],
      },
    ],
  },
});
```

</CodeGroupItem>

<CodeGroupItem title="ts">

```ts
// .vuepress/config.ts
import theme from "vuepress-theme-hope";

export default theme.config({
  themeConfig: {
    nav: [
      {
        text: "基础",
        icon: "info",
        items: [
          { text: "Markdown", link: "/zh/basic/markdown/", icon: "markdown" },
          { text: "VuePress", link: "/zh/basic/vuepress/", icon: "vue" },
        ],
      },
    ],
  },
});
```

</CodeGroupItem>
</CodeGroup>

由于大多数情况下，导航栏的分组项目都属于同一类别，会放在同一个子目录下，它们具有相同的路径前缀。为了简化配置，你可以添加 `prefix` 字段为分组的每一个子链接添加一个前缀:

<CodeGroup>
<CodeGroupItem title="js">

```js
// .vuepress/config.js
const { config } = require("vuepress-theme-hope");

module.exports = config({
  themeConfig: {
    nav: [
      {
        text: "基础",
        icon: "info",
        prefix: "/basic/",
        items: [
          { text: "Markdown", link: "markdown", icon: "markdown" },
          { text: "VuePress", link: "vuepress/", icon: "vue" },
        ],
      },
    ],
  },
});
```

</CodeGroupItem>

<CodeGroupItem title="ts">

```ts
// .vuepress/config.ts
import theme from "vuepress-theme-hope";

export default theme.config({
  themeConfig: {
    nav: [
      {
        text: "基础",
        icon: "info",
        prefix: "/basic/",
        items: [
          { text: "Markdown", link: "markdown", icon: "markdown" },
          { text: "VuePress", link: "vuepress/", icon: "vue" },
        ],
      },
    ],
  },
});
```

</CodeGroupItem>
</CodeGroup>

此外，你还可以通过嵌套的 `items` 来在下拉列表中设置分组:

<CodeGroup>
<CodeGroupItem title="js">

```js
// .vuepress/config.js
const { config } = require("vuepress-theme-hope");

module.exports = config({
  themeConfig: {
    nav: [
      {
        text: "项目",
        icon: "info",
        items: [
          {
            text: "内置插件",
            icon: "plugin",
            items: [
              /* 一些子项目 */
            ],
          },
          {
            text: "引入插件",
            icon: "plugin",
            items: [
              /* 一些子项目 */
            ],
          },
        ],
      },
    ],
  },
});
```

</CodeGroupItem>

<CodeGroupItem title="ts">

```ts
// .vuepress/config.ts
import theme from "vuepress-theme-hope";

export default theme.config({
  themeConfig: {
    nav: [
      {
        text: "项目",
        icon: "info",
        items: [
          {
            text: "内置插件",
            icon: "plugin",
            items: [
              /* 一些子项目 */
            ],
          },
          {
            text: "引入插件",
            icon: "plugin",
            items: [
              /* 一些子项目 */
            ],
          },
        ],
      },
    ],
  },
});
```

</CodeGroupItem>
</CodeGroup>

::: details 例子

<CodeGroup>
<CodeGroupItem title="js">

```js
// .vuepress/config.js
const { config } = require("vuepress-theme-hope");

module.exports = config({
  themeConfig: {
    nav: [
      {
        text: "项目",
        icon: "info",
        items: [
          {
            text: "更新日志",
            link: "https://github.com/vuepress-theme-hope/vuepress-theme-hope/blob/v1/CHANGELOG.md",
          },
          {
            text: "项目地址",
            link: "https://github.com/vuepress-theme-hope/vuepress-theme-hope",
          },
          {
            text: "项目案例",
            link: "/zh/demo/",
          },
          {
            text: "插件",
            icon: "plugin",
            items: [
              {
                text: "AddThis 插件",
                link: "https://vuepress-theme-hope.github.io/add-this/zh/",
              },
              {
                text: "评论插件",
                link: "https://vuepress-theme-hope.github.io/comment/zh/",
              },
              {
                text: "代码复制插件",
                link: "https://vuepress-theme-hope.github.io/copy-code/zh/",
              },
              {
                text: "Feed 插件",
                link: "https://vuepress-theme-hope.github.io/feed/zh/",
              },
              {
                text: "Git 信息插件",
                link: "https://vuepress-theme-hope.github.io/git/zh/",
              },
              {
                text: "Markdown 增强插件",
                link: "https://vuepress-theme-hope.github.io/md-enhance/zh/",
              },
              {
                text: "图片预览插件",
                link: "https://vuepress-theme-hope.github.io/photo-swipe/zh/",
              },
              {
                text: "PWA 插件",
                link: "https://vuepress-theme-hope.github.io/pwa/zh/",
              },
              {
                text: "阅读时间插件",
                link: "https://vuepress-theme-hope.github.io/reading-time/zh/",
              },
              {
                text: "Seo 插件",
                link: "https://vuepress-theme-hope.github.io/seo/zh/",
              },
              {
                text: "Sitemap 插件",
                link: "https://vuepress-theme-hope.github.io/sitemap/zh/",
              },
            ],
          },
        ],
      },
    ],
  },
});
```

</CodeGroupItem>

<CodeGroupItem title="ts">

```ts
// .vuepress/config.ts
import theme from "vuepress-theme-hope";

export default theme.config({
  themeConfig: {
    nav: [
      {
        text: "项目",
        icon: "info",
        items: [
          {
            text: "更新日志",
            link: "https://github.com/vuepress-theme-hope/vuepress-theme-hope/blob/v1/CHANGELOG.md",
          },
          {
            text: "项目地址",
            link: "https://github.com/vuepress-theme-hope/vuepress-theme-hope",
          },
          {
            text: "项目案例",
            link: "/zh/demo/",
          },
          {
            text: "插件",
            icon: "plugin",
            items: [
              {
                text: "AddThis 插件",
                link: "https://vuepress-theme-hope.github.io/add-this/zh/",
              },
              {
                text: "评论插件",
                link: "https://vuepress-theme-hope.github.io/comment/zh/",
              },
              {
                text: "代码复制插件",
                link: "https://vuepress-theme-hope.github.io/copy-code/zh/",
              },
              {
                text: "Feed 插件",
                link: "https://vuepress-theme-hope.github.io/feed/zh/",
              },
              {
                text: "Git 信息插件",
                link: "https://vuepress-theme-hope.github.io/git/zh/",
              },
              {
                text: "Markdown 增强插件",
                link: "https://vuepress-theme-hope.github.io/md-enhance/zh/",
              },
              {
                text: "图片预览插件",
                link: "https://vuepress-theme-hope.github.io/photo-swipe/zh/",
              },
              {
                text: "PWA 插件",
                link: "https://vuepress-theme-hope.github.io/pwa/zh/",
              },
              {
                text: "阅读时间插件",
                link: "https://vuepress-theme-hope.github.io/reading-time/zh/",
              },
              {
                text: "Seo 插件",
                link: "https://vuepress-theme-hope.github.io/seo/zh/",
              },
              {
                text: "Sitemap 插件",
                link: "https://vuepress-theme-hope.github.io/sitemap/zh/",
              },
            ],
          },
        ],
      },
    ],
  },
});
```

</CodeGroupItem>
</CodeGroup>

:::

### 禁用导航栏

你可以使用 `themeConfig.navbar` 来禁用所有页面的导航栏:
o disable the navbar globally, use `themeConfig.navbar`:

<CodeGroup>
<CodeGroupItem title="js">

```js
// .vuepress/config.js
const { config } = require("vuepress-theme-hope");

module.exports = config({
  themeConfig: {
    navbar: false,
  },
});
```

</CodeGroupItem>

<CodeGroupItem title="ts">

```ts
// .vuepress/config.ts
import theme from "vuepress-theme-hope";

export default theme.config({
  themeConfig: {
    navbar: false,
  },
});
```

</CodeGroupItem>
</CodeGroup>

你也可以通过 `YAML front matter` 来禁用某个指定页面的导航栏:

```md
---
navbar: false
---
```

### 导航栏图标

你可以使用 `themeConfig.logo` 来配置导航栏的图标，请填入绝对路径。

当配置图标之后，在移动视图上，图标将取代先前的站点名称显示在导航栏上。

<CodeGroup>
<CodeGroupItem title="js">

```js
// .vuepress/config.js
const { config } = require("vuepress-theme-hope");

module.exports = config({
  themeConfig: {
    logo: "/logo.png",
  },
});
```

</CodeGroupItem>

<CodeGroupItem title="ts">

```ts
// .vuepress/config.ts
import theme from "vuepress-theme-hope";

export default theme.config({
  themeConfig: {
    logo: "/logo.png",
  },
});
```

</CodeGroupItem>
</CodeGroup>

::: tip

你可以设置 `themeConfig.darkLogo` 以在暗黑模式下显示另一个 Logo。

:::

## 搜索框

### 内置搜索

你可以通过设置 `themeConfig.search: false` 来禁用默认的搜索框，或是通过 `themeConfig.searchMaxSuggestions` 来调整默认搜索框显示的搜索结果数量:

<CodeGroup>
<CodeGroupItem title="js">

```js
// .vuepress/config.js
const { config } = require("vuepress-theme-hope");

module.exports = config({
  themeConfig: {
    search: false,
    searchMaxSuggestions: 10,
  },
});
```

</CodeGroupItem>

<CodeGroupItem title="ts">

```ts
// .vuepress/config.ts
import theme from "vuepress-theme-hope";

export default theme.config({
  themeConfig: {
    comment: {
      search: false,
      searchMaxSuggestions: 10,
    },
  },
});
```

</CodeGroupItem>
</CodeGroup>

你可以通过 `YAML front matter` 来对单独的页面禁用内置的搜索框:

```md
---
search: false
---
```

::: tip

内置搜索只会为页面的标题、`h2` 和 `h3` 构建搜索索引，如果你需要全文搜索，你可以使用 [Algolia 搜索](#Algolia-搜索)。

:::

### Algolia 搜索

你可以通过 `themeConfig.algolia` 选项来用 [Algolia 搜索](https://community.algolia.com/docsearch/) 替换内置的搜索框。要启用 Algolia 搜索，你需要至少提供 `apiKey` 和 `indexName`:

<CodeGroup>
<CodeGroupItem title="js">

```js
// .vuepress/config.js
const { config } = require("vuepress-theme-hope");

module.exports = config({
  themeConfig: {
    algolia: {
      apiKey: "<API_KEY>",
      indexName: "<INDEX_NAME>",
    },
  },
});
```

</CodeGroupItem>

<CodeGroupItem title="ts">

```ts
// .vuepress/config.ts
import theme from "vuepress-theme-hope";

export default theme.config({
  themeConfig: {
    algolia: {
      apiKey: "<API_KEY>",
      indexName: "<INDEX_NAME>",
    },
  },
});
```

</CodeGroupItem>
</CodeGroup>

::: warning 注意

不同于开箱即用的 [内置搜索](#内置搜索)，[Algolia 搜索](https://community.algolia.com/docsearch/) 需要你在使用之前将你的网站提交给它们用于创建索引。

:::

更多选项请参考 [Algolia DocSearch 的文档](https://github.com/algolia/docsearch#docsearch-options)。

### 搜索占位符

<CodeGroup>
<CodeGroupItem title="js">

```js
// .vuepress/config.js
const { config } = require("vuepress-theme-hope");

module.exports = config({
  themeConfig: {
    searchPlaceholder: "搜索...",
  },
});
```

</CodeGroupItem>

<CodeGroupItem title="ts">

```ts
// .vuepress/config.ts
import theme from "vuepress-theme-hope";

export default theme.config({
  themeConfig: {
    searchPlaceholder: "搜索...",
  },
});
```

</CodeGroupItem>
</CodeGroup>

## Git 仓库和编辑链接

当你提供了 `themeConfig.repo` 选项，将会自动在每个页面的导航栏生成生成一个 GitHub 链接，以及在页面的底部生成一个 `"Edit this page"` 链接。

<CodeGroup>
<CodeGroupItem title="js">

```js
// .vuepress/config.js
const { config } = require("vuepress-theme-hope");

module.exports = config({
  themeConfig: {
    // 假定是 GitHub. 同时也可以是一个完整的 GitLab URL
    repo: "vuejs/vuepress",
    // 自定义仓库链接文字。默认从 `themeConfig.repo` 中自动推断为
    // "GitHub"/"GitLab"/"Bitbucket" 其中之一，或是 "Source"。
    repoLabel: "查看源码",
    // 是否在导航栏右侧显示仓库链接，默认为 `true`
    repoDisplay: true,

    // 以下为可选的编辑链接选项

    // 假如你的文档仓库和项目本身不在一个仓库:
    docsRepo: "vuejs/vuepress",
    // 假如文档不是放在仓库的根目录下:
    docsDir: "docs",
    // 假如文档放在一个特定的分支下，默认为 'main':
    docsBranch: "main",
    // 默认是 false, 设置为 true 来启用
    editLinks: true,
    // 默认为 "Edit this page"
    editLinkText: "帮助我们改善此页面！",
  },
});
```

</CodeGroupItem>

<CodeGroupItem title="ts">

```ts
// .vuepress/config.ts
import theme from "vuepress-theme-hope";

export default theme.config({
  themeConfig: {
    // 假定是 GitHub. 同时也可以是一个完整的 GitLab URL
    repo: "vuejs/vuepress",
    // 自定义仓库链接文字。默认从 `themeConfig.repo` 中自动推断为
    // "GitHub"/"GitLab"/"Bitbucket" 其中之一，或是 "Source"。
    repoLabel: "查看源码",
    // 是否在导航栏右侧显示仓库链接，默认为 `true`
    repoDisplay: true,

    // 以下为可选的编辑链接选项

    // 假如你的文档仓库和项目本身不在一个仓库:
    docsRepo: "vuejs/vuepress",
    // 假如文档不是放在仓库的根目录下:
    docsDir: "docs",
    // 假如文档放在一个特定的分支下，默认为 'main':
    docsBranch: "main",
    // 默认是 false, 设置为 true 来启用
    editLinks: true,
    // 默认为 "Edit this page"
    editLinkText: "帮助我们改善此页面！",
  },
});
```

</CodeGroupItem>
</CodeGroup>

你可以通过 `YAML front matter` 来禁用指定页面的编辑链接:

```md
---
editLink: false
---
```

## 主题色切换按钮

具体详情请见 [主题色](../interface/theme-color.md) 章节。

## 深色模式切换按钮

具体详情请见 [深色模式](../interface/darkmode.md) 章节。

## 全屏按钮

具体详情请见 [全屏按钮](../interface/others.md#全屏按钮) 章节。

## `navbarConfig`

我们提供了一个 `navbarConfig` Helper 函数。你可以从 `vuepress-theme-hope` 中将其引入，并包裹你的导航栏配置来让编辑器提供自动补全并帮助你校验导航栏配置是否正确。

<CodeGroup>
<CodeGroupItem title="js">

```js
// .vuepress/navbar.js
const { navbarConfig } = require("vuepress-theme-hope");

module.exports = navbarConfig(/* 你的导航栏配置 */);
```

</CodeGroupItem>

<CodeGroupItem title="ts">

```ts
// .vuepress/navbar.ts
import theme from "vuepress-theme-hope";

export default theme.navbarConfig(/* 你的导航栏配置 */);
```

</CodeGroupItem>
</CodeGroup>

::: tip

当你将 VuePress 配置拆分成多个部分时，你可以使用该 Helper 函数来保持自动补全与校验。

:::

## 案例

::: details 本文档的导航栏配置

<CodeGroup>
<CodeGroupItem title="js">

```js
// .vuepress/config.js
const { config } = require("vuepress-theme-hope");

module.exports = config({
  themeConfig: {
    nav: [
      { text: "指南", link: "/zh/guide/", icon: "creative" },
      { text: "配置", link: "/zh/config/", icon: "config" },
      { text: "常见问题", link: "/zh/FAQ/", icon: "question" },
      {
        text: "基础",
        icon: "info",
        prefix: "/zh/basic/",
        items: [
          { text: "Markdown", link: "markdown/", icon: "markdown" },
          { text: "VuePress", link: "vuepress/", icon: "vue" },
        ],
      },
      {
        text: "项目",
        icon: "info",
        items: [
          {
            text: "更新日志",
            link: "https://github.com/vuepress-theme-hope/vuepress-theme-hope/blob/v1/CHANGELOG.md",
          },
          {
            text: "项目地址",
            link: "https://github.com/vuepress-theme-hope/vuepress-theme-hope",
          },
          {
            text: "项目案例",
            link: "/zh/demo/",
          },
          {
            text: "插件",
            icon: "plugin",
            items: [
              {
                text: "AddThis 插件",
                link: "https://vuepress-theme-hope.github.io/add-this/zh/",
              },
              {
                text: "评论插件",
                link: "https://vuepress-theme-hope.github.io/comment/zh/",
              },
              {
                text: "代码复制插件",
                link: "https://vuepress-theme-hope.github.io/copy-code/zh/",
              },
              {
                text: "Feed 插件",
                link: "https://vuepress-theme-hope.github.io/feed/zh/",
              },
              {
                text: "Git 信息插件",
                link: "https://vuepress-theme-hope.github.io/git/zh/",
              },
              {
                text: "Markdown 增强插件",
                link: "https://vuepress-theme-hope.github.io/md-enhance/zh/",
              },
              {
                text: "图片预览插件",
                link: "https://vuepress-theme-hope.github.io/photo-swipe/zh/",
              },
              {
                text: "PWA 插件",
                link: "https://vuepress-theme-hope.github.io/pwa/zh/",
              },
              {
                text: "阅读时间插件",
                link: "https://vuepress-theme-hope.github.io/reading-time/zh/",
              },
              {
                text: "Seo 插件",
                link: "https://vuepress-theme-hope.github.io/seo/zh/",
              },
              {
                text: "Sitemap 插件",
                link: "https://vuepress-theme-hope.github.io/sitemap/zh/",
              },
            ],
          },
        ],
      },
    ],
  },
});
```

</CodeGroupItem>

<CodeGroupItem title="ts">

```ts
// .vuepress/config.ts
import theme from "vuepress-theme-hope";

export default theme.config({
  themeConfig: {
    nav: [
      { text: "指南", link: "/zh/guide/", icon: "creative" },
      { text: "配置", link: "/zh/config/", icon: "config" },
      { text: "常见问题", link: "/zh/FAQ/", icon: "question" },
      {
        text: "基础",
        icon: "info",
        prefix: "/zh/basic/",
        items: [
          { text: "Markdown", link: "markdown/", icon: "markdown" },
          { text: "VuePress", link: "vuepress/", icon: "vue" },
        ],
      },
      {
        text: "项目",
        icon: "info",
        items: [
          {
            text: "更新日志",
            link: "https://github.com/vuepress-theme-hope/vuepress-theme-hope/blob/v1/CHANGELOG.md",
          },
          {
            text: "项目地址",
            link: "https://github.com/vuepress-theme-hope/vuepress-theme-hope",
          },
          {
            text: "项目案例",
            link: "/zh/demo/",
          },
          {
            text: "插件",
            icon: "plugin",
            items: [
              {
                text: "AddThis 插件",
                link: "https://vuepress-theme-hope.github.io/add-this/zh/",
              },
              {
                text: "评论插件",
                link: "https://vuepress-theme-hope.github.io/comment/zh/",
              },
              {
                text: "代码复制插件",
                link: "https://vuepress-theme-hope.github.io/copy-code/zh/",
              },
              {
                text: "Feed 插件",
                link: "https://vuepress-theme-hope.github.io/feed/zh/",
              },
              {
                text: "Git 信息插件",
                link: "https://vuepress-theme-hope.github.io/git/zh/",
              },
              {
                text: "Markdown 增强插件",
                link: "https://vuepress-theme-hope.github.io/md-enhance/zh/",
              },
              {
                text: "图片预览插件",
                link: "https://vuepress-theme-hope.github.io/photo-swipe/zh/",
              },
              {
                text: "PWA 插件",
                link: "https://vuepress-theme-hope.github.io/pwa/zh/",
              },
              {
                text: "阅读时间插件",
                link: "https://vuepress-theme-hope.github.io/reading-time/zh/",
              },
              {
                text: "Seo 插件",
                link: "https://vuepress-theme-hope.github.io/seo/zh/",
              },
              {
                text: "Sitemap 插件",
                link: "https://vuepress-theme-hope.github.io/sitemap/zh/",
              },
            ],
          },
        ],
      },
    ],
  },
});
```

</CodeGroupItem>
</CodeGroup>

:::
