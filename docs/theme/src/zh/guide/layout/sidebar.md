---
icon: sidebar
category: layout
tags:
  - sidebar
  - layout
---

# 侧边栏

想要使 侧边栏(Sidebar)生效，需要配置 `themeConfig.sidebar`，基本的配置，需要一个包含了多个链接的数组:

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    sidebar: ["/", "/page-a", ["/page-b", "Explicit link text"]],
  },
};
```

你可以省略 `.md` 拓展名，同时以 `/` 结尾的路径将会被视为 `*/README.md`。

侧边栏链接的文字将会被自动获取到 (无论你是声明为页面的第一个 header，还是明确地在 `Front Matter` 中指定页面的标题)。如果你想要显示地指定链接的文字，使用一个格式为 `[link, text]` 的数组。

侧边栏默认启用图标支持，将在侧边栏的链接前显示页面的图标。可以在 `themeConfig` 中将 `sidebarIcon` 设置为 `false` 来禁用它。

## 嵌套的标题链接

默认情况下，侧边栏会自动地显示由当前页面的标题(headers)组成的链接，并按照页面本身的结构进行嵌套，你可以通过 `themeConfig.sidebarDepth` 来修改它的行为。默认的深度(也是最大的深度)是 `2`，它将提取到 `h2` 和 `h3` 的标题，设置成 `0` 将会禁用标题(headers)链接。

也可以使用 `Front Matter` 来为某个页面重写此值:

```md
---
sidebarDepth: 2
---
```

## 显示所有页面的标题链接

默认情况下，侧边栏只会显示由当前活动页面的标题 (headers) 组成的链接，你可以将 `themeConfig.displayAllHeaders` 设置为 `true` 来显示所有页面的标题链接:

```js
module.exports = {
  themeConfig: {
    displayAllHeaders: true, // 默认值: false
  },
};
```

## 活动的标题链接

默认情况下，当用户通过滚动查看页面的不同部分时，嵌套的标题链接和 URL 中的 Hash 值会实时更新，这个行为可以通过以下的配置来禁用:

```js
module.exports = {
  themeConfig: {
    activeHeaderLinks: false, // 默认值: true
  },
};
```

## 侧边栏分组

你可以通过使用**对象**来将侧边栏划分成多个组，你可以使用 `prefix` 来为组内的每个链接添加默认的路径前缀，使用 `icon` 为该分组文字添加一个图标。

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    sidebar: [
      {
        title: "Group 1", // 必要的
        path: "/foo/", // 可选的, 应该是一个绝对路径
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 2, // 可选的, 默认值是 2
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
};
```

侧边栏的每个子组默认是可折叠的，你可以设置 `collapsable: false` 来让一个组永远都是展开状态。

一个侧边栏的子组配置同时支持 [sidebarDepth](#嵌套的标题链接) 字段用于重写默认显示的侧边栏深度(`2`)。

## 多个侧边栏

如果你想为不同的页面组来显示不同的侧边栏，首先，将你的页面文件组织成下述的目录结构:

```md
.
├─ README.md
├─ contact.md
├─ about.md
├─ foo/
│ ├─ README.md
│ ├─ one.md
│ └─ two.md
└─ bar/
├─ README.md
├─ three.md
└─ four.md
```

接着，遵循以下的侧边栏配置:

```js
// .vuepress/config.js
module.exports = {
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
};
```

::: warning
确保 fallback 侧边栏被最后定义。VuePress 会按顺序遍历侧边栏配置来寻找匹配的配置。
:::

## 自动生成侧栏

如果你希望自动生成一个仅仅包含了当前页面标题(headers)链接的侧边栏，你可以通过 `Front matter` 来实现:

```yaml
---
sidebar: auto
---

```

你也可以通过配置来在所有页面中启用它:

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    sidebar: "auto",
  },
};
```

在 [多语言](https://v1.vuepress.vuejs.org/zh/guide/i18n.md) 模式下, 你也可以将其应用到某一特定的语言下:

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    "/zh/": {
      sidebar: "auto",
    },
  },
};
```

## 禁用侧边栏

你可以通过 `YAML front matter` 来禁用指定页面的侧边栏:

```yaml
---
sidebar: false
---

```

## 博主信息

如果你配置了博客相关选项，你可以通过配置 `themeConfig.blog.sidebarDisplay` 来决定是否在侧边栏显示博主的名字、头像以及文章与标签的数量。

你可以设置 `'mobile'` 来只在移动视图显示，或者设置 `always`，来保持在侧边栏显示。

## 案例

::: details 本文档的侧边栏配置

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    sidebar: {
      "/zh/guide/": [
        {
          title: "快速上手",
          icon: "creative",
          collapsable: false,
          children: ["", "install"],
        },
        {
          title: "新增功能",
          icon: "discover",
          prefix: "feature/",
          collapsable: false,
          children: [
            "",
            "theme",
            "page-info",
            "comment",
            "blog",
            "encrypt",
            {
              title: "Markdown 增强",
              icon: "markdown",
              prefix: "markdown/",
              children: [
                "",
                "align",
                "sup-sub",
                "footnote",
                "mark",
                "tex",
                "flowchart",
              ],
            },
            "component",
            "seo-sitemap",
            "typescript",
          ],
        },
        {
          title: "布局",
          icon: "layout",
          prefix: "layout/",
          collapsable: false,
          children: ["", "navbar", "sidebar", "page", "home", "blog"],
        },
      ],

      "/zh/config/": [
        "",
        "themeConfig",
        "page",
        "stylus",
        {
          title: "插件配置",
          icon: "extension",
          prefix: "plugin/",
          collapsable: false,
          children: [
            "",
            "last-update",
            "photo-swipe",
            "pwa",
            "reading-time",
            "seo",
            "sitemap",
            "container",
            "copyright",
          ],
        },
      ],

      "/zh/basic/": [
        {
          title: "Markdown",
          prefix: "markdown/",
          icon: "markdown",
          collapsable: false,
          children: [
            "",
            "demo",
            {
              title: "Emoji",
              icon: "emoji",
              path: "emoji/",
              prefix: "emoji/",
              children: ["people", "nature", "object", "place", "symbol"],
            },
          ],
        },
        {
          title: "VuePress",
          prefix: "vuepress/",
          icon: "vue",
          collapsable: false,
          children: ["", "file", "plugin", "theme", "command", "case"],
        },
      ],

      "/zh/": ["", "guide/", "config/", "basic/", "FAQ/", "demo/"],
    },
  },
};
```

:::
