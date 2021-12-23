---
title: NavBar
icon: navbar
category: layout
tags:
  - navbar
  - layout
---

The Navbar may contain your site title, [Search Box](#search-box), [Navbar Links](#navbar-links), [Languages](https://v1.vuepress.vuejs.org/guide/i18n.html) and [Repository Link](#git-repo-and-edit-links), they all depend on your configuration.

<!-- more -->

## Navbar Links

You can add links to the navbar via `themeConfig.nav`.

The basic configuration items are `text` navigation bar text, `link` navigation bar link, and `icon` navigation bar icon:

<CodeGroup>
<CodeGroupItem title="js">

```js
// .vuepress/config.js
const { config } = require("vuepress-theme-hope");

module.exports = config({
  themeConfig: {
    nav: [
      { text: "Guide", link: "/guide/", icon: "creative" },
      { text: "Config", link: "/config/", icon: "config" },
      { text: "FAQ", link: "/FAQ/", icon: "question" },
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
      { text: "Guide", link: "/guide/", icon: "creative" },
      { text: "Config", link: "/config/", icon: "config" },
      { text: "FAQ", link: "/FAQ/", icon: "question" },
    ],
  },
});
```

</CodeGroupItem>
</CodeGroup>

These links can also be dropdown menus if you provide an array of `items` instead of a `link`:

<CodeGroup>
<CodeGroupItem title="js">

```js
// .vuepress/config.js
const { config } = require("vuepress-theme-hope");

module.exports = config({
  themeConfig: {
    nav: [
      {
        text: "Basic",
        icon: "info",
        items: [
          { text: "Markdown", link: "/basic/markdown/", icon: "markdown" },
          { text: "VuePress", link: "/basic/vuepress/", icon: "vue" },
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
        text: "Basic",
        icon: "info",
        items: [
          { text: "Markdown", link: "/basic/markdown/", icon: "markdown" },
          { text: "VuePress", link: "/basic/vuepress/", icon: "vue" },
        ],
      },
    ],
  },
});
```

</CodeGroupItem>
</CodeGroup>

In most cases, the grouped items in the navigation bar belong to the same category and will be placed in the same subdirectory, and they have the same path prefix. To simplify the configuration, you can add the `prefix` field to add a prefix to each sub-link in the group:

<CodeGroup>
<CodeGroupItem title="js">

```js
// .vuepress/config.js
const { config } = require("vuepress-theme-hope");

module.exports = config({
  themeConfig: {
    nav: [
      {
        text: "Basic",
        icon: "info",
        prefix: "/basic/",
        items: [
          { text: "Markdown", link: "markdown/", icon: "markdown" },
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
        text: "Basic",
        icon: "info",
        prefix: "/basic/",
        items: [
          { text: "Markdown", link: "markdown/", icon: "markdown" },
          { text: "VuePress", link: "vuepress/", icon: "vue" },
        ],
      },
    ],
  },
});
```

</CodeGroupItem>
</CodeGroup>

You can also have sub groups inside a dropdown by having nested `items`:

<CodeGroup>
<CodeGroupItem title="js">

```js
// .vuepress/config.js
const { config } = require("vuepress-theme-hope");

module.exports = config({
  themeConfig: {
    nav: [
      {
        text: "Project",
        icon: "info",
        items: [
          {
            text: "Built in Plugins",
            icon: "plugin",
            items: [
              /* Some items */
            ],
          },
          {
            text: "Third party Plugins",
            icon: "plugin",
            items: [
              /* Some items */
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
        text: "Project",
        icon: "info",
        items: [
          {
            text: "Built in Plugins",
            icon: "plugin",
            items: [
              /* Some items */
            ],
          },
          {
            text: "Third party Plugins",
            icon: "plugin",
            items: [
              /* Some items */
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

::: details Demo

<CodeGroup>
<CodeGroupItem title="js">

```js
// .vuepress/config.js
const { config } = require("vuepress-theme-hope");

module.exports = config({
  themeConfig: {
    nav: [
      {
        text: "Project",
        icon: "info",
        items: [
          {
            text: "Changelog",
            link: "https://github.com/vuepress-theme-hope/vuepress-theme-hope/blob/v1/CHANGELOG.md",
          },
          {
            text: "Repo",
            link: "https://github.com/vuepress-theme-hope/vuepress-theme-hope",
          },
          {
            text: "Theme Demo",
            link: "/demo/",
          },
          {
            text: "Plugins",
            icon: "plugin",
            items: [
              {
                text: "AddThis Plugin",
                link: "https://vuepress-theme-hope.github.io/add-this/",
              },
              {
                text: "Comment Plugin",
                link: "https://vuepress-theme-hope.github.io/comment/",
              },
              {
                text: "Copy Code Plugin",
                link: "https://vuepress-theme-hope.github.io/copy-code/",
              },
              {
                text: "Feed Plugin",
                link: "https://vuepress-theme-hope.github.io/feed/",
              },
              {
                text: "Git Info Plugin",
                link: "https://vuepress-theme-hope.github.io/git/",
              },
              {
                text: "Markdown Enhance Plugin",
                link: "https://vuepress-theme-hope.github.io/md-enhance/",
              },
              {
                text: "Photo Swipe Plugin",
                link: "https://vuepress-theme-hope.github.io/photo-swipe/",
              },
              {
                text: "PWA Plugin",
                link: "https://vuepress-theme-hope.github.io/pwa/",
              },
              {
                text: "Reading Time Plugin",
                link: "https://vuepress-theme-hope.github.io/reading-time/",
              },
              {
                text: "Seo Plugin",
                link: "https://vuepress-theme-hope.github.io/seo/",
              },
              {
                text: "Sitemap Plugin",
                link: "https://vuepress-theme-hope.github.io/sitemap/",
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
        text: "Project",
        icon: "info",
        items: [
          {
            text: "Changelog",
            link: "https://github.com/vuepress-theme-hope/vuepress-theme-hope/blob/v1/CHANGELOG.md",
          },
          {
            text: "Repo",
            link: "https://github.com/vuepress-theme-hope/vuepress-theme-hope",
          },
          {
            text: "Theme Demo",
            link: "/demo/",
          },
          {
            text: "Plugins",
            icon: "plugin",
            items: [
              {
                text: "AddThis Plugin",
                link: "https://vuepress-theme-hope.github.io/add-this/",
              },
              {
                text: "Comment Plugin",
                link: "https://vuepress-theme-hope.github.io/comment/",
              },
              {
                text: "Copy Code Plugin",
                link: "https://vuepress-theme-hope.github.io/copy-code/",
              },
              {
                text: "Feed Plugin",
                link: "https://vuepress-theme-hope.github.io/feed/",
              },
              {
                text: "Git Info Plugin",
                link: "https://vuepress-theme-hope.github.io/git/",
              },
              {
                text: "Markdown Enhance Plugin",
                link: "https://vuepress-theme-hope.github.io/md-enhance/",
              },
              {
                text: "Photo Swipe Plugin",
                link: "https://vuepress-theme-hope.github.io/photo-swipe/",
              },
              {
                text: "PWA Plugin",
                link: "https://vuepress-theme-hope.github.io/pwa/",
              },
              {
                text: "Reading Time Plugin",
                link: "https://vuepress-theme-hope.github.io/reading-time/",
              },
              {
                text: "Seo Plugin",
                link: "https://vuepress-theme-hope.github.io/seo/",
              },
              {
                text: "Sitemap Plugin",
                link: "https://vuepress-theme-hope.github.io/sitemap/",
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

## Disable the Navbar

To disable the navbar globally, use `themeConfig.navbar`:

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

You can disable the navbar for a specific page via `YAML front matter`:

```md
---
navbar: false
---
```

## Navigation bar icon

You can use `themeConfig.logo` to configure the icons of the navigation bar, please fill in the absolute path.

After configuring the icon, the icon will be displayed on the navigation bar instead of the previous site name on the mobile view.

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

You can set `themeConfig.darkLogo` to display another logo in dark mode.

:::

## Search Box

### Built-in Search

You can disable the built-in search box with `themeConfig.search: false`, and customize the number of suggestions will be shown with `themeConfig.searchMaxSuggestions`:

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

You can also disable the built-in search box for individual pages with `YAML front matter`:

```md
---
search: false
---
```

::: tip

Built-in Search only builds index from the title, `h2` and `h3` headers, if you need full text search, you can use [Algolia DocSearch](#algolia-docsearch).

:::

### Algolia DocSearch

The `themeConfig.algolia` option allows you to use [Algolia DocSearch](https://community.algolia.com/docsearch/) to replace the simple built-in search. To enable it, you need to provide at least `apiKey` and `indexName`:

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

::: warning Note

Unlike the [built-in search](#built-in-search) engine which works out of the box, [Algolia DocSearch](https://community.algolia.com/docsearch/) requires you to submit your site to them for indexing before it starts working.

:::

For more options, check out [Algolia DocSearch’s documentation](https://github.com/algolia/docsearch#docsearch-options).

### Search Placeholder

You can define a placeholder for the search box by adding the `searchPlaceholder` attribute:

<CodeGroup>
<CodeGroupItem title="js">

```js
// .vuepress/config.js
const { config } = require("vuepress-theme-hope");

module.exports = config({
  themeConfig: {
    searchPlaceholder: "Search...",
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
    searchPlaceholder: "Search...",
  },
});
```

</CodeGroupItem>
</CodeGroup>

## Git repository and Edit Links

Providing `themeConfig.repo` auto generates a GitHub link in the navbar and `"Edit this page"` links at the bottom of each page.

<CodeGroup>
<CodeGroupItem title="js">

```js
// .vuepress/config.js
const { config } = require("vuepress-theme-hope");

module.exports = config({
  themeConfig: {
    // Assumes GitHub. Can also be a full GitLab url.
    repo: "vuejs/vuepress",
    // Customising the header label
    // Defaults to "GitHub"/"GitLab"/"Bitbucket" depending on `themeConfig.repo`
    repoLabel: "Contribute!",
    // Whether to display repo link, default is `true`
    repoDisplay: true,

    // Optional options for generating "Edit this page" link

    // if your docs are in a different repo from your main project:
    docsRepo: "vuejs/vuepress",
    // if your docs are not at the root of the repo:
    docsDir: "docs",
    // if your docs are in a specific branch (defaults to 'main'):
    docsBranch: "main",
    // defaults to false, set to true to enable
    editLinks: true,
    // default value is true. Allows to hide next page links on all pages
    nextLinks: false,
    // default value is true. Allows to hide prev page links on all pages
    prevLinks: false,
    // custom text for edit link. Defaults to "Edit this page"
    editLinkText: "Help us improve this page!",
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
    // Assumes GitHub. Can also be a full GitLab url.
    repo: "vuejs/vuepress",
    // Customising the header label
    // Defaults to "GitHub"/"GitLab"/"Bitbucket" depending on `themeConfig.repo`
    repoLabel: "Contribute!",
    // Whether to display repo link, default is `true`
    repoDisplay: true,

    // Optional options for generating "Edit this page" link

    // if your docs are in a different repo from your main project:
    docsRepo: "vuejs/vuepress",
    // if your docs are not at the root of the repo:
    docsDir: "docs",
    // if your docs are in a specific branch (defaults to 'main'):
    docsBranch: "main",
    // defaults to false, set to true to enable
    editLinks: true,
    // default value is true. Allows to hide next page links on all pages
    nextLinks: false,
    // default value is true. Allows to hide prev page links on all pages
    prevLinks: false,
    // custom text for edit link. Defaults to "Edit this page"
    editLinkText: "Help us improve this page!",
  },
});
```

</CodeGroupItem>
</CodeGroup>

You can overwrite the following properties on specific pages via `YAML front matter`:

```md
---
editLink: false # Will overwrite 'editLinks' from themeConfig
---
```

## Theme color button

For details, see the [Themecolor](../interface/theme-color.md) section.

## Darkmode button

For details, see the [Darkmode](../interface/darkmode.md) section.

## Full screen button

For details, see the [Full Screen Button](../interface/others.md#fullscreen-button) section.

## `navbarConfig`

We provide a `navbarConfig` Helper function. You can import it from `vuepress-theme-hope` and wrap your navigation bar configuration to let the editor provide auto-completion and help you verify the navbar configuration.

<CodeGroup>
<CodeGroupItem title="js">

```js
// .vuepress/navbar.js
const { navbarConfig } = require("vuepress-theme-hope");

module.exports = navbarConfig(/* Your navbar configuration */);
```

</CodeGroupItem>

<CodeGroupItem title="ts">

```ts
// .vuepress/navbar.ts
import theme from "vuepress-theme-hope";

export default theme.navbarConfig(/* Your navbar configuration */);
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
    nav: [
      { text: "Guide", link: "/guide/", icon: "creative" },
      { text: "Config", link: "/config/", icon: "config" },
      { text: "FAQ", link: "/FAQ/", icon: "question" },
      {
        text: "Basic",
        icon: "info",
        prefix: "/basic/",
        items: [
          { text: "Markdown", link: "markdown/", icon: "markdown" },
          { text: "VuePress", link: "vuepress/", icon: "vue" },
        ],
      },
      {
        text: "Project",
        icon: "info",
        items: [
          {
            text: "Changelog",
            link: "https://github.com/vuepress-theme-hope/vuepress-theme-hope/blob/v1/CHANGELOG.md",
          },
          {
            text: "Repo",
            link: "https://github.com/vuepress-theme-hope/vuepress-theme-hope",
          },
          {
            text: "Theme Demo",
            link: "/demo/",
          },
          {
            text: "Plugins",
            icon: "plugin",
            items: [
              {
                text: "AddThis Plugin",
                link: "https://vuepress-theme-hope.github.io/add-this/",
              },
              {
                text: "Comment Plugin",
                link: "https://vuepress-theme-hope.github.io/comment/",
              },
              {
                text: "Copy Code Plugin",
                link: "https://vuepress-theme-hope.github.io/copy-code/",
              },
              {
                text: "Feed Plugin",
                link: "https://vuepress-theme-hope.github.io/feed/",
              },
              {
                text: "Git Info Plugin",
                link: "https://vuepress-theme-hope.github.io/git/",
              },
              {
                text: "Markdown Enhance Plugin",
                link: "https://vuepress-theme-hope.github.io/md-enhance/",
              },
              {
                text: "Photo Swipe Plugin",
                link: "https://vuepress-theme-hope.github.io/photo-swipe/",
              },
              {
                text: "PWA Plugin",
                link: "https://vuepress-theme-hope.github.io/pwa/",
              },
              {
                text: "Reading Time Plugin",
                link: "https://vuepress-theme-hope.github.io/reading-time/",
              },
              {
                text: "Seo Plugin",
                link: "https://vuepress-theme-hope.github.io/seo/",
              },
              {
                text: "Sitemap Plugin",
                link: "https://vuepress-theme-hope.github.io/sitemap/",
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
      { text: "Guide", link: "/guide/", icon: "creative" },
      { text: "Config", link: "/config/", icon: "config" },
      { text: "FAQ", link: "/FAQ/", icon: "question" },
      {
        text: "Basic",
        icon: "info",
        prefix: "/basic/",
        items: [
          { text: "Markdown", link: "markdown/", icon: "markdown" },
          { text: "VuePress", link: "vuepress/", icon: "vue" },
        ],
      },
      {
        text: "Project",
        icon: "info",
        items: [
          {
            text: "Changelog",
            link: "https://github.com/vuepress-theme-hope/vuepress-theme-hope/blob/v1/CHANGELOG.md",
          },
          {
            text: "Repo",
            link: "https://github.com/vuepress-theme-hope/vuepress-theme-hope",
          },
          {
            text: "Theme Demo",
            link: "/demo/",
          },
          {
            text: "Plugins",
            icon: "plugin",
            items: [
              {
                text: "AddThis Plugin",
                link: "https://vuepress-theme-hope.github.io/add-this/",
              },
              {
                text: "Comment Plugin",
                link: "https://vuepress-theme-hope.github.io/comment/",
              },
              {
                text: "Copy Code Plugin",
                link: "https://vuepress-theme-hope.github.io/copy-code/",
              },
              {
                text: "Feed Plugin",
                link: "https://vuepress-theme-hope.github.io/feed/",
              },
              {
                text: "Git Info Plugin",
                link: "https://vuepress-theme-hope.github.io/git/",
              },
              {
                text: "Markdown Enhance Plugin",
                link: "https://vuepress-theme-hope.github.io/md-enhance/",
              },
              {
                text: "Photo Swipe Plugin",
                link: "https://vuepress-theme-hope.github.io/photo-swipe/",
              },
              {
                text: "PWA Plugin",
                link: "https://vuepress-theme-hope.github.io/pwa/",
              },
              {
                text: "Reading Time Plugin",
                link: "https://vuepress-theme-hope.github.io/reading-time/",
              },
              {
                text: "Seo Plugin",
                link: "https://vuepress-theme-hope.github.io/seo/",
              },
              {
                text: "Sitemap Plugin",
                link: "https://vuepress-theme-hope.github.io/sitemap/",
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
