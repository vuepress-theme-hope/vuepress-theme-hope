---
title: 侧边栏
icon: sidebar
category: layout
tags:
  - sidebar
  - layout
---

你需要配置 `themeConfig.sidebar`，才能在站点中显示侧边栏(Sidebar)。

对于 Sidebar 基本的配置，可以传入一个包含多个链接的数组:

<CodeGroup>
<CodeGroupItem title="js">

```js
// .vuepress/config.js
const { config } = require("vuepress-theme-hope");

module.exports = config({
  themeConfig: {
    sidebar: ["/", "/page-a", "/page-b"],
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
    sidebar: ["/", "/page-a", "/page-b"],
  },
});
```

</CodeGroupItem>
</CodeGroup>

数组的每一项最终都会渲染为一个侧边栏项目。

你可以省略 `.md` 拓展名，同时以 `/` 结尾的路径将会被视为 `*/README.md`。

侧边栏默认启用图标支持，将在侧边栏的链接前显示页面的图标 (读取在 frontmatter 中设置的 `icon`)。你可以在 `themeConfig` 中将 `sidebarIcon` 设置为 `false` 来禁用它。

侧边栏链接的文字将会从页面自动获取 (优先读取在 frontmatter 中设置的标题，然后回退到页面的第一个标题)。如果你想要指定链接的文字，使用一个格式为 `[link, text]` 的数组。

::: details 例子

<CodeGroup>
<CodeGroupItem title="js">

```js
// .vuepress/config.js
const { config } = require("vuepress-theme-hope");

module.exports = config({
  themeConfig: {
    sidebar: ["/", "/page-a", ["/page-b", "这将会是 page-b 的页面标题"]],
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
    sidebar: ["/", "/page-a", ["/page-b", "这将会是 page-b 的页面标题"]],
  },
});
```

</CodeGroupItem>
</CodeGroup>

:::

<!-- more -->

## 嵌套的标题链接

默认情况下，侧边栏会自动地显示由当前页面的标题(headers)组成的链接，并按照页面本身的结构进行嵌套，你可以通过 `themeConfig.sidebarDepth` 来修改它的行为。默认的深度(也是最大的深度)是 `2`，它将提取到 `h2` 和 `h3` 的标题，设置成 `0` 将会禁用标题(headers)链接。

也可以使用 frontmatter 来为某个页面重写此值:

```md
---
sidebarDepth: 2
---
```

## 显示所有页面的标题链接

默认情况下，侧边栏只会显示由当前活动页面的标题 (headers) 组成的链接，你可以将 `themeConfig.displayAllHeaders` 设置为 `true` 来显示所有页面的标题链接:

<CodeGroup>
<CodeGroupItem title="js">

```js {6}
// .vuepress/config.js
const { config } = require("vuepress-theme-hope");

module.exports = config({
  themeConfig: {
    displayAllHeaders: true, // 默认值: false
  },
});
```

</CodeGroupItem>

<CodeGroupItem title="ts">

```ts {6}
// .vuepress/config.ts
import theme from "vuepress-theme-hope";

export default theme.config({
  themeConfig: {
    displayAllHeaders: true, // 默认值: false
  },
});
```

</CodeGroupItem>
</CodeGroup>

## 活动的标题链接

默认情况下，当用户通过滚动查看页面的不同部分时，嵌套的标题链接和 URL 中的 Hash 值会实时更新，这个行为可以通过以下的配置来禁用:

<CodeGroup>
<CodeGroupItem title="js">

```js {6}
// .vuepress/config.js
const { config } = require("vuepress-theme-hope");

module.exports = config({
  themeConfig: {
    activeHeaderLinks: false, // 默认值: true
  },
});
```

</CodeGroupItem>

<CodeGroupItem title="ts">

```ts {6}
// .vuepress/config.ts
import theme from "vuepress-theme-hope";

export default theme.config({
  themeConfig: {
    activeHeaderLinks: false, // 默认值: true
  },
});
```

</CodeGroupItem>
</CodeGroup>

## 侧边栏分组

你可以通过使用**对象**来将侧边栏划分成多个组。每一个组默认会被渲染成一个可以打开与折叠的菜单，菜单项目是组内通过 `children` 设置的每个分组链接。

你可以使用 `prefix` 来为组内的每个链接添加默认的路径前缀，使用 `icon` 为该分组文字添加一个图标。

侧边栏的每个子组默认是可折叠的，你可以设置 `collapsable: false` 来让一个组永远都是展开状态。

一个侧边栏的子组配置同时支持 [sidebarDepth](#嵌套的标题链接) 字段用于重写默认显示的侧边栏深度(`2`)。

<CodeGroup>
<CodeGroupItem title="js">

```js
// .vuepress/config.js
const { config } = require("vuepress-theme-hope");

module.exports = config({
  themeConfig: {
    sidebar: [
      {
        // 必要的，分组的标题文字
        title: "Group 1",
        // 可选的, 分组标题对应的图标
        icon: "bar",
        // 可选的, 分组标题对应的链接
        path: "/foo/",
        // 可选的，会添加到每个 item 链接地址之前
        prefix: "/foo/",
        // 可选的, 设置分组是否可以折叠，默认值是 true,
        collapsable: false,
        // 可选的, 嵌套渲染深度，默认值是 2
        sidebarDepth: 2,
        // 必要的，分组的子项目
        children: ["/"],
      },
      {
        title: "Group 2",
        children: [
          /* ... */
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
    sidebar: [
      {
        // 必要的，分组的标题文字
        title: "Group 1",
        // 可选的, 分组标题对应的图标
        icon: "bar",
        // 可选的, 分组标题对应的链接
        path: "/foo/",
        // 可选的，会添加到每个 item 链接地址之前
        prefix: "/foo/",
        // 可选的, 设置分组是否可以折叠，默认值是 true,
        collapsable: false,
        // 可选的, 嵌套渲染深度，默认值是 2
        sidebarDepth: 2,
        // 必要的，分组的子项目
        children: ["/"],
      },
      {
        title: "Group 2",
        children: [
          /* ... */
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
    sidebar: [
      {
        title: "快速上手",
        icon: "creative",
        prefix: "/get-started/",
        collapsable: false,
        children: [
          "intro" /* /get-started/intro.html */,
          "install" /* /get-started/install.html */,
          "markdown" /* /get-started/markdown.html */,
        ],
      },
      {
        title: "界面",
        icon: "skin",
        prefix: "/interface/",
        collapsable: false,
        children: [
          "darkmode" /* /interface/darkmode.html */,
          "theme-color" /* /interface/theme-color.html */,
          "icon" /* /interface/icon.html */,
          "others" /* /interface/others.html */,
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
    sidebar: [
      {
        title: "快速上手",
        icon: "creative",
        prefix: "/get-started/",
        collapsable: false,
        children: [
          "intro" /* /get-started/intro.html */,
          "install" /* /get-started/install.html */,
          "markdown" /* /get-started/markdown.html */,
        ],
      },
      {
        title: "界面",
        icon: "skin",
        prefix: "/interface/",
        collapsable: false,
        children: [
          "darkmode" /* /interface/darkmode.html */,
          "theme-color" /* /interface/theme-color.html */,
          "icon" /* /interface/icon.html */,
          "others" /* /interface/others.html */,
        ],
      },
    ],
  },
});
```

</CodeGroupItem>
</CodeGroup>

:::

侧边栏分组也可以进行嵌套:

<CodeGroup>
<CodeGroupItem title="js">

```js
// .vuepress/config.js
const { config } = require("vuepress-theme-hope");

module.exports = config({
  themeConfig: {
    sidebar: [
      {
        title: "Group",
        prefix: "/",
        children: [
          "baz" /* /baz.html */,
          {
            title: "Sub Group 1",
            children: ["quz" /* /quz.html */, "xyzzy" /* /xyzzy.html */],
            title: "Sub Group 2",
            prefix: "corge/",
            children: [
              "fred" /* /corge/fred.html */,
              "grault" /* /corge/grault.html */,
            ],
          },
          "foo" /* /foo.html */,
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
    sidebar: [
      {
        title: "Group",
        prefix: "/",
        children: [
          "baz" /* /baz.html */,
          {
            title: "Sub Group 1",
            children: ["quz" /* /quz.html */, "xyzzy" /* /xyzzy.html */],
            title: "Sub Group 2",
            prefix: "corge/",
            children: [
              "fred" /* /corge/fred.html */,
              "grault" /* /corge/grault.html */,
            ],
          },
          "foo" /* /foo.html */,
        ],
      },
    ],
  },
});
```

</CodeGroupItem>
</CodeGroup>

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

<CodeGroup>
<CodeGroupItem title="js">

```js
// .vuepress/config.js
const { config } = require("vuepress-theme-hope");

module.exports = config({
  themeConfig: {
    sidebar: [
      "/" /* / */,
      {
        title: "Foo",
        prefix: "/foo/",
        children: [
          "" /* /foo/ */,
          "one" /* /foo/one.html */,
          "two" /* /foo/two.html */,
        ],
      },
      {
        title: "Bar",
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

</CodeGroupItem>

<CodeGroupItem title="ts">

```ts
// .vuepress/config.ts
import theme from "vuepress-theme-hope";

export default theme.config({
  themeConfig: {
    sidebar: [
      "/" /* / */,
      {
        title: "Foo",
        prefix: "/foo/",
        children: [
          "" /* /foo/ */,
          "one" /* /foo/one.html */,
          "two" /* /foo/two.html */,
        ],
      },
      {
        title: "Bar",
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

</CodeGroupItem>
</CodeGroup>

::: warning

在配置侧边栏时请特别注意 `/` 的添加。处于性能考虑，我们会假设用户对侧边栏进行了正确的配置，所以我们不会对路径进行任何处理和校验(比如遍历生成路径结构进行比对验证)，而是直接拼接生成。

请留心你的配置是否可以拼接成正确的路径。

比如期待 `bar/foo/`，却因为 `bar` 缺少尾随 `/` 而 `foo` 未配置前置 `/` 导致生成 `barfoo/` 的情况，或两者均配置而生成了错误的 `bar//foo`。它们都会造成解析错误，导致对应的侧边栏项目缺省。

:::

::: tip

处于上面的一点原因，我们会在开发服务器的控制台打出任何无法找到对应页面的侧边栏链接。这意味着你的错误配置可以很容易的通过其追踪并修正。

:::

## 多个侧边栏

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

<CodeGroup>
<CodeGroupItem title="js">

```js
// .vuepress/config.js
const { config } = require("vuepress-theme-hope");

module.exports = config({
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

</CodeGroupItem>

<CodeGroupItem title="ts">

```ts
// .vuepress/config.ts
import theme from "vuepress-theme-hope";

export default theme.config({
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

</CodeGroupItem>
</CodeGroup>

::: warning

你需要特别注意对象键声明的顺序，通常来说你应该把更精确的路径放置在前边。这是因为 VuePress 会按顺序遍历侧边栏配置的各项键名来寻找匹配的配置，一旦一个键名成功匹配为当前路经，它就会显示对应的侧边栏配置。

在本例中，fallback 侧边栏就是因为这个原因必须在最后定义。

:::

## 自动生成侧栏

如果你希望自动生成一个仅仅包含了当前页面标题(headers)链接的侧边栏，你可以通过 frontmatter 来实现:

```md
---
sidebar: auto
---
```

你也可以通过配置来在所有页面中启用它:

<CodeGroup>
<CodeGroupItem title="js">

```js {6}
// .vuepress/config.js
const { config } = require("vuepress-theme-hope");

module.exports = config({
  themeConfig: {
    sidebar: "auto",
  },
});
```

</CodeGroupItem>

<CodeGroupItem title="ts">

```ts {6}
// .vuepress/config.ts
import theme from "vuepress-theme-hope";

export default theme.config({
  themeConfig: {
    sidebar: "auto",
  },
});
```

</CodeGroupItem>
</CodeGroup>

## 禁用侧边栏

你可以通过 `YAML front matter` 来禁用指定页面的侧边栏:

```md
---
sidebar: false
---
```

## 多语言

在 [多语言](https://v1.vuepress.vuejs.org/zh/guide/i18n.html) 模式下, 你也可以为某一特定的语言配置侧边栏:

<CodeGroup>
<CodeGroupItem title="js">

```js
// .vuepress/config.js
const { config } = require("vuepress-theme-hope");

module.exports = config({
  themeConfig: {
    locales: {
      "/zh/": {
        sidebar: [
          /* 你的配置 */
        ],
      },
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
    locales: {
      "/zh/": {
        sidebar: [
          /* 你的配置 */
        ],
      },
    },
  },
});
```

</CodeGroupItem>
</CodeGroup>

## 博主信息

如果你配置了博客相关选项，你可以通过配置 `themeConfig.blog.sidebarDisplay` 来决定是否在侧边栏显示博主的名字、头像以及文章与标签的数量。

你可以设置 `'mobile'` 来只在移动视图显示，或者设置 `always`，来保持在侧边栏显示。

## `sidebarConfig`

我们提供了一个 `sidebarConfig` Helper 函数。你可以从 `vuepress-theme-hope` 中将其引入，并包裹你的导航栏配置来让编辑器提供自动补全并帮助你校验侧边栏配置是否正确。

<CodeGroup>
<CodeGroupItem title="js">

```js
// .vuepress/sidebar.js
const { sidebarConfig } = require("vuepress-theme-hope");

module.exports = sidebarConfig(/* 你的侧边栏配置 */);
```

</CodeGroupItem>

<CodeGroupItem title="ts">

```ts {6}
// .vuepress/sidebar.ts
import theme from "vuepress-theme-hope";

export default theme.sidebarConfig(/* 你的侧边栏配置 */);
```

</CodeGroupItem>
</CodeGroup>

::: tip

当你将 VuePress 配置拆分成多个部分时，你可以使用该 Helper 函数来保持自动补全与校验。

:::

## 案例

::: details 本文档的侧边栏配置

<CodeGroup>
<CodeGroupItem title="js">

```js
// .vuepress/config.js
const { config } = require("vuepress-theme-hope");

module.exports = config({
  themeConfig: {
    sidebar: {
      "/zh/guide/": [
        {
          title: "快速上手",
          icon: "creative",
          prefix: "get-started/",
          collapsable: false,
          children: ["intro", "install", "markdown"],
        },
        {
          title: "界面",
          icon: "skin",
          prefix: "interface/",
          collapsable: false,
          children: ["darkmode", "theme-color", "icon", "others"],
        },
        {
          title: "布局",
          icon: "layout",
          prefix: "layout/",
          collapsable: false,
          children: [
            "sidebar",
            "sidebar",
            {
              title: "页面",
              icon: "page",
              collapsable: false,
              children: ["page", "breadcrumb", "footer"],
            },
            "home",
            "slides",
          ],
        },
        {
          title: "Markdown 增强",
          icon: "markdown",
          prefix: "markdown/",
          collapsable: false,
          children: [
            "intro",
            "components",
            "align",
            "sup-sub",
            "footnote",
            "mark",
            "tex",
            "flowchart",
            "demo",
            "presentation",
            "external",
          ],
        },
        {
          title: "功能",
          icon: "discover",
          prefix: "feature/",
          collapsable: false,
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
          title: "博客",
          icon: "layout",
          prefix: "blog/",
          collapsable: false,
          children: ["intro", "home", "category-and-tags"],
        },
      ],

      "/zh/config/": [
        {
          title: "主题配置",
          icon: "config",
          prefix: "theme/",
          collapsable: false,
          children: ["", "default", "feature", "plugin", "apperance"],
        },
        "page",
        "stylus",
        {
          title: "插件配置",
          icon: "plugin",
          prefix: "plugin/",
          collapsable: false,
          children: ["", "container", "copyright"],
        },
      ],

      "/zh/basic/": [
        {
          title: "Markdown",
          icon: "markdown",
          prefix: "markdown/",
          collapsable: false,
          children: [
            "",
            "demo",
            {
              title: "Emoji",
              icon: "emoji",
              path: "emoji/",
              prefix: "emoji/",
              collapsable: false,
              children: ["people", "nature", "object", "place", "symbol"],
            },
          ],
        },
        {
          title: "VuePress",
          icon: "vue",
          prefix: "vuepress/",
          collapsable: false,
          children: [
            "",
            "file",
            "markdown",
            "plugin",
            "theme",
            "command",
            "case",
          ],
        },
      ],

      "/zh/": ["", "guide/", "config/", "basic/", "FAQ/", "demo/"],
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
    sidebar: {
      "/zh/guide/": [
        {
          title: "快速上手",
          icon: "creative",
          prefix: "get-started/",
          collapsable: false,
          children: ["intro", "install", "markdown"],
        },
        {
          title: "界面",
          icon: "skin",
          prefix: "interface/",
          collapsable: false,
          children: ["darkmode", "theme-color", "icon", "others"],
        },
        {
          title: "布局",
          icon: "layout",
          prefix: "layout/",
          collapsable: false,
          children: [
            "sidebar",
            "sidebar",
            {
              title: "页面",
              icon: "page",
              collapsable: false,
              children: ["page", "breadcrumb", "footer"],
            },
            "home",
            "slides",
          ],
        },
        {
          title: "Markdown 增强",
          icon: "markdown",
          prefix: "markdown/",
          collapsable: false,
          children: [
            "intro",
            "components",
            "align",
            "sup-sub",
            "footnote",
            "mark",
            "tex",
            "flowchart",
            "demo",
            "presentation",
            "external",
          ],
        },
        {
          title: "功能",
          icon: "discover",
          prefix: "feature/",
          collapsable: false,
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
          title: "博客",
          icon: "layout",
          prefix: "blog/",
          collapsable: false,
          children: ["intro", "home", "category-and-tags"],
        },
      ],

      "/zh/config/": [
        {
          title: "主题配置",
          icon: "config",
          prefix: "theme/",
          collapsable: false,
          children: ["", "default", "feature", "plugin", "apperance"],
        },
        "page",
        "stylus",
        {
          title: "插件配置",
          icon: "plugin",
          prefix: "plugin/",
          collapsable: false,
          children: ["", "container", "copyright"],
        },
      ],

      "/zh/basic/": [
        {
          title: "Markdown",
          icon: "markdown",
          prefix: "markdown/",
          collapsable: false,
          children: [
            "",
            "demo",
            {
              title: "Emoji",
              icon: "emoji",
              path: "emoji/",
              prefix: "emoji/",
              collapsable: false,
              children: ["people", "nature", "object", "place", "symbol"],
            },
          ],
        },
        {
          title: "VuePress",
          icon: "vue",
          prefix: "vuepress/",
          collapsable: false,
          children: [
            "",
            "file",
            "markdown",
            "plugin",
            "theme",
            "command",
            "case",
          ],
        },
      ],

      "/zh/": ["", "guide/", "config/", "basic/", "FAQ/", "demo/"],
    },
  },
});
```

</CodeGroupItem>
</CodeGroup>

:::
