---
title: NavBar
icon: navbar
order: 1
category:
  - Layout
tag:
  - Layout
  - Navbar
---

The Navbar may contain your site title, [Search Box](#search-box), [Navbar Links](#navbar-links), [I18n](https://v2.vuepress.vuejs.org/guide/i18n.html), [Repository Link](#git-repository-and-edit-links) and [Outlook Popup](#outlook-popup). They all depend on your configuration.

<!-- more -->

## Navbar Links

You can add links to the navbar via `navbar` options, it accepts an array.

### String Format

The easiest way to configure the navbar is to fill in the paths of the page files to be displayed in turn, so that the text, icons and links of the item will be automatically generated from the corresponding files.

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    navbar: ["/guide/README.md", "/config/README.md", "/faq.md"],
  }),
});
```

@tab JS

```js
// .vuepress/config.js
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    navbar: ["/guide/README.md", "/config/README.md", "/faq.md"],
  }),
};
```

:::

::: tip

You can omit the `.md` extension, and paths ending with `/` are inferred as `/README.md`.

:::

### Object Format

If you are not satisfied with the page’s icon or feel that the page title is too long, you can configure an object instead. Available configuration items are:

- `text:`: item text
- `link`: item link
- `icon`: item icon (optional)
- `activeMatch`: item active math (optional), support regexp strings

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
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
  }),
});
```

@tab JS

```js
// .vuepress/config.js
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
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
  }),
};
```

:::

::: tip Advanced usage of activeMatch

`activeMatch` gives you the ability to control whether the path is active, for example you may have the following dropdown:

- `/path/`
- `/path/a/`
- `/path/b/`

But you may have multiple folders with files under `/path/`. To avoid multiple dropdown items been activated under route starting with `/path/a/` or `/path/b/`, you can set `activeMatch` option for the first item with `^/path/(?:(?!a/|b/).*)?$`.

:::

### Dropdown List

To display more links, you can group similar links into a dropdown list.

You need use object format and provide the additional `children` option to nest links:

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    navbar: [
      {
        text: "Basic",
        icon: "info",
        children: ["/basic/markdown.md", "/basic/vuepress.md"],
      },
    ],
  }),
});
```

@tab JS

```js
// .vuepress/config.js
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    navbar: [
      {
        text: "Basic",
        icon: "info",
        children: ["/basic/markdown.md", "/basic/vuepress.md"],
      },
    ],
  }),
};
```

:::

In most cases, the grouped items in the navbar belong to the same category and will be placed in the same subdirectory, and they have the same path prefix.

To simplify the configuration, you can add the `prefix` field to add a prefix to each sub-link in the group:

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    navbar: [
      {
        text: "Basic",
        icon: "info",
        prefix: "/basic/",
        children: ["markdown.md", "vuepress.md"],
      },
    ],
  }),
});
```

@tab JS

```js
// .vuepress/config.js
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    navbar: [
      {
        text: "Basic",
        icon: "info",
        prefix: "/basic/",
        children: ["markdown.md", "vuepress.md"],
      },
    ],
  }),
};
```

:::

You can also have sub groups inside a dropdown by having nested `children`:

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
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
  }),
});
```

@tab JS

```js
// .vuepress/config.js
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
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
  }),
};
```

:::

## Disable Navbar

To disable the navbar globally, set `navbar: false` in theme options:

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    navbar: false,
  }),
});
```

@tab JS

```js
// .vuepress/config.js
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    navbar: false,
  }),
};
```

:::

You can disable the navbar for a specific page via `YAML front matter`:

```md
---
navbar: false
---
```

## Site Logo

You can use `logo` options to set site logo displayed in navbar.

The logo is displayed on the navbar instead of the previous site name on mobile.

::: note

Please fill in an absolute path and place the logo in `.vuepress/public` folder.

:::

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    logo: "/logo.png",
  }),
});
```

@tab JS

```js
// .vuepress/config.js
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    logo: "/logo.png",
  }),
};
```

:::

::: tip

You can set `logoDark` to display another logo in dark mode.

:::

## I18n Support

The theme’s navbar supports [I18n](https://v2.vuepress.vuejs.org/guide/i18n.html), so you can set navbar options mentioned above individually in each language:

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
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
  }),
});
```

@tab JS

```js
// .vuepress/config.js
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
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
  }),
};
```

:::

## Search Box

Like the default theme, `vuepress-theme-hope` brings built-in support for search plugins. You can enable the following plugins according to your own needs. The corresponding search box will automatically appear in the navbar.

For details, please see [Feature → Search](../feature/search.md).

## Git Repository and Edit Links

A repo button will appear in navbar if you set `repo` in theme options.

You can control whether showing the repository button via `repoDisplay` in theme options.

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    // Assumes GitHub. Can also be a full GitLab url.
    repo: "vuepress-theme-hope/vuepress-theme-hope",
    // Customizing the header label
    // Defaults to "GitHub" / "GitLab" / "Gitee" / "Bitbucket" or "Source" depending on `repo`
    repoLabel: "GitHub",
    // Whether to display repo link, default is `true`
    repoDisplay: true,
  }),
});
```

@tab JS

```js
// .vuepress/config.js
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    // Assumes GitHub. Can also be a full GitLab url.
    repo: "vuepress-theme-hope/vuepress-theme-hope",
    // Customizing the header label
    // Defaults to "GitHub" / "GitLab" / "Gitee" / "Bitbucket" or "Source" depending on `repo`
    repoLabel: "GitHub",
    // Whether to display repo link, default is `true`
    repoDisplay: true,
  }),
};
```

:::

## Outlook Popup

The following three functions are provided:

- [Theme color switch](../interface/theme-color.md)
- [Dark Mode](../interface/darkmode.md)
- [FullScreen button](../interface/others.md#fullscreen-button)

## Layout config

`vuepress-theme-hope` allows you to customize navbar layout. You can add components in `left`, `center` and `right` keys under `navbarLayout` options.

Available components:

- Brand: Site Brand
- Links: Navbar links
- Language: Language Switcher
- Search: Search Box
- Outlook: Outlook Popup
- Repo: Project Repo

By default, we are using the following options:

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    navbarLayout: {
      left: ["Brand"],
      center: ["Links"],
      right: ["Language", "Repo", "Outlook", "Search"],
    },
  }),
});
```

@tab JS

```js
// .vuepress/config.js
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    navbarLayout: {
      left: ["Brand"],
      center: ["Links"],
      right: ["Language", "Repo", "Outlook", "Search"],
    },
  }),
};
```

:::

## Types and Helpers

`vuepress-theme-hope` exports the type of navbar as `HopeThemeNavbarConfig`, and provides a `navbar` helper function. They can provide validation and autocompletion of navbar configuration in TS and JS.

::: tip

They mainly deal with scenarios when you split your VuePress configuration into multiple parts.

:::

::: code-tabs#language

@tab TS Helper

```ts
// .vuepress/navbar.ts
import { navbar } from "vuepress-theme-hope";

export default navbar([
  /* Your navbar configuration */
]);
```

@tab TS Type

```ts
// .vuepress/navbar.ts
import type { HopeThemeNavbarConfig } from "vuepress-theme-hope";

const navbarConfig: HopeThemeNavbarConfig = [
  /* Your navbar configuration */
];

export default navbarConfig;
```

@tab JS

```js
// .vuepress/navbar.js
import { navbar } from "vuepress-theme-hope";

export default navbar([
  /* Your navbar configuration */
]);
```

:::

## Demo

:::: details Configuration of this documentation

::: code-tabs#language

@tab TS

```ts
@include(../../.vuepress/navbar/en.ts)
```

@tab JS

```js
// .vuepress/navbar.js
import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/guide/",
  "/config/",
  "/faq/",
  {
    text: "Cookbook",
    icon: "guide",
    prefix: "/cookbook/",
    children: ["tutorial/", "markdown/", "vuepress/", "advanced/"],
  },
  "/migration/",
  {
    text: "Project",
    icon: "info",
    children: [
      "/changelog",
      "/demo",
      "/contribution",
      {
        text: "Plugins",
        icon: "plugin",
        children: [
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
            text: "Copyright Plugin",
            icon: "copyright",
            link: "https://vuepress-theme-hope.github.io/v2/copyright/",
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
            text: "Redirect Plugin",
            icon: "navigation",
            link: "https://vuepress-theme-hope.github.io/v2/redirect/",
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
          {
            text: "Sitemap Plugin",
            icon: "sitemap",
            link: "https://vuepress-theme-hope.github.io/v2/sitemap/",
          },
        ],
      },
    ],
  },
]);
```

:::

::::
