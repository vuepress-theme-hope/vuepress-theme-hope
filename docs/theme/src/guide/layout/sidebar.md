---
title: Sidebar
icon: sidebar
category:
  - Layout
tag:
  - Layout
  - Sidebar
---

The sidebar may contain a list of related documents, document titles, and blogger information in blog mode.

<!-- more -->

## Sidebar links

You should use `themeConfig.sidebar` to control sidebar.

### String format

Just like navbar, you can fill in an array of multiple file links as the basic configuration of the sidebar:

:::: code-group

::: code-group-item TS

```ts
// .vuepress/config.ts
import { defineHopeConfig } from "vuepress-theme-hope";

export default defineHopeConfig({
  themeConfig: {
    sidebar: ["README.md", "guide/README.md", "config/README.md"],
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
    sidebar: ["README.md", "guide/README.md", "config/README.md"],
  },
});
```

:::

::::

Each item of the array will be rendered as a sidebar item.

::: tip

You can omit the `.md` extension, and paths ending with `/` are inferred as `/README.md`.

:::

### Object format

Just like navbar, if you are not satisfied with the page’s icon or feel that the page title is too long, you can configure an object instead. Available configuration items are:

- `text:`: item text
- `link`: item link
- `icon`: item icon (optional)
- `activeMatch`: item active math (optional), support regexp strings

:::: code-group

::: code-group-item TS

```ts
// .vuepress/config.ts
import { defineHopeConfig } from "vuepress-theme-hope";

export default defineHopeConfig({
  themeConfig: {
    sidebar: [
      {
        text: "Guide",
        link: "/guide/README.md",
        icon: "creative",
        // only active in `/guide/`
        activeMatch: "^/guide/$",
      },
      { text: "Config", link: "/config/README.md", icon: "config" },
      {
        text: "FAQ",
        link: "/faq.md",
        icon: "question",
        // active in path starting with `/faq`
        // so it will active in path like `/faq/xxx.html`
        activeMatch: "^/zh/faq/",
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
        text: "Guide",
        link: "/guide/README.md",
        icon: "creative",
        // only active in `/guide/`
        activeMatch: "^/guide/$",
      },
      { text: "Config", link: "/config/README.md", icon: "config" },
      {
        text: "FAQ",
        link: "/faq.md",
        icon: "question",
        // active in path starting with `/faq`
        // so it will active in path like `/faq/xxx.html`
        activeMatch: "^/zh/faq/",
      },
    ],
  },
});
```

:::

::::

::: tip Advanced usage of activeMatch

`activeMatch` gives you the ability to control whether the path is active, for example you may have the following dropdown:

- `/path/`
- `/path/a/`
- `/path/b/`

But you may have multiple folders with files under `/path/`. To avoid mutiple dropown items been actived under route starting with `/path/a/` or `/path/b/`, you can set `activeMatch` option for the first item with `^/path/(?:(?!a/|b/).*)?$`.

:::

### Grouping and Nesting

If you need a sidebar that displays a nested structure, you can group similar links.

You should use [object format](#object-format) and provide an additional `children` option to set the list of links. Like navbar, you can use `prefix` in the sidebar to add a default path prefix to each link in the group, and the sidebar additionally supports setting `collapsable: true` to make the menu group collapsible.

:::: code-group

::: code-group-item TS

```ts
// .vuepress/config.ts
import { defineHopeConfig } from "vuepress-theme-hope";

export default defineHopeConfig({
  themeConfig: {
    sidebar: [
      {
        // required, title of group
        text: "Group 1",
        // optional, icon of group
        icon: "tip",
        // optional, link of group title
        path: "/foo/",
        // optional, will be appended to each item link
        prefix: "/foo/",
        // optional, defaults to false
        collapsable: false,
        // required, items of group
        children: [
          "README.md" /* /foo/index.html */,
          /* ... */
          "geo.md" /* /foo/geo.html */,
        ],
      },
      {
        text: "Group 2",
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
        // required, title of group
        text: "Group 1",
        // optional, icon of group
        icon: "tip",
        // optional, link of group title
        path: "/foo/",
        // optional, will be appended to each item link
        prefix: "/foo/",
        // optional, defaults to false
        collapsable: false,
        // required, items of group
        children: [
          "README.md" /* /foo/index.html */,
          /* ... */
          "geo.md" /* /foo/geo.html */,
        ],
      },
      {
        text: "Group 2",
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

You can also nest Sidebar grouping:

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
            children: ["quz" /* /quz.html */, "xyzzy" /* /xyzzy.html */],
          },
          {
            text: "Sub Group 2",
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
          "baz" /* /baz.html */,
          {
            text: "Sub Group 1",
            children: ["quz" /* /quz.html */, "xyzzy" /* /xyzzy.html */],
          },
          {
            text: "Sub Group 2",
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

:::

::::

You may want to use it with `prefix` to restore the structure of the document easily.

For example, suppose you have a following directory structure:

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

Then you can use the following config:

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

### Multiple Sidebars

To display different sidebars for different page groups, set an object for the sidebar in the format of `path: config`.

For example, if you have the following structure:

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

You can define your sidebar for each section using below configuration:

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

::: warning

You need to pay special attention to the order of object key declaration. Generally speaking, you should put the more precise path first, because VuePress will traverse the key names of the sidebar configuration to find the matching configuration. Once a key name is successfully matched with the current path, it will display the corresponding sidebar configuration.

In this case, the fallback sidebar must be defined last for this reason.

:::

### Auto Sidebar

### Automatically Generate with Titles

To automatically generate a sidebar that contains only the header links for the current page, you can use frontmatter on that page:

```md
---
sidebar: heading
---
```

You can also enable it in all pages by using config:

:::: code-group

::: code-group-item TS

```ts {6}
// .vuepress/config.ts
import { defineHopeConfig } from "vuepress-theme-hope";

export default defineHopeConfig({
  themeConfig: {
    sidebar: "heading",
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
    sidebar: "heading",
  },
});
```

:::

::::

### Automatically Generate from file structure <Badge text="New" />

You can replace the original "sidebarConfig array" with `"structure"` keyword in any of the above sidebar config. This will allow the theme to automatically read local files, then generate sidebar from file structure for you, to reduce your config workload.

For example, for the following example mentioned earlier in [multiple sidebars](#multiple-sidebars):

```
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

You can change the original config to:

:::: code-group

::: code-group-item TS

```ts {7,9}
// .vuepress/config.ts
import { defineHopeConfig } from "vuepress-theme-hope";

export default defineHopeConfig({
  themeConfig: {
    sidebar: {
      "/foo/": "structure",

      "/bar/": "structure",

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

```js {7,9}
// .vuepress/config.js
const { defineHopeConfig } = require("vuepress-theme-hope");

module.exports = defineHopeConfig({
  themeConfig: {
    sidebar: {
      "/foo/": "structure",

      "/bar/": "structure",

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

In the above modification, since the original sidebar array is all files under the relevant path, you can easily replace it with the `"structure"` keyword.

If you use the structure to generate a folder with other folders nested under it and **the folder contains a `README.md` file**, the corresponding folder will be rendered as a group. So you can even be more aggressive, for example setting `sidebar: "structure"` to have your sidebars all auto-generated from the file structure.

#### Advanced Control

During the automatic generation from the structure, you can control whether files in the same folder are included and how they are sorted through the `index` option in the page Frontmatter.

`index` option supports boolean values ​​and numbers, when set to `false` it means you don't want the page to be indexed by the sidebar. When set to a positive integer, item with smaller value will appear first.

::: tip

`README.md` is an exception, as long as you don't disable it from the sidebar via `index: false` or make it as group link, it will allways be the first item in the sort.

:::

For nested folders, the grouping information is controlled by `README.md` under that folder. You can control the behavior of folder grouping through the `dir` option in Frontmatter. The relevant optional items are as follows:

```ts
interface SidebarDirInfo {
  /**
   * Directory title
   *
   * @default README.md title
   */
  text?: string;

  /**
   * Directory icon
   *
   * @default README.md icon
   */
  icon?: string;

  /**
   * Whether the directory is collapsible
   *
   * @default true
   */

  collapsable?: boolean;

  /**
   * Whether the directory is clickable
   *
   * @description will set the link of the directory grouping to the link corresponding to README.md
   *
   * @default false
   */

  link?: boolean;

  /**
   * Dir index
   *
   * @default true
   */
  index?: number | boolean;
}
```

### Disabling the Sidebar

You can disable the sidebar on a specific page with `YAML front matter`:

```md
---
sidebar: false
---
```

::: note

Sidebar is disabled by default in home page.

:::

## Nested header links

The sidebar automatically displays links for headers in the current active page, nested under the link for the page itself. You can customize this behavior using `themeConfig.headingDepth`. The default depth(the max value) is `2`, which extracts both `h2` and `h3` headers. Setting it to `0` disables the header links.

A page can also override this value via frontmatter:

```md
---
headingDepth: 2
---
```

::: note

The valid maximum value depends on which levels of headers you have extracted via [markdown.extractHeaders.level](https://v2.vuepress.vuejs.org/reference/config.html#markdown-extractheaders).

Since the default value of [markdown.extractHeaders.level](https://v2.vuepress.vuejs.org/reference/config.html#markdown-extractheaders) is `[2, 3]`, so The default maximum value for `headingDepth` is `2`.

:::

### Active Header Links

By default, the nested header links and the hash in the URL are updated as the user scrolls to view the different sections of the page. This behavior can be disabled with the following theme config:

:::: code-group

::: code-group-item TS

```ts {8}
// .vuepress/config.ts
import { defineHopeConfig } from "vuepress-theme-hope";

export default defineHopeConfig({
  themeConfig: {
    plugins: {
      // Default: true
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
      // Default: true
      activeHeaderLinks: false,
    },
  },
});
```

:::

::::

## Icon Support

Icon support is enabled in the sidebar by default, and the icon of the page will be displayed before the link in the sidebar (by reading `icon` field in frontmatter). It can be disabled by setting `sidebarIcon` to `false` in `themeConfig`.

## I18n Support

The theme’s navbar supports [I18n](https://v2.vuepress.vuejs.org/guide/i18n.html), so you can set sidebar individually in each language:

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
          /* English config under root */
        ],
      },
      "/zh/": {
        sidebar: [
          /* Chinese config under zh folder */
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
          /* English config under root */
        ],
      },
      "/zh/": {
        sidebar: [
          /* Chinese config under zh folder */
        ],
      },
    },
  },
});
```

:::

::::

## Types and Helpers

`vuepress-theme-hope` exports the type of sidebar as `HopeThemeSideConfig`, and provides a `defineSidebarConfig` helper function. They can provide validation and autocompletion of sidebar configuration in TS and JS.

::: tip

In order to deal with the situation when you split [multi-sidebar configuration](#multiple-sidebars) into multiple parts, we also provide `HopeThemeSidebarArrayConfig` `HopeThemeSidebarObjectConfig` type and `defineSidebarArrayConfig` and `defineSidebarObjectConfig` Helper function.

:::

:::: code-group

::: code-group-item TS Helper

```ts {6}
// .vuepress/sidebar.ts
import { defineSidebarConfig } from "vuepress-theme-hope";

export default defineSidebarConfig(/* Your sidebar configuration */);
```

:::

::: code-group-item TS Types

```ts {4}
// .vuepress/navbar.ts
import type { HopeThemeSidebarConfig } from "vuepress-theme-hope";

const sidebarConfig: HopeThemeSidebarConfig = [
  /* Your sidebar configuration */
];

export default sidebarConfig;
```

:::

::: code-group-item JS

```js
// .vuepress/sidebar.js
const { defineSidebarConfig } = require("vuepress-theme-hope");

module.exports = defineSidebarConfig(/* Your sidebar configuration */);
```

:::

::::

## Demo

::::: details Configuration of this documentation

:::: code-group

::: code-group-item TS

@[code](../../.vuepress/sidebar/en.ts)

:::

::: code-group-item JS

```js
// .vuepress/config.js
const { defineSidebarConfig } = require("vuepress-theme-hope");

module.exports = defineSidebarConfig({
  "/guide/": [
    {
      text: "Get Started",
      icon: "creative",
      prefix: "get-started/",
      collapsable: true,
      children: ["intro", "install", "markdown"],
    },
    {
      text: "Interface",
      icon: "palette",
      prefix: "interface/",
      collapsable: true,
      children: ["darkmode", "theme-color", "icon", "accessibility", "others"],
    },
    {
      text: "Layout",
      icon: "layout",
      prefix: "layout/",
      collapsable: true,
      children: [
        "navbar",
        "sidebar",
        "page",
        "breadcrumb",
        "footer",
        "home",
        "slides",
      ],
    },
    {
      text: "Markdown enhance",
      icon: "markdown",
      prefix: "markdown/",
      collapsable: true,
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
      text: "Features",
      icon: "discover",
      prefix: "feature/",
      collapsable: true,
      children: [
        "page-info",
        "comment",
        "copy-code",
        "photo-swipe",
        "meta",
        "encrypt",
        "pwa",
        "feed",
        "seo",
        "sitemap",
      ],
    },
    {
      text: "Blog",
      icon: "blog",
      prefix: "blog/",
      collapsable: true,
      children: ["intro", "article", "category-and-tags", "timeline", "home"],
    },
  ],

  "/config/": [
    "intro",
    "i18n",
    {
      text: "Theme Config",
      icon: "config",
      prefix: "theme/",
      children: ["", "basic", "feature", "layout", "apperance"],
    },
    {
      text: "Plugin Config",
      icon: "plugin",
      prefix: "plugins/",
      children: [
        "intro",
        "blog",
        "comment",
        "feed",
        "md-enhance",
        "pwa",
        "others",
      ],
    },
    "page",
    "style",
  ],

  "/cookbook/": [
    "tutorial",
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
      children: ["", "page", "markdown", "file", "config", "plugin", "theme"],
    },
  ],

  "/": [
    "",
    {
      text: "Guide",
      icon: "creative",
      prefix: "guide/",
      children: [
        "get-started/",
        "interface/",
        "layout/",
        "markdown/",
        "feature/",
        "blog/",
      ],
    },
    {
      text: "Config",
      icon: "config",
      prefix: "config/",
      children: ["intro", "i18n", "theme/", "plugins/", "page", "style"],
    },
    {
      text: "Cookbook",
      icon: "guide",
      prefix: "cookbook/",
      children: ["tutorial", "markdown/", "vuepress/"],
    },
    {
      text: "Migration",
      icon: "change",
      prefix: "migration",
      children: ["config", "page", "style"],
    },
    "changelog",
    "faq",
    "demo/",
    "contribution",
  ],
});
```

:::

::::

:::::
