---
title: NavBar
icon: navbar
category:
  - Layout
tag:
  - Layout
  - Navbar
---

The Navbar may contain your site title, [Search Box](#search-box), [Navbar Links](#navbar-links), [I18n](https://v2.vuepress.vuejs.org/guide/i18n.html), [Repository Link](#git-repo-and-edit-links) and [outlook panel](#outlook-panel). They all depend on your configuration.

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

If you are not satisfied with the page’s icon or feel that the page title is too long, you can configure an object instead. Available configuration items are:

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
    navbar: [
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
    navbar: [
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

### Local Search

You can implement local search via the `@vuepress/plugin-search` plugin. index. You need to install it manually, passing plugin options via `themeConfig.plugins.search`. (You can also call it yourself)

::: info

By default, the plugin will only extract page headings to generate search

For related configuration and instructions, see [official documentation][plugin-search].

:::

### Algolia DocSearch

You can implement Algolia-based search via the `@vuepress/plugin-docsearch` plugin. You need to install it manually, passing plugin options via `themeConfig.plugins.docsearch`. (You can also call it yourself)

You need to [submit the URL of your site](https://docsearch.algolia.com/apply/) to join the DocSearch program. The DocSearch team will send appId and apiKey to your email. Next, you can configure the Algolia clawer and the plugin to enable DocSearch in VuePress.

::: details Crawler Config Example

```js {35-51,60}
new Crawler({
  appId: "YOUR_APP_ID",
  apiKey: "YOUR_API_KEY",
  rateLimit: 8,
  startUrls: [
    // These are urls which algolia start to craw
    // If your site is divided in to mutiple parts,
    // you may want to set mutiple entry links
    "https://YOUR_WEBSITE_URL/",
  ],
  sitemaps: [
    // if you are using sitemap plugins (e.g.: vuepress-plugin-sitemap2), you may provide one
    "https://YOUR_WEBSITE_URL/sitemap.xml",
  ],
  ignoreCanonicalTo: false,
  exclusionPatterns: [
    // You can use this to stop algolia crawing some paths
  ],
  discoveryPatterns: [
    // These are urls which algolia looking for,
    "https://YOUR_WEBSITE_URL/**",
  ],
  // Crawler schedule, set it according to your docs update frequency
  schedule: "at 02:00 every 1 day",
  actions: [
    // you may have mutiple actions, especially when you are deploying mutiple docs under one domain
    {
      // name the index with name you like
      indexName: "YOUR_INDEX_NAME",
      // paths where the index take effect
      pathsToMatch: ["https://YOUR_WEBSITE_URL/**"],
      // controls how algolia extracts records from your site
      recordExtractor: ({ $, helpers }) => {
        // The following are the default options for vuepress-theme-hope
        // vuepress-theme-hope default container class name is theme-hope-content
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
    // controls how index are initialized
    // only has effects before index are initialize
    // you may need to delete your index and recraw after modification
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

Alternatively, you can [run your own crawler](https://docsearch.algolia.com/docs/run-your-own/) to generate the index, and then use your own [appId](#appId), [apiKey](#apikey) and [indexName](#indexname) to configure this plugin.

::: warning

`initialIndexSettings.YOUR_INDEX_NAME.attributesForFaceting` field **must** contain `"lang"`, otherwise the plugin will not work properly.

:::

For related configuration and instructions, see [Official Documentation][plugin-docsearch].

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

@[code](../../.vuepress/navbar/en.ts)

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
    text: "Cookbook",
    icon: "guide",
    prefix: "/cookbook/",
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
