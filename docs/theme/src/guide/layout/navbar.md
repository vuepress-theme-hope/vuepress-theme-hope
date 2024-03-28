---
title: NavBar
icon: window-maximize
order: 1
category:
  - Layout
tag:
  - Layout
  - Navbar
---

The Navbar contains:

- Site title
- [Search Box](#search-box)
- [Navbar Links](#navbar-links)
- [Language dropdown](https://vuejs.press/guide/i18n.html)
- [Repository Link](#git-repository-and-edit-links)
- [Outlook Popup](#outlook-popup)

All of them are customizable, and you can also [fully customize Navbar layout](#layout-config).

<!-- more -->

## Navbar Links

You can add links to the navbar via `navbar` options, it accepts an array.

### String Format

The easiest way to configure the navbar is to fill in the paths of the page files to be displayed in turn, so that the text, icons and links of the item will be automatically generated from the corresponding files.

```js {6} title=".vuepress/config.js"
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    navbar: ["/guide/README.md", "/config/README.md", "/faq.md"],
  }),
});
```

::: tip

We recommend you to omit the `.md` extension, and paths ending with `/` are inferred as `/README.md`.

:::

### Object Format

If you are not satisfied with the page's icon or feel that the page title is too long, you can configure an object instead. Available configuration items are:

- `text:`: item text
- `link`: item link
- `icon`: item icon (optional)
- `activeMatch`: item active math (optional), support regexp strings

```js{5-22} title=".vuepress/config.js"
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    navbar: [
      {
        text: "Guide",
        link: "/guide/README.md",
        icon: "lightbulb",
        // only active in `/guide/`
        activeMatch: "^/guide/$",
      },
      { text: "Config", link: "/config/README.md", icon: "config" },
      {
        text: "FAQ",
        link: "/faq.md",
        icon: "circle-question",
        // active in path starting with `/faq`
        // so it will active in path like `/faq/xxx.html`
        activeMatch: "^/zh/faq/",
      },
    ],
  }),
};
```

::: tip Advanced usage of activeMatch

`activeMatch` gives you the ability to control whether the path is active, for example you may have the following dropdown:

- `/path/`
- `/path/a/`
- `/path/b/`

But you may have multiple folders with files under `/path/`. To avoid multiple dropdown items been activated under route starting with `/path/a/` or `/path/b/`, you can set `activeMatch` option for the first item with `^/path/(?:(?!a/|b/).*)?$`.

:::

### Dropdown List

To display more links, you can group similar links into a dropdown list.

You need to use object format and provide the additional `children` option to nest links:

```js{6-10} title=".vuepress/config.js"
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    navbar: [
      {
        text: "Basic",
        icon: "circle-info",
        children: ["/basic/markdown.md", "/basic/vuepress.md"],
      },
    ],
  }),
};
```

In most cases, the grouped items in the navbar belong to the same category and will be placed in the same subdirectory, and they have the same path prefix.

To simplify the configuration, you can add the `prefix` field to add a prefix to each sub-link in the group:

```js{9,10} title=".vuepress/config.js"
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    navbar: [
      {
        text: "Basic",
        icon: "circle-info",
        prefix: "/basic/",
        children: ["markdown.md", "vuepress.md"],
      },
    ],
  }),
};
```

You can also have subgroups inside a dropdown by having nested `children`:

```js{13-15,20-22} title=".vuepress/config.js"
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    navbar: [
      {
        text: "Project",
        icon: "circle-info",
        children: [
          {
            text: "Built in Plugins",
            icon: "puzzle-piece",
            children: [
              /* Some items */
            ],
          },
          {
            text: "Third party Plugins",
            icon: "puzzle-piece",
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

## Disable Navbar

To disable the navbar globally, set `navbar: false` in theme options:

```js{5} title=".vuepress/config.js"
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    navbar: false,
  }),
};
```

You can disable the navbar for a specific page via `YAML front matter`:

```md
---
navbar: false
---
```

## Disable Navbar Icon

To disable the navbar icon, set `navbarIcon: false` in theme options:

```js{5} title=".vuepress/config.js"
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    navbarIcon: false,
  }),
};
```

## Site Logo

You can use `logo` options to set site logo displayed in navbar.

The logo is displayed on the navbar instead of the previous site name on mobile.

::: note

Please fill in an absolute path and place the logo in `.vuepress/public` folder.

:::

```js{5} title=".vuepress/config.js"
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    logo: "/logo.png",
  }),
};
```

::: tip

You can set `logoDark` to display another logo in dark mode.

:::

## I18n Support

The theme's navbar supports [I18n](https://vuejs.press/guide/i18n.html), so you can set navbar options mentioned above individually in each language:

```js{7-10,13-16} title=".vuepress/config.js"
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

## Search Box

Like the default theme, `vuepress-theme-hope` brings built-in support for search plugins. You can enable the following plugins according to your own needs. The corresponding search box will automatically appear in the navbar.

For details, please see [Feature → Search](../feature/search.md).

## Git Repository and Edit Links

A repo button will appear in navbar if you set `repo` in theme options.

You can control whether showing the repository button via `repoDisplay` in theme options.

```js{6,9,11} title=".vuepress/config.js"
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    // Assuming GitHub. Can also be a full url.
    repo: "vuepress-theme-hope/vuepress-theme-hope",
    // Customizing the header label
    // Defaults to "GitHub" / "GitLab" / "Gitee" / "Bitbucket" or "Source" depending on `repo`
    repoLabel: "GitHub",
    // Whether to display repo link, default is `true`
    repoDisplay: true,
  }),
};
```

## Outlook Popup

The following three functions are provided:

- [Theme color switch](../interface/theme-color.md)
- [Dark Mode](../interface/darkmode.md)
- [FullScreen button](../interface/others.md#fullscreen-button)

## Layout config

`vuepress-theme-hope` allows you to customize navbar layout. You can add components in `start`, `center` and `end` keys under `navbarLayout` options.

Navbar has the following built-in components that can be used:

- Brand: Site Brand
- Links: Navbar links
- Language: Language Switcher
- Search: Search Box
- Outlook: Outlook Popup
- Repo: Project Repo

And you can also use your own component names after you register them globally.

We use the following options by default:

```js{5-9} title=".vuepress/config.js"
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    navbarLayout: {
      start: ["Brand"],
      center: ["Links"],
      end: ["Language", "Repo", "Outlook", "Search"],
    },
  }),
};
```

## Types and Helpers

`vuepress-theme-hope` exports the type of navbar as `NavbarConfig`, and provides a `navbar` helper function. They can provide validation and autocompletion of navbar configuration in TS and JS.

::: tip

They mainly deal with scenarios when you split your VuePress configuration into multiple parts.

:::

::: code-tabs#language

@tab TS Helper

```ts title=".vuepress/navbar.ts"
import { navbar } from "vuepress-theme-hope";

export default navbar([
  /* Your navbar configuration */
]);
```

@tab TS Type

```ts title=".vuepress/navbar.ts"
import type { NavbarConfig } from "vuepress-theme-hope";

const navbarConfig: NavbarConfig = [
  /* Your navbar configuration */
];

export default navbarConfig;
```

@tab JS

```js title=".vuepress/navbar.js"
import { navbar } from "vuepress-theme-hope";

export default navbar([
  /* Your navbar configuration */
]);
```

:::

## Demo

::: details Configuration of this documentation

```js
import { navbar } from "vuepress-theme-hope";

<!-- @include: ../../.vuepress/navbar/en.ts#config -->
```

:::
