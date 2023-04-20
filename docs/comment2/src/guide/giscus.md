---
title: Giscus
icon: fab fa-fw fa-github
---

Giscus is a commenting system based on GitHub Discussion that is easy to start.

<!-- more -->

## Preparation

1. Create a public repository and open discussion panel as a place to store comments.
1. Install the [Giscus App](https://github.com/apps/giscus) to have permission to access the corresponding repository.
1. After completing the above steps, please go to the [Giscus page](https://giscus.app) to get your settings.

   You just need to fill in the repository and Discussion categories, then scroll to the "Enable giscus" section at the bottom of the page and obtain four attributes: `data-repo`, `data-repo-id`, `data-category` and `data-category-id`.

## Config

Please set `provider: "Giscus"` and pass `data-repo`, `data-repo-id`, `data-category` and `data-category-id` as plugin options as `repo`, `repoId`, `category` `categoryId`.

For other options, see [Giscus Config](../config/giscus.md).

## Theme

By default, the theme of Giscus is `light` or `dark` (based on darkmode status).

::: info Darkmode

To let Giscus apply the correct theme, you need to pass a boolean value to `<CommentService />` via `darkmode` property, indicating whether darkmode is currently enabled.

:::

If you want to customize theme in lightmode and darkmode, you can set `lightTheme` and `darkTheme` option with a built-in theme keyword or a custom CSS link starting with `https://`.
