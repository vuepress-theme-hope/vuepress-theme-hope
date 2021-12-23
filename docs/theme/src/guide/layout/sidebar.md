---
title: Sidebar
icon: sidebar
category: layout
tags:
  - sidebar
  - layout
---

To enable the sidebar, use `themeConfig.sidebar`. The basic configuration expects an Array of links:

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

Each item of the array will be rendered as a sidebar item.

You can omit the `.md` extension, and paths ending with `/` are inferred as `*/README.md`.

Icon support is enabled in the sidebar by default, and the icon of the page will be displayed before the link in the sidebar (by reading `icon` field in frontmatter). It can be disabled by setting `sidebarIcon` to `false` in `themeConfig`.

The text for the link is automatically inferred (`title` field in frontmatter, then first header in the page). To explicitly specify the link text, use an array in form of `[link, text]`.

::: details Demo

<CodeGroup>
<CodeGroupItem title="js">

```js
// .vuepress/config.js
const { config } = require("vuepress-theme-hope");

module.exports = config({
  themeConfig: {
    sidebar: [
      "/",
      "/page-a",
      ["/page-b", "This text will be the title of `page-b`"],
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
      "/",
      "/page-a",
      ["/page-b", "This text will be the title of `page-b`"],
    ],
  },
});
```

</CodeGroupItem>
</CodeGroup>

:::

<!-- more -->

## Nested Header Links

The sidebar automatically displays links for headers in the current active page, nested under the link for the page itself. You can customize this behavior using `themeConfig.sidebarDepth`. The default depth(the max value) is `2`, which extracts both `h2` and `h3` headers. Setting it to `0` disables the header links.

A page can also override this value via frontmatter:

```md
---
sidebarDepth: 2
---
```

## Displaying Header Links of All Pages

The sidebar only displays links for headers in the current active page. You can display all header links for every page with `themeConfig.displayAllHeaders: true`:

<CodeGroup>
<CodeGroupItem title="js">

```js {6}
// .vuepress/config.js
const { config } = require("vuepress-theme-hope");

module.exports = config({
  themeConfig: {
    displayAllHeaders: true, // Default: false
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
    displayAllHeaders: true, // Default: false
  },
});
```

</CodeGroupItem>
</CodeGroup>

### Active Header Links

By default, the nested header links and the hash in the URL are updated as the user scrolls to view the different sections of the page. This behavior can be disabled with the following theme config:

<CodeGroup>
<CodeGroupItem title="js">

```js {6}
// .vuepress/config.js
const { config } = require("vuepress-theme-hope");

module.exports = config({
  themeConfig: {
    activeHeaderLinks: false, // Default: true
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
    activeHeaderLinks: false, // Default: true
  },
});
```

</CodeGroupItem>
</CodeGroup>

### Sidebar Groups

You can divide the sidebar into multiple groups by using **Objects**. By default, each group will be rendered into a menu that can be opened and collapsed. The menu item is each group link set by `children` in the group.

You can use `prefix` field to add a default path prefix to each link in the group, and `icon` field to add an icon to the group text.

Sidebar groups are collapsable by default. You can force a group to be always open with `collapsable: false`.

A sidebar group config also supports [sidebarDepth](#nested-header-links) field to override the default sidebar depth (`2`).

<CodeGroup>
<CodeGroupItem title="js">

```js
// .vuepress/config.js
const { config } = require("vuepress-theme-hope");

module.exports = config({
  themeConfig: {
    sidebar: [
      {
        // required, title of group
        title: "Group 1",
        // optional, icon of group
        icon: "bar",
        // optional, link of group title
        path: "/foo/",
        // optional, will be appended to each item link
        prefix: "/foo/",
        // optional, defaults to true
        collapsable: false,
        // optional, defaults to 2
        sidebarDepth: 2,
        // required, items of group
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
        // required, title of group
        title: "Group 1",
        // optional, icon of group
        icon: "bar",
        // optional, link of group title
        path: "/foo/",
        // optional, will be appended to each item link
        prefix: "/foo/",
        // optional, defaults to true
        collapsable: false,
        // optional, defaults to 2
        sidebarDepth: 2,
        // required, items of group
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

::: details Demo

<CodeGroup>
<CodeGroupItem title="js">

```js
// .vuepress/config.js
const { config } = require("vuepress-theme-hope");

module.exports = config({
  themeConfig: {
    sidebar: [
      {
        title: "Get Started",
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
        title: "Interface",
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
        title: "Get Started",
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
        title: "Interface",
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

You can also nest Sidebar grouping:

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

Please pay special attention to the addition of `/` when configuring the sidebar. For performance considerations, we will assume that the user has correctly configured the sidebar, so we won’t perform any resolveing and verification on the path (such as traversing pages for comparison verification), but directly splicing and generating it.

Please pay attention to whether your configuration can be spliced into the correct path.

For example, `bar/foo/` is expecting, while `bar` lacks a trailing `/` and `foo` isn’t with a prefix `/` resulting in `barfoo/`, or both are configured and an incorrect `bar//foo` is generated. They will cause parsing errors so the item won’t be rendered.

:::

::: tip

For the above reason, we will print any broken sidebar links in the console where the corresponding page cannot be found. This means that your misconfiguration can be easily tracked and corrected.

:::

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

You need to pay special attention to the order of object key declaration. Generally speaking, you should put the more precise path first, because VuePress will traverse the key names of the sidebar configuration to find the matching configuration. Once a key name is successfully matched with the current path, it will display the corresponding sidebar configuration.

In this case, the fallback sidebar must be defined last for this reason.

:::

### Auto Sidebar for Single Pages

To automatically generate a sidebar that contains only the header links for the current page, you can use frontmatter on that page:

```md
---
sidebar: auto
---
```

You can also enable it in all pages by using config:

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

### Disabling the Sidebar

You can disable the sidebar on a specific page with `YAML front matter`:

```md
---
sidebar: false
---
```

## Muti language support

In [multi-language](https://v1.vuepress.vuejs.org/guide/i18n.html) mode, you can also apply it to a specific locale:

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
          /* your config */
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
          /* your config */
        ],
      },
    },
  },
});
```

</CodeGroupItem>
</CodeGroup>

## Blogger Information

If you have configured blog related options, you can configure `themeConfig.blog.sidebarDisplay` to decide whether to display the blogger’s name, avatar, and the number of articles and tags in the sidebar.

You can set `'mobile'` to display only in mobile view, or set `always` to keep it displayed in the sidebar.

## `sidebarConfig`

We provide a `sidebarConfig` Helper function. You can import it from `vuepress-theme-hope` and wrap your navigation bar configuration to let the editor provide auto-completion and help you verify the sidebar configuration.

<CodeGroup>
<CodeGroupItem title="js">

```js
// .vuepress/sidebar.js
const { sidebarConfig } = require("vuepress-theme-hope");

module.exports = sidebarConfig(/* Your sidebar configuration */);
```

</CodeGroupItem>

<CodeGroupItem title="ts">

```ts {6}
// .vuepress/sidebar.ts
import theme from "vuepress-theme-hope";

export default theme.sidebarConfig(/* Your sidebar configuration */);
```

</CodeGroupItem>
</CodeGroup>

::: tip

When you are spliting VuePress configuration into multiple parts, you can use this helper function to keep automatic completion and verification.

:::

## Demo

::: details Configuration of this documentation

<CodeGroup>
<CodeGroupItem title="js">

```js
// .vuepress/config.js
const { config } = require("vuepress-theme-hope");

module.exports = config({
  themeConfig: {
    sidebar: {
      "/guide/": [
        {
          title: "Get Started",
          icon: "creative",
          prefix: "get-started/",
          collapsable: false,
          children: ["intro", "install", "markdown"],
        },
        {
          title: "Interface",
          icon: "skin",
          prefix: "interface/",
          collapsable: false,
          children: ["darkmode", "theme-color", "icon", "others"],
        },
        {
          title: "Layout",
          icon: "layout",
          prefix: "layout/",
          collapsable: false,
          children: [
            "sidebar",
            "sidebar",
            {
              title: "Page",
              icon: "page",
              collapsable: false,
              children: ["page", "breadcrumb", "footer"],
            },
            "home",
            "slides",
          ],
        },
        {
          title: "Markdown enhance",
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
          title: "Features",
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
          title: "Blog",
          icon: "layout",
          prefix: "blog/",
          collapsable: false,
          children: ["intro", "home", "category-and-tags"],
        },
      ],

      "/config/": [
        {
          title: "ThemeConfig",
          icon: "config",
          prefix: "theme/",
          collapsable: false,
          children: ["", "default", "feature", "plugin", "apperance"],
        },
        "page",
        "stylus",
        {
          title: "Plugins",
          icon: "plugin",
          prefix: "plugin/",
          collapsable: false,
          children: ["", "container", "copyright"],
        },
      ],

      "/basic/": [
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

      "/": ["", "guide/", "config/", "basic/", "FAQ/", "demo/"],
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
      "/guide/": [
        {
          title: "Get Started",
          icon: "creative",
          prefix: "get-started/",
          collapsable: false,
          children: ["intro", "install", "markdown"],
        },
        {
          title: "Interface",
          icon: "skin",
          prefix: "interface/",
          collapsable: false,
          children: ["darkmode", "theme-color", "icon", "others"],
        },
        {
          title: "Layout",
          icon: "layout",
          prefix: "layout/",
          collapsable: false,
          children: [
            "sidebar",
            "sidebar",
            {
              title: "Page",
              icon: "page",
              collapsable: false,
              children: ["page", "breadcrumb", "footer"],
            },
            "home",
            "slides",
          ],
        },
        {
          title: "Markdown enhance",
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
          title: "Features",
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
          title: "Blog",
          icon: "layout",
          prefix: "blog/",
          collapsable: false,
          children: ["intro", "home", "category-and-tags"],
        },
      ],

      "/config/": [
        {
          title: "ThemeConfig",
          icon: "config",
          prefix: "theme/",
          collapsable: false,
          children: ["", "default", "feature", "plugin", "apperance"],
        },
        "page",
        "stylus",
        {
          title: "Plugins",
          icon: "plugin",
          prefix: "plugin/",
          collapsable: false,
          children: ["", "container", "copyright"],
        },
      ],

      "/basic/": [
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

      "/": ["", "guide/", "config/", "basic/", "FAQ/", "demo/"],
    },
  },
});
```

</CodeGroupItem>
</CodeGroup>

:::
