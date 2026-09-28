---
title: Copyright
icon: copyright
category:
  - Feature
tag:
  - Copyright
  - Feature
copy:
  minLength: 40
---

You may not want some of your articles to be copied by others, or you want copyright information appended to the clipboard when copying.
`vuepress-theme-hope` use [`@vuepress/plugin-copyright`][copyright] to provide this feature.

::: info

`vuepress-theme-hope` passes `plugins.copyright` in theme options to `@vuepress/plugin-copyright`.

:::

<!-- more -->

## Enable plugin

Since half of the users use this theme to build documents, and document sites usually do not need to add copyright information, this plugin is not enabled by default.

To enable this plugin, you need to set `plugins.copyright` in theme options to `true` or an object.

```ts twoslash {5} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  plugins: {
    copyright: true,
  },
});
```

::: tip

Setting to `true` is equivalent to setting `{ global: true }`.

:::

- When the `global` option of the plugin is not `true`, the plugin is disabled globally, and you need to manually enable it by setting `copy: true` in page frontmatter.
- Setting `global: true` makes it enabled globally, and allows setting `copy: false` in page frontmatter to disable it.

To avoid disturbing visitors, copyright information will be appended only when the length of content copied by the user is not less than `100`. If you want to change this trigger value, please set `triggerLength`, and this option supports being overridden via `copy.triggerLength` in page frontmatter.

```ts twoslash {7} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  plugins: {
    copyright: {
      // append copyright information when the length of copied content is not less than 40
      triggerLength: 40,
    },
  },
});
```

## Disable Copy and Selection

- If you don't want users to copy your entire site or specific page text, you can disable copying in plugin options or page frontmatter by setting `disableCopy`, the latter has higher priority.
- If you don't want users to select your entire site or specific page text, you can disable selection in plugin options or page frontmatter by setting `disableSelection`, the latter has higher priority.

```ts twoslash {7,10} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  plugins: {
    copyright: {
      // disable copy
      disableCopy: true,

      // disable selection
      disableSelection: true,
    },
  },
});
```

## Copyright Information

You can set author and license information via `author` and `license` in plugin options.

```ts twoslash {6-7} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  plugins: {
    copyright: {
      author: "Mister Hope",
      license: "MIT",
    },
  },
});
```

If your site have different authors and license in different pages, you can pass in a function `(page: Page) => string` that takes the current page object as parameter and returns the corresponding information via `authorGetter` and `licenseGetter`. You can also take full control of copyright information by passing in a function `(page: Page) => string` via `copyrightGetter`.

```ts twoslash {6} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  plugins: {
    copyright: {
      licenseGetter: (page) =>
        page.path.startsWith("/cookbook/") ? "CC0" : "MIT",
    },
  },
});
```

## Demo

Please copy this text and paste it to any location to see the effect. Please copy this text and paste it to any location to see the effect. Please copy this text and paste it to any location to see the effect. Please copy this text and paste it to any location to see the effect. Please copy this text and paste it to any location to see the effect. Please copy this text and paste it to any location to see the effect. Please copy this text and paste it to any location to see the effect. Please copy this text and paste it to any location to see the effect. Please copy this text and paste it to any location to see the effect. Please copy this text and paste it to any location to see the effect.

## More

For plugin documentation, please visit [@vuepress/plugin-copyright docs][copyright].

[copyright]: https://ecosystem.vuejs.press/plugins/features/copyright.html
