---
title: 导航栏
icon: navbar
category:
  - 布局
tag:
  - 布局
  - 导航栏
---

导航栏可能包含你的站点名称、[搜索框](#搜索框)、 [导航栏链接](#导航栏链接)、[多语言支持](https://v2.vuepress.vuejs.org/zh/guide/i18n.html)、[仓库链接](#git-仓库和编辑链接) 和 [外观弹窗](#外观弹窗)。它们均取决于你的配置。

<!-- more -->

## 导航栏链接

你可以通过 `themeConfig.navbar` 配置导航栏链接，它接受一个数组。

### 字符串格式

配置导航栏最简单的方式，是依次填入需要展示的页面文件的路径，这样导航栏的文字、图标和链接会自动通过对应文件生成。

:::: code-group

::: code-group-item TS

```ts
// .vuepress/config.ts
import { defineHopeConfig } from "vuepress-theme-hope";

export default defineHopeConfig({
  themeConfig: {
    navbar: ["/zh/guide/README.md", "/zh/config/README.md", "/zh/faq.md"],
  },
});
```

:::

::: code-group-item JS

```js
// .vuepress/config.js
const { defineHopeConfig } = require("vuepress-theme-hope");

module.exports = defineHopeConfig({
  themeConfig: {
    navbar: ["/zh/guide/README.md", "/zh/config/README.md", "/zh/faq.md"],
  },
});
```

:::

::::

::: tip

你可以省略 `.md` 扩展名，以 `/` 结尾的路径会被推断为 `/README.md`。

:::

### 对象格式

如果你对页面的图标不满意或者觉得页面标题太长，你可以改为配置一个对象。可用的配置项有:

- `text:`: 项目文字
- `link`: 项目链接
- `icon`: 项目图标 (可选)
- `activeMatch`: 项目激活匹配 (可选)，支持正则字符串。

:::: code-group

::: code-group-item TS

```ts
// .vuepress/config.ts
import { defineHopeConfig } from "vuepress-theme-hope";

export default defineHopeConfig({
  themeConfig: {
    navbar: [
      {
        text: "指南",
        link: "/zh/guide/README.md",
        icon: "creative",
        // 仅在 `/zh/guide/` 激活
        activeMatch: "^/zh/guide/$",
      },
      { text: "配置", link: "/zh/config/README.md", icon: "config" },
      {
        text: "常见问题",
        link: "/zh/faq.md",
        icon: "question",
        // 会在 `/zh/faq` 开头的路径激活
        // 所以当你前往 `/zh/faq/xxx.html` 时也会激活
        activeMatch: "^/zh/faq",
      },
    ],
  },
});
```

:::

::: code-group-item JS

```js
// .vuepress/config.js
const { defineHopeConfig } = require("vuepress-theme-hope");

module.exports = defineHopeConfig({
  themeConfig: {
    navbar: [
      {
        text: "指南",
        link: "/zh/guide/README.md",
        icon: "creative",
        // 仅在 `/zh/guide/` 激活
        activeMatch: "^/zh/guide/$",
      },
      { text: "配置", link: "/zh/config/README.md", icon: "config" },
      {
        text: "常见问题",
        link: "/zh/faq.md",
        icon: "question",
        // 会在 `/zh/faq` 开头的路径激活
        // 所以当你前往 `/zh/faq/xxx.html` 时也会激活
        activeMatch: "^/zh/faq",
      },
    ],
  },
});
```

:::

::::

::: tip activeMatch 的高级用法

`activeMatch` 主要给予你控制路径是否激活的能力，比如你可能有如下链接:

- `/path/`
- `/path/a/`
- `/path/b/`

此时你可能想避免在 `/path/a/` 以及 `/path/b/` 开头的路径下，出现两个菜单同时激活的情况。将第一项的 `activeMatch` 选项设置为 `^/path/(?:(?!a/|b/).*)?$` 就可以有效避免。

:::

### 下拉列表

如果你需要展示较多的链接，你可以将同类链接整理成下拉列表。

你需要设置对象式导航栏配置项，并提供额外的 `children` 选项设置链接列表:

:::: code-group

::: code-group-item TS

```ts
// .vuepress/config.ts
import { defineHopeConfig } from "vuepress-theme-hope";

export default defineHopeConfig({
  themeConfig: {
    navbar: [
      {
        text: "基础",
        icon: "info",
        children: ["/zh/basic/markdown.md", "/zh/basic/vuepress.md"],
      },
    ],
  },
});
```

:::

::: code-group-item JS

```js
// .vuepress/config.js
const { defineHopeConfig } = require("vuepress-theme-hope");

module.exports = defineHopeConfig({
  themeConfig: {
    navbar: [
      {
        text: "基础",
        icon: "info",
        children: ["/zh/basic/markdown.md", "/zh/basic/vuepress.md"],
      },
    ],
  },
});
```

:::

::::

由于大多数情况下，导航栏的分组项目都属于同一类别，会放在同一个子目录下，它们具有相同的路径前缀。

为了简化配置，你可以添加 `prefix` 字段为分组的每一个子链接添加一个前缀:

:::: code-group

::: code-group-item TS

```ts
// .vuepress/config.ts
import { defineHopeConfig } from "vuepress-theme-hope";

export default defineHopeConfig({
  themeConfig: {
    navbar: [
      {
        text: "基础",
        icon: "info",
        prefix: "/zh/basic/",
        children: ["markdown.md", "vuepress.md"],
      },
    ],
  },
});
```

:::

::: code-group-item JS

```js
// .vuepress/config.js
const { defineHopeConfig } = require("vuepress-theme-hope");

module.exports = defineHopeConfig({
  themeConfig: {
    navbar: [
      {
        text: "基础",
        icon: "info",
        prefix: "/zh/basic/",
        children: ["markdown.md", "vuepress.md"],
      },
    ],
  },
});
```

:::

::::

此外，你还可以通过嵌套的 `children` 来在下拉列表中设置分组:

:::: code-group

::: code-group-item TS

```ts
// .vuepress/config.ts
import { defineHopeConfig } from "vuepress-theme-hope";

export default defineHopeConfig({
  themeConfig: {
    navbar: [
      {
        text: "插件列表",
        icon: "plugin",
        children: [
          {
            text: "内置插件",
            children: [
              /* 一些子项目 */
            ],
          },
          {
            text: "外部插件",
            children: [
              /* 一些子项目 */
            ],
          },
        ],
      },
    ],
  },
});
```

:::

::: code-group-item JS

```js
// .vuepress/config.js
const { defineHopeConfig } = require("vuepress-theme-hope");

module.exports = defineHopeConfig({
  themeConfig: {
    navbar: [
      {
        text: "插件列表",
        icon: "plugin",
        children: [
          {
            text: "内置插件",
            children: [
              /* 一些子项目 */
            ],
          },
          {
            text: "外部插件",
            children: [
              /* 一些子项目 */
            ],
          },
        ],
      },
    ],
  },
});
```

:::

::::

## 禁用导航栏

你可以设置 `navbar: false` 来禁用所有页面的导航栏:

:::: code-group

::: code-group-item TS

```ts
// .vuepress/config.ts
import { defineHopeConfig } from "vuepress-theme-hope";

export default defineHopeConfig({
  themeConfig: {
    navbar: false,
  },
});
```

:::

::: code-group-item JS

```js
// .vuepress/config.js
const { defineHopeConfig } = require("vuepress-theme-hope");

module.exports = defineHopeConfig({
  themeConfig: {
    navbar: false,
  },
});
```

:::

::::

你也可以通过 `YAML front matter` 来禁用某个指定页面的导航栏:

```md
---
navbar: false
---
```

## 网站图标

你可以使用 `themeConfig.logo` 来配置站点的图标，请填入绝对路径。

::: note 笔记

请填写绝对路径并将 logo 放在 `.vuepress/public` 文件夹中。

:::

配置图标后，图标将移动设备上取代先前的站点名称显示在导航栏上。

:::: code-group

::: code-group-item TS

```ts
// .vuepress/config.ts
import { defineHopeConfig } from "vuepress-theme-hope";

export default defineHopeConfig({
  themeConfig: {
    logo: "/logo.png",
  },
});
```

:::

::: code-group-item JS

```js
// .vuepress/config.js
const { defineHopeConfig } = require("vuepress-theme-hope");

module.exports = defineHopeConfig({
  themeConfig: {
    logo: "/logo.png",
  },
});
```

:::

::::

::: tip

你可以设置 `themeConfig.logoDark` 以在深色模式下显示另一个 Logo。

:::

## 多语言

主题的导航栏支持 [多语言](https://v2.vuepress.vuejs.org/zh/guide/i18n.html)，所以你可以为每个语言单独设置上面提到的导航栏选项:

:::: code-group

::: code-group-item TS

```ts
// .vuepress/config.ts
import { defineHopeConfig } from "vuepress-theme-hope";

export default defineHopeConfig({
  themeConfig: {
    locales: {
      "/": {
        logo: "/logo.svg",
        navbar: [
          /* 根目录下的英文配置 */
        ],
      },
      "/zh/": {
        logo: "/zh-logo.svg",
        navbar: [
          /* 中文目录下的中文配置 */
        ],
      },
    },
  },
});
```

:::

::: code-group-item JS

```js
// .vuepress/config.js
const { defineHopeConfig } = require("vuepress-theme-hope");

module.exports = defineHopeConfig({
  themeConfig: {
    locales: {
      "/": {
        logo: "/logo.svg",
        navbar: [
          /* 根目录下的英文配置 */
        ],
      },
      "/zh/": {
        logo: "/zh-logo.svg",
        navbar: [
          /* 中文目录下的中文配置 */
        ],
      },
    },
  },
});
```

:::

::::

## 搜索框

`vuepress-theme-hope` 同默认主题一样，带来了搜索插件的内置支持。你可以根据自己的需要来自行启用下列的插件。导航栏会自动出现对应的搜索框。

### 本地搜索

你可以通过 `@vuepress/plugin-search` 插件来实现本地搜索。你需要手动安装它，并通过 `themeConfig.plugins.search` 传递插件选项。(你也可以自行调用)

::: info

默认情况下，插件只会提取页面的标题作为搜索索引。

相关的配置及说明详见 [官方文档][plugin-search]。

:::

### Algolia 搜索

你可以通过 `@vuepress/plugin-docsearch` 插件来实现基于 Algolia 的搜索。你需要手动安装它，并通过 `themeConfig.plugins.docsearch` 传递插件选项。(你也可以自行调用)

你需要 [提交你的网站 URL](https://docsearch.algolia.com/apply/) 来加入 DocSearch 项目。当你的索引成功创建后， DocSearch 团队会将 appId 和 apiKey 发送到你的邮箱。接下来，你就可以配置 Algolia clawer 和该插件，在 VuePress 中启用 DocSearch 了。

::: details 爬虫配置示例

```js {36-50,58}
new Crawler({
  appId: "YOUR_APP_ID",
  apiKey: "YOUR_API_KEY",
  rateLimit: 8,
  startUrls: [
    // 这是 Algolia 开始抓取网站的初始地址
    // 如果你的网站被分为数个独立部分，你可能需要在此设置多个入口链接
    "https://YOUR_WEBSITE_URL/",
  ],
  sitemaps: [
    // 如果你在使用 Sitemap 插件 (如: vuepress-plugin-sitemap2)，你可以提供 Sitemap 链接
    "https://YOUR_WEBSITE_URL/sitemap.xml",
  ],
  ignoreCanonicalTo: false,
  exclusionPatterns: [
    // 你可以通过它阻止 Algolia 抓取某些 URL
  ],
  discoveryPatterns: [
    // 这是 Algolia 抓取 URL 的范围
    "https://YOUR_WEBSITE_URL/**",
  ],
  // 爬虫执行的计划时间，可根据文档更新频率设置
  schedule: "at 02:00 every 1 day",
  actions: [
    // 你可以拥有多个 action，特别是你在一个域名下部署多个文档时
    {
      // 使用适当的名称为索引命名
      indexName: "YOUR_INDEX_NAME",
      // 索引生效的路径
      pathsToMatch: ["https://YOUR_WEBSITE_URL/**"],
      // 控制 Algolia 如何抓取你的站点
      recordExtractor: ({ $, helpers }) => {
        // 以下是适用于 vuepress-theme-hope 的默认选项选项
        // vuepress-theme-hope 默认的容器类名为 theme-hope-content
        return helpers.docsearch({
          recordProps: {
            lvl0: {
              selectors: ".sidebar-heading.active",
              defaultValue: "Documentation",
            },
            lvl1: ".theme-hope-content h1",
            lvl2: ".theme-hope-content h2",
            lvl3: ".theme-hope-content h3",
            lvl4: ".theme-hope-content h4",
            lvl5: ".theme-hope-content h5",
            lvl6: ".theme-hope-content h6",
            content: ".theme-hope-content p, .theme-hope-content li",
          },
          indexHeadings: true,
        });
      },
    },
  ],
  initialIndexSettings: {
    // 控制索引如何被初始化，这仅当索引尚未生成时有效
    // 你可能需要在修改后手动删除并重新生成新的索引
    YOUR_INDEX_NAME: {
      attributesForFaceting: ["type", "lang"],
      attributesToRetrieve: ["hierarchy", "content", "anchor", "url"],
      attributesToHighlight: ["hierarchy", "hierarchy_camel", "content"],
      attributesToSnippet: ["content:10"],
      camelCaseAttributes: ["hierarchy", "hierarchy_radio", "content"],
      searchableAttributes: [
        "unordered(hierarchy_radio_camel.lvl0)",
        "unordered(hierarchy_radio.lvl0)",
        "unordered(hierarchy_radio_camel.lvl1)",
        "unordered(hierarchy_radio.lvl1)",
        "unordered(hierarchy_radio_camel.lvl2)",
        "unordered(hierarchy_radio.lvl2)",
        "unordered(hierarchy_radio_camel.lvl3)",
        "unordered(hierarchy_radio.lvl3)",
        "unordered(hierarchy_radio_camel.lvl4)",
        "unordered(hierarchy_radio.lvl4)",
        "unordered(hierarchy_radio_camel.lvl5)",
        "unordered(hierarchy_radio.lvl5)",
        "unordered(hierarchy_radio_camel.lvl6)",
        "unordered(hierarchy_radio.lvl6)",
        "unordered(hierarchy_camel.lvl0)",
        "unordered(hierarchy.lvl0)",
        "unordered(hierarchy_camel.lvl1)",
        "unordered(hierarchy.lvl1)",
        "unordered(hierarchy_camel.lvl2)",
        "unordered(hierarchy.lvl2)",
        "unordered(hierarchy_camel.lvl3)",
        "unordered(hierarchy.lvl3)",
        "unordered(hierarchy_camel.lvl4)",
        "unordered(hierarchy.lvl4)",
        "unordered(hierarchy_camel.lvl5)",
        "unordered(hierarchy.lvl5)",
        "unordered(hierarchy_camel.lvl6)",
        "unordered(hierarchy.lvl6)",
        "content",
      ],
      distinct: true,
      attributeForDistinct: "url",
      customRanking: [
        "desc(weight.pageRank)",
        "desc(weight.level)",
        "asc(weight.position)",
      ],
      ranking: [
        "words",
        "filters",
        "typo",
        "attribute",
        "proximity",
        "exact",
        "custom",
      ],
      highlightPreTag: '<span class="algolia-docsearch-suggestion--highlight">',
      highlightPostTag: "</span>",
      minWordSizefor1Typo: 3,
      minWordSizefor2Typos: 7,
      allowTyposOnNumericTokens: false,
      minProximity: 1,
      ignorePlurals: true,
      advancedSyntax: true,
      attributeCriteriaComputedByMinProximity: true,
      removeWordsIfNoResults: "allOptional",
    },
  },
});
```

:::

或者，你也可以 [运行你自己的爬虫](https://docsearch.algolia.com/docs/run-your-own/) 来创建索引，然后使用你自己的 [appId](#appId), [apiKey](#apikey) 和 [indexName](#indexname) 来配置该插件。

::: warning

Crawler 配置中 `initialIndexSettings.YOUR_INDEX_NAME.attributesForFaceting` 字段**必须**包含 `"lang"`，否则该插件将无法正常工作。

:::

相关的配置及说明详见 [官方文档][plugin-docsearch]。

## Git 仓库和编辑链接

当你提供了 `themeConfig.repo` 选项，将会自动在每个页面的导航栏生成源文件仓库按钮。

你可以通过 `themeConfig.repoDisplay` 控制是否显示仓库按钮。

:::: code-group

::: code-group-item TS

```ts
// .vuepress/config.ts
import { defineHopeConfig } from "vuepress-theme-hope";

export default defineHopeConfig({
  themeConfig: {
    // 默认为 GitHub. 同时也可以是一个完整的 URL
    repo: "vuepress-theme-hope/vuepress-theme-hope",
    // 自定义仓库链接文字。默认从 `themeConfig.repo` 中自动推断为
    // "GitHub" / "GitLab" / "Gitee" / "Bitbucket" 其中之一，或是 "Source"。
    repoLabel: "GitHub",
    // 是否在导航栏内显示仓库链接，默认为 `true`
    repoDisplay: true,
  },
});
```

:::

::: code-group-item JS

```js
// .vuepress/config.js
const { defineHopeConfig } = require("vuepress-theme-hope");

module.exports = defineHopeConfig({
  themeConfig: {
    // 假定是 GitHub. 同时也可以是一个完整的 GitLab URL
    repo: "vuejs/vuepress",
    // 自定义仓库链接文字。默认从 `themeConfig.repo` 中自动推断为
    // "GitHub"/"GitLab"/"Bitbucket" 其中之一，或是 "Source"。
    repoLabel: "查看源码",
    // 是否在导航栏右侧显示仓库链接，默认为 `true`
    repoDisplay: true,
  },
});
```

:::

::::

## 外观弹窗

提供下列三种功能:

- [主题色切换](../interface/theme-color.md)
- [深色模式](../interface/darkmode.md)
- [全屏按钮](../interface/others.md#全屏按钮)

## 相关助手与类型

`vuepress-theme-hope` 将导航栏的类型导出为 `HopeThemeNavbarConfig`，同时，提供了一个 `defineNavbarConfig` Helper 函数。它们可以在 TS 和 JS 中提供导航栏配置的校验与自动补全。

::: tip

它们主要应对当你将 VuePress 配置拆分成多个部分的情景。

:::

:::: code-group

::: code-group-item TS Helper

```ts
// .vuepress/navbar.ts
import { defineNavbarConfig } from "vuepress-theme-hope";

export default defineNavbarConfig([
  /* 你的导航栏配置 */
]);
```

:::

::: code-group-item TS 类型

```ts
// .vuepress/navbar.ts
import type { HopeThemeNavbarConfig } from "vuepress-theme-hope";

const navbarConfig: HopeThemeNavbarConfig = [
  /* 你的导航栏配置 */
];

export default navbarConfig;
```

:::

::: code-group-item JS

```js
// .vuepress/navbar.js
const { defineNavbarConfig } = require("vuepress-theme-hope");

module.exports = defineNavbarConfig([
  /* 你的导航栏配置 */
]);
```

:::

::::

## 例子

::::: details 本文档的导航栏配置

:::: code-group

::: code-group-item TS

@[code](../../../.vuepress/navbar/zh.ts)

:::

::: code-group-item JS

```js
const { defineNavbarConfig } = require("vuepress-theme-hope");

module.exports = defineNavbarConfig([
  "/zh/guide/",
  "/zh/config/",
  "/zh/faq/",
  {
    text: "教程",
    icon: "guide",
    prefix: "/zh/cookbook/",
    children: ["tutorial", "markdown/", "vuepress/"],
  },
  "/zh/migration/",
  {
    text: "项目",
    icon: "info",
    prefix: "/zh/",
    children: [
      "changelog",
      "demo/",
      "contribution",
      {
        text: "插件",
        icon: "plugin",
        children: [
          {
            text: "AddThis 插件",
            icon: "share",
            link: "https://vuepress-theme-hope.github.io/v2/add-this/zh/",
          },
          {
            text: "博客插件",
            icon: "blog",
            link: "https://vuepress-theme-hope.github.io/v2/blog/zh/",
          },
          {
            text: "评论插件",
            icon: "comment",
            link: "https://vuepress-theme-hope.github.io/v2/comment/zh/",
          },
          {
            text: "组件库",
            icon: "plugin",
            link: "https://vuepress-theme-hope.github.io/v2/components/zh/",
          },
          {
            text: "代码复制插件",
            icon: "copy",
            link: "https://vuepress-theme-hope.github.io/v2/copy-code/zh/",
          },
          {
            text: "Feed 插件",
            icon: "rss",
            link: "https://vuepress-theme-hope.github.io/v2/feed/zh/",
          },
          {
            text: "LightGallery 插件",
            icon: "pic",
            link: "https://vuepress-theme-hope.github.io/v2/lightgallery/zh/",
          },
          {
            text: "Markdown 增强插件",
            icon: "markdown",
            link: "https://vuepress-theme-hope.github.io/v2/md-enhance/zh/",
          },
          {
            text: "图片预览插件",
            icon: "pic",
            link: "https://vuepress-theme-hope.github.io/v2/photo-swipe/zh/",
          },
          {
            text: "PWA 插件",
            icon: "app",
            link: "https://vuepress-theme-hope.github.io/v2/pwa/zh/",
          },
          {
            text: "阅读时间插件",
            icon: "read",
            link: "https://vuepress-theme-hope.github.io/v2/reading-time/zh/",
          },
          {
            text: "Sass 调色板插件",
            icon: "palette",
            link: "https://vuepress-theme-hope.github.io/v2/sass-palette/zh/",
          },
          {
            text: "Seo 插件",
            icon: "strong",
            link: "https://vuepress-theme-hope.github.io/v2/seo/zh/",
          },
        ],
      },
    ],
  },
]);
```

:::

::::

:::::

[plugin-search]: https://v2.vuepress.vuejs.org/zh/reference/plugin/search.html
[plugin-docsearch]: https://v2.vuepress.vuejs.org/zh/reference/plugin/docsearch.html
