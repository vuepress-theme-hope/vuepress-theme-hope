---
icon: sidebar
category: layout
tags:
  - sidebar
  - layout
---

# Sidebar

To enable the sidebar, use `themeConfig.sidebar`. The basic configuration expects an Array of links:

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    sidebar: ['/', '/page-a', ['/page-b', 'Explicit link text']]
  }
};
```

You can omit the `.md` extension, and paths ending with `/` are inferred as `*/README.md`.

The text for the link is automatically inferred (either from the first header in the page or explicit title in `YAML front matter`). To explicitly specify the link text, use an array in form of `[link, text]`.

Icon support is enabled in the sidebar by default, and the icon of the page will be displayed before the link in the sidebar. It can be disabled by setting `sidebarIcon` to `false` in `themeConfig`.

## Nested Header Links

The sidebar automatically displays links for headers in the current active page, nested under the link for the page itself. You can customize this behavior using `themeConfig.sidebarDepth`. The default depth(the max value) is `2`, which extracts both `h2` and `h3` headers. Setting it to `0` disables the header links.

A page can also override this value via `Front matter`:

```md
---
sidebarDepth: 2
---
```

## Displaying Header Links of All Pages

The sidebar only displays links for headers in the current active page. You can display all header links for every page with `themeConfig.displayAllHeaders: true`:

```js
module.exports = {
  themeConfig: {
    displayAllHeaders: true // Default: false
  }
};
```

### Active Header Links

By default, the nested header links and the hash in the URL are updated as the user scrolls to view the different sections of the page. This behavior can be disabled with the following theme config:

```js
module.exports = {
  themeConfig: {
    activeHeaderLinks: false // Default: true
  }
};
```

### Sidebar Groups

You can divide sidebar links into several groups by using objects. You can use `prefix` to add a default path prefix to each link in the group, and `icon` to add an icon to the group text.

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    sidebar: [
      {
        title: 'Group 1', // required
        path: '/foo/', // optional, which should be a absolute path.
        collapsable: false, // optional, defaults to true
        sidebarDepth: 1, // optional, defaults to 1
        children: ['/']
      },
      {
        title: 'Group 2',
        children: [
          /* ... */
        ]
      }
    ]
  }
};
```

Sidebar groups are collapsable by default. You can force a group to be always open with `collapsable: false`.

A sidebar group config also supports [sidebarDepth](#nested-header-links) field to override the default sidebar depth (`2`).

### Multiple Sidebars

To display different sidebars for different sections of content, first organize your pages into directories for each desired section:

```md
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

Then, update your configuration to define your sidebar for each section.

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    sidebar: {
      '/foo/': [
        '' /* /foo/ */,
        'one' /* /foo/one.html */,
        'two' /* /foo/two.html */
      ],

      '/bar/': [
        '' /* /bar/ */,
        'three' /* /bar/three.html */,
        'four' /* /bar/four.html */
      ],

      // fallback
      '/': [
        '' /* / */,
        'contact' /* /contact.html */,
        'about' /* /about.html */
      ]
    }
  }
};
```

::: warning
Make sure to define the fallback configuration last, because VuePress checks each sidebar config from top to bottom.
:::

### Auto Sidebar for Single Pages

To automatically generate a sidebar that contains only the header links for the current page, you can use `Front matter` on that page:

```yaml
---
sidebar: auto
---
```

You can also enable it in all pages by using config:

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    sidebar: 'auto'
  }
};
```

In [multi-language](https://v1.vuepress.vuejs.org/guide/i18n.md) mode, you can also apply it to a specific locale:

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    '/': {
      sidebar: 'auto'
    }
  }
};
```

### Disabling the Sidebar

You can disable the sidebar on a specific page with `YAML front matter`:

```yaml
---
sidebar: false
---
```

## Demo

::: details Configuration of this documentation

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    sidebar: {
      '/en/guide/': [
        {
          title: 'Get Started',
          icon: 'creativefill',
          children: ['', 'install']
        },
        {
          title: 'Outlook',
          icon: 'layout',
          prefix: 'layout/',
          children: ['', 'navbar', 'sidebar', 'breadcrumb', 'page', 'home']
        },
        {
          title: 'New Features',
          icon: 'discoverfill',
          prefix: 'feature/',
          children: [
            '',
            'icon',
            'comment',
            'themecolor',
            'encrypt',
            'component',
            'fullscreen',
            'typescript'
          ]
        },
        {
          title: 'Markdown enhance',
          icon: 'markdown',
          prefix: 'markdown/',
          children: ['', 'align', 'sup-sub', 'footnote', 'tex', 'flowchart']
        }
      ],

      '/en/config/': [
        '',
        'themeConfig',
        'page',
        'stylus',
        {
          title: 'Plugins',
          prefix: 'plugin/',
          icon: 'extension',
          children: [
            '',
            'container',
            'copyright',
            'md-enhance',
            'medium-zoom',
            'pwa'
          ]
        }
      ],

      '/en/basic/': [
        {
          title: 'Markdown',
          prefix: 'markdown/',
          icon: 'markdown',
          children: ['', 'demo', 'emoji']
        },
        {
          title: 'Vuepress',
          prefix: 'vuepress/',
          icon: 'vue',
          children: [
            '',
            'file',
            'plugin',
            'theme/',
            'theme/config',
            'command',
            'case'
          ]
        }
      ],

      '/en/': ['', 'guide/', 'config/', 'basic/', 'FAQ/']
    }
  }
};
```

:::
