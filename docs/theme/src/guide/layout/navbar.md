---
title: NavBar
icon: navbar
category:
  - Layout
tag:
  - Layout
  - Navbar
---

The Navbar may contain your site title, [Search Box](#search-box), [Navbar Links](#navbar-links), [Languages](https://v1.vuepress.vuejs.org/guide/i18n.html), [Repository Link](#git-repo-and-edit-links) and [outlook panel](#outlook-panel). They all depend on your configuration.

<!-- more -->

## Navbar Links

You can add links to the navbar via `themeConfig.navbar`, it accepts an array.

### String format

The easiest way to configure the navigation bar is to fill in the paths of the page files to be displayed in turn, so that the text, icons and links of the item will be automatically generated from the corresponding files.

:::: code-group

::: code-group-item TS

```ts
// .vuepress/config.ts
import { defineHopeConfig } from "vuepress-theme-hope";

export default defineHopeConfig({
  themeConfig: {
    navbar: ["/guide/README.md", "/config/README.md", "/faq.md"],
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
    navbar: ["/guide/README.md", "/config/README.md", "/faq.md"],
  },
});
```

:::

::::

::: tip

You can omit the `.md` extension, and paths ending with `/` are inferred as `/README.md`.

:::

### Object format

<!-- TODO: Add activeMatch and other info -->

If you are not satisfied with the page’s icon or feel that the page title is too long, you can configure an object instead. Available configuration items are:

- `text:`: item text
- `link`: item link
- `icon`: item icon

:::: code-group

::: code-group-item TS

```ts
// .vuepress/config.ts
import { defineHopeConfig } from "vuepress-theme-hope";

export default defineHopeConfig({
  themeConfig: {
    navbar: [
      { text: "Guide", link: "/guide/README.md", icon: "creative" },
      { text: "Config", link: "/config/README.md", icon: "config" },
      { text: "FAQ", link: "/faq.md", icon: "question" },
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
      { text: "Guide", link: "/guide/README.md", icon: "creative" },
      { text: "Config", link: "/config/README.md", icon: "config" },
      { text: "FAQ", link: "/faq.md", icon: "question" },
    ],
  },
});
```

:::

::::

### Dropdown list

If you need to display more links, you can group similar links into a dropdown list.

You need use object format and provide the additional `children` option to nest links:

:::: code-group

::: code-group-item TS

```ts
// .vuepress/config.ts
import { defineHopeConfig } from "vuepress-theme-hope";

export default defineHopeConfig({
  themeConfig: {
    navbar: [
      {
        text: "Basic",
        icon: "info",
        children: ["/basic/markdown.md", "/basic/vuepress.md"],
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
        text: "Basic",
        icon: "info",
        children: ["/basic/markdown.md", "/basic/vuepress.md"],
      },
    ],
  },
});
```

:::

::::

In most cases, the grouped items in the navigation bar belong to the same category and will be placed in the same subdirectory, and they have the same path prefix.

To simplify the configuration, you can add the `prefix` field to add a prefix to each sub-link in the group:

:::: code-group

::: code-group-item TS

```ts
// .vuepress/config.ts
import { defineHopeConfig } from "vuepress-theme-hope";

export default defineHopeConfig({
  themeConfig: {
    navbar: [
      {
        text: "Basic",
        icon: "info",
        prefix: "/basic/",
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
        text: "Basic",
        icon: "info",
        prefix: "/basic/",
        children: ["markdown.md", "vuepress.md"],
      },
    ],
  },
});
```

:::

::::

You can also have sub groups inside a dropdown by having nested `children`:

:::: code-group

::: code-group-item TS

```ts
// .vuepress/config.ts
import { defineHopeConfig } from "vuepress-theme-hope";

export default defineHopeConfig({
  themeConfig: {
    navbar: [
      {
        text: "Project",
        icon: "info",
        children: [
          {
            text: "Built in Plugins",
            icon: "plugin",
            children: [
              /* Some items */
            ],
          },
          {
            text: "Third party Plugins",
            icon: "plugin",
            children: [
              /* Some items */
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
        text: "Project",
        icon: "info",
        children: [
          {
            text: "Built in Plugins",
            icon: "plugin",
            children: [
              /* Some items */
            ],
          },
          {
            text: "Third party Plugins",
            icon: "plugin",
            children: [
              /* Some items */
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

## Disable navbar

To disable the navbar globally, set `navbar: false` in `themeConfig`:

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

You can disable the navbar for a specific page via `YAML front matter`:

```md
---
navbar: false
---
```

## Site logo

You can use `themeConfig.logo` to configure the logo displayed in navigation bar.

::: note

Please fill in the absolute path and place the logo in `.vuepress/public` folder.

:::

After logo is set, the logo will be displayed on the navigation bar instead of the previous site name on mobile.

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

You can set `themeConfig.logoDark` to display another logo in dark mode.

:::

## I18n Support

The theme’s navbar supports [I18n](https://v2.vuepress.vuejs.org/guide/i18n.html), so you can set navbar options mentioned above individually in each language:

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
          /* English config under root */
        ],
      },
      "/zh/": {
        logo: "/zh-logo.svg",
        navbar: [
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
        logo: "/logo.svg",
        navbar: [
          /* English config under root */
        ],
      },
      "/zh/": {
        logo: "/zh-logo.svg",
        navbar: [
          /* Chinese config under zh folder */
        ],
      },
    },
  },
});
```

:::

::::

## Search Box

Like the default theme, `vuepress-theme-hope` brings built-in support for search plugins. You can enable the following plugins according to your own needs. The corresponding search box will automatically appear in the navigation bar.

### Built-in Search

You can implement local search via the `@vuepress/plugin-search` plugin. By default, the plugin will only extract page headings to generate search index.

For related configuration and instructions, see [official documentation][plugin-search].

### Algolia DocSearch

You can implement Algolia-based search via the `@vuepress/plugin-docsearch` plugin.

You need to [submit the URL of your site](https://docsearch.algolia.com/apply/) to join the DocSearch program. The DocSearch team will send [apiKey](#apikey) and [indexName](#indexname) to your email once the index is generated. Then you can configure this plugin to enable DocSearch in VuePress.

Alternatively, you can [run your own crawler](https://docsearch.algolia.com/docs/run-your-own/) to generate the index, and then use your own [appId](#appId), [apiKey](#apikey) and [indexName](#indexname) to configure this plugin.

For related configuration and instructions, see [Official Documentation][plugin-docsearch].

<!-- TODO: Add clawer config -->

## Git repository and Edit Links

Providing `themeConfig.repo` auto generates a repo button in the navbar.

You can control whether showing the repository button via `themeConfig.repoDisplay`.

:::: code-group

::: code-group-item TS

```ts
// .vuepress/config.ts
import { defineHopeConfig } from "vuepress-theme-hope";

export default defineHopeConfig({
  themeConfig: {
    // Assumes GitHub. Can also be a full GitLab url.
    repo: "vuejs/vuepress",
    // Customising the header label
    // Defaults to "GitHub" / "GitLab" / "Gitee" / "Bitbucket" or "Source" depending on `themeConfig.repo`
    repoLabel: "GitHub",
    // Whether to display repo link, default is `true`
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
    // Assumes GitHub. Can also be a full GitLab url.
    repo: "vuejs/vuepress",
    // Customising the header label
    // Defaults to "GitHub" / "GitLab" / "Gitee" / "Bitbucket" or "Source" depending on `themeConfig.repo`
    repoLabel: "GitHub",
    // Whether to display repo link, default is `true`
    repoDisplay: true,
  },
});
```

:::

::::

## Outlook Popup

The following three functions are provided:

- [Theme color switch](../interface/theme-color.md)
- [Dark Mode](../interface/darkmode.md)
- [FullScreen button](../interface/others.md#fullscreen-button)

## Types and Helpers

`vuepress-theme-hope` exports the type of navigation bar as `HopeThemeNavbarConfig`, and provides a `defineNavbarConfig` helper function. They can provide validation and autocompletion of navbar configuration in TS and JS.

::: tip

They mainly deal with scenarios when you split your VuePress configuration into multiple parts.

:::

:::: code-group

::: code-group-item TS Helper

```ts
// .vuepress/navbar.ts
import { defineNavbarConfig } from "vuepress-theme-hope";

export default defineNavbarConfig([
  /* Your navbar configuration */
]);
```

:::

::: code-group-item TS Type

```ts
// .vuepress/navbar.ts
import type { HopeThemeNavbarConfig } from "vuepress-theme-hope";

const navbarConfig: HopeThemeNavbarConfig = [
  /* Your navbar configuration */
];

export default navbarConfig;
```

:::

::: code-group-item JS

```js
// .vuepress/navbar.js
const { defineNavbarConfig } = require("vuepress-theme-hope");

module.exports = defineNavbarConfig([
  /* Your navbar configuration */
]);
```

:::

::::

## Demo

::::: details Configuration of this documentation

:::: code-group

::: code-group-item TS

```ts
// .vuepress/config.ts
import { defineNavbarConfig } from "vuepress-theme-hope";

export default defineNavbarConfig([
  "/guide/",
  "/config/",
  "/faq/",
  {
    text: "Basic",
    icon: "info",
    prefix: "/basic/",
    children: ["tutorial", "markdown/", "vuepress/"],
  },
  "/migration/",
  {
    text: "Project",
    icon: "info",
    children: [
      "/changelog",
      "/demo/",
      "/contribution",
      {
        text: "Plugins",
        icon: "plugin",
        children: [
          {
            text: "AddThis Plugin",
            icon: "share",
            link: "https://vuepress-theme-hope.github.io/v2/add-this/",
          },
          {
            text: "Blog Plugin",
            icon: "blog",
            link: "https://vuepress-theme-hope.github.io/v2/blog/",
          },
          {
            text: "Comment Plugin",
            icon: "comment",
            link: "https://vuepress-theme-hope.github.io/v2/comment/",
          },
          {
            text: "Components Plugin",
            icon: "plugin",
            link: "https://vuepress-theme-hope.github.io/v2/components/",
          },
          {
            text: "Copy Code Plugin",
            icon: "copy",
            link: "https://vuepress-theme-hope.github.io/v2/copy-code/",
          },
          {
            text: "Feed Plugin",
            icon: "rss",
            link: "https://vuepress-theme-hope.github.io/v2/feed/",
          },
          {
            text: "LightGallery Plugin",
            icon: "pic",
            link: "https://vuepress-theme-hope.github.io/v2/lightgallery/",
          },
          {
            text: "Markdown Enhance Plugin",
            icon: "markdown",
            link: "https://vuepress-theme-hope.github.io/v2/md-enhance/",
          },
          {
            text: "Photo Swipe Plugin",
            icon: "pic",
            link: "https://vuepress-theme-hope.github.io/v2/photo-swipe/",
          },
          {
            text: "PWA Plugin",
            icon: "app",
            link: "https://vuepress-theme-hope.github.io/v2/pwa/",
          },
          {
            text: "Reading Time Plugin",
            icon: "read",
            link: "https://vuepress-theme-hope.github.io/v2/reading-time/",
          },
          {
            text: "Sass Palette Plugin",
            icon: "palette",
            link: "https://vuepress-theme-hope.github.io/v2/sass-palette/",
          },
          {
            text: "Seo Plugin",
            icon: "strong",
            link: "https://vuepress-theme-hope.github.io/v2/seo/",
          },
        ],
      },
    ],
  },
]);
```

:::

::: code-group-item JS

```js
// .vuepress/navbar.js
const { defineNavbarConfig } = require("vuepress-theme-hope");

module.exports = defineNavbarConfig([
  "/guide/",
  "/config/",
  "/faq/",
  {
    text: "Basic",
    icon: "info",
    prefix: "/basic/",
    children: ["tutorial", "markdown/", "vuepress/"],
  },
  "/migration/",
  {
    text: "Project",
    icon: "info",
    children: [
      "/changelog",
      "/demo/",
      "/contribution",
      {
        text: "Plugins",
        icon: "plugin",
        children: [
          {
            text: "AddThis Plugin",
            icon: "share",
            link: "https://vuepress-theme-hope.github.io/v2/add-this/",
          },
          {
            text: "Blog Plugin",
            icon: "blog",
            link: "https://vuepress-theme-hope.github.io/v2/blog/",
          },
          {
            text: "Comment Plugin",
            icon: "comment",
            link: "https://vuepress-theme-hope.github.io/v2/comment/",
          },
          {
            text: "Components Plugin",
            icon: "plugin",
            link: "https://vuepress-theme-hope.github.io/v2/components/",
          },
          {
            text: "Copy Code Plugin",
            icon: "copy",
            link: "https://vuepress-theme-hope.github.io/v2/copy-code/",
          },
          {
            text: "Feed Plugin",
            icon: "rss",
            link: "https://vuepress-theme-hope.github.io/v2/feed/",
          },
          {
            text: "LightGallery Plugin",
            icon: "pic",
            link: "https://vuepress-theme-hope.github.io/v2/lightgallery/",
          },
          {
            text: "Markdown Enhance Plugin",
            icon: "markdown",
            link: "https://vuepress-theme-hope.github.io/v2/md-enhance/",
          },
          {
            text: "Photo Swipe Plugin",
            icon: "pic",
            link: "https://vuepress-theme-hope.github.io/v2/photo-swipe/",
          },
          {
            text: "PWA Plugin",
            icon: "app",
            link: "https://vuepress-theme-hope.github.io/v2/pwa/",
          },
          {
            text: "Reading Time Plugin",
            icon: "read",
            link: "https://vuepress-theme-hope.github.io/v2/reading-time/",
          },
          {
            text: "Sass Palette Plugin",
            icon: "palette",
            link: "https://vuepress-theme-hope.github.io/v2/sass-palette/",
          },
          {
            text: "Seo Plugin",
            icon: "strong",
            link: "https://vuepress-theme-hope.github.io/v2/seo/",
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

[plugin-search]: https://v2.vuepress.vuejs.org/reference/plugin/search.html
[plugin-docsearch]: https://v2.vuepress.vuejs.org/reference/plugin/docsearch.html
