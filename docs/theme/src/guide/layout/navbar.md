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

```ts twoslash {4,6-7} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  navbar: ["/guide/README.md", "/config/README.md", "/faq.md"],

  // equivalent to:
  // navbar: ["/guide/", "/config/", "/faq"],
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

```ts twoslash {4-21} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
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
      activeMatch: "^/faq/",
    },
  ],
});
```

::: tip Advanced usage of activeMatch

`activeMatch` gives you the ability to control whether the path is active through RegExps.

For example you may have the following dropdown:

- `/path/`
- `/path/a/`
- `/path/b/`

To avoid multiple dropdown items been activated under route starting with `/path/a/` or `/path/b/`, you can set `activeMatch` option for `/path/` with `^/path/(?:(?!a/|b/).*)?$`.

:::

### Dropdown List

To display more links, you can group similar links into a dropdown list.

You need to use object format and provide the additional `children` option to nest links:

```ts twoslash {5-9} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  navbar: [
    {
      text: "Basic",
      icon: "circle-info",
      children: ["/basic/markdown.md", "/basic/vuepress.md"],
    },
  ],
});
```

In most cases, the grouped items in the navbar belong to the same category and will be placed in the same subdirectory, and they have the same path prefix.

To simplify the configuration, you can add the `prefix` field to add a prefix to each sub-link in the group:

```ts twoslash {8} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  navbar: [
    {
      text: "Basic",
      icon: "circle-info",
      prefix: "/basic/",
      children: [
        "markdown.md", // /basic/markdown.md
        "vuepress.md", // /basic/vuepress.md
      ],
    },
  ],
});
```

You can also have subgroups inside a dropdown by having nested `children`:

```ts twoslash {11-13,17-19} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  navbar: [
    {
      text: "Project",
      icon: "circle-info",
      children: [
        {
          text: "Built in Plugins",
          children: [
            /* Some items */
          ],
        },
        {
          text: "Third party Plugins",
          children: [
            /* Some items */
          ],
        },
      ],
    },
  ],
});
```

## Disabling Navbar

To disable navbar globally, set `navbar: false` in theme options:

```ts twoslash {4} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  navbar: false,
});
```

You can also disable the navbar for a specific page via frontmatter:

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

```ts twoslash {4} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  logo: "/logo.png",
});
```

::: tip

You can set `logoDark` to display another logo in dark mode.

:::

## I18n Support

The theme's navbar supports [I18n](https://vuejs.press/guide/i18n.html), so you can set navbar options mentioned above individually in each language:

```ts twoslash {5,7-10,13,15-18} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
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
});
```

## Search Box

Like the default theme, `vuepress-theme-hope` brings built-in support for search plugins. You can enable the following plugins according to your own needs. The corresponding search box will automatically appear in the navbar.

For details, please see [Feature → Search](../feature/search.md).

## Git Repository and Edit Links

A repo button will appear in navbar if you set `repo` in theme options.

You can control whether showing the repository button via `repoDisplay` in theme options.

```ts twoslash {5,7,8} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  // Support shorthand repo name, which will be parsed to GitHub, and can also be a full URL
  repo: "vuepress-theme-hope/vuepress-theme-hope",
  // Defaults to one of "GitHub" / "GitLab" / "Gitee" / "Bitbucket" or "Source" depending on `repo`
  repoLabel: "GitHub",
  repoDisplay: true,
});
```

## Outlook Popup

The following three functions are provided:

- [Theme color switch](../interface/theme-color.md)
- [Dark Mode](../interface/darkmode.md)
- [FullScreen button](../interface/others.md#fullscreen-button)

## Layout config

You can customize navbar layout via `navbarLayout` in theme options, where you can add components using `start`, `center` and `end` keys.

The following built-in components can be used directly via their names:

- Brand: Site Brand
- Links: Navbar links
- Language: Language Switcher
- Search: Search Box
- Outlook: Outlook Popup
- Repo: Project Repo

And you can also use other names of global components.

By default, the theme use the following options:

```ts twoslash {4-8} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  navbarLayout: {
    start: ["Brand"],
    center: ["Links"],
    end: ["Language", "Repo", "Outlook", "Search"],
  },
});
```

## Types and Helpers

`vuepress-theme-hope` exports the type of navbar as `NavbarOptions`, and provides a `navbar` helper function.

::: tip

They mainly deal with scenarios when you split your VuePress configuration into multiple parts.

:::

```ts twoslash title=".vuepress/navbar.ts"
import { navbar } from "vuepress-theme-hope";

export default navbar([
  /* Your navbar configuration */
]);
```

## Demo

::: details Configuration of this documentation

```ts twoslash
import { navbar } from "vuepress-theme-hope";

<!-- @include: ../../.vuepress/navbar/en.ts#config -->
```

:::
