---
title: Others
icon: more
category:
  - Markdown
tag:
  - Markdown
---

## Link check

The theme will check your markdown links in dev mode by default.

You can customize this feature through `linkCheck` options in `themeConfig.plugins.mdEnhance`, and you can choose from `'always'`, `'never'`, `'dev'` and `'build'`.

## v-pre

Since VuePress2 has removed V1’s v-pre container in core, the plugin provides an option to support it. That is, you can use any Mustacle syntax in the container below.

```md
::: v-pre

{{ abc }}

:::
```

## Image Mark

GFM supports marking pictures by ID suffix so that pictures are only displayed in a specific mode. We support both GitHub’s markup and the easy markup `#light` and `#dark`.

You can enable it using `imageMark` option in `themeConfig.plugins.mdEnhance`.

```md
![GitHub Light](/assets/icon/github-light.png#gh-dark-mode-only)
![GitHub Dark](/assets/icon/github-dark.png#gh-light-mode-only)

![GitHub Light](/assets/icon/github-light.png#dark)
![GitHub Dark](/assets/icon/github-dark.png#light)
```

::: details case

The above demo will render the following result

![GitHub Light](/assets/icon/github-light.png#gh-dark-mode-only)
![GitHub Dark](/assets/icon/github-dark.png#gh-light-mode-only)

![GitHub Light](/assets/icon/github-light.png#dark)
![GitHub Dark](/assets/icon/github-dark.png#light)

:::

## GFM

If your docs both serve on documentation site and directly on GitHub, we provide a `gfm` option in `themeConfig.plugins.mdEnhance` to align your Markdown behavior with GitHub.

::: note

Custom container is enabled by default in `@vuepress/theme-default` and `vuepress-theme-hope`, but not available in GitHub Markdown preview.

:::
