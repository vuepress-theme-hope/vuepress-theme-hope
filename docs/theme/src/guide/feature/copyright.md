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

Sometimes, you may not want some of your articles to be copied by others, or you want others to automatically generate a piece of copyright information to the clipboard when copying.

`vuepress-theme-hope` use [vuepress-plugin-copyright2][copyright2] to provide related features.

::: info

`vuepress-theme-hope` passes `plugins.copyright` in theme options as plugin options to `vuepress-plugin-copyright2`.

:::

<!-- more -->

## Enable plugin

Since half of the users use this theme to build documents, and document sites usually do not need to add copyright information, this plugin is not enabled by default.

::: info

To enable this plugin, you need to set `plugins.copyright` in theme options to `true` or an object.

Setting to `true` is equivalent to setting `{ global: true }`.

:::

- When the `global` option of the plugin is not `true`, the plugin is disabled globally, and you need to manually enable it by setting `copy: true` in page frontmatter.
- Setting `global: true` makes it enabled globally, and allows setting `copy: false` in page frontmatter to disable it.

To avoid disturbing visitors, copyright information will be appended only when the length of content copied by the user is not less than `100`. If you want to change this trigger value, please set `triggerWords`, and this option supports being override via `copy.triggerWord` in page frontmatter.

## Disable Copy and Selection

- If you don’t want users to copy your entire site or specific page text, you can disable copying in plugin options or page frontmatter by setting `disableCopy`, the latter has higher priority.
- If you don’t want users to select your entire site or specific page text, you can disable selection in plugin options or page frontmatter by setting `disableSelection`, the latter has higher priority.

## Copyright Information

You can set author and license information via `author` and `license` in plugin options. If your site have different authors and license in different pages, you can pass in a function `(page: Page) => string` that takes the current page object as parameter and returns the corresponding information.

## Demo

Please copy this text and paste it to any location to see the effect. Please copy this text and paste it to any location to see the effect. Please copy this text and paste it to any location to see the effect. Please copy this text and paste it to any location to see the effect. Please copy this text and paste it to any location to see the effect. Please copy this text and paste it to any location to see the effect. Please copy this text and paste it to any location to see the effect. Please copy this text and paste it to any location to see the effect. Please copy this text and paste it to any location to see the effect. Please copy this text and paste it to any location to see the effect.

## More

For plugin documentation, please visit [vuepress-plugin-copyright2 docs][copyright2].

[copyright2]: https://vuepress-theme-hope.github.io/v2/copyright/zh/
