---
icon: nav
category: layout
tags:
  - navbar
  - layout
---

# NavBar

## Introduction

The Navbar may contain your site title, [Search Box](#search-box), [Navbar Links](#navbar-links), [Languages](https://v1.vuepress.vuejs.org/guide/i18n.md) and [Repository Link](#git-repo-and-edit-links), they all depend on your configuration.

### Navbar Links

You can add links to the navbar via `themeConfig.nav`.

The basic configuration items are `text` navigation bar text, `link` navigation bar link, and `icon` navigation bar icon:

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    nav: [
      { text: "Home", link: "/", icon: "home" },
      { text: "Guide", link: "/guide/", icon: "info" },
      { text: "External", link: "https://google.com", icon: "markdown" },
    ],
  },
};
```

These links can also be dropdown menus if you provide an array of `items` instead of a `link`:

```js
module.exports = {
  themeConfig: {
    nav: [
      {
        text: "Languages",
        ariaLabel: "Language Menu",
        items: [
          { text: "Chinese", link: "/language/chinese/" },
          { text: "Japanese", link: "/language/japanese/" },
        ],
      },
    ],
  },
};
```

You can also have sub groups inside a dropdown by having nested items:

```js
module.exports = {
  themeConfig: {
    nav: [
      {
        text: "Languages",
        items: [
          {
            text: "Group1",
            items: [
              /*  */
            ],
          },
          {
            text: "Group2",
            items: [
              /*  */
            ],
          },
        ],
      },
    ],
  },
};
```

In the navigation bar grouping, you can add a `prefix` field to add a prefix to each submenu link:

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    nav: [
      {
        text: "Basic",
        icon: "info",
        prefix: "/basic/",
        items: [
          { text: "Markdown", link: "markdown", icon: "markdown" },
          { text: "VuePress", link: "vuepress/", icon: "vue" },
        ],
      },
    ],
  },
};
```

### Disable the Navbar

To disable the navbar globally, use `themeConfig.navbar`:

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    navbar: false,
  },
};
```

You can disable the navbar for a specific page via `YAML front matter`:

```yaml
---
navbar: false
---

```

### Navigation bar icon

You can use `themeConfig.logo` to configure the icons of the navigation bar, please fill in the absolute path.

After configuring the icon, the icon will be displayed on the navigation bar instead of the previous site name on the mobile view.

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    logo: "/logo.png",
  },
};
```

## Search Box

### Built-in Search

You can disable the built-in search box with `themeConfig.search: false`, and customize the number of suggestions will be shown with `themeConfig.searchMaxSuggestions`:

```js
module.exports = {
  themeConfig: {
    search: false,
    searchMaxSuggestions: 10,
  },
};
```

You can also disable the built-in search box for individual pages with `YAML front matter`:

```yaml
---
search: false
---

```

::: tip
Built-in Search only builds index from the title, `h2` and `h3` headers, if you need full text search, you can use [Algolia DocSearch](#algolia-docsearch).
:::

### Algolia DocSearch

The `themeConfig.algolia` option allows you to use [Algolia DocSearch](https://community.algolia.com/docsearch/) to replace the simple built-in search. To enable it, you need to provide at least `apiKey` and `indexName`:

```js
module.exports = {
  themeConfig: {
    algolia: {
      apiKey: "<API_KEY>",
      indexName: "<INDEX_NAME>",
    },
  },
};
```

::: warning Note
Unlike the [built-in search](#built-in-search) engine which works out of the box, [Algolia DocSearch](https://community.algolia.com/docsearch/) requires you to submit your site to them for indexing before it starts working.
:::

For more options, check out [Algolia DocSearch’s documentation](https://github.com/algolia/docsearch#docsearch-options).

### Search Placeholder

You can define a placeholder for the search box by adding the `searchPlaceholder` attribute:

```js
module.exports = {
  themeConfig: {
    searchPlaceholder: "Search...",
  },
};
```

## Git repository and Edit Links

Providing `themeConfig.repo` auto generates a GitHub link in the navbar and `"Edit this page"` links at the bottom of each page.

```js
// .vuepress/config.js
module.exports = {
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
    // if your docs are in a specific branch (defaults to 'master'):
    docsBranch: "master",
    // defaults to false, set to true to enable
    editLinks: true,
    // default value is true. Allows to hide next page links on all pages
    nextLinks: false,
    // default value is true. Allows to hide prev page links on all pages
    prevLinks: false,
    // custom text for edit link. Defaults to "Edit this page"
    editLinkText: "Help us improve this page!",
  },
};
```

You can overwrite the following properties on specific pages via `YAML front matter`:

```yaml
---
editLink: false # Will overwrite 'editLinks' from themeConfig
---

```

## Theme color button

For details, see the [Themecolor](../feature/theme.md#theme-color) section.

## Darkmode button

For details, see the [Darkmode](../feature/theme.md#darkmode) section.

## Full screen button

For details, see the [Full Screen Button](../feature/theme.md#fullscreen-button) section.

## Demo

```js {4-18}
// .vuepress/config.js
module.exports = {
  themeConfig: {
    nav: [
      // add icon field to each item to display icon
      { text: "Home", link: "/", icon: "home" },
      { text: "Guide", link: "/guide/", icon: "creative" },
      { text: "Config", link: "/config/", icon: "config" },
      {
        text: "Basic",
        icon: "info",
        prefix: "/basic/",
        items: [
          { text: "Markdown", link: "markdown/", icon: "markdown" },
          { text: "VuePress", link: "/vuepress/", icon: "vue" },
        ],
      },
      {
        text: "Project",
        icon: "info",
        items: [
          {
            text: "Changelog",
            link:
              "https://github.com/Mister-Hope/vuepress-theme-hope/blob/v1/CHANGELOG.md",
          },
          {
            text: "Repo",
            link: "https://github.com/mister-hope/vuepress-theme-hope",
          },
        ],
      },
    ],
  },
};
```
