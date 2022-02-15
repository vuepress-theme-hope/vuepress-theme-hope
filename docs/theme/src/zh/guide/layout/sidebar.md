---
title: 侧边栏
icon: sidebar
category:
  - layout
tag:
  - sidebar
  - layout
---

侧边栏可能会包含相关的文档列表，文档标题以及博客模式下的博主信息。

<!-- more -->

## 侧边栏链接

站点侧边栏的配置由 `themeConfig.sidebar` 控制。

### 字符串格式

同导航栏，你可以填入一个包含多个文件链接的数组，作为侧边栏基本的配置:

:::: code-group

::: code-group-item TS

```ts
// .vuepress/config.ts
import { defineHopeConfig } from "vuepress-theme-hope";

export default defineHopeConfig({
  themeConfig: {
    sidebar: ["/zh/README.md", "/zh/guide/README.md", "/zh/config/README.md"],
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
    sidebar: ["/zh/README.md", "/zh/guide/README.md", "/zh/config/README.md"],
  },
});
```

:::

::::

数组的每一项会自动提取对应文件的图标与标题，渲染为一个侧边栏项目。

::: tip

您可以省略 `.md` 扩展名，以 `/` 结尾的路径会被推断为 `/README.md`。

:::

### 对象格式

<!-- TODO: Add activeMatch and other info -->

同导航栏，如果你对页面的图标不满意或者觉得页面标题太长，你可以改为配置一个对象。可用的配置项有:

- `text:` 项目文字
- `link` 项目链接
- `icon` 项目图标

:::: code-group

::: code-group-item TS

```ts
// .vuepress/config.ts
import { defineHopeConfig } from "vuepress-theme-hope";

export default defineHopeConfig({
  themeConfig: {
    sidebar: [
      { text: "指南", link: "/zh/guide/README.md", icon: "creative" },
      { text: "配置", link: "/zh/config/README.md", icon: "config" },
      { text: "常见问题", link: "/zh/faq.md", icon: "question" },
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
    sidebar: [
      { text: "指南", link: "/zh/guide/README.md", icon: "creative" },
      { text: "配置", link: "/zh/config/README.md", icon: "config" },
      { text: "常见问题", link: "/zh/faq.md", icon: "question" },
    ],
  },
});
```

:::

::::

### 分组与嵌套

如果你需要展示嵌套结构的侧边栏，你可以将同类链接整理成菜单分组。

你需要使用 [对象格式](#对象格式) ，并提供额外的 `children` 选项设置链接列表。和导航栏一样，你可以在侧边栏中使用 `prefix` 来为组内的每个链接添加默认的路径前缀，并且侧边栏额外支持设置 `collapsable: true` 来使菜单分组可折叠。

:::: code-group

::: code-group-item TS

```ts
// .vuepress/config.ts
import { defineHopeConfig } from "vuepress-theme-hope";

export default defineHopeConfig({
  themeConfig: {
    sidebar: [
      {
        // 必要的，分组的标题文字
        text: "分组 1",
        // 可选的, 分组标题对应的图标
        icon: "tip",
        // 可选的, 分组标题对应的链接
        link: "/foo/",
        // 可选的，会添加到每个 item 链接地址之前
        prefix: "/foo/",
        // 可选的, 设置分组是否可以折叠，默认值是 false,
        collapsable: true,
        // 必要的，分组的子项目
        children: [
          "README.md" /* /foo/index.html */,
          /* ... */
          "geo.md" /* /foo/geo.html */,
        ],
      },
      {
        text: "分组 2",
        prefix: "/ray/",
        children: [
          /* ... */
          "bar.md" /* /ray/bar.html */,
          "baz.md" /* /ray/baz.html */,
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
    sidebar: [
      {
        // 必要的，分组的标题文字
        text: "分组 1",
        // 可选的, 分组标题对应的图标
        icon: "tip",
        // 可选的, 分组标题对应的链接
        link: "/foo/",
        // 可选的，会添加到每个 item 链接地址之前
        prefix: "/foo/",
        // 可选的, 设置分组是否可以折叠，默认值是 false,
        collapsable: true,
        // 必要的，分组的子项目
        children: [
          "README.md" /* /foo/index.html */,
          /* ... */
          "geo.md" /* /foo/geo.html */,
        ],
      },
      {
        text: "分组 2",
        prefix: "/ray/",
        children: [
          /* ... */
          "bar.md" /* /ray/bar.html */,
          "baz.md" /* /ray/baz.html */,
        ],
      },
    ],
  },
});
```

:::

::::

侧边栏分组也可以进行嵌套:

:::: code-group

::: code-group-item TS

```ts
// .vuepress/config.ts
import { defineHopeConfig } from "vuepress-theme-hope";

export default defineHopeConfig({
  themeConfig: {
    sidebar: [
      {
        text: "Group",
        prefix: "/",
        children: [
          "baz" /* /baz.html */,
          {
            text: "Sub Group 1",
            children: ["quz.md" /* /quz.html */, "xyzzy.md" /* /xyzzy.html */],
          },
          {
            text: "Sub Group 2",
            prefix: "corge/",
            children: [
              "fred.md" /* /corge/fred.html */,
              "grault.md" /* /corge/grault.html */,
            ],
          },
          "foo.md" /* /foo.html */,
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
    sidebar: [
      {
        text: "Group",
        prefix: "/",
        children: [
          "baz.md" /* /baz.html */,
          {
            text: "Sub Group 1",
            children: ["quz.md" /* /quz.html */, "xyzzy.md" /* /xyzzy.html */],
          },
          {
            text: "Sub Group 2",
            prefix: "corge/",
            children: [
              "fred.md" /* /corge/fred.html */,
              "grault.md" /* /corge/grault.html */,
            ],
          },
          "foo.md" /* /foo.html */,
        ],
      },
    ],
  },
});
```

:::

::::

通常情况下，你可能希望搭配 `prefix` 使用来快速还原文档的结构。

比如，将你的页面文件为下述的目录结构:

```
.
├─ README.md
├─ contact.md
├─ about.md
├─ foo/
│   ├─ README.md
│   ├─ one.md
│   └─ two.md
└─ bar/
    ├─ README.md
    ├─ three.md
    └─ four.md
```

你就可以进行以下配置:

:::: code-group

::: code-group-item TS

```ts
// .vuepress/config.ts
import { defineHopeConfig } from "vuepress-theme-hope";

export default defineHopeConfig({
  themeConfig: {
    sidebar: [
      "/" /* / */,
      {
        text: "Foo",
        prefix: "/foo/",
        children: [
          "" /* /foo/ */,
          "one" /* /foo/one.html */,
          "two" /* /foo/two.html */,
        ],
      },
      {
        text: "Bar",
        prefix: "/bar/",
        children: [
          "" /* /bar/ */,
          "three" /* /bar/three.html */,
          "four" /* /bar/four.html */,
        ],
      },
      "/contact" /* /contact.html */,
      "/about" /* /about.html */,
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
    sidebar: [
      "/" /* / */,
      {
        text: "Foo",
        prefix: "/foo/",
        children: [
          "" /* /foo/ */,
          "one" /* /foo/one.html */,
          "two" /* /foo/two.html */,
        ],
      },
      {
        text: "Bar",
        prefix: "/bar/",
        children: [
          "" /* /bar/ */,
          "three" /* /bar/three.html */,
          "four" /* /bar/four.html */,
        ],
      },
      "/contact" /* /contact.html */,
      "/about" /* /about.html */,
    ],
  },
});
```

:::

::::

### 多个侧边栏

如果你想为不同的页面组来显示不同的侧边栏，你需要通过 `路径前缀: 侧边栏配置` 的格式为侧边栏配置一个对象。

比如，将你的页面文件为下述的目录结构:

```
.
├─ README.md
├─ contact.md
├─ about.md
├─ foo/
│   ├─ README.md
│   ├─ one.md
│   └─ two.md
└─ bar/
    ├─ README.md
    ├─ three.md
    └─ four.md
```

你就可以遵循以下的侧边栏配置，来为不同路径显示不同的分组:

:::: code-group

::: code-group-item TS

```ts
// .vuepress/config.ts
import { defineHopeConfig } from "vuepress-theme-hope";

export default defineHopeConfig({
  themeConfig: {
    sidebar: {
      "/foo/": [
        "" /* /foo/ */,
        "one" /* /foo/one.html */,
        "two" /* /foo/two.html */,
      ],

      "/bar/": [
        "" /* /bar/ */,
        "three" /* /bar/three.html */,
        "four" /* /bar/four.html */,
      ],

      // fallback
      "/": [
        "" /* / */,
        "contact" /* /contact.html */,
        "about" /* /about.html */,
      ],
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
    sidebar: {
      "/foo/": [
        "" /* /foo/ */,
        "one" /* /foo/one.html */,
        "two" /* /foo/two.html */,
      ],

      "/bar/": [
        "" /* /bar/ */,
        "three" /* /bar/three.html */,
        "four" /* /bar/four.html */,
      ],

      // fallback
      "/": [
        "" /* / */,
        "contact" /* /contact.html */,
        "about" /* /about.html */,
      ],
    },
  },
});
```

:::

::::

## 自动生成侧栏

如果你希望自动生成一个仅仅包含了当前页面标题(headers)链接的侧边栏，你可以通过 frontmatter 来实现:

```md
---
sidebar: auto
---
```

你也可以通过配置来在所有页面中启用它:

:::: code-group

::: code-group-item TS

```ts {6}
// .vuepress/config.ts
import { defineHopeConfig } from "vuepress-theme-hope";

export default defineHopeConfig({
  themeConfig: {
    sidebar: "auto",
  },
});
```

:::

::: code-group-item JS

```js {6}
// .vuepress/config.js
const { defineHopeConfig } = require("vuepress-theme-hope");

module.exports = defineHopeConfig({
  themeConfig: {
    sidebar: "auto",
  },
});
```

:::

::::

## 禁用侧边栏

你可以通过 `YAML front matter` 来禁用指定页面的侧边栏:

```md
---
sidebar: false
---
```

## 嵌套的标题链接

默认情况下，侧边栏会自动地显示由当前页面的标题(headers)组成的链接，并按照页面本身的结构进行嵌套，你可以通过 `themeConfig.headingDepth` 来修改它的行为。默认的深度(也是最大的深度)是 `2`，它将提取到 `h2` 和 `h3` 的标题，设置成 `0` 将会禁用标题(headers)链接。

也可以使用 frontmatter 来为某个页面重写此值:

```md
---
headingDepth: 2
---
```

::: note

有效最大值取决于你通过 [markdown.extractHeaders.level](https://v2.vuepress.vuejs.org/zh/reference/config.html#markdown-extractheaders) 提取了哪些级别的标题。

由于 [markdown.extractHeaders.level](<(https://v2.vuepress.vuejs.org/zh/reference/config.html#markdown-extractheaders)>) 的默认值是 `[2, 3]` ，因此 `headingDepth` 的默认最大值是 `2` 。

:::

## 活动的标题链接

默认情况下，当用户通过滚动查看页面的不同部分时，嵌套的标题链接和 URL 中的 Hash 值会实时更新。

这个功能是通过插件 `@vuepress/plugin-active-header-links` 实现的，并可以通过以下的配置来禁用:

:::: code-group

::: code-group-item TS

```ts {8}
// .vuepress/config.ts
import { defineHopeConfig } from "vuepress-theme-hope";

export default defineHopeConfig({
  themeConfig: {
    plugins: {
      // 默认值: true
      activeHeaderLinks: false,
    },
  },
});
```

:::

::: code-group-item JS

```js {8}
// .vuepress/config.js
const { defineHopeConfig } = require("vuepress-theme-hope");

module.exports = defineHopeConfig({
  themeConfig: {
    plugins: {
      // 默认值: true
      activeHeaderLinks: false,
    },
  },
});
```

:::

::::

## 图标支持

侧边栏默认启用图标支持，将在侧边栏的链接前显示页面的图标。你可以在 `themeConfig` 中将 `sidebarIcon` 设置为 `false` 来禁用它。

## 多语言

主题的侧边栏支持 [多语言](https://v2.vuepress.vuejs.org/zh/guide/i18n.html)，所以你可以为每个语言单独设置侧边栏:

:::: code-group

::: code-group-item TS

```ts
// .vuepress/config.ts
import { defineHopeConfig } from "vuepress-theme-hope";

export default defineHopeConfig({
  themeConfig: {
    locales: {
      "/": {
        sidebar: [
          /* 根目录下的英文配置 */
        ],
      },
      "/zh/": {
        sidebar: [
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
        sidebar: [
          /* 根目录下的英文配置 */
        ],
      },
      "/zh/": {
        sidebar: [
          /* 中文目录下的中文配置 */
        ],
      },
    },
  },
});
```

:::

::::

## 相关助手与类型

`vuepress-theme-hope` 将侧边栏的类型导出为 `HopeThemeSideConfig`，同时，提供了一个 `defineSidebarConfig` Helper 函数。它们可以在 TS 和 JS 中提供侧边栏配置的校验与自动补全。

::: tip

为了应对当你将 [多侧边栏配置](#多个侧边栏) 拆分成多个部分的情景，我们还针对性的提供了 `HopeThemeSidebarArrayConfig` `HopeThemeSidebarObjectConfig` 类型与 `defineSidebarArrayConfig` 和 `defineSidebarObjectConfig` Helper 函数。

:::

:::: code-group

::: code-group-item TS Helper

```ts {4}
// .vuepress/sidebar.ts
import { defineSidebarConfig } from "vuepress-theme-hope";

export default defineSidebarConfig(/* 你的侧边栏配置 */);
```

:::

::: code-group-item TS 类型

```ts {4}
// .vuepress/navbar.ts
import type { HopeThemeSidebarConfig } from "vuepress-theme-hope";

const sidebarConfig: HopeThemeSidebarConfig = [
  /* 你的侧边栏配置 */
];

export default sidebarConfig;
```

:::

::: code-group-item JS

```js
// .vuepress/sidebar.js
const { defineSidebarConfig } = require("vuepress-theme-hope");

module.exports = defineSidebarConfig(/* 你的侧边栏配置 */);
```

:::

::::

## 例子

::::: details 本文档的侧边栏配置

:::: code-group

::: code-group-item TS

```ts
// .vuepress/config.ts
import { defineSidebarConfig } from "vuepress-theme-hope";

export default defineSidebarConfig({
  "/zh/guide/": [
    {
      text: "快速上手",
      icon: "creative",
      prefix: "get-started/",
      children: ["intro", "install", "markdown"],
    },
    {
      text: "界面",
      icon: "skin",
      prefix: "interface/",
      children: ["darkmode", "theme-color", "icon", "accessibility", "others"],
    },
    {
      text: "布局",
      icon: "layout",
      prefix: "layout/",
      children: [
        "navbar",
        "sidebar",
        {
          text: "Page",
          icon: "page",
          children: ["page", "breadcrumb", "footer"],
        },
        "home",
        "slides",
        "custom",
      ],
    },
    {
      text: "Markdown 增强",
      icon: "markdown",
      prefix: "markdown/",
      children: [
        "intro",
        "container",
        "components",
        "code-group",
        "align",
        "sup-sub",
        "footnote",
        "mark",
        "tasklist",
        "tex",
        "flowchart",
        "mermaid",
        "demo",
        "presentation",
        "external",
      ],
    },
    {
      text: "功能",
      icon: "discover",
      prefix: "feature/",
      children: [
        "page-info",
        "comment",
        "copy-code",
        "photo-swipe",
        "copyright",
        "git",
        "encrypt",
        "pwa",
        "feed",
        "seo",
        "sitemap",
        "typescript",
      ],
    },
    {
      text: "博客",
      icon: "layout",
      prefix: "blog/",
      children: ["intro", "article", "category-and-tags", "timeline", "home"],
    },
  ],

  "/zh/config/": [
    {
      text: "主题配置",
      icon: "config",
      prefix: "theme/",
      children: ["", "default", "feature", "plugin", "apperance"],
    },
    "page",
    "stylus",
    "i18n",
    {
      text: "插件配置",
      icon: "plugin",
      prefix: "plugin/",
      children: ["", "container", "copyright"],
    },
  ],

  "/zh/basic/": [
    {
      text: "Markdown",
      icon: "markdown",
      prefix: "markdown/",
      children: [
        "",
        "demo",
        {
          text: "Emoji",
          icon: "emoji",
          link: "emoji/",
          prefix: "emoji/",
          children: ["people", "nature", "object", "place", "symbol"],
        },
      ],
    },
    {
      text: "VuePress",
      icon: "vue",
      prefix: "vuepress/",
      children: ["", "file", "markdown", "config", "plugin", "theme"],
    },
  ],

  "/zh/": [
    "",
    {
      text: "指南",
      icon: "creative",
      prefix: "guide/",
      children: [
        "get-started/",
        "interface/",
        "layout/README.md/",
        "markdown/",
        "feature/",
        "blog/",
      ],
    },
    {
      text: "配置",
      icon: "config",
      prefix: "config/",
      children: ["", "theme/", "page", "stylus", "i18n", "plugin/"],
    },
    {
      text: "基础",
      icon: "module",
      prefix: "basic/",
      children: ["tutorial", "markdown/", "vuepress/"],
    },
    "changelog",
    "FAQ/",
    "demo/",
    "contribution",
  ],
});
```

:::

::: code-group-item JS

```js
// .vuepress/config.js
const { defineSidebarConfig } = require("vuepress-theme-hope");

module.exports = defineSidebarConfig({
  "/zh/guide/": [
    {
      text: "快速上手",
      icon: "creative",
      prefix: "get-started/",
      children: ["intro", "install", "markdown"],
    },
    {
      text: "界面",
      icon: "skin",
      prefix: "interface/",
      children: ["darkmode", "theme-color", "icon", "accessibility", "others"],
    },
    {
      text: "布局",
      icon: "layout",
      prefix: "layout/",
      children: [
        "navbar",
        "sidebar",
        {
          text: "Page",
          icon: "page",
          children: ["page", "breadcrumb", "footer"],
        },
        "home",
        "slides",
        "custom",
      ],
    },
    {
      text: "Markdown 增强",
      icon: "markdown",
      prefix: "markdown/",
      children: [
        "intro",
        "container",
        "components",
        "code-group",
        "align",
        "sup-sub",
        "footnote",
        "mark",
        "tasklist",
        "tex",
        "flowchart",
        "mermaid",
        "demo",
        "presentation",
        "external",
      ],
    },
    {
      text: "功能",
      icon: "discover",
      prefix: "feature/",
      children: [
        "page-info",
        "comment",
        "copy-code",
        "photo-swipe",
        "copyright",
        "git",
        "encrypt",
        "pwa",
        "feed",
        "seo",
        "sitemap",
        "typescript",
      ],
    },
    {
      text: "博客",
      icon: "layout",
      prefix: "blog/",
      children: ["intro", "article", "category-and-tags", "timeline", "home"],
    },
  ],

  "/zh/config/": [
    {
      text: "主题配置",
      icon: "config",
      prefix: "theme/",
      children: ["", "default", "feature", "plugin", "apperance"],
    },
    "page",
    "stylus",
    "i18n",
    {
      text: "插件配置",
      icon: "plugin",
      prefix: "plugin/",
      children: ["", "container", "copyright"],
    },
  ],

  "/zh/basic/": [
    {
      text: "Markdown",
      icon: "markdown",
      prefix: "markdown/",
      children: [
        "",
        "demo",
        {
          text: "Emoji",
          icon: "emoji",
          link: "emoji/",
          prefix: "emoji/",
          children: ["people", "nature", "object", "place", "symbol"],
        },
      ],
    },
    {
      text: "VuePress",
      icon: "vue",
      prefix: "vuepress/",
      children: ["", "file", "markdown", "config", "plugin", "theme"],
    },
  ],

  "/zh/": [
    "",
    {
      text: "指南",
      icon: "creative",
      prefix: "guide/",
      children: [
        "get-started/",
        "interface/",
        "layout/README.md/",
        "markdown/",
        "feature/",
        "blog/",
      ],
    },
    {
      text: "配置",
      icon: "config",
      prefix: "config/",
      children: ["", "theme/", "page", "stylus", "i18n", "plugin/"],
    },
    {
      text: "基础",
      icon: "module",
      prefix: "basic/",
      children: ["tutorial", "markdown/", "vuepress/"],
    },
    "changelog",
    "FAQ/",
    "demo/",
    "contribution",
  ],
});
```

:::

::::

:::::
