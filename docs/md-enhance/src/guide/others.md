---
title: Others
icon: more
---

## Link check

`vuepress-plugin-md-enhance` check your Markdown links in dev mode by default.

You can customize this feature through `linkCheck` in plugin options, and you can choose from `'always'`, `'never'`, `'dev'` and `'build'`.

## GFM

If your docs both serve on documentation site and directly on GitHub, we provide a `gfm` option to align your Markdown behavior with GitHub.

::: note

Custom container is enabled by default in `@vuepress/theme-default` and `vuepress-theme-hope`, but not available in GitHub Markdown preview.

:::

## v-pre

Since VuePress2 has removed V1’s v-pre container in core, the plugin provides `vPre` option to support it. That is, you can use any Mustache syntax in the container below.

```md
::: v-pre

{{ abc }}

:::
```
