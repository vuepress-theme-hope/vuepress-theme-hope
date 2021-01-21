---
title: Plugins
icon: plugin
category: basic
tags:
  - vuepress
---

## Introduction

Plugins generally add global-level functionality to VuePress.

The architecture of the whole plugin system is as follows:

![Plugin system architecture](./assets/architecture.png)

## Using a plugin

You can use plugins by doing some configuration at `.vuepress/config.js`:

```js
module.exports = {
  plugins: [require("./my-plugin.js")],
};
```

### Use plugins from a dependency

A plugin can be published on npm in `CommonJS` format as `vuepress-plugin-xxx`. You can use it:

```js
module.exports = {
  plugins: ["vuepress-plugin-xx"],
};
```

If you prefix the plugin with `vuepress-plugin-`, you can use a shorthand to leave out that prefix:

```js
module.exports = {
  plugins: ["xxx"],
};
```

Same with:

```js
module.exports = {
  plugins: ["vuepress-plugin-xxx"],
};
```

This also works with [Scoped Packages](https://docs.npmjs.com/misc/scope):

```js
module.exports = {
  plugins: ["@org/vuepress-plugin-xxx", "@vuepress/plugin-xxx"],
};
```

Shorthand:

```js
module.exports = {
  plugins: ["@org/xxx", "@vuepress/xxx"],
};
```

::: warning Note

The plugin whose name starts with `@vuepress/plugin-` is an officially maintained plugin.

:::

## Plugin options

Config it by `pugins` in `config.js`.

### Babel Style

Plugins can have options specified by wrapping the name and an options object in an array inside your config:

```js
module.exports = {
  plugins: [
    [
      "vuepress-plugin-xxx",
      {
        /* options */
      },
    ],
  ],
};
```

Since this style is consistent with [babel’s Plugin/Preset Options](https://babeljs.io/docs/en/plugins#plugin-preset-options), we call it `Babel Style`.

### Object Style

VuePress also provides a simpler way to use plugins from a dependency:

```js
module.exports = {
  plugins: {
    xxx: {
      /* options */
    },
  },
};
```

::: warning

Prefer **Babel Style** first, because some plugins can have muti instance.

:::

::: tip

The plugin can be disabled when `false` is explicitly passed as option.

- Babel style

```js
module.exports = {
  plugins: [
    ["xxx", false], // disabled.
  ],
};
```

- Object style

```js
module.exports = {
  plugins: {
    xxx: false, // disabled.
  },
};
```

:::

## Official Plugins

- [active-header-links](https://v1.vuepress.vuejs.org/plugin/official/plugin-active-header-links.html): A plugin of automatically activating sidebar links when page scrolls
- [back-to-top](https://v1.vuepress.vuejs.org/plugin/official/plugin-back-to-top.html): Add the Back-to-top button
- [google-analytics](https://v1.vuepress.vuejs.org/plugin/official/plugin-google-analytics.html): Add Google analytics
- [last-updated](https://v1.vuepress.vuejs.org/plugin/official/plugin-last-updated.html): Update last edit time
- [medium-zoom](https://v1.vuepress.vuejs.org/plugin/official/plugin-medium-zoom.html): Picture Zoom
- [nprogress](https://v1.vuepress.vuejs.org/plugin/official/plugin-nprogress.html): A progress bar plugin based on nprogress
- [PWA](https://v1.vuepress.vuejs.org/plugin/official/plugin-pwa.html): Surport for **Progressive Web App**
- [register-component](https://v1.vuepress.vuejs.org/plugin/official/plugin-register-components.html): register components
- [search](https://v1.vuepress.vuejs.org/plugin/official/plugin-search.html): Headers-based search plugin

::: tip

More configuration, please view[VuePress Plugins](https://v1.vuepress.vuejs.org/plugin/)

:::

## Community Plugins

- [clean-urls](https://vuepress.github.io/en/plugins/clean-urls.html): Use clean URLs in VuePress
- [container](https://vuepress.github.io/en/plugins/container.html): Use Markdown containers in VuePress
- [copyright](https://vuepress.github.io/en/plugins/copyright.html): 在 VuePress 中处理复制行为
- [dehydrate](https://vuepress.github.io/en/plugins/dehydrate.html): Dehydrate HTML files in VuePress
- [git-log](https://vuepress.github.io/en/plugins/git-log.html): Integrate git logs into VuePress
- [mathjax](https://vuepress.github.io/en/plugins/mathjax.html): Use TeX syntax in VuePress
- [migrate](https://vuepress.github.io/en/plugins/migrate.html): Migrate another site to VuePress
- [named-chunks](https://vuepress.github.io/en/plugins/named-chunks.html): Generate named chunks in VuePress
- [redirect](https://vuepress.github.io/en/plugins/redirect.html): Handle redirections in VuePress
- [serve](https://vuepress.github.io/en/plugins/serve.html): Serve generated files in VuePress
- [zooming](https://vuepress.github.io/en/plugins/zooming.html): Make images zoomable in VuePress (with zooming)

::: tip

For more information, please visit [VuePress Community](https://vuepress.github.io/en/)

:::
