---
title: Giscus
icon: github
---

Giscus is a GitHub Discussion based commenting system that is easy to start.

<!-- more -->

## Preparation

1. You need to create a public repository and open discussion as a place to store comments
1. You need to install the [Giscus App](https://github.com/apps/giscus) to have permission to access the corresponding repository.

After completing the above steps, please go to the [Giscus page](https://giscus.app) to get your settings. You just need to fill in the repository and Discussion categories, then scroll to the "Enable giscus" section at the bottom of the page and copy the `data-repo`, `data-repo-id`, `data-category` and `data-category-id` four items as they are required.

## Config

Please pass `data-repo`, `data-repo-id`, `data-category` and `data-category-id` as plugin options as `repo`, `repoId`, `category` `categoryId`.

::: info Darkmode

To let Giscus use the correct theme, you need to pass a boolean value to `<CommentService />` via the `darkmode` property, indicating whether darkmode is currently enabled.

:::

For other options, see [Giscus Config](../config/giscus.md).
